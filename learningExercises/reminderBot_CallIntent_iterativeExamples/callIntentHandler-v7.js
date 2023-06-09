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
        if (event.invocationLabel === TIME_SLOT_PROMPT_CODE_HOOK_LABEL) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsbEludGVudEhhbmRsZXItdjcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYWxsSW50ZW50SGFuZGxlci12Ny50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSwwRUFBMEU7QUFHMUUsb0RBQTJCO0FBRTNCLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFBO0FBQ3hFLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFBO0FBRXBFLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQTtBQUV4QixNQUFNLGtCQUFrQixHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUMvRCxNQUFNLHdCQUF3QixHQUFHLFlBQVksQ0FBQTtBQUU3QyxNQUFNLGdDQUFnQyxHQUFHLG9DQUFvQyxDQUFBO0FBQzdFLE1BQU0sb0NBQW9DLEdBQUcsd0NBQXdDLENBQUE7QUFFckYsU0FBZ0IsT0FBTyxDQUFDLEtBQTRCO0lBQ2xELElBQUksUUFBUSxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDL0MsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUE7SUFFeEMsa0VBQWtFO0lBQ2xFLElBQUksTUFBTSxDQUFDLElBQUksK0NBQTRCLEVBQUU7UUFDM0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxzREFBc0QsTUFBTSxFQUFFLENBQUMsQ0FBQTtRQUM3RSxrRkFBa0Y7UUFDbEYsT0FBTyxRQUFRLENBQUE7S0FDaEI7SUFFRDs7T0FFRztJQUNILElBQUksS0FBSyxDQUFDLGdCQUFnQiw2REFBc0MsRUFBRTtRQUNoRSxJQUFJLEtBQUssQ0FBQyxlQUFlLEtBQUssZ0NBQWdDLEVBQUU7WUFDOUQsd0ZBQXdGO1lBQ3hGLFFBQVEsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENB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WyJpbXBvcnQgeyBJbnZvY2F0aW9uU291cmNlLCBMZXhDb2RlSG9va0lucHV0RXZlbnQgfSBmcm9tIFwiLi4vLi4vc3JjL3NoYXJlZExpYnJhcmllcy9MZXhDb2RlSG9va0ludGVyZmFjZXNcIlxuaW1wb3J0IHsgTWVzc2FnZUNvbnRlbnRUeXBlLCBWYWx1ZSB9IGZyb20gXCJAYXdzLXNkay9jbGllbnQtbGV4LXJ1bnRpbWUtdjJcIlxuaW1wb3J0IHsgSW50ZW50TmFtZXMgfSBmcm9tIFwiLi4vLi4vc3JjL3JlbWluZGVyQm90TGV4MkxhbWJkYS9pbnRlbnRIYW5kbGVycy9jb25zdGFudHNcIlxuXG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIlxuXG5jb25zdCBEaWFsb2dIZWxwZXJzID0gcmVxdWlyZShcIi4uLy4uL3NyYy9zaGFyZWRMaWJyYXJpZXMvRGlhbG9nSGVscGVyc1wiKVxuY29uc3QgQ29tbW9uVXRpbHMgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3NoYXJlZExpYnJhcmllcy9Db21tb25VdGlsc1wiKVxuXG5jb25zdCBUSU1FX1NMT1QgPSBcIlRpbWVcIlxuXG5jb25zdCBUSU1FX1BFUklPRF9WQUxVRVMgPSBbXCJBTVwiLCBcIlBNXCIsIFwiTU9cIiwgXCJBRlwiLCBcIkVWXCIsIFwiTklcIl1cbmNvbnN0IFRJTUVfUEVSSU9EX1NFU1NJT05fQVRUUiA9IFwidGltZXBlcmlvZFwiXG5cbmNvbnN0IFRJTUVfU0xPVF9QUk9NUFRfQ09ERV9IT09LX0xBQkVMID0gXCJDYWxsSW50ZW50X1RpbWVTbG90X1Byb21wdENvZGVIb29rXCJcbmNvbnN0IFRJTUVfU0xPVF9WQUxJREFUSU9OX0NPREVfSE9PS19MQUJFTCA9IFwiQ2FsbEludGVudF9UaW1lU2xvdF9WYWxpZGF0aW9uQ29kZUhvb2tcIlxuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlcihldmVudDogTGV4Q29kZUhvb2tJbnB1dEV2ZW50KSB7XG4gIGxldCByZXNwb25zZSA9IERpYWxvZ0hlbHBlcnMucGFzc1Rocm91Z2goZXZlbnQpXG4gIGNvbnN0IGludGVudCA9IGV2ZW50LnNlc3Npb25TdGF0ZS5pbnRlbnRcblxuICAvLyBAdHMtaWdub3JlIGludGVudCB3aWxsIG5ldmVyIGJlIHVuZGVmaW5lZCBpbiB0aGUgSW50ZW50IEhhbmRsZXJcbiAgaWYgKGludGVudC5uYW1lICE9PSBJbnRlbnROYW1lcy5DQUxMX0lOVEVOVCkge1xuICAgIGNvbnNvbGUuZXJyb3IoYFdyb25nIGhhbmRsZXIgZm9yIGludGVudCBjYWxsZWQsIGN1cnJlbnQgaW50ZW50IGlzICR7aW50ZW50fWApXG4gICAgLy8gRGVjaWRlIGhvdyB5b3Ugd291bGQgbGlrZSB0byBoYW5kbGUgdGhpcyB3aXRoIHRoZSBsZWFzdCBkaXNydXB0aW9uIHRvIHlvdXIgdXNlclxuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSB0aGUgY29ycmVjdCBsb2dpYyB0byBydW4gYmFzZWQgb24gd2hhdCBjb2RlIGhvb2sgdGhlIHJlcXVlc3QgaGFzIGNvbWUgZnJvbVxuICAgKi9cbiAgaWYgKGV2ZW50Lmludm9jYXRpb25Tb3VyY2UgPT09IEludm9jYXRpb25Tb3VyY2UuRElBTE9HX0NPREVfSE9PSykge1xuICAgIGlmIChldmVudC5pbnZvY2F0aW9uTGFiZWwgPT09IFRJTUVfU0xPVF9QUk9NUFRfQ09ERV9IT09LX0xBQkVMKSB7XG4gICAgICAvLyBDaGVjayB0aGUgdXNlciBpbnB1dCwgc28gd2UgY2FuIGFkanVzdCB0aGUgcHJvbXB0IGZvciBhbWJpZ3VvdXMgb3IgdGltZSBwZXJpb2QgdmFsdWVzXG4gICAgICByZXNwb25zZSA9IGNoZWNrVXNlcklucHV0KGV2ZW50KVxuICAgIH0gZWxzZSBpZiAoZXZlbnQuaW52b2NhdGlvbkxhYmVsID09PSBUSU1FX1NMT1RfVkFMSURBVElPTl9DT0RFX0hPT0tfTEFCRUwpIHtcbiAgICAgIC8vIGZpbmFsIHZhbGlkYXRpb24gb24gc2xvdFxuICAgICAgcmVzcG9uc2UgPSB2YWxpZGF0ZVRpbWVTbG90KGV2ZW50KVxuICAgIH1cbiAgfSBlbHNlIGlmIChldmVudC5pbnZvY2F0aW9uU291cmNlID09PSBJbnZvY2F0aW9uU291cmNlLkZVTEZJTExNRU5UX0NPREVfSE9PSykge1xuICAgIC8vIGJvb2sgdGhlIGNhbGxcbiAgICByZXNwb25zZSA9IGZ1bGZpbEludGVudChldmVudClcbiAgfVxuXG4gIHJldHVybiByZXNwb25zZVxufVxuXG4vKipcbiAqIEZvciBGdWxmaWxsbWVudCwgd2Ugd2lsbCB0YWtlIGFjdGlvbiBvbiBib29rIHRoZSBjYWxsIGFuZCB0aGVuIHNlbmQgYVxuICogIHJlc3BvbnNlIHdpdGggU3RhdGUgb2YgRnVsZmlsbGVkIGFuZCBhIERpYWxvZ0FjdGlvbiBvZiBDTE9TRVxuICovXG5jb25zdCBmdWxmaWxJbnRlbnQgPSAoZXZlbnQ6IExleENvZGVIb29rSW5wdXRFdmVudCkgPT4ge1xuICAvL2NsZWFyIHRoZSB0aW1lIHBlcmlvZCBzZXNzaW9uIGF0dHJpYnV0ZVxuICBldmVudC5zZXNzaW9uU3RhdGUuc2Vzc2lvbkF0dHJpYnV0ZXNbVElNRV9QRVJJT0RfU0VTU0lPTl9BVFRSXSA9IFwiXCJcblxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vIEFERCBMT0dJQyBIRVJFIFRPIEFDVFVBTExZIEJPT0sgVEhFIENBTEwgLi4uLlxuICAvL1xuICAvLyBJTiBUSEUgUkVBTCBXT1JMRCBXRSBXT1VMRCBCRSBSRUFDSElORyBPVVQgVE8gRVhURVJOQUwgU1lTVEVNUyBIRVJFXG4gIC8vIEZPUiBOT1cgV0UnUkUgSlVTVCBHT0lORyBUTyBSRVNQT05EIEFTIElGIFdFIERJRCBCT09LIFRIRSBDQUxMXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbiAgY29uc3QgaHVtYW5GcmllbmRseVRpbWUgPSBtb21lbnQoQ29tbW9uVXRpbHMuZ2V0U2Vzc2lvblN0YXRlU2xvdFZhbHVlKGV2ZW50LCBUSU1FX1NMT1QpLmludGVycHJldGVkVmFsdWUsIFtcbiAgICBcIkhIOm1tXCIsXG4gIF0pLmZvcm1hdChcImg6bW0gQVwiKVxuXG4gIHJldHVybiBEaWFsb2dIZWxwZXJzLmZ1bGZpbGxJbnRlbnQoZXZlbnQuc2Vzc2lvblN0YXRlLCBldmVudC5yZXF1ZXN0QXR0cmlidXRlcyB8fCB7fSwgW1xuICAgIHtcbiAgICAgIGNvbnRlbnRUeXBlOiBNZXNzYWdlQ29udGVudFR5cGUuUExBSU5fVEVYVCxcbiAgICAgIGNvbnRlbnQ6IGBZb3VyIGNhbGwgaGFzIGJlZW4gc2NoZWR1bGVkIGZvciAke2h1bWFuRnJpZW5kbHlUaW1lfWAsXG4gICAgfSxcbiAgXSlcbn1cblxuLyoqXG4gKiBBZnRlciB3ZSBjb2xsZWN0IHRoZSBzbG90IHZhbHVlIHdlIHdhbnQgdG9cbiAqICAtIGNoZWNrIGl0IGhhcyBiZWVuIGZpbGxlZCB3aXRoIGEgdGltZSBhbmQgbm90IGEgdGltZSBwZXJpb2QgKGluIHdoaWNoIGNhc2Ugd2Ugd291bGQgcmV0dXJuIHRvIEVsaWNpdFNsb3QpXG4gKiAgLSBpZiBpdCBpcyBhIHZhbGlkIHRpbWUgd2UgcmV0dXJuIGNvbnRyb2wgdG8gTGV4IHRvIG1vdmUgdG8gdGhlIG5leHQgc3RlcFxuICogQHBhcmFtIGV2ZW50XG4gKi9cbmNvbnN0IHZhbGlkYXRlVGltZVNsb3QgPSAoZXZlbnQ6IExleENvZGVIb29rSW5wdXRFdmVudCkgPT4ge1xuICBjb25zdCB0aW1lU2xvdFZhbHVlID0gQ29tbW9uVXRpbHMuZ2V0U2Vzc2lvblN0YXRlU2xvdFZhbHVlKGV2ZW50LCBUSU1FX1NMT1QpXG5cbiAgLy8gVmFsaWRhdGUgdGhhdCB0aGUgaW50ZXJwcmV0ZWRWYWx1ZSBpc24ndCBhIHRpbWUgcGVyaW9kXG4gIC8vIChpZiB2YWx1ZSB3YXMgY29sbGVjdGVkIGF0IEVsaWNpdEludGVudCB0aGUgQ2FsbEludGVudF9UaW1lU2xvdF9Qcm9tcHRDb2RlSG9vayB3aWxsIGhhdmUgYmVlbiBza2lwcGVkKVxuICBpZiAoaXNUaW1lUGVyaW9kKHRpbWVTbG90VmFsdWUuaW50ZXJwcmV0ZWRWYWx1ZSkpIHtcbiAgICByZXR1cm4gYXNrRm9yU3BlY2lmaWNUaW1lV2l0aGluVGltZVBlcmlvZCh0aW1lU2xvdFZhbHVlLmludGVycHJldGVkVmFsdWUsIGV2ZW50KVxuICB9IGVsc2Uge1xuICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAvLyBMT0dJQyBDT1VMRCBCRSBBRERFRCBIRVJFIFRPIENIRUNLIFRISVMgVElNRSBJUyBBVkFJTEFCTEUgQlkgUkVBQ0hJTkcgT1VUIFRPIE9VUiBCT09LSU5HIFNZU1RFTVxuICAgIC8vIFRISVMgV09VTEQgQUxMT1cgVVMgVE8gUkUtUFJPTVBUIFRIRSBVU0VSIEZPUiBBIE5FVyBUSU1FIElGIE5FRURFRFxuICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuICAgIC8vSWYgd2UgaGF2ZSBhIHZhbGlkIHRpbWUsIHBhc3MgdGhyb3VnaCB0byBuZXh0IHN0ZXBcbiAgICByZXR1cm4gRGlhbG9nSGVscGVycy5wYXNzVGhyb3VnaChldmVudClcbiAgfVxufVxuLyoqXG4gKiBPbiBlYWNoIGVsaWNpdGF0aW9uIHdpdGhpbiB0aGUgVGltZSBTbG90IHdlIHdpbGwgZG8gdGhlIGZvbGxvd2luZzpcbiAqIC0gSWYgdGhlIHNsb3QgaXMgZmlsbGVkIChoYXMgaW50ZXJwcmV0ZWRWYWx1ZSkgd2Ugd2lsbCBjaGVjayBpdCBpcyBhIHZhbGlkIHRpbWUgdmFsdWVcbiAqICAgICAgLSBJZiBub3Qgd2Ugd2lsbCBhc2sgdGhlIHVzZXIgdG8gY2xhcmlmeVxuICogICAgICAtIEVsc2Ugd2Ugd2lsbCBqdXN0IGRlbGVnYXRlIGJhY2sgdG8gTGV4XG4gKiAtIElmIHRoZSBzbG90IGlzIE5PVCBmaWxsZWQgd2Ugd2lsbCBjaGVjayBpZiB0aGVyZSBpcyBtb3JlIHRoYW4gb25lIHJlc29sdmVkIHZhbHVlXG4gKiAgICAgLSBJZiB0aGVyZSBpcyBtb3JlIHRoYW4gb25lLCB3ZSB3aWxsIHVzZSB0aG9zZSB0byBhc2sgdGhlIHVzZXIgdG8gY2xhcmlmeSB3aXRoIG9uZVxuICogICAgIC0gRWxzZSB3ZSB3aWxsIGp1c3QgZGVsZWdhdGUgYmFjayB0byBMZXhcbiAqL1xuY29uc3QgY2hlY2tVc2VySW5wdXQgPSAoZXZlbnQ6IExleENvZGVIb29rSW5wdXRFdmVudCkgPT4ge1xuICBjb25zdCB0aW1lU2xvdFZhbHVlID0gQ29tbW9uVXRpbHMuZ2V0U2Vzc2lvblN0YXRlU2xvdFZhbHVlKGV2ZW50LCBUSU1FX1NMT1QpXG5cbiAgLy8gY2hlY2sgaXQgaXNuJ3QgYSB0aW1lIHBlcmlvZCByYXRoZXIgdGhhbiBhIHNwZWNpZmljIHRpbWVcbiAgaWYgKGlzVGltZVBlcmlvZCh0aW1lU2xvdFZhbHVlLmludGVycHJldGVkVmFsdWUpKSB7XG4gICAgLy8gaWYgaXQgaXMsIGFzayBmb3IgY2xhcmlmaWNhdGlvblxuICAgIHJldHVybiBhc2tGb3JTcGVjaWZpY1RpbWVXaXRoaW5UaW1lUGVyaW9kKHRpbWVTbG90VmFsdWUuaW50ZXJwcmV0ZWRWYWx1ZSwgZXZlbnQpXG4gIH1cbiAgLy8gb3RoZXJ3aXNlIGNoZWNrIGlmIHRoZXJlIGFyZSBwb3RlbnRpYWwgdmFsdWVzIGxpc3RlZFxuICBlbHNlIHtcbiAgICByZXR1cm4gY2hlY2tGb3JBbWJpZ3VvdXNUaW1lU2xvdFZhbHVlKGV2ZW50KVxuICB9XG59XG5cbmNvbnN0IGlzQW1iaWd1b3VzU2xvdFZhbHVlID0gKHNsb3Q6IFZhbHVlKSA9PiB7XG4gIHJldHVybiBzbG90ICYmIHNsb3QucmVzb2x2ZWRWYWx1ZXMgJiYgc2xvdC5yZXNvbHZlZFZhbHVlcy5sZW5ndGggPiAxXG59XG5cbmNvbnN0IGNoZWNrRm9yQW1iaWd1b3VzVGltZVNsb3RWYWx1ZSA9IChldmVudDogTGV4Q29kZUhvb2tJbnB1dEV2ZW50KSA9PiB7XG4gIGNvbnN0IHRpbWVTbG90VmFsdWUgPSBDb21tb25VdGlscy5nZXRTZXNzaW9uU3RhdGVTbG90VmFsdWUoZXZlbnQsIFRJTUVfU0xPVClcbiAgaWYgKGlzQW1iaWd1b3VzU2xvdFZhbHVlKHRpbWVTbG90VmFsdWUpKSB7XG4gICAgcmV0dXJuIGRpc2FtYmlndWF0ZVZhbHVlcyhldmVudCwgdGltZVNsb3RWYWx1ZS5yZXNvbHZlZFZhbHVlcylcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gRGlhbG9nSGVscGVycy5wYXNzVGhyb3VnaChldmVudClcbiAgfVxufVxuXG5jb25zdCBpc1RpbWVQZXJpb2QgPSAoaW50ZXJwcmV0ZWRWYWx1ZTogc3RyaW5nKSA9PiB7XG4gIHJldHVybiBpbnRlcnByZXRlZFZhbHVlICYmIGludGVycHJldGVkVmFsdWUgIT09IFwiXCIgJiYgVElNRV9QRVJJT0RfVkFMVUVTLmluY2x1ZGVzKGludGVycHJldGVkVmFsdWUpXG59XG5cbmNvbnN0IGRpc2FtYmlndWF0ZVZhbHVlcyA9IChldmVudDogTGV4Q29kZUhvb2tJbnB1dEV2ZW50LCByZXNvbHZlZFZhbHVlczogc3RyaW5nW10pID0+IHtcbiAgbGV0IGRpc2FtYmlndWF0ZWRWYWx1ZSA9IHJlc29sdmVUaW1lRnJvbVRpbWVQZXJpb2QoZXZlbnQsIHJlc29sdmVkVmFsdWVzKVxuICBpZiAoZGlzYW1iaWd1YXRlZFZhbHVlICE9PSBcIlwiKSB7XG4gICAgLy8gSWYgd2UgcmVzb2x2ZWQgYSB2YWx1ZSwgc2V0IHRoZSBzbG90IHRvIHRoZSBtYXRjaGVkIHZhbHVlIGJlZm9yZSB3ZSBwYXNzIGJhY2sgdG8gTGV4IHRvIGhhbmRsZSB0aGUgbmV4dCBzdGVwXG4gICAgLy8gQHRzLWlnbm9yZSAtIHRvIGhhdmUgcmVhY2hlZCB0aGlzIHBvaW50IHRoaXMgd2lsbCBoYXZlIHRvIGV4aXN0IHNvIG5vdCBhZGRpbmcgbnVsbCBjaGVja3NcbiAgICBldmVudC5zZXNzaW9uU3RhdGUuaW50ZW50LnNsb3RzW1RJTUVfU0xPVF0udmFsdWUuaW50ZXJwcmV0ZWRWYWx1ZSA9IGRpc2FtYmlndWF0ZWRWYWx1ZVxuICAgIHJldHVybiBEaWFsb2dIZWxwZXJzLnBhc3NUaHJvdWdoKGV2ZW50KVxuICB9IGVsc2Uge1xuICAgIC8vIElmIHdlIGhhdmVuJ3QgcmVzb2x2ZWQgYSB2YWx1ZSwgYXNrIHRoZSB1c2VyIGZvciBjbGFyaWZpY2F0aW9uXG4gICAgcmV0dXJuIGFza0ZvclRpbWVDbGFyaWZpY2F0aW9uKHJlc29sdmVkVmFsdWVzLCBldmVudClcbiAgfVxufVxuXG5jb25zdCByZXNvbHZlVGltZUZyb21UaW1lUGVyaW9kID0gKGV2ZW50OiBMZXhDb2RlSG9va0lucHV0RXZlbnQsIHJlc29sdmVkVmFsdWVzOiBzdHJpbmdbXSkgPT4ge1xuICBsZXQgZGlzYW1iaWd1YXRlZFRpbWUgPSBcIlwiXG5cbiAgLy8gY2hlY2sgaWYgdGhlIHVzZXIgYWxyZWFkeSBpbmRpY2F0ZWQgYSB0aW1lIHBlcmlvZCwgaWYgdGhleSBoYXZlbid0LCB3ZSBjYW4gcmV0dXJuIGFuIGVtcHR5IHN0cmluZ1xuICBjb25zdCB0aW1lUGVyaW9kID0gZXZlbnQuc2Vzc2lvblN0YXRlLnNlc3Npb25BdHRyaWJ1dGVzW1RJTUVfUEVSSU9EX1NFU1NJT05fQVRUUl1cbiAgaWYgKHRpbWVQZXJpb2QgJiYgdGltZVBlcmlvZCAhPSBcIlwiKSB7XG4gICAgLy8gVHJ5IHRvIG1hdGNoIGEgcmVzb2x2ZWQgdGltZSB3aXRoIHRoZSB0aW1lIHBlcmlvZCB0aGUgdXNlciBoYXMgZ2l2ZW5cbiAgICByZXNvbHZlZFZhbHVlcy5mb3JFYWNoKChyZXNvbHZlZFZhbHVlKSA9PiB7XG4gICAgICBpZiAoW1wiTU9cIiwgXCJBTVwiXS5pbmNsdWRlcyh0aW1lUGVyaW9kKSAmJiByZXNvbHZlZFZhbHVlID49IFwiMDA6MDBcIiAmJiByZXNvbHZlZFZhbHVlIDw9IFwiMTI6MDBcIikge1xuICAgICAgICBkaXNhbWJpZ3VhdGVkVGltZSA9IHJlc29sdmVkVmFsdWVcbiAgICAgIH0gZWxzZSBpZiAoW1wiQUZcIiwgXCJQTVwiXS5pbmNsdWRlcyh0aW1lUGVyaW9kKSAmJiByZXNvbHZlZFZhbHVlID49IFwiMTI6MDBcIiAmJiByZXNvbHZlZFZhbHVlIDw9IFwiMTg6MDBcIikge1xuICAgICAgICBkaXNhbWJpZ3VhdGVkVGltZSA9IHJlc29sdmVkVmFsdWVcbiAgICAgIH0gZWxzZSBpZiAoW1wiRVZcIiwgXCJOSVwiLCBcIlBNXCJdLmluY2x1ZGVzKHRpbWVQZXJpb2QpICYmIHJlc29sdmVkVmFsdWUgPj0gXCIxODowMFwiICYmIHJlc29sdmVkVmFsdWUgPD0gXCIyMzo1OVwiKSB7XG4gICAgICAgIGRpc2FtYmlndWF0ZWRUaW1lID0gcmVzb2x2ZWRWYWx1ZVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIGRpc2FtYmlndWF0ZWRUaW1lXG59XG5cbmNvbnN0IGFza0ZvclRpbWVDbGFyaWZpY2F0aW9uID0gKHJlc29sdmVkVmFsdWVzOiBzdHJpbmdbXSwgZXZlbnQ6IExleENvZGVIb29rSW5wdXRFdmVudCkgPT4ge1xuICAvLyBtYXAgaW4gYSBodW1hbiBmcmllbmRseSB2ZXJzaW9uIG9mIHRoZSB0aW1lc1xuICByZXNvbHZlZFZhbHVlcyA9IHJlc29sdmVkVmFsdWVzLm1hcCgodmFsdWUpID0+IG1vbWVudCh2YWx1ZSwgW1wiSEg6bW1cIl0pLmZvcm1hdChcImg6bW0gQVwiKSlcblxuICAvLyBjb25jYXRlbmF0ZSB0aGUgcmVzb2x2ZWQgdmFsdWVzIHdpdGggJ29yJyBiZXR3ZWVuIHRoZW1cbiAgY29uc3QgcmVzb2x2ZWRWYWx1ZXNTdHJpbmcgPSByZXNvbHZlZFZhbHVlcy5qb2luKFwiIG9yIFwiKVxuXG4gIC8vIHNldCB0aGUgbmV4dCBzdGVwIHRvIGEgcmUtcHJvbXB0IGZvciB0aGUgc2xvdFxuICByZXR1cm4gRGlhbG9nSGVscGVycy5wcm9tcHRGb3JTbG90KFxuICAgIGV2ZW50LnNlc3Npb25TdGF0ZSxcbiAgICBldmVudC5yZXF1ZXN0QXR0cmlidXRlcyB8fCB7fSxcbiAgICBUSU1FX1NMT1QsXG4gICAgZXZlbnQuc2Vzc2lvblN0YXRlLmludGVudCxcbiAgICBbXG4gICAgICB7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBNZXNzYWdlQ29udGVudFR5cGUuUExBSU5fVEVYVCxcbiAgICAgICAgY29udGVudDogYFdvdWxkIHlvdSBsaWtlICR7cmVzb2x2ZWRWYWx1ZXNTdHJpbmd9P2AsXG4gICAgICB9LFxuICAgIF1cbiAgKVxufVxuXG5jb25zdCBhc2tGb3JTcGVjaWZpY1RpbWVXaXRoaW5UaW1lUGVyaW9kID0gKHZhbHVlOiBzdHJpbmcsIGV2ZW50OiBMZXhDb2RlSG9va0lucHV0RXZlbnQpID0+IHtcbiAgLy8gbWFwIG9mIHZhbHVlcyB0byBodW1hbi1mcmllbmRseSBvbmVzXG4gIGNvbnN0IHRpbWVQZXJpb2RNYXBwaW5nOiB7IFtpbmRleDogc3RyaW5nXTogc3RyaW5nIH0gPSB7XG4gICAgQU06IFwibW9ybmluZ1wiLFxuICAgIFBNOiBcImV2ZW5pbmdcIixcbiAgICBNTzogXCJtb3JuaW5nXCIsXG4gICAgQUY6IFwiYWZ0ZXJub29uXCIsXG4gICAgRVY6IFwiZXZlbmluZ1wiLFxuICAgIE5JOiBcImV2ZW5pbmdcIixcbiAgfVxuXG4gIC8vIGFkZCB2YWx1ZSB0byBzZXNzaW9uLCBzbyB3ZSBjYW4gdXNlIGl0IGZvciBmdXR1cmUgZGlzYW1iaWd1YXRpb24gaWYgbmVlZGVkXG4gIGV2ZW50LnNlc3Npb25TdGF0ZS5zZXNzaW9uQXR0cmlidXRlc1tUSU1FX1BFUklPRF9TRVNTSU9OX0FUVFJdID0gQ29tbW9uVXRpbHMuZ2V0U2Vzc2lvblN0YXRlU2xvdFZhbHVlKFxuICAgIGV2ZW50LFxuICAgIFRJTUVfU0xPVFxuICApLmludGVycHJldGVkVmFsdWVcblxuICAvLyBhZGQgaHVtYW4tZnJpZW5kbHkgdmFsdWUgaW50byBtZXNzYWdlLCBvciBkZWZhdWx0IHRvIGRheSBpZiB0aGUgdmFsdWUgY2FuJ3QgYmUgbWFwcGVkXG4gIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgY29udGVudFR5cGU6IE1lc3NhZ2VDb250ZW50VHlwZS5QTEFJTl9URVhULFxuICAgIGNvbnRlbnQ6IGBXaGF0IHRpbWUgaW4gdGhlICR7dGltZVBlcmlvZE1hcHBpbmdbdmFsdWVdIHx8IFwiZGF5XCJ9IHdvdWxkIHlvdSBsaWtlP2AsXG4gIH1cblxuICAvLyBzZXQgdGhlIG5leHQgc3RlcCB0byBhIHJlLXByb21wdCBmb3IgdGhlIHNsb3RcbiAgcmV0dXJuIERpYWxvZ0hlbHBlcnMucHJvbXB0Rm9yU2xvdChcbiAgICBldmVudC5zZXNzaW9uU3RhdGUsXG4gICAgZXZlbnQucmVxdWVzdEF0dHJpYnV0ZXMgfHwge30sXG4gICAgVElNRV9TTE9ULFxuICAgIGV2ZW50LnNlc3Npb25TdGF0ZS5pbnRlbnQsXG4gICAgW21lc3NhZ2VdXG4gIClcbn1cbiJdfQ==