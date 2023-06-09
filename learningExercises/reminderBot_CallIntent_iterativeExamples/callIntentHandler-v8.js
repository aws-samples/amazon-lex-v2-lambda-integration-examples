"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_lex_runtime_v2_1 = require("@aws-sdk/client-lex-runtime-v2");
const moment_1 = __importDefault(require("moment"));
const DialogHelpers = require("../../src/sharedLibraries/DialogHelpers");
const CommonUtils = require("../../src/sharedLibraries/CommonUtils");
const TIME_SLOT = "Time";
const TIME_PERIOD_VALUES = ["AM", "PM", "MO", "AF", "EV", "NI"];
const TIME_PERIOD_SESSION_ATTR = "timeperiod";
const INITIAL_CODE_HOOK_LABEL = "CallIntent_InitialCodeHook";
const TIME_SLOT_PROMPT_CODE_HOOK_LABEL = "CallIntent_TimeSlot_PromptCodeHook";
const TIME_SLOT_VALIDATION_CODE_HOOK_LABEL = "CallIntent_TimeSlot_ValidationCodeHook";
function handler(event) {
    let response = DialogHelpers.passThrough(event);
    const intent = event.sessionState.intent;
    // @ts-ignore intent will never be undefined in the Intent Handler
    if (intent.name !== "CallIntent" /* IntentNames.CALL_INTENT */) {
        console.error(`Wrong handler for intent called, current intent is ${intent}`);
        // Decide how you would like to handle this with the least disruption to your user
        return response;
    }
    /**
     * Determine the correct logic to run based on what code hook the request has come from
     */
    if (event.invocationSource === "DialogCodeHook" /* InvocationSource.DIALOG_CODE_HOOK */) {
        if (event.invocationLabel === INITIAL_CODE_HOOK_LABEL) {
            // Check if we already captured an ambiguous Time Slot value at this point,
            // so we can adjust the prompt if needed
            response = checkForAmbiguousTimeSlotValue(event);
        }
        else if (event.invocationLabel === TIME_SLOT_PROMPT_CODE_HOOK_LABEL) {
            // Check the user input, so we can adjust the prompt for ambiguous or time period values
            response = checkUserInput(event);
        }
        else if (event.invocationLabel === TIME_SLOT_VALIDATION_CODE_HOOK_LABEL) {
            // final validation on slot
            response = validateTimeSlot(event);
        }
    }
    else if (event.invocationSource === "FulfillmentCodeHook" /* InvocationSource.FULFILLMENT_CODE_HOOK */) {
        // book the call
        response = fulfilIntent(event);
    }
    return response;
}
exports.handler = handler;
/**
 * For Fulfillment, we will take action on book the call and then send a
 *  response with State of Fulfilled and a DialogAction of CLOSE
 */
const fulfilIntent = (event) => {
    //clear the time period session attribute
    event.sessionState.sessionAttributes[TIME_PERIOD_SESSION_ATTR] = "";
    // ****************************
    // ADD LOGIC HERE TO ACTUALLY BOOK THE CALL ....
    //
    // IN THE REAL WORLD WE WOULD BE REACHING OUT TO EXTERNAL SYSTEMS HERE
    // FOR NOW WE'RE JUST GOING TO RESPOND AS IF WE DID BOOK THE CALL
    // *****************************
    const humanFriendlyTime = (0, moment_1.default)(CommonUtils.getSessionStateSlotValue(event, TIME_SLOT).interpretedValue, [
        "HH:mm",
    ]).format("h:mm A");
    return DialogHelpers.fulfillIntent(event.sessionState, event.requestAttributes || {}, [
        {
            contentType: client_lex_runtime_v2_1.MessageContentType.PLAIN_TEXT,
            content: `Your call has been scheduled for ${humanFriendlyTime}`,
        },
    ]);
};
/**
 * After we collect the slot value we want to
 *  - check it has been filled with a time and not a time period (in which case we would return to ElicitSlot)
 *  - if it is a valid time we return control to Lex to move to the next step
 * @param event
 */
const validateTimeSlot = (event) => {
    const timeSlotValue = CommonUtils.getSessionStateSlotValue(event, TIME_SLOT);
    // Validate that the interpretedValue isn't a time period
    // (if value was collected at ElicitIntent the CallIntent_TimeSlot_PromptCodeHook will have been skipped)
    if (isTimePeriod(timeSlotValue.interpretedValue)) {
        return askForSpecificTimeWithinTimePeriod(timeSlotValue.interpretedValue, event);
    }
    else {
        // ****************************
        // LOGIC COULD BE ADDED HERE TO CHECK THIS TIME IS AVAILABLE BY REACHING OUT TO OUR BOOKING SYSTEM
        // THIS WOULD ALLOW US TO RE-PROMPT THE USER FOR A NEW TIME IF NEEDED
        // ****************************
        //If we have a valid time, pass through to next step
        return DialogHelpers.passThrough(event);
    }
};
/**
 * On each elicitation within the Time Slot we will do the following:
 * - If the slot is filled (has interpretedValue) we will check it is a valid time value
 *      - If not we will ask the user to clarify
 *      - Else we will just delegate back to Lex
 * - If the slot is NOT filled we will check if there is more than one resolved value
 *     - If there is more than one, we will use those to ask the user to clarify with one
 *     - Else we will just delegate back to Lex
 */
