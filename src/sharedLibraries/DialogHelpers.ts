// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import {
  LexCodeHookInputEvent,
  LexCodeHookResponse,
  LambdaCodeHookSessionState,
  Attributes,
  LambdaCodeHookSessionStateIntent,
  CodeHookIntentState
} from "./LexCodeHookInterfaces"
import { DialogActionType, Message } from "@aws-sdk/client-lex-runtime-v2"

const delegate = (sessionState: LambdaCodeHookSessionState, requestAttributes?: Attributes) => {
  // Ensure session state dialog action is set to Delegate, pass everything else in as-is
  // NOTE Delegate doesn't use any passed in messages and will just use the build-time configuration prompts
  sessionState.dialogAction = {
    type: DialogActionType.DELEGATE,
  }
  const response: LexCodeHookResponse = {
    sessionState: sessionState,
    requestAttributes: requestAttributes,
  }

  return response
}

const passThrough = (event: LexCodeHookInputEvent) => {
  return delegate(event.sessionState, event.requestAttributes)
}

const fulfillIntent = (
  sessionState: LambdaCodeHookSessionState,
  requestAttributes: Attributes,
  messages?: Message[]
) => {
  const fulfilledSessionState = updateSessionState(sessionState, CodeHookIntentState.FULFILLED, DialogActionType.CLOSE)

  const response: LexCodeHookResponse = {
    sessionState: fulfilledSessionState,
    messages: messages,
    requestAttributes: requestAttributes,
  }

  return response
}

const endConversation = (event: LexCodeHookInputEvent, messages?: Message[]) => {
  // This indicates a successful completion of the conversation,
  //  if this is not the case the state should be set to "Failed"
  const sessionState = updateSessionState(event.sessionState, CodeHookIntentState.FULFILLED, DialogActionType.CLOSE)

  const response: LexCodeHookResponse = {
    sessionState: sessionState,
    messages: messages,
    requestAttributes: event.requestAttributes,
  }

  return response
}

const promptForNewIntent = (event: LexCodeHookInputEvent, messages?: Message[]) => {
  const sessionState = event.sessionState
  delete sessionState.intent

  const response: LexCodeHookResponse = {
    sessionState: sessionState,
    messages: messages,
    requestAttributes: event.requestAttributes,
  }
  response.sessionState.dialogAction = {
    type: DialogActionType.ELICIT_INTENT,
  }

  return response
}

const promptForConfirmationOfIntent = (
  sessionState: LambdaCodeHookSessionState,
  requestAttributes: Attributes,
  intent: LambdaCodeHookSessionStateIntent,
  messages: Message[]
) => {
  const response = {
    sessionState: sessionState,
    messages: messages,
    requestAttributes: requestAttributes,
  } as LexCodeHookResponse

  response.sessionState.dialogAction = {
    type: DialogActionType.CONFIRM_INTENT,
  }

  intent.state = CodeHookIntentState.IN_PROGRESS
  response.sessionState.intent = intent

  return response
}

const promptForSlot = (
  sessionState: LambdaCodeHookSessionState,
  requestAttributes: Attributes,
  slotToElicit: string,
  intent: LambdaCodeHookSessionStateIntent,
  messages: Message[]
) => {
  const response = {
    sessionState: sessionState,
    messages: messages,
    requestAttributes: requestAttributes,
  } as LexCodeHookResponse

  response.sessionState.dialogAction = {
    type: DialogActionType.ELICIT_SLOT,
    slotToElicit: slotToElicit,
  }

  intent.state = CodeHookIntentState.IN_PROGRESS
  response.sessionState.intent = intent

  return response
}

const updateSessionState = (
  currentState: LambdaCodeHookSessionState,
  newIntentState: CodeHookIntentState,
  newDialogActionType: DialogActionType
) => {
  const sessionState = currentState
  sessionState.intent
    ? (sessionState.intent.state = newIntentState)
    : (sessionState.intent = {
        name: "",
        state: newIntentState,
      })

  sessionState.dialogAction = {
    type: newDialogActionType,
  }

  return sessionState
}

module.exports = {
  confirmIntent: promptForConfirmationOfIntent,
  delegate,
  endConversation,
  elicitIntent: promptForNewIntent,
  elicitSlot: promptForSlot,
  fulfillIntent,
  passThrough,
  promptForConfirmationOfIntent,
  promptForNewIntent,
  promptForSlot,
  waitForUserInput: promptForNewIntent,
}
