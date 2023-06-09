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
 * - If the slot is NOT filled we will check if there is more than one resolved value
 *     - If there is more than one, we will use those to ask the user to clarify with one
 *     - Else we will just delegate back to Lex
 */
const checkUserInput = (event) => {
    return checkForAmbiguousTimeSlotValue(event);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsbEludGVudEhhbmRsZXItdjQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYWxsSW50ZW50SGFuZGxlci12NC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSwwRUFBMEU7QUFHMUUsb0RBQTJCO0FBRTNCLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFBO0FBQ3hFLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFBO0FBRXBFLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQTtBQUV4QixNQUFNLGdDQUFnQyxHQUFHLG9DQUFvQyxDQUFBO0FBQzdFLE1BQU0sb0NBQW9DLEdBQUcsd0NBQXdDLENBQUE7QUFFckYsU0FBZ0IsT0FBTyxDQUFDLEtBQTRCO0lBQ2xELElBQUksUUFBUSxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDL0MsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUE7SUFFeEMsa0VBQWtFO0lBQ2xFLElBQUksTUFBTSxDQUFDLElBQUksK0NBQTRCLEVBQUU7UUFDM0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxzREFBc0QsTUFBTSxFQUFFLENBQUMsQ0FBQTtRQUM3RSxrRkFBa0Y7UUFDbEYsT0FBTyxRQUFRLENBQUE7S0FDaEI7SUFFRDs7T0FFRztJQUNILElBQUksS0FBSyxDQUFDLGdCQUFnQiw2REFBc0MsRUFBRTtRQUNoRSxJQUFJLEtBQUssQ0FBQyxlQUFlLEtBQUssZ0NBQWdDLEVBQUU7WUFDOUQsd0ZBQXdGO1lBQ3hGLFFBQVEsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDakM7YUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLEtBQUssb0NBQW9DLEVBQUU7WUFDekUsMkJBQTJCO1lBQzNCLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUNuQztLQUNGO1NBQU0sSUFB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LENBQUE7QUFDSCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbnZvY2F0aW9uU291cmNlLCBMZXhDb2RlSG9va0lucHV0RXZlbnQgfSBmcm9tIFwiLi4vLi4vc3JjL3NoYXJlZExpYnJhcmllcy9MZXhDb2RlSG9va0ludGVyZmFjZXNcIlxuaW1wb3J0IHsgTWVzc2FnZUNvbnRlbnRUeXBlLCBWYWx1ZSB9IGZyb20gXCJAYXdzLXNkay9jbGllbnQtbGV4LXJ1bnRpbWUtdjJcIlxuaW1wb3J0IHsgSW50ZW50TmFtZXMgfSBmcm9tIFwiLi4vLi4vc3JjL3JlbWluZGVyQm90TGV4MkxhbWJkYS9pbnRlbnRIYW5kbGVycy9jb25zdGFudHNcIlxuXG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIlxuXG5jb25zdCBEaWFsb2dIZWxwZXJzID0gcmVxdWlyZShcIi4uLy4uL3NyYy9zaGFyZWRMaWJyYXJpZXMvRGlhbG9nSGVscGVyc1wiKVxuY29uc3QgQ29tbW9uVXRpbHMgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3NoYXJlZExpYnJhcmllcy9Db21tb25VdGlsc1wiKVxuXG5jb25zdCBUSU1FX1NMT1QgPSBcIlRpbWVcIlxuXG5jb25zdCBUSU1FX1NMT1RfUFJPTVBUX0NPREVfSE9PS19MQUJFTCA9IFwiQ2FsbEludGVudF9UaW1lU2xvdF9Qcm9tcHRDb2RlSG9va1wiXG5jb25zdCBUSU1FX1NMT1RfVkFMSURBVElPTl9DT0RFX0hPT0tfTEFCRUwgPSBcIkNhbGxJbnRlbnRfVGltZVNsb3RfVmFsaWRhdGlvbkNvZGVIb29rXCJcblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQ6IExleENvZGVIb29rSW5wdXRFdmVudCkge1xuICBsZXQgcmVzcG9uc2UgPSBEaWFsb2dIZWxwZXJzLnBhc3NUaHJvdWdoKGV2ZW50KVxuICBjb25zdCBpbnRlbnQgPSBldmVudC5zZXNzaW9uU3RhdGUuaW50ZW50XG5cbiAgLy8gQHRzLWlnbm9yZSBpbnRlbnQgd2lsbCBuZXZlciBiZSB1bmRlZmluZWQgaW4gdGhlIEludGVudCBIYW5kbGVyXG4gIGlmIChpbnRlbnQubmFtZSAhPT0gSW50ZW50TmFtZXMuQ0FMTF9JTlRFTlQpIHtcbiAgICBjb25zb2xlLmVycm9yKGBXcm9uZyBoYW5kbGVyIGZvciBpbnRlbnQgY2FsbGVkLCBjdXJyZW50IGludGVudCBpcyAke2ludGVudH1gKVxuICAgIC8vIERlY2lkZSBob3cgeW91IHdvdWxkIGxpa2UgdG8gaGFuZGxlIHRoaXMgd2l0aCB0aGUgbGVhc3QgZGlzcnVwdGlvbiB0byB5b3VyIHVzZXJcbiAgICByZXR1cm4gcmVzcG9uc2VcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgdGhlIGNvcnJlY3QgbG9naWMgdG8gcnVuIGJhc2VkIG9uIHdoYXQgY29kZSBob29rIHRoZSByZXF1ZXN0IGhhcyBjb21lIGZyb21cbiAgICovXG4gIGlmIChldmVudC5pbnZvY2F0aW9uU291cmNlID09PSBJbnZvY2F0aW9uU291cmNlLkRJQUxPR19DT0RFX0hPT0spIHtcbiAgICBpZiAoZXZlbnQuaW52b2NhdGlvbkxhYmVsID09PSBUSU1FX1NMT1RfUFJPTVBUX0NPREVfSE9PS19MQUJFTCkge1xuICAgICAgLy8gQ2hlY2sgdGhlIHVzZXIgaW5wdXQsIHNvIHdlIGNhbiBhZGp1c3QgdGhlIHByb21wdCBmb3IgYW1iaWd1b3VzIG9yIHRpbWUgcGVyaW9kIHZhbHVlc1xuICAgICAgcmVzcG9uc2UgPSBjaGVja1VzZXJJbnB1dChldmVudClcbiAgICB9IGVsc2UgaWYgKGV2ZW50Lmludm9jYXRpb25MYWJlbCA9PT0gVElNRV9TTE9UX1ZBTElEQVRJT05fQ09ERV9IT09LX0xBQkVMKSB7XG4gICAgICAvLyBmaW5hbCB2YWxpZGF0aW9uIG9uIHNsb3RcbiAgICAgIHJlc3BvbnNlID0gdmFsaWRhdGVUaW1lU2xvdChldmVudClcbiAgICB9XG4gIH0gZWxzZSBpZiAoZXZlbnQuaW52b2NhdGlvblNvdXJjZSA9PT0gSW52b2NhdGlvblNvdXJjZS5GVUxGSUxMTUVOVF9DT0RFX0hPT0spIHtcbiAgICAvLyBib29rIHRoZSBjYWxsXG4gICAgcmVzcG9uc2UgPSBmdWxmaWxJbnRlbnQoZXZlbnQpXG4gIH1cblxuICByZXR1cm4gcmVzcG9uc2Vcbn1cblxuLyoqXG4gKiBGb3IgRnVsZmlsbG1lbnQsIHdlIHdpbGwgdGFrZSBhY3Rpb24gb24gYm9vayB0aGUgY2FsbCBhbmQgdGhlbiBzZW5kIGFcbiAqICByZXNwb25zZSB3aXRoIFN0YXRlIG9mIEZ1bGZpbGxlZCBhbmQgYSBEaWFsb2dBY3Rpb24gb2YgQ0xPU0VcbiAqL1xuY29uc3QgZnVsZmlsSW50ZW50ID0gKGV2ZW50OiBMZXhDb2RlSG9va0lucHV0RXZlbnQpID0+IHtcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyBBREQgTE9HSUMgSEVSRSBUTyBBQ1RVQUxMWSBCT09LIFRIRSBDQUxMIC4uLi5cbiAgLy9cbiAgLy8gSU4gVEhFIFJFQUwgV09STEQgV0UgV09VTEQgQkUgUkVBQ0hJTkcgT1VUIFRPIEVYVEVSTkFMIFNZU1RFTVMgSEVSRVxuICAvLyBGT1IgTk9XIFdFJ1JFIEpVU1QgR09JTkcgVE8gUkVTUE9ORCBBUyBJRiBXRSBESUQgQk9PSyBUSEUgQ0FMTFxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG4gIGNvbnN0IGh1bWFuRnJpZW5kbHlUaW1lID0gbW9tZW50KENvbW1vblV0aWxzLmdldFNlc3Npb25TdGF0ZVNsb3RWYWx1ZShldmVudCwgVElNRV9TTE9UKS5pbnRlcnByZXRlZFZhbHVlLCBbXG4gICAgXCJISDptbVwiLFxuICBdKS5mb3JtYXQoXCJoOm1tIEFcIilcblxuICByZXR1cm4gRGlhbG9nSGVscGVycy5mdWxmaWxsSW50ZW50KGV2ZW50LnNlc3Npb25TdGF0ZSwgZXZlbnQucmVxdWVzdEF0dHJpYnV0ZXMgfHwge30sIFtcbiAgICB7XG4gICAgICBjb250ZW50VHlwZTogTWVzc2FnZUNvbnRlbnRUeXBlLlBMQUlOX1RFWFQsXG4gICAgICBjb250ZW50OiBgWW91ciBjYWxsIGhhcyBiZWVuIHNjaGVkdWxlZCBmb3IgJHtodW1hbkZyaWVuZGx5VGltZX1gLFxuICAgIH0sXG4gIF0pXG59XG5cbmNvbnN0IHZhbGlkYXRlVGltZVNsb3QgPSAoZXZlbnQ6IExleENvZGVIb29rSW5wdXRFdmVudCkgPT4ge1xuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vIExPR0lDIENPVUxEIEJFIEFEREVEIEhFUkUgVE8gQ0hFQ0sgVEhJUyBUSU1FIElTIEFWQUlMQUJMRSBCWSBSRUFDSElORyBPVVQgVE8gT1VSIEJPT0tJTkcgU1lTVEVNXG4gIC8vIFRISVMgV09VTEQgQUxMT1cgVVMgVE8gUkUtUFJPTVBUIFRIRSBVU0VSIEZPUiBBIE5FVyBUSU1FIElGIE5FRURFRFxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIHJldHVybiBEaWFsb2dIZWxwZXJzLnBhc3NUaHJvdWdoKGV2ZW50KVxufVxuLyoqXG4gKiBPbiBlYWNoIGVsaWNpdGF0aW9uIHdpdGhpbiB0aGUgVGltZSBTbG90IHdlIHdpbGwgZG8gdGhlIGZvbGxvd2luZzpcbiAqIC0gSWYgdGhlIHNsb3QgaXMgTk9UIGZpbGxlZCB3ZSB3aWxsIGNoZWNrIGlmIHRoZXJlIGlzIG1vcmUgdGhhbiBvbmUgcmVzb2x2ZWQgdmFsdWVcbiAqICAgICAtIElmIHRoZXJlIGlzIG1vcmUgdGhhbiBvbmUsIHdlIHdpbGwgdXNlIHRob3NlIHRvIGFzayB0aGUgdXNlciB0byBjbGFyaWZ5IHdpdGggb25lXG4gKiAgICAgLSBFbHNlIHdlIHdpbGwganVzdCBkZWxlZ2F0ZSBiYWNrIHRvIExleFxuICovXG5jb25zdCBjaGVja1VzZXJJbnB1dCA9IChldmVudDogTGV4Q29kZUhvb2tJbnB1dEV2ZW50KSA9PiB7XG4gIHJldHVybiBjaGVja0ZvckFtYmlndW91c1RpbWVTbG90VmFsdWUoZXZlbnQpXG59XG5cbmNvbnN0IGlzQW1iaWd1b3VzU2xvdFZhbHVlID0gKHNsb3Q6IFZhbHVlKSA9PiB7XG4gIHJldHVybiBzbG90ICYmIHNsb3QucmVzb2x2ZWRWYWx1ZXMgJiYgc2xvdC5yZXNvbHZlZFZhbHVlcy5sZW5ndGggPiAxXG59XG5cbmNvbnN0IGNoZWNrRm9yQW1iaWd1b3VzVGltZVNsb3RWYWx1ZSA9IChldmVudDogTGV4Q29kZUhvb2tJbnB1dEV2ZW50KSA9PiB7XG4gIGNvbnN0IHRpbWVTbG90VmFsdWUgPSBDb21tb25VdGlscy5nZXRTZXNzaW9uU3RhdGVTbG90VmFsdWUoZXZlbnQsIFRJTUVfU0xPVClcbiAgaWYgKGlzQW1iaWd1b3VzU2xvdFZhbHVlKHRpbWVTbG90VmFsdWUpKSB7XG4gICAgcmV0dXJuIGFza0ZvclRpbWVDbGFyaWZpY2F0aW9uKHRpbWVTbG90VmFsdWUucmVzb2x2ZWRWYWx1ZXMsIGV2ZW50KVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBEaWFsb2dIZWxwZXJzLnBhc3NUaHJvdWdoKGV2ZW50KVxuICB9XG59XG5cbmNvbnN0IGFza0ZvclRpbWVDbGFyaWZpY2F0aW9uID0gKHJlc29sdmVkVmFsdWVzOiBzdHJpbmdbXSwgZXZlbnQ6IExleENvZGVIb29rSW5wdXRFdmVudCkgPT4ge1xuICAvLyBtYXAgaW4gYSBodW1hbiBmcmllbmRseSB2ZXJzaW9uIG9mIHRoZSB0aW1lc1xuICByZXNvbHZlZFZhbHVlcyA9IHJlc29sdmVkVmFsdWVzLm1hcCgodmFsdWUpID0+IG1vbWVudCh2YWx1ZSwgW1wiSEg6bW1cIl0pLmZvcm1hdChcImg6bW0gQVwiKSlcblxuICAvLyBjb25jYXRlbmF0ZSB0aGUgcmVzb2x2ZWQgdmFsdWVzIHdpdGggJ29yJyBiZXR3ZWVuIHRoZW1cbiAgY29uc3QgcmVzb2x2ZWRWYWx1ZXNTdHJpbmcgPSByZXNvbHZlZFZhbHVlcy5qb2luKFwiIG9yIFwiKVxuXG4gIC8vIHNldCB0aGUgbmV4dCBzdGVwIHRvIGEgcmUtcHJvbXB0IGZvciB0aGUgc2xvdFxuICByZXR1cm4gRGlhbG9nSGVscGVycy5wcm9tcHRGb3JTbG90KFxuICAgIGV2ZW50LnNlc3Npb25TdGF0ZSxcbiAgICBldmVudC5yZXF1ZXN0QXR0cmlidXRlcyB8fCB7fSxcbiAgICBUSU1FX1NMT1QsXG4gICAgZXZlbnQuc2Vzc2lvblN0YXRlLmludGVudCxcbiAgICBbXG4gICAgICB7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBNZXNzYWdlQ29udGVudFR5cGUuUExBSU5fVEVYVCxcbiAgICAgICAgY29udGVudDogYFdvdWxkIHlvdSBsaWtlICR7cmVzb2x2ZWRWYWx1ZXNTdHJpbmd9P2AsXG4gICAgICB9LFxuICAgIF1cbiAgKVxufVxuIl19