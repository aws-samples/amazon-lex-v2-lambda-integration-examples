"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_lex_runtime_v2_1 = require("@aws-sdk/client-lex-runtime-v2");
const DialogHelpers = require("../../src/sharedLibraries/DialogHelpers");
const CommonUtils = require("../../src/sharedLibraries/CommonUtils");
const TIME_SLOT = "Time";
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
    if (event.invocationSource === "FulfillmentCodeHook" /* InvocationSource.FULFILLMENT_CODE_HOOK */) {
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
    const time = CommonUtils.getSessionStateSlotValue(event, TIME_SLOT).interpretedValue;
    return DialogHelpers.fulfillIntent(event.sessionState, event.requestAttributes || {}, [
        {
            contentType: client_lex_runtime_v2_1.MessageContentType.PLAIN_TEXT,
            content: `Your call has been scheduled for ${time}`,
        },
    ]);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsbEludGVudEhhbmRsZXItdjEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYWxsSW50ZW50SGFuZGxlci12MS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwwRUFBbUU7QUFHbkUsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLHlDQUF5QyxDQUFDLENBQUE7QUFDeEUsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHVDQUF1QyxDQUFDLENBQUE7QUFFcEUsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFBO0FBRXhCLFNBQWdCLE9BQU8sQ0FBQyxLQUE0QjtJQUNsRCxJQUFJLFFBQVEsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQy9DLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFBO0lBRXhDLGtFQUFrRTtJQUNsRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLCtDQUE0QixFQUFFO1FBQzNDLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0RBQXNELE1BQU0sRUFBRSxDQUFDLENBQUE7UUFDN0Usa0ZBQWtGO1FBQ2xGLE9BQU8sUUFBUSxDQUFBO0tBQ2hCO0lBRUQ7O09BRUc7SUFDSCxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsdUVBQTJDLEVBQUU7UUFDckUsZ0JBQWdCO1FBQ2hCLFFBQVEsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUE7S0FDL0I7SUFFRCxPQUFPLFFBQVEsQ0FBQTtBQUNqQixDQUFDO0FBcEJELDBCQW9CQztBQUVEOzs7R0FHRztBQUNILE1BQU0sWUFBWSxHQUFHLENBQUMsS0FBNEIsRUFBRSxFQUFFO0lBQ3BELCtCQUErQjtJQUMvQixnREFBZ0Q7SUFDaEQsRUFBRTtJQUNGLHNFQUFzRTtJQUN0RSxpRUFBaUU7SUFDakUsZ0NBQWdDO0lBRWhDLE1BQU0sSUFBSSxHQUFHLFdBQVcsQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUMsZ0JBQWdCLENBQUE7SUFFcEYsT0FBTyxhQUFhLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLGlCQUFpQixJQUFJLEVBQUUsRUFBRTtRQUNwRjtZQUNFLFdBQVcsRUFBRSwwQ0FBa0IsQ0FBQyxVQUFVO1lBQzFDLE9BQU8sRUFBRSxvQ0FBb0MsSUFBSSxFQUFFO1NBQ3BEO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW52b2NhdGlvblNvdXJjZSwgTGV4Q29kZUhvb2tJbnB1dEV2ZW50IH0gZnJvbSBcIi4uLy4uL3NyYy9zaGFyZWRMaWJyYXJpZXMvTGV4Q29kZUhvb2tJbnRlcmZhY2VzXCJcbmltcG9ydCB7IE1lc3NhZ2VDb250ZW50VHlwZSB9IGZyb20gXCJAYXdzLXNkay9jbGllbnQtbGV4LXJ1bnRpbWUtdjJcIlxuaW1wb3J0IHsgSW50ZW50TmFtZXMgfSBmcm9tIFwiLi4vLi4vc3JjL3JlbWluZGVyQm90TGV4MkxhbWJkYS9pbnRlbnRIYW5kbGVycy9jb25zdGFudHNcIlxuXG5jb25zdCBEaWFsb2dIZWxwZXJzID0gcmVxdWlyZShcIi4uLy4uL3NyYy9zaGFyZWRMaWJyYXJpZXMvRGlhbG9nSGVscGVyc1wiKVxuY29uc3QgQ29tbW9uVXRpbHMgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3NoYXJlZExpYnJhcmllcy9Db21tb25VdGlsc1wiKVxuXG5jb25zdCBUSU1FX1NMT1QgPSBcIlRpbWVcIlxuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlcihldmVudDogTGV4Q29kZUhvb2tJbnB1dEV2ZW50KSB7XG4gIGxldCByZXNwb25zZSA9IERpYWxvZ0hlbHBlcnMucGFzc1Rocm91Z2goZXZlbnQpXG4gIGNvbnN0IGludGVudCA9IGV2ZW50LnNlc3Npb25TdGF0ZS5pbnRlbnRcblxuICAvLyBAdHMtaWdub3JlIGludGVudCB3aWxsIG5ldmVyIGJlIHVuZGVmaW5lZCBpbiB0aGUgSW50ZW50IEhhbmRsZXJcbiAgaWYgKGludGVudC5uYW1lICE9PSBJbnRlbnROYW1lcy5DQUxMX0lOVEVOVCkge1xuICAgIGNvbnNvbGUuZXJyb3IoYFdyb25nIGhhbmRsZXIgZm9yIGludGVudCBjYWxsZWQsIGN1cnJlbnQgaW50ZW50IGlzICR7aW50ZW50fWApXG4gICAgLy8gRGVjaWRlIGhvdyB5b3Ugd291bGQgbGlrZSB0byBoYW5kbGUgdGhpcyB3aXRoIHRoZSBsZWFzdCBkaXNydXB0aW9uIHRvIHlvdXIgdXNlclxuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSB0aGUgY29ycmVjdCBsb2dpYyB0byBydW4gYmFzZWQgb24gd2hhdCBjb2RlIGhvb2sgdGhlIHJlcXVlc3QgaGFzIGNvbWUgZnJvbVxuICAgKi9cbiAgaWYgKGV2ZW50Lmludm9jYXRpb25Tb3VyY2UgPT09IEludm9jYXRpb25Tb3VyY2UuRlVMRklMTE1FTlRfQ09ERV9IT09LKSB7XG4gICAgLy8gYm9vayB0aGUgY2FsbFxuICAgIHJlc3BvbnNlID0gZnVsZmlsSW50ZW50KGV2ZW50KVxuICB9XG5cbiAgcmV0dXJuIHJlc3BvbnNlXG59XG5cbi8qKlxuICogRm9yIEZ1bGZpbGxtZW50LCB3ZSB3aWxsIHRha2UgYWN0aW9uIG9uIGJvb2sgdGhlIGNhbGwgYW5kIHRoZW4gc2VuZCBhXG4gKiAgcmVzcG9uc2Ugd2l0aCBTdGF0ZSBvZiBGdWxmaWxsZWQgYW5kIGEgRGlhbG9nQWN0aW9uIG9mIENMT1NFXG4gKi9cbmNvbnN0IGZ1bGZpbEludGVudCA9IChldmVudDogTGV4Q29kZUhvb2tJbnB1dEV2ZW50KSA9PiB7XG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gQUREIExPR0lDIEhFUkUgVE8gQUNUVUFMTFkgQk9PSyBUSEUgQ0FMTCAuLi4uXG4gIC8vXG4gIC8vIElOIFRIRSBSRUFMIFdPUkxEIFdFIFdPVUxEIEJFIFJFQUNISU5HIE9VVCBUTyBFWFRFUk5BTCBTWVNURU1TIEhFUkVcbiAgLy8gRk9SIE5PVyBXRSdSRSBKVVNUIEdPSU5HIFRPIFJFU1BPTkQgQVMgSUYgV0UgRElEIEJPT0sgVEhFIENBTExcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuICBjb25zdCB0aW1lID0gQ29tbW9uVXRpbHMuZ2V0U2Vzc2lvblN0YXRlU2xvdFZhbHVlKGV2ZW50LCBUSU1FX1NMT1QpLmludGVycHJldGVkVmFsdWVcblxuICByZXR1cm4gRGlhbG9nSGVscGVycy5mdWxmaWxsSW50ZW50KGV2ZW50LnNlc3Npb25TdGF0ZSwgZXZlbnQucmVxdWVzdEF0dHJpYnV0ZXMgfHwge30sIFtcbiAgICB7XG4gICAgICBjb250ZW50VHlwZTogTWVzc2FnZUNvbnRlbnRUeXBlLlBMQUlOX1RFWFQsXG4gICAgICBjb250ZW50OiBgWW91ciBjYWxsIGhhcyBiZWVuIHNjaGVkdWxlZCBmb3IgJHt0aW1lfWAsXG4gICAgfSxcbiAgXSlcbn1cbiJdfQ==