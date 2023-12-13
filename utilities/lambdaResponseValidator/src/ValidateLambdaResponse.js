/* eslint-disable */
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const Ajv2019 = require("ajv/dist/2019")
const schema = require("./LexCodeHookResponseSchema.json")
const ajv = new Ajv2019({ allErrors: true })

exports.validateInput = function (inputData) {
  let response = []

  const errors = validateLexLambdaResponse(inputData)
  for (let i = 0; i < errors.length; i++) {
    if (errors[i].keyword !== "if" && errors[i].keyword !== "else" && errors[i].keyword !== "then") {
      let message = ``

      if (errors[i].instancePath === "") {
        message += errors[i].message
      } else {
        message += `${errors[i].instancePath} ${errors[i].message}`
      }

      if (errors[i].params.allowedValues) {
        message += `. Allowed values: ${errors[i].params.allowedValues.join(", ")}`
      }
      response.push(message)
    }
  }
  return response
}

function validateLexLambdaResponse(inputData) {
  const validate = ajv.compile(schema)
  validate(inputData)
  console.debug("Validation errors:", validate.errors)
  return validate.errors || []
}
