"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const DialogHelpers = require("../../src/sharedLibraries/DialogHelpers");
function handler(event) {
    let response = DialogHelpers.passThrough(event);
    const intent = event.sessionState.intent;
    // @ts-ignore intent will never be undefined in the Intent Handler
    if (intent.name !== "CallIntent" /* IntentNames.CALL_INTENT */) {
        console.error(`Wrong handler for intent called, current intent is ${intent}`);
        // Decide how you would like to handle this with the least disruption to your user
        return response;
    }
    return response;
}
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsbEludGVudEhhbmRsZXItdjAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYWxsSW50ZW50SGFuZGxlci12MC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMseUNBQXlDLENBQUMsQ0FBQTtBQUV4RSxTQUFnQixPQUFPLENBQUMsS0FBNEI7SUFDbEQsSUFBSSxRQUFRLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUMvQyxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQTtJQUV4QyxrRUFBa0U7SUFDbEUsSUFBSSxNQUFNLENBQUMsSUFBSSwrQ0FBNEIsRUFBRTtRQUMzQyxPQUFPLENBQUMsS0FBSyxDQUFDLHNEQUFzRCxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQzdFLGtGQUFrRjtRQUNsRixPQUFPLFFBQVEsQ0FBQTtLQUNoQjtJQUVELE9BQU8sUUFBUSxDQUFBO0FBQ2pCLENBQUM7QUFaRCwwQkFZQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExleENvZGVIb29rSW5wdXRFdmVudCB9IGZyb20gXCIuLi8uLi9zcmMvc2hhcmVkTGlicmFyaWVzL0xleENvZGVIb29rSW50ZXJmYWNlc1wiXG5pbXBvcnQgeyBJbnRlbnROYW1lcyB9IGZyb20gXCIuLi8uLi9zcmMvcmVtaW5kZXJCb3RMZXgyTGFtYmRhL2ludGVudEhhbmRsZXJzL2NvbnN0YW50c1wiXG5cbmNvbnN0IERpYWxvZ0hlbHBlcnMgPSByZXF1aXJlKFwiLi4vLi4vc3JjL3NoYXJlZExpYnJhcmllcy9EaWFsb2dIZWxwZXJzXCIpXG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50OiBMZXhDb2RlSG9va0lucHV0RXZlbnQpIHtcbiAgbGV0IHJlc3BvbnNlID0gRGlhbG9nSGVscGVycy5wYXNzVGhyb3VnaChldmVudClcbiAgY29uc3QgaW50ZW50ID0gZXZlbnQuc2Vzc2lvblN0YXRlLmludGVudFxuXG4gIC8vIEB0cy1pZ25vcmUgaW50ZW50IHdpbGwgbmV2ZXIgYmUgdW5kZWZpbmVkIGluIHRoZSBJbnRlbnQgSGFuZGxlclxuICBpZiAoaW50ZW50Lm5hbWUgIT09IEludGVudE5hbWVzLkNBTExfSU5URU5UKSB7XG4gICAgY29uc29sZS5lcnJvcihgV3JvbmcgaGFuZGxlciBmb3IgaW50ZW50IGNhbGxlZCwgY3VycmVudCBpbnRlbnQgaXMgJHtpbnRlbnR9YClcbiAgICAvLyBEZWNpZGUgaG93IHlvdSB3b3VsZCBsaWtlIHRvIGhhbmRsZSB0aGlzIHdpdGggdGhlIGxlYXN0IGRpc3J1cHRpb24gdG8geW91ciB1c2VyXG4gICAgcmV0dXJuIHJlc3BvbnNlXG4gIH1cblxuICByZXR1cm4gcmVzcG9uc2Vcbn1cbiJdfQ==