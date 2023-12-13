# Amazon Lex V2 Lambda function response validator

## Using the validator
You can run the validator locally by opening [./build/Validate.html](./build/Validate.html) in a browser. 

You may also opt to host it somewhere, ensure that you also include [./build/validation-bundle.js](./build/validation-bundle.js) alongside it.

The validator runs locally against a schema, and does not transmit data externally. 
It requires the input to be in strict JSON format.

Although it will catch most schema violations, there are some nuances that will not be caught by the validator, and you should review the Amazon Lex [documentation](https://docs.aws.amazon.com/lexv2/latest/dg/lambda.html) for more details on the schema and specifics.

## Why use the validator

If you are getting an error similar to 

`Invalid Lambda Response: Received invalid response from Lambda: Cannot construct instance of IntentResponse...` or finding your bot exits unexpectedly when calling a Code Hook then you can use the validator to find the specific problems in your response.

The easiest way to do this is to log out from your Lambda function the exact response you are sending back to Amazon Lex.
Since the validator requires JSON, logging the object out as JSON format will make things easier for you.

---


### Updating the validator
You will find the source files for the validator in the `./src` directory, and you can update these and run `npm run package` to update the build files.
