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
const validateTimeSlot = (event) => {
    // ****************************
    // LOGIC COULD BE ADDED HERE TO CHECK THIS TIME IS AVAILABLE BY REACHING OUT TO OUR BOOKING SYSTEM
    // THIS WOULD ALLOW US TO RE-PROMPT THE USER FOR A NEW TIME IF NEEDED
    // ****************************
    return DialogHelpers.passThrough(event);
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
        return askForTimeClarification(timeSlotValue.resolvedValues, event);
    }
    else {
        return DialogHelpers.passThrough(event);
    }
};
const isTimePeriod = (interpretedValue) => {
    return interpretedValue && interpretedValue !== "" && TIME_PERIOD_VALUES.includes(interpretedValue);
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
    // add human-friendly value into message, or default to day if the value can't be mapped
    const message = {
        contentType: client_lex_runtime_v2_1.MessageContentType.PLAIN_TEXT,
        content: `What time in the ${timePeriodMapping[value] || "day"} would you like?`,
    };
    // set the next step to a re-prompt for the slot
    return DialogHelpers.promptForSlot(event.sessionState, event.requestAttributes || {}, TIME_SLOT, event.sessionState.intent, [message]);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsbEludGVudEhhbmRsZXItdjUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYWxsSW50ZW50SGFuZGxlci12NS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSwwRUFBMEU7QUFHMUUsb0RBQTJCO0FBRTNCLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFBO0FBQ3hFLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFBO0FBRXBFLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQTtBQUV4QixNQUFNLGtCQUFrQixHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUUvRCxNQUFNLGdDQUFnQyxHQUFHLG9DQUFvQyxDQUFBO0FBQzdFLE1BQU0sb0NBQW9DLEdBQUcsd0NBQXdDLENBQUE7QUFFckYsU0FBZ0IsT0FBTyxDQUFDLEtBQTRCO0lBQ2xELElBQUksUUFBUSxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDL0MsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUE7SUFFeEMsa0VBQWtFO0lBQ2xFLElBQUksTUFBTSxDQUFDLElBQUksK0NBQTRCLEVBQUU7UUFDM0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxzREFBc0QsTUFBTSxFQUFFLENBQUMsQ0FBQTtRQUM3RSxrRkFBa0Y7UUFDbEYsT0FBTyxRQUFRLENBQUE7S0FDaEI7SUFFRDs7T0FFRztJQUNILElBQUksS0FBSyxDQUFDLGdCQUFnQiw2REFBc0MsRUFBRTtRQUNoRSxJQUFJLEtBQUssQ0FBQyxlQUFlLEtBQUssZ0NBQWdDLEVBQUU7WUFDOUQsd0ZBQXdGO1lBQ3hGLFFBQVEsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDakM7YUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFl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QyxZQUFZLEVBQ2xCLEtBQUssQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLEVBQzdCLFNBQVMsRUFDVCxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFDekIsQ0FBQyxPQUFPLENBQUMsQ0FDVixDQUFBO0FBQ0gsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW52b2NhdGlvblNvdXJjZSwgTGV4Q29kZUhvb2tJbnB1dEV2ZW50IH0gZnJvbSBcIi4uLy4uL3NyYy9zaGFyZWRMaWJyYXJpZXMvTGV4Q29kZUhvb2tJbnRlcmZhY2VzXCJcbmltcG9ydCB7IE1lc3NhZ2VDb250ZW50VHlwZSwgVmFsdWUgfSBmcm9tIFwiQGF3cy1zZGsvY2xpZW50LWxleC1ydW50aW1lLXYyXCJcbmltcG9ydCB7IEludGVudE5hbWVzIH0gZnJvbSBcIi4uLy4uL3NyYy9yZW1pbmRlckJvdExleDJMYW1iZGEvaW50ZW50SGFuZGxlcnMvY29uc3RhbnRzXCJcblxuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCJcblxuY29uc3QgRGlhbG9nSGVscGVycyA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvc2hhcmVkTGlicmFyaWVzL0RpYWxvZ0hlbHBlcnNcIilcbmNvbnN0IENvbW1vblV0aWxzID0gcmVxdWlyZShcIi4uLy4uL3NyYy9zaGFyZWRMaWJyYXJpZXMvQ29tbW9uVXRpbHNcIilcblxuY29uc3QgVElNRV9TTE9UID0gXCJUaW1lXCJcblxuY29uc3QgVElNRV9QRVJJT0RfVkFMVUVTID0gW1wiQU1cIiwgXCJQTVwiLCBcIk1PXCIsIFwiQUZcIiwgXCJFVlwiLCBcIk5JXCJdXG5cbmNvbnN0IFRJTUVfU0xPVF9QUk9NUFRfQ09ERV9IT09LX0xBQkVMID0gXCJDYWxsSW50ZW50X1RpbWVTbG90X1Byb21wdENvZGVIb29rXCJcbmNvbnN0IFRJTUVfU0xPVF9WQUxJREFUSU9OX0NPREVfSE9PS19MQUJFTCA9IFwiQ2FsbEludGVudF9UaW1lU2xvdF9WYWxpZGF0aW9uQ29kZUhvb2tcIlxuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlcihldmVudDogTGV4Q29kZUhvb2tJbnB1dEV2ZW50KSB7XG4gIGxldCByZXNwb25zZSA9IERpYWxvZ0hlbHBlcnMucGFzc1Rocm91Z2goZXZlbnQpXG4gIGNvbnN0IGludGVudCA9IGV2ZW50LnNlc3Npb25TdGF0ZS5pbnRlbnRcblxuICAvLyBAdHMtaWdub3JlIGludGVudCB3aWxsIG5ldmVyIGJlIHVuZGVmaW5lZCBpbiB0aGUgSW50ZW50IEhhbmRsZXJcbiAgaWYgKGludGVudC5uYW1lICE9PSBJbnRlbnROYW1lcy5DQUxMX0lOVEVOVCkge1xuICAgIGNvbnNvbGUuZXJyb3IoYFdyb25nIGhhbmRsZXIgZm9yIGludGVudCBjYWxsZWQsIGN1cnJlbnQgaW50ZW50IGlzICR7aW50ZW50fWApXG4gICAgLy8gRGVjaWRlIGhvdyB5b3Ugd291bGQgbGlrZSB0byBoYW5kbGUgdGhpcyB3aXRoIHRoZSBsZWFzdCBkaXNydXB0aW9uIHRvIHlvdXIgdXNlclxuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSB0aGUgY29ycmVjdCBsb2dpYyB0byBydW4gYmFzZWQgb24gd2hhdCBjb2RlIGhvb2sgdGhlIHJlcXVlc3QgaGFzIGNvbWUgZnJvbVxuICAgKi9cbiAgaWYgKGV2ZW50Lmludm9jYXRpb25Tb3VyY2UgPT09IEludm9jYXRpb25Tb3VyY2UuRElBTE9HX0NPREVfSE9PSykge1xuICAgIGlmIChldmVudC5pbnZvY2F0aW9uTGFiZWwgPT09IFRJTUVfU0xPVF9QUk9NUFRfQ09ERV9IT09LX0xBQkVMKSB7XG4gICAgICAvLyBDaGVjayB0aGUgdXNlciBpbnB1dCwgc28gd2UgY2FuIGFkanVzdCB0aGUgcHJvbXB0IGZvciBhbWJpZ3VvdXMgb3IgdGltZSBwZXJpb2QgdmFsdWVzXG4gICAgICByZXNwb25zZSA9IGNoZWNrVXNlcklucHV0KGV2ZW50KVxuICAgIH0gZWxzZSBpZiAoZXZlbnQuaW52b2NhdGlvbkxhYmVsID09PSBUSU1FX1NMT1RfVkFMSURBVElPTl9DT0RFX0hPT0tfTEFCRUwpIHtcbiAgICAgIC8vIGZpbmFsIHZhbGlkYXRpb24gb24gc2xvdFxuICAgICAgcmVzcG9uc2UgPSB2YWxpZGF0ZVRpbWVTbG90KGV2ZW50KVxuICAgIH1cbiAgfSBlbHNlIGlmIChldmVudC5pbnZvY2F0aW9uU291cmNlID09PSBJbnZvY2F0aW9uU291cmNlLkZVTEZJTExNRU5UX0NPREVfSE9PSykge1xuICAgIC8vIGJvb2sgdGhlIGNhbGxcbiAgICByZXNwb25zZSA9IGZ1bGZpbEludGVudChldmVudClcbiAgfVxuXG4gIHJldHVybiByZXNwb25zZVxufVxuXG4vKipcbiAqIEZvciBGdWxmaWxsbWVudCwgd2Ugd2lsbCB0YWtlIGFjdGlvbiBvbiBib29rIHRoZSBjYWxsIGFuZCB0aGVuIHNlbmQgYVxuICogIHJlc3BvbnNlIHdpdGggU3RhdGUgb2YgRnVsZmlsbGVkIGFuZCBhIERpYWxvZ0FjdGlvbiBvZiBDTE9TRVxuICovXG5jb25zdCBmdWxmaWxJbnRlbnQgPSAoZXZlbnQ6IExleENvZGVIb29rSW5wdXRFdmVudCkgPT4ge1xuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vIEFERCBMT0dJQyBIRVJFIFRPIEFDVFVBTExZIEJPT0sgVEhFIENBTEwgLi4uLlxuICAvL1xuICAvLyBJTiBUSEUgUkVBTCBXT1JMRCBXRSBXT1VMRCBCRSBSRUFDSElORyBPVVQgVE8gRVhURVJOQUwgU1lTVEVNUyBIRVJFXG4gIC8vIEZPUiBOT1cgV0UnUkUgSlVTVCBHT0lORyBUTyBSRVNQT05EIEFTIElGIFdFIERJRCBCT09LIFRIRSBDQUxMXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbiAgY29uc3QgaHVtYW5GcmllbmRseVRpbWUgPSBtb21lbnQoQ29tbW9uVXRpbHMuZ2V0U2Vzc2lvblN0YXRlU2xvdFZhbHVlKGV2ZW50LCBUSU1FX1NMT1QpLmludGVycHJldGVkVmFsdWUsIFtcbiAgICBcIkhIOm1tXCIsXG4gIF0pLmZvcm1hdChcImg6bW0gQVwiKVxuXG4gIHJldHVybiBEaWFsb2dIZWxwZXJzLmZ1bGZpbGxJbnRlbnQoZXZlbnQuc2Vzc2lvblN0YXRlLCBldmVudC5yZXF1ZXN0QXR0cmlidXRlcyB8fCB7fSwgW1xuICAgIHtcbiAgICAgIGNvbnRlbnRUeXBlOiBNZXNzYWdlQ29udGVudFR5cGUuUExBSU5fVEVYVCxcbiAgICAgIGNvbnRlbnQ6IGBZb3VyIGNhbGwgaGFzIGJlZW4gc2NoZWR1bGVkIGZvciAke2h1bWFuRnJpZW5kbHlUaW1lfWAsXG4gICAgfSxcbiAgXSlcbn1cblxuY29uc3QgdmFsaWRhdGVUaW1lU2xvdCA9IChldmVudDogTGV4Q29kZUhvb2tJbnB1dEV2ZW50KSA9PiB7XG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gTE9HSUMgQ09VTEQgQkUgQURERUQgSEVSRSBUTyBDSEVDSyBUSElTIFRJTUUgSVMgQVZBSUxBQkxFIEJZIFJFQUNISU5HIE9VVCBUTyBPVVIgQk9PS0lORyBTWVNURU1cbiAgLy8gVEhJUyBXT1VMRCBBTExPVyBVUyBUTyBSRS1QUk9NUFQgVEhFIFVTRVIgRk9SIEEgTkVXIFRJTUUgSUYgTkVFREVEXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgcmV0dXJuIERpYWxvZ0hlbHBlcnMucGFzc1Rocm91Z2goZXZlbnQpXG59XG4vKipcbiAqIE9uIGVhY2ggZWxpY2l0YXRpb24gd2l0aGluIHRoZSBUaW1lIFNsb3Qgd2Ugd2lsbCBkbyB0aGUgZm9sbG93aW5nOlxuICogLSBJZiB0aGUgc2xvdCBpcyBmaWxsZWQgKGhhcyBpbnRlcnByZXRlZFZhbHVlKSB3ZSB3aWxsIGNoZWNrIGl0IGlzIGEgdmFsaWQgdGltZSB2YWx1ZVxuICogICAgICAtIElmIG5vdCB3ZSB3aWxsIGFzayB0aGUgdXNlciB0byBjbGFyaWZ5XG4gKiAgICAgIC0gRWxzZSB3ZSB3aWxsIGp1c3QgZGVsZWdhdGUgYmFjayB0byBMZXhcbiAqIC0gSWYgdGhlIHNsb3QgaXMgTk9UIGZpbGxlZCB3ZSB3aWxsIGNoZWNrIGlmIHRoZXJlIGlzIG1vcmUgdGhhbiBvbmUgcmVzb2x2ZWQgdmFsdWVcbiAqICAgICAtIElmIHRoZXJlIGlzIG1vcmUgdGhhbiBvbmUsIHdlIHdpbGwgdXNlIHRob3NlIHRvIGFzayB0aGUgdXNlciB0byBjbGFyaWZ5IHdpdGggb25lXG4gKiAgICAgLSBFbHNlIHdlIHdpbGwganVzdCBkZWxlZ2F0ZSBiYWNrIHRvIExleFxuICovXG5jb25zdCBjaGVja1VzZXJJbnB1dCA9IChldmVudDogTGV4Q29kZUhvb2tJbnB1dEV2ZW50KSA9PiB7XG4gIGNvbnN0IHRpbWVTbG90VmFsdWUgPSBDb21tb25VdGlscy5nZXRTZXNzaW9uU3RhdGVTbG90VmFsdWUoZXZlbnQsIFRJTUVfU0xPVClcblxuICAvLyBjaGVjayBpdCBpc24ndCBhIHRpbWUgcGVyaW9kIHJhdGhlciB0aGFuIGEgc3BlY2lmaWMgdGltZVxuICBpZiAoaXNUaW1lUGVyaW9kKHRpbWVTbG90VmFsdWUuaW50ZXJwcmV0ZWRWYWx1ZSkpIHtcbiAgICAvLyBpZiBpdCBpcywgYXNrIGZvciBjbGFyaWZpY2F0aW9uXG4gICAgcmV0dXJuIGFza0ZvclNwZWNpZmljVGltZVdpdGhpblRpbWVQZXJpb2QodGltZVNsb3RWYWx1ZS5pbnRlcnByZXRlZFZhbHVlLCBldmVudClcbiAgfVxuICAvLyBvdGhlcndpc2UgY2hlY2sgaWYgdGhlcmUgYXJlIHBvdGVudGlhbCB2YWx1ZXMgbGlzdGVkXG4gIGVsc2Uge1xuICAgIHJldHVybiBjaGVja0ZvckFtYmlndW91c1RpbWVTbG90VmFsdWUoZXZlbnQpXG4gIH1cbn1cblxuY29uc3QgaXNBbWJpZ3VvdXNTbG90VmFsdWUgPSAoc2xvdDogVmFsdWUpID0+IHtcbiAgcmV0dXJuIHNsb3QgJiYgc2xvdC5yZXNvbHZlZFZhbHVlcyAmJiBzbG90LnJlc29sdmVkVmFsdWVzLmxlbmd0aCA+IDFcbn1cblxuY29uc3QgY2hlY2tGb3JBbWJpZ3VvdXNUaW1lU2xvdFZhbHVlID0gKGV2ZW50OiBMZXhDb2RlSG9va0lucHV0RXZlbnQpID0+IHtcbiAgY29uc3QgdGltZVNsb3RWYWx1ZSA9IENvbW1vblV0aWxzLmdldFNlc3Npb25TdGF0ZVNsb3RWYWx1ZShldmVudCwgVElNRV9TTE9UKVxuICBpZiAoaXNBbWJpZ3VvdXNTbG90VmFsdWUodGltZVNsb3RWYWx1ZSkpIHtcbiAgICByZXR1cm4gYXNrRm9yVGltZUNsYXJpZmljYXRpb24odGltZVNsb3RWYWx1ZS5yZXNvbHZlZFZhbHVlcywgZXZlbnQpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIERpYWxvZ0hlbHBlcnMucGFzc1Rocm91Z2goZXZlbnQpXG4gIH1cbn1cblxuY29uc3QgaXNUaW1lUGVyaW9kID0gKGludGVycHJldGVkVmFsdWU6IHN0cmluZykgPT4ge1xuICByZXR1cm4gaW50ZXJwcmV0ZWRWYWx1ZSAmJiBpbnRlcnByZXRlZFZhbHVlICE9PSBcIlwiICYmIFRJTUVfUEVSSU9EX1ZBTFVFUy5pbmNsdWRlcyhpbnRlcnByZXRlZFZhbHVlKVxufVxuXG5jb25zdCBhc2tGb3JUaW1lQ2xhcmlmaWNhdGlvbiA9IChyZXNvbHZlZFZhbHVlczogc3RyaW5nW10sIGV2ZW50OiBMZXhDb2RlSG9va0lucHV0RXZlbnQpID0+IHtcbiAgLy8gbWFwIGluIGEgaHVtYW4gZnJpZW5kbHkgdmVyc2lvbiBvZiB0aGUgdGltZXNcbiAgcmVzb2x2ZWRWYWx1ZXMgPSByZXNvbHZlZFZhbHVlcy5tYXAoKHZhbHVlKSA9PiBtb21lbnQodmFsdWUsIFtcIkhIOm1tXCJdKS5mb3JtYXQoXCJoOm1tIEFcIikpXG5cbiAgLy8gY29uY2F0ZW5hdGUgdGhlIHJlc29sdmVkIHZhbHVlcyB3aXRoICdvcicgYmV0d2VlbiB0aGVtXG4gIGNvbnN0IHJlc29sdmVkVmFsdWVzU3RyaW5nID0gcmVzb2x2ZWRWYWx1ZXMuam9pbihcIiBvciBcIilcblxuICAvLyBzZXQgdGhlIG5leHQgc3RlcCB0byBhIHJlLXByb21wdCBmb3IgdGhlIHNsb3RcbiAgcmV0dXJuIERpYWxvZ0hlbHBlcnMucHJvbXB0Rm9yU2xvdChcbiAgICBldmVudC5zZXNzaW9uU3RhdGUsXG4gICAgZXZlbnQucmVxdWVzdEF0dHJpYnV0ZXMgfHwge30sXG4gICAgVElNRV9TTE9ULFxuICAgIGV2ZW50LnNlc3Npb25TdGF0ZS5pbnRlbnQsXG4gICAgW1xuICAgICAge1xuICAgICAgICBjb250ZW50VHlwZTogTWVzc2FnZUNvbnRlbnRUeXBlLlBMQUlOX1RFWFQsXG4gICAgICAgIGNvbnRlbnQ6IGBXb3VsZCB5b3UgbGlrZSAke3Jlc29sdmVkVmFsdWVzU3RyaW5nfT9gLFxuICAgICAgfSxcbiAgICBdXG4gIClcbn1cblxuY29uc3QgYXNrRm9yU3BlY2lmaWNUaW1lV2l0aGluVGltZVBlcmlvZCA9ICh2YWx1ZTogc3RyaW5nLCBldmVudDogTGV4Q29kZUhvb2tJbnB1dEV2ZW50KSA9PiB7XG4gIC8vIG1hcCBvZiB2YWx1ZXMgdG8gaHVtYW4tZnJpZW5kbHkgb25lc1xuICBjb25zdCB0aW1lUGVyaW9kTWFwcGluZzogeyBbaW5kZXg6IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICAgIEFNOiBcIm1vcm5pbmdcIixcbiAgICBQTTogXCJldmVuaW5nXCIsXG4gICAgTU86IFwibW9ybmluZ1wiLFxuICAgIEFGOiBcImFmdGVybm9vblwiLFxuICAgIEVWOiBcImV2ZW5pbmdcIixcbiAgICBOSTogXCJldmVuaW5nXCIsXG4gIH1cblxuICAvLyBhZGQgaHVtYW4tZnJpZW5kbHkgdmFsdWUgaW50byBtZXNzYWdlLCBvciBkZWZhdWx0IHRvIGRheSBpZiB0aGUgdmFsdWUgY2FuJ3QgYmUgbWFwcGVkXG4gIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgY29udGVudFR5cGU6IE1lc3NhZ2VDb250ZW50VHlwZS5QTEFJTl9URVhULFxuICAgIGNvbnRlbnQ6IGBXaGF0IHRpbWUgaW4gdGhlICR7dGltZVBlcmlvZE1hcHBpbmdbdmFsdWVdIHx8IFwiZGF5XCJ9IHdvdWxkIHlvdSBsaWtlP2AsXG4gIH1cblxuICAvLyBzZXQgdGhlIG5leHQgc3RlcCB0byBhIHJlLXByb21wdCBmb3IgdGhlIHNsb3RcbiAgcmV0dXJuIERpYWxvZ0hlbHBlcnMucHJvbXB0Rm9yU2xvdChcbiAgICBldmVudC5zZXNzaW9uU3RhdGUsXG4gICAgZXZlbnQucmVxdWVzdEF0dHJpYnV0ZXMgfHwge30sXG4gICAgVElNRV9TTE9ULFxuICAgIGV2ZW50LnNlc3Npb25TdGF0ZS5pbnRlbnQsXG4gICAgW21lc3NhZ2VdXG4gIClcbn1cbiJdfQ==