const checkUserInput = (event) => {
    const timeSlotValue = CommonUtils.getSessionStateSlotValue(event, TIME_SLOT);
    // check it isn't a time period rather than a specific time
    if (isTimePeriod(timeSlotValue.interpretedValue)) {
        // if it is, ask for clarification
        return askForSpecificTimeWithinTimePeriod(timeSlotValue.interpretedValue, event);
    }
    // otherwise check if there are potential values listed
    else {
        return checkForAmbiguousTimeSlotValue(event);
    }
};
const isAmbiguousSlotValue = (slot) => {
    return slot && slot.resolvedValues && slot.resolvedValues.length > 1;
};
const checkForAmbiguousTimeSlotValue = (event) => {
    const timeSlotValue = CommonUtils.getSessionStateSlotValue(event, TIME_SLOT);
    if (isAmbiguousSlotValue(timeSlotValue)) {
        return disambiguateValues(event, timeSlotValue.resolvedValues);
    }
    else {
        return DialogHelpers.passThrough(event);
    }
};
const isTimePeriod = (interpretedValue) => {
    return interpretedValue && interpretedValue !== "" && TIME_PERIOD_VALUES.includes(interpretedValue);
};
const disambiguateValues = (event, resolvedValues) => {
    let disambiguatedValue = resolveTimeFromTimePeriod(event, resolvedValues);
    if (disambiguatedValue !== "") {
        // If we resolved a value, set the slot to the matched value before we pass back to Lex to handle the next step
        // @ts-ignore - to have reached this point this will have to exist so not adding null checks
        event.sessionState.intent.slots[TIME_SLOT].value.interpretedValue = disambiguatedValue;
        return DialogHelpers.passThrough(event);
    }
    else {
        // If we haven't resolved a value, ask the user for clarification
        return askForTimeClarification(resolvedValues, event);
    }
};
const resolveTimeFromTimePeriod = (event, resolvedValues) => {
    let disambiguatedTime = "";
    // check if the user already indicated a time period, if they haven't, we can return an empty string
    const timePeriod = event.sessionState.sessionAttributes[TIME_PERIOD_SESSION_ATTR];
    if (timePeriod && timePeriod != "") {
        // Try to match a resolved time with the time period the user has given
        resolvedValues.forEach((resolvedValue) => {
            if (["MO", "AM"].includes(timePeriod) && resolvedValue >= "00:00" && resolvedValue <= "12:00") {
                disambiguatedTime = resolvedValue;
            }
            else if (["AF", "PM"].includes(timePeriod) && resolvedValue >= "12:00" && resolvedValue <= "18:00") {
                disambiguatedTime = resolvedValue;
            }
            else if (["EV", "NI", "PM"].includes(timePeriod) && resolvedValue >= "18:00" && resolvedValue <= "23:59") {
                disambiguatedTime = resolvedValue;
            }
        });
    }
    return disambiguatedTime;
};
const askForTimeClarification = (resolvedValues, event) => {
    // map in a human friendly version of the times
    resolvedValues = resolvedValues.map((value) => (0, moment_1.default)(value, ["HH:mm"]).format("h:mm A"));
    // concatenate the resolved values with 'or' between them
    const resolvedValuesString = resolvedValues.join(" or ");
    // set the next step to a re-prompt for the slot
    return DialogHelpers.promptForSlot(event.sessionState, event.requestAttributes || {}, TIME_SLOT, event.sessionState.intent, [
        {
            contentType: client_lex_runtime_v2_1.MessageContentType.PLAIN_TEXT,
            content: `Would you like ${resolvedValuesString}?`,
        },
    ]);
};
const askForSpecificTimeWithinTimePeriod = (value, event) => {
    // map of values to human-friendly ones
    const timePeriodMapping = {
        AM: "morning",
        PM: "evening",
        MO: "morning",
        AF: "afternoon",
        EV: "evening",
        NI: "evening",
    };
    // add value to session, so we can use it for future disambiguation if needed
    event.sessionState.sessionAttributes[TIME_PERIOD_SESSION_ATTR] = CommonUtils.getSessionStateSlotValue(event, TIME_SLOT).interpretedValue;
    // add human-friendly value into message, or default to day if the value can't be mapped
    const message = {
        contentType: client_lex_runtime_v2_1.MessageContentType.PLAIN_TEXT,
        content: `What time in the ${timePeriodMapping[value] || "day"} would you like?`,
    };
    // set the next step to a re-prompt for the slot
    return DialogHelpers.promptForSlot(event.sessionState, event.requestAttributes || {}, TIME_SLOT, event.sessionState.intent, [message]);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsbEludGVudEhhbmRsZXItdjguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYWxsSW50ZW50SGFuZGxlci12OC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSwwRUFBMEU7QUFHMUUsb0RBQTJCO0FBRTNCLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFBO0FBQ3hFLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFBO0FBRXBFLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQTtBQUV4QixNQUFNLGtCQUFrQixHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUMvRCxNQUFNLHdCQUF3QixHQUFHLFlBQVksQ0FBQTtBQUU3QyxNQUFNLHVCQUF1QixHQUFHLDRCQUE0QixDQUFBO0FBQzVELE1BQU0sZ0NBQWdDLEdBQUcsb0NBQW9DLENBQUE7QUFDN0UsTUFBTSxvQ0FBb0MsR0FBRyx3Q0FBd0MsQ0FBQTtBQUVyRixTQUFnQixPQUFPLENBQUMsS0FBNEI7SUFDbEQsSUFBSSxRQUFRLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUMvQyxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQTtJQUV4QyxrRUFBa0U7SUFDbEUsSUFBSSxNQUFNLENBQUMsSUFBSSwrQ0FBNEIsRUFBRTtRQUMzQyxPQUFPLENBQUMsS0FBSyxDQUFDLHNEQUFzRCxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQzdFLGtGQUFrRjtRQUNsRixPQUFPLFFBQVEsQ0FBQTtLQUNoQjtJQUVEOztPQUVHO0lBQ0gsSUFBSSxLQUFLLENBQUMsZ0JBQWdCLDZEQUFzQyxFQUFFO1FBQ2hFLElBQUksS0FBSyxDQUFDLGVBQWUsS0FBSyx1QkFBdUIsRUFBRTtZQUNyRCwyRUFBMkU7WUFD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QUFLLENBQUMsWUFBWSxFQUNsQixLQUFLLENBQUMsaUJBQWlCLElBQUksRUFBRSxFQUM3QixTQUFTLEVBQ1QsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQ3pCLENBQUMsT0FBTyxDQUFDLENBQ1YsQ0FBQTtBQUNILENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEludm9jYXRpb25Tb3VyY2UsIExleENvZGVIb29rSW5wdXRFdmVudCB9IGZyb20gXCIuLi8uLi9zcmMvc2hhcmVkTGlicmFyaWVzL0xleENvZGVIb29rSW50ZXJmYWNlc1wiXG5pbXBvcnQgeyBNZXNzYWdlQ29udGVudFR5cGUsIFZhbHVlIH0gZnJvbSBcIkBhd3Mtc2RrL2NsaWVudC1sZXgtcnVudGltZS12MlwiXG5pbXBvcnQgeyBJbnRlbnROYW1lcyB9IGZyb20gXCIuLi8uLi9zcmMvcmVtaW5kZXJCb3RMZXgyTGFtYmRhL2ludGVudEhhbmRsZXJzL2NvbnN0YW50c1wiXG5cbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiXG5cbmNvbnN0IERpYWxvZ0hlbHBlcnMgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3NoYXJlZExpYnJhcmllcy9EaWFsb2dIZWxwZXJzXCIpXG5jb25zdCBDb21tb25VdGlscyA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvc2hhcmVkTGlicmFyaWVzL0NvbW1vblV0aWxzXCIpXG5cbmNvbnN0IFRJTUVfU0xPVCA9IFwiVGltZVwiXG5cbmNvbnN0IFRJTUVfUEVSSU9EX1ZBTFVFUyA9IFtcIkFNXCIsIFwiUE1cIiwgXCJNT1wiLCBcIkFGXCIsIFwiRVZcIiwgXCJOSVwiXVxuY29uc3QgVElNRV9QRVJJT0RfU0VTU0lPTl9BVFRSID0gXCJ0aW1lcGVyaW9kXCJcblxuY29uc3QgSU5JVElBTF9DT0RFX0hPT0tfTEFCRUwgPSBcIkNhbGxJbnRlbnRfSW5pdGlhbENvZGVIb29rXCJcbmNvbnN0IFRJTUVfU0xPVF9QUk9NUFRfQ09ERV9IT09LX0xBQkVMID0gXCJDYWxsSW50ZW50X1RpbWVTbG90X1Byb21wdENvZGVIb29rXCJcbmNvbnN0IFRJTUVfU0xPVF9WQUxJREFUSU9OX0NPREVfSE9PS19MQUJFTCA9IFwiQ2FsbEludGVudF9UaW1lU2xvdF9WYWxpZGF0aW9uQ29kZUhvb2tcIlxuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlcihldmVudDogTGV4Q29kZUhvb2tJbnB1dEV2ZW50KSB7XG4gIGxldCByZXNwb25zZSA9IERpYWxvZ0hlbHBlcnMucGFzc1Rocm91Z2goZXZlbnQpXG4gIGNvbnN0IGludGVudCA9IGV2ZW50LnNlc3Npb25TdGF0ZS5pbnRlbnRcblxuICAvLyBAdHMtaWdub3JlIGludGVudCB3aWxsIG5ldmVyIGJlIHVuZGVmaW5lZCBpbiB0aGUgSW50ZW50IEhhbmRsZXJcbiAgaWYgKGludGVudC5uYW1lICE9PSBJbnRlbnROYW1lcy5DQUxMX0lOVEVOVCkge1xuICAgIGNvbnNvbGUuZXJyb3IoYFdyb25nIGhhbmRsZXIgZm9yIGludGVudCBjYWxsZWQsIGN1cnJlbnQgaW50ZW50IGlzICR7aW50ZW50fWApXG4gICAgLy8gRGVjaWRlIGhvdyB5b3Ugd291bGQgbGlrZSB0byBoYW5kbGUgdGhpcyB3aXRoIHRoZSBsZWFzdCBkaXNydXB0aW9uIHRvIHlvdXIgdXNlclxuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSB0aGUgY29ycmVjdCBsb2dpYyB0byBydW4gYmFzZWQgb24gd2hhdCBjb2RlIGhvb2sgdGhlIHJlcXVlc3QgaGFzIGNvbWUgZnJvbVxuICAgKi9cbiAgaWYgKGV2ZW50Lmludm9jYXRpb25Tb3VyY2UgPT09IEludm9jYXRpb25Tb3VyY2UuRElBTE9HX0NPREVfSE9PSykge1xuICAgIGlmIChldmVudC5pbnZvY2F0aW9uTGFiZWwgPT09IElOSVRJQUxfQ09ERV9IT09LX0xBQkVMKSB7XG4gICAgICAvLyBDaGVjayBpZiB3ZSBhbHJlYWR5IGNhcHR1cmVkIGFuIGFtYmlndW91cyBUaW1lIFNsb3QgdmFsdWUgYXQgdGhpcyBwb2ludCxcbiAgICAgIC8vIHNvIHdlIGNhbiBhZGp1c3QgdGhlIHByb21wdCBpZiBuZWVkZWRcbiAgICAgIHJlc3BvbnNlID0gY2hlY2tGb3JBbWJpZ3VvdXNUaW1lU2xvdFZhbHVlKGV2ZW50KVxuICAgIH0gZWxzZSBpZiAoZXZlbnQuaW52b2NhdGlvbkxhYmVsID09PSBUSU1FX1NMT1RfUFJPTVBUX0NPREVfSE9PS19MQUJFTCkge1xuICAgICAgLy8gQ2hlY2sgdGhlIHVzZXIgaW5wdXQsIHNvIHdlIGNhbiBhZGp1c3QgdGhlIHByb21wdCBmb3IgYW1iaWd1b3VzIG9yIHRpbWUgcGVyaW9kIHZhbHVlc1xuICAgICAgcmVzcG9uc2UgPSBjaGVja1VzZXJJbnB1dChldmVudClcbiAgICB9IGVsc2UgaWYgKGV2ZW50Lmludm9jYXRpb25MYWJlbCA9PT0gVElNRV9TTE9UX1ZBTElEQVRJT05fQ09ERV9IT09LX0xBQkVMKSB7XG4gICAgICAvLyBmaW5hbCB2YWxpZGF0aW9uIG9uIHNsb3RcbiAgICAgIHJlc3BvbnNlID0gdmFsaWRhdGVUaW1lU2xvdChldmVudClcbiAgICB9XG4gIH0gZWxzZSBpZiAoZXZlbnQuaW52b2NhdGlvblNvdXJjZSA9PT0gSW52b2NhdGlvblNvdXJjZS5GVUxGSUxMTUVOVF9DT0RFX0hPT0spIHtcbiAgICAvLyBib29rIHRoZSBjYWxsXG4gICAgcmVzcG9uc2UgPSBmdWxmaWxJbnRlbnQoZXZlbnQpXG4gIH1cblxuICByZXR1cm4gcmVzcG9uc2Vcbn1cblxuLyoqXG4gKiBGb3IgRnVsZmlsbG1lbnQsIHdlIHdpbGwgdGFrZSBhY3Rpb24gb24gYm9vayB0aGUgY2FsbCBhbmQgdGhlbiBzZW5kIGFcbiAqICByZXNwb25zZSB3aXRoIFN0YXRlIG9mIEZ1bGZpbGxlZCBhbmQgYSBEaWFsb2dBY3Rpb24gb2YgQ0xPU0VcbiAqL1xuY29uc3QgZnVsZmlsSW50ZW50ID0gKGV2ZW50OiBMZXhDb2RlSG9va0lucHV0RXZlbnQpID0+IHtcbiAgLy9jbGVhciB0aGUgdGltZSBwZXJpb2Qgc2Vzc2lvbiBhdHRyaWJ1dGVcbiAgZXZlbnQuc2Vzc2lvblN0YXRlLnNlc3Npb25BdHRyaWJ1dGVzW1RJTUVfUEVSSU9EX1NFU1NJT05fQVRUUl0gPSBcIlwiXG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyBBREQgTE9HSUMgSEVSRSBUTyBBQ1RVQUxMWSBCT09LIFRIRSBDQUxMIC4uLi5cbiAgLy9cbiAgLy8gSU4gVEhFIFJFQUwgV09STEQgV0UgV09VTEQgQkUgUkVBQ0hJTkcgT1VUIFRPIEVYVEVSTkFMIFNZU1RFTVMgSEVSRVxuICAvLyBGT1IgTk9XIFdFJ1JFIEpVU1QgR09JTkcgVE8gUkVTUE9ORCBBUyBJRiBXRSBESUQgQk9PSyBUSEUgQ0FMTFxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG4gIGNvbnN0IGh1bWFuRnJpZW5kbHlUaW1lID0gbW9tZW50KENvbW1vblV0aWxzLmdldFNlc3Npb25TdGF0ZVNsb3RWYWx1ZShldmVudCwgVElNRV9TTE9UKS5pbnRlcnByZXRlZFZhbHVlLCBbXG4gICAgXCJISDptbVwiLFxuICBdKS5mb3JtYXQoXCJoOm1tIEFcIilcblxuICByZXR1cm4gRGlhbG9nSGVscGVycy5mdWxmaWxsSW50ZW50KGV2ZW50LnNlc3Npb25TdGF0ZSwgZXZlbnQucmVxdWVzdEF0dHJpYnV0ZXMgfHwge30sIFtcbiAgICB7XG4gICAgICBjb250ZW50VHlwZTogTWVzc2FnZUNvbnRlbnRUeXBlLlBMQUlOX1RFWFQsXG4gICAgICBjb250ZW50OiBgWW91ciBjYWxsIGhhcyBiZWVuIHNjaGVkdWxlZCBmb3IgJHtodW1hbkZyaWVuZGx5VGltZX1gLFxuICAgIH0sXG4gIF0pXG59XG5cbi8qKlxuICogQWZ0ZXIgd2UgY29sbGVjdCB0aGUgc2xvdCB2YWx1ZSB3ZSB3YW50IHRvXG4gKiAgLSBjaGVjayBpdCBoYXMgYmVlbiBmaWxsZWQgd2l0aCBhIHRpbWUgYW5kIG5vdCBhIHRpbWUgcGVyaW9kIChpbiB3aGljaCBjYXNlIHdlIHdvdWxkIHJldHVybiB0byBFbGljaXRTbG90KVxuICogIC0gaWYgaXQgaXMgYSB2YWxpZCB0aW1lIHdlIHJldHVybiBjb250cm9sIHRvIExleCB0byBtb3ZlIHRvIHRoZSBuZXh0IHN0ZXBcbiAqIEBwYXJhbSBldmVudFxuICovXG5jb25zdCB2YWxpZGF0ZVRpbWVTbG90ID0gKGV2ZW50OiBMZXhDb2RlSG9va0lucHV0RXZlbnQpID0+IHtcbiAgY29uc3QgdGltZVNsb3RWYWx1ZSA9IENvbW1vblV0aWxzLmdldFNlc3Npb25TdGF0ZVNsb3RWYWx1ZShldmVudCwgVElNRV9TTE9UKVxuXG4gIC8vIFZhbGlkYXRlIHRoYXQgdGhlIGludGVycHJldGVkVmFsdWUgaXNuJ3QgYSB0aW1lIHBlcmlvZFxuICAvLyAoaWYgdmFsdWUgd2FzIGNvbGxlY3RlZCBhdCBFbGljaXRJbnRlbnQgdGhlIENhbGxJbnRlbnRfVGltZVNsb3RfUHJvbXB0Q29kZUhvb2sgd2lsbCBoYXZlIGJlZW4gc2tpcHBlZClcbiAgaWYgKGlzVGltZVBlcmlvZCh0aW1lU2xvdFZhbHVlLmludGVycHJldGVkVmFsdWUpKSB7XG4gICAgcmV0dXJuIGFza0ZvclNwZWNpZmljVGltZVdpdGhpblRpbWVQZXJpb2QodGltZVNsb3RWYWx1ZS5pbnRlcnByZXRlZFZhbHVlLCBldmVudClcbiAgfSBlbHNlIHtcbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgLy8gTE9HSUMgQ09VTEQgQkUgQURERUQgSEVSRSBUTyBDSEVDSyBUSElTIFRJTUUgSVMgQVZBSUxBQkxFIEJZIFJFQUNISU5HIE9VVCBUTyBPVVIgQk9PS0lORyBTWVNURU1cbiAgICAvLyBUSElTIFdPVUxEIEFMTE9XIFVTIFRPIFJFLVBST01QVCBUSEUgVVNFUiBGT1IgQSBORVcgVElNRSBJRiBORUVERURcbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbiAgICAvL0lmIHdlIGhhdmUgYSB2YWxpZCB0aW1lLCBwYXNzIHRocm91Z2ggdG8gbmV4dCBzdGVwXG4gICAgcmV0dXJuIERpYWxvZ0hlbHBlcnMucGFzc1Rocm91Z2goZXZlbnQpXG4gIH1cbn1cbi8qKlxuICogT24gZWFjaCBlbGljaXRhdGlvbiB3aXRoaW4gdGhlIFRpbWUgU2xvdCB3ZSB3aWxsIGRvIHRoZSBmb2xsb3dpbmc6XG4gKiAtIElmIHRoZSBzbG90IGlzIGZpbGxlZCAoaGFzIGludGVycHJldGVkVmFsdWUpIHdlIHdpbGwgY2hlY2sgaXQgaXMgYSB2YWxpZCB0aW1lIHZhbHVlXG4gKiAgICAgIC0gSWYgbm90IHdlIHdpbGwgYXNrIHRoZSB1c2VyIHRvIGNsYXJpZnlcbiAqICAgICAgLSBFbHNlIHdlIHdpbGwganVzdCBkZWxlZ2F0ZSBiYWNrIHRvIExleFxuICogLSBJZiB0aGUgc2xvdCBpcyBOT1QgZmlsbGVkIHdlIHdpbGwgY2hlY2sgaWYgdGhlcmUgaXMgbW9yZSB0aGFuIG9uZSByZXNvbHZlZCB2YWx1ZVxuICogICAgIC0gSWYgdGhlcmUgaXMgbW9yZSB0aGFuIG9uZSwgd2Ugd2lsbCB1c2UgdGhvc2UgdG8gYXNrIHRoZSB1c2VyIHRvIGNsYXJpZnkgd2l0aCBvbmVcbiAqICAgICAtIEVsc2Ugd2Ugd2lsbCBqdXN0IGRlbGVnYXRlIGJhY2sgdG8gTGV4XG4gKi9cbmNvbnN0IGNoZWNrVXNlcklucHV0ID0gKGV2ZW50OiBMZXhDb2RlSG9va0lucHV0RXZlbnQpID0+IHtcbiAgY29uc3QgdGltZVNsb3RWYWx1ZSA9IENvbW1vblV0aWxzLmdldFNlc3Npb25TdGF0ZVNsb3RWYWx1ZShldmVudCwgVElNRV9TTE9UKVxuXG4gIC8vIGNoZWNrIGl0IGlzbid0IGEgdGltZSBwZXJpb2QgcmF0aGVyIHRoYW4gYSBzcGVjaWZpYyB0aW1lXG4gIGlmIChpc1RpbWVQZXJpb2QodGltZVNsb3RWYWx1ZS5pbnRlcnByZXRlZFZhbHVlKSkge1xuICAgIC8vIGlmIGl0IGlzLCBhc2sgZm9yIGNsYXJpZmljYXRpb25cbiAgICByZXR1cm4gYXNrRm9yU3BlY2lmaWNUaW1lV2l0aGluVGltZVBlcmlvZCh0aW1lU2xvdFZhbHVlLmludGVycHJldGVkVmFsdWUsIGV2ZW50KVxuICB9XG4gIC8vIG90aGVyd2lzZSBjaGVjayBpZiB0aGVyZSBhcmUgcG90ZW50aWFsIHZhbHVlcyBsaXN0ZWRcbiAgZWxzZSB7XG4gICAgcmV0dXJuIGNoZWNrRm9yQW1iaWd1b3VzVGltZVNsb3RWYWx1ZShldmVudClcbiAgfVxufVxuXG5jb25zdCBpc0FtYmlndW91c1Nsb3RWYWx1ZSA9IChzbG90OiBWYWx1ZSkgPT4ge1xuICByZXR1cm4gc2xvdCAmJiBzbG90LnJlc29sdmVkVmFsdWVzICYmIHNsb3QucmVzb2x2ZWRWYWx1ZXMubGVuZ3RoID4gMVxufVxuXG5jb25zdCBjaGVja0ZvckFtYmlndW91c1RpbWVTbG90VmFsdWUgPSAoZXZlbnQ6IExleENvZGVIb29rSW5wdXRFdmVudCkgPT4ge1xuICBjb25zdCB0aW1lU2xvdFZhbHVlID0gQ29tbW9uVXRpbHMuZ2V0U2Vzc2lvblN0YXRlU2xvdFZhbHVlKGV2ZW50LCBUSU1FX1NMT1QpXG4gIGlmIChpc0FtYmlndW91c1Nsb3RWYWx1ZSh0aW1lU2xvdFZhbHVlKSkge1xuICAgIHJldHVybiBkaXNhbWJpZ3VhdGVWYWx1ZXMoZXZlbnQsIHRpbWVTbG90VmFsdWUucmVzb2x2ZWRWYWx1ZXMpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIERpYWxvZ0hlbHBlcnMucGFzc1Rocm91Z2goZXZlbnQpXG4gIH1cbn1cblxuY29uc3QgaXNUaW1lUGVyaW9kID0gKGludGVycHJldGVkVmFsdWU6IHN0cmluZykgPT4ge1xuICByZXR1cm4gaW50ZXJwcmV0ZWRWYWx1ZSAmJiBpbnRlcnByZXRlZFZhbHVlICE9PSBcIlwiICYmIFRJTUVfUEVSSU9EX1ZBTFVFUy5pbmNsdWRlcyhpbnRlcnByZXRlZFZhbHVlKVxufVxuXG5jb25zdCBkaXNhbWJpZ3VhdGVWYWx1ZXMgPSAoZXZlbnQ6IExleENvZGVIb29rSW5wdXRFdmVudCwgcmVzb2x2ZWRWYWx1ZXM6IHN0cmluZ1tdKSA9PiB7XG4gIGxldCBkaXNhbWJpZ3VhdGVkVmFsdWUgPSByZXNvbHZlVGltZUZyb21UaW1lUGVyaW9kKGV2ZW50LCByZXNvbHZlZFZhbHVlcylcbiAgaWYgKGRpc2FtYmlndWF0ZWRWYWx1ZSAhPT0gXCJcIikge1xuICAgIC8vIElmIHdlIHJlc29sdmVkIGEgdmFsdWUsIHNldCB0aGUgc2xvdCB0byB0aGUgbWF0Y2hlZCB2YWx1ZSBiZWZvcmUgd2UgcGFzcyBiYWNrIHRvIExleCB0byBoYW5kbGUgdGhlIG5leHQgc3RlcFxuICAgIC8vIEB0cy1pZ25vcmUgLSB0byBoYXZlIHJlYWNoZWQgdGhpcyBwb2ludCB0aGlzIHdpbGwgaGF2ZSB0byBleGlzdCBzbyBub3QgYWRkaW5nIG51bGwgY2hlY2tzXG4gICAgZXZlbnQuc2Vzc2lvblN0YXRlLmludGVudC5zbG90c1tUSU1FX1NMT1RdLnZhbHVlLmludGVycHJldGVkVmFsdWUgPSBkaXNhbWJpZ3VhdGVkVmFsdWVcbiAgICByZXR1cm4gRGlhbG9nSGVscGVycy5wYXNzVGhyb3VnaChldmVudClcbiAgfSBlbHNlIHtcbiAgICAvLyBJZiB3ZSBoYXZlbid0IHJlc29sdmVkIGEgdmFsdWUsIGFzayB0aGUgdXNlciBmb3IgY2xhcmlmaWNhdGlvblxuICAgIHJldHVybiBhc2tGb3JUaW1lQ2xhcmlmaWNhdGlvbihyZXNvbHZlZFZhbHVlcywgZXZlbnQpXG4gIH1cbn1cblxuY29uc3QgcmVzb2x2ZVRpbWVGcm9tVGltZVBlcmlvZCA9IChldmVudDogTGV4Q29kZUhvb2tJbnB1dEV2ZW50LCByZXNvbHZlZFZhbHVlczogc3RyaW5nW10pID0+IHtcbiAgbGV0IGRpc2FtYmlndWF0ZWRUaW1lID0gXCJcIlxuXG4gIC8vIGNoZWNrIGlmIHRoZSB1c2VyIGFscmVhZHkgaW5kaWNhdGVkIGEgdGltZSBwZXJpb2QsIGlmIHRoZXkgaGF2ZW4ndCwgd2UgY2FuIHJldHVybiBhbiBlbXB0eSBzdHJpbmdcbiAgY29uc3QgdGltZVBlcmlvZCA9IGV2ZW50LnNlc3Npb25TdGF0ZS5zZXNzaW9uQXR0cmlidXRlc1tUSU1FX1BFUklPRF9TRVNTSU9OX0FUVFJdXG4gIGlmICh0aW1lUGVyaW9kICYmIHRpbWVQZXJpb2QgIT0gXCJcIikge1xuICAgIC8vIFRyeSB0byBtYXRjaCBhIHJlc29sdmVkIHRpbWUgd2l0aCB0aGUgdGltZSBwZXJpb2QgdGhlIHVzZXIgaGFzIGdpdmVuXG4gICAgcmVzb2x2ZWRWYWx1ZXMuZm9yRWFjaCgocmVzb2x2ZWRWYWx1ZSkgPT4ge1xuICAgICAgaWYgKFtcIk1PXCIsIFwiQU1cIl0uaW5jbHVkZXModGltZVBlcmlvZCkgJiYgcmVzb2x2ZWRWYWx1ZSA+PSBcIjAwOjAwXCIgJiYgcmVzb2x2ZWRWYWx1ZSA8PSBcIjEyOjAwXCIpIHtcbiAgICAgICAgZGlzYW1iaWd1YXRlZFRpbWUgPSByZXNvbHZlZFZhbHVlXG4gICAgICB9IGVsc2UgaWYgKFtcIkFGXCIsIFwiUE1cIl0uaW5jbHVkZXModGltZVBlcmlvZCkgJiYgcmVzb2x2ZWRWYWx1ZSA+PSBcIjEyOjAwXCIgJiYgcmVzb2x2ZWRWYWx1ZSA8PSBcIjE4OjAwXCIpIHtcbiAgICAgICAgZGlzYW1iaWd1YXRlZFRpbWUgPSByZXNvbHZlZFZhbHVlXG4gICAgICB9IGVsc2UgaWYgKFtcIkVWXCIsIFwiTklcIiwgXCJQTVwiXS5pbmNsdWRlcyh0aW1lUGVyaW9kKSAmJiByZXNvbHZlZFZhbHVlID49IFwiMTg6MDBcIiAmJiByZXNvbHZlZFZhbHVlIDw9IFwiMjM6NTlcIikge1xuICAgICAgICBkaXNhbWJpZ3VhdGVkVGltZSA9IHJlc29sdmVkVmFsdWVcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIHJldHVybiBkaXNhbWJpZ3VhdGVkVGltZVxufVxuXG5jb25zdCBhc2tGb3JUaW1lQ2xhcmlmaWNhdGlvbiA9IChyZXNvbHZlZFZhbHVlczogc3RyaW5nW10sIGV2ZW50OiBMZXhDb2RlSG9va0lucHV0RXZlbnQpID0+IHtcbiAgLy8gbWFwIGluIGEgaHVtYW4gZnJpZW5kbHkgdmVyc2lvbiBvZiB0aGUgdGltZXNcbiAgcmVzb2x2ZWRWYWx1ZXMgPSByZXNvbHZlZFZhbHVlcy5tYXAoKHZhbHVlKSA9PiBtb21lbnQodmFsdWUsIFtcIkhIOm1tXCJdKS5mb3JtYXQoXCJoOm1tIEFcIikpXG5cbiAgLy8gY29uY2F0ZW5hdGUgdGhlIHJlc29sdmVkIHZhbHVlcyB3aXRoICdvcicgYmV0d2VlbiB0aGVtXG4gIGNvbnN0IHJlc29sdmVkVmFsdWVzU3RyaW5nID0gcmVzb2x2ZWRWYWx1ZXMuam9pbihcIiBvciBcIilcblxuICAvLyBzZXQgdGhlIG5leHQgc3RlcCB0byBhIHJlLXByb21wdCBmb3IgdGhlIHNsb3RcbiAgcmV0dXJuIERpYWxvZ0hlbHBlcnMucHJvbXB0Rm9yU2xvdChcbiAgICBldmVudC5zZXNzaW9uU3RhdGUsXG4gICAgZXZlbnQucmVxdWVzdEF0dHJpYnV0ZXMgfHwge30sXG4gICAgVElNRV9TTE9ULFxuICAgIGV2ZW50LnNlc3Npb25TdGF0ZS5pbnRlbnQsXG4gICAgW1xuICAgICAge1xuICAgICAgICBjb250ZW50VHlwZTogTWVzc2FnZUNvbnRlbnRUeXBlLlBMQUlOX1RFWFQsXG4gICAgICAgIGNvbnRlbnQ6IGBXb3VsZCB5b3UgbGlrZSAke3Jlc29sdmVkVmFsdWVzU3RyaW5nfT9gLFxuICAgICAgfSxcbiAgICBdXG4gIClcbn1cblxuY29uc3QgYXNrRm9yU3BlY2lmaWNUaW1lV2l0aGluVGltZVBlcmlvZCA9ICh2YWx1ZTogc3RyaW5nLCBldmVudDogTGV4Q29kZUhvb2tJbnB1dEV2ZW50KSA9PiB7XG4gIC8vIG1hcCBvZiB2YWx1ZXMgdG8gaHVtYW4tZnJpZW5kbHkgb25lc1xuICBjb25zdCB0aW1lUGVyaW9kTWFwcGluZzogeyBbaW5kZXg6IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICAgIEFNOiBcIm1vcm5pbmdcIixcbiAgICBQTTogXCJldmVuaW5nXCIsXG4gICAgTU86IFwibW9ybmluZ1wiLFxuICAgIEFGOiBcImFmdGVybm9vblwiLFxuICAgIEVWOiBcImV2ZW5pbmdcIixcbiAgICBOSTogXCJldmVuaW5nXCIsXG4gIH1cblxuICAvLyBhZGQgdmFsdWUgdG8gc2Vzc2lvbiwgc28gd2UgY2FuIHVzZSBpdCBmb3IgZnV0dXJlIGRpc2FtYmlndWF0aW9uIGlmIG5lZWRlZFxuICBldmVudC5zZXNzaW9uU3RhdGUuc2Vzc2lvbkF0dHJpYnV0ZXNbVElNRV9QRVJJT0RfU0VTU0lPTl9BVFRSXSA9IENvbW1vblV0aWxzLmdldFNlc3Npb25TdGF0ZVNsb3RWYWx1ZShcbiAgICBldmVudCxcbiAgICBUSU1FX1NMT1RcbiAgKS5pbnRlcnByZXRlZFZhbHVlXG5cbiAgLy8gYWRkIGh1bWFuLWZyaWVuZGx5IHZhbHVlIGludG8gbWVzc2FnZSwgb3IgZGVmYXVsdCB0byBkYXkgaWYgdGhlIHZhbHVlIGNhbid0IGJlIG1hcHBlZFxuICBjb25zdCBtZXNzYWdlID0ge1xuICAgIGNvbnRlbnRUeXBlOiBNZXNzYWdlQ29udGVudFR5cGUuUExBSU5fVEVYVCxcbiAgICBjb250ZW50OiBgV2hhdCB0aW1lIGluIHRoZSAke3RpbWVQZXJpb2RNYXBwaW5nW3ZhbHVlXSB8fCBcImRheVwifSB3b3VsZCB5b3UgbGlrZT9gLFxuICB9XG5cbiAgLy8gc2V0IHRoZSBuZXh0IHN0ZXAgdG8gYSByZS1wcm9tcHQgZm9yIHRoZSBzbG90XG4gIHJldHVybiBEaWFsb2dIZWxwZXJzLnByb21wdEZvclNsb3QoXG4gICAgZXZlbnQuc2Vzc2lvblN0YXRlLFxuICAgIGV2ZW50LnJlcXVlc3RBdHRyaWJ1dGVzIHx8IHt9LFxuICAgIFRJTUVfU0xPVCxcbiAgICBldmVudC5zZXNzaW9uU3RhdGUuaW50ZW50LFxuICAgIFttZXNzYWdlXVxuICApXG59XG4iXX0=