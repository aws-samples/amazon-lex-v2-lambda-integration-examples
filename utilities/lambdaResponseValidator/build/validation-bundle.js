(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.validation = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
  "$ref": "#/definitions/LexCodeHookResponse",
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "definitions": {
    "ActiveContext": {
      "additionalProperties": false,
      "properties": {
        "contextAttributes": {
          "additionalProperties": {
            "type": "string"
          },
          "description": "<p>A list of contexts active for the request. A context can be activated when a previous intent is fulfilled, or by including the context in the request.</p> <p>If you don't specify a list of contexts, Amazon Lex V2 will use the current list of contexts for the session. If you specify an empty list, all contexts for the session are cleared. </p>",
          "type": "object"
        },
        "name": {
          "description": "<p>The name of the context.</p>",
          "type": "string"
        },
        "timeToLive": {
          "$ref": "#/definitions/ActiveContextTimeToLive",
          "description": "<p>Indicates the number of turns or seconds that the context is active. Once the time to live expires, the context is no longer returned in a response.</p>"
        }
      },
      "required": [
        "name",
        "timeToLive"
      ],
      "type": "object"
    },
    "ActiveContextTimeToLive": {
      "additionalProperties": false,
      "properties": {
        "timeToLiveInSeconds": {
          "description": "<p>The number of seconds that the context is active. You can specify between 5 and 86400 seconds (24 hours).</p>",
          "type": "number"
        },
        "turnsToLive": {
          "description": "<p>The number of turns that the context is active. You can specify up to 20 turns. Each request and response from the bot is a turn.</p>",
          "type": "number"
        }
      },
      "required": [
        "turnsToLive",
        "timeToLiveInSeconds"
      ],
      "type": "object"
    },
    "Attributes": {
      "additionalProperties": {
        "type": "string"
      },
      "description": "Map of key/value pairs",
      "type": "object"
    },
    "Button": {
      "additionalProperties": false,
      "properties": {
        "text": {
          "description": "<p>The text that is displayed on the button.</p>",
          "type": "string"
        },
        "value": {
          "description": "<p>The value returned to Amazon Lex V2 when a user chooses the button.</p>",
          "type": "string"
        }
      },
      "type": "object"
    },
    "ConfirmationState": {
      "enum": [
        "Confirmed",
        "Denied",
        "None"
      ],
      "type": "string"
    },
    "DialogAction": {
      "additionalProperties": false,
      "properties": {
        "slotElicitationStyle": {
          "$ref": "#/definitions/StyleType",
          "description": "<p>Configures the slot to use spell-by-letter or spell-by-word style. When you use a style on a slot, users can spell out their input to make it clear to your bot.</p> <ul> <li> <p>Spell by letter - \"b\" \"o\" \"b\"</p> </li> <li> <p>Spell by word - \"b as in boy\" \"o as in oscar\" \"b as in boy\"</p> </li> </ul> <p>For more information, see <a href=\"https://docs.aws.amazon.com/lexv2/latest/dg/using-spelling.html\"> Using spelling to enter slot values </a>.</p>"
        },
        "slotToElicit": {
          "description": "<p>The name of the slot that should be elicited from the user. Required if the type of dialogAction is ElicitSlot</p>",
          "type": "string"
        },
        "subSlotToElicit": {
          "$ref": "#/definitions/ElicitSubSlot",
          "description": "<p>The name of the constituent sub slot of the composite slot specified in slotToElicit that should be elicited from the user.</p>"
        },
        "type": {
          "$ref": "#/definitions/DialogActionType",
          "description": "<p>The next action that the bot should take in its interaction with the user. The possible values are:</p> <ul> <li> <p>  <code>Close</code> - Indicates that there will not be a response from the user. For example, the statement \"Your order has been placed\" does not require a response.</p> </li> <li> <p>  <code>ConfirmIntent</code> - The next action is asking the user if the intent is complete and ready to be fulfilled. This is a yes/no question such as \"Place the order?\"</p> </li> <li> <p>  <code>Delegate</code> - The next action is determined by Amazon Lex V2.</p> </li> <li> <p>  <code>ElicitIntent</code> - The next action is to elicit an intent from the user.</p> </li> <li> <p>  <code>ElicitSlot</code> - The next action is to elicit a slot value from the user.</p> </li> </ul>"
        }
      },
      "required": [
        "type"
      ],
      "if": {
        "anyOf": [
          {
            "properties": {
              "type": {
                "const": "ElicitSlot"
              }
            }
          }
        ]
      },
      "then": {
        "required": [
          "slotToElicit"
        ],
        "properties": {
          "slotToElicit": {
            "minLength": 1
          }
        }
      },
      "type": "object"
    },
    "DialogActionType": {
      "enum": [
        "Close",
        "ConfirmIntent",
        "Delegate",
        "ElicitIntent",
        "ElicitSlot",
        "None"
      ],
      "type": "string"
    },
    "ElicitSubSlot": {
      "additionalProperties": false,
      "properties": {
        "name": {
          "description": "<p>The name of the slot that should be elicited from the user.</p>",
          "type": "string"
        },
        "subSlotToElicit": {
          "$ref": "#/definitions/ElicitSubSlot",
          "description": "<p>The field is not supported.</p>"
        }
      },
      "type": "object"
    },
    "ImageResponseCard": {
      "additionalProperties": false,
      "properties": {
        "buttons": {
          "description": "<p>A list of buttons that should be displayed on the response card. The arrangement of the buttons is determined by the platform that displays the button.</p>",
          "items": {
            "$ref": "#/definitions/Button"
          },
          "type": "array"
        },
        "imageUrl": {
          "description": "<p>The URL of an image to display on the response card. The image URL must be publicly available so that the platform displaying the response card has access to the image.</p>",
          "type": "string"
        },
        "subtitle": {
          "description": "<p>The subtitle to display on the response card. The format of the subtitle is determined by the platform displaying the response card.</p>",
          "type": "string"
        },
        "title": {
          "description": "<p>The title to display on the response card. The format of the title is determined by the platform displaying the response card.</p>",
          "type": "string"
        }
      },
      "required": [
        "title"
      ],
      "type": "object"
    },
    "Intent": {
      "additionalProperties": false,
      "properties": {
        "confirmationState": {
          "$ref": "#/definitions/ConfirmationState",
          "description": "<p>Contains information about whether fulfillment of the intent has been confirmed.</p>"
        },
        "name": {
          "description": "<p>The name of the intent.</p>",
          "type": "string"
        },
        "slots": {
          "additionalProperties": {
            "$ref": "#/definitions/Slot"
          },
          "description": "<p>A map of all of the slots for the intent. The name of the slot maps to the value of the slot. If a slot has not been filled, the value is null.</p>",
          "type": "object"
        },
        "state": {
          "$ref": "#/definitions/IntentState",
          "description": "<p>Contains fulfillment information for the intent. </p>"
        }
      },
      "type": "object"
    },
    "IntentState": {
      "enum": [
        "Failed",
        "Fulfilled",
        "InProgress",
        "ReadyForFulfillment"
      ],
      "type": "string"
    },
    "LambdaCodeHookSessionState": {
      "additionalProperties": false,
      "description": "The Lambda function event Session state differs from the API_runtime_SessionState because of the format of the Intent",
      "properties": {
        "activeContexts": {
          "description": "<p>One or more contexts that indicate to Amazon Lex V2 the context of a request. When a context is active, Amazon Lex V2 considers intents with the matching context as a trigger as the next intent in a session.</p>",
          "items": {
            "$ref": "#/definitions/ActiveContext"
          },
          "type": "array"
        },
        "dialogAction": {
          "$ref": "#/definitions/DialogAction",
          "description": "<p>The next step that Amazon Lex V2 should take in the conversation with a user.</p>"
        },
        "intent": {
          "$ref": "#/definitions/Intent",
          "description": "<p>The active intent that Amazon Lex V2 is processing.</p>"
        },
        "originatingRequestId": {
          "description": "<p>A unique identifier for a specific request.</p>",
          "type": "string"
        },
        "runtimeHints": {
          "$ref": "#/definitions/RuntimeHints",
          "description": "<p>Hints for phrases that a customer is likely to use for a slot. Amazon Lex V2 uses the hints to help determine the correct value of a slot.</p>"
        },
        "sessionAttributes": {
          "$ref": "#/definitions/Attributes",
          "description": "<p>Map of key/value pairs representing session-specific context information. It contains application information passed between Amazon Lex V2 and a client application.</p>"
        }
      },
      "required": [
        "sessionAttributes",
        "dialogAction"
      ],
      "type": "object"
    },
    "LexCodeHookResponse": {
      "additionalProperties": false,
      "properties": {
        "messages": {
          "description": "One or more messages that Amazon Lex V2 shows to the customer to perform the next turn of the conversation. If you don't supply messages, Amazon Lex V2 uses the appropriate message defined when the bot was created\n\nRequired if dialogAction.type is ElicitIntent.",
          "items": {
            "$ref": "#/definitions/Message"
          },
          "type": "array"
        },
        "requestAttributes": {
          "$ref": "#/definitions/Attributes",
          "description": "Request-specific attributes"
        },
        "sessionState": {
          "$ref": "#/definitions/LambdaCodeHookSessionState",
          "description": "The current state of the conversation with the user.\n\nThe actual contents of the structure depends on the type of dialog action."
        }
      },
      "required": [
        "sessionState"
      ],
      "if": {
        "properties": {
          "sessionState": {
            "properties": {
              "dialogAction": {
                "properties" : {
                  "type": {
                    "const": "ElicitIntent"
                  }
                  }
                }
            }
          }
        }
      },
      "then": {
        "required": ["messages"],
        "properties": {
          "messages": {
            "minItems": 1
          }
        }
      },
      "else" : {
        "required":[]
      },
      "type": "object"
    },
    "Message": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "content": {
          "description": "<p>The text of the message.</p>",
          "type": "string"
        },
        "contentType": {
          "$ref": "#/definitions/MessageContentType",
          "description": "<p>Indicates the type of response.</p>"
        },
        "imageResponseCard": {
          "$ref": "#/definitions/ImageResponseCard",
          "description": "<p>A card that is shown to the user by a messaging platform. You define the contents of the card, the card is displayed by the platform. </p> <p>When you use a response card, the response from the user is constrained to the text associated with a button on the card.</p>"
        }
      },
      "required": [
        "contentType"
      ],
      "if": {
        "properties": {
          "contentType": {
            "const": "ImageResponseCard"
          }
        }
      },
      "then": {
        "required": [
          "imageResponseCard"
        ]
      },
      "else": {
        "required": [
          "content"
        ]
      }
    },
    "MessageContentType": {
      "enum": [
        "CustomPayload",
        "ImageResponseCard",
        "PlainText",
        "SSML"
      ],
      "type": "string"
    },
    "RuntimeHintDetails": {
      "additionalProperties": false,
      "properties": {
        "runtimeHintValues": {
          "description": "<p>One or more strings that Amazon Lex V2 should look for in the input to the bot. Each phrase is given preference when deciding on slot values.</p>",
          "items": {
            "$ref": "#/definitions/RuntimeHintValue"
          },
          "type": "array"
        },
        "subSlotHints": {
          "additionalProperties": {
            "$ref": "#/definitions/RuntimeHintDetails"
          },
          "description": "<p>A map of constituent sub slot names inside a composite slot in the intent and the phrases that should be added for each sub slot. Inside each composite slot hints, this structure provides a mechanism to add granular sub slot phrases. Only sub slot hints are supported for composite slots. The intent name, composite slot name and the constituent sub slot names must exist.</p>",
          "type": "object"
        }
      },
      "type": "object"
    },
    "RuntimeHintValue": {
      "additionalProperties": false,
      "properties": {
        "phrase": {
          "description": "<p>The phrase that Amazon Lex V2 should look for in the user's input to the bot.</p>",
          "type": "string"
        }
      },
      "type": "object"
    },
    "RuntimeHints": {
      "additionalProperties": false,
      "properties": {
        "slotHints": {
          "additionalProperties": {
            "additionalProperties": {
              "$ref": "#/definitions/RuntimeHintDetails"
            },
            "type": "object"
          },
          "description": "<p>A list of the slots in the intent that should have runtime hints added, and the phrases that should be added for each slot.</p> <p>The first level of the <code>slotHints</code> map is the name of the intent. The second level is the name of the slot within the intent. For more information, see <a href=\"https://docs.aws.amazon.com/lexv2/latest/dg/using-hints.html\">Using hints to improve accuracy</a>.</p> <p>The intent name and slot name must exist.</p>",
          "type": "object"
        }
      },
      "type": "object"
    },
    "Shape": {
      "enum": [
        "Composite",
        "List",
        "Scalar"
      ],
      "type": "string"
    },
    "Slot": {
      "additionalProperties": false,
      "properties": {
        "shape": {
          "$ref": "#/definitions/Shape",
          "description": "<p>When the <code>shape</code> value is <code>List</code>, it indicates that the <code>values</code> field contains a list of slot values. When the value is <code>Scalar</code>, it indicates that the <code>value</code> field contains a single value.</p>"
        },
        "subSlots": {
          "additionalProperties": {
            "$ref": "#/definitions/Slot"
          },
          "description": "<p>The constituent sub slots of a composite slot.</p>",
          "type": "object"
        },
        "value": {
          "$ref": "#/definitions/Value",
          "description": "<p>The current value of the slot.</p>"
        },
        "values": {
          "description": "<p>A list of one or more values that the user provided for the slot. For example, if a for a slot that elicits pizza toppings, the values might be \"pepperoni\" and \"pineapple.\" </p>",
          "items": {
            "$ref": "#/definitions/Slot"
          },
          "type": "array"
        }
      },
      "type": ["object", "null"]
    },
    "StyleType": {
      "enum": [
        "Default",
        "SpellByLetter",
        "SpellByWord"
      ],
      "type": "string"
    },
    "Value": {
      "additionalProperties": false,
      "properties": {
        "interpretedValue": {
          "description": "<p>The value that Amazon Lex V2 determines for the slot. The actual value depends on the setting of the value selection strategy for the bot. You can choose to use the value entered by the user, or you can have Amazon Lex V2 choose the first value in the <code>resolvedValues</code> list.</p>",
          "type": "string"
        },
        "originalValue": {
          "description": "<p>The text of the utterance from the user that was entered for the slot.</p>",
          "type": "string"
        },
        "resolvedValues": {
          "description": "<p>A list of additional values that have been recognized for the slot.</p>",
          "items": {
            "type": "string"
          },
          "type": "array"
        }
      },
      "type": "object"
    }
  }
}

},{}],2:[function(require,module,exports){
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

},{"./LexCodeHookResponseSchema.json":1,"ajv/dist/2019":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
const core_1 = require("./core");
const draft7_1 = require("./vocabularies/draft7");
const dynamic_1 = require("./vocabularies/dynamic");
const next_1 = require("./vocabularies/next");
const unevaluated_1 = require("./vocabularies/unevaluated");
const discriminator_1 = require("./vocabularies/discriminator");
const json_schema_2019_09_1 = require("./refs/json-schema-2019-09");
const META_SCHEMA_ID = "https://json-schema.org/draft/2019-09/schema";
class Ajv2019 extends core_1.default {
    constructor(opts = {}) {
        super({
            ...opts,
            dynamicRef: true,
            next: true,
            unevaluated: true,
        });
    }
    _addVocabularies() {
        super._addVocabularies();
        this.addVocabulary(dynamic_1.default);
        draft7_1.default.forEach((v) => this.addVocabulary(v));
        this.addVocabulary(next_1.default);
        this.addVocabulary(unevaluated_1.default);
        if (this.opts.discriminator)
            this.addKeyword(discriminator_1.default);
    }
    _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        const { $data, meta } = this.opts;
        if (!meta)
            return;
        json_schema_2019_09_1.default.call(this, $data);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
    }
    defaultMeta() {
        return (this.opts.defaultMeta =
            super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : undefined));
    }
}
module.exports = exports = Ajv2019;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Ajv2019;
var validate_1 = require("./compile/validate");
Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function () { return validate_1.KeywordCxt; } });
var codegen_1 = require("./compile/codegen");
Object.defineProperty(exports, "_", { enumerable: true, get: function () { return codegen_1._; } });
Object.defineProperty(exports, "str", { enumerable: true, get: function () { return codegen_1.str; } });
Object.defineProperty(exports, "stringify", { enumerable: true, get: function () { return codegen_1.stringify; } });
Object.defineProperty(exports, "nil", { enumerable: true, get: function () { return codegen_1.nil; } });
Object.defineProperty(exports, "Name", { enumerable: true, get: function () { return codegen_1.Name; } });
Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function () { return codegen_1.CodeGen; } });
var validation_error_1 = require("./runtime/validation_error");
Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function () { return validation_error_1.default; } });
var ref_error_1 = require("./compile/ref_error");
Object.defineProperty(exports, "MissingRefError", { enumerable: true, get: function () { return ref_error_1.default; } });

},{"./compile/codegen":5,"./compile/ref_error":10,"./compile/validate":18,"./core":21,"./refs/json-schema-2019-09":23,"./runtime/validation_error":34,"./vocabularies/discriminator":57,"./vocabularies/draft7":59,"./vocabularies/dynamic":62,"./vocabularies/next":68,"./vocabularies/unevaluated":69}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
class _CodeOrName {
}
exports._CodeOrName = _CodeOrName;
exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
class Name extends _CodeOrName {
    constructor(s) {
        super();
        if (!exports.IDENTIFIER.test(s))
            throw new Error("CodeGen: name must be a valid identifier");
        this.str = s;
    }
    toString() {
        return this.str;
    }
    emptyStr() {
        return false;
    }
    get names() {
        return { [this.str]: 1 };
    }
}
exports.Name = Name;
class _Code extends _CodeOrName {
    constructor(code) {
        super();
        this._items = typeof code === "string" ? [code] : code;
    }
    toString() {
        return this.str;
    }
    emptyStr() {
        if (this._items.length > 1)
            return false;
        const item = this._items[0];
        return item === "" || item === '""';
    }
    get str() {
        var _a;
        return ((_a = this._str) !== null && _a !== void 0 ? _a : (this._str = this._items.reduce((s, c) => `${s}${c}`, "")));
    }
    get names() {
        var _a;
        return ((_a = this._names) !== null && _a !== void 0 ? _a : (this._names = this._items.reduce((names, c) => {
            if (c instanceof Name)
                names[c.str] = (names[c.str] || 0) + 1;
            return names;
        }, {})));
    }
}
exports._Code = _Code;
exports.nil = new _Code("");
function _(strs, ...args) {
    const code = [strs[0]];
    let i = 0;
    while (i < args.length) {
        addCodeArg(code, args[i]);
        code.push(strs[++i]);
    }
    return new _Code(code);
}
exports._ = _;
const plus = new _Code("+");
function str(strs, ...args) {
    const expr = [safeStringify(strs[0])];
    let i = 0;
    while (i < args.length) {
        expr.push(plus);
        addCodeArg(expr, args[i]);
        expr.push(plus, safeStringify(strs[++i]));
    }
    optimize(expr);
    return new _Code(expr);
}
exports.str = str;
function addCodeArg(code, arg) {
    if (arg instanceof _Code)
        code.push(...arg._items);
    else if (arg instanceof Name)
        code.push(arg);
    else
        code.push(interpolate(arg));
}
exports.addCodeArg = addCodeArg;
function optimize(expr) {
    let i = 1;
    while (i < expr.length - 1) {
        if (expr[i] === plus) {
            const res = mergeExprItems(expr[i - 1], expr[i + 1]);
            if (res !== undefined) {
                expr.splice(i - 1, 3, res);
                continue;
            }
            expr[i++] = "+";
        }
        i++;
    }
}
function mergeExprItems(a, b) {
    if (b === '""')
        return a;
    if (a === '""')
        return b;
    if (typeof a == "string") {
        if (b instanceof Name || a[a.length - 1] !== '"')
            return;
        if (typeof b != "string")
            return `${a.slice(0, -1)}${b}"`;
        if (b[0] === '"')
            return a.slice(0, -1) + b.slice(1);
        return;
    }
    if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
        return `"${a}${b.slice(1)}`;
    return;
}
function strConcat(c1, c2) {
    return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str `${c1}${c2}`;
}
exports.strConcat = strConcat;
// TODO do not allow arrays here
function interpolate(x) {
    return typeof x == "number" || typeof x == "boolean" || x === null
        ? x
        : safeStringify(Array.isArray(x) ? x.join(",") : x);
}
function stringify(x) {
    return new _Code(safeStringify(x));
}
exports.stringify = stringify;
function safeStringify(x) {
    return JSON.stringify(x)
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029");
}
exports.safeStringify = safeStringify;
function getProperty(key) {
    return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _ `[${key}]`;
}
exports.getProperty = getProperty;
//Does best effort to format the name properly
function getEsmExportName(key) {
    if (typeof key == "string" && exports.IDENTIFIER.test(key)) {
        return new _Code(`${key}`);
    }
    throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
}
exports.getEsmExportName = getEsmExportName;
function regexpCode(rx) {
    return new _Code(rx.toString());
}
exports.regexpCode = regexpCode;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
const code_1 = require("./code");
const scope_1 = require("./scope");
var code_2 = require("./code");
Object.defineProperty(exports, "_", { enumerable: true, get: function () { return code_2._; } });
Object.defineProperty(exports, "str", { enumerable: true, get: function () { return code_2.str; } });
Object.defineProperty(exports, "strConcat", { enumerable: true, get: function () { return code_2.strConcat; } });
Object.defineProperty(exports, "nil", { enumerable: true, get: function () { return code_2.nil; } });
Object.defineProperty(exports, "getProperty", { enumerable: true, get: function () { return code_2.getProperty; } });
Object.defineProperty(exports, "stringify", { enumerable: true, get: function () { return code_2.stringify; } });
Object.defineProperty(exports, "regexpCode", { enumerable: true, get: function () { return code_2.regexpCode; } });
Object.defineProperty(exports, "Name", { enumerable: true, get: function () { return code_2.Name; } });
var scope_2 = require("./scope");
Object.defineProperty(exports, "Scope", { enumerable: true, get: function () { return scope_2.Scope; } });
Object.defineProperty(exports, "ValueScope", { enumerable: true, get: function () { return scope_2.ValueScope; } });
Object.defineProperty(exports, "ValueScopeName", { enumerable: true, get: function () { return scope_2.ValueScopeName; } });
Object.defineProperty(exports, "varKinds", { enumerable: true, get: function () { return scope_2.varKinds; } });
exports.operators = {
    GT: new code_1._Code(">"),
    GTE: new code_1._Code(">="),
    LT: new code_1._Code("<"),
    LTE: new code_1._Code("<="),
    EQ: new code_1._Code("==="),
    NEQ: new code_1._Code("!=="),
    NOT: new code_1._Code("!"),
    OR: new code_1._Code("||"),
    AND: new code_1._Code("&&"),
    ADD: new code_1._Code("+"),
};
class Node {
    optimizeNodes() {
        return this;
    }
    optimizeNames(_names, _constants) {
        return this;
    }
}
class Def extends Node {
    constructor(varKind, name, rhs) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.rhs = rhs;
    }
    render({ es5, _n }) {
        const varKind = es5 ? scope_1.varKinds.var : this.varKind;
        const rhs = this.rhs === undefined ? "" : ` = ${this.rhs}`;
        return `${varKind} ${this.name}${rhs};` + _n;
    }
    optimizeNames(names, constants) {
        if (!names[this.name.str])
            return;
        if (this.rhs)
            this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
    }
    get names() {
        return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
    }
}
class Assign extends Node {
    constructor(lhs, rhs, sideEffects) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
        this.sideEffects = sideEffects;
    }
    render({ _n }) {
        return `${this.lhs} = ${this.rhs};` + _n;
    }
    optimizeNames(names, constants) {
        if (this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects)
            return;
        this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
    }
    get names() {
        const names = this.lhs instanceof code_1.Name ? {} : { ...this.lhs.names };
        return addExprNames(names, this.rhs);
    }
}
class AssignOp extends Assign {
    constructor(lhs, op, rhs, sideEffects) {
        super(lhs, rhs, sideEffects);
        this.op = op;
    }
    render({ _n }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
    }
}
class Label extends Node {
    constructor(label) {
        super();
        this.label = label;
        this.names = {};
    }
    render({ _n }) {
        return `${this.label}:` + _n;
    }
}
class Break extends Node {
    constructor(label) {
        super();
        this.label = label;
        this.names = {};
    }
    render({ _n }) {
        const label = this.label ? ` ${this.label}` : "";
        return `break${label};` + _n;
    }
}
class Throw extends Node {
    constructor(error) {
        super();
        this.error = error;
    }
    render({ _n }) {
        return `throw ${this.error};` + _n;
    }
    get names() {
        return this.error.names;
    }
}
class AnyCode extends Node {
    constructor(code) {
        super();
        this.code = code;
    }
    render({ _n }) {
        return `${this.code};` + _n;
    }
    optimizeNodes() {
        return `${this.code}` ? this : undefined;
    }
    optimizeNames(names, constants) {
        this.code = optimizeExpr(this.code, names, constants);
        return this;
    }
    get names() {
        return this.code instanceof code_1._CodeOrName ? this.code.names : {};
    }
}
class ParentNode extends Node {
    constructor(nodes = []) {
        super();
        this.nodes = nodes;
    }
    render(opts) {
        return this.nodes.reduce((code, n) => code + n.render(opts), "");
    }
    optimizeNodes() {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
            const n = nodes[i].optimizeNodes();
            if (Array.isArray(n))
                nodes.splice(i, 1, ...n);
            else if (n)
                nodes[i] = n;
            else
                nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : undefined;
    }
    optimizeNames(names, constants) {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
            // iterating backwards improves 1-pass optimization
            const n = nodes[i];
            if (n.optimizeNames(names, constants))
                continue;
            subtractNames(names, n.names);
            nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : undefined;
    }
    get names() {
        return this.nodes.reduce((names, n) => addNames(names, n.names), {});
    }
}
class BlockNode extends ParentNode {
    render(opts) {
        return "{" + opts._n + super.render(opts) + "}" + opts._n;
    }
}
class Root extends ParentNode {
}
class Else extends BlockNode {
}
Else.kind = "else";
class If extends BlockNode {
    constructor(condition, nodes) {
        super(nodes);
        this.condition = condition;
    }
    render(opts) {
        let code = `if(${this.condition})` + super.render(opts);
        if (this.else)
            code += "else " + this.else.render(opts);
        return code;
    }
    optimizeNodes() {
        super.optimizeNodes();
        const cond = this.condition;
        if (cond === true)
            return this.nodes; // else is ignored here
        let e = this.else;
        if (e) {
            const ns = e.optimizeNodes();
            e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
        }
        if (e) {
            if (cond === false)
                return e instanceof If ? e : e.nodes;
            if (this.nodes.length)
                return this;
            return new If(not(cond), e instanceof If ? [e] : e.nodes);
        }
        if (cond === false || !this.nodes.length)
            return undefined;
        return this;
    }
    optimizeNames(names, constants) {
        var _a;
        this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        if (!(super.optimizeNames(names, constants) || this.else))
            return;
        this.condition = optimizeExpr(this.condition, names, constants);
        return this;
    }
    get names() {
        const names = super.names;
        addExprNames(names, this.condition);
        if (this.else)
            addNames(names, this.else.names);
        return names;
    }
}
If.kind = "if";
class For extends BlockNode {
}
For.kind = "for";
class ForLoop extends For {
    constructor(iteration) {
        super();
        this.iteration = iteration;
    }
    render(opts) {
        return `for(${this.iteration})` + super.render(opts);
    }
    optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
            return;
        this.iteration = optimizeExpr(this.iteration, names, constants);
        return this;
    }
    get names() {
        return addNames(super.names, this.iteration.names);
    }
}
class ForRange extends For {
    constructor(varKind, name, from, to) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.from = from;
        this.to = to;
    }
    render(opts) {
        const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
        const { name, from, to } = this;
        return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
    }
    get names() {
        const names = addExprNames(super.names, this.from);
        return addExprNames(names, this.to);
    }
}
class ForIter extends For {
    constructor(loop, varKind, name, iterable) {
        super();
        this.loop = loop;
        this.varKind = varKind;
        this.name = name;
        this.iterable = iterable;
    }
    render(opts) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
    }
    optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
            return;
        this.iterable = optimizeExpr(this.iterable, names, constants);
        return this;
    }
    get names() {
        return addNames(super.names, this.iterable.names);
    }
}
class Func extends BlockNode {
    constructor(name, args, async) {
        super();
        this.name = name;
        this.args = args;
        this.async = async;
    }
    render(opts) {
        const _async = this.async ? "async " : "";
        return `${_async}function ${this.name}(${this.args})` + super.render(opts);
    }
}
Func.kind = "func";
class Return extends ParentNode {
    render(opts) {
        return "return " + super.render(opts);
    }
}
Return.kind = "return";
class Try extends BlockNode {
    render(opts) {
        let code = "try" + super.render(opts);
        if (this.catch)
            code += this.catch.render(opts);
        if (this.finally)
            code += this.finally.render(opts);
        return code;
    }
    optimizeNodes() {
        var _a, _b;
        super.optimizeNodes();
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
        return this;
    }
    optimizeNames(names, constants) {
        var _a, _b;
        super.optimizeNames(names, constants);
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants);
        return this;
    }
    get names() {
        const names = super.names;
        if (this.catch)
            addNames(names, this.catch.names);
        if (this.finally)
            addNames(names, this.finally.names);
        return names;
    }
}
class Catch extends BlockNode {
    constructor(error) {
        super();
        this.error = error;
    }
    render(opts) {
        return `catch(${this.error})` + super.render(opts);
    }
}
Catch.kind = "catch";
class Finally extends BlockNode {
    render(opts) {
        return "finally" + super.render(opts);
    }
}
Finally.kind = "finally";
class CodeGen {
    constructor(extScope, opts = {}) {
        this._values = {};
        this._blockStarts = [];
        this._constants = {};
        this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
        this._extScope = extScope;
        this._scope = new scope_1.Scope({ parent: extScope });
        this._nodes = [new Root()];
    }
    toString() {
        return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(prefix) {
        return this._scope.name(prefix);
    }
    // reserves unique name in the external scope
    scopeName(prefix) {
        return this._extScope.name(prefix);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(prefixOrName, value) {
        const name = this._extScope.value(prefixOrName, value);
        const vs = this._values[name.prefix] || (this._values[name.prefix] = new Set());
        vs.add(name);
        return name;
    }
    getScopeValue(prefix, keyOrRef) {
        return this._extScope.getValue(prefix, keyOrRef);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(scopeName) {
        return this._extScope.scopeRefs(scopeName, this._values);
    }
    scopeCode() {
        return this._extScope.scopeCode(this._values);
    }
    _def(varKind, nameOrPrefix, rhs, constant) {
        const name = this._scope.toName(nameOrPrefix);
        if (rhs !== undefined && constant)
            this._constants[name.str] = rhs;
        this._leafNode(new Def(varKind, name, rhs));
        return name;
    }
    // `const` declaration (`var` in es5 mode)
    const(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
    }
    // `var` declaration with optional assignment
    var(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
    }
    // assignment code
    assign(lhs, rhs, sideEffects) {
        return this._leafNode(new Assign(lhs, rhs, sideEffects));
    }
    // `+=` code
    add(lhs, rhs) {
        return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
    }
    // appends passed SafeExpr to code or executes Block
    code(c) {
        if (typeof c == "function")
            c();
        else if (c !== code_1.nil)
            this._leafNode(new AnyCode(c));
        return this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...keyValues) {
        const code = ["{"];
        for (const [key, value] of keyValues) {
            if (code.length > 1)
                code.push(",");
            code.push(key);
            if (key !== value || this.opts.es5) {
                code.push(":");
                (0, code_1.addCodeArg)(code, value);
            }
        }
        code.push("}");
        return new code_1._Code(code);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(condition, thenBody, elseBody) {
        this._blockNode(new If(condition));
        if (thenBody && elseBody) {
            this.code(thenBody).else().code(elseBody).endIf();
        }
        else if (thenBody) {
            this.code(thenBody).endIf();
        }
        else if (elseBody) {
            throw new Error('CodeGen: "else" body without "then" body');
        }
        return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(condition) {
        return this._elseNode(new If(condition));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
        return this._elseNode(new Else());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
        return this._endBlockNode(If, Else);
    }
    _for(node, forBody) {
        this._blockNode(node);
        if (forBody)
            this.code(forBody).endFor();
        return this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(iteration, forBody) {
        return this._for(new ForLoop(iteration), forBody);
    }
    // `for` statement for a range of values
    forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
        const name = this._scope.toName(nameOrPrefix);
        if (this.opts.es5) {
            const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
            return this.forRange("_i", 0, (0, code_1._) `${arr}.length`, (i) => {
                this.var(name, (0, code_1._) `${arr}[${i}]`);
                forBody(name);
            });
        }
        return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
        if (this.opts.ownProperties) {
            return this.forOf(nameOrPrefix, (0, code_1._) `Object.keys(${obj})`, forBody);
        }
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
    }
    // end `for` loop
    endFor() {
        return this._endBlockNode(For);
    }
    // `label` statement
    label(label) {
        return this._leafNode(new Label(label));
    }
    // `break` statement
    break(label) {
        return this._leafNode(new Break(label));
    }
    // `return` statement
    return(value) {
        const node = new Return();
        this._blockNode(node);
        this.code(value);
        if (node.nodes.length !== 1)
            throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(Return);
    }
    // `try` statement
    try(tryBody, catchCode, finallyCode) {
        if (!catchCode && !finallyCode)
            throw new Error('CodeGen: "try" without "catch" and "finally"');
        const node = new Try();
        this._blockNode(node);
        this.code(tryBody);
        if (catchCode) {
            const error = this.name("e");
            this._currNode = node.catch = new Catch(error);
            catchCode(error);
        }
        if (finallyCode) {
            this._currNode = node.finally = new Finally();
            this.code(finallyCode);
        }
        return this._endBlockNode(Catch, Finally);
    }
    // `throw` statement
    throw(error) {
        return this._leafNode(new Throw(error));
    }
    // start self-balancing block
    block(body, nodeCount) {
        this._blockStarts.push(this._nodes.length);
        if (body)
            this.code(body).endBlock(nodeCount);
        return this;
    }
    // end the current self-balancing block
    endBlock(nodeCount) {
        const len = this._blockStarts.pop();
        if (len === undefined)
            throw new Error("CodeGen: not in self-balancing block");
        const toClose = this._nodes.length - len;
        if (toClose < 0 || (nodeCount !== undefined && toClose !== nodeCount)) {
            throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
        }
        this._nodes.length = len;
        return this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(name, args = code_1.nil, async, funcBody) {
        this._blockNode(new Func(name, args, async));
        if (funcBody)
            this.code(funcBody).endFunc();
        return this;
    }
    // end function definition
    endFunc() {
        return this._endBlockNode(Func);
    }
    optimize(n = 1) {
        while (n-- > 0) {
            this._root.optimizeNodes();
            this._root.optimizeNames(this._root.names, this._constants);
        }
    }
    _leafNode(node) {
        this._currNode.nodes.push(node);
        return this;
    }
    _blockNode(node) {
        this._currNode.nodes.push(node);
        this._nodes.push(node);
    }
    _endBlockNode(N1, N2) {
        const n = this._currNode;
        if (n instanceof N1 || (N2 && n instanceof N2)) {
            this._nodes.pop();
            return this;
        }
        throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
    }
    _elseNode(node) {
        const n = this._currNode;
        if (!(n instanceof If)) {
            throw new Error('CodeGen: "else" without "if"');
        }
        this._currNode = n.else = node;
        return this;
    }
    get _root() {
        return this._nodes[0];
    }
    get _currNode() {
        const ns = this._nodes;
        return ns[ns.length - 1];
    }
    set _currNode(node) {
        const ns = this._nodes;
        ns[ns.length - 1] = node;
    }
}
exports.CodeGen = CodeGen;
function addNames(names, from) {
    for (const n in from)
        names[n] = (names[n] || 0) + (from[n] || 0);
    return names;
}
function addExprNames(names, from) {
    return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
}
function optimizeExpr(expr, names, constants) {
    if (expr instanceof code_1.Name)
        return replaceName(expr);
    if (!canOptimize(expr))
        return expr;
    return new code_1._Code(expr._items.reduce((items, c) => {
        if (c instanceof code_1.Name)
            c = replaceName(c);
        if (c instanceof code_1._Code)
            items.push(...c._items);
        else
            items.push(c);
        return items;
    }, []));
    function replaceName(n) {
        const c = constants[n.str];
        if (c === undefined || names[n.str] !== 1)
            return n;
        delete names[n.str];
        return c;
    }
    function canOptimize(e) {
        return (e instanceof code_1._Code &&
            e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants[c.str] !== undefined));
    }
}
function subtractNames(names, from) {
    for (const n in from)
        names[n] = (names[n] || 0) - (from[n] || 0);
}
function not(x) {
    return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_1._) `!${par(x)}`;
}
exports.not = not;
const andCode = mappend(exports.operators.AND);
// boolean AND (&&) expression with the passed arguments
function and(...args) {
    return args.reduce(andCode);
}
exports.and = and;
const orCode = mappend(exports.operators.OR);
// boolean OR (||) expression with the passed arguments
function or(...args) {
    return args.reduce(orCode);
}
exports.or = or;
function mappend(op) {
    return (x, y) => (x === code_1.nil ? y : y === code_1.nil ? x : (0, code_1._) `${par(x)} ${op} ${par(y)}`);
}
function par(x) {
    return x instanceof code_1.Name ? x : (0, code_1._) `(${x})`;
}

},{"./code":4,"./scope":6}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
const code_1 = require("./code");
class ValueError extends Error {
    constructor(name) {
        super(`CodeGen: "code" for ${name} not defined`);
        this.value = name.value;
    }
}
var UsedValueState;
(function (UsedValueState) {
    UsedValueState[UsedValueState["Started"] = 0] = "Started";
    UsedValueState[UsedValueState["Completed"] = 1] = "Completed";
})(UsedValueState = exports.UsedValueState || (exports.UsedValueState = {}));
exports.varKinds = {
    const: new code_1.Name("const"),
    let: new code_1.Name("let"),
    var: new code_1.Name("var"),
};
class Scope {
    constructor({ prefixes, parent } = {}) {
        this._names = {};
        this._prefixes = prefixes;
        this._parent = parent;
    }
    toName(nameOrPrefix) {
        return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
    }
    name(prefix) {
        return new code_1.Name(this._newName(prefix));
    }
    _newName(prefix) {
        const ng = this._names[prefix] || this._nameGroup(prefix);
        return `${prefix}${ng.index++}`;
    }
    _nameGroup(prefix) {
        var _a, _b;
        if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || (this._prefixes && !this._prefixes.has(prefix))) {
            throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
        }
        return (this._names[prefix] = { prefix, index: 0 });
    }
}
exports.Scope = Scope;
class ValueScopeName extends code_1.Name {
    constructor(prefix, nameStr) {
        super(nameStr);
        this.prefix = prefix;
    }
    setValue(value, { property, itemIndex }) {
        this.value = value;
        this.scopePath = (0, code_1._) `.${new code_1.Name(property)}[${itemIndex}]`;
    }
}
exports.ValueScopeName = ValueScopeName;
const line = (0, code_1._) `\n`;
class ValueScope extends Scope {
    constructor(opts) {
        super(opts);
        this._values = {};
        this._scope = opts.scope;
        this.opts = { ...opts, _n: opts.lines ? line : code_1.nil };
    }
    get() {
        return this._scope;
    }
    name(prefix) {
        return new ValueScopeName(prefix, this._newName(prefix));
    }
    value(nameOrPrefix, value) {
        var _a;
        if (value.ref === undefined)
            throw new Error("CodeGen: ref must be passed in value");
        const name = this.toName(nameOrPrefix);
        const { prefix } = name;
        const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
        let vs = this._values[prefix];
        if (vs) {
            const _name = vs.get(valueKey);
            if (_name)
                return _name;
        }
        else {
            vs = this._values[prefix] = new Map();
        }
        vs.set(valueKey, name);
        const s = this._scope[prefix] || (this._scope[prefix] = []);
        const itemIndex = s.length;
        s[itemIndex] = value.ref;
        name.setValue(value, { property: prefix, itemIndex });
        return name;
    }
    getValue(prefix, keyOrRef) {
        const vs = this._values[prefix];
        if (!vs)
            return;
        return vs.get(keyOrRef);
    }
    scopeRefs(scopeName, values = this._values) {
        return this._reduceValues(values, (name) => {
            if (name.scopePath === undefined)
                throw new Error(`CodeGen: name "${name}" has no value`);
            return (0, code_1._) `${scopeName}${name.scopePath}`;
        });
    }
    scopeCode(values = this._values, usedValues, getCode) {
        return this._reduceValues(values, (name) => {
            if (name.value === undefined)
                throw new Error(`CodeGen: name "${name}" has no value`);
            return name.value.code;
        }, usedValues, getCode);
    }
    _reduceValues(values, valueCode, usedValues = {}, getCode) {
        let code = code_1.nil;
        for (const prefix in values) {
            const vs = values[prefix];
            if (!vs)
                continue;
            const nameSet = (usedValues[prefix] = usedValues[prefix] || new Map());
            vs.forEach((name) => {
                if (nameSet.has(name))
                    return;
                nameSet.set(name, UsedValueState.Started);
                let c = valueCode(name);
                if (c) {
                    const def = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
                    code = (0, code_1._) `${code}${def} ${name} = ${c};${this.opts._n}`;
                }
                else if ((c = getCode === null || getCode === void 0 ? void 0 : getCode(name))) {
                    code = (0, code_1._) `${code}${c}${this.opts._n}`;
                }
                else {
                    throw new ValueError(name);
                }
                nameSet.set(name, UsedValueState.Completed);
            });
        }
        return code;
    }
}
exports.ValueScope = ValueScope;

},{"./code":4}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
const codegen_1 = require("./codegen");
const util_1 = require("./util");
const names_1 = require("./names");
exports.keywordError = {
    message: ({ keyword }) => (0, codegen_1.str) `must pass "${keyword}" keyword validation`,
};
exports.keyword$DataError = {
    message: ({ keyword, schemaType }) => schemaType
        ? (0, codegen_1.str) `"${keyword}" keyword must be ${schemaType} ($data)`
        : (0, codegen_1.str) `"${keyword}" keyword is invalid ($data)`,
};
function reportError(cxt, error = exports.keywordError, errorPaths, overrideAllErrors) {
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error, errorPaths);
    if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : (compositeRule || allErrors)) {
        addError(gen, errObj);
    }
    else {
        returnErrors(it, (0, codegen_1._) `[${errObj}]`);
    }
}
exports.reportError = reportError;
function reportExtraError(cxt, error = exports.keywordError, errorPaths) {
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error, errorPaths);
    addError(gen, errObj);
    if (!(compositeRule || allErrors)) {
        returnErrors(it, names_1.default.vErrors);
    }
}
exports.reportExtraError = reportExtraError;
function resetErrorsCount(gen, errsCount) {
    gen.assign(names_1.default.errors, errsCount);
    gen.if((0, codegen_1._) `${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._) `${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
}
exports.resetErrorsCount = resetErrorsCount;
function extendErrors({ gen, keyword, schemaValue, data, errsCount, it, }) {
    /* istanbul ignore if */
    if (errsCount === undefined)
        throw new Error("ajv implementation error");
    const err = gen.name("err");
    gen.forRange("i", errsCount, names_1.default.errors, (i) => {
        gen.const(err, (0, codegen_1._) `${names_1.default.vErrors}[${i}]`);
        gen.if((0, codegen_1._) `${err}.instancePath === undefined`, () => gen.assign((0, codegen_1._) `${err}.instancePath`, (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath)));
        gen.assign((0, codegen_1._) `${err}.schemaPath`, (0, codegen_1.str) `${it.errSchemaPath}/${keyword}`);
        if (it.opts.verbose) {
            gen.assign((0, codegen_1._) `${err}.schema`, schemaValue);
            gen.assign((0, codegen_1._) `${err}.data`, data);
        }
    });
}
exports.extendErrors = extendErrors;
function addError(gen, errObj) {
    const err = gen.const("err", errObj);
    gen.if((0, codegen_1._) `${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, (0, codegen_1._) `[${err}]`), (0, codegen_1._) `${names_1.default.vErrors}.push(${err})`);
    gen.code((0, codegen_1._) `${names_1.default.errors}++`);
}
function returnErrors(it, errs) {
    const { gen, validateName, schemaEnv } = it;
    if (schemaEnv.$async) {
        gen.throw((0, codegen_1._) `new ${it.ValidationError}(${errs})`);
    }
    else {
        gen.assign((0, codegen_1._) `${validateName}.errors`, errs);
        gen.return(false);
    }
}
const E = {
    keyword: new codegen_1.Name("keyword"),
    schemaPath: new codegen_1.Name("schemaPath"),
    params: new codegen_1.Name("params"),
    propertyName: new codegen_1.Name("propertyName"),
    message: new codegen_1.Name("message"),
    schema: new codegen_1.Name("schema"),
    parentSchema: new codegen_1.Name("parentSchema"),
};
function errorObjectCode(cxt, error, errorPaths) {
    const { createErrors } = cxt.it;
    if (createErrors === false)
        return (0, codegen_1._) `{}`;
    return errorObject(cxt, error, errorPaths);
}
function errorObject(cxt, error, errorPaths = {}) {
    const { gen, it } = cxt;
    const keyValues = [
        errorInstancePath(it, errorPaths),
        errorSchemaPath(cxt, errorPaths),
    ];
    extraErrorProps(cxt, error, keyValues);
    return gen.object(...keyValues);
}
function errorInstancePath({ errorPath }, { instancePath }) {
    const instPath = instancePath
        ? (0, codegen_1.str) `${errorPath}${(0, util_1.getErrorPath)(instancePath, util_1.Type.Str)}`
        : errorPath;
    return [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)];
}
function errorSchemaPath({ keyword, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
    let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str) `${errSchemaPath}/${keyword}`;
    if (schemaPath) {
        schPath = (0, codegen_1.str) `${schPath}${(0, util_1.getErrorPath)(schemaPath, util_1.Type.Str)}`;
    }
    return [E.schemaPath, schPath];
}
function extraErrorProps(cxt, { params, message }, keyValues) {
    const { keyword, data, schemaValue, it } = cxt;
    const { opts, propertyName, topSchemaRef, schemaPath } = it;
    keyValues.push([E.keyword, keyword], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_1._) `{}`]);
    if (opts.messages) {
        keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
    }
    if (opts.verbose) {
        keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_1._) `${topSchemaRef}${schemaPath}`], [names_1.default.data, data]);
    }
    if (propertyName)
        keyValues.push([E.propertyName, propertyName]);
}

},{"./codegen":5,"./names":9,"./util":13}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveSchema = exports.getCompilingSchema = exports.resolveRef = exports.compileSchema = exports.SchemaEnv = void 0;
const codegen_1 = require("./codegen");
const validation_error_1 = require("../runtime/validation_error");
const names_1 = require("./names");
const resolve_1 = require("./resolve");
const util_1 = require("./util");
const validate_1 = require("./validate");
class SchemaEnv {
    constructor(env) {
        var _a;
        this.refs = {};
        this.dynamicAnchors = {};
        let schema;
        if (typeof env.schema == "object")
            schema = env.schema;
        this.schema = env.schema;
        this.schemaId = env.schemaId;
        this.root = env.root || this;
        this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env.schemaId || "$id"]);
        this.schemaPath = env.schemaPath;
        this.localRefs = env.localRefs;
        this.meta = env.meta;
        this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
        this.refs = {};
    }
}
exports.SchemaEnv = SchemaEnv;
// let codeSize = 0
// let nodeCount = 0
// Compiles schema in SchemaEnv
function compileSchema(sch) {
    // TODO refactor - remove compilations
    const _sch = getCompilingSchema.call(this, sch);
    if (_sch)
        return _sch;
    const rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId); // TODO if getFullPath removed 1 tests fails
    const { es5, lines } = this.opts.code;
    const { ownProperties } = this.opts;
    const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
    let _ValidationError;
    if (sch.$async) {
        _ValidationError = gen.scopeValue("Error", {
            ref: validation_error_1.default,
            code: (0, codegen_1._) `require("ajv/dist/runtime/validation_error").default`,
        });
    }
    const validateName = gen.scopeName("validate");
    sch.validateName = validateName;
    const schemaCxt = {
        gen,
        allErrors: this.opts.allErrors,
        data: names_1.default.data,
        parentData: names_1.default.parentData,
        parentDataProperty: names_1.default.parentDataProperty,
        dataNames: [names_1.default.data],
        dataPathArr: [codegen_1.nil],
        dataLevel: 0,
        dataTypes: [],
        definedProperties: new Set(),
        topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true
            ? { ref: sch.schema, code: (0, codegen_1.stringify)(sch.schema) }
            : { ref: sch.schema }),
        validateName,
        ValidationError: _ValidationError,
        schema: sch.schema,
        schemaEnv: sch,
        rootId,
        baseId: sch.baseId || rootId,
        schemaPath: codegen_1.nil,
        errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
        errorPath: (0, codegen_1._) `""`,
        opts: this.opts,
        self: this,
    };
    let sourceCode;
    try {
        this._compilations.add(sch);
        (0, validate_1.validateFunctionCode)(schemaCxt);
        gen.optimize(this.opts.code.optimize);
        // gen.optimize(1)
        const validateCode = gen.toString();
        sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`;
        // console.log((codeSize += sourceCode.length), (nodeCount += gen.nodeCount))
        if (this.opts.code.process)
            sourceCode = this.opts.code.process(sourceCode, sch);
        // console.log("\n\n\n *** \n", sourceCode)
        const makeValidate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode);
        const validate = makeValidate(this, this.scope.get());
        this.scope.value(validateName, { ref: validate });
        validate.errors = null;
        validate.schema = sch.schema;
        validate.schemaEnv = sch;
        if (sch.$async)
            validate.$async = true;
        if (this.opts.code.source === true) {
            validate.source = { validateName, validateCode, scopeValues: gen._values };
        }
        if (this.opts.unevaluated) {
            const { props, items } = schemaCxt;
            validate.evaluated = {
                props: props instanceof codegen_1.Name ? undefined : props,
                items: items instanceof codegen_1.Name ? undefined : items,
                dynamicProps: props instanceof codegen_1.Name,
                dynamicItems: items instanceof codegen_1.Name,
            };
            if (validate.source)
                validate.source.evaluated = (0, codegen_1.stringify)(validate.evaluated);
        }
        sch.validate = validate;
        return sch;
    }
    catch (e) {
        delete sch.validate;
        delete sch.validateName;
        if (sourceCode)
            this.logger.error("Error compiling schema, function code:", sourceCode);
        // console.log("\n\n\n *** \n", sourceCode, this.opts)
        throw e;
    }
    finally {
        this._compilations.delete(sch);
    }
}
exports.compileSchema = compileSchema;
function resolveRef(root, baseId, ref) {
    var _a;
    ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref);
    const schOrFunc = root.refs[ref];
    if (schOrFunc)
        return schOrFunc;
    let _sch = resolve.call(this, root, ref);
    if (_sch === undefined) {
        const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref]; // TODO maybe localRefs should hold SchemaEnv
        const { schemaId } = this.opts;
        if (schema)
            _sch = new SchemaEnv({ schema, schemaId, root, baseId });
    }
    if (_sch === undefined)
        return;
    return (root.refs[ref] = inlineOrCompile.call(this, _sch));
}
exports.resolveRef = resolveRef;
function inlineOrCompile(sch) {
    if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs))
        return sch.schema;
    return sch.validate ? sch : compileSchema.call(this, sch);
}
// Index of schema compilation in the currently compiled list
function getCompilingSchema(schEnv) {
    for (const sch of this._compilations) {
        if (sameSchemaEnv(sch, schEnv))
            return sch;
    }
}
exports.getCompilingSchema = getCompilingSchema;
function sameSchemaEnv(s1, s2) {
    return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
}
// resolve and compile the references ($ref)
// TODO returns AnySchemaObject (if the schema can be inlined) or validation function
function resolve(root, // information about the root schema for the current schema
ref // reference to resolve
) {
    let sch;
    while (typeof (sch = this.refs[ref]) == "string")
        ref = sch;
    return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
}
// Resolve schema, its root and baseId
function resolveSchema(root, // root object with properties schema, refs TODO below SchemaEnv is assigned to it
ref // reference to resolve
) {
    const p = this.opts.uriResolver.parse(ref);
    const refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p);
    let baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, undefined);
    // TODO `Object.keys(root.schema).length > 0` should not be needed - but removing breaks 2 tests
    if (Object.keys(root.schema).length > 0 && refPath === baseId) {
        return getJsonPointer.call(this, p, root);
    }
    const id = (0, resolve_1.normalizeId)(refPath);
    const schOrRef = this.refs[id] || this.schemas[id];
    if (typeof schOrRef == "string") {
        const sch = resolveSchema.call(this, root, schOrRef);
        if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
            return;
        return getJsonPointer.call(this, p, sch);
    }
    if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
        return;
    if (!schOrRef.validate)
        compileSchema.call(this, schOrRef);
    if (id === (0, resolve_1.normalizeId)(ref)) {
        const { schema } = schOrRef;
        const { schemaId } = this.opts;
        const schId = schema[schemaId];
        if (schId)
            baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        return new SchemaEnv({ schema, schemaId, root, baseId });
    }
    return getJsonPointer.call(this, p, schOrRef);
}
exports.resolveSchema = resolveSchema;
const PREVENT_SCOPE_CHANGE = new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions",
]);
function getJsonPointer(parsedRef, { baseId, schema, root }) {
    var _a;
    if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
        return;
    for (const part of parsedRef.fragment.slice(1).split("/")) {
        if (typeof schema === "boolean")
            return;
        const partSchema = schema[(0, util_1.unescapeFragment)(part)];
        if (partSchema === undefined)
            return;
        schema = partSchema;
        // TODO PREVENT_SCOPE_CHANGE could be defined in keyword def?
        const schId = typeof schema === "object" && schema[this.opts.schemaId];
        if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
            baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        }
    }
    let env;
    if (typeof schema != "boolean" && schema.$ref && !(0, util_1.schemaHasRulesButRef)(schema, this.RULES)) {
        const $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
        env = resolveSchema.call(this, root, $ref);
    }
    // even though resolution failed we need to return SchemaEnv to throw exception
    // so that compileAsync loads missing schema.
    const { schemaId } = this.opts;
    env = env || new SchemaEnv({ schema, schemaId, root, baseId });
    if (env.schema !== env.root.schema)
        return env;
    return undefined;
}

},{"../runtime/validation_error":34,"./codegen":5,"./names":9,"./resolve":11,"./util":13,"./validate":18}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("./codegen");
const names = {
    // validation function arguments
    data: new codegen_1.Name("data"),
    // args passed from referencing schema
    valCxt: new codegen_1.Name("valCxt"),
    instancePath: new codegen_1.Name("instancePath"),
    parentData: new codegen_1.Name("parentData"),
    parentDataProperty: new codegen_1.Name("parentDataProperty"),
    rootData: new codegen_1.Name("rootData"),
    dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
    // function scoped variables
    vErrors: new codegen_1.Name("vErrors"),
    errors: new codegen_1.Name("errors"),
    this: new codegen_1.Name("this"),
    // "globals"
    self: new codegen_1.Name("self"),
    scope: new codegen_1.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new codegen_1.Name("json"),
    jsonPos: new codegen_1.Name("jsonPos"),
    jsonLen: new codegen_1.Name("jsonLen"),
    jsonPart: new codegen_1.Name("jsonPart"),
};
exports.default = names;

},{"./codegen":5}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolve_1 = require("./resolve");
class MissingRefError extends Error {
    constructor(resolver, baseId, ref, msg) {
        super(msg || `can't resolve reference ${ref} from id ${baseId}`);
        this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref);
        this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
    }
}
exports.default = MissingRefError;

},{"./resolve":11}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchemaRefs = exports.resolveUrl = exports.normalizeId = exports._getFullPath = exports.getFullPath = exports.inlineRef = void 0;
const util_1 = require("./util");
const equal = require("fast-deep-equal");
const traverse = require("json-schema-traverse");
// TODO refactor to use keyword definitions
const SIMPLE_INLINED = new Set([
    "type",
    "format",
    "pattern",
    "maxLength",
    "minLength",
    "maxProperties",
    "minProperties",
    "maxItems",
    "minItems",
    "maximum",
    "minimum",
    "uniqueItems",
    "multipleOf",
    "required",
    "enum",
    "const",
]);
function inlineRef(schema, limit = true) {
    if (typeof schema == "boolean")
        return true;
    if (limit === true)
        return !hasRef(schema);
    if (!limit)
        return false;
    return countKeys(schema) <= limit;
}
exports.inlineRef = inlineRef;
const REF_KEYWORDS = new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor",
]);
function hasRef(schema) {
    for (const key in schema) {
        if (REF_KEYWORDS.has(key))
            return true;
        const sch = schema[key];
        if (Array.isArray(sch) && sch.some(hasRef))
            return true;
        if (typeof sch == "object" && hasRef(sch))
            return true;
    }
    return false;
}
function countKeys(schema) {
    let count = 0;
    for (const key in schema) {
        if (key === "$ref")
            return Infinity;
        count++;
        if (SIMPLE_INLINED.has(key))
            continue;
        if (typeof schema[key] == "object") {
            (0, util_1.eachItem)(schema[key], (sch) => (count += countKeys(sch)));
        }
        if (count === Infinity)
            return Infinity;
    }
    return count;
}
function getFullPath(resolver, id = "", normalize) {
    if (normalize !== false)
        id = normalizeId(id);
    const p = resolver.parse(id);
    return _getFullPath(resolver, p);
}
exports.getFullPath = getFullPath;
function _getFullPath(resolver, p) {
    const serialized = resolver.serialize(p);
    return serialized.split("#")[0] + "#";
}
exports._getFullPath = _getFullPath;
const TRAILING_SLASH_HASH = /#\/?$/;
function normalizeId(id) {
    return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
}
exports.normalizeId = normalizeId;
function resolveUrl(resolver, baseId, id) {
    id = normalizeId(id);
    return resolver.resolve(baseId, id);
}
exports.resolveUrl = resolveUrl;
const ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
function getSchemaRefs(schema, baseId) {
    if (typeof schema == "boolean")
        return {};
    const { schemaId, uriResolver } = this.opts;
    const schId = normalizeId(schema[schemaId] || baseId);
    const baseIds = { "": schId };
    const pathPrefix = getFullPath(uriResolver, schId, false);
    const localRefs = {};
    const schemaRefs = new Set();
    traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
        if (parentJsonPtr === undefined)
            return;
        const fullPath = pathPrefix + jsonPtr;
        let baseId = baseIds[parentJsonPtr];
        if (typeof sch[schemaId] == "string")
            baseId = addRef.call(this, sch[schemaId]);
        addAnchor.call(this, sch.$anchor);
        addAnchor.call(this, sch.$dynamicAnchor);
        baseIds[jsonPtr] = baseId;
        function addRef(ref) {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            const _resolve = this.opts.uriResolver.resolve;
            ref = normalizeId(baseId ? _resolve(baseId, ref) : ref);
            if (schemaRefs.has(ref))
                throw ambiguos(ref);
            schemaRefs.add(ref);
            let schOrRef = this.refs[ref];
            if (typeof schOrRef == "string")
                schOrRef = this.refs[schOrRef];
            if (typeof schOrRef == "object") {
                checkAmbiguosRef(sch, schOrRef.schema, ref);
            }
            else if (ref !== normalizeId(fullPath)) {
                if (ref[0] === "#") {
                    checkAmbiguosRef(sch, localRefs[ref], ref);
                    localRefs[ref] = sch;
                }
                else {
                    this.refs[ref] = fullPath;
                }
            }
            return ref;
        }
        function addAnchor(anchor) {
            if (typeof anchor == "string") {
                if (!ANCHOR.test(anchor))
                    throw new Error(`invalid anchor "${anchor}"`);
                addRef.call(this, `#${anchor}`);
            }
        }
    });
    return localRefs;
    function checkAmbiguosRef(sch1, sch2, ref) {
        if (sch2 !== undefined && !equal(sch1, sch2))
            throw ambiguos(ref);
    }
    function ambiguos(ref) {
        return new Error(`reference "${ref}" resolves to more than one schema`);
    }
}
exports.getSchemaRefs = getSchemaRefs;

},{"./util":13,"fast-deep-equal":85,"json-schema-traverse":86}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = exports.isJSONType = void 0;
const _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
const jsonTypes = new Set(_jsonTypes);
function isJSONType(x) {
    return typeof x == "string" && jsonTypes.has(x);
}
exports.isJSONType = isJSONType;
function getRules() {
    const groups = {
        number: { type: "number", rules: [] },
        string: { type: "string", rules: [] },
        array: { type: "array", rules: [] },
        object: { type: "object", rules: [] },
    };
    return {
        types: { ...groups, integer: true, boolean: true, null: true },
        rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
        post: { rules: [] },
        all: {},
        keywords: {},
    };
}
exports.getRules = getRules;

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
const codegen_1 = require("./codegen");
const code_1 = require("./codegen/code");
// TODO refactor to use Set
function toHash(arr) {
    const hash = {};
    for (const item of arr)
        hash[item] = true;
    return hash;
}
exports.toHash = toHash;
function alwaysValidSchema(it, schema) {
    if (typeof schema == "boolean")
        return schema;
    if (Object.keys(schema).length === 0)
        return true;
    checkUnknownRules(it, schema);
    return !schemaHasRules(schema, it.self.RULES.all);
}
exports.alwaysValidSchema = alwaysValidSchema;
function checkUnknownRules(it, schema = it.schema) {
    const { opts, self } = it;
    if (!opts.strictSchema)
        return;
    if (typeof schema === "boolean")
        return;
    const rules = self.RULES.keywords;
    for (const key in schema) {
        if (!rules[key])
            checkStrictMode(it, `unknown keyword: "${key}"`);
    }
}
exports.checkUnknownRules = checkUnknownRules;
function schemaHasRules(schema, rules) {
    if (typeof schema == "boolean")
        return !schema;
    for (const key in schema)
        if (rules[key])
            return true;
    return false;
}
exports.schemaHasRules = schemaHasRules;
function schemaHasRulesButRef(schema, RULES) {
    if (typeof schema == "boolean")
        return !schema;
    for (const key in schema)
        if (key !== "$ref" && RULES.all[key])
            return true;
    return false;
}
exports.schemaHasRulesButRef = schemaHasRulesButRef;
function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword, $data) {
    if (!$data) {
        if (typeof schema == "number" || typeof schema == "boolean")
            return schema;
        if (typeof schema == "string")
            return (0, codegen_1._) `${schema}`;
    }
    return (0, codegen_1._) `${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword)}`;
}
exports.schemaRefOrVal = schemaRefOrVal;
function unescapeFragment(str) {
    return unescapeJsonPointer(decodeURIComponent(str));
}
exports.unescapeFragment = unescapeFragment;
function escapeFragment(str) {
    return encodeURIComponent(escapeJsonPointer(str));
}
exports.escapeFragment = escapeFragment;
function escapeJsonPointer(str) {
    if (typeof str == "number")
        return `${str}`;
    return str.replace(/~/g, "~0").replace(/\//g, "~1");
}
exports.escapeJsonPointer = escapeJsonPointer;
function unescapeJsonPointer(str) {
    return str.replace(/~1/g, "/").replace(/~0/g, "~");
}
exports.unescapeJsonPointer = unescapeJsonPointer;
function eachItem(xs, f) {
    if (Array.isArray(xs)) {
        for (const x of xs)
            f(x);
    }
    else {
        f(xs);
    }
}
exports.eachItem = eachItem;
function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName, }) {
    return (gen, from, to, toName) => {
        const res = to === undefined
            ? from
            : to instanceof codegen_1.Name
                ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to)
                : from instanceof codegen_1.Name
                    ? (mergeToName(gen, to, from), from)
                    : mergeValues(from, to);
        return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
    };
}
exports.mergeEvaluated = {
    props: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true && ${from} !== undefined`, () => {
            gen.if((0, codegen_1._) `${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_1._) `${to} || {}`).code((0, codegen_1._) `Object.assign(${to}, ${from})`));
        }),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true`, () => {
            if (from === true) {
                gen.assign(to, true);
            }
            else {
                gen.assign(to, (0, codegen_1._) `${to} || {}`);
                setEvaluated(gen, to, from);
            }
        }),
        mergeValues: (from, to) => (from === true ? true : { ...from, ...to }),
        resultToName: evaluatedPropsToName,
    }),
    items: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1._) `${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_1._) `${to} > ${from} ? ${to} : ${from}`)),
        mergeValues: (from, to) => (from === true ? true : Math.max(from, to)),
        resultToName: (gen, items) => gen.var("items", items),
    }),
};
function evaluatedPropsToName(gen, ps) {
    if (ps === true)
        return gen.var("props", true);
    const props = gen.var("props", (0, codegen_1._) `{}`);
    if (ps !== undefined)
        setEvaluated(gen, props, ps);
    return props;
}
exports.evaluatedPropsToName = evaluatedPropsToName;
function setEvaluated(gen, props, ps) {
    Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._) `${props}${(0, codegen_1.getProperty)(p)}`, true));
}
exports.setEvaluated = setEvaluated;
const snippets = {};
function useFunc(gen, f) {
    return gen.scopeValue("func", {
        ref: f,
        code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code)),
    });
}
exports.useFunc = useFunc;
var Type;
(function (Type) {
    Type[Type["Num"] = 0] = "Num";
    Type[Type["Str"] = 1] = "Str";
})(Type = exports.Type || (exports.Type = {}));
function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
    // let path
    if (dataProp instanceof codegen_1.Name) {
        const isNumber = dataPropType === Type.Num;
        return jsPropertySyntax
            ? isNumber
                ? (0, codegen_1._) `"[" + ${dataProp} + "]"`
                : (0, codegen_1._) `"['" + ${dataProp} + "']"`
            : isNumber
                ? (0, codegen_1._) `"/" + ${dataProp}`
                : (0, codegen_1._) `"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`; // TODO maybe use global escapePointer
    }
    return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
}
exports.getErrorPath = getErrorPath;
function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
    if (!mode)
        return;
    msg = `strict mode: ${msg}`;
    if (mode === true)
        throw new Error(msg);
    it.self.logger.warn(msg);
}
exports.checkStrictMode = checkStrictMode;

},{"./codegen":5,"./codegen/code":4}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldUseRule = exports.shouldUseGroup = exports.schemaHasRulesForType = void 0;
function schemaHasRulesForType({ schema, self }, type) {
    const group = self.RULES.types[type];
    return group && group !== true && shouldUseGroup(schema, group);
}
exports.schemaHasRulesForType = schemaHasRulesForType;
function shouldUseGroup(schema, group) {
    return group.rules.some((rule) => shouldUseRule(schema, rule));
}
exports.shouldUseGroup = shouldUseGroup;
function shouldUseRule(schema, rule) {
    var _a;
    return (schema[rule.keyword] !== undefined ||
        ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== undefined)));
}
exports.shouldUseRule = shouldUseRule;

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boolOrEmptySchema = exports.topBoolOrEmptySchema = void 0;
const errors_1 = require("../errors");
const codegen_1 = require("../codegen");
const names_1 = require("../names");
const boolError = {
    message: "boolean schema is false",
};
function topBoolOrEmptySchema(it) {
    const { gen, schema, validateName } = it;
    if (schema === false) {
        falseSchemaError(it, false);
    }
    else if (typeof schema == "object" && schema.$async === true) {
        gen.return(names_1.default.data);
    }
    else {
        gen.assign((0, codegen_1._) `${validateName}.errors`, null);
        gen.return(true);
    }
}
exports.topBoolOrEmptySchema = topBoolOrEmptySchema;
function boolOrEmptySchema(it, valid) {
    const { gen, schema } = it;
    if (schema === false) {
        gen.var(valid, false); // TODO var
        falseSchemaError(it);
    }
    else {
        gen.var(valid, true); // TODO var
    }
}
exports.boolOrEmptySchema = boolOrEmptySchema;
function falseSchemaError(it, overrideAllErrors) {
    const { gen, data } = it;
    // TODO maybe some other interface should be used for non-keyword validation errors...
    const cxt = {
        gen,
        keyword: "false schema",
        data,
        schema: false,
        schemaCode: false,
        schemaValue: false,
        params: {},
        it,
    };
    (0, errors_1.reportError)(cxt, boolError, undefined, overrideAllErrors);
}

},{"../codegen":5,"../errors":7,"../names":9}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
const rules_1 = require("../rules");
const applicability_1 = require("./applicability");
const errors_1 = require("../errors");
const codegen_1 = require("../codegen");
const util_1 = require("../util");
var DataType;
(function (DataType) {
    DataType[DataType["Correct"] = 0] = "Correct";
    DataType[DataType["Wrong"] = 1] = "Wrong";
})(DataType = exports.DataType || (exports.DataType = {}));
function getSchemaTypes(schema) {
    const types = getJSONTypes(schema.type);
    const hasNull = types.includes("null");
    if (hasNull) {
        if (schema.nullable === false)
            throw new Error("type: null contradicts nullable: false");
    }
    else {
        if (!types.length && schema.nullable !== undefined) {
            throw new Error('"nullable" cannot be used without "type"');
        }
        if (schema.nullable === true)
            types.push("null");
    }
    return types;
}
exports.getSchemaTypes = getSchemaTypes;
function getJSONTypes(ts) {
    const types = Array.isArray(ts) ? ts : ts ? [ts] : [];
    if (types.every(rules_1.isJSONType))
        return types;
    throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
}
exports.getJSONTypes = getJSONTypes;
function coerceAndCheckDataType(it, types) {
    const { gen, data, opts } = it;
    const coerceTo = coerceToTypes(types, opts.coerceTypes);
    const checkTypes = types.length > 0 &&
        !(coerceTo.length === 0 && types.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types[0]));
    if (checkTypes) {
        const wrongType = checkDataTypes(types, data, opts.strictNumbers, DataType.Wrong);
        gen.if(wrongType, () => {
            if (coerceTo.length)
                coerceData(it, types, coerceTo);
            else
                reportTypeError(it);
        });
    }
    return checkTypes;
}
exports.coerceAndCheckDataType = coerceAndCheckDataType;
const COERCIBLE = new Set(["string", "number", "integer", "boolean", "null"]);
function coerceToTypes(types, coerceTypes) {
    return coerceTypes
        ? types.filter((t) => COERCIBLE.has(t) || (coerceTypes === "array" && t === "array"))
        : [];
}
function coerceData(it, types, coerceTo) {
    const { gen, data, opts } = it;
    const dataType = gen.let("dataType", (0, codegen_1._) `typeof ${data}`);
    const coerced = gen.let("coerced", (0, codegen_1._) `undefined`);
    if (opts.coerceTypes === "array") {
        gen.if((0, codegen_1._) `${dataType} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen
            .assign(data, (0, codegen_1._) `${data}[0]`)
            .assign(dataType, (0, codegen_1._) `typeof ${data}`)
            .if(checkDataTypes(types, data, opts.strictNumbers), () => gen.assign(coerced, data)));
    }
    gen.if((0, codegen_1._) `${coerced} !== undefined`);
    for (const t of coerceTo) {
        if (COERCIBLE.has(t) || (t === "array" && opts.coerceTypes === "array")) {
            coerceSpecificType(t);
        }
    }
    gen.else();
    reportTypeError(it);
    gen.endIf();
    gen.if((0, codegen_1._) `${coerced} !== undefined`, () => {
        gen.assign(data, coerced);
        assignParentData(it, coerced);
    });
    function coerceSpecificType(t) {
        switch (t) {
            case "string":
                gen
                    .elseIf((0, codegen_1._) `${dataType} == "number" || ${dataType} == "boolean"`)
                    .assign(coerced, (0, codegen_1._) `"" + ${data}`)
                    .elseIf((0, codegen_1._) `${data} === null`)
                    .assign(coerced, (0, codegen_1._) `""`);
                return;
            case "number":
                gen
                    .elseIf((0, codegen_1._) `${dataType} == "boolean" || ${data} === null
              || (${dataType} == "string" && ${data} && ${data} == +${data})`)
                    .assign(coerced, (0, codegen_1._) `+${data}`);
                return;
            case "integer":
                gen
                    .elseIf((0, codegen_1._) `${dataType} === "boolean" || ${data} === null
              || (${dataType} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`)
                    .assign(coerced, (0, codegen_1._) `+${data}`);
                return;
            case "boolean":
                gen
                    .elseIf((0, codegen_1._) `${data} === "false" || ${data} === 0 || ${data} === null`)
                    .assign(coerced, false)
                    .elseIf((0, codegen_1._) `${data} === "true" || ${data} === 1`)
                    .assign(coerced, true);
                return;
            case "null":
                gen.elseIf((0, codegen_1._) `${data} === "" || ${data} === 0 || ${data} === false`);
                gen.assign(coerced, null);
                return;
            case "array":
                gen
                    .elseIf((0, codegen_1._) `${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data} === null`)
                    .assign(coerced, (0, codegen_1._) `[${data}]`);
        }
    }
}
function assignParentData({ gen, parentData, parentDataProperty }, expr) {
    // TODO use gen.property
    gen.if((0, codegen_1._) `${parentData} !== undefined`, () => gen.assign((0, codegen_1._) `${parentData}[${parentDataProperty}]`, expr));
}
function checkDataType(dataType, data, strictNums, correct = DataType.Correct) {
    const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
    let cond;
    switch (dataType) {
        case "null":
            return (0, codegen_1._) `${data} ${EQ} null`;
        case "array":
            cond = (0, codegen_1._) `Array.isArray(${data})`;
            break;
        case "object":
            cond = (0, codegen_1._) `${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
            break;
        case "integer":
            cond = numCond((0, codegen_1._) `!(${data} % 1) && !isNaN(${data})`);
            break;
        case "number":
            cond = numCond();
            break;
        default:
            return (0, codegen_1._) `typeof ${data} ${EQ} ${dataType}`;
    }
    return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
    function numCond(_cond = codegen_1.nil) {
        return (0, codegen_1.and)((0, codegen_1._) `typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1._) `isFinite(${data})` : codegen_1.nil);
    }
}
exports.checkDataType = checkDataType;
function checkDataTypes(dataTypes, data, strictNums, correct) {
    if (dataTypes.length === 1) {
        return checkDataType(dataTypes[0], data, strictNums, correct);
    }
    let cond;
    const types = (0, util_1.toHash)(dataTypes);
    if (types.array && types.object) {
        const notObj = (0, codegen_1._) `typeof ${data} != "object"`;
        cond = types.null ? notObj : (0, codegen_1._) `!${data} || ${notObj}`;
        delete types.null;
        delete types.array;
        delete types.object;
    }
    else {
        cond = codegen_1.nil;
    }
    if (types.number)
        delete types.integer;
    for (const t in types)
        cond = (0, codegen_1.and)(cond, checkDataType(t, data, strictNums, correct));
    return cond;
}
exports.checkDataTypes = checkDataTypes;
const typeError = {
    message: ({ schema }) => `must be ${schema}`,
    params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1._) `{type: ${schema}}` : (0, codegen_1._) `{type: ${schemaValue}}`,
};
function reportTypeError(it) {
    const cxt = getTypeErrorContext(it);
    (0, errors_1.reportError)(cxt, typeError);
}
exports.reportTypeError = reportTypeError;
function getTypeErrorContext(it) {
    const { gen, data, schema } = it;
    const schemaCode = (0, util_1.schemaRefOrVal)(it, schema, "type");
    return {
        gen,
        keyword: "type",
        data,
        schema: schema.type,
        schemaCode,
        schemaValue: schemaCode,
        parentSchema: schema,
        params: {},
        it,
    };
}

},{"../codegen":5,"../errors":7,"../rules":12,"../util":13,"./applicability":14}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignDefaults = void 0;
const codegen_1 = require("../codegen");
const util_1 = require("../util");
function assignDefaults(it, ty) {
    const { properties, items } = it.schema;
    if (ty === "object" && properties) {
        for (const key in properties) {
            assignDefault(it, key, properties[key].default);
        }
    }
    else if (ty === "array" && Array.isArray(items)) {
        items.forEach((sch, i) => assignDefault(it, i, sch.default));
    }
}
exports.assignDefaults = assignDefaults;
function assignDefault(it, prop, defaultValue) {
    const { gen, compositeRule, data, opts } = it;
    if (defaultValue === undefined)
        return;
    const childData = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(prop)}`;
    if (compositeRule) {
        (0, util_1.checkStrictMode)(it, `default is ignored for: ${childData}`);
        return;
    }
    let condition = (0, codegen_1._) `${childData} === undefined`;
    if (opts.useDefaults === "empty") {
        condition = (0, codegen_1._) `${condition} || ${childData} === null || ${childData} === ""`;
    }
    // `${childData} === undefined` +
    // (opts.useDefaults === "empty" ? ` || ${childData} === null || ${childData} === ""` : "")
    gen.if(condition, (0, codegen_1._) `${childData} = ${(0, codegen_1.stringify)(defaultValue)}`);
}

},{"../codegen":5,"../util":13}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = exports.KeywordCxt = exports.validateFunctionCode = void 0;
const boolSchema_1 = require("./boolSchema");
const dataType_1 = require("./dataType");
const applicability_1 = require("./applicability");
const dataType_2 = require("./dataType");
const defaults_1 = require("./defaults");
const keyword_1 = require("./keyword");
const subschema_1 = require("./subschema");
const codegen_1 = require("../codegen");
const names_1 = require("../names");
const resolve_1 = require("../resolve");
const util_1 = require("../util");
const errors_1 = require("../errors");
// schema compilation - generates validation function, subschemaCode (below) is used for subschemas
function validateFunctionCode(it) {
    if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
            topSchemaObjCode(it);
            return;
        }
    }
    validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
}
exports.validateFunctionCode = validateFunctionCode;
function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
    if (opts.code.es5) {
        gen.func(validateName, (0, codegen_1._) `${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
            gen.code((0, codegen_1._) `"use strict"; ${funcSourceUrl(schema, opts)}`);
            destructureValCxtES5(gen, opts);
            gen.code(body);
        });
    }
    else {
        gen.func(validateName, (0, codegen_1._) `${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
    }
}
function destructureValCxt(opts) {
    return (0, codegen_1._) `{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? (0, codegen_1._) `, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
}
function destructureValCxtES5(gen, opts) {
    gen.if(names_1.default.valCxt, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.instancePath}`);
        gen.var(names_1.default.parentData, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.parentData}`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.parentDataProperty}`);
        gen.var(names_1.default.rootData, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.rootData}`);
        if (opts.dynamicRef)
            gen.var(names_1.default.dynamicAnchors, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
    }, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._) `""`);
        gen.var(names_1.default.parentData, (0, codegen_1._) `undefined`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._) `undefined`);
        gen.var(names_1.default.rootData, names_1.default.data);
        if (opts.dynamicRef)
            gen.var(names_1.default.dynamicAnchors, (0, codegen_1._) `{}`);
    });
}
function topSchemaObjCode(it) {
    const { schema, opts, gen } = it;
    validateFunction(it, () => {
        if (opts.$comment && schema.$comment)
            commentKeyword(it);
        checkNoDefault(it);
        gen.let(names_1.default.vErrors, null);
        gen.let(names_1.default.errors, 0);
        if (opts.unevaluated)
            resetEvaluated(it);
        typeAndKeywords(it);
        returnResults(it);
    });
    return;
}
function resetEvaluated(it) {
    // TODO maybe some hook to execute it in the end to check whether props/items are Name, as in assignEvaluated
    const { gen, validateName } = it;
    it.evaluated = gen.const("evaluated", (0, codegen_1._) `${validateName}.evaluated`);
    gen.if((0, codegen_1._) `${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1._) `${it.evaluated}.props`, (0, codegen_1._) `undefined`));
    gen.if((0, codegen_1._) `${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1._) `${it.evaluated}.items`, (0, codegen_1._) `undefined`));
}
function funcSourceUrl(schema, opts) {
    const schId = typeof schema == "object" && schema[opts.schemaId];
    return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._) `/*# sourceURL=${schId} */` : codegen_1.nil;
}
// schema compilation - this function is used recursively to generate code for sub-schemas
function subschemaCode(it, valid) {
    if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
            subSchemaObjCode(it, valid);
            return;
        }
    }
    (0, boolSchema_1.boolOrEmptySchema)(it, valid);
}
function schemaCxtHasRules({ schema, self }) {
    if (typeof schema == "boolean")
        return !schema;
    for (const key in schema)
        if (self.RULES.all[key])
            return true;
    return false;
}
function isSchemaObj(it) {
    return typeof it.schema != "boolean";
}
function subSchemaObjCode(it, valid) {
    const { schema, gen, opts } = it;
    if (opts.$comment && schema.$comment)
        commentKeyword(it);
    updateContext(it);
    checkAsyncSchema(it);
    const errsCount = gen.const("_errs", names_1.default.errors);
    typeAndKeywords(it, errsCount);
    // TODO var
    gen.var(valid, (0, codegen_1._) `${errsCount} === ${names_1.default.errors}`);
}
function checkKeywords(it) {
    (0, util_1.checkUnknownRules)(it);
    checkRefsAndKeywords(it);
}
function typeAndKeywords(it, errsCount) {
    if (it.opts.jtd)
        return schemaKeywords(it, [], false, errsCount);
    const types = (0, dataType_1.getSchemaTypes)(it.schema);
    const checkedTypes = (0, dataType_1.coerceAndCheckDataType)(it, types);
    schemaKeywords(it, types, !checkedTypes, errsCount);
}
function checkRefsAndKeywords(it) {
    const { schema, errSchemaPath, opts, self } = it;
    if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema, self.RULES)) {
        self.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
    }
}
function checkNoDefault(it) {
    const { schema, opts } = it;
    if (schema.default !== undefined && opts.useDefaults && opts.strictSchema) {
        (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
    }
}
function updateContext(it) {
    const schId = it.schema[it.opts.schemaId];
    if (schId)
        it.baseId = (0, resolve_1.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
}
function checkAsyncSchema(it) {
    if (it.schema.$async && !it.schemaEnv.$async)
        throw new Error("async schema in sync schema");
}
function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
    const msg = schema.$comment;
    if (opts.$comment === true) {
        gen.code((0, codegen_1._) `${names_1.default.self}.logger.log(${msg})`);
    }
    else if (typeof opts.$comment == "function") {
        const schemaPath = (0, codegen_1.str) `${errSchemaPath}/$comment`;
        const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
        gen.code((0, codegen_1._) `${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
    }
}
function returnResults(it) {
    const { gen, schemaEnv, validateName, ValidationError, opts } = it;
    if (schemaEnv.$async) {
        // TODO assign unevaluated
        gen.if((0, codegen_1._) `${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw((0, codegen_1._) `new ${ValidationError}(${names_1.default.vErrors})`));
    }
    else {
        gen.assign((0, codegen_1._) `${validateName}.errors`, names_1.default.vErrors);
        if (opts.unevaluated)
            assignEvaluated(it);
        gen.return((0, codegen_1._) `${names_1.default.errors} === 0`);
    }
}
function assignEvaluated({ gen, evaluated, props, items }) {
    if (props instanceof codegen_1.Name)
        gen.assign((0, codegen_1._) `${evaluated}.props`, props);
    if (items instanceof codegen_1.Name)
        gen.assign((0, codegen_1._) `${evaluated}.items`, items);
}
function schemaKeywords(it, types, typeErrors, errsCount) {
    const { gen, schema, data, allErrors, opts, self } = it;
    const { RULES } = self;
    if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema, RULES))) {
        gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition)); // TODO typecast
        return;
    }
    if (!opts.jtd)
        checkStrictTypes(it, types);
    gen.block(() => {
        for (const group of RULES.rules)
            groupKeywords(group);
        groupKeywords(RULES.post);
    });
    function groupKeywords(group) {
        if (!(0, applicability_1.shouldUseGroup)(schema, group))
            return;
        if (group.type) {
            gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
            iterateKeywords(it, group);
            if (types.length === 1 && types[0] === group.type && typeErrors) {
                gen.else();
                (0, dataType_2.reportTypeError)(it);
            }
            gen.endIf();
        }
        else {
            iterateKeywords(it, group);
        }
        // TODO make it "ok" call?
        if (!allErrors)
            gen.if((0, codegen_1._) `${names_1.default.errors} === ${errsCount || 0}`);
    }
}
function iterateKeywords(it, group) {
    const { gen, schema, opts: { useDefaults }, } = it;
    if (useDefaults)
        (0, defaults_1.assignDefaults)(it, group.type);
    gen.block(() => {
        for (const rule of group.rules) {
            if ((0, applicability_1.shouldUseRule)(schema, rule)) {
                keywordCode(it, rule.keyword, rule.definition, group.type);
            }
        }
    });
}
function checkStrictTypes(it, types) {
    if (it.schemaEnv.meta || !it.opts.strictTypes)
        return;
    checkContextTypes(it, types);
    if (!it.opts.allowUnionTypes)
        checkMultipleTypes(it, types);
    checkKeywordTypes(it, it.dataTypes);
}
function checkContextTypes(it, types) {
    if (!types.length)
        return;
    if (!it.dataTypes.length) {
        it.dataTypes = types;
        return;
    }
    types.forEach((t) => {
        if (!includesType(it.dataTypes, t)) {
            strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
        }
    });
    narrowSchemaTypes(it, types);
}
function checkMultipleTypes(it, ts) {
    if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
        strictTypesError(it, "use allowUnionTypes to allow union type keyword");
    }
}
function checkKeywordTypes(it, ts) {
    const rules = it.self.RULES.all;
    for (const keyword in rules) {
        const rule = rules[keyword];
        if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
            const { type } = rule.definition;
            if (type.length && !type.some((t) => hasApplicableType(ts, t))) {
                strictTypesError(it, `missing type "${type.join(",")}" for keyword "${keyword}"`);
            }
        }
    }
}
function hasApplicableType(schTs, kwdT) {
    return schTs.includes(kwdT) || (kwdT === "number" && schTs.includes("integer"));
}
function includesType(ts, t) {
    return ts.includes(t) || (t === "integer" && ts.includes("number"));
}
function narrowSchemaTypes(it, withTypes) {
    const ts = [];
    for (const t of it.dataTypes) {
        if (includesType(withTypes, t))
            ts.push(t);
        else if (withTypes.includes("integer") && t === "number")
            ts.push("integer");
    }
    it.dataTypes = ts;
}
function strictTypesError(it, msg) {
    const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
    msg += ` at "${schemaPath}" (strictTypes)`;
    (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
}
class KeywordCxt {
    constructor(it, def, keyword) {
        (0, keyword_1.validateKeywordUsage)(it, def, keyword);
        this.gen = it.gen;
        this.allErrors = it.allErrors;
        this.keyword = keyword;
        this.data = it.data;
        this.schema = it.schema[keyword];
        this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
        this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword, this.$data);
        this.schemaType = def.schemaType;
        this.parentSchema = it.schema;
        this.params = {};
        this.it = it;
        this.def = def;
        if (this.$data) {
            this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
        }
        else {
            this.schemaCode = this.schemaValue;
            if (!(0, keyword_1.validSchemaType)(this.schema, def.schemaType, def.allowUndefined)) {
                throw new Error(`${keyword} value must be ${JSON.stringify(def.schemaType)}`);
            }
        }
        if ("code" in def ? def.trackErrors : def.errors !== false) {
            this.errsCount = it.gen.const("_errs", names_1.default.errors);
        }
    }
    result(condition, successAction, failAction) {
        this.failResult((0, codegen_1.not)(condition), successAction, failAction);
    }
    failResult(condition, successAction, failAction) {
        this.gen.if(condition);
        if (failAction)
            failAction();
        else
            this.error();
        if (successAction) {
            this.gen.else();
            successAction();
            if (this.allErrors)
                this.gen.endIf();
        }
        else {
            if (this.allErrors)
                this.gen.endIf();
            else
                this.gen.else();
        }
    }
    pass(condition, failAction) {
        this.failResult((0, codegen_1.not)(condition), undefined, failAction);
    }
    fail(condition) {
        if (condition === undefined) {
            this.error();
            if (!this.allErrors)
                this.gen.if(false); // this branch will be removed by gen.optimize
            return;
        }
        this.gen.if(condition);
        this.error();
        if (this.allErrors)
            this.gen.endIf();
        else
            this.gen.else();
    }
    fail$data(condition) {
        if (!this.$data)
            return this.fail(condition);
        const { schemaCode } = this;
        this.fail((0, codegen_1._) `${schemaCode} !== undefined && (${(0, codegen_1.or)(this.invalid$data(), condition)})`);
    }
    error(append, errorParams, errorPaths) {
        if (errorParams) {
            this.setParams(errorParams);
            this._error(append, errorPaths);
            this.setParams({});
            return;
        }
        this._error(append, errorPaths);
    }
    _error(append, errorPaths) {
        ;
        (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
    }
    $dataError() {
        (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
    }
    reset() {
        if (this.errsCount === undefined)
            throw new Error('add "trackErrors" to keyword definition');
        (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(cond) {
        if (!this.allErrors)
            this.gen.if(cond);
    }
    setParams(obj, assign) {
        if (assign)
            Object.assign(this.params, obj);
        else
            this.params = obj;
    }
    block$data(valid, codeBlock, $dataValid = codegen_1.nil) {
        this.gen.block(() => {
            this.check$data(valid, $dataValid);
            codeBlock();
        });
    }
    check$data(valid = codegen_1.nil, $dataValid = codegen_1.nil) {
        if (!this.$data)
            return;
        const { gen, schemaCode, schemaType, def } = this;
        gen.if((0, codegen_1.or)((0, codegen_1._) `${schemaCode} === undefined`, $dataValid));
        if (valid !== codegen_1.nil)
            gen.assign(valid, true);
        if (schemaType.length || def.validateSchema) {
            gen.elseIf(this.invalid$data());
            this.$dataError();
            if (valid !== codegen_1.nil)
                gen.assign(valid, false);
        }
        gen.else();
    }
    invalid$data() {
        const { gen, schemaCode, schemaType, def, it } = this;
        return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
        function wrong$DataType() {
            if (schemaType.length) {
                /* istanbul ignore if */
                if (!(schemaCode instanceof codegen_1.Name))
                    throw new Error("ajv implementation error");
                const st = Array.isArray(schemaType) ? schemaType : [schemaType];
                return (0, codegen_1._) `${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
            }
            return codegen_1.nil;
        }
        function invalid$DataSchema() {
            if (def.validateSchema) {
                const validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema }); // TODO value.code for standalone
                return (0, codegen_1._) `!${validateSchemaRef}(${schemaCode})`;
            }
            return codegen_1.nil;
        }
    }
    subschema(appl, valid) {
        const subschema = (0, subschema_1.getSubschema)(this.it, appl);
        (0, subschema_1.extendSubschemaData)(subschema, this.it, appl);
        (0, subschema_1.extendSubschemaMode)(subschema, appl);
        const nextContext = { ...this.it, ...subschema, items: undefined, props: undefined };
        subschemaCode(nextContext, valid);
        return nextContext;
    }
    mergeEvaluated(schemaCxt, toName) {
        const { it, gen } = this;
        if (!it.opts.unevaluated)
            return;
        if (it.props !== true && schemaCxt.props !== undefined) {
            it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
        }
        if (it.items !== true && schemaCxt.items !== undefined) {
            it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
        }
    }
    mergeValidEvaluated(schemaCxt, valid) {
        const { it, gen } = this;
        if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
            gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1.Name));
            return true;
        }
    }
}
exports.KeywordCxt = KeywordCxt;
function keywordCode(it, keyword, def, ruleType) {
    const cxt = new KeywordCxt(it, def, keyword);
    if ("code" in def) {
        def.code(cxt, ruleType);
    }
    else if (cxt.$data && def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
    }
    else if ("macro" in def) {
        (0, keyword_1.macroKeywordCode)(cxt, def);
    }
    else if (def.compile || def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
    }
}
const JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
const RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function getData($data, { dataLevel, dataNames, dataPathArr }) {
    let jsonPointer;
    let data;
    if ($data === "")
        return names_1.default.rootData;
    if ($data[0] === "/") {
        if (!JSON_POINTER.test($data))
            throw new Error(`Invalid JSON-pointer: ${$data}`);
        jsonPointer = $data;
        data = names_1.default.rootData;
    }
    else {
        const matches = RELATIVE_JSON_POINTER.exec($data);
        if (!matches)
            throw new Error(`Invalid JSON-pointer: ${$data}`);
        const up = +matches[1];
        jsonPointer = matches[2];
        if (jsonPointer === "#") {
            if (up >= dataLevel)
                throw new Error(errorMsg("property/index", up));
            return dataPathArr[dataLevel - up];
        }
        if (up > dataLevel)
            throw new Error(errorMsg("data", up));
        data = dataNames[dataLevel - up];
        if (!jsonPointer)
            return data;
    }
    let expr = data;
    const segments = jsonPointer.split("/");
    for (const segment of segments) {
        if (segment) {
            data = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment))}`;
            expr = (0, codegen_1._) `${expr} && ${data}`;
        }
    }
    return expr;
    function errorMsg(pointerType, up) {
        return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
    }
}
exports.getData = getData;

},{"../codegen":5,"../errors":7,"../names":9,"../resolve":11,"../util":13,"./applicability":14,"./boolSchema":15,"./dataType":16,"./defaults":17,"./keyword":19,"./subschema":20}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateKeywordUsage = exports.validSchemaType = exports.funcKeywordCode = exports.macroKeywordCode = void 0;
const codegen_1 = require("../codegen");
const names_1 = require("../names");
const code_1 = require("../../vocabularies/code");
const errors_1 = require("../errors");
function macroKeywordCode(cxt, def) {
    const { gen, keyword, schema, parentSchema, it } = cxt;
    const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
    const schemaRef = useKeyword(gen, keyword, macroSchema);
    if (it.opts.validateSchema !== false)
        it.self.validateSchema(macroSchema, true);
    const valid = gen.name("valid");
    cxt.subschema({
        schema: macroSchema,
        schemaPath: codegen_1.nil,
        errSchemaPath: `${it.errSchemaPath}/${keyword}`,
        topSchemaRef: schemaRef,
        compositeRule: true,
    }, valid);
    cxt.pass(valid, () => cxt.error(true));
}
exports.macroKeywordCode = macroKeywordCode;
function funcKeywordCode(cxt, def) {
    var _a;
    const { gen, keyword, schema, parentSchema, $data, it } = cxt;
    checkAsyncKeyword(it, def);
    const validate = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
    const validateRef = useKeyword(gen, keyword, validate);
    const valid = gen.let("valid");
    cxt.block$data(valid, validateKeyword);
    cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid);
    function validateKeyword() {
        if (def.errors === false) {
            assignValid();
            if (def.modifying)
                modifyData(cxt);
            reportErrs(() => cxt.error());
        }
        else {
            const ruleErrs = def.async ? validateAsync() : validateSync();
            if (def.modifying)
                modifyData(cxt);
            reportErrs(() => addErrs(cxt, ruleErrs));
        }
    }
    function validateAsync() {
        const ruleErrs = gen.let("ruleErrs", null);
        gen.try(() => assignValid((0, codegen_1._) `await `), (e) => gen.assign(valid, false).if((0, codegen_1._) `${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1._) `${e}.errors`), () => gen.throw(e)));
        return ruleErrs;
    }
    function validateSync() {
        const validateErrs = (0, codegen_1._) `${validateRef}.errors`;
        gen.assign(validateErrs, null);
        assignValid(codegen_1.nil);
        return validateErrs;
    }
    function assignValid(_await = def.async ? (0, codegen_1._) `await ` : codegen_1.nil) {
        const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
        const passSchema = !(("compile" in def && !$data) || def.schema === false);
        gen.assign(valid, (0, codegen_1._) `${_await}${(0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
    }
    function reportErrs(errors) {
        var _a;
        gen.if((0, codegen_1.not)((_a = def.valid) !== null && _a !== void 0 ? _a : valid), errors);
    }
}
exports.funcKeywordCode = funcKeywordCode;
function modifyData(cxt) {
    const { gen, data, it } = cxt;
    gen.if(it.parentData, () => gen.assign(data, (0, codegen_1._) `${it.parentData}[${it.parentDataProperty}]`));
}
function addErrs(cxt, errs) {
    const { gen } = cxt;
    gen.if((0, codegen_1._) `Array.isArray(${errs})`, () => {
        gen
            .assign(names_1.default.vErrors, (0, codegen_1._) `${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`)
            .assign(names_1.default.errors, (0, codegen_1._) `${names_1.default.vErrors}.length`);
        (0, errors_1.extendErrors)(cxt);
    }, () => cxt.error());
}
function checkAsyncKeyword({ schemaEnv }, def) {
    if (def.async && !schemaEnv.$async)
        throw new Error("async keyword in sync schema");
}
function useKeyword(gen, keyword, result) {
    if (result === undefined)
        throw new Error(`keyword "${keyword}" failed to compile`);
    return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1.stringify)(result) });
}
function validSchemaType(schema, schemaType, allowUndefined = false) {
    // TODO add tests
    return (!schemaType.length ||
        schemaType.some((st) => st === "array"
            ? Array.isArray(schema)
            : st === "object"
                ? schema && typeof schema == "object" && !Array.isArray(schema)
                : typeof schema == st || (allowUndefined && typeof schema == "undefined")));
}
exports.validSchemaType = validSchemaType;
function validateKeywordUsage({ schema, opts, self, errSchemaPath }, def, keyword) {
    /* istanbul ignore if */
    if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) {
        throw new Error("ajv implementation error");
    }
    const deps = def.dependencies;
    if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
        throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
    }
    if (def.validateSchema) {
        const valid = def.validateSchema(schema[keyword]);
        if (!valid) {
            const msg = `keyword "${keyword}" value is invalid at path "${errSchemaPath}": ` +
                self.errorsText(def.validateSchema.errors);
            if (opts.validateSchema === "log")
                self.logger.error(msg);
            else
                throw new Error(msg);
        }
    }
}
exports.validateKeywordUsage = validateKeywordUsage;

},{"../../vocabularies/code":53,"../codegen":5,"../errors":7,"../names":9}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendSubschemaMode = exports.extendSubschemaData = exports.getSubschema = void 0;
const codegen_1 = require("../codegen");
const util_1 = require("../util");
function getSubschema(it, { keyword, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
    if (keyword !== undefined && schema !== undefined) {
        throw new Error('both "keyword" and "schema" passed, only one allowed');
    }
    if (keyword !== undefined) {
        const sch = it.schema[keyword];
        return schemaProp === undefined
            ? {
                schema: sch,
                schemaPath: (0, codegen_1._) `${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}`,
                errSchemaPath: `${it.errSchemaPath}/${keyword}`,
            }
            : {
                schema: sch[schemaProp],
                schemaPath: (0, codegen_1._) `${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}${(0, codegen_1.getProperty)(schemaProp)}`,
                errSchemaPath: `${it.errSchemaPath}/${keyword}/${(0, util_1.escapeFragment)(schemaProp)}`,
            };
    }
    if (schema !== undefined) {
        if (schemaPath === undefined || errSchemaPath === undefined || topSchemaRef === undefined) {
            throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
        }
        return {
            schema,
            schemaPath,
            topSchemaRef,
            errSchemaPath,
        };
    }
    throw new Error('either "keyword" or "schema" must be passed');
}
exports.getSubschema = getSubschema;
function extendSubschemaData(subschema, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
    if (data !== undefined && dataProp !== undefined) {
        throw new Error('both "data" and "dataProp" passed, only one allowed');
    }
    const { gen } = it;
    if (dataProp !== undefined) {
        const { errorPath, dataPathArr, opts } = it;
        const nextData = gen.let("data", (0, codegen_1._) `${it.data}${(0, codegen_1.getProperty)(dataProp)}`, true);
        dataContextProps(nextData);
        subschema.errorPath = (0, codegen_1.str) `${errorPath}${(0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
        subschema.parentDataProperty = (0, codegen_1._) `${dataProp}`;
        subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
    }
    if (data !== undefined) {
        const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true); // replaceable if used once?
        dataContextProps(nextData);
        if (propertyName !== undefined)
            subschema.propertyName = propertyName;
        // TODO something is possibly wrong here with not changing parentDataProperty and not appending dataPathArr
    }
    if (dataTypes)
        subschema.dataTypes = dataTypes;
    function dataContextProps(_nextData) {
        subschema.data = _nextData;
        subschema.dataLevel = it.dataLevel + 1;
        subschema.dataTypes = [];
        it.definedProperties = new Set();
        subschema.parentData = it.data;
        subschema.dataNames = [...it.dataNames, _nextData];
    }
}
exports.extendSubschemaData = extendSubschemaData;
function extendSubschemaMode(subschema, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
    if (compositeRule !== undefined)
        subschema.compositeRule = compositeRule;
    if (createErrors !== undefined)
        subschema.createErrors = createErrors;
    if (allErrors !== undefined)
        subschema.allErrors = allErrors;
    subschema.jtdDiscriminator = jtdDiscriminator; // not inherited
    subschema.jtdMetadata = jtdMetadata; // not inherited
}
exports.extendSubschemaMode = extendSubschemaMode;

},{"../codegen":5,"../util":13}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
var validate_1 = require("./compile/validate");
Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function () { return validate_1.KeywordCxt; } });
var codegen_1 = require("./compile/codegen");
Object.defineProperty(exports, "_", { enumerable: true, get: function () { return codegen_1._; } });
Object.defineProperty(exports, "str", { enumerable: true, get: function () { return codegen_1.str; } });
Object.defineProperty(exports, "stringify", { enumerable: true, get: function () { return codegen_1.stringify; } });
Object.defineProperty(exports, "nil", { enumerable: true, get: function () { return codegen_1.nil; } });
Object.defineProperty(exports, "Name", { enumerable: true, get: function () { return codegen_1.Name; } });
Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function () { return codegen_1.CodeGen; } });
const validation_error_1 = require("./runtime/validation_error");
const ref_error_1 = require("./compile/ref_error");
const rules_1 = require("./compile/rules");
const compile_1 = require("./compile");
const codegen_2 = require("./compile/codegen");
const resolve_1 = require("./compile/resolve");
const dataType_1 = require("./compile/validate/dataType");
const util_1 = require("./compile/util");
const $dataRefSchema = require("./refs/data.json");
const uri_1 = require("./runtime/uri");
const defaultRegExp = (str, flags) => new RegExp(str, flags);
defaultRegExp.code = "new RegExp";
const META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
const EXT_SCOPE_NAMES = new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error",
]);
const removedOptions = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now.",
};
const deprecatedOptions = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.',
};
const MAX_EXPRESSION = 200;
// eslint-disable-next-line complexity
function requiredOptions(o) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
    const s = o.strict;
    const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
    const optimize = _optz === true || _optz === undefined ? 1 : _optz || 0;
    const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
    const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
    return {
        strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
        strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
        strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
        strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
        strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
        code: o.code ? { ...o.code, optimize, regExp } : { optimize, regExp },
        loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
        loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
        meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
        messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
        inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
        schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
        addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
        validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
        validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
        unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
        int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
        uriResolver: uriResolver,
    };
}
class Ajv {
    constructor(opts = {}) {
        this.schemas = {};
        this.refs = {};
        this.formats = {};
        this._compilations = new Set();
        this._loading = {};
        this._cache = new Map();
        opts = this.opts = { ...opts, ...requiredOptions(opts) };
        const { es5, lines } = this.opts.code;
        this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
        this.logger = getLogger(opts.logger);
        const formatOpt = opts.validateFormats;
        opts.validateFormats = false;
        this.RULES = (0, rules_1.getRules)();
        checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
        checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
        this._metaOpts = getMetaSchemaOptions.call(this);
        if (opts.formats)
            addInitialFormats.call(this);
        this._addVocabularies();
        this._addDefaultMetaSchema();
        if (opts.keywords)
            addInitialKeywords.call(this, opts.keywords);
        if (typeof opts.meta == "object")
            this.addMetaSchema(opts.meta);
        addInitialSchemas.call(this);
        opts.validateFormats = formatOpt;
    }
    _addVocabularies() {
        this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
        const { $data, meta, schemaId } = this.opts;
        let _dataRefSchema = $dataRefSchema;
        if (schemaId === "id") {
            _dataRefSchema = { ...$dataRefSchema };
            _dataRefSchema.id = _dataRefSchema.$id;
            delete _dataRefSchema.$id;
        }
        if (meta && $data)
            this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
    }
    defaultMeta() {
        const { meta, schemaId } = this.opts;
        return (this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : undefined);
    }
    validate(schemaKeyRef, // key, ref or schema object
    data // to be validated
    ) {
        let v;
        if (typeof schemaKeyRef == "string") {
            v = this.getSchema(schemaKeyRef);
            if (!v)
                throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
        }
        else {
            v = this.compile(schemaKeyRef);
        }
        const valid = v(data);
        if (!("$async" in v))
            this.errors = v.errors;
        return valid;
    }
    compile(schema, _meta) {
        const sch = this._addSchema(schema, _meta);
        return (sch.validate || this._compileSchemaEnv(sch));
    }
    compileAsync(schema, meta) {
        if (typeof this.opts.loadSchema != "function") {
            throw new Error("options.loadSchema should be a function");
        }
        const { loadSchema } = this.opts;
        return runCompileAsync.call(this, schema, meta);
        async function runCompileAsync(_schema, _meta) {
            await loadMetaSchema.call(this, _schema.$schema);
            const sch = this._addSchema(_schema, _meta);
            return sch.validate || _compileAsync.call(this, sch);
        }
        async function loadMetaSchema($ref) {
            if ($ref && !this.getSchema($ref)) {
                await runCompileAsync.call(this, { $ref }, true);
            }
        }
        async function _compileAsync(sch) {
            try {
                return this._compileSchemaEnv(sch);
            }
            catch (e) {
                if (!(e instanceof ref_error_1.default))
                    throw e;
                checkLoaded.call(this, e);
                await loadMissingSchema.call(this, e.missingSchema);
                return _compileAsync.call(this, sch);
            }
        }
        function checkLoaded({ missingSchema: ref, missingRef }) {
            if (this.refs[ref]) {
                throw new Error(`AnySchema ${ref} is loaded but ${missingRef} cannot be resolved`);
            }
        }
        async function loadMissingSchema(ref) {
            const _schema = await _loadSchema.call(this, ref);
            if (!this.refs[ref])
                await loadMetaSchema.call(this, _schema.$schema);
            if (!this.refs[ref])
                this.addSchema(_schema, ref, meta);
        }
        async function _loadSchema(ref) {
            const p = this._loading[ref];
            if (p)
                return p;
            try {
                return await (this._loading[ref] = loadSchema(ref));
            }
            finally {
                delete this._loading[ref];
            }
        }
    }
    // Adds schema to the instance
    addSchema(schema, // If array is passed, `key` will be ignored
    key, // Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
    _meta, // true if schema is a meta-schema. Used internally, addMetaSchema should be used instead.
    _validateSchema = this.opts.validateSchema // false to skip schema validation. Used internally, option validateSchema should be used instead.
    ) {
        if (Array.isArray(schema)) {
            for (const sch of schema)
                this.addSchema(sch, undefined, _meta, _validateSchema);
            return this;
        }
        let id;
        if (typeof schema === "object") {
            const { schemaId } = this.opts;
            id = schema[schemaId];
            if (id !== undefined && typeof id != "string") {
                throw new Error(`schema ${schemaId} must be string`);
            }
        }
        key = (0, resolve_1.normalizeId)(key || id);
        this._checkUnique(key);
        this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
        return this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(schema, key, // schema key
    _validateSchema = this.opts.validateSchema // false to skip schema validation, can be used to override validateSchema option for meta-schema
    ) {
        this.addSchema(schema, key, true, _validateSchema);
        return this;
    }
    //  Validate schema against its meta-schema
    validateSchema(schema, throwOrLogError) {
        if (typeof schema == "boolean")
            return true;
        let $schema;
        $schema = schema.$schema;
        if ($schema !== undefined && typeof $schema != "string") {
            throw new Error("$schema must be a string");
        }
        $schema = $schema || this.opts.defaultMeta || this.defaultMeta();
        if (!$schema) {
            this.logger.warn("meta-schema not available");
            this.errors = null;
            return true;
        }
        const valid = this.validate($schema, schema);
        if (!valid && throwOrLogError) {
            const message = "schema is invalid: " + this.errorsText();
            if (this.opts.validateSchema === "log")
                this.logger.error(message);
            else
                throw new Error(message);
        }
        return valid;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(keyRef) {
        let sch;
        while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
            keyRef = sch;
        if (sch === undefined) {
            const { schemaId } = this.opts;
            const root = new compile_1.SchemaEnv({ schema: {}, schemaId });
            sch = compile_1.resolveSchema.call(this, root, keyRef);
            if (!sch)
                return;
            this.refs[keyRef] = sch;
        }
        return (sch.validate || this._compileSchemaEnv(sch));
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(schemaKeyRef) {
        if (schemaKeyRef instanceof RegExp) {
            this._removeAllSchemas(this.schemas, schemaKeyRef);
            this._removeAllSchemas(this.refs, schemaKeyRef);
            return this;
        }
        switch (typeof schemaKeyRef) {
            case "undefined":
                this._removeAllSchemas(this.schemas);
                this._removeAllSchemas(this.refs);
                this._cache.clear();
                return this;
            case "string": {
                const sch = getSchEnv.call(this, schemaKeyRef);
                if (typeof sch == "object")
                    this._cache.delete(sch.schema);
                delete this.schemas[schemaKeyRef];
                delete this.refs[schemaKeyRef];
                return this;
            }
            case "object": {
                const cacheKey = schemaKeyRef;
                this._cache.delete(cacheKey);
                let id = schemaKeyRef[this.opts.schemaId];
                if (id) {
                    id = (0, resolve_1.normalizeId)(id);
                    delete this.schemas[id];
                    delete this.refs[id];
                }
                return this;
            }
            default:
                throw new Error("ajv.removeSchema: invalid parameter");
        }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(definitions) {
        for (const def of definitions)
            this.addKeyword(def);
        return this;
    }
    addKeyword(kwdOrDef, def // deprecated
    ) {
        let keyword;
        if (typeof kwdOrDef == "string") {
            keyword = kwdOrDef;
            if (typeof def == "object") {
                this.logger.warn("these parameters are deprecated, see docs for addKeyword");
                def.keyword = keyword;
            }
        }
        else if (typeof kwdOrDef == "object" && def === undefined) {
            def = kwdOrDef;
            keyword = def.keyword;
            if (Array.isArray(keyword) && !keyword.length) {
                throw new Error("addKeywords: keyword must be string or non-empty array");
            }
        }
        else {
            throw new Error("invalid addKeywords parameters");
        }
        checkKeyword.call(this, keyword, def);
        if (!def) {
            (0, util_1.eachItem)(keyword, (kwd) => addRule.call(this, kwd));
            return this;
        }
        keywordMetaschema.call(this, def);
        const definition = {
            ...def,
            type: (0, dataType_1.getJSONTypes)(def.type),
            schemaType: (0, dataType_1.getJSONTypes)(def.schemaType),
        };
        (0, util_1.eachItem)(keyword, definition.type.length === 0
            ? (k) => addRule.call(this, k, definition)
            : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
        return this;
    }
    getKeyword(keyword) {
        const rule = this.RULES.all[keyword];
        return typeof rule == "object" ? rule.definition : !!rule;
    }
    // Remove keyword
    removeKeyword(keyword) {
        // TODO return type should be Ajv
        const { RULES } = this;
        delete RULES.keywords[keyword];
        delete RULES.all[keyword];
        for (const group of RULES.rules) {
            const i = group.rules.findIndex((rule) => rule.keyword === keyword);
            if (i >= 0)
                group.rules.splice(i, 1);
        }
        return this;
    }
    // Add format
    addFormat(name, format) {
        if (typeof format == "string")
            format = new RegExp(format);
        this.formats[name] = format;
        return this;
    }
    errorsText(errors = this.errors, // optional array of validation errors
    { separator = ", ", dataVar = "data" } = {} // optional options with properties `separator` and `dataVar`
    ) {
        if (!errors || errors.length === 0)
            return "No errors";
        return errors
            .map((e) => `${dataVar}${e.instancePath} ${e.message}`)
            .reduce((text, msg) => text + separator + msg);
    }
    $dataMetaSchema(metaSchema, keywordsJsonPointers) {
        const rules = this.RULES.all;
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        for (const jsonPointer of keywordsJsonPointers) {
            const segments = jsonPointer.split("/").slice(1); // first segment is an empty string
            let keywords = metaSchema;
            for (const seg of segments)
                keywords = keywords[seg];
            for (const key in rules) {
                const rule = rules[key];
                if (typeof rule != "object")
                    continue;
                const { $data } = rule.definition;
                const schema = keywords[key];
                if ($data && schema)
                    keywords[key] = schemaOrData(schema);
            }
        }
        return metaSchema;
    }
    _removeAllSchemas(schemas, regex) {
        for (const keyRef in schemas) {
            const sch = schemas[keyRef];
            if (!regex || regex.test(keyRef)) {
                if (typeof sch == "string") {
                    delete schemas[keyRef];
                }
                else if (sch && !sch.meta) {
                    this._cache.delete(sch.schema);
                    delete schemas[keyRef];
                }
            }
        }
    }
    _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
        let id;
        const { schemaId } = this.opts;
        if (typeof schema == "object") {
            id = schema[schemaId];
        }
        else {
            if (this.opts.jtd)
                throw new Error("schema must be object");
            else if (typeof schema != "boolean")
                throw new Error("schema must be object or boolean");
        }
        let sch = this._cache.get(schema);
        if (sch !== undefined)
            return sch;
        baseId = (0, resolve_1.normalizeId)(id || baseId);
        const localRefs = resolve_1.getSchemaRefs.call(this, schema, baseId);
        sch = new compile_1.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
        this._cache.set(sch.schema, sch);
        if (addSchema && !baseId.startsWith("#")) {
            // TODO atm it is allowed to overwrite schemas without id (instead of not adding them)
            if (baseId)
                this._checkUnique(baseId);
            this.refs[baseId] = sch;
        }
        if (validateSchema)
            this.validateSchema(schema, true);
        return sch;
    }
    _checkUnique(id) {
        if (this.schemas[id] || this.refs[id]) {
            throw new Error(`schema with key or id "${id}" already exists`);
        }
    }
    _compileSchemaEnv(sch) {
        if (sch.meta)
            this._compileMetaSchema(sch);
        else
            compile_1.compileSchema.call(this, sch);
        /* istanbul ignore if */
        if (!sch.validate)
            throw new Error("ajv implementation error");
        return sch.validate;
    }
    _compileMetaSchema(sch) {
        const currentOpts = this.opts;
        this.opts = this._metaOpts;
        try {
            compile_1.compileSchema.call(this, sch);
        }
        finally {
            this.opts = currentOpts;
        }
    }
}
exports.default = Ajv;
Ajv.ValidationError = validation_error_1.default;
Ajv.MissingRefError = ref_error_1.default;
function checkOptions(checkOpts, options, msg, log = "error") {
    for (const key in checkOpts) {
        const opt = key;
        if (opt in options)
            this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
    }
}
function getSchEnv(keyRef) {
    keyRef = (0, resolve_1.normalizeId)(keyRef); // TODO tests fail without this line
    return this.schemas[keyRef] || this.refs[keyRef];
}
function addInitialSchemas() {
    const optsSchemas = this.opts.schemas;
    if (!optsSchemas)
        return;
    if (Array.isArray(optsSchemas))
        this.addSchema(optsSchemas);
    else
        for (const key in optsSchemas)
            this.addSchema(optsSchemas[key], key);
}
function addInitialFormats() {
    for (const name in this.opts.formats) {
        const format = this.opts.formats[name];
        if (format)
            this.addFormat(name, format);
    }
}
function addInitialKeywords(defs) {
    if (Array.isArray(defs)) {
        this.addVocabulary(defs);
        return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const keyword in defs) {
        const def = defs[keyword];
        if (!def.keyword)
            def.keyword = keyword;
        this.addKeyword(def);
    }
}
function getMetaSchemaOptions() {
    const metaOpts = { ...this.opts };
    for (const opt of META_IGNORE_OPTIONS)
        delete metaOpts[opt];
    return metaOpts;
}
const noLogs = { log() { }, warn() { }, error() { } };
function getLogger(logger) {
    if (logger === false)
        return noLogs;
    if (logger === undefined)
        return console;
    if (logger.log && logger.warn && logger.error)
        return logger;
    throw new Error("logger must implement log, warn and error methods");
}
const KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
function checkKeyword(keyword, def) {
    const { RULES } = this;
    (0, util_1.eachItem)(keyword, (kwd) => {
        if (RULES.keywords[kwd])
            throw new Error(`Keyword ${kwd} is already defined`);
        if (!KEYWORD_NAME.test(kwd))
            throw new Error(`Keyword ${kwd} has invalid name`);
    });
    if (!def)
        return;
    if (def.$data && !("code" in def || "validate" in def)) {
        throw new Error('$data keyword must have "code" or "validate" function');
    }
}
function addRule(keyword, definition, dataType) {
    var _a;
    const post = definition === null || definition === void 0 ? void 0 : definition.post;
    if (dataType && post)
        throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES } = this;
    let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType);
    if (!ruleGroup) {
        ruleGroup = { type: dataType, rules: [] };
        RULES.rules.push(ruleGroup);
    }
    RULES.keywords[keyword] = true;
    if (!definition)
        return;
    const rule = {
        keyword,
        definition: {
            ...definition,
            type: (0, dataType_1.getJSONTypes)(definition.type),
            schemaType: (0, dataType_1.getJSONTypes)(definition.schemaType),
        },
    };
    if (definition.before)
        addBeforeRule.call(this, ruleGroup, rule, definition.before);
    else
        ruleGroup.rules.push(rule);
    RULES.all[keyword] = rule;
    (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
}
function addBeforeRule(ruleGroup, rule, before) {
    const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
    if (i >= 0) {
        ruleGroup.rules.splice(i, 0, rule);
    }
    else {
        ruleGroup.rules.push(rule);
        this.logger.warn(`rule ${before} is not defined`);
    }
}
function keywordMetaschema(def) {
    let { metaSchema } = def;
    if (metaSchema === undefined)
        return;
    if (def.$data && this.opts.$data)
        metaSchema = schemaOrData(metaSchema);
    def.validateSchema = this.compile(metaSchema, true);
}
const $dataRef = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
};
function schemaOrData(schema) {
    return { anyOf: [schema, $dataRef] };
}

},{"./compile":8,"./compile/codegen":5,"./compile/ref_error":10,"./compile/resolve":11,"./compile/rules":12,"./compile/util":13,"./compile/validate":18,"./compile/validate/dataType":16,"./refs/data.json":22,"./runtime/uri":33,"./runtime/validation_error":34}],22:[function(require,module,exports){
module.exports={
  "$id": "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
  "description": "Meta-schema for $data reference (JSON AnySchema extension proposal)",
  "type": "object",
  "required": ["$data"],
  "properties": {
    "$data": {
      "type": "string",
      "anyOf": [{"format": "relative-json-pointer"}, {"format": "json-pointer"}]
    }
  },
  "additionalProperties": false
}

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metaSchema = require("./schema.json");
const applicator = require("./meta/applicator.json");
const content = require("./meta/content.json");
const core = require("./meta/core.json");
const format = require("./meta/format.json");
const metadata = require("./meta/meta-data.json");
const validation = require("./meta/validation.json");
const META_SUPPORT_DATA = ["/properties"];
function addMetaSchema2019($data) {
    ;
    [
        metaSchema,
        applicator,
        content,
        core,
        with$data(this, format),
        metadata,
        with$data(this, validation),
    ].forEach((sch) => this.addMetaSchema(sch, undefined, false));
    return this;
    function with$data(ajv, sch) {
        return $data ? ajv.$dataMetaSchema(sch, META_SUPPORT_DATA) : sch;
    }
}
exports.default = addMetaSchema2019;

},{"./meta/applicator.json":24,"./meta/content.json":25,"./meta/core.json":26,"./meta/format.json":27,"./meta/meta-data.json":28,"./meta/validation.json":29,"./schema.json":30}],24:[function(require,module,exports){
module.exports={
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "$id": "https://json-schema.org/draft/2019-09/meta/applicator",
  "$vocabulary": {
    "https://json-schema.org/draft/2019-09/vocab/applicator": true
  },
  "$recursiveAnchor": true,

  "title": "Applicator vocabulary meta-schema",
  "type": ["object", "boolean"],
  "properties": {
    "additionalItems": {"$recursiveRef": "#"},
    "unevaluatedItems": {"$recursiveRef": "#"},
    "items": {
      "anyOf": [{"$recursiveRef": "#"}, {"$ref": "#/$defs/schemaArray"}]
    },
    "contains": {"$recursiveRef": "#"},
    "additionalProperties": {"$recursiveRef": "#"},
    "unevaluatedProperties": {"$recursiveRef": "#"},
    "properties": {
      "type": "object",
      "additionalProperties": {"$recursiveRef": "#"},
      "default": {}
    },
    "patternProperties": {
      "type": "object",
      "additionalProperties": {"$recursiveRef": "#"},
      "propertyNames": {"format": "regex"},
      "default": {}
    },
    "dependentSchemas": {
      "type": "object",
      "additionalProperties": {
        "$recursiveRef": "#"
      }
    },
    "propertyNames": {"$recursiveRef": "#"},
    "if": {"$recursiveRef": "#"},
    "then": {"$recursiveRef": "#"},
    "else": {"$recursiveRef": "#"},
    "allOf": {"$ref": "#/$defs/schemaArray"},
    "anyOf": {"$ref": "#/$defs/schemaArray"},
    "oneOf": {"$ref": "#/$defs/schemaArray"},
    "not": {"$recursiveRef": "#"}
  },
  "$defs": {
    "schemaArray": {
      "type": "array",
      "minItems": 1,
      "items": {"$recursiveRef": "#"}
    }
  }
}

},{}],25:[function(require,module,exports){
module.exports={
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "$id": "https://json-schema.org/draft/2019-09/meta/content",
  "$vocabulary": {
    "https://json-schema.org/draft/2019-09/vocab/content": true
  },
  "$recursiveAnchor": true,

  "title": "Content vocabulary meta-schema",

  "type": ["object", "boolean"],
  "properties": {
    "contentMediaType": {"type": "string"},
    "contentEncoding": {"type": "string"},
    "contentSchema": {"$recursiveRef": "#"}
  }
}

},{}],26:[function(require,module,exports){
module.exports={
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "$id": "https://json-schema.org/draft/2019-09/meta/core",
  "$vocabulary": {
    "https://json-schema.org/draft/2019-09/vocab/core": true
  },
  "$recursiveAnchor": true,

  "title": "Core vocabulary meta-schema",
  "type": ["object", "boolean"],
  "properties": {
    "$id": {
      "type": "string",
      "format": "uri-reference",
      "$comment": "Non-empty fragments not allowed.",
      "pattern": "^[^#]*#?$"
    },
    "$schema": {
      "type": "string",
      "format": "uri"
    },
    "$anchor": {
      "type": "string",
      "pattern": "^[A-Za-z][-A-Za-z0-9.:_]*$"
    },
    "$ref": {
      "type": "string",
      "format": "uri-reference"
    },
    "$recursiveRef": {
      "type": "string",
      "format": "uri-reference"
    },
    "$recursiveAnchor": {
      "type": "boolean",
      "default": false
    },
    "$vocabulary": {
      "type": "object",
      "propertyNames": {
        "type": "string",
        "format": "uri"
      },
      "additionalProperties": {
        "type": "boolean"
      }
    },
    "$comment": {
      "type": "string"
    },
    "$defs": {
      "type": "object",
      "additionalProperties": {"$recursiveRef": "#"},
      "default": {}
    }
  }
}

},{}],27:[function(require,module,exports){
module.exports={
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "$id": "https://json-schema.org/draft/2019-09/meta/format",
  "$vocabulary": {
    "https://json-schema.org/draft/2019-09/vocab/format": true
  },
  "$recursiveAnchor": true,

  "title": "Format vocabulary meta-schema",
  "type": ["object", "boolean"],
  "properties": {
    "format": {"type": "string"}
  }
}

},{}],28:[function(require,module,exports){
module.exports={
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "$id": "https://json-schema.org/draft/2019-09/meta/meta-data",
  "$vocabulary": {
    "https://json-schema.org/draft/2019-09/vocab/meta-data": true
  },
  "$recursiveAnchor": true,

  "title": "Meta-data vocabulary meta-schema",

  "type": ["object", "boolean"],
  "properties": {
    "title": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "default": true,
    "deprecated": {
      "type": "boolean",
      "default": false
    },
    "readOnly": {
      "type": "boolean",
      "default": false
    },
    "writeOnly": {
      "type": "boolean",
      "default": false
    },
    "examples": {
      "type": "array",
      "items": true
    }
  }
}

},{}],29:[function(require,module,exports){
module.exports={
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "$id": "https://json-schema.org/draft/2019-09/meta/validation",
  "$vocabulary": {
    "https://json-schema.org/draft/2019-09/vocab/validation": true
  },
  "$recursiveAnchor": true,

  "title": "Validation vocabulary meta-schema",
  "type": ["object", "boolean"],
  "properties": {
    "multipleOf": {
      "type": "number",
      "exclusiveMinimum": 0
    },
    "maximum": {
      "type": "number"
    },
    "exclusiveMaximum": {
      "type": "number"
    },
    "minimum": {
      "type": "number"
    },
    "exclusiveMinimum": {
      "type": "number"
    },
    "maxLength": {"$ref": "#/$defs/nonNegativeInteger"},
    "minLength": {"$ref": "#/$defs/nonNegativeIntegerDefault0"},
    "pattern": {
      "type": "string",
      "format": "regex"
    },
    "maxItems": {"$ref": "#/$defs/nonNegativeInteger"},
    "minItems": {"$ref": "#/$defs/nonNegativeIntegerDefault0"},
    "uniqueItems": {
      "type": "boolean",
      "default": false
    },
    "maxContains": {"$ref": "#/$defs/nonNegativeInteger"},
    "minContains": {
      "$ref": "#/$defs/nonNegativeInteger",
      "default": 1
    },
    "maxProperties": {"$ref": "#/$defs/nonNegativeInteger"},
    "minProperties": {"$ref": "#/$defs/nonNegativeIntegerDefault0"},
    "required": {"$ref": "#/$defs/stringArray"},
    "dependentRequired": {
      "type": "object",
      "additionalProperties": {
        "$ref": "#/$defs/stringArray"
      }
    },
    "const": true,
    "enum": {
      "type": "array",
      "items": true
    },
    "type": {
      "anyOf": [
        {"$ref": "#/$defs/simpleTypes"},
        {
          "type": "array",
          "items": {"$ref": "#/$defs/simpleTypes"},
          "minItems": 1,
          "uniqueItems": true
        }
      ]
    }
  },
  "$defs": {
    "nonNegativeInteger": {
      "type": "integer",
      "minimum": 0
    },
    "nonNegativeIntegerDefault0": {
      "$ref": "#/$defs/nonNegativeInteger",
      "default": 0
    },
    "simpleTypes": {
      "enum": ["array", "boolean", "integer", "null", "number", "object", "string"]
    },
    "stringArray": {
      "type": "array",
      "items": {"type": "string"},
      "uniqueItems": true,
      "default": []
    }
  }
}

},{}],30:[function(require,module,exports){
module.exports={
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "$id": "https://json-schema.org/draft/2019-09/schema",
  "$vocabulary": {
    "https://json-schema.org/draft/2019-09/vocab/core": true,
    "https://json-schema.org/draft/2019-09/vocab/applicator": true,
    "https://json-schema.org/draft/2019-09/vocab/validation": true,
    "https://json-schema.org/draft/2019-09/vocab/meta-data": true,
    "https://json-schema.org/draft/2019-09/vocab/format": false,
    "https://json-schema.org/draft/2019-09/vocab/content": true
  },
  "$recursiveAnchor": true,

  "title": "Core and Validation specifications meta-schema",
  "allOf": [
    {"$ref": "meta/core"},
    {"$ref": "meta/applicator"},
    {"$ref": "meta/validation"},
    {"$ref": "meta/meta-data"},
    {"$ref": "meta/format"},
    {"$ref": "meta/content"}
  ],
  "type": ["object", "boolean"],
  "properties": {
    "definitions": {
      "$comment": "While no longer an official keyword as it is replaced by $defs, this keyword is retained in the meta-schema to prevent incompatible extensions as it remains in common use.",
      "type": "object",
      "additionalProperties": {"$recursiveRef": "#"},
      "default": {}
    },
    "dependencies": {
      "$comment": "\"dependencies\" is no longer a keyword, but schema authors should avoid redefining it to facilitate a smooth transition to \"dependentSchemas\" and \"dependentRequired\"",
      "type": "object",
      "additionalProperties": {
        "anyOf": [{"$recursiveRef": "#"}, {"$ref": "meta/validation#/$defs/stringArray"}]
      }
    }
  }
}

},{}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/ajv-validator/ajv/issues/889
const equal = require("fast-deep-equal");
equal.code = 'require("ajv/dist/runtime/equal").default';
exports.default = equal;

},{"fast-deep-equal":85}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://mathiasbynens.be/notes/javascript-encoding
// https://github.com/bestiejs/punycode.js - punycode.ucs2.decode
function ucs2length(str) {
    const len = str.length;
    let length = 0;
    let pos = 0;
    let value;
    while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 0xd800 && value <= 0xdbff && pos < len) {
            // high surrogate, and there is a next character
            value = str.charCodeAt(pos);
            if ((value & 0xfc00) === 0xdc00)
                pos++; // low surrogate
        }
    }
    return length;
}
exports.default = ucs2length;
ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';

},{}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uri = require("uri-js");
uri.code = 'require("ajv/dist/runtime/uri").default';
exports.default = uri;

},{"uri-js":87}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationError extends Error {
    constructor(errors) {
        super("validation failed");
        this.errors = errors;
        this.ajv = this.validation = true;
    }
}
exports.default = ValidationError;

},{}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAdditionalItems = void 0;
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const error = {
    message: ({ params: { len } }) => (0, codegen_1.str) `must NOT have more than ${len} items`,
    params: ({ params: { len } }) => (0, codegen_1._) `{limit: ${len}}`,
};
const def = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error,
    code(cxt) {
        const { parentSchema, it } = cxt;
        const { items } = parentSchema;
        if (!Array.isArray(items)) {
            (0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
            return;
        }
        validateAdditionalItems(cxt, items);
    },
};
function validateAdditionalItems(cxt, items) {
    const { gen, schema, data, keyword, it } = cxt;
    it.items = true;
    const len = gen.const("len", (0, codegen_1._) `${data}.length`);
    if (schema === false) {
        cxt.setParams({ len: items.length });
        cxt.pass((0, codegen_1._) `${len} <= ${items.length}`);
    }
    else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
        const valid = gen.var("valid", (0, codegen_1._) `${len} <= ${items.length}`); // TODO var
        gen.if((0, codegen_1.not)(valid), () => validateItems(valid));
        cxt.ok(valid);
    }
    function validateItems(valid) {
        gen.forRange("i", items.length, len, (i) => {
            cxt.subschema({ keyword, dataProp: i, dataPropType: util_1.Type.Num }, valid);
            if (!it.allErrors)
                gen.if((0, codegen_1.not)(valid), () => gen.break());
        });
    }
}
exports.validateAdditionalItems = validateAdditionalItems;
exports.default = def;

},{"../../compile/codegen":5,"../../compile/util":13}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const code_1 = require("../code");
const codegen_1 = require("../../compile/codegen");
const names_1 = require("../../compile/names");
const util_1 = require("../../compile/util");
const error = {
    message: "must NOT have additional properties",
    params: ({ params }) => (0, codegen_1._) `{additionalProperty: ${params.additionalProperty}}`,
};
const def = {
    keyword: "additionalProperties",
    type: ["object"],
    schemaType: ["boolean", "object"],
    allowUndefined: true,
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, parentSchema, data, errsCount, it } = cxt;
        /* istanbul ignore if */
        if (!errsCount)
            throw new Error("ajv implementation error");
        const { allErrors, opts } = it;
        it.props = true;
        if (opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema))
            return;
        const props = (0, code_1.allSchemaProperties)(parentSchema.properties);
        const patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
        checkAdditionalProperties();
        cxt.ok((0, codegen_1._) `${errsCount} === ${names_1.default.errors}`);
        function checkAdditionalProperties() {
            gen.forIn("key", data, (key) => {
                if (!props.length && !patProps.length)
                    additionalPropertyCode(key);
                else
                    gen.if(isAdditional(key), () => additionalPropertyCode(key));
            });
        }
        function isAdditional(key) {
            let definedProp;
            if (props.length > 8) {
                // TODO maybe an option instead of hard-coded 8?
                const propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
                definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key);
            }
            else if (props.length) {
                definedProp = (0, codegen_1.or)(...props.map((p) => (0, codegen_1._) `${key} === ${p}`));
            }
            else {
                definedProp = codegen_1.nil;
            }
            if (patProps.length) {
                definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p) => (0, codegen_1._) `${(0, code_1.usePattern)(cxt, p)}.test(${key})`));
            }
            return (0, codegen_1.not)(definedProp);
        }
        function deleteAdditional(key) {
            gen.code((0, codegen_1._) `delete ${data}[${key}]`);
        }
        function additionalPropertyCode(key) {
            if (opts.removeAdditional === "all" || (opts.removeAdditional && schema === false)) {
                deleteAdditional(key);
                return;
            }
            if (schema === false) {
                cxt.setParams({ additionalProperty: key });
                cxt.error();
                if (!allErrors)
                    gen.break();
                return;
            }
            if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
                const valid = gen.name("valid");
                if (opts.removeAdditional === "failing") {
                    applyAdditionalSchema(key, valid, false);
                    gen.if((0, codegen_1.not)(valid), () => {
                        cxt.reset();
                        deleteAdditional(key);
                    });
                }
                else {
                    applyAdditionalSchema(key, valid);
                    if (!allErrors)
                        gen.if((0, codegen_1.not)(valid), () => gen.break());
                }
            }
        }
        function applyAdditionalSchema(key, valid, errors) {
            const subschema = {
                keyword: "additionalProperties",
                dataProp: key,
                dataPropType: util_1.Type.Str,
            };
            if (errors === false) {
                Object.assign(subschema, {
                    compositeRule: true,
                    createErrors: false,
                    allErrors: false,
                });
            }
            cxt.subschema(subschema, valid);
        }
    },
};
exports.default = def;

},{"../../compile/codegen":5,"../../compile/names":9,"../../compile/util":13,"../code":53}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../compile/util");
const def = {
    keyword: "allOf",
    schemaType: "array",
    code(cxt) {
        const { gen, schema, it } = cxt;
        /* istanbul ignore if */
        if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
        const valid = gen.name("valid");
        schema.forEach((sch, i) => {
            if ((0, util_1.alwaysValidSchema)(it, sch))
                return;
            const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid);
            cxt.ok(valid);
            cxt.mergeEvaluated(schCxt);
        });
    },
};
exports.default = def;

},{"../../compile/util":13}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const code_1 = require("../code");
const def = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: true,
    code: code_1.validateUnion,
    error: { message: "must match a schema in anyOf" },
};
exports.default = def;

},{"../code":53}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const error = {
    message: ({ params: { min, max } }) => max === undefined
        ? (0, codegen_1.str) `must contain at least ${min} valid item(s)`
        : (0, codegen_1.str) `must contain at least ${min} and no more than ${max} valid item(s)`,
    params: ({ params: { min, max } }) => max === undefined ? (0, codegen_1._) `{minContains: ${min}}` : (0, codegen_1._) `{minContains: ${min}, maxContains: ${max}}`,
};
const def = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        let min;
        let max;
        const { minContains, maxContains } = parentSchema;
        if (it.opts.next) {
            min = minContains === undefined ? 1 : minContains;
            max = maxContains;
        }
        else {
            min = 1;
        }
        const len = gen.const("len", (0, codegen_1._) `${data}.length`);
        cxt.setParams({ min, max });
        if (max === undefined && min === 0) {
            (0, util_1.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
            return;
        }
        if (max !== undefined && min > max) {
            (0, util_1.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
            cxt.fail();
            return;
        }
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
            let cond = (0, codegen_1._) `${len} >= ${min}`;
            if (max !== undefined)
                cond = (0, codegen_1._) `${cond} && ${len} <= ${max}`;
            cxt.pass(cond);
            return;
        }
        it.items = true;
        const valid = gen.name("valid");
        if (max === undefined && min === 1) {
            validateItems(valid, () => gen.if(valid, () => gen.break()));
        }
        else if (min === 0) {
            gen.let(valid, true);
            if (max !== undefined)
                gen.if((0, codegen_1._) `${data}.length > 0`, validateItemsWithCount);
        }
        else {
            gen.let(valid, false);
            validateItemsWithCount();
        }
        cxt.result(valid, () => cxt.reset());
        function validateItemsWithCount() {
            const schValid = gen.name("_valid");
            const count = gen.let("count", 0);
            validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
        }
        function validateItems(_valid, block) {
            gen.forRange("i", 0, len, (i) => {
                cxt.subschema({
                    keyword: "contains",
                    dataProp: i,
                    dataPropType: util_1.Type.Num,
                    compositeRule: true,
                }, _valid);
                block();
            });
        }
        function checkLimits(count) {
            gen.code((0, codegen_1._) `${count}++`);
            if (max === undefined) {
                gen.if((0, codegen_1._) `${count} >= ${min}`, () => gen.assign(valid, true).break());
            }
            else {
                gen.if((0, codegen_1._) `${count} > ${max}`, () => gen.assign(valid, false).break());
                if (min === 1)
                    gen.assign(valid, true);
                else
                    gen.if((0, codegen_1._) `${count} >= ${min}`, () => gen.assign(valid, true));
            }
        }
    },
};
exports.default = def;

},{"../../compile/codegen":5,"../../compile/util":13}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const code_1 = require("../code");
exports.error = {
    message: ({ params: { property, depsCount, deps } }) => {
        const property_ies = depsCount === 1 ? "property" : "properties";
        return (0, codegen_1.str) `must have ${property_ies} ${deps} when property ${property} is present`;
    },
    params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_1._) `{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`, // TODO change to reference
};
const def = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: exports.error,
    code(cxt) {
        const [propDeps, schDeps] = splitDependencies(cxt);
        validatePropertyDeps(cxt, propDeps);
        validateSchemaDeps(cxt, schDeps);
    },
};
function splitDependencies({ schema }) {
    const propertyDeps = {};
    const schemaDeps = {};
    for (const key in schema) {
        if (key === "__proto__")
            continue;
        const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
        deps[key] = schema[key];
    }
    return [propertyDeps, schemaDeps];
}
function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
    const { gen, data, it } = cxt;
    if (Object.keys(propertyDeps).length === 0)
        return;
    const missing = gen.let("missing");
    for (const prop in propertyDeps) {
        const deps = propertyDeps[prop];
        if (deps.length === 0)
            continue;
        const hasProperty = (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties);
        cxt.setParams({
            property: prop,
            depsCount: deps.length,
            deps: deps.join(", "),
        });
        if (it.allErrors) {
            gen.if(hasProperty, () => {
                for (const depProp of deps) {
                    (0, code_1.checkReportMissingProp)(cxt, depProp);
                }
            });
        }
        else {
            gen.if((0, codegen_1._) `${hasProperty} && (${(0, code_1.checkMissingProp)(cxt, deps, missing)})`);
            (0, code_1.reportMissingProp)(cxt, missing);
            gen.else();
        }
    }
}
exports.validatePropertyDeps = validatePropertyDeps;
function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
    const { gen, data, keyword, it } = cxt;
    const valid = gen.name("valid");
    for (const prop in schemaDeps) {
        if ((0, util_1.alwaysValidSchema)(it, schemaDeps[prop]))
            continue;
        gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties), () => {
            const schCxt = cxt.subschema({ keyword, schemaProp: prop }, valid);
            cxt.mergeValidEvaluated(schCxt, valid);
        }, () => gen.var(valid, true) // TODO var
        );
        cxt.ok(valid);
    }
}
exports.validateSchemaDeps = validateSchemaDeps;
exports.default = def;

},{"../../compile/codegen":5,"../../compile/util":13,"../code":53}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependencies_1 = require("./dependencies");
const def = {
    keyword: "dependentSchemas",
    type: "object",
    schemaType: "object",
    code: (cxt) => (0, dependencies_1.validateSchemaDeps)(cxt),
};
exports.default = def;

},{"./dependencies":40}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const error = {
    message: ({ params }) => (0, codegen_1.str) `must match "${params.ifClause}" schema`,
    params: ({ params }) => (0, codegen_1._) `{failingKeyword: ${params.ifClause}}`,
};
const def = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, parentSchema, it } = cxt;
        if (parentSchema.then === undefined && parentSchema.else === undefined) {
            (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
        }
        const hasThen = hasSchema(it, "then");
        const hasElse = hasSchema(it, "else");
        if (!hasThen && !hasElse)
            return;
        const valid = gen.let("valid", true);
        const schValid = gen.name("_valid");
        validateIf();
        cxt.reset();
        if (hasThen && hasElse) {
            const ifClause = gen.let("ifClause");
            cxt.setParams({ ifClause });
            gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
        }
        else if (hasThen) {
            gen.if(schValid, validateClause("then"));
        }
        else {
            gen.if((0, codegen_1.not)(schValid), validateClause("else"));
        }
        cxt.pass(valid, () => cxt.error(true));
        function validateIf() {
            const schCxt = cxt.subschema({
                keyword: "if",
                compositeRule: true,
                createErrors: false,
                allErrors: false,
            }, schValid);
            cxt.mergeEvaluated(schCxt);
        }
        function validateClause(keyword, ifClause) {
            return () => {
                const schCxt = cxt.subschema({ keyword }, schValid);
                gen.assign(valid, schValid);
                cxt.mergeValidEvaluated(schCxt, valid);
                if (ifClause)
                    gen.assign(ifClause, (0, codegen_1._) `${keyword}`);
                else
                    cxt.setParams({ ifClause: keyword });
            };
        }
    },
};
function hasSchema(it, keyword) {
    const schema = it.schema[keyword];
    return schema !== undefined && !(0, util_1.alwaysValidSchema)(it, schema);
}
exports.default = def;

},{"../../compile/codegen":5,"../../compile/util":13}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const additionalItems_1 = require("./additionalItems");
const prefixItems_1 = require("./prefixItems");
const items_1 = require("./items");
const items2020_1 = require("./items2020");
const contains_1 = require("./contains");
const dependencies_1 = require("./dependencies");
const propertyNames_1 = require("./propertyNames");
const additionalProperties_1 = require("./additionalProperties");
const properties_1 = require("./properties");
const patternProperties_1 = require("./patternProperties");
const not_1 = require("./not");
const anyOf_1 = require("./anyOf");
const oneOf_1 = require("./oneOf");
const allOf_1 = require("./allOf");
const if_1 = require("./if");
const thenElse_1 = require("./thenElse");
function getApplicator(draft2020 = false) {
    const applicator = [
        // any
        not_1.default,
        anyOf_1.default,
        oneOf_1.default,
        allOf_1.default,
        if_1.default,
        thenElse_1.default,
        // object
        propertyNames_1.default,
        additionalProperties_1.default,
        dependencies_1.default,
        properties_1.default,
        patternProperties_1.default,
    ];
    // array
    if (draft2020)
        applicator.push(prefixItems_1.default, items2020_1.default);
    else
        applicator.push(additionalItems_1.default, items_1.default);
    applicator.push(contains_1.default);
    return applicator;
}
exports.default = getApplicator;

},{"./additionalItems":35,"./additionalProperties":36,"./allOf":37,"./anyOf":38,"./contains":39,"./dependencies":40,"./if":42,"./items":44,"./items2020":45,"./not":46,"./oneOf":47,"./patternProperties":48,"./prefixItems":49,"./properties":50,"./propertyNames":51,"./thenElse":52}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTuple = void 0;
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const code_1 = require("../code");
const def = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(cxt) {
        const { schema, it } = cxt;
        if (Array.isArray(schema))
            return validateTuple(cxt, "additionalItems", schema);
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
        cxt.ok((0, code_1.validateArray)(cxt));
    },
};
function validateTuple(cxt, extraItems, schArr = cxt.schema) {
    const { gen, parentSchema, data, keyword, it } = cxt;
    checkStrictTuple(parentSchema);
    if (it.opts.unevaluated && schArr.length && it.items !== true) {
        it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items);
    }
    const valid = gen.name("valid");
    const len = gen.const("len", (0, codegen_1._) `${data}.length`);
    schArr.forEach((sch, i) => {
        if ((0, util_1.alwaysValidSchema)(it, sch))
            return;
        gen.if((0, codegen_1._) `${len} > ${i}`, () => cxt.subschema({
            keyword,
            schemaProp: i,
            dataProp: i,
        }, valid));
        cxt.ok(valid);
    });
    function checkStrictTuple(sch) {
        const { opts, errSchemaPath } = it;
        const l = schArr.length;
        const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
        if (opts.strictTuples && !fullTuple) {
            const msg = `"${keyword}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
            (0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
        }
    }
}
exports.validateTuple = validateTuple;
exports.default = def;

},{"../../compile/codegen":5,"../../compile/util":13,"../code":53}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const code_1 = require("../code");
const additionalItems_1 = require("./additionalItems");
const error = {
    message: ({ params: { len } }) => (0, codegen_1.str) `must NOT have more than ${len} items`,
    params: ({ params: { len } }) => (0, codegen_1._) `{limit: ${len}}`,
};
const def = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error,
    code(cxt) {
        const { schema, parentSchema, it } = cxt;
        const { prefixItems } = parentSchema;
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
        if (prefixItems)
            (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems);
        else
            cxt.ok((0, code_1.validateArray)(cxt));
    },
};
exports.default = def;

},{"../../compile/codegen":5,"../../compile/util":13,"../code":53,"./additionalItems":35}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../compile/util");
const def = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: true,
    code(cxt) {
        const { gen, schema, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
            cxt.fail();
            return;
        }
        const valid = gen.name("valid");
        cxt.subschema({
            keyword: "not",
            compositeRule: true,
            createErrors: false,
            allErrors: false,
        }, valid);
        cxt.failResult(valid, () => cxt.reset(), () => cxt.error());
    },
    error: { message: "must NOT be valid" },
};
exports.default = def;

},{"../../compile/util":13}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const error = {
    message: "must match exactly one schema in oneOf",
    params: ({ params }) => (0, codegen_1._) `{passingSchemas: ${params.passing}}`,
};
const def = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, parentSchema, it } = cxt;
        /* istanbul ignore if */
        if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
        if (it.opts.discriminator && parentSchema.discriminator)
            return;
        const schArr = schema;
        const valid = gen.let("valid", false);
        const passing = gen.let("passing", null);
        const schValid = gen.name("_valid");
        cxt.setParams({ passing });
        // TODO possibly fail straight away (with warning or exception) if there are two empty always valid schemas
        gen.block(validateOneOf);
        cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
        function validateOneOf() {
            schArr.forEach((sch, i) => {
                let schCxt;
                if ((0, util_1.alwaysValidSchema)(it, sch)) {
                    gen.var(schValid, true);
                }
                else {
                    schCxt = cxt.subschema({
                        keyword: "oneOf",
                        schemaProp: i,
                        compositeRule: true,
                    }, schValid);
                }
                if (i > 0) {
                    gen
                        .if((0, codegen_1._) `${schValid} && ${valid}`)
                        .assign(valid, false)
                        .assign(passing, (0, codegen_1._) `[${passing}, ${i}]`)
                        .else();
                }
                gen.if(schValid, () => {
                    gen.assign(valid, true);
                    gen.assign(passing, i);
                    if (schCxt)
                        cxt.mergeEvaluated(schCxt, codegen_1.Name);
                });
            });
        }
    },
};
exports.default = def;

},{"../../compile/codegen":5,"../../compile/util":13}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const code_1 = require("../code");
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const util_2 = require("../../compile/util");
const def = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(cxt) {
        const { gen, schema, data, parentSchema, it } = cxt;
        const { opts } = it;
        const patterns = (0, code_1.allSchemaProperties)(schema);
        const alwaysValidPatterns = patterns.filter((p) => (0, util_1.alwaysValidSchema)(it, schema[p]));
        if (patterns.length === 0 ||
            (alwaysValidPatterns.length === patterns.length &&
                (!it.opts.unevaluated || it.props === true))) {
            return;
        }
        const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
        const valid = gen.name("valid");
        if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
            it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
        }
        const { props } = it;
        validatePatternProperties();
        function validatePatternProperties() {
            for (const pat of patterns) {
                if (checkProperties)
                    checkMatchingProperties(pat);
                if (it.allErrors) {
                    validateProperties(pat);
                }
                else {
                    gen.var(valid, true); // TODO var
                    validateProperties(pat);
                    gen.if(valid);
                }
            }
        }
        function checkMatchingProperties(pat) {
            for (const prop in checkProperties) {
                if (new RegExp(pat).test(prop)) {
                    (0, util_1.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
                }
            }
        }
        function validateProperties(pat) {
            gen.forIn("key", data, (key) => {
                gen.if((0, codegen_1._) `${(0, code_1.usePattern)(cxt, pat)}.test(${key})`, () => {
                    const alwaysValid = alwaysValidPatterns.includes(pat);
                    if (!alwaysValid) {
                        cxt.subschema({
                            keyword: "patternProperties",
                            schemaProp: pat,
                            dataProp: key,
                            dataPropType: util_2.Type.Str,
                        }, valid);
                    }
                    if (it.opts.unevaluated && props !== true) {
                        gen.assign((0, codegen_1._) `${props}[${key}]`, true);
                    }
                    else if (!alwaysValid && !it.allErrors) {
                        // can short-circuit if `unevaluatedProperties` is not supported (opts.next === false)
                        // or if all properties were evaluated (props === true)
                        gen.if((0, codegen_1.not)(valid), () => gen.break());
                    }
                });
            });
        }
    },
};
exports.default = def;

},{"../../compile/codegen":5,"../../compile/util":13,"../code":53}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const items_1 = require("./items");
const def = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (cxt) => (0, items_1.validateTuple)(cxt, "items"),
};
exports.default = def;

},{"./items":44}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = require("../../compile/validate");
const code_1 = require("../code");
const util_1 = require("../../compile/util");
const additionalProperties_1 = require("./additionalProperties");
const def = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === undefined) {
            additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
        }
        const allProps = (0, code_1.allSchemaProperties)(schema);
        for (const prop of allProps) {
            it.definedProperties.add(prop);
        }
        if (it.opts.unevaluated && allProps.length && it.props !== true) {
            it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props);
        }
        const properties = allProps.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema[p]));
        if (properties.length === 0)
            return;
        const valid = gen.name("valid");
        for (const prop of properties) {
            if (hasDefault(prop)) {
                applyPropertySchema(prop);
            }
            else {
                gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties));
                applyPropertySchema(prop);
                if (!it.allErrors)
                    gen.else().var(valid, true);
                gen.endIf();
            }
            cxt.it.definedProperties.add(prop);
            cxt.ok(valid);
        }
        function hasDefault(prop) {
            return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== undefined;
        }
        function applyPropertySchema(prop) {
            cxt.subschema({
                keyword: "properties",
                schemaProp: prop,
                dataProp: prop,
            }, valid);
        }
    },
};
exports.default = def;

},{"../../compile/util":13,"../../compile/validate":18,"../code":53,"./additionalProperties":36}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const error = {
    message: "property name must be valid",
    params: ({ params }) => (0, codegen_1._) `{propertyName: ${params.propertyName}}`,
};
const def = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error,
    code(cxt) {
        const { gen, schema, data, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
        const valid = gen.name("valid");
        gen.forIn("key", data, (key) => {
            cxt.setParams({ propertyName: key });
            cxt.subschema({
                keyword: "propertyNames",
                data: key,
                dataTypes: ["string"],
                propertyName: key,
                compositeRule: true,
            }, valid);
            gen.if((0, codegen_1.not)(valid), () => {
                cxt.error(true);
                if (!it.allErrors)
                    gen.break();
            });
        });
        cxt.ok(valid);
    },
};
exports.default = def;

},{"../../compile/codegen":5,"../../compile/util":13}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../compile/util");
const def = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword, parentSchema, it }) {
        if (parentSchema.if === undefined)
            (0, util_1.checkStrictMode)(it, `"${keyword}" without "if" is ignored`);
    },
};
exports.default = def;

},{"../../compile/util":13}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUnion = exports.validateArray = exports.usePattern = exports.callValidateCode = exports.schemaProperties = exports.allSchemaProperties = exports.noPropertyInData = exports.propertyInData = exports.isOwnProperty = exports.hasPropFunc = exports.reportMissingProp = exports.checkMissingProp = exports.checkReportMissingProp = void 0;
const codegen_1 = require("../compile/codegen");
const util_1 = require("../compile/util");
const names_1 = require("../compile/names");
const util_2 = require("../compile/util");
function checkReportMissingProp(cxt, prop) {
    const { gen, data, it } = cxt;
    gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
        cxt.setParams({ missingProperty: (0, codegen_1._) `${prop}` }, true);
        cxt.error();
    });
}
exports.checkReportMissingProp = checkReportMissingProp;
function checkMissingProp({ gen, data, it: { opts } }, properties, missing) {
    return (0, codegen_1.or)(...properties.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._) `${missing} = ${prop}`)));
}
exports.checkMissingProp = checkMissingProp;
function reportMissingProp(cxt, missing) {
    cxt.setParams({ missingProperty: missing }, true);
    cxt.error();
}
exports.reportMissingProp = reportMissingProp;
function hasPropFunc(gen) {
    return gen.scopeValue("func", {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        ref: Object.prototype.hasOwnProperty,
        code: (0, codegen_1._) `Object.prototype.hasOwnProperty`,
    });
}
exports.hasPropFunc = hasPropFunc;
function isOwnProperty(gen, data, property) {
    return (0, codegen_1._) `${hasPropFunc(gen)}.call(${data}, ${property})`;
}
exports.isOwnProperty = isOwnProperty;
function propertyInData(gen, data, property, ownProperties) {
    const cond = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(property)} !== undefined`;
    return ownProperties ? (0, codegen_1._) `${cond} && ${isOwnProperty(gen, data, property)}` : cond;
}
exports.propertyInData = propertyInData;
function noPropertyInData(gen, data, property, ownProperties) {
    const cond = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(property)} === undefined`;
    return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
}
exports.noPropertyInData = noPropertyInData;
function allSchemaProperties(schemaMap) {
    return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
}
exports.allSchemaProperties = allSchemaProperties;
function schemaProperties(it, schemaMap) {
    return allSchemaProperties(schemaMap).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
}
exports.schemaProperties = schemaProperties;
function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
    const dataAndSchema = passSchema ? (0, codegen_1._) `${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
    const valCxt = [
        [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)],
        [names_1.default.parentData, it.parentData],
        [names_1.default.parentDataProperty, it.parentDataProperty],
        [names_1.default.rootData, names_1.default.rootData],
    ];
    if (it.opts.dynamicRef)
        valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
    const args = (0, codegen_1._) `${dataAndSchema}, ${gen.object(...valCxt)}`;
    return context !== codegen_1.nil ? (0, codegen_1._) `${func}.call(${context}, ${args})` : (0, codegen_1._) `${func}(${args})`;
}
exports.callValidateCode = callValidateCode;
const newRegExp = (0, codegen_1._) `new RegExp`;
function usePattern({ gen, it: { opts } }, pattern) {
    const u = opts.unicodeRegExp ? "u" : "";
    const { regExp } = opts.code;
    const rx = regExp(pattern, u);
    return gen.scopeValue("pattern", {
        key: rx.toString(),
        ref: rx,
        code: (0, codegen_1._) `${regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp)}(${pattern}, ${u})`,
    });
}
exports.usePattern = usePattern;
function validateArray(cxt) {
    const { gen, data, keyword, it } = cxt;
    const valid = gen.name("valid");
    if (it.allErrors) {
        const validArr = gen.let("valid", true);
        validateItems(() => gen.assign(validArr, false));
        return validArr;
    }
    gen.var(valid, true);
    validateItems(() => gen.break());
    return valid;
    function validateItems(notValid) {
        const len = gen.const("len", (0, codegen_1._) `${data}.length`);
        gen.forRange("i", 0, len, (i) => {
            cxt.subschema({
                keyword,
                dataProp: i,
                dataPropType: util_1.Type.Num,
            }, valid);
            gen.if((0, codegen_1.not)(valid), notValid);
        });
    }
}
exports.validateArray = validateArray;
function validateUnion(cxt) {
    const { gen, schema, keyword, it } = cxt;
    /* istanbul ignore if */
    if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
    const alwaysValid = schema.some((sch) => (0, util_1.alwaysValidSchema)(it, sch));
    if (alwaysValid && !it.opts.unevaluated)
        return;
    const valid = gen.let("valid", false);
    const schValid = gen.name("_valid");
    gen.block(() => schema.forEach((_sch, i) => {
        const schCxt = cxt.subschema({
            keyword,
            schemaProp: i,
            compositeRule: true,
        }, schValid);
        gen.assign(valid, (0, codegen_1._) `${valid} || ${schValid}`);
        const merged = cxt.mergeValidEvaluated(schCxt, schValid);
        // can short-circuit if `unevaluatedProperties/Items` not supported (opts.unevaluated !== true)
        // or if all properties and items were evaluated (it.props === true && it.items === true)
        if (!merged)
            gen.if((0, codegen_1.not)(valid));
    }));
    cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
}
exports.validateUnion = validateUnion;

},{"../compile/codegen":5,"../compile/names":9,"../compile/util":13}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const def = {
    keyword: "id",
    code() {
        throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    },
};
exports.default = def;

},{}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const ref_1 = require("./ref");
const core = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    id_1.default,
    ref_1.default,
];
exports.default = core;

},{"./id":54,"./ref":56}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callRef = exports.getValidate = void 0;
const ref_error_1 = require("../../compile/ref_error");
const code_1 = require("../code");
const codegen_1 = require("../../compile/codegen");
const names_1 = require("../../compile/names");
const compile_1 = require("../../compile");
const util_1 = require("../../compile/util");
const def = {
    keyword: "$ref",
    schemaType: "string",
    code(cxt) {
        const { gen, schema: $ref, it } = cxt;
        const { baseId, schemaEnv: env, validateName, opts, self } = it;
        const { root } = env;
        if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
            return callRootRef();
        const schOrEnv = compile_1.resolveRef.call(self, root, baseId, $ref);
        if (schOrEnv === undefined)
            throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
        if (schOrEnv instanceof compile_1.SchemaEnv)
            return callValidate(schOrEnv);
        return inlineRefSchema(schOrEnv);
        function callRootRef() {
            if (env === root)
                return callRef(cxt, validateName, env, env.$async);
            const rootName = gen.scopeValue("root", { ref: root });
            return callRef(cxt, (0, codegen_1._) `${rootName}.validate`, root, root.$async);
        }
        function callValidate(sch) {
            const v = getValidate(cxt, sch);
            callRef(cxt, v, sch, sch.$async);
        }
        function inlineRefSchema(sch) {
            const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: (0, codegen_1.stringify)(sch) } : { ref: sch });
            const valid = gen.name("valid");
            const schCxt = cxt.subschema({
                schema: sch,
                dataTypes: [],
                schemaPath: codegen_1.nil,
                topSchemaRef: schName,
                errSchemaPath: $ref,
            }, valid);
            cxt.mergeEvaluated(schCxt);
            cxt.ok(valid);
        }
    },
};
function getValidate(cxt, sch) {
    const { gen } = cxt;
    return sch.validate
        ? gen.scopeValue("validate", { ref: sch.validate })
        : (0, codegen_1._) `${gen.scopeValue("wrapper", { ref: sch })}.validate`;
}
exports.getValidate = getValidate;
function callRef(cxt, v, sch, $async) {
    const { gen, it } = cxt;
    const { allErrors, schemaEnv: env, opts } = it;
    const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
    if ($async)
        callAsyncRef();
    else
        callSyncRef();
    function callAsyncRef() {
        if (!env.$async)
            throw new Error("async schema referenced by sync schema");
        const valid = gen.let("valid");
        gen.try(() => {
            gen.code((0, codegen_1._) `await ${(0, code_1.callValidateCode)(cxt, v, passCxt)}`);
            addEvaluatedFrom(v); // TODO will not work with async, it has to be returned with the result
            if (!allErrors)
                gen.assign(valid, true);
        }, (e) => {
            gen.if((0, codegen_1._) `!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
            addErrorsFrom(e);
            if (!allErrors)
                gen.assign(valid, false);
        });
        cxt.ok(valid);
    }
    function callSyncRef() {
        cxt.result((0, code_1.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
    }
    function addErrorsFrom(source) {
        const errs = (0, codegen_1._) `${source}.errors`;
        gen.assign(names_1.default.vErrors, (0, codegen_1._) `${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`); // TODO tagged
        gen.assign(names_1.default.errors, (0, codegen_1._) `${names_1.default.vErrors}.length`);
    }
    function addEvaluatedFrom(source) {
        var _a;
        if (!it.opts.unevaluated)
            return;
        const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
        // TODO refactor
        if (it.props !== true) {
            if (schEvaluated && !schEvaluated.dynamicProps) {
                if (schEvaluated.props !== undefined) {
                    it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
                }
            }
            else {
                const props = gen.var("props", (0, codegen_1._) `${source}.evaluated.props`);
                it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
            }
        }
        if (it.items !== true) {
            if (schEvaluated && !schEvaluated.dynamicItems) {
                if (schEvaluated.items !== undefined) {
                    it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
                }
            }
            else {
                const items = gen.var("items", (0, codegen_1._) `${source}.evaluated.items`);
                it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
            }
        }
    }
}
exports.callRef = callRef;
exports.default = def;

},{"../../compile":8,"../../compile/codegen":5,"../../compile/names":9,"../../compile/ref_error":10,"../../compile/util":13,"../code":53}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const types_1 = require("../discriminator/types");
const compile_1 = require("../../compile");
const util_1 = require("../../compile/util");
const error = {
    message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag
        ? `tag "${tagName}" must be string`
        : `value of tag "${tagName}" must be in oneOf`,
    params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._) `{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`,
};
const def = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error,
    code(cxt) {
        const { gen, data, schema, parentSchema, it } = cxt;
        const { oneOf } = parentSchema;
        if (!it.opts.discriminator) {
            throw new Error("discriminator: requires discriminator option");
        }
        const tagName = schema.propertyName;
        if (typeof tagName != "string")
            throw new Error("discriminator: requires propertyName");
        if (schema.mapping)
            throw new Error("discriminator: mapping is not supported");
        if (!oneOf)
            throw new Error("discriminator: requires oneOf keyword");
        const valid = gen.let("valid", false);
        const tag = gen.const("tag", (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(tagName)}`);
        gen.if((0, codegen_1._) `typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
        cxt.ok(valid);
        function validateMapping() {
            const mapping = getMapping();
            gen.if(false);
            for (const tagValue in mapping) {
                gen.elseIf((0, codegen_1._) `${tag} === ${tagValue}`);
                gen.assign(valid, applyTagSchema(mapping[tagValue]));
            }
            gen.else();
            cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
            gen.endIf();
        }
        function applyTagSchema(schemaProp) {
            const _valid = gen.name("valid");
            const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
            cxt.mergeEvaluated(schCxt, codegen_1.Name);
            return _valid;
        }
        function getMapping() {
            var _a;
            const oneOfMapping = {};
            const topRequired = hasRequired(parentSchema);
            let tagRequired = true;
            for (let i = 0; i < oneOf.length; i++) {
                let sch = oneOf[i];
                if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
                    sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, sch === null || sch === void 0 ? void 0 : sch.$ref);
                    if (sch instanceof compile_1.SchemaEnv)
                        sch = sch.schema;
                }
                const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
                if (typeof propSch != "object") {
                    throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
                }
                tagRequired = tagRequired && (topRequired || hasRequired(sch));
                addMappings(propSch, i);
            }
            if (!tagRequired)
                throw new Error(`discriminator: "${tagName}" must be required`);
            return oneOfMapping;
            function hasRequired({ required }) {
                return Array.isArray(required) && required.includes(tagName);
            }
            function addMappings(sch, i) {
                if (sch.const) {
                    addMapping(sch.const, i);
                }
                else if (sch.enum) {
                    for (const tagValue of sch.enum) {
                        addMapping(tagValue, i);
                    }
                }
                else {
                    throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
                }
            }
            function addMapping(tagValue, i) {
                if (typeof tagValue != "string" || tagValue in oneOfMapping) {
                    throw new Error(`discriminator: "${tagName}" values must be unique strings`);
                }
                oneOfMapping[tagValue] = i;
            }
        }
    },
};
exports.default = def;

},{"../../compile":8,"../../compile/codegen":5,"../../compile/util":13,"../discriminator/types":58}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscrError = void 0;
var DiscrError;
(function (DiscrError) {
    DiscrError["Tag"] = "tag";
    DiscrError["Mapping"] = "mapping";
})(DiscrError = exports.DiscrError || (exports.DiscrError = {}));

},{}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
const validation_1 = require("./validation");
const applicator_1 = require("./applicator");
const format_1 = require("./format");
const metadata_1 = require("./metadata");
const draft7Vocabularies = [
    core_1.default,
    validation_1.default,
    (0, applicator_1.default)(),
    format_1.default,
    metadata_1.metadataVocabulary,
    metadata_1.contentVocabulary,
];
exports.default = draft7Vocabularies;

},{"./applicator":43,"./core":55,"./format":66,"./metadata":67,"./validation":75}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicAnchor = void 0;
const codegen_1 = require("../../compile/codegen");
const names_1 = require("../../compile/names");
const compile_1 = require("../../compile");
const ref_1 = require("../core/ref");
const def = {
    keyword: "$dynamicAnchor",
    schemaType: "string",
    code: (cxt) => dynamicAnchor(cxt, cxt.schema),
};
function dynamicAnchor(cxt, anchor) {
    const { gen, it } = cxt;
    it.schemaEnv.root.dynamicAnchors[anchor] = true;
    const v = (0, codegen_1._) `${names_1.default.dynamicAnchors}${(0, codegen_1.getProperty)(anchor)}`;
    const validate = it.errSchemaPath === "#" ? it.validateName : _getValidate(cxt);
    gen.if((0, codegen_1._) `!${v}`, () => gen.assign(v, validate));
}
exports.dynamicAnchor = dynamicAnchor;
function _getValidate(cxt) {
    const { schemaEnv, schema, self } = cxt.it;
    const { root, baseId, localRefs, meta } = schemaEnv.root;
    const { schemaId } = self.opts;
    const sch = new compile_1.SchemaEnv({ schema, schemaId, root, baseId, localRefs, meta });
    compile_1.compileSchema.call(self, sch);
    return (0, ref_1.getValidate)(cxt, sch);
}
exports.default = def;

},{"../../compile":8,"../../compile/codegen":5,"../../compile/names":9,"../core/ref":56}],61:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicRef = void 0;
const codegen_1 = require("../../compile/codegen");
const names_1 = require("../../compile/names");
const ref_1 = require("../core/ref");
const def = {
    keyword: "$dynamicRef",
    schemaType: "string",
    code: (cxt) => dynamicRef(cxt, cxt.schema),
};
function dynamicRef(cxt, ref) {
    const { gen, keyword, it } = cxt;
    if (ref[0] !== "#")
        throw new Error(`"${keyword}" only supports hash fragment reference`);
    const anchor = ref.slice(1);
    if (it.allErrors) {
        _dynamicRef();
    }
    else {
        const valid = gen.let("valid", false);
        _dynamicRef(valid);
        cxt.ok(valid);
    }
    function _dynamicRef(valid) {
        // TODO the assumption here is that `recursiveRef: #` always points to the root
        // of the schema object, which is not correct, because there may be $id that
        // makes # point to it, and the target schema may not contain dynamic/recursiveAnchor.
        // Because of that 2 tests in recursiveRef.json fail.
        // This is a similar problem to #815 (`$id` doesn't alter resolution scope for `{ "$ref": "#" }`).
        // (This problem is not tested in JSON-Schema-Test-Suite)
        if (it.schemaEnv.root.dynamicAnchors[anchor]) {
            const v = gen.let("_v", (0, codegen_1._) `${names_1.default.dynamicAnchors}${(0, codegen_1.getProperty)(anchor)}`);
            gen.if(v, _callRef(v, valid), _callRef(it.validateName, valid));
        }
        else {
            _callRef(it.validateName, valid)();
        }
    }
    function _callRef(validate, valid) {
        return valid
            ? () => gen.block(() => {
                (0, ref_1.callRef)(cxt, validate);
                gen.let(valid, true);
            })
            : () => (0, ref_1.callRef)(cxt, validate);
    }
}
exports.dynamicRef = dynamicRef;
exports.default = def;

},{"../../compile/codegen":5,"../../compile/names":9,"../core/ref":56}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dynamicAnchor_1 = require("./dynamicAnchor");
const dynamicRef_1 = require("./dynamicRef");
const recursiveAnchor_1 = require("./recursiveAnchor");
const recursiveRef_1 = require("./recursiveRef");
const dynamic = [dynamicAnchor_1.default, dynamicRef_1.default, recursiveAnchor_1.default, recursiveRef_1.default];
exports.default = dynamic;

},{"./dynamicAnchor":60,"./dynamicRef":61,"./recursiveAnchor":63,"./recursiveRef":64}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dynamicAnchor_1 = require("./dynamicAnchor");
const util_1 = require("../../compile/util");
const def = {
    keyword: "$recursiveAnchor",
    schemaType: "boolean",
    code(cxt) {
        if (cxt.schema)
            (0, dynamicAnchor_1.dynamicAnchor)(cxt, "");
        else
            (0, util_1.checkStrictMode)(cxt.it, "$recursiveAnchor: false is ignored");
    },
};
exports.default = def;

},{"../../compile/util":13,"./dynamicAnchor":60}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dynamicRef_1 = require("./dynamicRef");
const def = {
    keyword: "$recursiveRef",
    schemaType: "string",
    code: (cxt) => (0, dynamicRef_1.dynamicRef)(cxt, cxt.schema),
};
exports.default = def;

},{"./dynamicRef":61}],65:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const error = {
    message: ({ schemaCode }) => (0, codegen_1.str) `must match format "${schemaCode}"`,
    params: ({ schemaCode }) => (0, codegen_1._) `{format: ${schemaCode}}`,
};
const def = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: true,
    error,
    code(cxt, ruleType) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        const { opts, errSchemaPath, schemaEnv, self } = it;
        if (!opts.validateFormats)
            return;
        if ($data)
            validate$DataFormat();
        else
            validateFormat();
        function validate$DataFormat() {
            const fmts = gen.scopeValue("formats", {
                ref: self.formats,
                code: opts.code.formats,
            });
            const fDef = gen.const("fDef", (0, codegen_1._) `${fmts}[${schemaCode}]`);
            const fType = gen.let("fType");
            const format = gen.let("format");
            // TODO simplify
            gen.if((0, codegen_1._) `typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1._) `${fDef}.type || "string"`).assign(format, (0, codegen_1._) `${fDef}.validate`), () => gen.assign(fType, (0, codegen_1._) `"string"`).assign(format, fDef));
            cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
            function unknownFmt() {
                if (opts.strictSchema === false)
                    return codegen_1.nil;
                return (0, codegen_1._) `${schemaCode} && !${format}`;
            }
            function invalidFmt() {
                const callFormat = schemaEnv.$async
                    ? (0, codegen_1._) `(${fDef}.async ? await ${format}(${data}) : ${format}(${data}))`
                    : (0, codegen_1._) `${format}(${data})`;
                const validData = (0, codegen_1._) `(typeof ${format} == "function" ? ${callFormat} : ${format}.test(${data}))`;
                return (0, codegen_1._) `${format} && ${format} !== true && ${fType} === ${ruleType} && !${validData}`;
            }
        }
        function validateFormat() {
            const formatDef = self.formats[schema];
            if (!formatDef) {
                unknownFormat();
                return;
            }
            if (formatDef === true)
                return;
            const [fmtType, format, fmtRef] = getFormat(formatDef);
            if (fmtType === ruleType)
                cxt.pass(validCondition());
            function unknownFormat() {
                if (opts.strictSchema === false) {
                    self.logger.warn(unknownMsg());
                    return;
                }
                throw new Error(unknownMsg());
                function unknownMsg() {
                    return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
                }
            }
            function getFormat(fmtDef) {
                const code = fmtDef instanceof RegExp
                    ? (0, codegen_1.regexpCode)(fmtDef)
                    : opts.code.formats
                        ? (0, codegen_1._) `${opts.code.formats}${(0, codegen_1.getProperty)(schema)}`
                        : undefined;
                const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code });
                if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
                    return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1._) `${fmt}.validate`];
                }
                return ["string", fmtDef, fmt];
            }
            function validCondition() {
                if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
                    if (!schemaEnv.$async)
                        throw new Error("async format in sync schema");
                    return (0, codegen_1._) `await ${fmtRef}(${data})`;
                }
                return typeof format == "function" ? (0, codegen_1._) `${fmtRef}(${data})` : (0, codegen_1._) `${fmtRef}.test(${data})`;
            }
        }
    },
};
exports.default = def;

},{"../../compile/codegen":5}],66:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format_1 = require("./format");
const format = [format_1.default];
exports.default = format;

},{"./format":65}],67:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentVocabulary = exports.metadataVocabulary = void 0;
exports.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples",
];
exports.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema",
];

},{}],68:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependentRequired_1 = require("./validation/dependentRequired");
const dependentSchemas_1 = require("./applicator/dependentSchemas");
const limitContains_1 = require("./validation/limitContains");
const next = [dependentRequired_1.default, dependentSchemas_1.default, limitContains_1.default];
exports.default = next;

},{"./applicator/dependentSchemas":41,"./validation/dependentRequired":73,"./validation/limitContains":76}],69:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unevaluatedProperties_1 = require("./unevaluatedProperties");
const unevaluatedItems_1 = require("./unevaluatedItems");
const unevaluated = [unevaluatedProperties_1.default, unevaluatedItems_1.default];
exports.default = unevaluated;

},{"./unevaluatedItems":70,"./unevaluatedProperties":71}],70:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const error = {
    message: ({ params: { len } }) => (0, codegen_1.str) `must NOT have more than ${len} items`,
    params: ({ params: { len } }) => (0, codegen_1._) `{limit: ${len}}`,
};
const def = {
    keyword: "unevaluatedItems",
    type: "array",
    schemaType: ["boolean", "object"],
    error,
    code(cxt) {
        const { gen, schema, data, it } = cxt;
        const items = it.items || 0;
        if (items === true)
            return;
        const len = gen.const("len", (0, codegen_1._) `${data}.length`);
        if (schema === false) {
            cxt.setParams({ len: items });
            cxt.fail((0, codegen_1._) `${len} > ${items}`);
        }
        else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
            const valid = gen.var("valid", (0, codegen_1._) `${len} <= ${items}`);
            gen.if((0, codegen_1.not)(valid), () => validateItems(valid, items));
            cxt.ok(valid);
        }
        it.items = true;
        function validateItems(valid, from) {
            gen.forRange("i", from, len, (i) => {
                cxt.subschema({ keyword: "unevaluatedItems", dataProp: i, dataPropType: util_1.Type.Num }, valid);
                if (!it.allErrors)
                    gen.if((0, codegen_1.not)(valid), () => gen.break());
            });
        }
    },
};
exports.default = def;

},{"../../compile/codegen":5,"../../compile/util":13}],71:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const names_1 = require("../../compile/names");
const error = {
    message: "must NOT have unevaluated properties",
    params: ({ params }) => (0, codegen_1._) `{unevaluatedProperty: ${params.unevaluatedProperty}}`,
};
const def = {
    keyword: "unevaluatedProperties",
    type: "object",
    schemaType: ["boolean", "object"],
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, data, errsCount, it } = cxt;
        /* istanbul ignore if */
        if (!errsCount)
            throw new Error("ajv implementation error");
        const { allErrors, props } = it;
        if (props instanceof codegen_1.Name) {
            gen.if((0, codegen_1._) `${props} !== true`, () => gen.forIn("key", data, (key) => gen.if(unevaluatedDynamic(props, key), () => unevaluatedPropCode(key))));
        }
        else if (props !== true) {
            gen.forIn("key", data, (key) => props === undefined
                ? unevaluatedPropCode(key)
                : gen.if(unevaluatedStatic(props, key), () => unevaluatedPropCode(key)));
        }
        it.props = true;
        cxt.ok((0, codegen_1._) `${errsCount} === ${names_1.default.errors}`);
        function unevaluatedPropCode(key) {
            if (schema === false) {
                cxt.setParams({ unevaluatedProperty: key });
                cxt.error();
                if (!allErrors)
                    gen.break();
                return;
            }
            if (!(0, util_1.alwaysValidSchema)(it, schema)) {
                const valid = gen.name("valid");
                cxt.subschema({
                    keyword: "unevaluatedProperties",
                    dataProp: key,
                    dataPropType: util_1.Type.Str,
                }, valid);
                if (!allErrors)
                    gen.if((0, codegen_1.not)(valid), () => gen.break());
            }
        }
        function unevaluatedDynamic(evaluatedProps, key) {
            return (0, codegen_1._) `!${evaluatedProps} || !${evaluatedProps}[${key}]`;
        }
        function unevaluatedStatic(evaluatedProps, key) {
            const ps = [];
            for (const p in evaluatedProps) {
                if (evaluatedProps[p] === true)
                    ps.push((0, codegen_1._) `${key} !== ${p}`);
            }
            return (0, codegen_1.and)(...ps);
        }
    },
};
exports.default = def;

},{"../../compile/codegen":5,"../../compile/names":9,"../../compile/util":13}],72:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const equal_1 = require("../../runtime/equal");
const error = {
    message: "must be equal to constant",
    params: ({ schemaCode }) => (0, codegen_1._) `{allowedValue: ${schemaCode}}`,
};
const def = {
    keyword: "const",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, $data, schemaCode, schema } = cxt;
        if ($data || (schema && typeof schema == "object")) {
            cxt.fail$data((0, codegen_1._) `!${(0, util_1.useFunc)(gen, equal_1.default)}(${data}, ${schemaCode})`);
        }
        else {
            cxt.fail((0, codegen_1._) `${schema} !== ${data}`);
        }
    },
};
exports.default = def;

},{"../../compile/codegen":5,"../../compile/util":13,"../../runtime/equal":31}],73:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependencies_1 = require("../applicator/dependencies");
const def = {
    keyword: "dependentRequired",
    type: "object",
    schemaType: "object",
    error: dependencies_1.error,
    code: (cxt) => (0, dependencies_1.validatePropertyDeps)(cxt),
};
exports.default = def;

},{"../applicator/dependencies":40}],74:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const equal_1 = require("../../runtime/equal");
const error = {
    message: "must be equal to one of the allowed values",
    params: ({ schemaCode }) => (0, codegen_1._) `{allowedValues: ${schemaCode}}`,
};
const def = {
    keyword: "enum",
    schemaType: "array",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        if (!$data && schema.length === 0)
            throw new Error("enum must have non-empty array");
        const useLoop = schema.length >= it.opts.loopEnum;
        let eql;
        const getEql = () => (eql !== null && eql !== void 0 ? eql : (eql = (0, util_1.useFunc)(gen, equal_1.default)));
        let valid;
        if (useLoop || $data) {
            valid = gen.let("valid");
            cxt.block$data(valid, loopEnum);
        }
        else {
            /* istanbul ignore if */
            if (!Array.isArray(schema))
                throw new Error("ajv implementation error");
            const vSchema = gen.const("vSchema", schemaCode);
            valid = (0, codegen_1.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
        }
        cxt.pass(valid);
        function loopEnum() {
            gen.assign(valid, false);
            gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1._) `${getEql()}(${data}, ${v})`, () => gen.assign(valid, true).break()));
        }
        function equalCode(vSchema, i) {
            const sch = schema[i];
            return typeof sch === "object" && sch !== null
                ? (0, codegen_1._) `${getEql()}(${data}, ${vSchema}[${i}])`
                : (0, codegen_1._) `${data} === ${sch}`;
        }
    },
};
exports.default = def;

},{"../../compile/codegen":5,"../../compile/util":13,"../../runtime/equal":31}],75:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const limitNumber_1 = require("./limitNumber");
const multipleOf_1 = require("./multipleOf");
const limitLength_1 = require("./limitLength");
const pattern_1 = require("./pattern");
const limitProperties_1 = require("./limitProperties");
const required_1 = require("./required");
const limitItems_1 = require("./limitItems");
const uniqueItems_1 = require("./uniqueItems");
const const_1 = require("./const");
const enum_1 = require("./enum");
const validation = [
    // number
    limitNumber_1.default,
    multipleOf_1.default,
    // string
    limitLength_1.default,
    pattern_1.default,
    // object
    limitProperties_1.default,
    required_1.default,
    // array
    limitItems_1.default,
    uniqueItems_1.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    const_1.default,
    enum_1.default,
];
exports.default = validation;

},{"./const":72,"./enum":74,"./limitItems":77,"./limitLength":78,"./limitNumber":79,"./limitProperties":80,"./multipleOf":81,"./pattern":82,"./required":83,"./uniqueItems":84}],76:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../compile/util");
const def = {
    keyword: ["maxContains", "minContains"],
    type: "array",
    schemaType: "number",
    code({ keyword, parentSchema, it }) {
        if (parentSchema.contains === undefined) {
            (0, util_1.checkStrictMode)(it, `"${keyword}" without "contains" is ignored`);
        }
    },
};
exports.default = def;

},{"../../compile/util":13}],77:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const error = {
    message({ keyword, schemaCode }) {
        const comp = keyword === "maxItems" ? "more" : "fewer";
        return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} items`;
    },
    params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
};
const def = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._) `${data}.length ${op} ${schemaCode}`);
    },
};
exports.default = def;

},{"../../compile/codegen":5}],78:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const ucs2length_1 = require("../../runtime/ucs2length");
const error = {
    message({ keyword, schemaCode }) {
        const comp = keyword === "maxLength" ? "more" : "fewer";
        return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} characters`;
    },
    params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
};
const def = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode, it } = cxt;
        const op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
        const len = it.opts.unicode === false ? (0, codegen_1._) `${data}.length` : (0, codegen_1._) `${(0, util_1.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
        cxt.fail$data((0, codegen_1._) `${len} ${op} ${schemaCode}`);
    },
};
exports.default = def;

},{"../../compile/codegen":5,"../../compile/util":13,"../../runtime/ucs2length":32}],79:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const ops = codegen_1.operators;
const KWDs = {
    maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
    minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
    exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
    exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE },
};
const error = {
    message: ({ keyword, schemaCode }) => (0, codegen_1.str) `must be ${KWDs[keyword].okStr} ${schemaCode}`,
    params: ({ keyword, schemaCode }) => (0, codegen_1._) `{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`,
};
const def = {
    keyword: Object.keys(KWDs),
    type: "number",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        cxt.fail$data((0, codegen_1._) `${data} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data})`);
    },
};
exports.default = def;

},{"../../compile/codegen":5}],80:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const error = {
    message({ keyword, schemaCode }) {
        const comp = keyword === "maxProperties" ? "more" : "fewer";
        return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} properties`;
    },
    params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
};
const def = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._) `Object.keys(${data}).length ${op} ${schemaCode}`);
    },
};
exports.default = def;

},{"../../compile/codegen":5}],81:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const error = {
    message: ({ schemaCode }) => (0, codegen_1.str) `must be multiple of ${schemaCode}`,
    params: ({ schemaCode }) => (0, codegen_1._) `{multipleOf: ${schemaCode}}`,
};
const def = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, schemaCode, it } = cxt;
        // const bdt = bad$DataType(schemaCode, <string>def.schemaType, $data)
        const prec = it.opts.multipleOfPrecision;
        const res = gen.let("res");
        const invalid = prec
            ? (0, codegen_1._) `Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}`
            : (0, codegen_1._) `${res} !== parseInt(${res})`;
        cxt.fail$data((0, codegen_1._) `(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
    },
};
exports.default = def;

},{"../../compile/codegen":5}],82:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const code_1 = require("../code");
const codegen_1 = require("../../compile/codegen");
const error = {
    message: ({ schemaCode }) => (0, codegen_1.str) `must match pattern "${schemaCode}"`,
    params: ({ schemaCode }) => (0, codegen_1._) `{pattern: ${schemaCode}}`,
};
const def = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: true,
    error,
    code(cxt) {
        const { data, $data, schema, schemaCode, it } = cxt;
        // TODO regexp should be wrapped in try/catchs
        const u = it.opts.unicodeRegExp ? "u" : "";
        const regExp = $data ? (0, codegen_1._) `(new RegExp(${schemaCode}, ${u}))` : (0, code_1.usePattern)(cxt, schema);
        cxt.fail$data((0, codegen_1._) `!${regExp}.test(${data})`);
    },
};
exports.default = def;

},{"../../compile/codegen":5,"../code":53}],83:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const code_1 = require("../code");
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const error = {
    message: ({ params: { missingProperty } }) => (0, codegen_1.str) `must have required property '${missingProperty}'`,
    params: ({ params: { missingProperty } }) => (0, codegen_1._) `{missingProperty: ${missingProperty}}`,
};
const def = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: true,
    error,
    code(cxt) {
        const { gen, schema, schemaCode, data, $data, it } = cxt;
        const { opts } = it;
        if (!$data && schema.length === 0)
            return;
        const useLoop = schema.length >= opts.loopRequired;
        if (it.allErrors)
            allErrorsMode();
        else
            exitOnErrorMode();
        if (opts.strictRequired) {
            const props = cxt.parentSchema.properties;
            const { definedProperties } = cxt.it;
            for (const requiredKey of schema) {
                if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === undefined && !definedProperties.has(requiredKey)) {
                    const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
                    const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
                    (0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
                }
            }
        }
        function allErrorsMode() {
            if (useLoop || $data) {
                cxt.block$data(codegen_1.nil, loopAllRequired);
            }
            else {
                for (const prop of schema) {
                    (0, code_1.checkReportMissingProp)(cxt, prop);
                }
            }
        }
        function exitOnErrorMode() {
            const missing = gen.let("missing");
            if (useLoop || $data) {
                const valid = gen.let("valid", true);
                cxt.block$data(valid, () => loopUntilMissing(missing, valid));
                cxt.ok(valid);
            }
            else {
                gen.if((0, code_1.checkMissingProp)(cxt, schema, missing));
                (0, code_1.reportMissingProp)(cxt, missing);
                gen.else();
            }
        }
        function loopAllRequired() {
            gen.forOf("prop", schemaCode, (prop) => {
                cxt.setParams({ missingProperty: prop });
                gen.if((0, code_1.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
            });
        }
        function loopUntilMissing(missing, valid) {
            cxt.setParams({ missingProperty: missing });
            gen.forOf(missing, schemaCode, () => {
                gen.assign(valid, (0, code_1.propertyInData)(gen, data, missing, opts.ownProperties));
                gen.if((0, codegen_1.not)(valid), () => {
                    cxt.error();
                    gen.break();
                });
            }, codegen_1.nil);
        }
    },
};
exports.default = def;

},{"../../compile/codegen":5,"../../compile/util":13,"../code":53}],84:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataType_1 = require("../../compile/validate/dataType");
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const equal_1 = require("../../runtime/equal");
const error = {
    message: ({ params: { i, j } }) => (0, codegen_1.str) `must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
    params: ({ params: { i, j } }) => (0, codegen_1._) `{i: ${i}, j: ${j}}`,
};
const def = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
        if (!$data && !schema)
            return;
        const valid = gen.let("valid");
        const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
        cxt.block$data(valid, validateUniqueItems, (0, codegen_1._) `${schemaCode} === false`);
        cxt.ok(valid);
        function validateUniqueItems() {
            const i = gen.let("i", (0, codegen_1._) `${data}.length`);
            const j = gen.let("j");
            cxt.setParams({ i, j });
            gen.assign(valid, true);
            gen.if((0, codegen_1._) `${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
        }
        function canOptimize() {
            return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
        }
        function loopN(i, j) {
            const item = gen.name("item");
            const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
            const indices = gen.const("indices", (0, codegen_1._) `{}`);
            gen.for((0, codegen_1._) `;${i}--;`, () => {
                gen.let(item, (0, codegen_1._) `${data}[${i}]`);
                gen.if(wrongType, (0, codegen_1._) `continue`);
                if (itemTypes.length > 1)
                    gen.if((0, codegen_1._) `typeof ${item} == "string"`, (0, codegen_1._) `${item} += "_"`);
                gen
                    .if((0, codegen_1._) `typeof ${indices}[${item}] == "number"`, () => {
                    gen.assign(j, (0, codegen_1._) `${indices}[${item}]`);
                    cxt.error();
                    gen.assign(valid, false).break();
                })
                    .code((0, codegen_1._) `${indices}[${item}] = ${i}`);
            });
        }
        function loopN2(i, j) {
            const eql = (0, util_1.useFunc)(gen, equal_1.default);
            const outer = gen.name("outer");
            gen.label(outer).for((0, codegen_1._) `;${i}--;`, () => gen.for((0, codegen_1._) `${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1._) `${eql}(${data}[${i}], ${data}[${j}])`, () => {
                cxt.error();
                gen.assign(valid, false).break(outer);
            })));
        }
    },
};
exports.default = def;

},{"../../compile/codegen":5,"../../compile/util":13,"../../compile/validate/dataType":16,"../../runtime/equal":31}],85:[function(require,module,exports){
'use strict';

// do not edit .js files directly - edit src/index.jst



module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }



    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};

},{}],86:[function(require,module,exports){
'use strict';

var traverse = module.exports = function (schema, opts, cb) {
  // Legacy support for v0.3.1 and earlier.
  if (typeof opts == 'function') {
    cb = opts;
    opts = {};
  }

  cb = opts.cb || cb;
  var pre = (typeof cb == 'function') ? cb : cb.pre || function() {};
  var post = cb.post || function() {};

  _traverse(opts, pre, post, schema, '', schema);
};


traverse.keywords = {
  additionalItems: true,
  items: true,
  contains: true,
  additionalProperties: true,
  propertyNames: true,
  not: true,
  if: true,
  then: true,
  else: true
};

traverse.arrayKeywords = {
  items: true,
  allOf: true,
  anyOf: true,
  oneOf: true
};

traverse.propsKeywords = {
  $defs: true,
  definitions: true,
  properties: true,
  patternProperties: true,
  dependencies: true
};

traverse.skipKeywords = {
  default: true,
  enum: true,
  const: true,
  required: true,
  maximum: true,
  minimum: true,
  exclusiveMaximum: true,
  exclusiveMinimum: true,
  multipleOf: true,
  maxLength: true,
  minLength: true,
  pattern: true,
  format: true,
  maxItems: true,
  minItems: true,
  uniqueItems: true,
  maxProperties: true,
  minProperties: true
};


function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
  if (schema && typeof schema == 'object' && !Array.isArray(schema)) {
    pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
    for (var key in schema) {
      var sch = schema[key];
      if (Array.isArray(sch)) {
        if (key in traverse.arrayKeywords) {
          for (var i=0; i<sch.length; i++)
            _traverse(opts, pre, post, sch[i], jsonPtr + '/' + key + '/' + i, rootSchema, jsonPtr, key, schema, i);
        }
      } else if (key in traverse.propsKeywords) {
        if (sch && typeof sch == 'object') {
          for (var prop in sch)
            _traverse(opts, pre, post, sch[prop], jsonPtr + '/' + key + '/' + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
        }
      } else if (key in traverse.keywords || (opts.allKeys && !(key in traverse.skipKeywords))) {
        _traverse(opts, pre, post, sch, jsonPtr + '/' + key, rootSchema, jsonPtr, key, schema);
      }
    }
    post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
  }
}


function escapeJsonPtr(str) {
  return str.replace(/~/g, '~0').replace(/\//g, '~1');
}

},{}],87:[function(require,module,exports){
/** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.URI = global.URI || {})));
}(this, (function (exports) { 'use strict';

function merge() {
    for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
        sets[_key] = arguments[_key];
    }

    if (sets.length > 1) {
        sets[0] = sets[0].slice(0, -1);
        var xl = sets.length - 1;
        for (var x = 1; x < xl; ++x) {
            sets[x] = sets[x].slice(1, -1);
        }
        sets[xl] = sets[xl].slice(1);
        return sets.join('');
    } else {
        return sets[0];
    }
}
function subexp(str) {
    return "(?:" + str + ")";
}
function typeOf(o) {
    return o === undefined ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
}
function toUpperCase(str) {
    return str.toUpperCase();
}
function toArray(obj) {
    return obj !== undefined && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
}
function assign(target, source) {
    var obj = target;
    if (source) {
        for (var key in source) {
            obj[key] = source[key];
        }
    }
    return obj;
}

function buildExps(isIRI) {
    var ALPHA$$ = "[A-Za-z]",
        CR$ = "[\\x0D]",
        DIGIT$$ = "[0-9]",
        DQUOTE$$ = "[\\x22]",
        HEXDIG$$ = merge(DIGIT$$, "[A-Fa-f]"),
        //case-insensitive
    LF$$ = "[\\x0A]",
        SP$$ = "[\\x20]",
        PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)),
        //expanded
    GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]",
        SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",
        RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$),
        UCSCHAR$$ = isIRI ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]",
        //subset, excludes bidi control characters
    IPRIVATE$$ = isIRI ? "[\\uE000-\\uF8FF]" : "[]",
        //subset
    UNRESERVED$$ = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$),
        SCHEME$ = subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*"),
        USERINFO$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]")) + "*"),
        DEC_OCTET$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("[1-9]" + DIGIT$$) + "|" + DIGIT$$),
        DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$),
        //relaxed parsing rules
    IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$),
        H16$ = subexp(HEXDIG$$ + "{1,4}"),
        LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$),
        IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$),
        //                           6( h16 ":" ) ls32
    IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$),
        //                      "::" 5( h16 ":" ) ls32
    IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$),
        //[               h16 ] "::" 4( h16 ":" ) ls32
    IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$),
        //[ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
    IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$),
        //[ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
    IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$),
        //[ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
    IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$),
        //[ *4( h16 ":" ) h16 ] "::"              ls32
    IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$),
        //[ *5( h16 ":" ) h16 ] "::"              h16
    IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"),
        //[ *6( h16 ":" ) h16 ] "::"
    IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")),
        ZONEID$ = subexp(subexp(UNRESERVED$$ + "|" + PCT_ENCODED$) + "+"),
        //RFC 6874
    IPV6ADDRZ$ = subexp(IPV6ADDRESS$ + "\\%25" + ZONEID$),
        //RFC 6874
    IPV6ADDRZ_RELAXED$ = subexp(IPV6ADDRESS$ + subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + ZONEID$),
        //RFC 6874, with relaxed parsing rules
    IPVFUTURE$ = subexp("[vV]" + HEXDIG$$ + "+\\." + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]") + "+"),
        IP_LITERAL$ = subexp("\\[" + subexp(IPV6ADDRZ_RELAXED$ + "|" + IPV6ADDRESS$ + "|" + IPVFUTURE$) + "\\]"),
        //RFC 6874
    REG_NAME$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$)) + "*"),
        HOST$ = subexp(IP_LITERAL$ + "|" + IPV4ADDRESS$ + "(?!" + REG_NAME$ + ")" + "|" + REG_NAME$),
        PORT$ = subexp(DIGIT$$ + "*"),
        AUTHORITY$ = subexp(subexp(USERINFO$ + "@") + "?" + HOST$ + subexp("\\:" + PORT$) + "?"),
        PCHAR$ = subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@]")),
        SEGMENT$ = subexp(PCHAR$ + "*"),
        SEGMENT_NZ$ = subexp(PCHAR$ + "+"),
        SEGMENT_NZ_NC$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\@]")) + "+"),
        PATH_ABEMPTY$ = subexp(subexp("\\/" + SEGMENT$) + "*"),
        PATH_ABSOLUTE$ = subexp("\\/" + subexp(SEGMENT_NZ$ + PATH_ABEMPTY$) + "?"),
        //simplified
    PATH_NOSCHEME$ = subexp(SEGMENT_NZ_NC$ + PATH_ABEMPTY$),
        //simplified
    PATH_ROOTLESS$ = subexp(SEGMENT_NZ$ + PATH_ABEMPTY$),
        //simplified
    PATH_EMPTY$ = "(?!" + PCHAR$ + ")",
        PATH$ = subexp(PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$),
        QUERY$ = subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*"),
        FRAGMENT$ = subexp(subexp(PCHAR$ + "|[\\/\\?]") + "*"),
        HIER_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$),
        URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"),
        RELATIVE_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$),
        RELATIVE$ = subexp(RELATIVE_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"),
        URI_REFERENCE$ = subexp(URI$ + "|" + RELATIVE$),
        ABSOLUTE_URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?"),
        GENERIC_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        RELATIVE_REF$ = "^(){0}" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        ABSOLUTE_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?$",
        SAMEDOC_REF$ = "^" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        AUTHORITY_REF$ = "^" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?$";
    return {
        NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
        NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
        NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
        ESCAPE: new RegExp(merge("[^]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        UNRESERVED: new RegExp(UNRESERVED$$, "g"),
        OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$, RESERVED$$), "g"),
        PCT_ENCODED: new RegExp(PCT_ENCODED$, "g"),
        IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
        IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$") //RFC 6874, with relaxed parsing rules
    };
}
var URI_PROTOCOL = buildExps(false);

var IRI_PROTOCOL = buildExps(true);

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/** Highest positive signed 32-bit float value */

var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

/** Bootstring parameters */
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'

/** Regular expressions */
var regexPunycode = /^xn--/;
var regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

/** Error messages */
var errors = {
	'overflow': 'Overflow: input needs wider integers to process',
	'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	'invalid-input': 'Invalid input'
};

/** Convenience shortcuts */
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;

/*--------------------------------------------------------------------------*/

/**
 * A generic error utility function.
 * @private
 * @param {String} type The error type.
 * @returns {Error} Throws a `RangeError` with the applicable error message.
 */
function error$1(type) {
	throw new RangeError(errors[type]);
}

/**
 * A generic `Array#map` utility function.
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} callback The function that gets called for every array
 * item.
 * @returns {Array} A new array of values returned by the callback function.
 */
function map(array, fn) {
	var result = [];
	var length = array.length;
	while (length--) {
		result[length] = fn(array[length]);
	}
	return result;
}

/**
 * A simple `Array#map`-like wrapper to work with domain name strings or email
 * addresses.
 * @private
 * @param {String} domain The domain name or email address.
 * @param {Function} callback The function that gets called for every
 * character.
 * @returns {Array} A new string of characters returned by the callback
 * function.
 */
function mapDomain(string, fn) {
	var parts = string.split('@');
	var result = '';
	if (parts.length > 1) {
		// In email addresses, only the domain name should be punycoded. Leave
		// the local part (i.e. everything up to `@`) intact.
		result = parts[0] + '@';
		string = parts[1];
	}
	// Avoid `split(regex)` for IE8 compatibility. See #17.
	string = string.replace(regexSeparators, '\x2E');
	var labels = string.split('.');
	var encoded = map(labels, fn).join('.');
	return result + encoded;
}

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */
function ucs2decode(string) {
	var output = [];
	var counter = 0;
	var length = string.length;
	while (counter < length) {
		var value = string.charCodeAt(counter++);
		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
			// It's a high surrogate, and there is a next character.
			var extra = string.charCodeAt(counter++);
			if ((extra & 0xFC00) == 0xDC00) {
				// Low surrogate.
				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
			} else {
				// It's an unmatched surrogate; only append this code unit, in case the
				// next code unit is the high surrogate of a surrogate pair.
				output.push(value);
				counter--;
			}
		} else {
			output.push(value);
		}
	}
	return output;
}

/**
 * Creates a string based on an array of numeric code points.
 * @see `punycode.ucs2.decode`
 * @memberOf punycode.ucs2
 * @name encode
 * @param {Array} codePoints The array of numeric code points.
 * @returns {String} The new Unicode string (UCS-2).
 */
var ucs2encode = function ucs2encode(array) {
	return String.fromCodePoint.apply(String, toConsumableArray(array));
};

/**
 * Converts a basic code point into a digit/integer.
 * @see `digitToBasic()`
 * @private
 * @param {Number} codePoint The basic numeric code point value.
 * @returns {Number} The numeric value of a basic code point (for use in
 * representing integers) in the range `0` to `base - 1`, or `base` if
 * the code point does not represent a value.
 */
var basicToDigit = function basicToDigit(codePoint) {
	if (codePoint - 0x30 < 0x0A) {
		return codePoint - 0x16;
	}
	if (codePoint - 0x41 < 0x1A) {
		return codePoint - 0x41;
	}
	if (codePoint - 0x61 < 0x1A) {
		return codePoint - 0x61;
	}
	return base;
};

/**
 * Converts a digit/integer into a basic code point.
 * @see `basicToDigit()`
 * @private
 * @param {Number} digit The numeric value of a basic code point.
 * @returns {Number} The basic code point whose value (when used for
 * representing integers) is `digit`, which needs to be in the range
 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
 * used; else, the lowercase form is used. The behavior is undefined
 * if `flag` is non-zero and `digit` has no uppercase form.
 */
var digitToBasic = function digitToBasic(digit, flag) {
	//  0..25 map to ASCII a..z or A..Z
	// 26..35 map to ASCII 0..9
	return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 * @private
 */
var adapt = function adapt(delta, numPoints, firstTime) {
	var k = 0;
	delta = firstTime ? floor(delta / damp) : delta >> 1;
	delta += floor(delta / numPoints);
	for (; /* no initialization */delta > baseMinusTMin * tMax >> 1; k += base) {
		delta = floor(delta / baseMinusTMin);
	}
	return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
 * symbols.
 * @memberOf punycode
 * @param {String} input The Punycode string of ASCII-only symbols.
 * @returns {String} The resulting string of Unicode symbols.
 */
var decode = function decode(input) {
	// Don't use UCS-2.
	var output = [];
	var inputLength = input.length;
	var i = 0;
	var n = initialN;
	var bias = initialBias;

	// Handle the basic code points: let `basic` be the number of input code
	// points before the last delimiter, or `0` if there is none, then copy
	// the first basic code points to the output.

	var basic = input.lastIndexOf(delimiter);
	if (basic < 0) {
		basic = 0;
	}

	for (var j = 0; j < basic; ++j) {
		// if it's not a basic code point
		if (input.charCodeAt(j) >= 0x80) {
			error$1('not-basic');
		}
		output.push(input.charCodeAt(j));
	}

	// Main decoding loop: start just after the last delimiter if any basic code
	// points were copied; start at the beginning otherwise.

	for (var index = basic > 0 ? basic + 1 : 0; index < inputLength;) /* no final expression */{

		// `index` is the index of the next character to be consumed.
		// Decode a generalized variable-length integer into `delta`,
		// which gets added to `i`. The overflow checking is easier
		// if we increase `i` as we go, then subtract off its starting
		// value at the end to obtain `delta`.
		var oldi = i;
		for (var w = 1, k = base;; /* no condition */k += base) {

			if (index >= inputLength) {
				error$1('invalid-input');
			}

			var digit = basicToDigit(input.charCodeAt(index++));

			if (digit >= base || digit > floor((maxInt - i) / w)) {
				error$1('overflow');
			}

			i += digit * w;
			var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

			if (digit < t) {
				break;
			}

			var baseMinusT = base - t;
			if (w > floor(maxInt / baseMinusT)) {
				error$1('overflow');
			}

			w *= baseMinusT;
		}

		var out = output.length + 1;
		bias = adapt(i - oldi, out, oldi == 0);

		// `i` was supposed to wrap around from `out` to `0`,
		// incrementing `n` each time, so we'll fix that now:
		if (floor(i / out) > maxInt - n) {
			error$1('overflow');
		}

		n += floor(i / out);
		i %= out;

		// Insert `n` at position `i` of the output.
		output.splice(i++, 0, n);
	}

	return String.fromCodePoint.apply(String, output);
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 * @memberOf punycode
 * @param {String} input The string of Unicode symbols.
 * @returns {String} The resulting Punycode string of ASCII-only symbols.
 */
var encode = function encode(input) {
	var output = [];

	// Convert the input in UCS-2 to an array of Unicode code points.
	input = ucs2decode(input);

	// Cache the length.
	var inputLength = input.length;

	// Initialize the state.
	var n = initialN;
	var delta = 0;
	var bias = initialBias;

	// Handle the basic code points.
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var _currentValue2 = _step.value;

			if (_currentValue2 < 0x80) {
				output.push(stringFromCharCode(_currentValue2));
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	var basicLength = output.length;
	var handledCPCount = basicLength;

	// `handledCPCount` is the number of code points that have been handled;
	// `basicLength` is the number of basic code points.

	// Finish the basic string with a delimiter unless it's empty.
	if (basicLength) {
		output.push(delimiter);
	}

	// Main encoding loop:
	while (handledCPCount < inputLength) {

		// All non-basic code points < n have been handled already. Find the next
		// larger one:
		var m = maxInt;
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var currentValue = _step2.value;

				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow.
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		var handledCPCountPlusOne = handledCPCount + 1;
		if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
			error$1('overflow');
		}

		delta += (m - n) * handledCPCountPlusOne;
		n = m;

		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var _currentValue = _step3.value;

				if (_currentValue < n && ++delta > maxInt) {
					error$1('overflow');
				}
				if (_currentValue == n) {
					// Represent delta as a generalized variable-length integer.
					var q = delta;
					for (var k = base;; /* no condition */k += base) {
						var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
						if (q < t) {
							break;
						}
						var qMinusT = q - t;
						var baseMinusT = base - t;
						output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}

		++delta;
		++n;
	}
	return output.join('');
};

/**
 * Converts a Punycode string representing a domain name or an email address
 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
 * it doesn't matter if you call it on a string that has already been
 * converted to Unicode.
 * @memberOf punycode
 * @param {String} input The Punycoded domain name or email address to
 * convert to Unicode.
 * @returns {String} The Unicode representation of the given Punycode
 * string.
 */
var toUnicode = function toUnicode(input) {
	return mapDomain(input, function (string) {
		return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
	});
};

/**
 * Converts a Unicode string representing a domain name or an email address to
 * Punycode. Only the non-ASCII parts of the domain name will be converted,
 * i.e. it doesn't matter if you call it with a domain that's already in
 * ASCII.
 * @memberOf punycode
 * @param {String} input The domain name or email address to convert, as a
 * Unicode string.
 * @returns {String} The Punycode representation of the given domain name or
 * email address.
 */
var toASCII = function toASCII(input) {
	return mapDomain(input, function (string) {
		return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
	});
};

/*--------------------------------------------------------------------------*/

/** Define the public API */
var punycode = {
	/**
  * A string representing the current Punycode.js version number.
  * @memberOf punycode
  * @type String
  */
	'version': '2.1.0',
	/**
  * An object of methods to convert from JavaScript's internal character
  * representation (UCS-2) to Unicode code points, and back.
  * @see <https://mathiasbynens.be/notes/javascript-encoding>
  * @memberOf punycode
  * @type Object
  */
	'ucs2': {
		'decode': ucs2decode,
		'encode': ucs2encode
	},
	'decode': decode,
	'encode': encode,
	'toASCII': toASCII,
	'toUnicode': toUnicode
};

/**
 * URI.js
 *
 * @fileoverview An RFC 3986 compliant, scheme extendable URI parsing/validating/resolving library for JavaScript.
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/uri-js
 */
/**
 * Copyright 2011 Gary Court. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 *
 *    1. Redistributions of source code must retain the above copyright notice, this list of
 *       conditions and the following disclaimer.
 *
 *    2. Redistributions in binary form must reproduce the above copyright notice, this list
 *       of conditions and the following disclaimer in the documentation and/or other materials
 *       provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY GARY COURT ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GARY COURT OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of Gary Court.
 */
var SCHEMES = {};
function pctEncChar(chr) {
    var c = chr.charCodeAt(0);
    var e = void 0;
    if (c < 16) e = "%0" + c.toString(16).toUpperCase();else if (c < 128) e = "%" + c.toString(16).toUpperCase();else if (c < 2048) e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();else e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
    return e;
}
function pctDecChars(str) {
    var newStr = "";
    var i = 0;
    var il = str.length;
    while (i < il) {
        var c = parseInt(str.substr(i + 1, 2), 16);
        if (c < 128) {
            newStr += String.fromCharCode(c);
            i += 3;
        } else if (c >= 194 && c < 224) {
            if (il - i >= 6) {
                var c2 = parseInt(str.substr(i + 4, 2), 16);
                newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
            } else {
                newStr += str.substr(i, 6);
            }
            i += 6;
        } else if (c >= 224) {
            if (il - i >= 9) {
                var _c = parseInt(str.substr(i + 4, 2), 16);
                var c3 = parseInt(str.substr(i + 7, 2), 16);
                newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
            } else {
                newStr += str.substr(i, 9);
            }
            i += 9;
        } else {
            newStr += str.substr(i, 3);
            i += 3;
        }
    }
    return newStr;
}
function _normalizeComponentEncoding(components, protocol) {
    function decodeUnreserved(str) {
        var decStr = pctDecChars(str);
        return !decStr.match(protocol.UNRESERVED) ? str : decStr;
    }
    if (components.scheme) components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_SCHEME, "");
    if (components.userinfo !== undefined) components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.host !== undefined) components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.path !== undefined) components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.query !== undefined) components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.fragment !== undefined) components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    return components;
}

function _stripLeadingZeros(str) {
    return str.replace(/^0*(.*)/, "$1") || "0";
}
function _normalizeIPv4(host, protocol) {
    var matches = host.match(protocol.IPV4ADDRESS) || [];

    var _matches = slicedToArray(matches, 2),
        address = _matches[1];

    if (address) {
        return address.split(".").map(_stripLeadingZeros).join(".");
    } else {
        return host;
    }
}
function _normalizeIPv6(host, protocol) {
    var matches = host.match(protocol.IPV6ADDRESS) || [];

    var _matches2 = slicedToArray(matches, 3),
        address = _matches2[1],
        zone = _matches2[2];

    if (address) {
        var _address$toLowerCase$ = address.toLowerCase().split('::').reverse(),
            _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2),
            last = _address$toLowerCase$2[0],
            first = _address$toLowerCase$2[1];

        var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
        var lastFields = last.split(":").map(_stripLeadingZeros);
        var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
        var fieldCount = isLastFieldIPv4Address ? 7 : 8;
        var lastFieldsStart = lastFields.length - fieldCount;
        var fields = Array(fieldCount);
        for (var x = 0; x < fieldCount; ++x) {
            fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || '';
        }
        if (isLastFieldIPv4Address) {
            fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
        }
        var allZeroFields = fields.reduce(function (acc, field, index) {
            if (!field || field === "0") {
                var lastLongest = acc[acc.length - 1];
                if (lastLongest && lastLongest.index + lastLongest.length === index) {
                    lastLongest.length++;
                } else {
                    acc.push({ index: index, length: 1 });
                }
            }
            return acc;
        }, []);
        var longestZeroFields = allZeroFields.sort(function (a, b) {
            return b.length - a.length;
        })[0];
        var newHost = void 0;
        if (longestZeroFields && longestZeroFields.length > 1) {
            var newFirst = fields.slice(0, longestZeroFields.index);
            var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
            newHost = newFirst.join(":") + "::" + newLast.join(":");
        } else {
            newHost = fields.join(":");
        }
        if (zone) {
            newHost += "%" + zone;
        }
        return newHost;
    } else {
        return host;
    }
}
var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === undefined;
function parse(uriString) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var components = {};
    var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
    if (options.reference === "suffix") uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
    var matches = uriString.match(URI_PARSE);
    if (matches) {
        if (NO_MATCH_IS_UNDEFINED) {
            //store each component
            components.scheme = matches[1];
            components.userinfo = matches[3];
            components.host = matches[4];
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = matches[7];
            components.fragment = matches[8];
            //fix port number
            if (isNaN(components.port)) {
                components.port = matches[5];
            }
        } else {
            //IE FIX for improper RegExp matching
            //store each component
            components.scheme = matches[1] || undefined;
            components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : undefined;
            components.host = uriString.indexOf("//") !== -1 ? matches[4] : undefined;
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = uriString.indexOf("?") !== -1 ? matches[7] : undefined;
            components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : undefined;
            //fix port number
            if (isNaN(components.port)) {
                components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : undefined;
            }
        }
        if (components.host) {
            //normalize IP hosts
            components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
        }
        //determine reference type
        if (components.scheme === undefined && components.userinfo === undefined && components.host === undefined && components.port === undefined && !components.path && components.query === undefined) {
            components.reference = "same-document";
        } else if (components.scheme === undefined) {
            components.reference = "relative";
        } else if (components.fragment === undefined) {
            components.reference = "absolute";
        } else {
            components.reference = "uri";
        }
        //check for reference errors
        if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
            components.error = components.error || "URI is not a " + options.reference + " reference.";
        }
        //find scheme handler
        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
        //check if scheme can't handle IRIs
        if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
            //if host component is a domain name
            if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
                //convert Unicode IDN -> ASCII IDN
                try {
                    components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
                } catch (e) {
                    components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
                }
            }
            //convert IRI -> URI
            _normalizeComponentEncoding(components, URI_PROTOCOL);
        } else {
            //normalize encodings
            _normalizeComponentEncoding(components, protocol);
        }
        //perform scheme specific parsing
        if (schemeHandler && schemeHandler.parse) {
            schemeHandler.parse(components, options);
        }
    } else {
        components.error = components.error || "URI can not be parsed.";
    }
    return components;
}

function _recomposeAuthority(components, options) {
    var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
    var uriTokens = [];
    if (components.userinfo !== undefined) {
        uriTokens.push(components.userinfo);
        uriTokens.push("@");
    }
    if (components.host !== undefined) {
        //normalize IP hosts, add brackets and escape zone separator for IPv6
        uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function (_, $1, $2) {
            return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
        }));
    }
    if (typeof components.port === "number" || typeof components.port === "string") {
        uriTokens.push(":");
        uriTokens.push(String(components.port));
    }
    return uriTokens.length ? uriTokens.join("") : undefined;
}

var RDS1 = /^\.\.?\//;
var RDS2 = /^\/\.(\/|$)/;
var RDS3 = /^\/\.\.(\/|$)/;
var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
function removeDotSegments(input) {
    var output = [];
    while (input.length) {
        if (input.match(RDS1)) {
            input = input.replace(RDS1, "");
        } else if (input.match(RDS2)) {
            input = input.replace(RDS2, "/");
        } else if (input.match(RDS3)) {
            input = input.replace(RDS3, "/");
            output.pop();
        } else if (input === "." || input === "..") {
            input = "";
        } else {
            var im = input.match(RDS5);
            if (im) {
                var s = im[0];
                input = input.slice(s.length);
                output.push(s);
            } else {
                throw new Error("Unexpected dot segment condition");
            }
        }
    }
    return output.join("");
}

function serialize(components) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
    var uriTokens = [];
    //find scheme handler
    var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
    //perform scheme specific serialization
    if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(components, options);
    if (components.host) {
        //if host component is an IPv6 address
        if (protocol.IPV6ADDRESS.test(components.host)) {}
        //TODO: normalize IPv6 address as per RFC 5952

        //if host component is a domain name
        else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
                //convert IDN via punycode
                try {
                    components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
                } catch (e) {
                    components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                }
            }
    }
    //normalize encoding
    _normalizeComponentEncoding(components, protocol);
    if (options.reference !== "suffix" && components.scheme) {
        uriTokens.push(components.scheme);
        uriTokens.push(":");
    }
    var authority = _recomposeAuthority(components, options);
    if (authority !== undefined) {
        if (options.reference !== "suffix") {
            uriTokens.push("//");
        }
        uriTokens.push(authority);
        if (components.path && components.path.charAt(0) !== "/") {
            uriTokens.push("/");
        }
    }
    if (components.path !== undefined) {
        var s = components.path;
        if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
            s = removeDotSegments(s);
        }
        if (authority === undefined) {
            s = s.replace(/^\/\//, "/%2F"); //don't allow the path to start with "//"
        }
        uriTokens.push(s);
    }
    if (components.query !== undefined) {
        uriTokens.push("?");
        uriTokens.push(components.query);
    }
    if (components.fragment !== undefined) {
        uriTokens.push("#");
        uriTokens.push(components.fragment);
    }
    return uriTokens.join(""); //merge tokens into a string
}

function resolveComponents(base, relative) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var skipNormalization = arguments[3];

    var target = {};
    if (!skipNormalization) {
        base = parse(serialize(base, options), options); //normalize base components
        relative = parse(serialize(relative, options), options); //normalize relative components
    }
    options = options || {};
    if (!options.tolerant && relative.scheme) {
        target.scheme = relative.scheme;
        //target.authority = relative.authority;
        target.userinfo = relative.userinfo;
        target.host = relative.host;
        target.port = relative.port;
        target.path = removeDotSegments(relative.path || "");
        target.query = relative.query;
    } else {
        if (relative.userinfo !== undefined || relative.host !== undefined || relative.port !== undefined) {
            //target.authority = relative.authority;
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
        } else {
            if (!relative.path) {
                target.path = base.path;
                if (relative.query !== undefined) {
                    target.query = relative.query;
                } else {
                    target.query = base.query;
                }
            } else {
                if (relative.path.charAt(0) === "/") {
                    target.path = removeDotSegments(relative.path);
                } else {
                    if ((base.userinfo !== undefined || base.host !== undefined || base.port !== undefined) && !base.path) {
                        target.path = "/" + relative.path;
                    } else if (!base.path) {
                        target.path = relative.path;
                    } else {
                        target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
                    }
                    target.path = removeDotSegments(target.path);
                }
                target.query = relative.query;
            }
            //target.authority = base.authority;
            target.userinfo = base.userinfo;
            target.host = base.host;
            target.port = base.port;
        }
        target.scheme = base.scheme;
    }
    target.fragment = relative.fragment;
    return target;
}

function resolve(baseURI, relativeURI, options) {
    var schemelessOptions = assign({ scheme: 'null' }, options);
    return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
}

function normalize(uri, options) {
    if (typeof uri === "string") {
        uri = serialize(parse(uri, options), options);
    } else if (typeOf(uri) === "object") {
        uri = parse(serialize(uri, options), options);
    }
    return uri;
}

function equal(uriA, uriB, options) {
    if (typeof uriA === "string") {
        uriA = serialize(parse(uriA, options), options);
    } else if (typeOf(uriA) === "object") {
        uriA = serialize(uriA, options);
    }
    if (typeof uriB === "string") {
        uriB = serialize(parse(uriB, options), options);
    } else if (typeOf(uriB) === "object") {
        uriB = serialize(uriB, options);
    }
    return uriA === uriB;
}

function escapeComponent(str, options) {
    return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
}

function unescapeComponent(str, options) {
    return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
}

var handler = {
    scheme: "http",
    domainHost: true,
    parse: function parse(components, options) {
        //report missing host
        if (!components.host) {
            components.error = components.error || "HTTP URIs must have a host.";
        }
        return components;
    },
    serialize: function serialize(components, options) {
        var secure = String(components.scheme).toLowerCase() === "https";
        //normalize the default port
        if (components.port === (secure ? 443 : 80) || components.port === "") {
            components.port = undefined;
        }
        //normalize the empty path
        if (!components.path) {
            components.path = "/";
        }
        //NOTE: We do not parse query strings for HTTP URIs
        //as WWW Form Url Encoded query strings are part of the HTML4+ spec,
        //and not the HTTP spec.
        return components;
    }
};

var handler$1 = {
    scheme: "https",
    domainHost: handler.domainHost,
    parse: handler.parse,
    serialize: handler.serialize
};

function isSecure(wsComponents) {
    return typeof wsComponents.secure === 'boolean' ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
}
//RFC 6455
var handler$2 = {
    scheme: "ws",
    domainHost: true,
    parse: function parse(components, options) {
        var wsComponents = components;
        //indicate if the secure flag is set
        wsComponents.secure = isSecure(wsComponents);
        //construct resouce name
        wsComponents.resourceName = (wsComponents.path || '/') + (wsComponents.query ? '?' + wsComponents.query : '');
        wsComponents.path = undefined;
        wsComponents.query = undefined;
        return wsComponents;
    },
    serialize: function serialize(wsComponents, options) {
        //normalize the default port
        if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
            wsComponents.port = undefined;
        }
        //ensure scheme matches secure flag
        if (typeof wsComponents.secure === 'boolean') {
            wsComponents.scheme = wsComponents.secure ? 'wss' : 'ws';
            wsComponents.secure = undefined;
        }
        //reconstruct path from resource name
        if (wsComponents.resourceName) {
            var _wsComponents$resourc = wsComponents.resourceName.split('?'),
                _wsComponents$resourc2 = slicedToArray(_wsComponents$resourc, 2),
                path = _wsComponents$resourc2[0],
                query = _wsComponents$resourc2[1];

            wsComponents.path = path && path !== '/' ? path : undefined;
            wsComponents.query = query;
            wsComponents.resourceName = undefined;
        }
        //forbid fragment component
        wsComponents.fragment = undefined;
        return wsComponents;
    }
};

var handler$3 = {
    scheme: "wss",
    domainHost: handler$2.domainHost,
    parse: handler$2.parse,
    serialize: handler$2.serialize
};

var O = {};
var isIRI = true;
//RFC 3986
var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~" + (isIRI ? "\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF" : "") + "]";
var HEXDIG$$ = "[0-9A-Fa-f]"; //case-insensitive
var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)); //expanded
//RFC 5322, except these symbols as per RFC 6068: @ : / ? # [ ] & ; =
//const ATEXT$$ = "[A-Za-z0-9\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\_\\`\\{\\|\\}\\~]";
//const WSP$$ = "[\\x20\\x09]";
//const OBS_QTEXT$$ = "[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]";  //(%d1-8 / %d11-12 / %d14-31 / %d127)
//const QTEXT$$ = merge("[\\x21\\x23-\\x5B\\x5D-\\x7E]", OBS_QTEXT$$);  //%d33 / %d35-91 / %d93-126 / obs-qtext
//const VCHAR$$ = "[\\x21-\\x7E]";
//const WSP$$ = "[\\x20\\x09]";
//const OBS_QP$ = subexp("\\\\" + merge("[\\x00\\x0D\\x0A]", OBS_QTEXT$$));  //%d0 / CR / LF / obs-qtext
//const FWS$ = subexp(subexp(WSP$$ + "*" + "\\x0D\\x0A") + "?" + WSP$$ + "+");
//const QUOTED_PAIR$ = subexp(subexp("\\\\" + subexp(VCHAR$$ + "|" + WSP$$)) + "|" + OBS_QP$);
//const QUOTED_STRING$ = subexp('\\"' + subexp(FWS$ + "?" + QCONTENT$) + "*" + FWS$ + "?" + '\\"');
var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
var VCHAR$$ = merge(QTEXT$$, "[\\\"\\\\]");
var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
var UNRESERVED = new RegExp(UNRESERVED$$, "g");
var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
var NOT_HFVALUE = NOT_HFNAME;
function decodeUnreserved(str) {
    var decStr = pctDecChars(str);
    return !decStr.match(UNRESERVED) ? str : decStr;
}
var handler$4 = {
    scheme: "mailto",
    parse: function parse$$1(components, options) {
        var mailtoComponents = components;
        var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
        mailtoComponents.path = undefined;
        if (mailtoComponents.query) {
            var unknownHeaders = false;
            var headers = {};
            var hfields = mailtoComponents.query.split("&");
            for (var x = 0, xl = hfields.length; x < xl; ++x) {
                var hfield = hfields[x].split("=");
                switch (hfield[0]) {
                    case "to":
                        var toAddrs = hfield[1].split(",");
                        for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
                            to.push(toAddrs[_x]);
                        }
                        break;
                    case "subject":
                        mailtoComponents.subject = unescapeComponent(hfield[1], options);
                        break;
                    case "body":
                        mailtoComponents.body = unescapeComponent(hfield[1], options);
                        break;
                    default:
                        unknownHeaders = true;
                        headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
                        break;
                }
            }
            if (unknownHeaders) mailtoComponents.headers = headers;
        }
        mailtoComponents.query = undefined;
        for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
            var addr = to[_x2].split("@");
            addr[0] = unescapeComponent(addr[0]);
            if (!options.unicodeSupport) {
                //convert Unicode IDN -> ASCII IDN
                try {
                    addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
                } catch (e) {
                    mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
                }
            } else {
                addr[1] = unescapeComponent(addr[1], options).toLowerCase();
            }
            to[_x2] = addr.join("@");
        }
        return mailtoComponents;
    },
    serialize: function serialize$$1(mailtoComponents, options) {
        var components = mailtoComponents;
        var to = toArray(mailtoComponents.to);
        if (to) {
            for (var x = 0, xl = to.length; x < xl; ++x) {
                var toAddr = String(to[x]);
                var atIdx = toAddr.lastIndexOf("@");
                var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
                var domain = toAddr.slice(atIdx + 1);
                //convert IDN via punycode
                try {
                    domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
                } catch (e) {
                    components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                }
                to[x] = localPart + "@" + domain;
            }
            components.path = to.join(",");
        }
        var headers = mailtoComponents.headers = mailtoComponents.headers || {};
        if (mailtoComponents.subject) headers["subject"] = mailtoComponents.subject;
        if (mailtoComponents.body) headers["body"] = mailtoComponents.body;
        var fields = [];
        for (var name in headers) {
            if (headers[name] !== O[name]) {
                fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
            }
        }
        if (fields.length) {
            components.query = fields.join("&");
        }
        return components;
    }
};

var URN_PARSE = /^([^\:]+)\:(.*)/;
//RFC 2141
var handler$5 = {
    scheme: "urn",
    parse: function parse$$1(components, options) {
        var matches = components.path && components.path.match(URN_PARSE);
        var urnComponents = components;
        if (matches) {
            var scheme = options.scheme || urnComponents.scheme || "urn";
            var nid = matches[1].toLowerCase();
            var nss = matches[2];
            var urnScheme = scheme + ":" + (options.nid || nid);
            var schemeHandler = SCHEMES[urnScheme];
            urnComponents.nid = nid;
            urnComponents.nss = nss;
            urnComponents.path = undefined;
            if (schemeHandler) {
                urnComponents = schemeHandler.parse(urnComponents, options);
            }
        } else {
            urnComponents.error = urnComponents.error || "URN can not be parsed.";
        }
        return urnComponents;
    },
    serialize: function serialize$$1(urnComponents, options) {
        var scheme = options.scheme || urnComponents.scheme || "urn";
        var nid = urnComponents.nid;
        var urnScheme = scheme + ":" + (options.nid || nid);
        var schemeHandler = SCHEMES[urnScheme];
        if (schemeHandler) {
            urnComponents = schemeHandler.serialize(urnComponents, options);
        }
        var uriComponents = urnComponents;
        var nss = urnComponents.nss;
        uriComponents.path = (nid || options.nid) + ":" + nss;
        return uriComponents;
    }
};

var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
//RFC 4122
var handler$6 = {
    scheme: "urn:uuid",
    parse: function parse(urnComponents, options) {
        var uuidComponents = urnComponents;
        uuidComponents.uuid = uuidComponents.nss;
        uuidComponents.nss = undefined;
        if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
            uuidComponents.error = uuidComponents.error || "UUID is not valid.";
        }
        return uuidComponents;
    },
    serialize: function serialize(uuidComponents, options) {
        var urnComponents = uuidComponents;
        //normalize UUID
        urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
        return urnComponents;
    }
};

SCHEMES[handler.scheme] = handler;
SCHEMES[handler$1.scheme] = handler$1;
SCHEMES[handler$2.scheme] = handler$2;
SCHEMES[handler$3.scheme] = handler$3;
SCHEMES[handler$4.scheme] = handler$4;
SCHEMES[handler$5.scheme] = handler$5;
SCHEMES[handler$6.scheme] = handler$6;

exports.SCHEMES = SCHEMES;
exports.pctEncChar = pctEncChar;
exports.pctDecChars = pctDecChars;
exports.parse = parse;
exports.removeDotSegments = removeDotSegments;
exports.serialize = serialize;
exports.resolveComponents = resolveComponents;
exports.resolve = resolve;
exports.normalize = normalize;
exports.equal = equal;
exports.escapeComponent = escapeComponent;
exports.unescapeComponent = unescapeComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));


},{}]},{},[2])(2)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJMZXhDb2RlSG9va1Jlc3BvbnNlU2NoZW1hLmpzb24iLCJWYWxpZGF0ZUxhbWJkYVJlc3BvbnNlLmpzIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0LzIwMTkuanMiLCJub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS9jb2RlZ2VuL2NvZGUuanMiLCJub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS9jb2RlZ2VuL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvY29kZWdlbi9zY29wZS5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL2Vycm9ycy5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvbmFtZXMuanMiLCJub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS9yZWZfZXJyb3IuanMiLCJub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS9yZXNvbHZlLmpzIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvcnVsZXMuanMiLCJub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS91dGlsLmpzIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvdmFsaWRhdGUvYXBwbGljYWJpbGl0eS5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL3ZhbGlkYXRlL2Jvb2xTY2hlbWEuanMiLCJub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS92YWxpZGF0ZS9kYXRhVHlwZS5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL3ZhbGlkYXRlL2RlZmF1bHRzLmpzIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvdmFsaWRhdGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS92YWxpZGF0ZS9rZXl3b3JkLmpzIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvdmFsaWRhdGUvc3Vic2NoZW1hLmpzIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvcmUuanMiLCJub2RlX21vZHVsZXMvYWp2L2Rpc3QvcmVmcy9kYXRhLmpzb24iLCJub2RlX21vZHVsZXMvYWp2L2Rpc3QvcmVmcy9qc29uLXNjaGVtYS0yMDE5LTA5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3JlZnMvanNvbi1zY2hlbWEtMjAxOS0wOS9tZXRhL2FwcGxpY2F0b3IuanNvbiIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC9yZWZzL2pzb24tc2NoZW1hLTIwMTktMDkvbWV0YS9jb250ZW50Lmpzb24iLCJub2RlX21vZHVsZXMvYWp2L2Rpc3QvcmVmcy9qc29uLXNjaGVtYS0yMDE5LTA5L21ldGEvY29yZS5qc29uIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3JlZnMvanNvbi1zY2hlbWEtMjAxOS0wOS9tZXRhL2Zvcm1hdC5qc29uIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3JlZnMvanNvbi1zY2hlbWEtMjAxOS0wOS9tZXRhL21ldGEtZGF0YS5qc29uIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3JlZnMvanNvbi1zY2hlbWEtMjAxOS0wOS9tZXRhL3ZhbGlkYXRpb24uanNvbiIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC9yZWZzL2pzb24tc2NoZW1hLTIwMTktMDkvc2NoZW1hLmpzb24iLCJub2RlX21vZHVsZXMvYWp2L2Rpc3QvcnVudGltZS9lcXVhbC5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC9ydW50aW1lL3VjczJsZW5ndGguanMiLCJub2RlX21vZHVsZXMvYWp2L2Rpc3QvcnVudGltZS91cmkuanMiLCJub2RlX21vZHVsZXMvYWp2L2Rpc3QvcnVudGltZS92YWxpZGF0aW9uX2Vycm9yLmpzIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL2FkZGl0aW9uYWxJdGVtcy5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9hZGRpdGlvbmFsUHJvcGVydGllcy5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9hbGxPZi5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9hbnlPZi5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9jb250YWlucy5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9kZXBlbmRlbmNpZXMuanMiLCJub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2FwcGxpY2F0b3IvZGVwZW5kZW50U2NoZW1hcy5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9pZi5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9pdGVtcy5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9pdGVtczIwMjAuanMiLCJub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2FwcGxpY2F0b3Ivbm90LmpzIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL29uZU9mLmpzIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL3BhdHRlcm5Qcm9wZXJ0aWVzLmpzIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL3ByZWZpeEl0ZW1zLmpzIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL3Byb3BlcnRpZXMuanMiLCJub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2FwcGxpY2F0b3IvcHJvcGVydHlOYW1lcy5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci90aGVuRWxzZS5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvY29kZS5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvY29yZS9pZC5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvY29yZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvY29yZS9yZWYuanMiLCJub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2Rpc2NyaW1pbmF0b3IvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2Rpc2NyaW1pbmF0b3IvdHlwZXMuanMiLCJub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2RyYWZ0Ny5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvZHluYW1pYy9keW5hbWljQW5jaG9yLmpzIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9keW5hbWljL2R5bmFtaWNSZWYuanMiLCJub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2R5bmFtaWMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2R5bmFtaWMvcmVjdXJzaXZlQW5jaG9yLmpzIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9keW5hbWljL3JlY3Vyc2l2ZVJlZi5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvZm9ybWF0L2Zvcm1hdC5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvZm9ybWF0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9tZXRhZGF0YS5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvbmV4dC5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvdW5ldmFsdWF0ZWQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL3VuZXZhbHVhdGVkL3VuZXZhbHVhdGVkSXRlbXMuanMiLCJub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL3VuZXZhbHVhdGVkL3VuZXZhbHVhdGVkUHJvcGVydGllcy5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvdmFsaWRhdGlvbi9jb25zdC5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvdmFsaWRhdGlvbi9kZXBlbmRlbnRSZXF1aXJlZC5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvdmFsaWRhdGlvbi9lbnVtLmpzIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy92YWxpZGF0aW9uL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy92YWxpZGF0aW9uL2xpbWl0Q29udGFpbnMuanMiLCJub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL3ZhbGlkYXRpb24vbGltaXRJdGVtcy5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvdmFsaWRhdGlvbi9saW1pdExlbmd0aC5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvdmFsaWRhdGlvbi9saW1pdE51bWJlci5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvdmFsaWRhdGlvbi9saW1pdFByb3BlcnRpZXMuanMiLCJub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL3ZhbGlkYXRpb24vbXVsdGlwbGVPZi5qcyIsIm5vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvdmFsaWRhdGlvbi9wYXR0ZXJuLmpzIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy92YWxpZGF0aW9uL3JlcXVpcmVkLmpzIiwibm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy92YWxpZGF0aW9uL3VuaXF1ZUl0ZW1zLmpzIiwibm9kZV9tb2R1bGVzL2Zhc3QtZGVlcC1lcXVhbC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9qc29uLXNjaGVtYS10cmF2ZXJzZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy91cmktanMvZGlzdC9lczUvdXJpLmFsbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDemNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDek1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4bUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIkcmVmXCI6IFwiIy9kZWZpbml0aW9ucy9MZXhDb2RlSG9va1Jlc3BvbnNlXCIsXG4gIFwiJHNjaGVtYVwiOiBcImh0dHBzOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LzIwMTktMDkvc2NoZW1hXCIsXG4gIFwiZGVmaW5pdGlvbnNcIjoge1xuICAgIFwiQWN0aXZlQ29udGV4dFwiOiB7XG4gICAgICBcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCI6IGZhbHNlLFxuICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgXCJjb250ZXh0QXR0cmlidXRlc1wiOiB7XG4gICAgICAgICAgXCJhZGRpdGlvbmFsUHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIjxwPkEgbGlzdCBvZiBjb250ZXh0cyBhY3RpdmUgZm9yIHRoZSByZXF1ZXN0LiBBIGNvbnRleHQgY2FuIGJlIGFjdGl2YXRlZCB3aGVuIGEgcHJldmlvdXMgaW50ZW50IGlzIGZ1bGZpbGxlZCwgb3IgYnkgaW5jbHVkaW5nIHRoZSBjb250ZXh0IGluIHRoZSByZXF1ZXN0LjwvcD4gPHA+SWYgeW91IGRvbid0IHNwZWNpZnkgYSBsaXN0IG9mIGNvbnRleHRzLCBBbWF6b24gTGV4IFYyIHdpbGwgdXNlIHRoZSBjdXJyZW50IGxpc3Qgb2YgY29udGV4dHMgZm9yIHRoZSBzZXNzaW9uLiBJZiB5b3Ugc3BlY2lmeSBhbiBlbXB0eSBsaXN0LCBhbGwgY29udGV4dHMgZm9yIHRoZSBzZXNzaW9uIGFyZSBjbGVhcmVkLiA8L3A+XCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiPHA+VGhlIG5hbWUgb2YgdGhlIGNvbnRleHQuPC9wPlwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwidGltZVRvTGl2ZVwiOiB7XG4gICAgICAgICAgXCIkcmVmXCI6IFwiIy9kZWZpbml0aW9ucy9BY3RpdmVDb250ZXh0VGltZVRvTGl2ZVwiLFxuICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCI8cD5JbmRpY2F0ZXMgdGhlIG51bWJlciBvZiB0dXJucyBvciBzZWNvbmRzIHRoYXQgdGhlIGNvbnRleHQgaXMgYWN0aXZlLiBPbmNlIHRoZSB0aW1lIHRvIGxpdmUgZXhwaXJlcywgdGhlIGNvbnRleHQgaXMgbm8gbG9uZ2VyIHJldHVybmVkIGluIGEgcmVzcG9uc2UuPC9wPlwiXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcInJlcXVpcmVkXCI6IFtcbiAgICAgICAgXCJuYW1lXCIsXG4gICAgICAgIFwidGltZVRvTGl2ZVwiXG4gICAgICBdLFxuICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCJcbiAgICB9LFxuICAgIFwiQWN0aXZlQ29udGV4dFRpbWVUb0xpdmVcIjoge1xuICAgICAgXCJhZGRpdGlvbmFsUHJvcGVydGllc1wiOiBmYWxzZSxcbiAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgIFwidGltZVRvTGl2ZUluU2Vjb25kc1wiOiB7XG4gICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIjxwPlRoZSBudW1iZXIgb2Ygc2Vjb25kcyB0aGF0IHRoZSBjb250ZXh0IGlzIGFjdGl2ZS4gWW91IGNhbiBzcGVjaWZ5IGJldHdlZW4gNSBhbmQgODY0MDAgc2Vjb25kcyAoMjQgaG91cnMpLjwvcD5cIixcbiAgICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIlxuICAgICAgICB9LFxuICAgICAgICBcInR1cm5zVG9MaXZlXCI6IHtcbiAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiPHA+VGhlIG51bWJlciBvZiB0dXJucyB0aGF0IHRoZSBjb250ZXh0IGlzIGFjdGl2ZS4gWW91IGNhbiBzcGVjaWZ5IHVwIHRvIDIwIHR1cm5zLiBFYWNoIHJlcXVlc3QgYW5kIHJlc3BvbnNlIGZyb20gdGhlIGJvdCBpcyBhIHR1cm4uPC9wPlwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcInJlcXVpcmVkXCI6IFtcbiAgICAgICAgXCJ0dXJuc1RvTGl2ZVwiLFxuICAgICAgICBcInRpbWVUb0xpdmVJblNlY29uZHNcIlxuICAgICAgXSxcbiAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiXG4gICAgfSxcbiAgICBcIkF0dHJpYnV0ZXNcIjoge1xuICAgICAgXCJhZGRpdGlvbmFsUHJvcGVydGllc1wiOiB7XG4gICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICB9LFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIk1hcCBvZiBrZXkvdmFsdWUgcGFpcnNcIixcbiAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiXG4gICAgfSxcbiAgICBcIkJ1dHRvblwiOiB7XG4gICAgICBcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCI6IGZhbHNlLFxuICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgXCJ0ZXh0XCI6IHtcbiAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiPHA+VGhlIHRleHQgdGhhdCBpcyBkaXNwbGF5ZWQgb24gdGhlIGJ1dHRvbi48L3A+XCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ2YWx1ZVwiOiB7XG4gICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIjxwPlRoZSB2YWx1ZSByZXR1cm5lZCB0byBBbWF6b24gTGV4IFYyIHdoZW4gYSB1c2VyIGNob29zZXMgdGhlIGJ1dHRvbi48L3A+XCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiXG4gICAgfSxcbiAgICBcIkNvbmZpcm1hdGlvblN0YXRlXCI6IHtcbiAgICAgIFwiZW51bVwiOiBbXG4gICAgICAgIFwiQ29uZmlybWVkXCIsXG4gICAgICAgIFwiRGVuaWVkXCIsXG4gICAgICAgIFwiTm9uZVwiXG4gICAgICBdLFxuICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICB9LFxuICAgIFwiRGlhbG9nQWN0aW9uXCI6IHtcbiAgICAgIFwiYWRkaXRpb25hbFByb3BlcnRpZXNcIjogZmFsc2UsXG4gICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICBcInNsb3RFbGljaXRhdGlvblN0eWxlXCI6IHtcbiAgICAgICAgICBcIiRyZWZcIjogXCIjL2RlZmluaXRpb25zL1N0eWxlVHlwZVwiLFxuICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCI8cD5Db25maWd1cmVzIHRoZSBzbG90IHRvIHVzZSBzcGVsbC1ieS1sZXR0ZXIgb3Igc3BlbGwtYnktd29yZCBzdHlsZS4gV2hlbiB5b3UgdXNlIGEgc3R5bGUgb24gYSBzbG90LCB1c2VycyBjYW4gc3BlbGwgb3V0IHRoZWlyIGlucHV0IHRvIG1ha2UgaXQgY2xlYXIgdG8geW91ciBib3QuPC9wPiA8dWw+IDxsaT4gPHA+U3BlbGwgYnkgbGV0dGVyIC0gXFxcImJcXFwiIFxcXCJvXFxcIiBcXFwiYlxcXCI8L3A+IDwvbGk+IDxsaT4gPHA+U3BlbGwgYnkgd29yZCAtIFxcXCJiIGFzIGluIGJveVxcXCIgXFxcIm8gYXMgaW4gb3NjYXJcXFwiIFxcXCJiIGFzIGluIGJveVxcXCI8L3A+IDwvbGk+IDwvdWw+IDxwPkZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWUgPGEgaHJlZj1cXFwiaHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL2xleHYyL2xhdGVzdC9kZy91c2luZy1zcGVsbGluZy5odG1sXFxcIj4gVXNpbmcgc3BlbGxpbmcgdG8gZW50ZXIgc2xvdCB2YWx1ZXMgPC9hPi48L3A+XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJzbG90VG9FbGljaXRcIjoge1xuICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCI8cD5UaGUgbmFtZSBvZiB0aGUgc2xvdCB0aGF0IHNob3VsZCBiZSBlbGljaXRlZCBmcm9tIHRoZSB1c2VyLiBSZXF1aXJlZCBpZiB0aGUgdHlwZSBvZiBkaWFsb2dBY3Rpb24gaXMgRWxpY2l0U2xvdDwvcD5cIixcbiAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBcInN1YlNsb3RUb0VsaWNpdFwiOiB7XG4gICAgICAgICAgXCIkcmVmXCI6IFwiIy9kZWZpbml0aW9ucy9FbGljaXRTdWJTbG90XCIsXG4gICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIjxwPlRoZSBuYW1lIG9mIHRoZSBjb25zdGl0dWVudCBzdWIgc2xvdCBvZiB0aGUgY29tcG9zaXRlIHNsb3Qgc3BlY2lmaWVkIGluIHNsb3RUb0VsaWNpdCB0aGF0IHNob3VsZCBiZSBlbGljaXRlZCBmcm9tIHRoZSB1c2VyLjwvcD5cIlxuICAgICAgICB9LFxuICAgICAgICBcInR5cGVcIjoge1xuICAgICAgICAgIFwiJHJlZlwiOiBcIiMvZGVmaW5pdGlvbnMvRGlhbG9nQWN0aW9uVHlwZVwiLFxuICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCI8cD5UaGUgbmV4dCBhY3Rpb24gdGhhdCB0aGUgYm90IHNob3VsZCB0YWtlIGluIGl0cyBpbnRlcmFjdGlvbiB3aXRoIHRoZSB1c2VyLiBUaGUgcG9zc2libGUgdmFsdWVzIGFyZTo8L3A+IDx1bD4gPGxpPiA8cD4gIDxjb2RlPkNsb3NlPC9jb2RlPiAtIEluZGljYXRlcyB0aGF0IHRoZXJlIHdpbGwgbm90IGJlIGEgcmVzcG9uc2UgZnJvbSB0aGUgdXNlci4gRm9yIGV4YW1wbGUsIHRoZSBzdGF0ZW1lbnQgXFxcIllvdXIgb3JkZXIgaGFzIGJlZW4gcGxhY2VkXFxcIiBkb2VzIG5vdCByZXF1aXJlIGEgcmVzcG9uc2UuPC9wPiA8L2xpPiA8bGk+IDxwPiAgPGNvZGU+Q29uZmlybUludGVudDwvY29kZT4gLSBUaGUgbmV4dCBhY3Rpb24gaXMgYXNraW5nIHRoZSB1c2VyIGlmIHRoZSBpbnRlbnQgaXMgY29tcGxldGUgYW5kIHJlYWR5IHRvIGJlIGZ1bGZpbGxlZC4gVGhpcyBpcyBhIHllcy9ubyBxdWVzdGlvbiBzdWNoIGFzIFxcXCJQbGFjZSB0aGUgb3JkZXI/XFxcIjwvcD4gPC9saT4gPGxpPiA8cD4gIDxjb2RlPkRlbGVnYXRlPC9jb2RlPiAtIFRoZSBuZXh0IGFjdGlvbiBpcyBkZXRlcm1pbmVkIGJ5IEFtYXpvbiBMZXggVjIuPC9wPiA8L2xpPiA8bGk+IDxwPiAgPGNvZGU+RWxpY2l0SW50ZW50PC9jb2RlPiAtIFRoZSBuZXh0IGFjdGlvbiBpcyB0byBlbGljaXQgYW4gaW50ZW50IGZyb20gdGhlIHVzZXIuPC9wPiA8L2xpPiA8bGk+IDxwPiAgPGNvZGU+RWxpY2l0U2xvdDwvY29kZT4gLSBUaGUgbmV4dCBhY3Rpb24gaXMgdG8gZWxpY2l0IGEgc2xvdCB2YWx1ZSBmcm9tIHRoZSB1c2VyLjwvcD4gPC9saT4gPC91bD5cIlxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJyZXF1aXJlZFwiOiBbXG4gICAgICAgIFwidHlwZVwiXG4gICAgICBdLFxuICAgICAgXCJpZlwiOiB7XG4gICAgICAgIFwiYW55T2ZcIjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJjb25zdFwiOiBcIkVsaWNpdFNsb3RcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgXCJ0aGVuXCI6IHtcbiAgICAgICAgXCJyZXF1aXJlZFwiOiBbXG4gICAgICAgICAgXCJzbG90VG9FbGljaXRcIlxuICAgICAgICBdLFxuICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgIFwic2xvdFRvRWxpY2l0XCI6IHtcbiAgICAgICAgICAgIFwibWluTGVuZ3RoXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcInR5cGVcIjogXCJvYmplY3RcIlxuICAgIH0sXG4gICAgXCJEaWFsb2dBY3Rpb25UeXBlXCI6IHtcbiAgICAgIFwiZW51bVwiOiBbXG4gICAgICAgIFwiQ2xvc2VcIixcbiAgICAgICAgXCJDb25maXJtSW50ZW50XCIsXG4gICAgICAgIFwiRGVsZWdhdGVcIixcbiAgICAgICAgXCJFbGljaXRJbnRlbnRcIixcbiAgICAgICAgXCJFbGljaXRTbG90XCIsXG4gICAgICAgIFwiTm9uZVwiXG4gICAgICBdLFxuICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICB9LFxuICAgIFwiRWxpY2l0U3ViU2xvdFwiOiB7XG4gICAgICBcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCI6IGZhbHNlLFxuICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiPHA+VGhlIG5hbWUgb2YgdGhlIHNsb3QgdGhhdCBzaG91bGQgYmUgZWxpY2l0ZWQgZnJvbSB0aGUgdXNlci48L3A+XCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJzdWJTbG90VG9FbGljaXRcIjoge1xuICAgICAgICAgIFwiJHJlZlwiOiBcIiMvZGVmaW5pdGlvbnMvRWxpY2l0U3ViU2xvdFwiLFxuICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCI8cD5UaGUgZmllbGQgaXMgbm90IHN1cHBvcnRlZC48L3A+XCJcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiXG4gICAgfSxcbiAgICBcIkltYWdlUmVzcG9uc2VDYXJkXCI6IHtcbiAgICAgIFwiYWRkaXRpb25hbFByb3BlcnRpZXNcIjogZmFsc2UsXG4gICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICBcImJ1dHRvbnNcIjoge1xuICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCI8cD5BIGxpc3Qgb2YgYnV0dG9ucyB0aGF0IHNob3VsZCBiZSBkaXNwbGF5ZWQgb24gdGhlIHJlc3BvbnNlIGNhcmQuIFRoZSBhcnJhbmdlbWVudCBvZiB0aGUgYnV0dG9ucyBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBwbGF0Zm9ybSB0aGF0IGRpc3BsYXlzIHRoZSBidXR0b24uPC9wPlwiLFxuICAgICAgICAgIFwiaXRlbXNcIjoge1xuICAgICAgICAgICAgXCIkcmVmXCI6IFwiIy9kZWZpbml0aW9ucy9CdXR0b25cIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiYXJyYXlcIlxuICAgICAgICB9LFxuICAgICAgICBcImltYWdlVXJsXCI6IHtcbiAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiPHA+VGhlIFVSTCBvZiBhbiBpbWFnZSB0byBkaXNwbGF5IG9uIHRoZSByZXNwb25zZSBjYXJkLiBUaGUgaW1hZ2UgVVJMIG11c3QgYmUgcHVibGljbHkgYXZhaWxhYmxlIHNvIHRoYXQgdGhlIHBsYXRmb3JtIGRpc3BsYXlpbmcgdGhlIHJlc3BvbnNlIGNhcmQgaGFzIGFjY2VzcyB0byB0aGUgaW1hZ2UuPC9wPlwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwic3VidGl0bGVcIjoge1xuICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCI8cD5UaGUgc3VidGl0bGUgdG8gZGlzcGxheSBvbiB0aGUgcmVzcG9uc2UgY2FyZC4gVGhlIGZvcm1hdCBvZiB0aGUgc3VidGl0bGUgaXMgZGV0ZXJtaW5lZCBieSB0aGUgcGxhdGZvcm0gZGlzcGxheWluZyB0aGUgcmVzcG9uc2UgY2FyZC48L3A+XCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0aXRsZVwiOiB7XG4gICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIjxwPlRoZSB0aXRsZSB0byBkaXNwbGF5IG9uIHRoZSByZXNwb25zZSBjYXJkLiBUaGUgZm9ybWF0IG9mIHRoZSB0aXRsZSBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBwbGF0Zm9ybSBkaXNwbGF5aW5nIHRoZSByZXNwb25zZSBjYXJkLjwvcD5cIixcbiAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJyZXF1aXJlZFwiOiBbXG4gICAgICAgIFwidGl0bGVcIlxuICAgICAgXSxcbiAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiXG4gICAgfSxcbiAgICBcIkludGVudFwiOiB7XG4gICAgICBcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCI6IGZhbHNlLFxuICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgXCJjb25maXJtYXRpb25TdGF0ZVwiOiB7XG4gICAgICAgICAgXCIkcmVmXCI6IFwiIy9kZWZpbml0aW9ucy9Db25maXJtYXRpb25TdGF0ZVwiLFxuICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCI8cD5Db250YWlucyBpbmZvcm1hdGlvbiBhYm91dCB3aGV0aGVyIGZ1bGZpbGxtZW50IG9mIHRoZSBpbnRlbnQgaGFzIGJlZW4gY29uZmlybWVkLjwvcD5cIlxuICAgICAgICB9LFxuICAgICAgICBcIm5hbWVcIjoge1xuICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCI8cD5UaGUgbmFtZSBvZiB0aGUgaW50ZW50LjwvcD5cIixcbiAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBcInNsb3RzXCI6IHtcbiAgICAgICAgICBcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgIFwiJHJlZlwiOiBcIiMvZGVmaW5pdGlvbnMvU2xvdFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiPHA+QSBtYXAgb2YgYWxsIG9mIHRoZSBzbG90cyBmb3IgdGhlIGludGVudC4gVGhlIG5hbWUgb2YgdGhlIHNsb3QgbWFwcyB0byB0aGUgdmFsdWUgb2YgdGhlIHNsb3QuIElmIGEgc2xvdCBoYXMgbm90IGJlZW4gZmlsbGVkLCB0aGUgdmFsdWUgaXMgbnVsbC48L3A+XCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJzdGF0ZVwiOiB7XG4gICAgICAgICAgXCIkcmVmXCI6IFwiIy9kZWZpbml0aW9ucy9JbnRlbnRTdGF0ZVwiLFxuICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCI8cD5Db250YWlucyBmdWxmaWxsbWVudCBpbmZvcm1hdGlvbiBmb3IgdGhlIGludGVudC4gPC9wPlwiXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcInR5cGVcIjogXCJvYmplY3RcIlxuICAgIH0sXG4gICAgXCJJbnRlbnRTdGF0ZVwiOiB7XG4gICAgICBcImVudW1cIjogW1xuICAgICAgICBcIkZhaWxlZFwiLFxuICAgICAgICBcIkZ1bGZpbGxlZFwiLFxuICAgICAgICBcIkluUHJvZ3Jlc3NcIixcbiAgICAgICAgXCJSZWFkeUZvckZ1bGZpbGxtZW50XCJcbiAgICAgIF0sXG4gICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgIH0sXG4gICAgXCJMYW1iZGFDb2RlSG9va1Nlc3Npb25TdGF0ZVwiOiB7XG4gICAgICBcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCI6IGZhbHNlLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZSBMYW1iZGEgZnVuY3Rpb24gZXZlbnQgU2Vzc2lvbiBzdGF0ZSBkaWZmZXJzIGZyb20gdGhlIEFQSV9ydW50aW1lX1Nlc3Npb25TdGF0ZSBiZWNhdXNlIG9mIHRoZSBmb3JtYXQgb2YgdGhlIEludGVudFwiLFxuICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgXCJhY3RpdmVDb250ZXh0c1wiOiB7XG4gICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIjxwPk9uZSBvciBtb3JlIGNvbnRleHRzIHRoYXQgaW5kaWNhdGUgdG8gQW1hem9uIExleCBWMiB0aGUgY29udGV4dCBvZiBhIHJlcXVlc3QuIFdoZW4gYSBjb250ZXh0IGlzIGFjdGl2ZSwgQW1hem9uIExleCBWMiBjb25zaWRlcnMgaW50ZW50cyB3aXRoIHRoZSBtYXRjaGluZyBjb250ZXh0IGFzIGEgdHJpZ2dlciBhcyB0aGUgbmV4dCBpbnRlbnQgaW4gYSBzZXNzaW9uLjwvcD5cIixcbiAgICAgICAgICBcIml0ZW1zXCI6IHtcbiAgICAgICAgICAgIFwiJHJlZlwiOiBcIiMvZGVmaW5pdGlvbnMvQWN0aXZlQ29udGV4dFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInR5cGVcIjogXCJhcnJheVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZGlhbG9nQWN0aW9uXCI6IHtcbiAgICAgICAgICBcIiRyZWZcIjogXCIjL2RlZmluaXRpb25zL0RpYWxvZ0FjdGlvblwiLFxuICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCI8cD5UaGUgbmV4dCBzdGVwIHRoYXQgQW1hem9uIExleCBWMiBzaG91bGQgdGFrZSBpbiB0aGUgY29udmVyc2F0aW9uIHdpdGggYSB1c2VyLjwvcD5cIlxuICAgICAgICB9LFxuICAgICAgICBcImludGVudFwiOiB7XG4gICAgICAgICAgXCIkcmVmXCI6IFwiIy9kZWZpbml0aW9ucy9JbnRlbnRcIixcbiAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiPHA+VGhlIGFjdGl2ZSBpbnRlbnQgdGhhdCBBbWF6b24gTGV4IFYyIGlzIHByb2Nlc3NpbmcuPC9wPlwiXG4gICAgICAgIH0sXG4gICAgICAgIFwib3JpZ2luYXRpbmdSZXF1ZXN0SWRcIjoge1xuICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCI8cD5BIHVuaXF1ZSBpZGVudGlmaWVyIGZvciBhIHNwZWNpZmljIHJlcXVlc3QuPC9wPlwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwicnVudGltZUhpbnRzXCI6IHtcbiAgICAgICAgICBcIiRyZWZcIjogXCIjL2RlZmluaXRpb25zL1J1bnRpbWVIaW50c1wiLFxuICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCI8cD5IaW50cyBmb3IgcGhyYXNlcyB0aGF0IGEgY3VzdG9tZXIgaXMgbGlrZWx5IHRvIHVzZSBmb3IgYSBzbG90LiBBbWF6b24gTGV4IFYyIHVzZXMgdGhlIGhpbnRzIHRvIGhlbHAgZGV0ZXJtaW5lIHRoZSBjb3JyZWN0IHZhbHVlIG9mIGEgc2xvdC48L3A+XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXNzaW9uQXR0cmlidXRlc1wiOiB7XG4gICAgICAgICAgXCIkcmVmXCI6IFwiIy9kZWZpbml0aW9ucy9BdHRyaWJ1dGVzXCIsXG4gICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIjxwPk1hcCBvZiBrZXkvdmFsdWUgcGFpcnMgcmVwcmVzZW50aW5nIHNlc3Npb24tc3BlY2lmaWMgY29udGV4dCBpbmZvcm1hdGlvbi4gSXQgY29udGFpbnMgYXBwbGljYXRpb24gaW5mb3JtYXRpb24gcGFzc2VkIGJldHdlZW4gQW1hem9uIExleCBWMiBhbmQgYSBjbGllbnQgYXBwbGljYXRpb24uPC9wPlwiXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcInJlcXVpcmVkXCI6IFtcbiAgICAgICAgXCJzZXNzaW9uQXR0cmlidXRlc1wiLFxuICAgICAgICBcImRpYWxvZ0FjdGlvblwiXG4gICAgICBdLFxuICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCJcbiAgICB9LFxuICAgIFwiTGV4Q29kZUhvb2tSZXNwb25zZVwiOiB7XG4gICAgICBcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCI6IGZhbHNlLFxuICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgXCJtZXNzYWdlc1wiOiB7XG4gICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIk9uZSBvciBtb3JlIG1lc3NhZ2VzIHRoYXQgQW1hem9uIExleCBWMiBzaG93cyB0byB0aGUgY3VzdG9tZXIgdG8gcGVyZm9ybSB0aGUgbmV4dCB0dXJuIG9mIHRoZSBjb252ZXJzYXRpb24uIElmIHlvdSBkb24ndCBzdXBwbHkgbWVzc2FnZXMsIEFtYXpvbiBMZXggVjIgdXNlcyB0aGUgYXBwcm9wcmlhdGUgbWVzc2FnZSBkZWZpbmVkIHdoZW4gdGhlIGJvdCB3YXMgY3JlYXRlZFxcblxcblJlcXVpcmVkIGlmIGRpYWxvZ0FjdGlvbi50eXBlIGlzIEVsaWNpdEludGVudC5cIixcbiAgICAgICAgICBcIml0ZW1zXCI6IHtcbiAgICAgICAgICAgIFwiJHJlZlwiOiBcIiMvZGVmaW5pdGlvbnMvTWVzc2FnZVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInR5cGVcIjogXCJhcnJheVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVxdWVzdEF0dHJpYnV0ZXNcIjoge1xuICAgICAgICAgIFwiJHJlZlwiOiBcIiMvZGVmaW5pdGlvbnMvQXR0cmlidXRlc1wiLFxuICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJSZXF1ZXN0LXNwZWNpZmljIGF0dHJpYnV0ZXNcIlxuICAgICAgICB9LFxuICAgICAgICBcInNlc3Npb25TdGF0ZVwiOiB7XG4gICAgICAgICAgXCIkcmVmXCI6IFwiIy9kZWZpbml0aW9ucy9MYW1iZGFDb2RlSG9va1Nlc3Npb25TdGF0ZVwiLFxuICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgY29udmVyc2F0aW9uIHdpdGggdGhlIHVzZXIuXFxuXFxuVGhlIGFjdHVhbCBjb250ZW50cyBvZiB0aGUgc3RydWN0dXJlIGRlcGVuZHMgb24gdGhlIHR5cGUgb2YgZGlhbG9nIGFjdGlvbi5cIlxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJyZXF1aXJlZFwiOiBbXG4gICAgICAgIFwic2Vzc2lvblN0YXRlXCJcbiAgICAgIF0sXG4gICAgICBcImlmXCI6IHtcbiAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICBcInNlc3Npb25TdGF0ZVwiOiB7XG4gICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICBcImRpYWxvZ0FjdGlvblwiOiB7XG4gICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCIgOiB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNvbnN0XCI6IFwiRWxpY2l0SW50ZW50XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJ0aGVuXCI6IHtcbiAgICAgICAgXCJyZXF1aXJlZFwiOiBbXCJtZXNzYWdlc1wiXSxcbiAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluSXRlbXNcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwiZWxzZVwiIDoge1xuICAgICAgICBcInJlcXVpcmVkXCI6W11cbiAgICAgIH0sXG4gICAgICBcInR5cGVcIjogXCJvYmplY3RcIlxuICAgIH0sXG4gICAgXCJNZXNzYWdlXCI6IHtcbiAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgICAgXCJhZGRpdGlvbmFsUHJvcGVydGllc1wiOiBmYWxzZSxcbiAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgIFwiY29udGVudFwiOiB7XG4gICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIjxwPlRoZSB0ZXh0IG9mIHRoZSBtZXNzYWdlLjwvcD5cIixcbiAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBcImNvbnRlbnRUeXBlXCI6IHtcbiAgICAgICAgICBcIiRyZWZcIjogXCIjL2RlZmluaXRpb25zL01lc3NhZ2VDb250ZW50VHlwZVwiLFxuICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCI8cD5JbmRpY2F0ZXMgdGhlIHR5cGUgb2YgcmVzcG9uc2UuPC9wPlwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiaW1hZ2VSZXNwb25zZUNhcmRcIjoge1xuICAgICAgICAgIFwiJHJlZlwiOiBcIiMvZGVmaW5pdGlvbnMvSW1hZ2VSZXNwb25zZUNhcmRcIixcbiAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiPHA+QSBjYXJkIHRoYXQgaXMgc2hvd24gdG8gdGhlIHVzZXIgYnkgYSBtZXNzYWdpbmcgcGxhdGZvcm0uIFlvdSBkZWZpbmUgdGhlIGNvbnRlbnRzIG9mIHRoZSBjYXJkLCB0aGUgY2FyZCBpcyBkaXNwbGF5ZWQgYnkgdGhlIHBsYXRmb3JtLiA8L3A+IDxwPldoZW4geW91IHVzZSBhIHJlc3BvbnNlIGNhcmQsIHRoZSByZXNwb25zZSBmcm9tIHRoZSB1c2VyIGlzIGNvbnN0cmFpbmVkIHRvIHRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCBhIGJ1dHRvbiBvbiB0aGUgY2FyZC48L3A+XCJcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwicmVxdWlyZWRcIjogW1xuICAgICAgICBcImNvbnRlbnRUeXBlXCJcbiAgICAgIF0sXG4gICAgICBcImlmXCI6IHtcbiAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICBcImNvbnRlbnRUeXBlXCI6IHtcbiAgICAgICAgICAgIFwiY29uc3RcIjogXCJJbWFnZVJlc3BvbnNlQ2FyZFwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJ0aGVuXCI6IHtcbiAgICAgICAgXCJyZXF1aXJlZFwiOiBbXG4gICAgICAgICAgXCJpbWFnZVJlc3BvbnNlQ2FyZFwiXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBcImVsc2VcIjoge1xuICAgICAgICBcInJlcXVpcmVkXCI6IFtcbiAgICAgICAgICBcImNvbnRlbnRcIlxuICAgICAgICBdXG4gICAgICB9XG4gICAgfSxcbiAgICBcIk1lc3NhZ2VDb250ZW50VHlwZVwiOiB7XG4gICAgICBcImVudW1cIjogW1xuICAgICAgICBcIkN1c3RvbVBheWxvYWRcIixcbiAgICAgICAgXCJJbWFnZVJlc3BvbnNlQ2FyZFwiLFxuICAgICAgICBcIlBsYWluVGV4dFwiLFxuICAgICAgICBcIlNTTUxcIlxuICAgICAgXSxcbiAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgfSxcbiAgICBcIlJ1bnRpbWVIaW50RGV0YWlsc1wiOiB7XG4gICAgICBcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCI6IGZhbHNlLFxuICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgXCJydW50aW1lSGludFZhbHVlc1wiOiB7XG4gICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIjxwPk9uZSBvciBtb3JlIHN0cmluZ3MgdGhhdCBBbWF6b24gTGV4IFYyIHNob3VsZCBsb29rIGZvciBpbiB0aGUgaW5wdXQgdG8gdGhlIGJvdC4gRWFjaCBwaHJhc2UgaXMgZ2l2ZW4gcHJlZmVyZW5jZSB3aGVuIGRlY2lkaW5nIG9uIHNsb3QgdmFsdWVzLjwvcD5cIixcbiAgICAgICAgICBcIml0ZW1zXCI6IHtcbiAgICAgICAgICAgIFwiJHJlZlwiOiBcIiMvZGVmaW5pdGlvbnMvUnVudGltZUhpbnRWYWx1ZVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInR5cGVcIjogXCJhcnJheVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwic3ViU2xvdEhpbnRzXCI6IHtcbiAgICAgICAgICBcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgIFwiJHJlZlwiOiBcIiMvZGVmaW5pdGlvbnMvUnVudGltZUhpbnREZXRhaWxzXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCI8cD5BIG1hcCBvZiBjb25zdGl0dWVudCBzdWIgc2xvdCBuYW1lcyBpbnNpZGUgYSBjb21wb3NpdGUgc2xvdCBpbiB0aGUgaW50ZW50IGFuZCB0aGUgcGhyYXNlcyB0aGF0IHNob3VsZCBiZSBhZGRlZCBmb3IgZWFjaCBzdWIgc2xvdC4gSW5zaWRlIGVhY2ggY29tcG9zaXRlIHNsb3QgaGludHMsIHRoaXMgc3RydWN0dXJlIHByb3ZpZGVzIGEgbWVjaGFuaXNtIHRvIGFkZCBncmFudWxhciBzdWIgc2xvdCBwaHJhc2VzLiBPbmx5IHN1YiBzbG90IGhpbnRzIGFyZSBzdXBwb3J0ZWQgZm9yIGNvbXBvc2l0ZSBzbG90cy4gVGhlIGludGVudCBuYW1lLCBjb21wb3NpdGUgc2xvdCBuYW1lIGFuZCB0aGUgY29uc3RpdHVlbnQgc3ViIHNsb3QgbmFtZXMgbXVzdCBleGlzdC48L3A+XCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCJcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiXG4gICAgfSxcbiAgICBcIlJ1bnRpbWVIaW50VmFsdWVcIjoge1xuICAgICAgXCJhZGRpdGlvbmFsUHJvcGVydGllc1wiOiBmYWxzZSxcbiAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgIFwicGhyYXNlXCI6IHtcbiAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiPHA+VGhlIHBocmFzZSB0aGF0IEFtYXpvbiBMZXggVjIgc2hvdWxkIGxvb2sgZm9yIGluIHRoZSB1c2VyJ3MgaW5wdXQgdG8gdGhlIGJvdC48L3A+XCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiXG4gICAgfSxcbiAgICBcIlJ1bnRpbWVIaW50c1wiOiB7XG4gICAgICBcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCI6IGZhbHNlLFxuICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgXCJzbG90SGludHNcIjoge1xuICAgICAgICAgIFwiYWRkaXRpb25hbFByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgXCJhZGRpdGlvbmFsUHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgIFwiJHJlZlwiOiBcIiMvZGVmaW5pdGlvbnMvUnVudGltZUhpbnREZXRhaWxzXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIjxwPkEgbGlzdCBvZiB0aGUgc2xvdHMgaW4gdGhlIGludGVudCB0aGF0IHNob3VsZCBoYXZlIHJ1bnRpbWUgaGludHMgYWRkZWQsIGFuZCB0aGUgcGhyYXNlcyB0aGF0IHNob3VsZCBiZSBhZGRlZCBmb3IgZWFjaCBzbG90LjwvcD4gPHA+VGhlIGZpcnN0IGxldmVsIG9mIHRoZSA8Y29kZT5zbG90SGludHM8L2NvZGU+IG1hcCBpcyB0aGUgbmFtZSBvZiB0aGUgaW50ZW50LiBUaGUgc2Vjb25kIGxldmVsIGlzIHRoZSBuYW1lIG9mIHRoZSBzbG90IHdpdGhpbiB0aGUgaW50ZW50LiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIDxhIGhyZWY9XFxcImh0dHBzOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9sZXh2Mi9sYXRlc3QvZGcvdXNpbmctaGludHMuaHRtbFxcXCI+VXNpbmcgaGludHMgdG8gaW1wcm92ZSBhY2N1cmFjeTwvYT4uPC9wPiA8cD5UaGUgaW50ZW50IG5hbWUgYW5kIHNsb3QgbmFtZSBtdXN0IGV4aXN0LjwvcD5cIixcbiAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIlxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCJcbiAgICB9LFxuICAgIFwiU2hhcGVcIjoge1xuICAgICAgXCJlbnVtXCI6IFtcbiAgICAgICAgXCJDb21wb3NpdGVcIixcbiAgICAgICAgXCJMaXN0XCIsXG4gICAgICAgIFwiU2NhbGFyXCJcbiAgICAgIF0sXG4gICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgIH0sXG4gICAgXCJTbG90XCI6IHtcbiAgICAgIFwiYWRkaXRpb25hbFByb3BlcnRpZXNcIjogZmFsc2UsXG4gICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICBcInNoYXBlXCI6IHtcbiAgICAgICAgICBcIiRyZWZcIjogXCIjL2RlZmluaXRpb25zL1NoYXBlXCIsXG4gICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIjxwPldoZW4gdGhlIDxjb2RlPnNoYXBlPC9jb2RlPiB2YWx1ZSBpcyA8Y29kZT5MaXN0PC9jb2RlPiwgaXQgaW5kaWNhdGVzIHRoYXQgdGhlIDxjb2RlPnZhbHVlczwvY29kZT4gZmllbGQgY29udGFpbnMgYSBsaXN0IG9mIHNsb3QgdmFsdWVzLiBXaGVuIHRoZSB2YWx1ZSBpcyA8Y29kZT5TY2FsYXI8L2NvZGU+LCBpdCBpbmRpY2F0ZXMgdGhhdCB0aGUgPGNvZGU+dmFsdWU8L2NvZGU+IGZpZWxkIGNvbnRhaW5zIGEgc2luZ2xlIHZhbHVlLjwvcD5cIlxuICAgICAgICB9LFxuICAgICAgICBcInN1YlNsb3RzXCI6IHtcbiAgICAgICAgICBcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgIFwiJHJlZlwiOiBcIiMvZGVmaW5pdGlvbnMvU2xvdFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiPHA+VGhlIGNvbnN0aXR1ZW50IHN1YiBzbG90cyBvZiBhIGNvbXBvc2l0ZSBzbG90LjwvcD5cIixcbiAgICAgICAgICBcInR5cGVcIjogXCJvYmplY3RcIlxuICAgICAgICB9LFxuICAgICAgICBcInZhbHVlXCI6IHtcbiAgICAgICAgICBcIiRyZWZcIjogXCIjL2RlZmluaXRpb25zL1ZhbHVlXCIsXG4gICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIjxwPlRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBzbG90LjwvcD5cIlxuICAgICAgICB9LFxuICAgICAgICBcInZhbHVlc1wiOiB7XG4gICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIjxwPkEgbGlzdCBvZiBvbmUgb3IgbW9yZSB2YWx1ZXMgdGhhdCB0aGUgdXNlciBwcm92aWRlZCBmb3IgdGhlIHNsb3QuIEZvciBleGFtcGxlLCBpZiBhIGZvciBhIHNsb3QgdGhhdCBlbGljaXRzIHBpenphIHRvcHBpbmdzLCB0aGUgdmFsdWVzIG1pZ2h0IGJlIFxcXCJwZXBwZXJvbmlcXFwiIGFuZCBcXFwicGluZWFwcGxlLlxcXCIgPC9wPlwiLFxuICAgICAgICAgIFwiaXRlbXNcIjoge1xuICAgICAgICAgICAgXCIkcmVmXCI6IFwiIy9kZWZpbml0aW9ucy9TbG90XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidHlwZVwiOiBcImFycmF5XCJcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwidHlwZVwiOiBbXCJvYmplY3RcIiwgXCJudWxsXCJdXG4gICAgfSxcbiAgICBcIlN0eWxlVHlwZVwiOiB7XG4gICAgICBcImVudW1cIjogW1xuICAgICAgICBcIkRlZmF1bHRcIixcbiAgICAgICAgXCJTcGVsbEJ5TGV0dGVyXCIsXG4gICAgICAgIFwiU3BlbGxCeVdvcmRcIlxuICAgICAgXSxcbiAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgfSxcbiAgICBcIlZhbHVlXCI6IHtcbiAgICAgIFwiYWRkaXRpb25hbFByb3BlcnRpZXNcIjogZmFsc2UsXG4gICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICBcImludGVycHJldGVkVmFsdWVcIjoge1xuICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCI8cD5UaGUgdmFsdWUgdGhhdCBBbWF6b24gTGV4IFYyIGRldGVybWluZXMgZm9yIHRoZSBzbG90LiBUaGUgYWN0dWFsIHZhbHVlIGRlcGVuZHMgb24gdGhlIHNldHRpbmcgb2YgdGhlIHZhbHVlIHNlbGVjdGlvbiBzdHJhdGVneSBmb3IgdGhlIGJvdC4gWW91IGNhbiBjaG9vc2UgdG8gdXNlIHRoZSB2YWx1ZSBlbnRlcmVkIGJ5IHRoZSB1c2VyLCBvciB5b3UgY2FuIGhhdmUgQW1hem9uIExleCBWMiBjaG9vc2UgdGhlIGZpcnN0IHZhbHVlIGluIHRoZSA8Y29kZT5yZXNvbHZlZFZhbHVlczwvY29kZT4gbGlzdC48L3A+XCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJvcmlnaW5hbFZhbHVlXCI6IHtcbiAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiPHA+VGhlIHRleHQgb2YgdGhlIHV0dGVyYW5jZSBmcm9tIHRoZSB1c2VyIHRoYXQgd2FzIGVudGVyZWQgZm9yIHRoZSBzbG90LjwvcD5cIixcbiAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBcInJlc29sdmVkVmFsdWVzXCI6IHtcbiAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiPHA+QSBsaXN0IG9mIGFkZGl0aW9uYWwgdmFsdWVzIHRoYXQgaGF2ZSBiZWVuIHJlY29nbml6ZWQgZm9yIHRoZSBzbG90LjwvcD5cIixcbiAgICAgICAgICBcIml0ZW1zXCI6IHtcbiAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInR5cGVcIjogXCJhcnJheVwiXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcInR5cGVcIjogXCJvYmplY3RcIlxuICAgIH1cbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgKi9cbi8vIENvcHlyaWdodCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IE1JVC0wXG5cbmNvbnN0IEFqdjIwMTkgPSByZXF1aXJlKFwiYWp2L2Rpc3QvMjAxOVwiKVxuY29uc3Qgc2NoZW1hID0gcmVxdWlyZShcIi4vTGV4Q29kZUhvb2tSZXNwb25zZVNjaGVtYS5qc29uXCIpXG5jb25zdCBhanYgPSBuZXcgQWp2MjAxOSh7IGFsbEVycm9yczogdHJ1ZSB9KVxuXG5leHBvcnRzLnZhbGlkYXRlSW5wdXQgPSBmdW5jdGlvbiAoaW5wdXREYXRhKSB7XG4gIGxldCByZXNwb25zZSA9IFtdXG5cbiAgY29uc3QgZXJyb3JzID0gdmFsaWRhdGVMZXhMYW1iZGFSZXNwb25zZShpbnB1dERhdGEpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZXJyb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVycm9yc1tpXS5rZXl3b3JkICE9PSBcImlmXCIgJiYgZXJyb3JzW2ldLmtleXdvcmQgIT09IFwiZWxzZVwiICYmIGVycm9yc1tpXS5rZXl3b3JkICE9PSBcInRoZW5cIikge1xuICAgICAgbGV0IG1lc3NhZ2UgPSBgYFxuXG4gICAgICBpZiAoZXJyb3JzW2ldLmluc3RhbmNlUGF0aCA9PT0gXCJcIikge1xuICAgICAgICBtZXNzYWdlICs9IGVycm9yc1tpXS5tZXNzYWdlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlICs9IGAke2Vycm9yc1tpXS5pbnN0YW5jZVBhdGh9ICR7ZXJyb3JzW2ldLm1lc3NhZ2V9YFxuICAgICAgfVxuXG4gICAgICBpZiAoZXJyb3JzW2ldLnBhcmFtcy5hbGxvd2VkVmFsdWVzKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gYC4gQWxsb3dlZCB2YWx1ZXM6ICR7ZXJyb3JzW2ldLnBhcmFtcy5hbGxvd2VkVmFsdWVzLmpvaW4oXCIsIFwiKX1gXG4gICAgICB9XG4gICAgICByZXNwb25zZS5wdXNoKG1lc3NhZ2UpXG4gICAgfVxuICB9XG4gIHJldHVybiByZXNwb25zZVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUxleExhbWJkYVJlc3BvbnNlKGlucHV0RGF0YSkge1xuICBjb25zdCB2YWxpZGF0ZSA9IGFqdi5jb21waWxlKHNjaGVtYSlcbiAgdmFsaWRhdGUoaW5wdXREYXRhKVxuICBjb25zb2xlLmRlYnVnKFwiVmFsaWRhdGlvbiBlcnJvcnM6XCIsIHZhbGlkYXRlLmVycm9ycylcbiAgcmV0dXJuIHZhbGlkYXRlLmVycm9ycyB8fCBbXVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk1pc3NpbmdSZWZFcnJvciA9IGV4cG9ydHMuVmFsaWRhdGlvbkVycm9yID0gZXhwb3J0cy5Db2RlR2VuID0gZXhwb3J0cy5OYW1lID0gZXhwb3J0cy5uaWwgPSBleHBvcnRzLnN0cmluZ2lmeSA9IGV4cG9ydHMuc3RyID0gZXhwb3J0cy5fID0gZXhwb3J0cy5LZXl3b3JkQ3h0ID0gdm9pZCAwO1xuY29uc3QgY29yZV8xID0gcmVxdWlyZShcIi4vY29yZVwiKTtcbmNvbnN0IGRyYWZ0N18xID0gcmVxdWlyZShcIi4vdm9jYWJ1bGFyaWVzL2RyYWZ0N1wiKTtcbmNvbnN0IGR5bmFtaWNfMSA9IHJlcXVpcmUoXCIuL3ZvY2FidWxhcmllcy9keW5hbWljXCIpO1xuY29uc3QgbmV4dF8xID0gcmVxdWlyZShcIi4vdm9jYWJ1bGFyaWVzL25leHRcIik7XG5jb25zdCB1bmV2YWx1YXRlZF8xID0gcmVxdWlyZShcIi4vdm9jYWJ1bGFyaWVzL3VuZXZhbHVhdGVkXCIpO1xuY29uc3QgZGlzY3JpbWluYXRvcl8xID0gcmVxdWlyZShcIi4vdm9jYWJ1bGFyaWVzL2Rpc2NyaW1pbmF0b3JcIik7XG5jb25zdCBqc29uX3NjaGVtYV8yMDE5XzA5XzEgPSByZXF1aXJlKFwiLi9yZWZzL2pzb24tc2NoZW1hLTIwMTktMDlcIik7XG5jb25zdCBNRVRBX1NDSEVNQV9JRCA9IFwiaHR0cHM6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQvMjAxOS0wOS9zY2hlbWFcIjtcbmNsYXNzIEFqdjIwMTkgZXh0ZW5kcyBjb3JlXzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3Iob3B0cyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKHtcbiAgICAgICAgICAgIC4uLm9wdHMsXG4gICAgICAgICAgICBkeW5hbWljUmVmOiB0cnVlLFxuICAgICAgICAgICAgbmV4dDogdHJ1ZSxcbiAgICAgICAgICAgIHVuZXZhbHVhdGVkOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX2FkZFZvY2FidWxhcmllcygpIHtcbiAgICAgICAgc3VwZXIuX2FkZFZvY2FidWxhcmllcygpO1xuICAgICAgICB0aGlzLmFkZFZvY2FidWxhcnkoZHluYW1pY18xLmRlZmF1bHQpO1xuICAgICAgICBkcmFmdDdfMS5kZWZhdWx0LmZvckVhY2goKHYpID0+IHRoaXMuYWRkVm9jYWJ1bGFyeSh2KSk7XG4gICAgICAgIHRoaXMuYWRkVm9jYWJ1bGFyeShuZXh0XzEuZGVmYXVsdCk7XG4gICAgICAgIHRoaXMuYWRkVm9jYWJ1bGFyeSh1bmV2YWx1YXRlZF8xLmRlZmF1bHQpO1xuICAgICAgICBpZiAodGhpcy5vcHRzLmRpc2NyaW1pbmF0b3IpXG4gICAgICAgICAgICB0aGlzLmFkZEtleXdvcmQoZGlzY3JpbWluYXRvcl8xLmRlZmF1bHQpO1xuICAgIH1cbiAgICBfYWRkRGVmYXVsdE1ldGFTY2hlbWEoKSB7XG4gICAgICAgIHN1cGVyLl9hZGREZWZhdWx0TWV0YVNjaGVtYSgpO1xuICAgICAgICBjb25zdCB7ICRkYXRhLCBtZXRhIH0gPSB0aGlzLm9wdHM7XG4gICAgICAgIGlmICghbWV0YSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAganNvbl9zY2hlbWFfMjAxOV8wOV8xLmRlZmF1bHQuY2FsbCh0aGlzLCAkZGF0YSk7XG4gICAgICAgIHRoaXMucmVmc1tcImh0dHA6Ly9qc29uLXNjaGVtYS5vcmcvc2NoZW1hXCJdID0gTUVUQV9TQ0hFTUFfSUQ7XG4gICAgfVxuICAgIGRlZmF1bHRNZXRhKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMub3B0cy5kZWZhdWx0TWV0YSA9XG4gICAgICAgICAgICBzdXBlci5kZWZhdWx0TWV0YSgpIHx8ICh0aGlzLmdldFNjaGVtYShNRVRBX1NDSEVNQV9JRCkgPyBNRVRBX1NDSEVNQV9JRCA6IHVuZGVmaW5lZCkpO1xuICAgIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IEFqdjIwMTk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBBanYyMDE5O1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi9jb21waWxlL3ZhbGlkYXRlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiS2V5d29yZEN4dFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdmFsaWRhdGVfMS5LZXl3b3JkQ3h0OyB9IH0pO1xudmFyIGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuL2NvbXBpbGUvY29kZWdlblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVnZW5fMS5fOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3RyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEuc3RyOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3RyaW5naWZ5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEuc3RyaW5naWZ5OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibmlsXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEubmlsOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTmFtZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLk5hbWU7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJDb2RlR2VuXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEuQ29kZUdlbjsgfSB9KTtcbnZhciB2YWxpZGF0aW9uX2Vycm9yXzEgPSByZXF1aXJlKFwiLi9ydW50aW1lL3ZhbGlkYXRpb25fZXJyb3JcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJWYWxpZGF0aW9uRXJyb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZhbGlkYXRpb25fZXJyb3JfMS5kZWZhdWx0OyB9IH0pO1xudmFyIHJlZl9lcnJvcl8xID0gcmVxdWlyZShcIi4vY29tcGlsZS9yZWZfZXJyb3JcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJNaXNzaW5nUmVmRXJyb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlZl9lcnJvcl8xLmRlZmF1bHQ7IH0gfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD0yMDE5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yZWdleHBDb2RlID0gZXhwb3J0cy5nZXRFc21FeHBvcnROYW1lID0gZXhwb3J0cy5nZXRQcm9wZXJ0eSA9IGV4cG9ydHMuc2FmZVN0cmluZ2lmeSA9IGV4cG9ydHMuc3RyaW5naWZ5ID0gZXhwb3J0cy5zdHJDb25jYXQgPSBleHBvcnRzLmFkZENvZGVBcmcgPSBleHBvcnRzLnN0ciA9IGV4cG9ydHMuXyA9IGV4cG9ydHMubmlsID0gZXhwb3J0cy5fQ29kZSA9IGV4cG9ydHMuTmFtZSA9IGV4cG9ydHMuSURFTlRJRklFUiA9IGV4cG9ydHMuX0NvZGVPck5hbWUgPSB2b2lkIDA7XG5jbGFzcyBfQ29kZU9yTmFtZSB7XG59XG5leHBvcnRzLl9Db2RlT3JOYW1lID0gX0NvZGVPck5hbWU7XG5leHBvcnRzLklERU5USUZJRVIgPSAvXlthLXokX11bYS16JF8wLTldKiQvaTtcbmNsYXNzIE5hbWUgZXh0ZW5kcyBfQ29kZU9yTmFtZSB7XG4gICAgY29uc3RydWN0b3Iocykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpZiAoIWV4cG9ydHMuSURFTlRJRklFUi50ZXN0KHMpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29kZUdlbjogbmFtZSBtdXN0IGJlIGEgdmFsaWQgaWRlbnRpZmllclwiKTtcbiAgICAgICAgdGhpcy5zdHIgPSBzO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyO1xuICAgIH1cbiAgICBlbXB0eVN0cigpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBnZXQgbmFtZXMoKSB7XG4gICAgICAgIHJldHVybiB7IFt0aGlzLnN0cl06IDEgfTtcbiAgICB9XG59XG5leHBvcnRzLk5hbWUgPSBOYW1lO1xuY2xhc3MgX0NvZGUgZXh0ZW5kcyBfQ29kZU9yTmFtZSB7XG4gICAgY29uc3RydWN0b3IoY29kZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9pdGVtcyA9IHR5cGVvZiBjb2RlID09PSBcInN0cmluZ1wiID8gW2NvZGVdIDogY29kZTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0cjtcbiAgICB9XG4gICAgZW1wdHlTdHIoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pdGVtcy5sZW5ndGggPiAxKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5faXRlbXNbMF07XG4gICAgICAgIHJldHVybiBpdGVtID09PSBcIlwiIHx8IGl0ZW0gPT09ICdcIlwiJztcbiAgICB9XG4gICAgZ2V0IHN0cigpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gKChfYSA9IHRoaXMuX3N0cikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogKHRoaXMuX3N0ciA9IHRoaXMuX2l0ZW1zLnJlZHVjZSgocywgYykgPT4gYCR7c30ke2N9YCwgXCJcIikpKTtcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiAoKF9hID0gdGhpcy5fbmFtZXMpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICh0aGlzLl9uYW1lcyA9IHRoaXMuX2l0ZW1zLnJlZHVjZSgobmFtZXMsIGMpID0+IHtcbiAgICAgICAgICAgIGlmIChjIGluc3RhbmNlb2YgTmFtZSlcbiAgICAgICAgICAgICAgICBuYW1lc1tjLnN0cl0gPSAobmFtZXNbYy5zdHJdIHx8IDApICsgMTtcbiAgICAgICAgICAgIHJldHVybiBuYW1lcztcbiAgICAgICAgfSwge30pKSk7XG4gICAgfVxufVxuZXhwb3J0cy5fQ29kZSA9IF9Db2RlO1xuZXhwb3J0cy5uaWwgPSBuZXcgX0NvZGUoXCJcIik7XG5mdW5jdGlvbiBfKHN0cnMsIC4uLmFyZ3MpIHtcbiAgICBjb25zdCBjb2RlID0gW3N0cnNbMF1dO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGFkZENvZGVBcmcoY29kZSwgYXJnc1tpXSk7XG4gICAgICAgIGNvZGUucHVzaChzdHJzWysraV0pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IF9Db2RlKGNvZGUpO1xufVxuZXhwb3J0cy5fID0gXztcbmNvbnN0IHBsdXMgPSBuZXcgX0NvZGUoXCIrXCIpO1xuZnVuY3Rpb24gc3RyKHN0cnMsIC4uLmFyZ3MpIHtcbiAgICBjb25zdCBleHByID0gW3NhZmVTdHJpbmdpZnkoc3Ryc1swXSldO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGV4cHIucHVzaChwbHVzKTtcbiAgICAgICAgYWRkQ29kZUFyZyhleHByLCBhcmdzW2ldKTtcbiAgICAgICAgZXhwci5wdXNoKHBsdXMsIHNhZmVTdHJpbmdpZnkoc3Ryc1srK2ldKSk7XG4gICAgfVxuICAgIG9wdGltaXplKGV4cHIpO1xuICAgIHJldHVybiBuZXcgX0NvZGUoZXhwcik7XG59XG5leHBvcnRzLnN0ciA9IHN0cjtcbmZ1bmN0aW9uIGFkZENvZGVBcmcoY29kZSwgYXJnKSB7XG4gICAgaWYgKGFyZyBpbnN0YW5jZW9mIF9Db2RlKVxuICAgICAgICBjb2RlLnB1c2goLi4uYXJnLl9pdGVtcyk7XG4gICAgZWxzZSBpZiAoYXJnIGluc3RhbmNlb2YgTmFtZSlcbiAgICAgICAgY29kZS5wdXNoKGFyZyk7XG4gICAgZWxzZVxuICAgICAgICBjb2RlLnB1c2goaW50ZXJwb2xhdGUoYXJnKSk7XG59XG5leHBvcnRzLmFkZENvZGVBcmcgPSBhZGRDb2RlQXJnO1xuZnVuY3Rpb24gb3B0aW1pemUoZXhwcikge1xuICAgIGxldCBpID0gMTtcbiAgICB3aGlsZSAoaSA8IGV4cHIubGVuZ3RoIC0gMSkge1xuICAgICAgICBpZiAoZXhwcltpXSA9PT0gcGx1cykge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gbWVyZ2VFeHBySXRlbXMoZXhwcltpIC0gMV0sIGV4cHJbaSArIDFdKTtcbiAgICAgICAgICAgIGlmIChyZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGV4cHIuc3BsaWNlKGkgLSAxLCAzLCByZXMpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXhwcltpKytdID0gXCIrXCI7XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG1lcmdlRXhwckl0ZW1zKGEsIGIpIHtcbiAgICBpZiAoYiA9PT0gJ1wiXCInKVxuICAgICAgICByZXR1cm4gYTtcbiAgICBpZiAoYSA9PT0gJ1wiXCInKVxuICAgICAgICByZXR1cm4gYjtcbiAgICBpZiAodHlwZW9mIGEgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoYiBpbnN0YW5jZW9mIE5hbWUgfHwgYVthLmxlbmd0aCAtIDFdICE9PSAnXCInKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAodHlwZW9mIGIgIT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIHJldHVybiBgJHthLnNsaWNlKDAsIC0xKX0ke2J9XCJgO1xuICAgICAgICBpZiAoYlswXSA9PT0gJ1wiJylcbiAgICAgICAgICAgIHJldHVybiBhLnNsaWNlKDAsIC0xKSArIGIuc2xpY2UoMSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBiID09IFwic3RyaW5nXCIgJiYgYlswXSA9PT0gJ1wiJyAmJiAhKGEgaW5zdGFuY2VvZiBOYW1lKSlcbiAgICAgICAgcmV0dXJuIGBcIiR7YX0ke2Iuc2xpY2UoMSl9YDtcbiAgICByZXR1cm47XG59XG5mdW5jdGlvbiBzdHJDb25jYXQoYzEsIGMyKSB7XG4gICAgcmV0dXJuIGMyLmVtcHR5U3RyKCkgPyBjMSA6IGMxLmVtcHR5U3RyKCkgPyBjMiA6IHN0ciBgJHtjMX0ke2MyfWA7XG59XG5leHBvcnRzLnN0ckNvbmNhdCA9IHN0ckNvbmNhdDtcbi8vIFRPRE8gZG8gbm90IGFsbG93IGFycmF5cyBoZXJlXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZSh4KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB4ID09IFwibnVtYmVyXCIgfHwgdHlwZW9mIHggPT0gXCJib29sZWFuXCIgfHwgeCA9PT0gbnVsbFxuICAgICAgICA/IHhcbiAgICAgICAgOiBzYWZlU3RyaW5naWZ5KEFycmF5LmlzQXJyYXkoeCkgPyB4LmpvaW4oXCIsXCIpIDogeCk7XG59XG5mdW5jdGlvbiBzdHJpbmdpZnkoeCkge1xuICAgIHJldHVybiBuZXcgX0NvZGUoc2FmZVN0cmluZ2lmeSh4KSk7XG59XG5leHBvcnRzLnN0cmluZ2lmeSA9IHN0cmluZ2lmeTtcbmZ1bmN0aW9uIHNhZmVTdHJpbmdpZnkoeCkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh4KVxuICAgICAgICAucmVwbGFjZSgvXFx1MjAyOC9nLCBcIlxcXFx1MjAyOFwiKVxuICAgICAgICAucmVwbGFjZSgvXFx1MjAyOS9nLCBcIlxcXFx1MjAyOVwiKTtcbn1cbmV4cG9ydHMuc2FmZVN0cmluZ2lmeSA9IHNhZmVTdHJpbmdpZnk7XG5mdW5jdGlvbiBnZXRQcm9wZXJ0eShrZXkpIHtcbiAgICByZXR1cm4gdHlwZW9mIGtleSA9PSBcInN0cmluZ1wiICYmIGV4cG9ydHMuSURFTlRJRklFUi50ZXN0KGtleSkgPyBuZXcgX0NvZGUoYC4ke2tleX1gKSA6IF8gYFske2tleX1dYDtcbn1cbmV4cG9ydHMuZ2V0UHJvcGVydHkgPSBnZXRQcm9wZXJ0eTtcbi8vRG9lcyBiZXN0IGVmZm9ydCB0byBmb3JtYXQgdGhlIG5hbWUgcHJvcGVybHlcbmZ1bmN0aW9uIGdldEVzbUV4cG9ydE5hbWUoa2V5KSB7XG4gICAgaWYgKHR5cGVvZiBrZXkgPT0gXCJzdHJpbmdcIiAmJiBleHBvcnRzLklERU5USUZJRVIudGVzdChrZXkpKSB7XG4gICAgICAgIHJldHVybiBuZXcgX0NvZGUoYCR7a2V5fWApO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvZGVHZW46IGludmFsaWQgZXhwb3J0IG5hbWU6ICR7a2V5fSwgdXNlIGV4cGxpY2l0ICRpZCBuYW1lIG1hcHBpbmdgKTtcbn1cbmV4cG9ydHMuZ2V0RXNtRXhwb3J0TmFtZSA9IGdldEVzbUV4cG9ydE5hbWU7XG5mdW5jdGlvbiByZWdleHBDb2RlKHJ4KSB7XG4gICAgcmV0dXJuIG5ldyBfQ29kZShyeC50b1N0cmluZygpKTtcbn1cbmV4cG9ydHMucmVnZXhwQ29kZSA9IHJlZ2V4cENvZGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb2RlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5vciA9IGV4cG9ydHMuYW5kID0gZXhwb3J0cy5ub3QgPSBleHBvcnRzLkNvZGVHZW4gPSBleHBvcnRzLm9wZXJhdG9ycyA9IGV4cG9ydHMudmFyS2luZHMgPSBleHBvcnRzLlZhbHVlU2NvcGVOYW1lID0gZXhwb3J0cy5WYWx1ZVNjb3BlID0gZXhwb3J0cy5TY29wZSA9IGV4cG9ydHMuTmFtZSA9IGV4cG9ydHMucmVnZXhwQ29kZSA9IGV4cG9ydHMuc3RyaW5naWZ5ID0gZXhwb3J0cy5nZXRQcm9wZXJ0eSA9IGV4cG9ydHMubmlsID0gZXhwb3J0cy5zdHJDb25jYXQgPSBleHBvcnRzLnN0ciA9IGV4cG9ydHMuXyA9IHZvaWQgMDtcbmNvbnN0IGNvZGVfMSA9IHJlcXVpcmUoXCIuL2NvZGVcIik7XG5jb25zdCBzY29wZV8xID0gcmVxdWlyZShcIi4vc2NvcGVcIik7XG52YXIgY29kZV8yID0gcmVxdWlyZShcIi4vY29kZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVfMi5fOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3RyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlXzIuc3RyOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3RyQ29uY2F0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlXzIuc3RyQ29uY2F0OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibmlsXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlXzIubmlsOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZ2V0UHJvcGVydHlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVfMi5nZXRQcm9wZXJ0eTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN0cmluZ2lmeVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZV8yLnN0cmluZ2lmeTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInJlZ2V4cENvZGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVfMi5yZWdleHBDb2RlOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTmFtZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZV8yLk5hbWU7IH0gfSk7XG52YXIgc2NvcGVfMiA9IHJlcXVpcmUoXCIuL3Njb3BlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiU2NvcGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjb3BlXzIuU2NvcGU7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJWYWx1ZVNjb3BlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY29wZV8yLlZhbHVlU2NvcGU7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJWYWx1ZVNjb3BlTmFtZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NvcGVfMi5WYWx1ZVNjb3BlTmFtZTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInZhcktpbmRzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY29wZV8yLnZhcktpbmRzOyB9IH0pO1xuZXhwb3J0cy5vcGVyYXRvcnMgPSB7XG4gICAgR1Q6IG5ldyBjb2RlXzEuX0NvZGUoXCI+XCIpLFxuICAgIEdURTogbmV3IGNvZGVfMS5fQ29kZShcIj49XCIpLFxuICAgIExUOiBuZXcgY29kZV8xLl9Db2RlKFwiPFwiKSxcbiAgICBMVEU6IG5ldyBjb2RlXzEuX0NvZGUoXCI8PVwiKSxcbiAgICBFUTogbmV3IGNvZGVfMS5fQ29kZShcIj09PVwiKSxcbiAgICBORVE6IG5ldyBjb2RlXzEuX0NvZGUoXCIhPT1cIiksXG4gICAgTk9UOiBuZXcgY29kZV8xLl9Db2RlKFwiIVwiKSxcbiAgICBPUjogbmV3IGNvZGVfMS5fQ29kZShcInx8XCIpLFxuICAgIEFORDogbmV3IGNvZGVfMS5fQ29kZShcIiYmXCIpLFxuICAgIEFERDogbmV3IGNvZGVfMS5fQ29kZShcIitcIiksXG59O1xuY2xhc3MgTm9kZSB7XG4gICAgb3B0aW1pemVOb2RlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIG9wdGltaXplTmFtZXMoX25hbWVzLCBfY29uc3RhbnRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbmNsYXNzIERlZiBleHRlbmRzIE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKHZhcktpbmQsIG5hbWUsIHJocykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnZhcktpbmQgPSB2YXJLaW5kO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnJocyA9IHJocztcbiAgICB9XG4gICAgcmVuZGVyKHsgZXM1LCBfbiB9KSB7XG4gICAgICAgIGNvbnN0IHZhcktpbmQgPSBlczUgPyBzY29wZV8xLnZhcktpbmRzLnZhciA6IHRoaXMudmFyS2luZDtcbiAgICAgICAgY29uc3QgcmhzID0gdGhpcy5yaHMgPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBgID0gJHt0aGlzLnJoc31gO1xuICAgICAgICByZXR1cm4gYCR7dmFyS2luZH0gJHt0aGlzLm5hbWV9JHtyaHN9O2AgKyBfbjtcbiAgICB9XG4gICAgb3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKSB7XG4gICAgICAgIGlmICghbmFtZXNbdGhpcy5uYW1lLnN0cl0pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLnJocylcbiAgICAgICAgICAgIHRoaXMucmhzID0gb3B0aW1pemVFeHByKHRoaXMucmhzLCBuYW1lcywgY29uc3RhbnRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldCBuYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmhzIGluc3RhbmNlb2YgY29kZV8xLl9Db2RlT3JOYW1lID8gdGhpcy5yaHMubmFtZXMgOiB7fTtcbiAgICB9XG59XG5jbGFzcyBBc3NpZ24gZXh0ZW5kcyBOb2RlIHtcbiAgICBjb25zdHJ1Y3RvcihsaHMsIHJocywgc2lkZUVmZmVjdHMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5saHMgPSBsaHM7XG4gICAgICAgIHRoaXMucmhzID0gcmhzO1xuICAgICAgICB0aGlzLnNpZGVFZmZlY3RzID0gc2lkZUVmZmVjdHM7XG4gICAgfVxuICAgIHJlbmRlcih7IF9uIH0pIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMubGhzfSA9ICR7dGhpcy5yaHN9O2AgKyBfbjtcbiAgICB9XG4gICAgb3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKSB7XG4gICAgICAgIGlmICh0aGlzLmxocyBpbnN0YW5jZW9mIGNvZGVfMS5OYW1lICYmICFuYW1lc1t0aGlzLmxocy5zdHJdICYmICF0aGlzLnNpZGVFZmZlY3RzKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLnJocyA9IG9wdGltaXplRXhwcih0aGlzLnJocywgbmFtZXMsIGNvbnN0YW50cyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXQgbmFtZXMoKSB7XG4gICAgICAgIGNvbnN0IG5hbWVzID0gdGhpcy5saHMgaW5zdGFuY2VvZiBjb2RlXzEuTmFtZSA/IHt9IDogeyAuLi50aGlzLmxocy5uYW1lcyB9O1xuICAgICAgICByZXR1cm4gYWRkRXhwck5hbWVzKG5hbWVzLCB0aGlzLnJocyk7XG4gICAgfVxufVxuY2xhc3MgQXNzaWduT3AgZXh0ZW5kcyBBc3NpZ24ge1xuICAgIGNvbnN0cnVjdG9yKGxocywgb3AsIHJocywgc2lkZUVmZmVjdHMpIHtcbiAgICAgICAgc3VwZXIobGhzLCByaHMsIHNpZGVFZmZlY3RzKTtcbiAgICAgICAgdGhpcy5vcCA9IG9wO1xuICAgIH1cbiAgICByZW5kZXIoeyBfbiB9KSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmxoc30gJHt0aGlzLm9wfT0gJHt0aGlzLnJoc307YCArIF9uO1xuICAgIH1cbn1cbmNsYXNzIExhYmVsIGV4dGVuZHMgTm9kZSB7XG4gICAgY29uc3RydWN0b3IobGFiZWwpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuICAgICAgICB0aGlzLm5hbWVzID0ge307XG4gICAgfVxuICAgIHJlbmRlcih7IF9uIH0pIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMubGFiZWx9OmAgKyBfbjtcbiAgICB9XG59XG5jbGFzcyBCcmVhayBleHRlbmRzIE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKGxhYmVsKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICAgICAgdGhpcy5uYW1lcyA9IHt9O1xuICAgIH1cbiAgICByZW5kZXIoeyBfbiB9KSB7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5sYWJlbCA/IGAgJHt0aGlzLmxhYmVsfWAgOiBcIlwiO1xuICAgICAgICByZXR1cm4gYGJyZWFrJHtsYWJlbH07YCArIF9uO1xuICAgIH1cbn1cbmNsYXNzIFRocm93IGV4dGVuZHMgTm9kZSB7XG4gICAgY29uc3RydWN0b3IoZXJyb3IpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgIH1cbiAgICByZW5kZXIoeyBfbiB9KSB7XG4gICAgICAgIHJldHVybiBgdGhyb3cgJHt0aGlzLmVycm9yfTtgICsgX247XG4gICAgfVxuICAgIGdldCBuYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3IubmFtZXM7XG4gICAgfVxufVxuY2xhc3MgQW55Q29kZSBleHRlbmRzIE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKGNvZGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5jb2RlID0gY29kZTtcbiAgICB9XG4gICAgcmVuZGVyKHsgX24gfSkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5jb2RlfTtgICsgX247XG4gICAgfVxuICAgIG9wdGltaXplTm9kZXMoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmNvZGV9YCA/IHRoaXMgOiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIG9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cykge1xuICAgICAgICB0aGlzLmNvZGUgPSBvcHRpbWl6ZUV4cHIodGhpcy5jb2RlLCBuYW1lcywgY29uc3RhbnRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldCBuYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29kZSBpbnN0YW5jZW9mIGNvZGVfMS5fQ29kZU9yTmFtZSA/IHRoaXMuY29kZS5uYW1lcyA6IHt9O1xuICAgIH1cbn1cbmNsYXNzIFBhcmVudE5vZGUgZXh0ZW5kcyBOb2RlIHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlcyA9IFtdKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubm9kZXMgPSBub2RlcztcbiAgICB9XG4gICAgcmVuZGVyKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZXMucmVkdWNlKChjb2RlLCBuKSA9PiBjb2RlICsgbi5yZW5kZXIob3B0cyksIFwiXCIpO1xuICAgIH1cbiAgICBvcHRpbWl6ZU5vZGVzKCkge1xuICAgICAgICBjb25zdCB7IG5vZGVzIH0gPSB0aGlzO1xuICAgICAgICBsZXQgaSA9IG5vZGVzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgY29uc3QgbiA9IG5vZGVzW2ldLm9wdGltaXplTm9kZXMoKTtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG4pKVxuICAgICAgICAgICAgICAgIG5vZGVzLnNwbGljZShpLCAxLCAuLi5uKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKG4pXG4gICAgICAgICAgICAgICAgbm9kZXNbaV0gPSBuO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIG5vZGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZXMubGVuZ3RoID4gMCA/IHRoaXMgOiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIG9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cykge1xuICAgICAgICBjb25zdCB7IG5vZGVzIH0gPSB0aGlzO1xuICAgICAgICBsZXQgaSA9IG5vZGVzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgLy8gaXRlcmF0aW5nIGJhY2t3YXJkcyBpbXByb3ZlcyAxLXBhc3Mgb3B0aW1pemF0aW9uXG4gICAgICAgICAgICBjb25zdCBuID0gbm9kZXNbaV07XG4gICAgICAgICAgICBpZiAobi5vcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgc3VidHJhY3ROYW1lcyhuYW1lcywgbi5uYW1lcyk7XG4gICAgICAgICAgICBub2Rlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGVzLmxlbmd0aCA+IDAgPyB0aGlzIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgICBnZXQgbmFtZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGVzLnJlZHVjZSgobmFtZXMsIG4pID0+IGFkZE5hbWVzKG5hbWVzLCBuLm5hbWVzKSwge30pO1xuICAgIH1cbn1cbmNsYXNzIEJsb2NrTm9kZSBleHRlbmRzIFBhcmVudE5vZGUge1xuICAgIHJlbmRlcihvcHRzKSB7XG4gICAgICAgIHJldHVybiBcIntcIiArIG9wdHMuX24gKyBzdXBlci5yZW5kZXIob3B0cykgKyBcIn1cIiArIG9wdHMuX247XG4gICAgfVxufVxuY2xhc3MgUm9vdCBleHRlbmRzIFBhcmVudE5vZGUge1xufVxuY2xhc3MgRWxzZSBleHRlbmRzIEJsb2NrTm9kZSB7XG59XG5FbHNlLmtpbmQgPSBcImVsc2VcIjtcbmNsYXNzIElmIGV4dGVuZHMgQmxvY2tOb2RlIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25kaXRpb24sIG5vZGVzKSB7XG4gICAgICAgIHN1cGVyKG5vZGVzKTtcbiAgICAgICAgdGhpcy5jb25kaXRpb24gPSBjb25kaXRpb247XG4gICAgfVxuICAgIHJlbmRlcihvcHRzKSB7XG4gICAgICAgIGxldCBjb2RlID0gYGlmKCR7dGhpcy5jb25kaXRpb259KWAgKyBzdXBlci5yZW5kZXIob3B0cyk7XG4gICAgICAgIGlmICh0aGlzLmVsc2UpXG4gICAgICAgICAgICBjb2RlICs9IFwiZWxzZSBcIiArIHRoaXMuZWxzZS5yZW5kZXIob3B0cyk7XG4gICAgICAgIHJldHVybiBjb2RlO1xuICAgIH1cbiAgICBvcHRpbWl6ZU5vZGVzKCkge1xuICAgICAgICBzdXBlci5vcHRpbWl6ZU5vZGVzKCk7XG4gICAgICAgIGNvbnN0IGNvbmQgPSB0aGlzLmNvbmRpdGlvbjtcbiAgICAgICAgaWYgKGNvbmQgPT09IHRydWUpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlczsgLy8gZWxzZSBpcyBpZ25vcmVkIGhlcmVcbiAgICAgICAgbGV0IGUgPSB0aGlzLmVsc2U7XG4gICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICBjb25zdCBucyA9IGUub3B0aW1pemVOb2RlcygpO1xuICAgICAgICAgICAgZSA9IHRoaXMuZWxzZSA9IEFycmF5LmlzQXJyYXkobnMpID8gbmV3IEVsc2UobnMpIDogbnM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgIGlmIChjb25kID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZSBpbnN0YW5jZW9mIElmID8gZSA6IGUubm9kZXM7XG4gICAgICAgICAgICBpZiAodGhpcy5ub2Rlcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gbmV3IElmKG5vdChjb25kKSwgZSBpbnN0YW5jZW9mIElmID8gW2VdIDogZS5ub2Rlcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmQgPT09IGZhbHNlIHx8ICF0aGlzLm5vZGVzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBvcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB0aGlzLmVsc2UgPSAoX2EgPSB0aGlzLmVsc2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5vcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpO1xuICAgICAgICBpZiAoIShzdXBlci5vcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpIHx8IHRoaXMuZWxzZSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuY29uZGl0aW9uID0gb3B0aW1pemVFeHByKHRoaXMuY29uZGl0aW9uLCBuYW1lcywgY29uc3RhbnRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldCBuYW1lcygpIHtcbiAgICAgICAgY29uc3QgbmFtZXMgPSBzdXBlci5uYW1lcztcbiAgICAgICAgYWRkRXhwck5hbWVzKG5hbWVzLCB0aGlzLmNvbmRpdGlvbik7XG4gICAgICAgIGlmICh0aGlzLmVsc2UpXG4gICAgICAgICAgICBhZGROYW1lcyhuYW1lcywgdGhpcy5lbHNlLm5hbWVzKTtcbiAgICAgICAgcmV0dXJuIG5hbWVzO1xuICAgIH1cbn1cbklmLmtpbmQgPSBcImlmXCI7XG5jbGFzcyBGb3IgZXh0ZW5kcyBCbG9ja05vZGUge1xufVxuRm9yLmtpbmQgPSBcImZvclwiO1xuY2xhc3MgRm9yTG9vcCBleHRlbmRzIEZvciB7XG4gICAgY29uc3RydWN0b3IoaXRlcmF0aW9uKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaXRlcmF0aW9uID0gaXRlcmF0aW9uO1xuICAgIH1cbiAgICByZW5kZXIob3B0cykge1xuICAgICAgICByZXR1cm4gYGZvcigke3RoaXMuaXRlcmF0aW9ufSlgICsgc3VwZXIucmVuZGVyKG9wdHMpO1xuICAgIH1cbiAgICBvcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpIHtcbiAgICAgICAgaWYgKCFzdXBlci5vcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLml0ZXJhdGlvbiA9IG9wdGltaXplRXhwcih0aGlzLml0ZXJhdGlvbiwgbmFtZXMsIGNvbnN0YW50cyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXQgbmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBhZGROYW1lcyhzdXBlci5uYW1lcywgdGhpcy5pdGVyYXRpb24ubmFtZXMpO1xuICAgIH1cbn1cbmNsYXNzIEZvclJhbmdlIGV4dGVuZHMgRm9yIHtcbiAgICBjb25zdHJ1Y3Rvcih2YXJLaW5kLCBuYW1lLCBmcm9tLCB0bykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnZhcktpbmQgPSB2YXJLaW5kO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmZyb20gPSBmcm9tO1xuICAgICAgICB0aGlzLnRvID0gdG87XG4gICAgfVxuICAgIHJlbmRlcihvcHRzKSB7XG4gICAgICAgIGNvbnN0IHZhcktpbmQgPSBvcHRzLmVzNSA/IHNjb3BlXzEudmFyS2luZHMudmFyIDogdGhpcy52YXJLaW5kO1xuICAgICAgICBjb25zdCB7IG5hbWUsIGZyb20sIHRvIH0gPSB0aGlzO1xuICAgICAgICByZXR1cm4gYGZvcigke3ZhcktpbmR9ICR7bmFtZX09JHtmcm9tfTsgJHtuYW1lfTwke3RvfTsgJHtuYW1lfSsrKWAgKyBzdXBlci5yZW5kZXIob3B0cyk7XG4gICAgfVxuICAgIGdldCBuYW1lcygpIHtcbiAgICAgICAgY29uc3QgbmFtZXMgPSBhZGRFeHByTmFtZXMoc3VwZXIubmFtZXMsIHRoaXMuZnJvbSk7XG4gICAgICAgIHJldHVybiBhZGRFeHByTmFtZXMobmFtZXMsIHRoaXMudG8pO1xuICAgIH1cbn1cbmNsYXNzIEZvckl0ZXIgZXh0ZW5kcyBGb3Ige1xuICAgIGNvbnN0cnVjdG9yKGxvb3AsIHZhcktpbmQsIG5hbWUsIGl0ZXJhYmxlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubG9vcCA9IGxvb3A7XG4gICAgICAgIHRoaXMudmFyS2luZCA9IHZhcktpbmQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuaXRlcmFibGUgPSBpdGVyYWJsZTtcbiAgICB9XG4gICAgcmVuZGVyKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIGBmb3IoJHt0aGlzLnZhcktpbmR9ICR7dGhpcy5uYW1lfSAke3RoaXMubG9vcH0gJHt0aGlzLml0ZXJhYmxlfSlgICsgc3VwZXIucmVuZGVyKG9wdHMpO1xuICAgIH1cbiAgICBvcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpIHtcbiAgICAgICAgaWYgKCFzdXBlci5vcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLml0ZXJhYmxlID0gb3B0aW1pemVFeHByKHRoaXMuaXRlcmFibGUsIG5hbWVzLCBjb25zdGFudHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICByZXR1cm4gYWRkTmFtZXMoc3VwZXIubmFtZXMsIHRoaXMuaXRlcmFibGUubmFtZXMpO1xuICAgIH1cbn1cbmNsYXNzIEZ1bmMgZXh0ZW5kcyBCbG9ja05vZGUge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGFyZ3MsIGFzeW5jKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgICAgIHRoaXMuYXN5bmMgPSBhc3luYztcbiAgICB9XG4gICAgcmVuZGVyKG9wdHMpIHtcbiAgICAgICAgY29uc3QgX2FzeW5jID0gdGhpcy5hc3luYyA/IFwiYXN5bmMgXCIgOiBcIlwiO1xuICAgICAgICByZXR1cm4gYCR7X2FzeW5jfWZ1bmN0aW9uICR7dGhpcy5uYW1lfSgke3RoaXMuYXJnc30pYCArIHN1cGVyLnJlbmRlcihvcHRzKTtcbiAgICB9XG59XG5GdW5jLmtpbmQgPSBcImZ1bmNcIjtcbmNsYXNzIFJldHVybiBleHRlbmRzIFBhcmVudE5vZGUge1xuICAgIHJlbmRlcihvcHRzKSB7XG4gICAgICAgIHJldHVybiBcInJldHVybiBcIiArIHN1cGVyLnJlbmRlcihvcHRzKTtcbiAgICB9XG59XG5SZXR1cm4ua2luZCA9IFwicmV0dXJuXCI7XG5jbGFzcyBUcnkgZXh0ZW5kcyBCbG9ja05vZGUge1xuICAgIHJlbmRlcihvcHRzKSB7XG4gICAgICAgIGxldCBjb2RlID0gXCJ0cnlcIiArIHN1cGVyLnJlbmRlcihvcHRzKTtcbiAgICAgICAgaWYgKHRoaXMuY2F0Y2gpXG4gICAgICAgICAgICBjb2RlICs9IHRoaXMuY2F0Y2gucmVuZGVyKG9wdHMpO1xuICAgICAgICBpZiAodGhpcy5maW5hbGx5KVxuICAgICAgICAgICAgY29kZSArPSB0aGlzLmZpbmFsbHkucmVuZGVyKG9wdHMpO1xuICAgICAgICByZXR1cm4gY29kZTtcbiAgICB9XG4gICAgb3B0aW1pemVOb2RlcygpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgc3VwZXIub3B0aW1pemVOb2RlcygpO1xuICAgICAgICAoX2EgPSB0aGlzLmNhdGNoKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eub3B0aW1pemVOb2RlcygpO1xuICAgICAgICAoX2IgPSB0aGlzLmZpbmFsbHkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5vcHRpbWl6ZU5vZGVzKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBvcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgc3VwZXIub3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKTtcbiAgICAgICAgKF9hID0gdGhpcy5jYXRjaCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cyk7XG4gICAgICAgIChfYiA9IHRoaXMuZmluYWxseSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLm9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXQgbmFtZXMoKSB7XG4gICAgICAgIGNvbnN0IG5hbWVzID0gc3VwZXIubmFtZXM7XG4gICAgICAgIGlmICh0aGlzLmNhdGNoKVxuICAgICAgICAgICAgYWRkTmFtZXMobmFtZXMsIHRoaXMuY2F0Y2gubmFtZXMpO1xuICAgICAgICBpZiAodGhpcy5maW5hbGx5KVxuICAgICAgICAgICAgYWRkTmFtZXMobmFtZXMsIHRoaXMuZmluYWxseS5uYW1lcyk7XG4gICAgICAgIHJldHVybiBuYW1lcztcbiAgICB9XG59XG5jbGFzcyBDYXRjaCBleHRlbmRzIEJsb2NrTm9kZSB7XG4gICAgY29uc3RydWN0b3IoZXJyb3IpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgIH1cbiAgICByZW5kZXIob3B0cykge1xuICAgICAgICByZXR1cm4gYGNhdGNoKCR7dGhpcy5lcnJvcn0pYCArIHN1cGVyLnJlbmRlcihvcHRzKTtcbiAgICB9XG59XG5DYXRjaC5raW5kID0gXCJjYXRjaFwiO1xuY2xhc3MgRmluYWxseSBleHRlbmRzIEJsb2NrTm9kZSB7XG4gICAgcmVuZGVyKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIFwiZmluYWxseVwiICsgc3VwZXIucmVuZGVyKG9wdHMpO1xuICAgIH1cbn1cbkZpbmFsbHkua2luZCA9IFwiZmluYWxseVwiO1xuY2xhc3MgQ29kZUdlbiB7XG4gICAgY29uc3RydWN0b3IoZXh0U2NvcGUsIG9wdHMgPSB7fSkge1xuICAgICAgICB0aGlzLl92YWx1ZXMgPSB7fTtcbiAgICAgICAgdGhpcy5fYmxvY2tTdGFydHMgPSBbXTtcbiAgICAgICAgdGhpcy5fY29uc3RhbnRzID0ge307XG4gICAgICAgIHRoaXMub3B0cyA9IHsgLi4ub3B0cywgX246IG9wdHMubGluZXMgPyBcIlxcblwiIDogXCJcIiB9O1xuICAgICAgICB0aGlzLl9leHRTY29wZSA9IGV4dFNjb3BlO1xuICAgICAgICB0aGlzLl9zY29wZSA9IG5ldyBzY29wZV8xLlNjb3BlKHsgcGFyZW50OiBleHRTY29wZSB9KTtcbiAgICAgICAgdGhpcy5fbm9kZXMgPSBbbmV3IFJvb3QoKV07XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdC5yZW5kZXIodGhpcy5vcHRzKTtcbiAgICB9XG4gICAgLy8gcmV0dXJucyB1bmlxdWUgbmFtZSBpbiB0aGUgaW50ZXJuYWwgc2NvcGVcbiAgICBuYW1lKHByZWZpeCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NvcGUubmFtZShwcmVmaXgpO1xuICAgIH1cbiAgICAvLyByZXNlcnZlcyB1bmlxdWUgbmFtZSBpbiB0aGUgZXh0ZXJuYWwgc2NvcGVcbiAgICBzY29wZU5hbWUocHJlZml4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9leHRTY29wZS5uYW1lKHByZWZpeCk7XG4gICAgfVxuICAgIC8vIHJlc2VydmVzIHVuaXF1ZSBuYW1lIGluIHRoZSBleHRlcm5hbCBzY29wZSBhbmQgYXNzaWducyB2YWx1ZSB0byBpdFxuICAgIHNjb3BlVmFsdWUocHJlZml4T3JOYW1lLCB2YWx1ZSkge1xuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5fZXh0U2NvcGUudmFsdWUocHJlZml4T3JOYW1lLCB2YWx1ZSk7XG4gICAgICAgIGNvbnN0IHZzID0gdGhpcy5fdmFsdWVzW25hbWUucHJlZml4XSB8fCAodGhpcy5fdmFsdWVzW25hbWUucHJlZml4XSA9IG5ldyBTZXQoKSk7XG4gICAgICAgIHZzLmFkZChuYW1lKTtcbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuICAgIGdldFNjb3BlVmFsdWUocHJlZml4LCBrZXlPclJlZikge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXh0U2NvcGUuZ2V0VmFsdWUocHJlZml4LCBrZXlPclJlZik7XG4gICAgfVxuICAgIC8vIHJldHVybiBjb2RlIHRoYXQgYXNzaWducyB2YWx1ZXMgaW4gdGhlIGV4dGVybmFsIHNjb3BlIHRvIHRoZSBuYW1lcyB0aGF0IGFyZSB1c2VkIGludGVybmFsbHlcbiAgICAvLyAoc2FtZSBuYW1lcyB0aGF0IHdlcmUgcmV0dXJuZWQgYnkgZ2VuLnNjb3BlTmFtZSBvciBnZW4uc2NvcGVWYWx1ZSlcbiAgICBzY29wZVJlZnMoc2NvcGVOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9leHRTY29wZS5zY29wZVJlZnMoc2NvcGVOYW1lLCB0aGlzLl92YWx1ZXMpO1xuICAgIH1cbiAgICBzY29wZUNvZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9leHRTY29wZS5zY29wZUNvZGUodGhpcy5fdmFsdWVzKTtcbiAgICB9XG4gICAgX2RlZih2YXJLaW5kLCBuYW1lT3JQcmVmaXgsIHJocywgY29uc3RhbnQpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuX3Njb3BlLnRvTmFtZShuYW1lT3JQcmVmaXgpO1xuICAgICAgICBpZiAocmhzICE9PSB1bmRlZmluZWQgJiYgY29uc3RhbnQpXG4gICAgICAgICAgICB0aGlzLl9jb25zdGFudHNbbmFtZS5zdHJdID0gcmhzO1xuICAgICAgICB0aGlzLl9sZWFmTm9kZShuZXcgRGVmKHZhcktpbmQsIG5hbWUsIHJocykpO1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG4gICAgLy8gYGNvbnN0YCBkZWNsYXJhdGlvbiAoYHZhcmAgaW4gZXM1IG1vZGUpXG4gICAgY29uc3QobmFtZU9yUHJlZml4LCByaHMsIF9jb25zdGFudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmKHNjb3BlXzEudmFyS2luZHMuY29uc3QsIG5hbWVPclByZWZpeCwgcmhzLCBfY29uc3RhbnQpO1xuICAgIH1cbiAgICAvLyBgbGV0YCBkZWNsYXJhdGlvbiB3aXRoIG9wdGlvbmFsIGFzc2lnbm1lbnQgKGB2YXJgIGluIGVzNSBtb2RlKVxuICAgIGxldChuYW1lT3JQcmVmaXgsIHJocywgX2NvbnN0YW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYoc2NvcGVfMS52YXJLaW5kcy5sZXQsIG5hbWVPclByZWZpeCwgcmhzLCBfY29uc3RhbnQpO1xuICAgIH1cbiAgICAvLyBgdmFyYCBkZWNsYXJhdGlvbiB3aXRoIG9wdGlvbmFsIGFzc2lnbm1lbnRcbiAgICB2YXIobmFtZU9yUHJlZml4LCByaHMsIF9jb25zdGFudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmKHNjb3BlXzEudmFyS2luZHMudmFyLCBuYW1lT3JQcmVmaXgsIHJocywgX2NvbnN0YW50KTtcbiAgICB9XG4gICAgLy8gYXNzaWdubWVudCBjb2RlXG4gICAgYXNzaWduKGxocywgcmhzLCBzaWRlRWZmZWN0cykge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGVhZk5vZGUobmV3IEFzc2lnbihsaHMsIHJocywgc2lkZUVmZmVjdHMpKTtcbiAgICB9XG4gICAgLy8gYCs9YCBjb2RlXG4gICAgYWRkKGxocywgcmhzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sZWFmTm9kZShuZXcgQXNzaWduT3AobGhzLCBleHBvcnRzLm9wZXJhdG9ycy5BREQsIHJocykpO1xuICAgIH1cbiAgICAvLyBhcHBlbmRzIHBhc3NlZCBTYWZlRXhwciB0byBjb2RlIG9yIGV4ZWN1dGVzIEJsb2NrXG4gICAgY29kZShjKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYyA9PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgICAgICBjKCk7XG4gICAgICAgIGVsc2UgaWYgKGMgIT09IGNvZGVfMS5uaWwpXG4gICAgICAgICAgICB0aGlzLl9sZWFmTm9kZShuZXcgQW55Q29kZShjKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyByZXR1cm5zIGNvZGUgZm9yIG9iamVjdCBsaXRlcmFsIGZvciB0aGUgcGFzc2VkIGFyZ3VtZW50IGxpc3Qgb2Yga2V5LXZhbHVlIHBhaXJzXG4gICAgb2JqZWN0KC4uLmtleVZhbHVlcykge1xuICAgICAgICBjb25zdCBjb2RlID0gW1wie1wiXTtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2Yga2V5VmFsdWVzKSB7XG4gICAgICAgICAgICBpZiAoY29kZS5sZW5ndGggPiAxKVxuICAgICAgICAgICAgICAgIGNvZGUucHVzaChcIixcIik7XG4gICAgICAgICAgICBjb2RlLnB1c2goa2V5KTtcbiAgICAgICAgICAgIGlmIChrZXkgIT09IHZhbHVlIHx8IHRoaXMub3B0cy5lczUpIHtcbiAgICAgICAgICAgICAgICBjb2RlLnB1c2goXCI6XCIpO1xuICAgICAgICAgICAgICAgICgwLCBjb2RlXzEuYWRkQ29kZUFyZykoY29kZSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvZGUucHVzaChcIn1cIik7XG4gICAgICAgIHJldHVybiBuZXcgY29kZV8xLl9Db2RlKGNvZGUpO1xuICAgIH1cbiAgICAvLyBgaWZgIGNsYXVzZSAob3Igc3RhdGVtZW50IGlmIGB0aGVuQm9keWAgYW5kLCBvcHRpb25hbGx5LCBgZWxzZUJvZHlgIGFyZSBwYXNzZWQpXG4gICAgaWYoY29uZGl0aW9uLCB0aGVuQm9keSwgZWxzZUJvZHkpIHtcbiAgICAgICAgdGhpcy5fYmxvY2tOb2RlKG5ldyBJZihjb25kaXRpb24pKTtcbiAgICAgICAgaWYgKHRoZW5Cb2R5ICYmIGVsc2VCb2R5KSB7XG4gICAgICAgICAgICB0aGlzLmNvZGUodGhlbkJvZHkpLmVsc2UoKS5jb2RlKGVsc2VCb2R5KS5lbmRJZigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoZW5Cb2R5KSB7XG4gICAgICAgICAgICB0aGlzLmNvZGUodGhlbkJvZHkpLmVuZElmKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZWxzZUJvZHkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29kZUdlbjogXCJlbHNlXCIgYm9keSB3aXRob3V0IFwidGhlblwiIGJvZHknKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8gYGVsc2UgaWZgIGNsYXVzZSAtIGludmFsaWQgd2l0aG91dCBgaWZgIG9yIGFmdGVyIGBlbHNlYCBjbGF1c2VzXG4gICAgZWxzZUlmKGNvbmRpdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWxzZU5vZGUobmV3IElmKGNvbmRpdGlvbikpO1xuICAgIH1cbiAgICAvLyBgZWxzZWAgY2xhdXNlIC0gb25seSB2YWxpZCBhZnRlciBgaWZgIG9yIGBlbHNlIGlmYCBjbGF1c2VzXG4gICAgZWxzZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Vsc2VOb2RlKG5ldyBFbHNlKCkpO1xuICAgIH1cbiAgICAvLyBlbmQgYGlmYCBzdGF0ZW1lbnQgKG5lZWRlZCBpZiBnZW4uaWYgd2FzIHVzZWQgb25seSB3aXRoIGNvbmRpdGlvbilcbiAgICBlbmRJZigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuZEJsb2NrTm9kZShJZiwgRWxzZSk7XG4gICAgfVxuICAgIF9mb3Iobm9kZSwgZm9yQm9keSkge1xuICAgICAgICB0aGlzLl9ibG9ja05vZGUobm9kZSk7XG4gICAgICAgIGlmIChmb3JCb2R5KVxuICAgICAgICAgICAgdGhpcy5jb2RlKGZvckJvZHkpLmVuZEZvcigpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8gYSBnZW5lcmljIGBmb3JgIGNsYXVzZSAob3Igc3RhdGVtZW50IGlmIGBmb3JCb2R5YCBpcyBwYXNzZWQpXG4gICAgZm9yKGl0ZXJhdGlvbiwgZm9yQm9keSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZm9yKG5ldyBGb3JMb29wKGl0ZXJhdGlvbiksIGZvckJvZHkpO1xuICAgIH1cbiAgICAvLyBgZm9yYCBzdGF0ZW1lbnQgZm9yIGEgcmFuZ2Ugb2YgdmFsdWVzXG4gICAgZm9yUmFuZ2UobmFtZU9yUHJlZml4LCBmcm9tLCB0bywgZm9yQm9keSwgdmFyS2luZCA9IHRoaXMub3B0cy5lczUgPyBzY29wZV8xLnZhcktpbmRzLnZhciA6IHNjb3BlXzEudmFyS2luZHMubGV0KSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9zY29wZS50b05hbWUobmFtZU9yUHJlZml4KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZvcihuZXcgRm9yUmFuZ2UodmFyS2luZCwgbmFtZSwgZnJvbSwgdG8pLCAoKSA9PiBmb3JCb2R5KG5hbWUpKTtcbiAgICB9XG4gICAgLy8gYGZvci1vZmAgc3RhdGVtZW50IChpbiBlczUgbW9kZSByZXBsYWNlIHdpdGggYSBub3JtYWwgZm9yIGxvb3ApXG4gICAgZm9yT2YobmFtZU9yUHJlZml4LCBpdGVyYWJsZSwgZm9yQm9keSwgdmFyS2luZCA9IHNjb3BlXzEudmFyS2luZHMuY29uc3QpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuX3Njb3BlLnRvTmFtZShuYW1lT3JQcmVmaXgpO1xuICAgICAgICBpZiAodGhpcy5vcHRzLmVzNSkge1xuICAgICAgICAgICAgY29uc3QgYXJyID0gaXRlcmFibGUgaW5zdGFuY2VvZiBjb2RlXzEuTmFtZSA/IGl0ZXJhYmxlIDogdGhpcy52YXIoXCJfYXJyXCIsIGl0ZXJhYmxlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvclJhbmdlKFwiX2lcIiwgMCwgKDAsIGNvZGVfMS5fKSBgJHthcnJ9Lmxlbmd0aGAsIChpKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy52YXIobmFtZSwgKDAsIGNvZGVfMS5fKSBgJHthcnJ9WyR7aX1dYCk7XG4gICAgICAgICAgICAgICAgZm9yQm9keShuYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9mb3IobmV3IEZvckl0ZXIoXCJvZlwiLCB2YXJLaW5kLCBuYW1lLCBpdGVyYWJsZSksICgpID0+IGZvckJvZHkobmFtZSkpO1xuICAgIH1cbiAgICAvLyBgZm9yLWluYCBzdGF0ZW1lbnQuXG4gICAgLy8gV2l0aCBvcHRpb24gYG93blByb3BlcnRpZXNgIHJlcGxhY2VkIHdpdGggYSBgZm9yLW9mYCBsb29wIGZvciBvYmplY3Qga2V5c1xuICAgIGZvckluKG5hbWVPclByZWZpeCwgb2JqLCBmb3JCb2R5LCB2YXJLaW5kID0gdGhpcy5vcHRzLmVzNSA/IHNjb3BlXzEudmFyS2luZHMudmFyIDogc2NvcGVfMS52YXJLaW5kcy5jb25zdCkge1xuICAgICAgICBpZiAodGhpcy5vcHRzLm93blByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvck9mKG5hbWVPclByZWZpeCwgKDAsIGNvZGVfMS5fKSBgT2JqZWN0LmtleXMoJHtvYmp9KWAsIGZvckJvZHkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9zY29wZS50b05hbWUobmFtZU9yUHJlZml4KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZvcihuZXcgRm9ySXRlcihcImluXCIsIHZhcktpbmQsIG5hbWUsIG9iaiksICgpID0+IGZvckJvZHkobmFtZSkpO1xuICAgIH1cbiAgICAvLyBlbmQgYGZvcmAgbG9vcFxuICAgIGVuZEZvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuZEJsb2NrTm9kZShGb3IpO1xuICAgIH1cbiAgICAvLyBgbGFiZWxgIHN0YXRlbWVudFxuICAgIGxhYmVsKGxhYmVsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sZWFmTm9kZShuZXcgTGFiZWwobGFiZWwpKTtcbiAgICB9XG4gICAgLy8gYGJyZWFrYCBzdGF0ZW1lbnRcbiAgICBicmVhayhsYWJlbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGVhZk5vZGUobmV3IEJyZWFrKGxhYmVsKSk7XG4gICAgfVxuICAgIC8vIGByZXR1cm5gIHN0YXRlbWVudFxuICAgIHJldHVybih2YWx1ZSkge1xuICAgICAgICBjb25zdCBub2RlID0gbmV3IFJldHVybigpO1xuICAgICAgICB0aGlzLl9ibG9ja05vZGUobm9kZSk7XG4gICAgICAgIHRoaXMuY29kZSh2YWx1ZSk7XG4gICAgICAgIGlmIChub2RlLm5vZGVzLmxlbmd0aCAhPT0gMSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29kZUdlbjogXCJyZXR1cm5cIiBzaG91bGQgaGF2ZSBvbmUgbm9kZScpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZW5kQmxvY2tOb2RlKFJldHVybik7XG4gICAgfVxuICAgIC8vIGB0cnlgIHN0YXRlbWVudFxuICAgIHRyeSh0cnlCb2R5LCBjYXRjaENvZGUsIGZpbmFsbHlDb2RlKSB7XG4gICAgICAgIGlmICghY2F0Y2hDb2RlICYmICFmaW5hbGx5Q29kZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29kZUdlbjogXCJ0cnlcIiB3aXRob3V0IFwiY2F0Y2hcIiBhbmQgXCJmaW5hbGx5XCInKTtcbiAgICAgICAgY29uc3Qgbm9kZSA9IG5ldyBUcnkoKTtcbiAgICAgICAgdGhpcy5fYmxvY2tOb2RlKG5vZGUpO1xuICAgICAgICB0aGlzLmNvZGUodHJ5Qm9keSk7XG4gICAgICAgIGlmIChjYXRjaENvZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gdGhpcy5uYW1lKFwiZVwiKTtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJOb2RlID0gbm9kZS5jYXRjaCA9IG5ldyBDYXRjaChlcnJvcik7XG4gICAgICAgICAgICBjYXRjaENvZGUoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaW5hbGx5Q29kZSkge1xuICAgICAgICAgICAgdGhpcy5fY3Vyck5vZGUgPSBub2RlLmZpbmFsbHkgPSBuZXcgRmluYWxseSgpO1xuICAgICAgICAgICAgdGhpcy5jb2RlKGZpbmFsbHlDb2RlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZW5kQmxvY2tOb2RlKENhdGNoLCBGaW5hbGx5KTtcbiAgICB9XG4gICAgLy8gYHRocm93YCBzdGF0ZW1lbnRcbiAgICB0aHJvdyhlcnJvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGVhZk5vZGUobmV3IFRocm93KGVycm9yKSk7XG4gICAgfVxuICAgIC8vIHN0YXJ0IHNlbGYtYmFsYW5jaW5nIGJsb2NrXG4gICAgYmxvY2soYm9keSwgbm9kZUNvdW50KSB7XG4gICAgICAgIHRoaXMuX2Jsb2NrU3RhcnRzLnB1c2godGhpcy5fbm9kZXMubGVuZ3RoKTtcbiAgICAgICAgaWYgKGJvZHkpXG4gICAgICAgICAgICB0aGlzLmNvZGUoYm9keSkuZW5kQmxvY2sobm9kZUNvdW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIGVuZCB0aGUgY3VycmVudCBzZWxmLWJhbGFuY2luZyBibG9ja1xuICAgIGVuZEJsb2NrKG5vZGVDb3VudCkge1xuICAgICAgICBjb25zdCBsZW4gPSB0aGlzLl9ibG9ja1N0YXJ0cy5wb3AoKTtcbiAgICAgICAgaWYgKGxlbiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29kZUdlbjogbm90IGluIHNlbGYtYmFsYW5jaW5nIGJsb2NrXCIpO1xuICAgICAgICBjb25zdCB0b0Nsb3NlID0gdGhpcy5fbm9kZXMubGVuZ3RoIC0gbGVuO1xuICAgICAgICBpZiAodG9DbG9zZSA8IDAgfHwgKG5vZGVDb3VudCAhPT0gdW5kZWZpbmVkICYmIHRvQ2xvc2UgIT09IG5vZGVDb3VudCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ29kZUdlbjogd3JvbmcgbnVtYmVyIG9mIG5vZGVzOiAke3RvQ2xvc2V9IHZzICR7bm9kZUNvdW50fSBleHBlY3RlZGApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX25vZGVzLmxlbmd0aCA9IGxlbjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIGBmdW5jdGlvbmAgaGVhZGluZyAob3IgZGVmaW5pdGlvbiBpZiBmdW5jQm9keSBpcyBwYXNzZWQpXG4gICAgZnVuYyhuYW1lLCBhcmdzID0gY29kZV8xLm5pbCwgYXN5bmMsIGZ1bmNCb2R5KSB7XG4gICAgICAgIHRoaXMuX2Jsb2NrTm9kZShuZXcgRnVuYyhuYW1lLCBhcmdzLCBhc3luYykpO1xuICAgICAgICBpZiAoZnVuY0JvZHkpXG4gICAgICAgICAgICB0aGlzLmNvZGUoZnVuY0JvZHkpLmVuZEZ1bmMoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIGVuZCBmdW5jdGlvbiBkZWZpbml0aW9uXG4gICAgZW5kRnVuYygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuZEJsb2NrTm9kZShGdW5jKTtcbiAgICB9XG4gICAgb3B0aW1pemUobiA9IDEpIHtcbiAgICAgICAgd2hpbGUgKG4tLSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3Qub3B0aW1pemVOb2RlcygpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdC5vcHRpbWl6ZU5hbWVzKHRoaXMuX3Jvb3QubmFtZXMsIHRoaXMuX2NvbnN0YW50cyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2xlYWZOb2RlKG5vZGUpIHtcbiAgICAgICAgdGhpcy5fY3Vyck5vZGUubm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIF9ibG9ja05vZGUobm9kZSkge1xuICAgICAgICB0aGlzLl9jdXJyTm9kZS5ub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICB0aGlzLl9ub2Rlcy5wdXNoKG5vZGUpO1xuICAgIH1cbiAgICBfZW5kQmxvY2tOb2RlKE4xLCBOMikge1xuICAgICAgICBjb25zdCBuID0gdGhpcy5fY3Vyck5vZGU7XG4gICAgICAgIGlmIChuIGluc3RhbmNlb2YgTjEgfHwgKE4yICYmIG4gaW5zdGFuY2VvZiBOMikpIHtcbiAgICAgICAgICAgIHRoaXMuX25vZGVzLnBvcCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb2RlR2VuOiBub3QgaW4gYmxvY2sgXCIke04yID8gYCR7TjEua2luZH0vJHtOMi5raW5kfWAgOiBOMS5raW5kfVwiYCk7XG4gICAgfVxuICAgIF9lbHNlTm9kZShub2RlKSB7XG4gICAgICAgIGNvbnN0IG4gPSB0aGlzLl9jdXJyTm9kZTtcbiAgICAgICAgaWYgKCEobiBpbnN0YW5jZW9mIElmKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb2RlR2VuOiBcImVsc2VcIiB3aXRob3V0IFwiaWZcIicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N1cnJOb2RlID0gbi5lbHNlID0gbm9kZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldCBfcm9vdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vZGVzWzBdO1xuICAgIH1cbiAgICBnZXQgX2N1cnJOb2RlKCkge1xuICAgICAgICBjb25zdCBucyA9IHRoaXMuX25vZGVzO1xuICAgICAgICByZXR1cm4gbnNbbnMubGVuZ3RoIC0gMV07XG4gICAgfVxuICAgIHNldCBfY3Vyck5vZGUobm9kZSkge1xuICAgICAgICBjb25zdCBucyA9IHRoaXMuX25vZGVzO1xuICAgICAgICBuc1tucy5sZW5ndGggLSAxXSA9IG5vZGU7XG4gICAgfVxufVxuZXhwb3J0cy5Db2RlR2VuID0gQ29kZUdlbjtcbmZ1bmN0aW9uIGFkZE5hbWVzKG5hbWVzLCBmcm9tKSB7XG4gICAgZm9yIChjb25zdCBuIGluIGZyb20pXG4gICAgICAgIG5hbWVzW25dID0gKG5hbWVzW25dIHx8IDApICsgKGZyb21bbl0gfHwgMCk7XG4gICAgcmV0dXJuIG5hbWVzO1xufVxuZnVuY3Rpb24gYWRkRXhwck5hbWVzKG5hbWVzLCBmcm9tKSB7XG4gICAgcmV0dXJuIGZyb20gaW5zdGFuY2VvZiBjb2RlXzEuX0NvZGVPck5hbWUgPyBhZGROYW1lcyhuYW1lcywgZnJvbS5uYW1lcykgOiBuYW1lcztcbn1cbmZ1bmN0aW9uIG9wdGltaXplRXhwcihleHByLCBuYW1lcywgY29uc3RhbnRzKSB7XG4gICAgaWYgKGV4cHIgaW5zdGFuY2VvZiBjb2RlXzEuTmFtZSlcbiAgICAgICAgcmV0dXJuIHJlcGxhY2VOYW1lKGV4cHIpO1xuICAgIGlmICghY2FuT3B0aW1pemUoZXhwcikpXG4gICAgICAgIHJldHVybiBleHByO1xuICAgIHJldHVybiBuZXcgY29kZV8xLl9Db2RlKGV4cHIuX2l0ZW1zLnJlZHVjZSgoaXRlbXMsIGMpID0+IHtcbiAgICAgICAgaWYgKGMgaW5zdGFuY2VvZiBjb2RlXzEuTmFtZSlcbiAgICAgICAgICAgIGMgPSByZXBsYWNlTmFtZShjKTtcbiAgICAgICAgaWYgKGMgaW5zdGFuY2VvZiBjb2RlXzEuX0NvZGUpXG4gICAgICAgICAgICBpdGVtcy5wdXNoKC4uLmMuX2l0ZW1zKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgaXRlbXMucHVzaChjKTtcbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH0sIFtdKSk7XG4gICAgZnVuY3Rpb24gcmVwbGFjZU5hbWUobikge1xuICAgICAgICBjb25zdCBjID0gY29uc3RhbnRzW24uc3RyXTtcbiAgICAgICAgaWYgKGMgPT09IHVuZGVmaW5lZCB8fCBuYW1lc1tuLnN0cl0gIT09IDEpXG4gICAgICAgICAgICByZXR1cm4gbjtcbiAgICAgICAgZGVsZXRlIG5hbWVzW24uc3RyXTtcbiAgICAgICAgcmV0dXJuIGM7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNhbk9wdGltaXplKGUpIHtcbiAgICAgICAgcmV0dXJuIChlIGluc3RhbmNlb2YgY29kZV8xLl9Db2RlICYmXG4gICAgICAgICAgICBlLl9pdGVtcy5zb21lKChjKSA9PiBjIGluc3RhbmNlb2YgY29kZV8xLk5hbWUgJiYgbmFtZXNbYy5zdHJdID09PSAxICYmIGNvbnN0YW50c1tjLnN0cl0gIT09IHVuZGVmaW5lZCkpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHN1YnRyYWN0TmFtZXMobmFtZXMsIGZyb20pIHtcbiAgICBmb3IgKGNvbnN0IG4gaW4gZnJvbSlcbiAgICAgICAgbmFtZXNbbl0gPSAobmFtZXNbbl0gfHwgMCkgLSAoZnJvbVtuXSB8fCAwKTtcbn1cbmZ1bmN0aW9uIG5vdCh4KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB4ID09IFwiYm9vbGVhblwiIHx8IHR5cGVvZiB4ID09IFwibnVtYmVyXCIgfHwgeCA9PT0gbnVsbCA/ICF4IDogKDAsIGNvZGVfMS5fKSBgISR7cGFyKHgpfWA7XG59XG5leHBvcnRzLm5vdCA9IG5vdDtcbmNvbnN0IGFuZENvZGUgPSBtYXBwZW5kKGV4cG9ydHMub3BlcmF0b3JzLkFORCk7XG4vLyBib29sZWFuIEFORCAoJiYpIGV4cHJlc3Npb24gd2l0aCB0aGUgcGFzc2VkIGFyZ3VtZW50c1xuZnVuY3Rpb24gYW5kKC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gYXJncy5yZWR1Y2UoYW5kQ29kZSk7XG59XG5leHBvcnRzLmFuZCA9IGFuZDtcbmNvbnN0IG9yQ29kZSA9IG1hcHBlbmQoZXhwb3J0cy5vcGVyYXRvcnMuT1IpO1xuLy8gYm9vbGVhbiBPUiAofHwpIGV4cHJlc3Npb24gd2l0aCB0aGUgcGFzc2VkIGFyZ3VtZW50c1xuZnVuY3Rpb24gb3IoLi4uYXJncykge1xuICAgIHJldHVybiBhcmdzLnJlZHVjZShvckNvZGUpO1xufVxuZXhwb3J0cy5vciA9IG9yO1xuZnVuY3Rpb24gbWFwcGVuZChvcCkge1xuICAgIHJldHVybiAoeCwgeSkgPT4gKHggPT09IGNvZGVfMS5uaWwgPyB5IDogeSA9PT0gY29kZV8xLm5pbCA/IHggOiAoMCwgY29kZV8xLl8pIGAke3Bhcih4KX0gJHtvcH0gJHtwYXIoeSl9YCk7XG59XG5mdW5jdGlvbiBwYXIoeCkge1xuICAgIHJldHVybiB4IGluc3RhbmNlb2YgY29kZV8xLk5hbWUgPyB4IDogKDAsIGNvZGVfMS5fKSBgKCR7eH0pYDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5WYWx1ZVNjb3BlID0gZXhwb3J0cy5WYWx1ZVNjb3BlTmFtZSA9IGV4cG9ydHMuU2NvcGUgPSBleHBvcnRzLnZhcktpbmRzID0gZXhwb3J0cy5Vc2VkVmFsdWVTdGF0ZSA9IHZvaWQgMDtcbmNvbnN0IGNvZGVfMSA9IHJlcXVpcmUoXCIuL2NvZGVcIik7XG5jbGFzcyBWYWx1ZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgc3VwZXIoYENvZGVHZW46IFwiY29kZVwiIGZvciAke25hbWV9IG5vdCBkZWZpbmVkYCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSBuYW1lLnZhbHVlO1xuICAgIH1cbn1cbnZhciBVc2VkVmFsdWVTdGF0ZTtcbihmdW5jdGlvbiAoVXNlZFZhbHVlU3RhdGUpIHtcbiAgICBVc2VkVmFsdWVTdGF0ZVtVc2VkVmFsdWVTdGF0ZVtcIlN0YXJ0ZWRcIl0gPSAwXSA9IFwiU3RhcnRlZFwiO1xuICAgIFVzZWRWYWx1ZVN0YXRlW1VzZWRWYWx1ZVN0YXRlW1wiQ29tcGxldGVkXCJdID0gMV0gPSBcIkNvbXBsZXRlZFwiO1xufSkoVXNlZFZhbHVlU3RhdGUgPSBleHBvcnRzLlVzZWRWYWx1ZVN0YXRlIHx8IChleHBvcnRzLlVzZWRWYWx1ZVN0YXRlID0ge30pKTtcbmV4cG9ydHMudmFyS2luZHMgPSB7XG4gICAgY29uc3Q6IG5ldyBjb2RlXzEuTmFtZShcImNvbnN0XCIpLFxuICAgIGxldDogbmV3IGNvZGVfMS5OYW1lKFwibGV0XCIpLFxuICAgIHZhcjogbmV3IGNvZGVfMS5OYW1lKFwidmFyXCIpLFxufTtcbmNsYXNzIFNjb3BlIHtcbiAgICBjb25zdHJ1Y3Rvcih7IHByZWZpeGVzLCBwYXJlbnQgfSA9IHt9KSB7XG4gICAgICAgIHRoaXMuX25hbWVzID0ge307XG4gICAgICAgIHRoaXMuX3ByZWZpeGVzID0gcHJlZml4ZXM7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICB9XG4gICAgdG9OYW1lKG5hbWVPclByZWZpeCkge1xuICAgICAgICByZXR1cm4gbmFtZU9yUHJlZml4IGluc3RhbmNlb2YgY29kZV8xLk5hbWUgPyBuYW1lT3JQcmVmaXggOiB0aGlzLm5hbWUobmFtZU9yUHJlZml4KTtcbiAgICB9XG4gICAgbmFtZShwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBjb2RlXzEuTmFtZSh0aGlzLl9uZXdOYW1lKHByZWZpeCkpO1xuICAgIH1cbiAgICBfbmV3TmFtZShwcmVmaXgpIHtcbiAgICAgICAgY29uc3QgbmcgPSB0aGlzLl9uYW1lc1twcmVmaXhdIHx8IHRoaXMuX25hbWVHcm91cChwcmVmaXgpO1xuICAgICAgICByZXR1cm4gYCR7cHJlZml4fSR7bmcuaW5kZXgrK31gO1xuICAgIH1cbiAgICBfbmFtZUdyb3VwKHByZWZpeCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBpZiAoKChfYiA9IChfYSA9IHRoaXMuX3BhcmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLl9wcmVmaXhlcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmhhcyhwcmVmaXgpKSB8fCAodGhpcy5fcHJlZml4ZXMgJiYgIXRoaXMuX3ByZWZpeGVzLmhhcyhwcmVmaXgpKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb2RlR2VuOiBwcmVmaXggXCIke3ByZWZpeH1cIiBpcyBub3QgYWxsb3dlZCBpbiB0aGlzIHNjb3BlYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0aGlzLl9uYW1lc1twcmVmaXhdID0geyBwcmVmaXgsIGluZGV4OiAwIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuU2NvcGUgPSBTY29wZTtcbmNsYXNzIFZhbHVlU2NvcGVOYW1lIGV4dGVuZHMgY29kZV8xLk5hbWUge1xuICAgIGNvbnN0cnVjdG9yKHByZWZpeCwgbmFtZVN0cikge1xuICAgICAgICBzdXBlcihuYW1lU3RyKTtcbiAgICAgICAgdGhpcy5wcmVmaXggPSBwcmVmaXg7XG4gICAgfVxuICAgIHNldFZhbHVlKHZhbHVlLCB7IHByb3BlcnR5LCBpdGVtSW5kZXggfSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2NvcGVQYXRoID0gKDAsIGNvZGVfMS5fKSBgLiR7bmV3IGNvZGVfMS5OYW1lKHByb3BlcnR5KX1bJHtpdGVtSW5kZXh9XWA7XG4gICAgfVxufVxuZXhwb3J0cy5WYWx1ZVNjb3BlTmFtZSA9IFZhbHVlU2NvcGVOYW1lO1xuY29uc3QgbGluZSA9ICgwLCBjb2RlXzEuXykgYFxcbmA7XG5jbGFzcyBWYWx1ZVNjb3BlIGV4dGVuZHMgU2NvcGUge1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgc3VwZXIob3B0cyk7XG4gICAgICAgIHRoaXMuX3ZhbHVlcyA9IHt9O1xuICAgICAgICB0aGlzLl9zY29wZSA9IG9wdHMuc2NvcGU7XG4gICAgICAgIHRoaXMub3B0cyA9IHsgLi4ub3B0cywgX246IG9wdHMubGluZXMgPyBsaW5lIDogY29kZV8xLm5pbCB9O1xuICAgIH1cbiAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY29wZTtcbiAgICB9XG4gICAgbmFtZShwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWYWx1ZVNjb3BlTmFtZShwcmVmaXgsIHRoaXMuX25ld05hbWUocHJlZml4KSk7XG4gICAgfVxuICAgIHZhbHVlKG5hbWVPclByZWZpeCwgdmFsdWUpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodmFsdWUucmVmID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb2RlR2VuOiByZWYgbXVzdCBiZSBwYXNzZWQgaW4gdmFsdWVcIik7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLnRvTmFtZShuYW1lT3JQcmVmaXgpO1xuICAgICAgICBjb25zdCB7IHByZWZpeCB9ID0gbmFtZTtcbiAgICAgICAgY29uc3QgdmFsdWVLZXkgPSAoX2EgPSB2YWx1ZS5rZXkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHZhbHVlLnJlZjtcbiAgICAgICAgbGV0IHZzID0gdGhpcy5fdmFsdWVzW3ByZWZpeF07XG4gICAgICAgIGlmICh2cykge1xuICAgICAgICAgICAgY29uc3QgX25hbWUgPSB2cy5nZXQodmFsdWVLZXkpO1xuICAgICAgICAgICAgaWYgKF9uYW1lKVxuICAgICAgICAgICAgICAgIHJldHVybiBfbmFtZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZzID0gdGhpcy5fdmFsdWVzW3ByZWZpeF0gPSBuZXcgTWFwKCk7XG4gICAgICAgIH1cbiAgICAgICAgdnMuc2V0KHZhbHVlS2V5LCBuYW1lKTtcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuX3Njb3BlW3ByZWZpeF0gfHwgKHRoaXMuX3Njb3BlW3ByZWZpeF0gPSBbXSk7XG4gICAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IHMubGVuZ3RoO1xuICAgICAgICBzW2l0ZW1JbmRleF0gPSB2YWx1ZS5yZWY7XG4gICAgICAgIG5hbWUuc2V0VmFsdWUodmFsdWUsIHsgcHJvcGVydHk6IHByZWZpeCwgaXRlbUluZGV4IH0pO1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG4gICAgZ2V0VmFsdWUocHJlZml4LCBrZXlPclJlZikge1xuICAgICAgICBjb25zdCB2cyA9IHRoaXMuX3ZhbHVlc1twcmVmaXhdO1xuICAgICAgICBpZiAoIXZzKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICByZXR1cm4gdnMuZ2V0KGtleU9yUmVmKTtcbiAgICB9XG4gICAgc2NvcGVSZWZzKHNjb3BlTmFtZSwgdmFsdWVzID0gdGhpcy5fdmFsdWVzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWR1Y2VWYWx1ZXModmFsdWVzLCAobmFtZSkgPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUuc2NvcGVQYXRoID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb2RlR2VuOiBuYW1lIFwiJHtuYW1lfVwiIGhhcyBubyB2YWx1ZWApO1xuICAgICAgICAgICAgcmV0dXJuICgwLCBjb2RlXzEuXykgYCR7c2NvcGVOYW1lfSR7bmFtZS5zY29wZVBhdGh9YDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNjb3BlQ29kZSh2YWx1ZXMgPSB0aGlzLl92YWx1ZXMsIHVzZWRWYWx1ZXMsIGdldENvZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZHVjZVZhbHVlcyh2YWx1ZXMsIChuYW1lKSA9PiB7XG4gICAgICAgICAgICBpZiAobmFtZS52YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ29kZUdlbjogbmFtZSBcIiR7bmFtZX1cIiBoYXMgbm8gdmFsdWVgKTtcbiAgICAgICAgICAgIHJldHVybiBuYW1lLnZhbHVlLmNvZGU7XG4gICAgICAgIH0sIHVzZWRWYWx1ZXMsIGdldENvZGUpO1xuICAgIH1cbiAgICBfcmVkdWNlVmFsdWVzKHZhbHVlcywgdmFsdWVDb2RlLCB1c2VkVmFsdWVzID0ge30sIGdldENvZGUpIHtcbiAgICAgICAgbGV0IGNvZGUgPSBjb2RlXzEubmlsO1xuICAgICAgICBmb3IgKGNvbnN0IHByZWZpeCBpbiB2YWx1ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHZzID0gdmFsdWVzW3ByZWZpeF07XG4gICAgICAgICAgICBpZiAoIXZzKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgbmFtZVNldCA9ICh1c2VkVmFsdWVzW3ByZWZpeF0gPSB1c2VkVmFsdWVzW3ByZWZpeF0gfHwgbmV3IE1hcCgpKTtcbiAgICAgICAgICAgIHZzLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobmFtZVNldC5oYXMobmFtZSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBuYW1lU2V0LnNldChuYW1lLCBVc2VkVmFsdWVTdGF0ZS5TdGFydGVkKTtcbiAgICAgICAgICAgICAgICBsZXQgYyA9IHZhbHVlQ29kZShuYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoYykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWYgPSB0aGlzLm9wdHMuZXM1ID8gZXhwb3J0cy52YXJLaW5kcy52YXIgOiBleHBvcnRzLnZhcktpbmRzLmNvbnN0O1xuICAgICAgICAgICAgICAgICAgICBjb2RlID0gKDAsIGNvZGVfMS5fKSBgJHtjb2RlfSR7ZGVmfSAke25hbWV9ID0gJHtjfTske3RoaXMub3B0cy5fbn1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICgoYyA9IGdldENvZGUgPT09IG51bGwgfHwgZ2V0Q29kZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZ2V0Q29kZShuYW1lKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29kZSA9ICgwLCBjb2RlXzEuXykgYCR7Y29kZX0ke2N9JHt0aGlzLm9wdHMuX259YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBWYWx1ZUVycm9yKG5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuYW1lU2V0LnNldChuYW1lLCBVc2VkVmFsdWVTdGF0ZS5Db21wbGV0ZWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvZGU7XG4gICAgfVxufVxuZXhwb3J0cy5WYWx1ZVNjb3BlID0gVmFsdWVTY29wZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjb3BlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5leHRlbmRFcnJvcnMgPSBleHBvcnRzLnJlc2V0RXJyb3JzQ291bnQgPSBleHBvcnRzLnJlcG9ydEV4dHJhRXJyb3IgPSBleHBvcnRzLnJlcG9ydEVycm9yID0gZXhwb3J0cy5rZXl3b3JkJERhdGFFcnJvciA9IGV4cG9ydHMua2V5d29yZEVycm9yID0gdm9pZCAwO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4vY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4vbmFtZXNcIik7XG5leHBvcnRzLmtleXdvcmRFcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBrZXl3b3JkIH0pID0+ICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBwYXNzIFwiJHtrZXl3b3JkfVwiIGtleXdvcmQgdmFsaWRhdGlvbmAsXG59O1xuZXhwb3J0cy5rZXl3b3JkJERhdGFFcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBrZXl3b3JkLCBzY2hlbWFUeXBlIH0pID0+IHNjaGVtYVR5cGVcbiAgICAgICAgPyAoMCwgY29kZWdlbl8xLnN0cikgYFwiJHtrZXl3b3JkfVwiIGtleXdvcmQgbXVzdCBiZSAke3NjaGVtYVR5cGV9ICgkZGF0YSlgXG4gICAgICAgIDogKDAsIGNvZGVnZW5fMS5zdHIpIGBcIiR7a2V5d29yZH1cIiBrZXl3b3JkIGlzIGludmFsaWQgKCRkYXRhKWAsXG59O1xuZnVuY3Rpb24gcmVwb3J0RXJyb3IoY3h0LCBlcnJvciA9IGV4cG9ydHMua2V5d29yZEVycm9yLCBlcnJvclBhdGhzLCBvdmVycmlkZUFsbEVycm9ycykge1xuICAgIGNvbnN0IHsgaXQgfSA9IGN4dDtcbiAgICBjb25zdCB7IGdlbiwgY29tcG9zaXRlUnVsZSwgYWxsRXJyb3JzIH0gPSBpdDtcbiAgICBjb25zdCBlcnJPYmogPSBlcnJvck9iamVjdENvZGUoY3h0LCBlcnJvciwgZXJyb3JQYXRocyk7XG4gICAgaWYgKG92ZXJyaWRlQWxsRXJyb3JzICE9PSBudWxsICYmIG92ZXJyaWRlQWxsRXJyb3JzICE9PSB2b2lkIDAgPyBvdmVycmlkZUFsbEVycm9ycyA6IChjb21wb3NpdGVSdWxlIHx8IGFsbEVycm9ycykpIHtcbiAgICAgICAgYWRkRXJyb3IoZ2VuLCBlcnJPYmopO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuRXJyb3JzKGl0LCAoMCwgY29kZWdlbl8xLl8pIGBbJHtlcnJPYmp9XWApO1xuICAgIH1cbn1cbmV4cG9ydHMucmVwb3J0RXJyb3IgPSByZXBvcnRFcnJvcjtcbmZ1bmN0aW9uIHJlcG9ydEV4dHJhRXJyb3IoY3h0LCBlcnJvciA9IGV4cG9ydHMua2V5d29yZEVycm9yLCBlcnJvclBhdGhzKSB7XG4gICAgY29uc3QgeyBpdCB9ID0gY3h0O1xuICAgIGNvbnN0IHsgZ2VuLCBjb21wb3NpdGVSdWxlLCBhbGxFcnJvcnMgfSA9IGl0O1xuICAgIGNvbnN0IGVyck9iaiA9IGVycm9yT2JqZWN0Q29kZShjeHQsIGVycm9yLCBlcnJvclBhdGhzKTtcbiAgICBhZGRFcnJvcihnZW4sIGVyck9iaik7XG4gICAgaWYgKCEoY29tcG9zaXRlUnVsZSB8fCBhbGxFcnJvcnMpKSB7XG4gICAgICAgIHJldHVybkVycm9ycyhpdCwgbmFtZXNfMS5kZWZhdWx0LnZFcnJvcnMpO1xuICAgIH1cbn1cbmV4cG9ydHMucmVwb3J0RXh0cmFFcnJvciA9IHJlcG9ydEV4dHJhRXJyb3I7XG5mdW5jdGlvbiByZXNldEVycm9yc0NvdW50KGdlbiwgZXJyc0NvdW50KSB7XG4gICAgZ2VuLmFzc2lnbihuYW1lc18xLmRlZmF1bHQuZXJyb3JzLCBlcnJzQ291bnQpO1xuICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfSAhPT0gbnVsbGAsICgpID0+IGdlbi5pZihlcnJzQ291bnQsICgpID0+IGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudkVycm9yc30ubGVuZ3RoYCwgZXJyc0NvdW50KSwgKCkgPT4gZ2VuLmFzc2lnbihuYW1lc18xLmRlZmF1bHQudkVycm9ycywgbnVsbCkpKTtcbn1cbmV4cG9ydHMucmVzZXRFcnJvcnNDb3VudCA9IHJlc2V0RXJyb3JzQ291bnQ7XG5mdW5jdGlvbiBleHRlbmRFcnJvcnMoeyBnZW4sIGtleXdvcmQsIHNjaGVtYVZhbHVlLCBkYXRhLCBlcnJzQ291bnQsIGl0LCB9KSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKGVycnNDb3VudCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhanYgaW1wbGVtZW50YXRpb24gZXJyb3JcIik7XG4gICAgY29uc3QgZXJyID0gZ2VuLm5hbWUoXCJlcnJcIik7XG4gICAgZ2VuLmZvclJhbmdlKFwiaVwiLCBlcnJzQ291bnQsIG5hbWVzXzEuZGVmYXVsdC5lcnJvcnMsIChpKSA9PiB7XG4gICAgICAgIGdlbi5jb25zdChlcnIsICgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnZFcnJvcnN9WyR7aX1dYCk7XG4gICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2Vycn0uaW5zdGFuY2VQYXRoID09PSB1bmRlZmluZWRgLCAoKSA9PiBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZXJyfS5pbnN0YW5jZVBhdGhgLCAoMCwgY29kZWdlbl8xLnN0ckNvbmNhdCkobmFtZXNfMS5kZWZhdWx0Lmluc3RhbmNlUGF0aCwgaXQuZXJyb3JQYXRoKSkpO1xuICAgICAgICBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZXJyfS5zY2hlbWFQYXRoYCwgKDAsIGNvZGVnZW5fMS5zdHIpIGAke2l0LmVyclNjaGVtYVBhdGh9LyR7a2V5d29yZH1gKTtcbiAgICAgICAgaWYgKGl0Lm9wdHMudmVyYm9zZSkge1xuICAgICAgICAgICAgZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke2Vycn0uc2NoZW1hYCwgc2NoZW1hVmFsdWUpO1xuICAgICAgICAgICAgZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke2Vycn0uZGF0YWAsIGRhdGEpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLmV4dGVuZEVycm9ycyA9IGV4dGVuZEVycm9ycztcbmZ1bmN0aW9uIGFkZEVycm9yKGdlbiwgZXJyT2JqKSB7XG4gICAgY29uc3QgZXJyID0gZ2VuLmNvbnN0KFwiZXJyXCIsIGVyck9iaik7XG4gICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnZFcnJvcnN9ID09PSBudWxsYCwgKCkgPT4gZ2VuLmFzc2lnbihuYW1lc18xLmRlZmF1bHQudkVycm9ycywgKDAsIGNvZGVnZW5fMS5fKSBgWyR7ZXJyfV1gKSwgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudkVycm9yc30ucHVzaCgke2Vycn0pYCk7XG4gICAgZ2VuLmNvZGUoKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQuZXJyb3JzfSsrYCk7XG59XG5mdW5jdGlvbiByZXR1cm5FcnJvcnMoaXQsIGVycnMpIHtcbiAgICBjb25zdCB7IGdlbiwgdmFsaWRhdGVOYW1lLCBzY2hlbWFFbnYgfSA9IGl0O1xuICAgIGlmIChzY2hlbWFFbnYuJGFzeW5jKSB7XG4gICAgICAgIGdlbi50aHJvdygoMCwgY29kZWdlbl8xLl8pIGBuZXcgJHtpdC5WYWxpZGF0aW9uRXJyb3J9KCR7ZXJyc30pYCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7dmFsaWRhdGVOYW1lfS5lcnJvcnNgLCBlcnJzKTtcbiAgICAgICAgZ2VuLnJldHVybihmYWxzZSk7XG4gICAgfVxufVxuY29uc3QgRSA9IHtcbiAgICBrZXl3b3JkOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJrZXl3b3JkXCIpLFxuICAgIHNjaGVtYVBhdGg6IG5ldyBjb2RlZ2VuXzEuTmFtZShcInNjaGVtYVBhdGhcIiksXG4gICAgcGFyYW1zOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJwYXJhbXNcIiksXG4gICAgcHJvcGVydHlOYW1lOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJwcm9wZXJ0eU5hbWVcIiksXG4gICAgbWVzc2FnZTogbmV3IGNvZGVnZW5fMS5OYW1lKFwibWVzc2FnZVwiKSxcbiAgICBzY2hlbWE6IG5ldyBjb2RlZ2VuXzEuTmFtZShcInNjaGVtYVwiKSxcbiAgICBwYXJlbnRTY2hlbWE6IG5ldyBjb2RlZ2VuXzEuTmFtZShcInBhcmVudFNjaGVtYVwiKSxcbn07XG5mdW5jdGlvbiBlcnJvck9iamVjdENvZGUoY3h0LCBlcnJvciwgZXJyb3JQYXRocykge1xuICAgIGNvbnN0IHsgY3JlYXRlRXJyb3JzIH0gPSBjeHQuaXQ7XG4gICAgaWYgKGNyZWF0ZUVycm9ycyA9PT0gZmFsc2UpXG4gICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGB7fWA7XG4gICAgcmV0dXJuIGVycm9yT2JqZWN0KGN4dCwgZXJyb3IsIGVycm9yUGF0aHMpO1xufVxuZnVuY3Rpb24gZXJyb3JPYmplY3QoY3h0LCBlcnJvciwgZXJyb3JQYXRocyA9IHt9KSB7XG4gICAgY29uc3QgeyBnZW4sIGl0IH0gPSBjeHQ7XG4gICAgY29uc3Qga2V5VmFsdWVzID0gW1xuICAgICAgICBlcnJvckluc3RhbmNlUGF0aChpdCwgZXJyb3JQYXRocyksXG4gICAgICAgIGVycm9yU2NoZW1hUGF0aChjeHQsIGVycm9yUGF0aHMpLFxuICAgIF07XG4gICAgZXh0cmFFcnJvclByb3BzKGN4dCwgZXJyb3IsIGtleVZhbHVlcyk7XG4gICAgcmV0dXJuIGdlbi5vYmplY3QoLi4ua2V5VmFsdWVzKTtcbn1cbmZ1bmN0aW9uIGVycm9ySW5zdGFuY2VQYXRoKHsgZXJyb3JQYXRoIH0sIHsgaW5zdGFuY2VQYXRoIH0pIHtcbiAgICBjb25zdCBpbnN0UGF0aCA9IGluc3RhbmNlUGF0aFxuICAgICAgICA/ICgwLCBjb2RlZ2VuXzEuc3RyKSBgJHtlcnJvclBhdGh9JHsoMCwgdXRpbF8xLmdldEVycm9yUGF0aCkoaW5zdGFuY2VQYXRoLCB1dGlsXzEuVHlwZS5TdHIpfWBcbiAgICAgICAgOiBlcnJvclBhdGg7XG4gICAgcmV0dXJuIFtuYW1lc18xLmRlZmF1bHQuaW5zdGFuY2VQYXRoLCAoMCwgY29kZWdlbl8xLnN0ckNvbmNhdCkobmFtZXNfMS5kZWZhdWx0Lmluc3RhbmNlUGF0aCwgaW5zdFBhdGgpXTtcbn1cbmZ1bmN0aW9uIGVycm9yU2NoZW1hUGF0aCh7IGtleXdvcmQsIGl0OiB7IGVyclNjaGVtYVBhdGggfSB9LCB7IHNjaGVtYVBhdGgsIHBhcmVudFNjaGVtYSB9KSB7XG4gICAgbGV0IHNjaFBhdGggPSBwYXJlbnRTY2hlbWEgPyBlcnJTY2hlbWFQYXRoIDogKDAsIGNvZGVnZW5fMS5zdHIpIGAke2VyclNjaGVtYVBhdGh9LyR7a2V5d29yZH1gO1xuICAgIGlmIChzY2hlbWFQYXRoKSB7XG4gICAgICAgIHNjaFBhdGggPSAoMCwgY29kZWdlbl8xLnN0cikgYCR7c2NoUGF0aH0keygwLCB1dGlsXzEuZ2V0RXJyb3JQYXRoKShzY2hlbWFQYXRoLCB1dGlsXzEuVHlwZS5TdHIpfWA7XG4gICAgfVxuICAgIHJldHVybiBbRS5zY2hlbWFQYXRoLCBzY2hQYXRoXTtcbn1cbmZ1bmN0aW9uIGV4dHJhRXJyb3JQcm9wcyhjeHQsIHsgcGFyYW1zLCBtZXNzYWdlIH0sIGtleVZhbHVlcykge1xuICAgIGNvbnN0IHsga2V5d29yZCwgZGF0YSwgc2NoZW1hVmFsdWUsIGl0IH0gPSBjeHQ7XG4gICAgY29uc3QgeyBvcHRzLCBwcm9wZXJ0eU5hbWUsIHRvcFNjaGVtYVJlZiwgc2NoZW1hUGF0aCB9ID0gaXQ7XG4gICAga2V5VmFsdWVzLnB1c2goW0Uua2V5d29yZCwga2V5d29yZF0sIFtFLnBhcmFtcywgdHlwZW9mIHBhcmFtcyA9PSBcImZ1bmN0aW9uXCIgPyBwYXJhbXMoY3h0KSA6IHBhcmFtcyB8fCAoMCwgY29kZWdlbl8xLl8pIGB7fWBdKTtcbiAgICBpZiAob3B0cy5tZXNzYWdlcykge1xuICAgICAgICBrZXlWYWx1ZXMucHVzaChbRS5tZXNzYWdlLCB0eXBlb2YgbWVzc2FnZSA9PSBcImZ1bmN0aW9uXCIgPyBtZXNzYWdlKGN4dCkgOiBtZXNzYWdlXSk7XG4gICAgfVxuICAgIGlmIChvcHRzLnZlcmJvc2UpIHtcbiAgICAgICAga2V5VmFsdWVzLnB1c2goW0Uuc2NoZW1hLCBzY2hlbWFWYWx1ZV0sIFtFLnBhcmVudFNjaGVtYSwgKDAsIGNvZGVnZW5fMS5fKSBgJHt0b3BTY2hlbWFSZWZ9JHtzY2hlbWFQYXRofWBdLCBbbmFtZXNfMS5kZWZhdWx0LmRhdGEsIGRhdGFdKTtcbiAgICB9XG4gICAgaWYgKHByb3BlcnR5TmFtZSlcbiAgICAgICAga2V5VmFsdWVzLnB1c2goW0UucHJvcGVydHlOYW1lLCBwcm9wZXJ0eU5hbWVdKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVycm9ycy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVzb2x2ZVNjaGVtYSA9IGV4cG9ydHMuZ2V0Q29tcGlsaW5nU2NoZW1hID0gZXhwb3J0cy5yZXNvbHZlUmVmID0gZXhwb3J0cy5jb21waWxlU2NoZW1hID0gZXhwb3J0cy5TY2hlbWFFbnYgPSB2b2lkIDA7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi9jb2RlZ2VuXCIpO1xuY29uc3QgdmFsaWRhdGlvbl9lcnJvcl8xID0gcmVxdWlyZShcIi4uL3J1bnRpbWUvdmFsaWRhdGlvbl9lcnJvclwiKTtcbmNvbnN0IG5hbWVzXzEgPSByZXF1aXJlKFwiLi9uYW1lc1wiKTtcbmNvbnN0IHJlc29sdmVfMSA9IHJlcXVpcmUoXCIuL3Jlc29sdmVcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuY29uc3QgdmFsaWRhdGVfMSA9IHJlcXVpcmUoXCIuL3ZhbGlkYXRlXCIpO1xuY2xhc3MgU2NoZW1hRW52IHtcbiAgICBjb25zdHJ1Y3RvcihlbnYpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB0aGlzLnJlZnMgPSB7fTtcbiAgICAgICAgdGhpcy5keW5hbWljQW5jaG9ycyA9IHt9O1xuICAgICAgICBsZXQgc2NoZW1hO1xuICAgICAgICBpZiAodHlwZW9mIGVudi5zY2hlbWEgPT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgIHNjaGVtYSA9IGVudi5zY2hlbWE7XG4gICAgICAgIHRoaXMuc2NoZW1hID0gZW52LnNjaGVtYTtcbiAgICAgICAgdGhpcy5zY2hlbWFJZCA9IGVudi5zY2hlbWFJZDtcbiAgICAgICAgdGhpcy5yb290ID0gZW52LnJvb3QgfHwgdGhpcztcbiAgICAgICAgdGhpcy5iYXNlSWQgPSAoX2EgPSBlbnYuYmFzZUlkKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAoMCwgcmVzb2x2ZV8xLm5vcm1hbGl6ZUlkKShzY2hlbWEgPT09IG51bGwgfHwgc2NoZW1hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzY2hlbWFbZW52LnNjaGVtYUlkIHx8IFwiJGlkXCJdKTtcbiAgICAgICAgdGhpcy5zY2hlbWFQYXRoID0gZW52LnNjaGVtYVBhdGg7XG4gICAgICAgIHRoaXMubG9jYWxSZWZzID0gZW52LmxvY2FsUmVmcztcbiAgICAgICAgdGhpcy5tZXRhID0gZW52Lm1ldGE7XG4gICAgICAgIHRoaXMuJGFzeW5jID0gc2NoZW1hID09PSBudWxsIHx8IHNjaGVtYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2NoZW1hLiRhc3luYztcbiAgICAgICAgdGhpcy5yZWZzID0ge307XG4gICAgfVxufVxuZXhwb3J0cy5TY2hlbWFFbnYgPSBTY2hlbWFFbnY7XG4vLyBsZXQgY29kZVNpemUgPSAwXG4vLyBsZXQgbm9kZUNvdW50ID0gMFxuLy8gQ29tcGlsZXMgc2NoZW1hIGluIFNjaGVtYUVudlxuZnVuY3Rpb24gY29tcGlsZVNjaGVtYShzY2gpIHtcbiAgICAvLyBUT0RPIHJlZmFjdG9yIC0gcmVtb3ZlIGNvbXBpbGF0aW9uc1xuICAgIGNvbnN0IF9zY2ggPSBnZXRDb21waWxpbmdTY2hlbWEuY2FsbCh0aGlzLCBzY2gpO1xuICAgIGlmIChfc2NoKVxuICAgICAgICByZXR1cm4gX3NjaDtcbiAgICBjb25zdCByb290SWQgPSAoMCwgcmVzb2x2ZV8xLmdldEZ1bGxQYXRoKSh0aGlzLm9wdHMudXJpUmVzb2x2ZXIsIHNjaC5yb290LmJhc2VJZCk7IC8vIFRPRE8gaWYgZ2V0RnVsbFBhdGggcmVtb3ZlZCAxIHRlc3RzIGZhaWxzXG4gICAgY29uc3QgeyBlczUsIGxpbmVzIH0gPSB0aGlzLm9wdHMuY29kZTtcbiAgICBjb25zdCB7IG93blByb3BlcnRpZXMgfSA9IHRoaXMub3B0cztcbiAgICBjb25zdCBnZW4gPSBuZXcgY29kZWdlbl8xLkNvZGVHZW4odGhpcy5zY29wZSwgeyBlczUsIGxpbmVzLCBvd25Qcm9wZXJ0aWVzIH0pO1xuICAgIGxldCBfVmFsaWRhdGlvbkVycm9yO1xuICAgIGlmIChzY2guJGFzeW5jKSB7XG4gICAgICAgIF9WYWxpZGF0aW9uRXJyb3IgPSBnZW4uc2NvcGVWYWx1ZShcIkVycm9yXCIsIHtcbiAgICAgICAgICAgIHJlZjogdmFsaWRhdGlvbl9lcnJvcl8xLmRlZmF1bHQsXG4gICAgICAgICAgICBjb2RlOiAoMCwgY29kZWdlbl8xLl8pIGByZXF1aXJlKFwiYWp2L2Rpc3QvcnVudGltZS92YWxpZGF0aW9uX2Vycm9yXCIpLmRlZmF1bHRgLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgdmFsaWRhdGVOYW1lID0gZ2VuLnNjb3BlTmFtZShcInZhbGlkYXRlXCIpO1xuICAgIHNjaC52YWxpZGF0ZU5hbWUgPSB2YWxpZGF0ZU5hbWU7XG4gICAgY29uc3Qgc2NoZW1hQ3h0ID0ge1xuICAgICAgICBnZW4sXG4gICAgICAgIGFsbEVycm9yczogdGhpcy5vcHRzLmFsbEVycm9ycyxcbiAgICAgICAgZGF0YTogbmFtZXNfMS5kZWZhdWx0LmRhdGEsXG4gICAgICAgIHBhcmVudERhdGE6IG5hbWVzXzEuZGVmYXVsdC5wYXJlbnREYXRhLFxuICAgICAgICBwYXJlbnREYXRhUHJvcGVydHk6IG5hbWVzXzEuZGVmYXVsdC5wYXJlbnREYXRhUHJvcGVydHksXG4gICAgICAgIGRhdGFOYW1lczogW25hbWVzXzEuZGVmYXVsdC5kYXRhXSxcbiAgICAgICAgZGF0YVBhdGhBcnI6IFtjb2RlZ2VuXzEubmlsXSxcbiAgICAgICAgZGF0YUxldmVsOiAwLFxuICAgICAgICBkYXRhVHlwZXM6IFtdLFxuICAgICAgICBkZWZpbmVkUHJvcGVydGllczogbmV3IFNldCgpLFxuICAgICAgICB0b3BTY2hlbWFSZWY6IGdlbi5zY29wZVZhbHVlKFwic2NoZW1hXCIsIHRoaXMub3B0cy5jb2RlLnNvdXJjZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyB7IHJlZjogc2NoLnNjaGVtYSwgY29kZTogKDAsIGNvZGVnZW5fMS5zdHJpbmdpZnkpKHNjaC5zY2hlbWEpIH1cbiAgICAgICAgICAgIDogeyByZWY6IHNjaC5zY2hlbWEgfSksXG4gICAgICAgIHZhbGlkYXRlTmFtZSxcbiAgICAgICAgVmFsaWRhdGlvbkVycm9yOiBfVmFsaWRhdGlvbkVycm9yLFxuICAgICAgICBzY2hlbWE6IHNjaC5zY2hlbWEsXG4gICAgICAgIHNjaGVtYUVudjogc2NoLFxuICAgICAgICByb290SWQsXG4gICAgICAgIGJhc2VJZDogc2NoLmJhc2VJZCB8fCByb290SWQsXG4gICAgICAgIHNjaGVtYVBhdGg6IGNvZGVnZW5fMS5uaWwsXG4gICAgICAgIGVyclNjaGVtYVBhdGg6IHNjaC5zY2hlbWFQYXRoIHx8ICh0aGlzLm9wdHMuanRkID8gXCJcIiA6IFwiI1wiKSxcbiAgICAgICAgZXJyb3JQYXRoOiAoMCwgY29kZWdlbl8xLl8pIGBcIlwiYCxcbiAgICAgICAgb3B0czogdGhpcy5vcHRzLFxuICAgICAgICBzZWxmOiB0aGlzLFxuICAgIH07XG4gICAgbGV0IHNvdXJjZUNvZGU7XG4gICAgdHJ5IHtcbiAgICAgICAgdGhpcy5fY29tcGlsYXRpb25zLmFkZChzY2gpO1xuICAgICAgICAoMCwgdmFsaWRhdGVfMS52YWxpZGF0ZUZ1bmN0aW9uQ29kZSkoc2NoZW1hQ3h0KTtcbiAgICAgICAgZ2VuLm9wdGltaXplKHRoaXMub3B0cy5jb2RlLm9wdGltaXplKTtcbiAgICAgICAgLy8gZ2VuLm9wdGltaXplKDEpXG4gICAgICAgIGNvbnN0IHZhbGlkYXRlQ29kZSA9IGdlbi50b1N0cmluZygpO1xuICAgICAgICBzb3VyY2VDb2RlID0gYCR7Z2VuLnNjb3BlUmVmcyhuYW1lc18xLmRlZmF1bHQuc2NvcGUpfXJldHVybiAke3ZhbGlkYXRlQ29kZX1gO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygoY29kZVNpemUgKz0gc291cmNlQ29kZS5sZW5ndGgpLCAobm9kZUNvdW50ICs9IGdlbi5ub2RlQ291bnQpKVxuICAgICAgICBpZiAodGhpcy5vcHRzLmNvZGUucHJvY2VzcylcbiAgICAgICAgICAgIHNvdXJjZUNvZGUgPSB0aGlzLm9wdHMuY29kZS5wcm9jZXNzKHNvdXJjZUNvZGUsIHNjaCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiXFxuXFxuXFxuICoqKiBcXG5cIiwgc291cmNlQ29kZSlcbiAgICAgICAgY29uc3QgbWFrZVZhbGlkYXRlID0gbmV3IEZ1bmN0aW9uKGAke25hbWVzXzEuZGVmYXVsdC5zZWxmfWAsIGAke25hbWVzXzEuZGVmYXVsdC5zY29wZX1gLCBzb3VyY2VDb2RlKTtcbiAgICAgICAgY29uc3QgdmFsaWRhdGUgPSBtYWtlVmFsaWRhdGUodGhpcywgdGhpcy5zY29wZS5nZXQoKSk7XG4gICAgICAgIHRoaXMuc2NvcGUudmFsdWUodmFsaWRhdGVOYW1lLCB7IHJlZjogdmFsaWRhdGUgfSk7XG4gICAgICAgIHZhbGlkYXRlLmVycm9ycyA9IG51bGw7XG4gICAgICAgIHZhbGlkYXRlLnNjaGVtYSA9IHNjaC5zY2hlbWE7XG4gICAgICAgIHZhbGlkYXRlLnNjaGVtYUVudiA9IHNjaDtcbiAgICAgICAgaWYgKHNjaC4kYXN5bmMpXG4gICAgICAgICAgICB2YWxpZGF0ZS4kYXN5bmMgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5vcHRzLmNvZGUuc291cmNlID09PSB0cnVlKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZS5zb3VyY2UgPSB7IHZhbGlkYXRlTmFtZSwgdmFsaWRhdGVDb2RlLCBzY29wZVZhbHVlczogZ2VuLl92YWx1ZXMgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRzLnVuZXZhbHVhdGVkKSB7XG4gICAgICAgICAgICBjb25zdCB7IHByb3BzLCBpdGVtcyB9ID0gc2NoZW1hQ3h0O1xuICAgICAgICAgICAgdmFsaWRhdGUuZXZhbHVhdGVkID0ge1xuICAgICAgICAgICAgICAgIHByb3BzOiBwcm9wcyBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lID8gdW5kZWZpbmVkIDogcHJvcHMsXG4gICAgICAgICAgICAgICAgaXRlbXM6IGl0ZW1zIGluc3RhbmNlb2YgY29kZWdlbl8xLk5hbWUgPyB1bmRlZmluZWQgOiBpdGVtcyxcbiAgICAgICAgICAgICAgICBkeW5hbWljUHJvcHM6IHByb3BzIGluc3RhbmNlb2YgY29kZWdlbl8xLk5hbWUsXG4gICAgICAgICAgICAgICAgZHluYW1pY0l0ZW1zOiBpdGVtcyBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0ZS5zb3VyY2UpXG4gICAgICAgICAgICAgICAgdmFsaWRhdGUuc291cmNlLmV2YWx1YXRlZCA9ICgwLCBjb2RlZ2VuXzEuc3RyaW5naWZ5KSh2YWxpZGF0ZS5ldmFsdWF0ZWQpO1xuICAgICAgICB9XG4gICAgICAgIHNjaC52YWxpZGF0ZSA9IHZhbGlkYXRlO1xuICAgICAgICByZXR1cm4gc2NoO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBkZWxldGUgc2NoLnZhbGlkYXRlO1xuICAgICAgICBkZWxldGUgc2NoLnZhbGlkYXRlTmFtZTtcbiAgICAgICAgaWYgKHNvdXJjZUNvZGUpXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihcIkVycm9yIGNvbXBpbGluZyBzY2hlbWEsIGZ1bmN0aW9uIGNvZGU6XCIsIHNvdXJjZUNvZGUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlxcblxcblxcbiAqKiogXFxuXCIsIHNvdXJjZUNvZGUsIHRoaXMub3B0cylcbiAgICAgICAgdGhyb3cgZTtcbiAgICB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRoaXMuX2NvbXBpbGF0aW9ucy5kZWxldGUoc2NoKTtcbiAgICB9XG59XG5leHBvcnRzLmNvbXBpbGVTY2hlbWEgPSBjb21waWxlU2NoZW1hO1xuZnVuY3Rpb24gcmVzb2x2ZVJlZihyb290LCBiYXNlSWQsIHJlZikge1xuICAgIHZhciBfYTtcbiAgICByZWYgPSAoMCwgcmVzb2x2ZV8xLnJlc29sdmVVcmwpKHRoaXMub3B0cy51cmlSZXNvbHZlciwgYmFzZUlkLCByZWYpO1xuICAgIGNvbnN0IHNjaE9yRnVuYyA9IHJvb3QucmVmc1tyZWZdO1xuICAgIGlmIChzY2hPckZ1bmMpXG4gICAgICAgIHJldHVybiBzY2hPckZ1bmM7XG4gICAgbGV0IF9zY2ggPSByZXNvbHZlLmNhbGwodGhpcywgcm9vdCwgcmVmKTtcbiAgICBpZiAoX3NjaCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IHNjaGVtYSA9IChfYSA9IHJvb3QubG9jYWxSZWZzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbcmVmXTsgLy8gVE9ETyBtYXliZSBsb2NhbFJlZnMgc2hvdWxkIGhvbGQgU2NoZW1hRW52XG4gICAgICAgIGNvbnN0IHsgc2NoZW1hSWQgfSA9IHRoaXMub3B0cztcbiAgICAgICAgaWYgKHNjaGVtYSlcbiAgICAgICAgICAgIF9zY2ggPSBuZXcgU2NoZW1hRW52KHsgc2NoZW1hLCBzY2hlbWFJZCwgcm9vdCwgYmFzZUlkIH0pO1xuICAgIH1cbiAgICBpZiAoX3NjaCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm47XG4gICAgcmV0dXJuIChyb290LnJlZnNbcmVmXSA9IGlubGluZU9yQ29tcGlsZS5jYWxsKHRoaXMsIF9zY2gpKTtcbn1cbmV4cG9ydHMucmVzb2x2ZVJlZiA9IHJlc29sdmVSZWY7XG5mdW5jdGlvbiBpbmxpbmVPckNvbXBpbGUoc2NoKSB7XG4gICAgaWYgKCgwLCByZXNvbHZlXzEuaW5saW5lUmVmKShzY2guc2NoZW1hLCB0aGlzLm9wdHMuaW5saW5lUmVmcykpXG4gICAgICAgIHJldHVybiBzY2guc2NoZW1hO1xuICAgIHJldHVybiBzY2gudmFsaWRhdGUgPyBzY2ggOiBjb21waWxlU2NoZW1hLmNhbGwodGhpcywgc2NoKTtcbn1cbi8vIEluZGV4IG9mIHNjaGVtYSBjb21waWxhdGlvbiBpbiB0aGUgY3VycmVudGx5IGNvbXBpbGVkIGxpc3RcbmZ1bmN0aW9uIGdldENvbXBpbGluZ1NjaGVtYShzY2hFbnYpIHtcbiAgICBmb3IgKGNvbnN0IHNjaCBvZiB0aGlzLl9jb21waWxhdGlvbnMpIHtcbiAgICAgICAgaWYgKHNhbWVTY2hlbWFFbnYoc2NoLCBzY2hFbnYpKVxuICAgICAgICAgICAgcmV0dXJuIHNjaDtcbiAgICB9XG59XG5leHBvcnRzLmdldENvbXBpbGluZ1NjaGVtYSA9IGdldENvbXBpbGluZ1NjaGVtYTtcbmZ1bmN0aW9uIHNhbWVTY2hlbWFFbnYoczEsIHMyKSB7XG4gICAgcmV0dXJuIHMxLnNjaGVtYSA9PT0gczIuc2NoZW1hICYmIHMxLnJvb3QgPT09IHMyLnJvb3QgJiYgczEuYmFzZUlkID09PSBzMi5iYXNlSWQ7XG59XG4vLyByZXNvbHZlIGFuZCBjb21waWxlIHRoZSByZWZlcmVuY2VzICgkcmVmKVxuLy8gVE9ETyByZXR1cm5zIEFueVNjaGVtYU9iamVjdCAoaWYgdGhlIHNjaGVtYSBjYW4gYmUgaW5saW5lZCkgb3IgdmFsaWRhdGlvbiBmdW5jdGlvblxuZnVuY3Rpb24gcmVzb2x2ZShyb290LCAvLyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcm9vdCBzY2hlbWEgZm9yIHRoZSBjdXJyZW50IHNjaGVtYVxucmVmIC8vIHJlZmVyZW5jZSB0byByZXNvbHZlXG4pIHtcbiAgICBsZXQgc2NoO1xuICAgIHdoaWxlICh0eXBlb2YgKHNjaCA9IHRoaXMucmVmc1tyZWZdKSA9PSBcInN0cmluZ1wiKVxuICAgICAgICByZWYgPSBzY2g7XG4gICAgcmV0dXJuIHNjaCB8fCB0aGlzLnNjaGVtYXNbcmVmXSB8fCByZXNvbHZlU2NoZW1hLmNhbGwodGhpcywgcm9vdCwgcmVmKTtcbn1cbi8vIFJlc29sdmUgc2NoZW1hLCBpdHMgcm9vdCBhbmQgYmFzZUlkXG5mdW5jdGlvbiByZXNvbHZlU2NoZW1hKHJvb3QsIC8vIHJvb3Qgb2JqZWN0IHdpdGggcHJvcGVydGllcyBzY2hlbWEsIHJlZnMgVE9ETyBiZWxvdyBTY2hlbWFFbnYgaXMgYXNzaWduZWQgdG8gaXRcbnJlZiAvLyByZWZlcmVuY2UgdG8gcmVzb2x2ZVxuKSB7XG4gICAgY29uc3QgcCA9IHRoaXMub3B0cy51cmlSZXNvbHZlci5wYXJzZShyZWYpO1xuICAgIGNvbnN0IHJlZlBhdGggPSAoMCwgcmVzb2x2ZV8xLl9nZXRGdWxsUGF0aCkodGhpcy5vcHRzLnVyaVJlc29sdmVyLCBwKTtcbiAgICBsZXQgYmFzZUlkID0gKDAsIHJlc29sdmVfMS5nZXRGdWxsUGF0aCkodGhpcy5vcHRzLnVyaVJlc29sdmVyLCByb290LmJhc2VJZCwgdW5kZWZpbmVkKTtcbiAgICAvLyBUT0RPIGBPYmplY3Qua2V5cyhyb290LnNjaGVtYSkubGVuZ3RoID4gMGAgc2hvdWxkIG5vdCBiZSBuZWVkZWQgLSBidXQgcmVtb3ZpbmcgYnJlYWtzIDIgdGVzdHNcbiAgICBpZiAoT2JqZWN0LmtleXMocm9vdC5zY2hlbWEpLmxlbmd0aCA+IDAgJiYgcmVmUGF0aCA9PT0gYmFzZUlkKSB7XG4gICAgICAgIHJldHVybiBnZXRKc29uUG9pbnRlci5jYWxsKHRoaXMsIHAsIHJvb3QpO1xuICAgIH1cbiAgICBjb25zdCBpZCA9ICgwLCByZXNvbHZlXzEubm9ybWFsaXplSWQpKHJlZlBhdGgpO1xuICAgIGNvbnN0IHNjaE9yUmVmID0gdGhpcy5yZWZzW2lkXSB8fCB0aGlzLnNjaGVtYXNbaWRdO1xuICAgIGlmICh0eXBlb2Ygc2NoT3JSZWYgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICBjb25zdCBzY2ggPSByZXNvbHZlU2NoZW1hLmNhbGwodGhpcywgcm9vdCwgc2NoT3JSZWYpO1xuICAgICAgICBpZiAodHlwZW9mIChzY2ggPT09IG51bGwgfHwgc2NoID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzY2guc2NoZW1hKSAhPT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgcmV0dXJuIGdldEpzb25Qb2ludGVyLmNhbGwodGhpcywgcCwgc2NoKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiAoc2NoT3JSZWYgPT09IG51bGwgfHwgc2NoT3JSZWYgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNjaE9yUmVmLnNjaGVtYSkgIT09IFwib2JqZWN0XCIpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoIXNjaE9yUmVmLnZhbGlkYXRlKVxuICAgICAgICBjb21waWxlU2NoZW1hLmNhbGwodGhpcywgc2NoT3JSZWYpO1xuICAgIGlmIChpZCA9PT0gKDAsIHJlc29sdmVfMS5ub3JtYWxpemVJZCkocmVmKSkge1xuICAgICAgICBjb25zdCB7IHNjaGVtYSB9ID0gc2NoT3JSZWY7XG4gICAgICAgIGNvbnN0IHsgc2NoZW1hSWQgfSA9IHRoaXMub3B0cztcbiAgICAgICAgY29uc3Qgc2NoSWQgPSBzY2hlbWFbc2NoZW1hSWRdO1xuICAgICAgICBpZiAoc2NoSWQpXG4gICAgICAgICAgICBiYXNlSWQgPSAoMCwgcmVzb2x2ZV8xLnJlc29sdmVVcmwpKHRoaXMub3B0cy51cmlSZXNvbHZlciwgYmFzZUlkLCBzY2hJZCk7XG4gICAgICAgIHJldHVybiBuZXcgU2NoZW1hRW52KHsgc2NoZW1hLCBzY2hlbWFJZCwgcm9vdCwgYmFzZUlkIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0SnNvblBvaW50ZXIuY2FsbCh0aGlzLCBwLCBzY2hPclJlZik7XG59XG5leHBvcnRzLnJlc29sdmVTY2hlbWEgPSByZXNvbHZlU2NoZW1hO1xuY29uc3QgUFJFVkVOVF9TQ09QRV9DSEFOR0UgPSBuZXcgU2V0KFtcbiAgICBcInByb3BlcnRpZXNcIixcbiAgICBcInBhdHRlcm5Qcm9wZXJ0aWVzXCIsXG4gICAgXCJlbnVtXCIsXG4gICAgXCJkZXBlbmRlbmNpZXNcIixcbiAgICBcImRlZmluaXRpb25zXCIsXG5dKTtcbmZ1bmN0aW9uIGdldEpzb25Qb2ludGVyKHBhcnNlZFJlZiwgeyBiYXNlSWQsIHNjaGVtYSwgcm9vdCB9KSB7XG4gICAgdmFyIF9hO1xuICAgIGlmICgoKF9hID0gcGFyc2VkUmVmLmZyYWdtZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF0pICE9PSBcIi9cIilcbiAgICAgICAgcmV0dXJuO1xuICAgIGZvciAoY29uc3QgcGFydCBvZiBwYXJzZWRSZWYuZnJhZ21lbnQuc2xpY2UoMSkuc3BsaXQoXCIvXCIpKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2NoZW1hID09PSBcImJvb2xlYW5cIilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgcGFydFNjaGVtYSA9IHNjaGVtYVsoMCwgdXRpbF8xLnVuZXNjYXBlRnJhZ21lbnQpKHBhcnQpXTtcbiAgICAgICAgaWYgKHBhcnRTY2hlbWEgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgc2NoZW1hID0gcGFydFNjaGVtYTtcbiAgICAgICAgLy8gVE9ETyBQUkVWRU5UX1NDT1BFX0NIQU5HRSBjb3VsZCBiZSBkZWZpbmVkIGluIGtleXdvcmQgZGVmP1xuICAgICAgICBjb25zdCBzY2hJZCA9IHR5cGVvZiBzY2hlbWEgPT09IFwib2JqZWN0XCIgJiYgc2NoZW1hW3RoaXMub3B0cy5zY2hlbWFJZF07XG4gICAgICAgIGlmICghUFJFVkVOVF9TQ09QRV9DSEFOR0UuaGFzKHBhcnQpICYmIHNjaElkKSB7XG4gICAgICAgICAgICBiYXNlSWQgPSAoMCwgcmVzb2x2ZV8xLnJlc29sdmVVcmwpKHRoaXMub3B0cy51cmlSZXNvbHZlciwgYmFzZUlkLCBzY2hJZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IGVudjtcbiAgICBpZiAodHlwZW9mIHNjaGVtYSAhPSBcImJvb2xlYW5cIiAmJiBzY2hlbWEuJHJlZiAmJiAhKDAsIHV0aWxfMS5zY2hlbWFIYXNSdWxlc0J1dFJlZikoc2NoZW1hLCB0aGlzLlJVTEVTKSkge1xuICAgICAgICBjb25zdCAkcmVmID0gKDAsIHJlc29sdmVfMS5yZXNvbHZlVXJsKSh0aGlzLm9wdHMudXJpUmVzb2x2ZXIsIGJhc2VJZCwgc2NoZW1hLiRyZWYpO1xuICAgICAgICBlbnYgPSByZXNvbHZlU2NoZW1hLmNhbGwodGhpcywgcm9vdCwgJHJlZik7XG4gICAgfVxuICAgIC8vIGV2ZW4gdGhvdWdoIHJlc29sdXRpb24gZmFpbGVkIHdlIG5lZWQgdG8gcmV0dXJuIFNjaGVtYUVudiB0byB0aHJvdyBleGNlcHRpb25cbiAgICAvLyBzbyB0aGF0IGNvbXBpbGVBc3luYyBsb2FkcyBtaXNzaW5nIHNjaGVtYS5cbiAgICBjb25zdCB7IHNjaGVtYUlkIH0gPSB0aGlzLm9wdHM7XG4gICAgZW52ID0gZW52IHx8IG5ldyBTY2hlbWFFbnYoeyBzY2hlbWEsIHNjaGVtYUlkLCByb290LCBiYXNlSWQgfSk7XG4gICAgaWYgKGVudi5zY2hlbWEgIT09IGVudi5yb290LnNjaGVtYSlcbiAgICAgICAgcmV0dXJuIGVudjtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi9jb2RlZ2VuXCIpO1xuY29uc3QgbmFtZXMgPSB7XG4gICAgLy8gdmFsaWRhdGlvbiBmdW5jdGlvbiBhcmd1bWVudHNcbiAgICBkYXRhOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJkYXRhXCIpLFxuICAgIC8vIGFyZ3MgcGFzc2VkIGZyb20gcmVmZXJlbmNpbmcgc2NoZW1hXG4gICAgdmFsQ3h0OiBuZXcgY29kZWdlbl8xLk5hbWUoXCJ2YWxDeHRcIiksXG4gICAgaW5zdGFuY2VQYXRoOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJpbnN0YW5jZVBhdGhcIiksXG4gICAgcGFyZW50RGF0YTogbmV3IGNvZGVnZW5fMS5OYW1lKFwicGFyZW50RGF0YVwiKSxcbiAgICBwYXJlbnREYXRhUHJvcGVydHk6IG5ldyBjb2RlZ2VuXzEuTmFtZShcInBhcmVudERhdGFQcm9wZXJ0eVwiKSxcbiAgICByb290RGF0YTogbmV3IGNvZGVnZW5fMS5OYW1lKFwicm9vdERhdGFcIiksXG4gICAgZHluYW1pY0FuY2hvcnM6IG5ldyBjb2RlZ2VuXzEuTmFtZShcImR5bmFtaWNBbmNob3JzXCIpLFxuICAgIC8vIGZ1bmN0aW9uIHNjb3BlZCB2YXJpYWJsZXNcbiAgICB2RXJyb3JzOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJ2RXJyb3JzXCIpLFxuICAgIGVycm9yczogbmV3IGNvZGVnZW5fMS5OYW1lKFwiZXJyb3JzXCIpLFxuICAgIHRoaXM6IG5ldyBjb2RlZ2VuXzEuTmFtZShcInRoaXNcIiksXG4gICAgLy8gXCJnbG9iYWxzXCJcbiAgICBzZWxmOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJzZWxmXCIpLFxuICAgIHNjb3BlOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJzY29wZVwiKSxcbiAgICAvLyBKVEQgc2VyaWFsaXplL3BhcnNlIG5hbWUgZm9yIEpTT04gc3RyaW5nIGFuZCBwb3NpdGlvblxuICAgIGpzb246IG5ldyBjb2RlZ2VuXzEuTmFtZShcImpzb25cIiksXG4gICAganNvblBvczogbmV3IGNvZGVnZW5fMS5OYW1lKFwianNvblBvc1wiKSxcbiAgICBqc29uTGVuOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJqc29uTGVuXCIpLFxuICAgIGpzb25QYXJ0OiBuZXcgY29kZWdlbl8xLk5hbWUoXCJqc29uUGFydFwiKSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBuYW1lcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5hbWVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcmVzb2x2ZV8xID0gcmVxdWlyZShcIi4vcmVzb2x2ZVwiKTtcbmNsYXNzIE1pc3NpbmdSZWZFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihyZXNvbHZlciwgYmFzZUlkLCByZWYsIG1zZykge1xuICAgICAgICBzdXBlcihtc2cgfHwgYGNhbid0IHJlc29sdmUgcmVmZXJlbmNlICR7cmVmfSBmcm9tIGlkICR7YmFzZUlkfWApO1xuICAgICAgICB0aGlzLm1pc3NpbmdSZWYgPSAoMCwgcmVzb2x2ZV8xLnJlc29sdmVVcmwpKHJlc29sdmVyLCBiYXNlSWQsIHJlZik7XG4gICAgICAgIHRoaXMubWlzc2luZ1NjaGVtYSA9ICgwLCByZXNvbHZlXzEubm9ybWFsaXplSWQpKCgwLCByZXNvbHZlXzEuZ2V0RnVsbFBhdGgpKHJlc29sdmVyLCB0aGlzLm1pc3NpbmdSZWYpKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBNaXNzaW5nUmVmRXJyb3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWZfZXJyb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldFNjaGVtYVJlZnMgPSBleHBvcnRzLnJlc29sdmVVcmwgPSBleHBvcnRzLm5vcm1hbGl6ZUlkID0gZXhwb3J0cy5fZ2V0RnVsbFBhdGggPSBleHBvcnRzLmdldEZ1bGxQYXRoID0gZXhwb3J0cy5pbmxpbmVSZWYgPSB2b2lkIDA7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuY29uc3QgZXF1YWwgPSByZXF1aXJlKFwiZmFzdC1kZWVwLWVxdWFsXCIpO1xuY29uc3QgdHJhdmVyc2UgPSByZXF1aXJlKFwianNvbi1zY2hlbWEtdHJhdmVyc2VcIik7XG4vLyBUT0RPIHJlZmFjdG9yIHRvIHVzZSBrZXl3b3JkIGRlZmluaXRpb25zXG5jb25zdCBTSU1QTEVfSU5MSU5FRCA9IG5ldyBTZXQoW1xuICAgIFwidHlwZVwiLFxuICAgIFwiZm9ybWF0XCIsXG4gICAgXCJwYXR0ZXJuXCIsXG4gICAgXCJtYXhMZW5ndGhcIixcbiAgICBcIm1pbkxlbmd0aFwiLFxuICAgIFwibWF4UHJvcGVydGllc1wiLFxuICAgIFwibWluUHJvcGVydGllc1wiLFxuICAgIFwibWF4SXRlbXNcIixcbiAgICBcIm1pbkl0ZW1zXCIsXG4gICAgXCJtYXhpbXVtXCIsXG4gICAgXCJtaW5pbXVtXCIsXG4gICAgXCJ1bmlxdWVJdGVtc1wiLFxuICAgIFwibXVsdGlwbGVPZlwiLFxuICAgIFwicmVxdWlyZWRcIixcbiAgICBcImVudW1cIixcbiAgICBcImNvbnN0XCIsXG5dKTtcbmZ1bmN0aW9uIGlubGluZVJlZihzY2hlbWEsIGxpbWl0ID0gdHJ1ZSkge1xuICAgIGlmICh0eXBlb2Ygc2NoZW1hID09IFwiYm9vbGVhblwiKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICBpZiAobGltaXQgPT09IHRydWUpXG4gICAgICAgIHJldHVybiAhaGFzUmVmKHNjaGVtYSk7XG4gICAgaWYgKCFsaW1pdClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBjb3VudEtleXMoc2NoZW1hKSA8PSBsaW1pdDtcbn1cbmV4cG9ydHMuaW5saW5lUmVmID0gaW5saW5lUmVmO1xuY29uc3QgUkVGX0tFWVdPUkRTID0gbmV3IFNldChbXG4gICAgXCIkcmVmXCIsXG4gICAgXCIkcmVjdXJzaXZlUmVmXCIsXG4gICAgXCIkcmVjdXJzaXZlQW5jaG9yXCIsXG4gICAgXCIkZHluYW1pY1JlZlwiLFxuICAgIFwiJGR5bmFtaWNBbmNob3JcIixcbl0pO1xuZnVuY3Rpb24gaGFzUmVmKHNjaGVtYSkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIHNjaGVtYSkge1xuICAgICAgICBpZiAoUkVGX0tFWVdPUkRTLmhhcyhrZXkpKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGNvbnN0IHNjaCA9IHNjaGVtYVtrZXldO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzY2gpICYmIHNjaC5zb21lKGhhc1JlZikpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKHR5cGVvZiBzY2ggPT0gXCJvYmplY3RcIiAmJiBoYXNSZWYoc2NoKSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBjb3VudEtleXMoc2NoZW1hKSB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzY2hlbWEpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gXCIkcmVmXCIpXG4gICAgICAgICAgICByZXR1cm4gSW5maW5pdHk7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICAgIGlmIChTSU1QTEVfSU5MSU5FRC5oYXMoa2V5KSlcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBpZiAodHlwZW9mIHNjaGVtYVtrZXldID09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICgwLCB1dGlsXzEuZWFjaEl0ZW0pKHNjaGVtYVtrZXldLCAoc2NoKSA9PiAoY291bnQgKz0gY291bnRLZXlzKHNjaCkpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY291bnQgPT09IEluZmluaXR5KVxuICAgICAgICAgICAgcmV0dXJuIEluZmluaXR5O1xuICAgIH1cbiAgICByZXR1cm4gY291bnQ7XG59XG5mdW5jdGlvbiBnZXRGdWxsUGF0aChyZXNvbHZlciwgaWQgPSBcIlwiLCBub3JtYWxpemUpIHtcbiAgICBpZiAobm9ybWFsaXplICE9PSBmYWxzZSlcbiAgICAgICAgaWQgPSBub3JtYWxpemVJZChpZCk7XG4gICAgY29uc3QgcCA9IHJlc29sdmVyLnBhcnNlKGlkKTtcbiAgICByZXR1cm4gX2dldEZ1bGxQYXRoKHJlc29sdmVyLCBwKTtcbn1cbmV4cG9ydHMuZ2V0RnVsbFBhdGggPSBnZXRGdWxsUGF0aDtcbmZ1bmN0aW9uIF9nZXRGdWxsUGF0aChyZXNvbHZlciwgcCkge1xuICAgIGNvbnN0IHNlcmlhbGl6ZWQgPSByZXNvbHZlci5zZXJpYWxpemUocCk7XG4gICAgcmV0dXJuIHNlcmlhbGl6ZWQuc3BsaXQoXCIjXCIpWzBdICsgXCIjXCI7XG59XG5leHBvcnRzLl9nZXRGdWxsUGF0aCA9IF9nZXRGdWxsUGF0aDtcbmNvbnN0IFRSQUlMSU5HX1NMQVNIX0hBU0ggPSAvI1xcLz8kLztcbmZ1bmN0aW9uIG5vcm1hbGl6ZUlkKGlkKSB7XG4gICAgcmV0dXJuIGlkID8gaWQucmVwbGFjZShUUkFJTElOR19TTEFTSF9IQVNILCBcIlwiKSA6IFwiXCI7XG59XG5leHBvcnRzLm5vcm1hbGl6ZUlkID0gbm9ybWFsaXplSWQ7XG5mdW5jdGlvbiByZXNvbHZlVXJsKHJlc29sdmVyLCBiYXNlSWQsIGlkKSB7XG4gICAgaWQgPSBub3JtYWxpemVJZChpZCk7XG4gICAgcmV0dXJuIHJlc29sdmVyLnJlc29sdmUoYmFzZUlkLCBpZCk7XG59XG5leHBvcnRzLnJlc29sdmVVcmwgPSByZXNvbHZlVXJsO1xuY29uc3QgQU5DSE9SID0gL15bYS16X11bLWEtejAtOS5fXSokL2k7XG5mdW5jdGlvbiBnZXRTY2hlbWFSZWZzKHNjaGVtYSwgYmFzZUlkKSB7XG4gICAgaWYgKHR5cGVvZiBzY2hlbWEgPT0gXCJib29sZWFuXCIpXG4gICAgICAgIHJldHVybiB7fTtcbiAgICBjb25zdCB7IHNjaGVtYUlkLCB1cmlSZXNvbHZlciB9ID0gdGhpcy5vcHRzO1xuICAgIGNvbnN0IHNjaElkID0gbm9ybWFsaXplSWQoc2NoZW1hW3NjaGVtYUlkXSB8fCBiYXNlSWQpO1xuICAgIGNvbnN0IGJhc2VJZHMgPSB7IFwiXCI6IHNjaElkIH07XG4gICAgY29uc3QgcGF0aFByZWZpeCA9IGdldEZ1bGxQYXRoKHVyaVJlc29sdmVyLCBzY2hJZCwgZmFsc2UpO1xuICAgIGNvbnN0IGxvY2FsUmVmcyA9IHt9O1xuICAgIGNvbnN0IHNjaGVtYVJlZnMgPSBuZXcgU2V0KCk7XG4gICAgdHJhdmVyc2Uoc2NoZW1hLCB7IGFsbEtleXM6IHRydWUgfSwgKHNjaCwganNvblB0ciwgXywgcGFyZW50SnNvblB0cikgPT4ge1xuICAgICAgICBpZiAocGFyZW50SnNvblB0ciA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBmdWxsUGF0aCA9IHBhdGhQcmVmaXggKyBqc29uUHRyO1xuICAgICAgICBsZXQgYmFzZUlkID0gYmFzZUlkc1twYXJlbnRKc29uUHRyXTtcbiAgICAgICAgaWYgKHR5cGVvZiBzY2hbc2NoZW1hSWRdID09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICBiYXNlSWQgPSBhZGRSZWYuY2FsbCh0aGlzLCBzY2hbc2NoZW1hSWRdKTtcbiAgICAgICAgYWRkQW5jaG9yLmNhbGwodGhpcywgc2NoLiRhbmNob3IpO1xuICAgICAgICBhZGRBbmNob3IuY2FsbCh0aGlzLCBzY2guJGR5bmFtaWNBbmNob3IpO1xuICAgICAgICBiYXNlSWRzW2pzb25QdHJdID0gYmFzZUlkO1xuICAgICAgICBmdW5jdGlvbiBhZGRSZWYocmVmKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3VuYm91bmQtbWV0aG9kXG4gICAgICAgICAgICBjb25zdCBfcmVzb2x2ZSA9IHRoaXMub3B0cy51cmlSZXNvbHZlci5yZXNvbHZlO1xuICAgICAgICAgICAgcmVmID0gbm9ybWFsaXplSWQoYmFzZUlkID8gX3Jlc29sdmUoYmFzZUlkLCByZWYpIDogcmVmKTtcbiAgICAgICAgICAgIGlmIChzY2hlbWFSZWZzLmhhcyhyZWYpKVxuICAgICAgICAgICAgICAgIHRocm93IGFtYmlndW9zKHJlZik7XG4gICAgICAgICAgICBzY2hlbWFSZWZzLmFkZChyZWYpO1xuICAgICAgICAgICAgbGV0IHNjaE9yUmVmID0gdGhpcy5yZWZzW3JlZl07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNjaE9yUmVmID09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgc2NoT3JSZWYgPSB0aGlzLnJlZnNbc2NoT3JSZWZdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzY2hPclJlZiA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tBbWJpZ3Vvc1JlZihzY2gsIHNjaE9yUmVmLnNjaGVtYSwgcmVmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHJlZiAhPT0gbm9ybWFsaXplSWQoZnVsbFBhdGgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlZlswXSA9PT0gXCIjXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tBbWJpZ3Vvc1JlZihzY2gsIGxvY2FsUmVmc1tyZWZdLCByZWYpO1xuICAgICAgICAgICAgICAgICAgICBsb2NhbFJlZnNbcmVmXSA9IHNjaDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmc1tyZWZdID0gZnVsbFBhdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlZjtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBhZGRBbmNob3IoYW5jaG9yKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGFuY2hvciA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFBTkNIT1IudGVzdChhbmNob3IpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgYW5jaG9yIFwiJHthbmNob3J9XCJgKTtcbiAgICAgICAgICAgICAgICBhZGRSZWYuY2FsbCh0aGlzLCBgIyR7YW5jaG9yfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGxvY2FsUmVmcztcbiAgICBmdW5jdGlvbiBjaGVja0FtYmlndW9zUmVmKHNjaDEsIHNjaDIsIHJlZikge1xuICAgICAgICBpZiAoc2NoMiAhPT0gdW5kZWZpbmVkICYmICFlcXVhbChzY2gxLCBzY2gyKSlcbiAgICAgICAgICAgIHRocm93IGFtYmlndW9zKHJlZik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFtYmlndW9zKHJlZikge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKGByZWZlcmVuY2UgXCIke3JlZn1cIiByZXNvbHZlcyB0byBtb3JlIHRoYW4gb25lIHNjaGVtYWApO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0U2NoZW1hUmVmcyA9IGdldFNjaGVtYVJlZnM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXNvbHZlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRSdWxlcyA9IGV4cG9ydHMuaXNKU09OVHlwZSA9IHZvaWQgMDtcbmNvbnN0IF9qc29uVHlwZXMgPSBbXCJzdHJpbmdcIiwgXCJudW1iZXJcIiwgXCJpbnRlZ2VyXCIsIFwiYm9vbGVhblwiLCBcIm51bGxcIiwgXCJvYmplY3RcIiwgXCJhcnJheVwiXTtcbmNvbnN0IGpzb25UeXBlcyA9IG5ldyBTZXQoX2pzb25UeXBlcyk7XG5mdW5jdGlvbiBpc0pTT05UeXBlKHgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHggPT0gXCJzdHJpbmdcIiAmJiBqc29uVHlwZXMuaGFzKHgpO1xufVxuZXhwb3J0cy5pc0pTT05UeXBlID0gaXNKU09OVHlwZTtcbmZ1bmN0aW9uIGdldFJ1bGVzKCkge1xuICAgIGNvbnN0IGdyb3VwcyA9IHtcbiAgICAgICAgbnVtYmVyOiB7IHR5cGU6IFwibnVtYmVyXCIsIHJ1bGVzOiBbXSB9LFxuICAgICAgICBzdHJpbmc6IHsgdHlwZTogXCJzdHJpbmdcIiwgcnVsZXM6IFtdIH0sXG4gICAgICAgIGFycmF5OiB7IHR5cGU6IFwiYXJyYXlcIiwgcnVsZXM6IFtdIH0sXG4gICAgICAgIG9iamVjdDogeyB0eXBlOiBcIm9iamVjdFwiLCBydWxlczogW10gfSxcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGVzOiB7IC4uLmdyb3VwcywgaW50ZWdlcjogdHJ1ZSwgYm9vbGVhbjogdHJ1ZSwgbnVsbDogdHJ1ZSB9LFxuICAgICAgICBydWxlczogW3sgcnVsZXM6IFtdIH0sIGdyb3Vwcy5udW1iZXIsIGdyb3Vwcy5zdHJpbmcsIGdyb3Vwcy5hcnJheSwgZ3JvdXBzLm9iamVjdF0sXG4gICAgICAgIHBvc3Q6IHsgcnVsZXM6IFtdIH0sXG4gICAgICAgIGFsbDoge30sXG4gICAgICAgIGtleXdvcmRzOiB7fSxcbiAgICB9O1xufVxuZXhwb3J0cy5nZXRSdWxlcyA9IGdldFJ1bGVzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cnVsZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNoZWNrU3RyaWN0TW9kZSA9IGV4cG9ydHMuZ2V0RXJyb3JQYXRoID0gZXhwb3J0cy5UeXBlID0gZXhwb3J0cy51c2VGdW5jID0gZXhwb3J0cy5zZXRFdmFsdWF0ZWQgPSBleHBvcnRzLmV2YWx1YXRlZFByb3BzVG9OYW1lID0gZXhwb3J0cy5tZXJnZUV2YWx1YXRlZCA9IGV4cG9ydHMuZWFjaEl0ZW0gPSBleHBvcnRzLnVuZXNjYXBlSnNvblBvaW50ZXIgPSBleHBvcnRzLmVzY2FwZUpzb25Qb2ludGVyID0gZXhwb3J0cy5lc2NhcGVGcmFnbWVudCA9IGV4cG9ydHMudW5lc2NhcGVGcmFnbWVudCA9IGV4cG9ydHMuc2NoZW1hUmVmT3JWYWwgPSBleHBvcnRzLnNjaGVtYUhhc1J1bGVzQnV0UmVmID0gZXhwb3J0cy5zY2hlbWFIYXNSdWxlcyA9IGV4cG9ydHMuY2hlY2tVbmtub3duUnVsZXMgPSBleHBvcnRzLmFsd2F5c1ZhbGlkU2NoZW1hID0gZXhwb3J0cy50b0hhc2ggPSB2b2lkIDA7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi9jb2RlZ2VuXCIpO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4vY29kZWdlbi9jb2RlXCIpO1xuLy8gVE9ETyByZWZhY3RvciB0byB1c2UgU2V0XG5mdW5jdGlvbiB0b0hhc2goYXJyKSB7XG4gICAgY29uc3QgaGFzaCA9IHt9O1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBhcnIpXG4gICAgICAgIGhhc2hbaXRlbV0gPSB0cnVlO1xuICAgIHJldHVybiBoYXNoO1xufVxuZXhwb3J0cy50b0hhc2ggPSB0b0hhc2g7XG5mdW5jdGlvbiBhbHdheXNWYWxpZFNjaGVtYShpdCwgc2NoZW1hKSB7XG4gICAgaWYgKHR5cGVvZiBzY2hlbWEgPT0gXCJib29sZWFuXCIpXG4gICAgICAgIHJldHVybiBzY2hlbWE7XG4gICAgaWYgKE9iamVjdC5rZXlzKHNjaGVtYSkubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICBjaGVja1Vua25vd25SdWxlcyhpdCwgc2NoZW1hKTtcbiAgICByZXR1cm4gIXNjaGVtYUhhc1J1bGVzKHNjaGVtYSwgaXQuc2VsZi5SVUxFUy5hbGwpO1xufVxuZXhwb3J0cy5hbHdheXNWYWxpZFNjaGVtYSA9IGFsd2F5c1ZhbGlkU2NoZW1hO1xuZnVuY3Rpb24gY2hlY2tVbmtub3duUnVsZXMoaXQsIHNjaGVtYSA9IGl0LnNjaGVtYSkge1xuICAgIGNvbnN0IHsgb3B0cywgc2VsZiB9ID0gaXQ7XG4gICAgaWYgKCFvcHRzLnN0cmljdFNjaGVtYSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmICh0eXBlb2Ygc2NoZW1hID09PSBcImJvb2xlYW5cIilcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IHJ1bGVzID0gc2VsZi5SVUxFUy5rZXl3b3JkcztcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzY2hlbWEpIHtcbiAgICAgICAgaWYgKCFydWxlc1trZXldKVxuICAgICAgICAgICAgY2hlY2tTdHJpY3RNb2RlKGl0LCBgdW5rbm93biBrZXl3b3JkOiBcIiR7a2V5fVwiYCk7XG4gICAgfVxufVxuZXhwb3J0cy5jaGVja1Vua25vd25SdWxlcyA9IGNoZWNrVW5rbm93blJ1bGVzO1xuZnVuY3Rpb24gc2NoZW1hSGFzUnVsZXMoc2NoZW1hLCBydWxlcykge1xuICAgIGlmICh0eXBlb2Ygc2NoZW1hID09IFwiYm9vbGVhblwiKVxuICAgICAgICByZXR1cm4gIXNjaGVtYTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzY2hlbWEpXG4gICAgICAgIGlmIChydWxlc1trZXldKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZXhwb3J0cy5zY2hlbWFIYXNSdWxlcyA9IHNjaGVtYUhhc1J1bGVzO1xuZnVuY3Rpb24gc2NoZW1hSGFzUnVsZXNCdXRSZWYoc2NoZW1hLCBSVUxFUykge1xuICAgIGlmICh0eXBlb2Ygc2NoZW1hID09IFwiYm9vbGVhblwiKVxuICAgICAgICByZXR1cm4gIXNjaGVtYTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzY2hlbWEpXG4gICAgICAgIGlmIChrZXkgIT09IFwiJHJlZlwiICYmIFJVTEVTLmFsbFtrZXldKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZXhwb3J0cy5zY2hlbWFIYXNSdWxlc0J1dFJlZiA9IHNjaGVtYUhhc1J1bGVzQnV0UmVmO1xuZnVuY3Rpb24gc2NoZW1hUmVmT3JWYWwoeyB0b3BTY2hlbWFSZWYsIHNjaGVtYVBhdGggfSwgc2NoZW1hLCBrZXl3b3JkLCAkZGF0YSkge1xuICAgIGlmICghJGRhdGEpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzY2hlbWEgPT0gXCJudW1iZXJcIiB8fCB0eXBlb2Ygc2NoZW1hID09IFwiYm9vbGVhblwiKVxuICAgICAgICAgICAgcmV0dXJuIHNjaGVtYTtcbiAgICAgICAgaWYgKHR5cGVvZiBzY2hlbWEgPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGAke3NjaGVtYX1gO1xuICAgIH1cbiAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5fKSBgJHt0b3BTY2hlbWFSZWZ9JHtzY2hlbWFQYXRofSR7KDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkoa2V5d29yZCl9YDtcbn1cbmV4cG9ydHMuc2NoZW1hUmVmT3JWYWwgPSBzY2hlbWFSZWZPclZhbDtcbmZ1bmN0aW9uIHVuZXNjYXBlRnJhZ21lbnQoc3RyKSB7XG4gICAgcmV0dXJuIHVuZXNjYXBlSnNvblBvaW50ZXIoZGVjb2RlVVJJQ29tcG9uZW50KHN0cikpO1xufVxuZXhwb3J0cy51bmVzY2FwZUZyYWdtZW50ID0gdW5lc2NhcGVGcmFnbWVudDtcbmZ1bmN0aW9uIGVzY2FwZUZyYWdtZW50KHN0cikge1xuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoZXNjYXBlSnNvblBvaW50ZXIoc3RyKSk7XG59XG5leHBvcnRzLmVzY2FwZUZyYWdtZW50ID0gZXNjYXBlRnJhZ21lbnQ7XG5mdW5jdGlvbiBlc2NhcGVKc29uUG9pbnRlcihzdHIpIHtcbiAgICBpZiAodHlwZW9mIHN0ciA9PSBcIm51bWJlclwiKVxuICAgICAgICByZXR1cm4gYCR7c3RyfWA7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9+L2csIFwifjBcIikucmVwbGFjZSgvXFwvL2csIFwifjFcIik7XG59XG5leHBvcnRzLmVzY2FwZUpzb25Qb2ludGVyID0gZXNjYXBlSnNvblBvaW50ZXI7XG5mdW5jdGlvbiB1bmVzY2FwZUpzb25Qb2ludGVyKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvfjEvZywgXCIvXCIpLnJlcGxhY2UoL34wL2csIFwiflwiKTtcbn1cbmV4cG9ydHMudW5lc2NhcGVKc29uUG9pbnRlciA9IHVuZXNjYXBlSnNvblBvaW50ZXI7XG5mdW5jdGlvbiBlYWNoSXRlbSh4cywgZikge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHhzKSkge1xuICAgICAgICBmb3IgKGNvbnN0IHggb2YgeHMpXG4gICAgICAgICAgICBmKHgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZih4cyk7XG4gICAgfVxufVxuZXhwb3J0cy5lYWNoSXRlbSA9IGVhY2hJdGVtO1xuZnVuY3Rpb24gbWFrZU1lcmdlRXZhbHVhdGVkKHsgbWVyZ2VOYW1lcywgbWVyZ2VUb05hbWUsIG1lcmdlVmFsdWVzLCByZXN1bHRUb05hbWUsIH0pIHtcbiAgICByZXR1cm4gKGdlbiwgZnJvbSwgdG8sIHRvTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCByZXMgPSB0byA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGZyb21cbiAgICAgICAgICAgIDogdG8gaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZVxuICAgICAgICAgICAgICAgID8gKGZyb20gaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZSA/IG1lcmdlTmFtZXMoZ2VuLCBmcm9tLCB0bykgOiBtZXJnZVRvTmFtZShnZW4sIGZyb20sIHRvKSwgdG8pXG4gICAgICAgICAgICAgICAgOiBmcm9tIGluc3RhbmNlb2YgY29kZWdlbl8xLk5hbWVcbiAgICAgICAgICAgICAgICAgICAgPyAobWVyZ2VUb05hbWUoZ2VuLCB0bywgZnJvbSksIGZyb20pXG4gICAgICAgICAgICAgICAgICAgIDogbWVyZ2VWYWx1ZXMoZnJvbSwgdG8pO1xuICAgICAgICByZXR1cm4gdG9OYW1lID09PSBjb2RlZ2VuXzEuTmFtZSAmJiAhKHJlcyBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lKSA/IHJlc3VsdFRvTmFtZShnZW4sIHJlcykgOiByZXM7XG4gICAgfTtcbn1cbmV4cG9ydHMubWVyZ2VFdmFsdWF0ZWQgPSB7XG4gICAgcHJvcHM6IG1ha2VNZXJnZUV2YWx1YXRlZCh7XG4gICAgICAgIG1lcmdlTmFtZXM6IChnZW4sIGZyb20sIHRvKSA9PiBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHt0b30gIT09IHRydWUgJiYgJHtmcm9tfSAhPT0gdW5kZWZpbmVkYCwgKCkgPT4ge1xuICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZnJvbX0gPT09IHRydWVgLCAoKSA9PiBnZW4uYXNzaWduKHRvLCB0cnVlKSwgKCkgPT4gZ2VuLmFzc2lnbih0bywgKDAsIGNvZGVnZW5fMS5fKSBgJHt0b30gfHwge31gKS5jb2RlKCgwLCBjb2RlZ2VuXzEuXykgYE9iamVjdC5hc3NpZ24oJHt0b30sICR7ZnJvbX0pYCkpO1xuICAgICAgICB9KSxcbiAgICAgICAgbWVyZ2VUb05hbWU6IChnZW4sIGZyb20sIHRvKSA9PiBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHt0b30gIT09IHRydWVgLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZnJvbSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24odG8sIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2VuLmFzc2lnbih0bywgKDAsIGNvZGVnZW5fMS5fKSBgJHt0b30gfHwge31gKTtcbiAgICAgICAgICAgICAgICBzZXRFdmFsdWF0ZWQoZ2VuLCB0bywgZnJvbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBtZXJnZVZhbHVlczogKGZyb20sIHRvKSA9PiAoZnJvbSA9PT0gdHJ1ZSA/IHRydWUgOiB7IC4uLmZyb20sIC4uLnRvIH0pLFxuICAgICAgICByZXN1bHRUb05hbWU6IGV2YWx1YXRlZFByb3BzVG9OYW1lLFxuICAgIH0pLFxuICAgIGl0ZW1zOiBtYWtlTWVyZ2VFdmFsdWF0ZWQoe1xuICAgICAgICBtZXJnZU5hbWVzOiAoZ2VuLCBmcm9tLCB0bykgPT4gZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7dG99ICE9PSB0cnVlICYmICR7ZnJvbX0gIT09IHVuZGVmaW5lZGAsICgpID0+IGdlbi5hc3NpZ24odG8sICgwLCBjb2RlZ2VuXzEuXykgYCR7ZnJvbX0gPT09IHRydWUgPyB0cnVlIDogJHt0b30gPiAke2Zyb219ID8gJHt0b30gOiAke2Zyb219YCkpLFxuICAgICAgICBtZXJnZVRvTmFtZTogKGdlbiwgZnJvbSwgdG8pID0+IGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke3RvfSAhPT0gdHJ1ZWAsICgpID0+IGdlbi5hc3NpZ24odG8sIGZyb20gPT09IHRydWUgPyB0cnVlIDogKDAsIGNvZGVnZW5fMS5fKSBgJHt0b30gPiAke2Zyb219ID8gJHt0b30gOiAke2Zyb219YCkpLFxuICAgICAgICBtZXJnZVZhbHVlczogKGZyb20sIHRvKSA9PiAoZnJvbSA9PT0gdHJ1ZSA/IHRydWUgOiBNYXRoLm1heChmcm9tLCB0bykpLFxuICAgICAgICByZXN1bHRUb05hbWU6IChnZW4sIGl0ZW1zKSA9PiBnZW4udmFyKFwiaXRlbXNcIiwgaXRlbXMpLFxuICAgIH0pLFxufTtcbmZ1bmN0aW9uIGV2YWx1YXRlZFByb3BzVG9OYW1lKGdlbiwgcHMpIHtcbiAgICBpZiAocHMgPT09IHRydWUpXG4gICAgICAgIHJldHVybiBnZW4udmFyKFwicHJvcHNcIiwgdHJ1ZSk7XG4gICAgY29uc3QgcHJvcHMgPSBnZW4udmFyKFwicHJvcHNcIiwgKDAsIGNvZGVnZW5fMS5fKSBge31gKTtcbiAgICBpZiAocHMgIT09IHVuZGVmaW5lZClcbiAgICAgICAgc2V0RXZhbHVhdGVkKGdlbiwgcHJvcHMsIHBzKTtcbiAgICByZXR1cm4gcHJvcHM7XG59XG5leHBvcnRzLmV2YWx1YXRlZFByb3BzVG9OYW1lID0gZXZhbHVhdGVkUHJvcHNUb05hbWU7XG5mdW5jdGlvbiBzZXRFdmFsdWF0ZWQoZ2VuLCBwcm9wcywgcHMpIHtcbiAgICBPYmplY3Qua2V5cyhwcykuZm9yRWFjaCgocCkgPT4gZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke3Byb3BzfSR7KDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkocCl9YCwgdHJ1ZSkpO1xufVxuZXhwb3J0cy5zZXRFdmFsdWF0ZWQgPSBzZXRFdmFsdWF0ZWQ7XG5jb25zdCBzbmlwcGV0cyA9IHt9O1xuZnVuY3Rpb24gdXNlRnVuYyhnZW4sIGYpIHtcbiAgICByZXR1cm4gZ2VuLnNjb3BlVmFsdWUoXCJmdW5jXCIsIHtcbiAgICAgICAgcmVmOiBmLFxuICAgICAgICBjb2RlOiBzbmlwcGV0c1tmLmNvZGVdIHx8IChzbmlwcGV0c1tmLmNvZGVdID0gbmV3IGNvZGVfMS5fQ29kZShmLmNvZGUpKSxcbiAgICB9KTtcbn1cbmV4cG9ydHMudXNlRnVuYyA9IHVzZUZ1bmM7XG52YXIgVHlwZTtcbihmdW5jdGlvbiAoVHlwZSkge1xuICAgIFR5cGVbVHlwZVtcIk51bVwiXSA9IDBdID0gXCJOdW1cIjtcbiAgICBUeXBlW1R5cGVbXCJTdHJcIl0gPSAxXSA9IFwiU3RyXCI7XG59KShUeXBlID0gZXhwb3J0cy5UeXBlIHx8IChleHBvcnRzLlR5cGUgPSB7fSkpO1xuZnVuY3Rpb24gZ2V0RXJyb3JQYXRoKGRhdGFQcm9wLCBkYXRhUHJvcFR5cGUsIGpzUHJvcGVydHlTeW50YXgpIHtcbiAgICAvLyBsZXQgcGF0aFxuICAgIGlmIChkYXRhUHJvcCBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lKSB7XG4gICAgICAgIGNvbnN0IGlzTnVtYmVyID0gZGF0YVByb3BUeXBlID09PSBUeXBlLk51bTtcbiAgICAgICAgcmV0dXJuIGpzUHJvcGVydHlTeW50YXhcbiAgICAgICAgICAgID8gaXNOdW1iZXJcbiAgICAgICAgICAgICAgICA/ICgwLCBjb2RlZ2VuXzEuXykgYFwiW1wiICsgJHtkYXRhUHJvcH0gKyBcIl1cImBcbiAgICAgICAgICAgICAgICA6ICgwLCBjb2RlZ2VuXzEuXykgYFwiWydcIiArICR7ZGF0YVByb3B9ICsgXCInXVwiYFxuICAgICAgICAgICAgOiBpc051bWJlclxuICAgICAgICAgICAgICAgID8gKDAsIGNvZGVnZW5fMS5fKSBgXCIvXCIgKyAke2RhdGFQcm9wfWBcbiAgICAgICAgICAgICAgICA6ICgwLCBjb2RlZ2VuXzEuXykgYFwiL1wiICsgJHtkYXRhUHJvcH0ucmVwbGFjZSgvfi9nLCBcIn4wXCIpLnJlcGxhY2UoL1xcXFwvL2csIFwifjFcIilgOyAvLyBUT0RPIG1heWJlIHVzZSBnbG9iYWwgZXNjYXBlUG9pbnRlclxuICAgIH1cbiAgICByZXR1cm4ganNQcm9wZXJ0eVN5bnRheCA/ICgwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKGRhdGFQcm9wKS50b1N0cmluZygpIDogXCIvXCIgKyBlc2NhcGVKc29uUG9pbnRlcihkYXRhUHJvcCk7XG59XG5leHBvcnRzLmdldEVycm9yUGF0aCA9IGdldEVycm9yUGF0aDtcbmZ1bmN0aW9uIGNoZWNrU3RyaWN0TW9kZShpdCwgbXNnLCBtb2RlID0gaXQub3B0cy5zdHJpY3RTY2hlbWEpIHtcbiAgICBpZiAoIW1vZGUpXG4gICAgICAgIHJldHVybjtcbiAgICBtc2cgPSBgc3RyaWN0IG1vZGU6ICR7bXNnfWA7XG4gICAgaWYgKG1vZGUgPT09IHRydWUpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIGl0LnNlbGYubG9nZ2VyLndhcm4obXNnKTtcbn1cbmV4cG9ydHMuY2hlY2tTdHJpY3RNb2RlID0gY2hlY2tTdHJpY3RNb2RlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2hvdWxkVXNlUnVsZSA9IGV4cG9ydHMuc2hvdWxkVXNlR3JvdXAgPSBleHBvcnRzLnNjaGVtYUhhc1J1bGVzRm9yVHlwZSA9IHZvaWQgMDtcbmZ1bmN0aW9uIHNjaGVtYUhhc1J1bGVzRm9yVHlwZSh7IHNjaGVtYSwgc2VsZiB9LCB0eXBlKSB7XG4gICAgY29uc3QgZ3JvdXAgPSBzZWxmLlJVTEVTLnR5cGVzW3R5cGVdO1xuICAgIHJldHVybiBncm91cCAmJiBncm91cCAhPT0gdHJ1ZSAmJiBzaG91bGRVc2VHcm91cChzY2hlbWEsIGdyb3VwKTtcbn1cbmV4cG9ydHMuc2NoZW1hSGFzUnVsZXNGb3JUeXBlID0gc2NoZW1hSGFzUnVsZXNGb3JUeXBlO1xuZnVuY3Rpb24gc2hvdWxkVXNlR3JvdXAoc2NoZW1hLCBncm91cCkge1xuICAgIHJldHVybiBncm91cC5ydWxlcy5zb21lKChydWxlKSA9PiBzaG91bGRVc2VSdWxlKHNjaGVtYSwgcnVsZSkpO1xufVxuZXhwb3J0cy5zaG91bGRVc2VHcm91cCA9IHNob3VsZFVzZUdyb3VwO1xuZnVuY3Rpb24gc2hvdWxkVXNlUnVsZShzY2hlbWEsIHJ1bGUpIHtcbiAgICB2YXIgX2E7XG4gICAgcmV0dXJuIChzY2hlbWFbcnVsZS5rZXl3b3JkXSAhPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICgoX2EgPSBydWxlLmRlZmluaXRpb24uaW1wbGVtZW50cykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNvbWUoKGt3ZCkgPT4gc2NoZW1hW2t3ZF0gIT09IHVuZGVmaW5lZCkpKTtcbn1cbmV4cG9ydHMuc2hvdWxkVXNlUnVsZSA9IHNob3VsZFVzZVJ1bGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHBsaWNhYmlsaXR5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5ib29sT3JFbXB0eVNjaGVtYSA9IGV4cG9ydHMudG9wQm9vbE9yRW1wdHlTY2hlbWEgPSB2b2lkIDA7XG5jb25zdCBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuLi9lcnJvcnNcIik7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vY29kZWdlblwiKTtcbmNvbnN0IG5hbWVzXzEgPSByZXF1aXJlKFwiLi4vbmFtZXNcIik7XG5jb25zdCBib29sRXJyb3IgPSB7XG4gICAgbWVzc2FnZTogXCJib29sZWFuIHNjaGVtYSBpcyBmYWxzZVwiLFxufTtcbmZ1bmN0aW9uIHRvcEJvb2xPckVtcHR5U2NoZW1hKGl0KSB7XG4gICAgY29uc3QgeyBnZW4sIHNjaGVtYSwgdmFsaWRhdGVOYW1lIH0gPSBpdDtcbiAgICBpZiAoc2NoZW1hID09PSBmYWxzZSkge1xuICAgICAgICBmYWxzZVNjaGVtYUVycm9yKGl0LCBmYWxzZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBzY2hlbWEgPT0gXCJvYmplY3RcIiAmJiBzY2hlbWEuJGFzeW5jID09PSB0cnVlKSB7XG4gICAgICAgIGdlbi5yZXR1cm4obmFtZXNfMS5kZWZhdWx0LmRhdGEpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke3ZhbGlkYXRlTmFtZX0uZXJyb3JzYCwgbnVsbCk7XG4gICAgICAgIGdlbi5yZXR1cm4odHJ1ZSk7XG4gICAgfVxufVxuZXhwb3J0cy50b3BCb29sT3JFbXB0eVNjaGVtYSA9IHRvcEJvb2xPckVtcHR5U2NoZW1hO1xuZnVuY3Rpb24gYm9vbE9yRW1wdHlTY2hlbWEoaXQsIHZhbGlkKSB7XG4gICAgY29uc3QgeyBnZW4sIHNjaGVtYSB9ID0gaXQ7XG4gICAgaWYgKHNjaGVtYSA9PT0gZmFsc2UpIHtcbiAgICAgICAgZ2VuLnZhcih2YWxpZCwgZmFsc2UpOyAvLyBUT0RPIHZhclxuICAgICAgICBmYWxzZVNjaGVtYUVycm9yKGl0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdlbi52YXIodmFsaWQsIHRydWUpOyAvLyBUT0RPIHZhclxuICAgIH1cbn1cbmV4cG9ydHMuYm9vbE9yRW1wdHlTY2hlbWEgPSBib29sT3JFbXB0eVNjaGVtYTtcbmZ1bmN0aW9uIGZhbHNlU2NoZW1hRXJyb3IoaXQsIG92ZXJyaWRlQWxsRXJyb3JzKSB7XG4gICAgY29uc3QgeyBnZW4sIGRhdGEgfSA9IGl0O1xuICAgIC8vIFRPRE8gbWF5YmUgc29tZSBvdGhlciBpbnRlcmZhY2Ugc2hvdWxkIGJlIHVzZWQgZm9yIG5vbi1rZXl3b3JkIHZhbGlkYXRpb24gZXJyb3JzLi4uXG4gICAgY29uc3QgY3h0ID0ge1xuICAgICAgICBnZW4sXG4gICAgICAgIGtleXdvcmQ6IFwiZmFsc2Ugc2NoZW1hXCIsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIHNjaGVtYTogZmFsc2UsXG4gICAgICAgIHNjaGVtYUNvZGU6IGZhbHNlLFxuICAgICAgICBzY2hlbWFWYWx1ZTogZmFsc2UsXG4gICAgICAgIHBhcmFtczoge30sXG4gICAgICAgIGl0LFxuICAgIH07XG4gICAgKDAsIGVycm9yc18xLnJlcG9ydEVycm9yKShjeHQsIGJvb2xFcnJvciwgdW5kZWZpbmVkLCBvdmVycmlkZUFsbEVycm9ycyk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ib29sU2NoZW1hLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yZXBvcnRUeXBlRXJyb3IgPSBleHBvcnRzLmNoZWNrRGF0YVR5cGVzID0gZXhwb3J0cy5jaGVja0RhdGFUeXBlID0gZXhwb3J0cy5jb2VyY2VBbmRDaGVja0RhdGFUeXBlID0gZXhwb3J0cy5nZXRKU09OVHlwZXMgPSBleHBvcnRzLmdldFNjaGVtYVR5cGVzID0gZXhwb3J0cy5EYXRhVHlwZSA9IHZvaWQgMDtcbmNvbnN0IHJ1bGVzXzEgPSByZXF1aXJlKFwiLi4vcnVsZXNcIik7XG5jb25zdCBhcHBsaWNhYmlsaXR5XzEgPSByZXF1aXJlKFwiLi9hcHBsaWNhYmlsaXR5XCIpO1xuY29uc3QgZXJyb3JzXzEgPSByZXF1aXJlKFwiLi4vZXJyb3JzXCIpO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcbnZhciBEYXRhVHlwZTtcbihmdW5jdGlvbiAoRGF0YVR5cGUpIHtcbiAgICBEYXRhVHlwZVtEYXRhVHlwZVtcIkNvcnJlY3RcIl0gPSAwXSA9IFwiQ29ycmVjdFwiO1xuICAgIERhdGFUeXBlW0RhdGFUeXBlW1wiV3JvbmdcIl0gPSAxXSA9IFwiV3JvbmdcIjtcbn0pKERhdGFUeXBlID0gZXhwb3J0cy5EYXRhVHlwZSB8fCAoZXhwb3J0cy5EYXRhVHlwZSA9IHt9KSk7XG5mdW5jdGlvbiBnZXRTY2hlbWFUeXBlcyhzY2hlbWEpIHtcbiAgICBjb25zdCB0eXBlcyA9IGdldEpTT05UeXBlcyhzY2hlbWEudHlwZSk7XG4gICAgY29uc3QgaGFzTnVsbCA9IHR5cGVzLmluY2x1ZGVzKFwibnVsbFwiKTtcbiAgICBpZiAoaGFzTnVsbCkge1xuICAgICAgICBpZiAoc2NoZW1hLm51bGxhYmxlID09PSBmYWxzZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInR5cGU6IG51bGwgY29udHJhZGljdHMgbnVsbGFibGU6IGZhbHNlXCIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKCF0eXBlcy5sZW5ndGggJiYgc2NoZW1hLm51bGxhYmxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignXCJudWxsYWJsZVwiIGNhbm5vdCBiZSB1c2VkIHdpdGhvdXQgXCJ0eXBlXCInKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NoZW1hLm51bGxhYmxlID09PSB0cnVlKVxuICAgICAgICAgICAgdHlwZXMucHVzaChcIm51bGxcIik7XG4gICAgfVxuICAgIHJldHVybiB0eXBlcztcbn1cbmV4cG9ydHMuZ2V0U2NoZW1hVHlwZXMgPSBnZXRTY2hlbWFUeXBlcztcbmZ1bmN0aW9uIGdldEpTT05UeXBlcyh0cykge1xuICAgIGNvbnN0IHR5cGVzID0gQXJyYXkuaXNBcnJheSh0cykgPyB0cyA6IHRzID8gW3RzXSA6IFtdO1xuICAgIGlmICh0eXBlcy5ldmVyeShydWxlc18xLmlzSlNPTlR5cGUpKVxuICAgICAgICByZXR1cm4gdHlwZXM7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwidHlwZSBtdXN0IGJlIEpTT05UeXBlIG9yIEpTT05UeXBlW106IFwiICsgdHlwZXMuam9pbihcIixcIikpO1xufVxuZXhwb3J0cy5nZXRKU09OVHlwZXMgPSBnZXRKU09OVHlwZXM7XG5mdW5jdGlvbiBjb2VyY2VBbmRDaGVja0RhdGFUeXBlKGl0LCB0eXBlcykge1xuICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCBvcHRzIH0gPSBpdDtcbiAgICBjb25zdCBjb2VyY2VUbyA9IGNvZXJjZVRvVHlwZXModHlwZXMsIG9wdHMuY29lcmNlVHlwZXMpO1xuICAgIGNvbnN0IGNoZWNrVHlwZXMgPSB0eXBlcy5sZW5ndGggPiAwICYmXG4gICAgICAgICEoY29lcmNlVG8ubGVuZ3RoID09PSAwICYmIHR5cGVzLmxlbmd0aCA9PT0gMSAmJiAoMCwgYXBwbGljYWJpbGl0eV8xLnNjaGVtYUhhc1J1bGVzRm9yVHlwZSkoaXQsIHR5cGVzWzBdKSk7XG4gICAgaWYgKGNoZWNrVHlwZXMpIHtcbiAgICAgICAgY29uc3Qgd3JvbmdUeXBlID0gY2hlY2tEYXRhVHlwZXModHlwZXMsIGRhdGEsIG9wdHMuc3RyaWN0TnVtYmVycywgRGF0YVR5cGUuV3JvbmcpO1xuICAgICAgICBnZW4uaWYod3JvbmdUeXBlLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29lcmNlVG8ubGVuZ3RoKVxuICAgICAgICAgICAgICAgIGNvZXJjZURhdGEoaXQsIHR5cGVzLCBjb2VyY2VUbyk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmVwb3J0VHlwZUVycm9yKGl0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBjaGVja1R5cGVzO1xufVxuZXhwb3J0cy5jb2VyY2VBbmRDaGVja0RhdGFUeXBlID0gY29lcmNlQW5kQ2hlY2tEYXRhVHlwZTtcbmNvbnN0IENPRVJDSUJMRSA9IG5ldyBTZXQoW1wic3RyaW5nXCIsIFwibnVtYmVyXCIsIFwiaW50ZWdlclwiLCBcImJvb2xlYW5cIiwgXCJudWxsXCJdKTtcbmZ1bmN0aW9uIGNvZXJjZVRvVHlwZXModHlwZXMsIGNvZXJjZVR5cGVzKSB7XG4gICAgcmV0dXJuIGNvZXJjZVR5cGVzXG4gICAgICAgID8gdHlwZXMuZmlsdGVyKCh0KSA9PiBDT0VSQ0lCTEUuaGFzKHQpIHx8IChjb2VyY2VUeXBlcyA9PT0gXCJhcnJheVwiICYmIHQgPT09IFwiYXJyYXlcIikpXG4gICAgICAgIDogW107XG59XG5mdW5jdGlvbiBjb2VyY2VEYXRhKGl0LCB0eXBlcywgY29lcmNlVG8pIHtcbiAgICBjb25zdCB7IGdlbiwgZGF0YSwgb3B0cyB9ID0gaXQ7XG4gICAgY29uc3QgZGF0YVR5cGUgPSBnZW4ubGV0KFwiZGF0YVR5cGVcIiwgKDAsIGNvZGVnZW5fMS5fKSBgdHlwZW9mICR7ZGF0YX1gKTtcbiAgICBjb25zdCBjb2VyY2VkID0gZ2VuLmxldChcImNvZXJjZWRcIiwgKDAsIGNvZGVnZW5fMS5fKSBgdW5kZWZpbmVkYCk7XG4gICAgaWYgKG9wdHMuY29lcmNlVHlwZXMgPT09IFwiYXJyYXlcIikge1xuICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhVHlwZX0gPT0gJ29iamVjdCcgJiYgQXJyYXkuaXNBcnJheSgke2RhdGF9KSAmJiAke2RhdGF9Lmxlbmd0aCA9PSAxYCwgKCkgPT4gZ2VuXG4gICAgICAgICAgICAuYXNzaWduKGRhdGEsICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX1bMF1gKVxuICAgICAgICAgICAgLmFzc2lnbihkYXRhVHlwZSwgKDAsIGNvZGVnZW5fMS5fKSBgdHlwZW9mICR7ZGF0YX1gKVxuICAgICAgICAgICAgLmlmKGNoZWNrRGF0YVR5cGVzKHR5cGVzLCBkYXRhLCBvcHRzLnN0cmljdE51bWJlcnMpLCAoKSA9PiBnZW4uYXNzaWduKGNvZXJjZWQsIGRhdGEpKSk7XG4gICAgfVxuICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2NvZXJjZWR9ICE9PSB1bmRlZmluZWRgKTtcbiAgICBmb3IgKGNvbnN0IHQgb2YgY29lcmNlVG8pIHtcbiAgICAgICAgaWYgKENPRVJDSUJMRS5oYXModCkgfHwgKHQgPT09IFwiYXJyYXlcIiAmJiBvcHRzLmNvZXJjZVR5cGVzID09PSBcImFycmF5XCIpKSB7XG4gICAgICAgICAgICBjb2VyY2VTcGVjaWZpY1R5cGUodCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2VuLmVsc2UoKTtcbiAgICByZXBvcnRUeXBlRXJyb3IoaXQpO1xuICAgIGdlbi5lbmRJZigpO1xuICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2NvZXJjZWR9ICE9PSB1bmRlZmluZWRgLCAoKSA9PiB7XG4gICAgICAgIGdlbi5hc3NpZ24oZGF0YSwgY29lcmNlZCk7XG4gICAgICAgIGFzc2lnblBhcmVudERhdGEoaXQsIGNvZXJjZWQpO1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIGNvZXJjZVNwZWNpZmljVHlwZSh0KSB7XG4gICAgICAgIHN3aXRjaCAodCkge1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgICAgICAgIGdlblxuICAgICAgICAgICAgICAgICAgICAuZWxzZUlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YVR5cGV9ID09IFwibnVtYmVyXCIgfHwgJHtkYXRhVHlwZX0gPT0gXCJib29sZWFuXCJgKVxuICAgICAgICAgICAgICAgICAgICAuYXNzaWduKGNvZXJjZWQsICgwLCBjb2RlZ2VuXzEuXykgYFwiXCIgKyAke2RhdGF9YClcbiAgICAgICAgICAgICAgICAgICAgLmVsc2VJZigoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9ID09PSBudWxsYClcbiAgICAgICAgICAgICAgICAgICAgLmFzc2lnbihjb2VyY2VkLCAoMCwgY29kZWdlbl8xLl8pIGBcIlwiYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICAgICAgICAgIGdlblxuICAgICAgICAgICAgICAgICAgICAuZWxzZUlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YVR5cGV9ID09IFwiYm9vbGVhblwiIHx8ICR7ZGF0YX0gPT09IG51bGxcbiAgICAgICAgICAgICAgfHwgKCR7ZGF0YVR5cGV9ID09IFwic3RyaW5nXCIgJiYgJHtkYXRhfSAmJiAke2RhdGF9ID09ICske2RhdGF9KWApXG4gICAgICAgICAgICAgICAgICAgIC5hc3NpZ24oY29lcmNlZCwgKDAsIGNvZGVnZW5fMS5fKSBgKyR7ZGF0YX1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIFwiaW50ZWdlclwiOlxuICAgICAgICAgICAgICAgIGdlblxuICAgICAgICAgICAgICAgICAgICAuZWxzZUlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YVR5cGV9ID09PSBcImJvb2xlYW5cIiB8fCAke2RhdGF9ID09PSBudWxsXG4gICAgICAgICAgICAgIHx8ICgke2RhdGFUeXBlfSA9PT0gXCJzdHJpbmdcIiAmJiAke2RhdGF9ICYmICR7ZGF0YX0gPT0gKyR7ZGF0YX0gJiYgISgke2RhdGF9ICUgMSkpYClcbiAgICAgICAgICAgICAgICAgICAgLmFzc2lnbihjb2VyY2VkLCAoMCwgY29kZWdlbl8xLl8pIGArJHtkYXRhfWApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgICAgICAgZ2VuXG4gICAgICAgICAgICAgICAgICAgIC5lbHNlSWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfSA9PT0gXCJmYWxzZVwiIHx8ICR7ZGF0YX0gPT09IDAgfHwgJHtkYXRhfSA9PT0gbnVsbGApXG4gICAgICAgICAgICAgICAgICAgIC5hc3NpZ24oY29lcmNlZCwgZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgIC5lbHNlSWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfSA9PT0gXCJ0cnVlXCIgfHwgJHtkYXRhfSA9PT0gMWApXG4gICAgICAgICAgICAgICAgICAgIC5hc3NpZ24oY29lcmNlZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBcIm51bGxcIjpcbiAgICAgICAgICAgICAgICBnZW4uZWxzZUlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0gPT09IFwiXCIgfHwgJHtkYXRhfSA9PT0gMCB8fCAke2RhdGF9ID09PSBmYWxzZWApO1xuICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24oY29lcmNlZCwgbnVsbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBcImFycmF5XCI6XG4gICAgICAgICAgICAgICAgZ2VuXG4gICAgICAgICAgICAgICAgICAgIC5lbHNlSWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhVHlwZX0gPT09IFwic3RyaW5nXCIgfHwgJHtkYXRhVHlwZX0gPT09IFwibnVtYmVyXCJcbiAgICAgICAgICAgICAgfHwgJHtkYXRhVHlwZX0gPT09IFwiYm9vbGVhblwiIHx8ICR7ZGF0YX0gPT09IG51bGxgKVxuICAgICAgICAgICAgICAgICAgICAuYXNzaWduKGNvZXJjZWQsICgwLCBjb2RlZ2VuXzEuXykgYFske2RhdGF9XWApO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gYXNzaWduUGFyZW50RGF0YSh7IGdlbiwgcGFyZW50RGF0YSwgcGFyZW50RGF0YVByb3BlcnR5IH0sIGV4cHIpIHtcbiAgICAvLyBUT0RPIHVzZSBnZW4ucHJvcGVydHlcbiAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtwYXJlbnREYXRhfSAhPT0gdW5kZWZpbmVkYCwgKCkgPT4gZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke3BhcmVudERhdGF9WyR7cGFyZW50RGF0YVByb3BlcnR5fV1gLCBleHByKSk7XG59XG5mdW5jdGlvbiBjaGVja0RhdGFUeXBlKGRhdGFUeXBlLCBkYXRhLCBzdHJpY3ROdW1zLCBjb3JyZWN0ID0gRGF0YVR5cGUuQ29ycmVjdCkge1xuICAgIGNvbnN0IEVRID0gY29ycmVjdCA9PT0gRGF0YVR5cGUuQ29ycmVjdCA/IGNvZGVnZW5fMS5vcGVyYXRvcnMuRVEgOiBjb2RlZ2VuXzEub3BlcmF0b3JzLk5FUTtcbiAgICBsZXQgY29uZDtcbiAgICBzd2l0Y2ggKGRhdGFUeXBlKSB7XG4gICAgICAgIGNhc2UgXCJudWxsXCI6XG4gICAgICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfSAke0VRfSBudWxsYDtcbiAgICAgICAgY2FzZSBcImFycmF5XCI6XG4gICAgICAgICAgICBjb25kID0gKDAsIGNvZGVnZW5fMS5fKSBgQXJyYXkuaXNBcnJheSgke2RhdGF9KWA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgY29uZCA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0gJiYgdHlwZW9mICR7ZGF0YX0gPT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheSgke2RhdGF9KWA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImludGVnZXJcIjpcbiAgICAgICAgICAgIGNvbmQgPSBudW1Db25kKCgwLCBjb2RlZ2VuXzEuXykgYCEoJHtkYXRhfSAlIDEpICYmICFpc05hTigke2RhdGF9KWApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgICAgIGNvbmQgPSBudW1Db25kKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGB0eXBlb2YgJHtkYXRhfSAke0VRfSAke2RhdGFUeXBlfWA7XG4gICAgfVxuICAgIHJldHVybiBjb3JyZWN0ID09PSBEYXRhVHlwZS5Db3JyZWN0ID8gY29uZCA6ICgwLCBjb2RlZ2VuXzEubm90KShjb25kKTtcbiAgICBmdW5jdGlvbiBudW1Db25kKF9jb25kID0gY29kZWdlbl8xLm5pbCkge1xuICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5hbmQpKCgwLCBjb2RlZ2VuXzEuXykgYHR5cGVvZiAke2RhdGF9ID09IFwibnVtYmVyXCJgLCBfY29uZCwgc3RyaWN0TnVtcyA/ICgwLCBjb2RlZ2VuXzEuXykgYGlzRmluaXRlKCR7ZGF0YX0pYCA6IGNvZGVnZW5fMS5uaWwpO1xuICAgIH1cbn1cbmV4cG9ydHMuY2hlY2tEYXRhVHlwZSA9IGNoZWNrRGF0YVR5cGU7XG5mdW5jdGlvbiBjaGVja0RhdGFUeXBlcyhkYXRhVHlwZXMsIGRhdGEsIHN0cmljdE51bXMsIGNvcnJlY3QpIHtcbiAgICBpZiAoZGF0YVR5cGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gY2hlY2tEYXRhVHlwZShkYXRhVHlwZXNbMF0sIGRhdGEsIHN0cmljdE51bXMsIGNvcnJlY3QpO1xuICAgIH1cbiAgICBsZXQgY29uZDtcbiAgICBjb25zdCB0eXBlcyA9ICgwLCB1dGlsXzEudG9IYXNoKShkYXRhVHlwZXMpO1xuICAgIGlmICh0eXBlcy5hcnJheSAmJiB0eXBlcy5vYmplY3QpIHtcbiAgICAgICAgY29uc3Qgbm90T2JqID0gKDAsIGNvZGVnZW5fMS5fKSBgdHlwZW9mICR7ZGF0YX0gIT0gXCJvYmplY3RcImA7XG4gICAgICAgIGNvbmQgPSB0eXBlcy5udWxsID8gbm90T2JqIDogKDAsIGNvZGVnZW5fMS5fKSBgISR7ZGF0YX0gfHwgJHtub3RPYmp9YDtcbiAgICAgICAgZGVsZXRlIHR5cGVzLm51bGw7XG4gICAgICAgIGRlbGV0ZSB0eXBlcy5hcnJheTtcbiAgICAgICAgZGVsZXRlIHR5cGVzLm9iamVjdDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbmQgPSBjb2RlZ2VuXzEubmlsO1xuICAgIH1cbiAgICBpZiAodHlwZXMubnVtYmVyKVxuICAgICAgICBkZWxldGUgdHlwZXMuaW50ZWdlcjtcbiAgICBmb3IgKGNvbnN0IHQgaW4gdHlwZXMpXG4gICAgICAgIGNvbmQgPSAoMCwgY29kZWdlbl8xLmFuZCkoY29uZCwgY2hlY2tEYXRhVHlwZSh0LCBkYXRhLCBzdHJpY3ROdW1zLCBjb3JyZWN0KSk7XG4gICAgcmV0dXJuIGNvbmQ7XG59XG5leHBvcnRzLmNoZWNrRGF0YVR5cGVzID0gY2hlY2tEYXRhVHlwZXM7XG5jb25zdCB0eXBlRXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsgc2NoZW1hIH0pID0+IGBtdXN0IGJlICR7c2NoZW1hfWAsXG4gICAgcGFyYW1zOiAoeyBzY2hlbWEsIHNjaGVtYVZhbHVlIH0pID0+IHR5cGVvZiBzY2hlbWEgPT0gXCJzdHJpbmdcIiA/ICgwLCBjb2RlZ2VuXzEuXykgYHt0eXBlOiAke3NjaGVtYX19YCA6ICgwLCBjb2RlZ2VuXzEuXykgYHt0eXBlOiAke3NjaGVtYVZhbHVlfX1gLFxufTtcbmZ1bmN0aW9uIHJlcG9ydFR5cGVFcnJvcihpdCkge1xuICAgIGNvbnN0IGN4dCA9IGdldFR5cGVFcnJvckNvbnRleHQoaXQpO1xuICAgICgwLCBlcnJvcnNfMS5yZXBvcnRFcnJvcikoY3h0LCB0eXBlRXJyb3IpO1xufVxuZXhwb3J0cy5yZXBvcnRUeXBlRXJyb3IgPSByZXBvcnRUeXBlRXJyb3I7XG5mdW5jdGlvbiBnZXRUeXBlRXJyb3JDb250ZXh0KGl0KSB7XG4gICAgY29uc3QgeyBnZW4sIGRhdGEsIHNjaGVtYSB9ID0gaXQ7XG4gICAgY29uc3Qgc2NoZW1hQ29kZSA9ICgwLCB1dGlsXzEuc2NoZW1hUmVmT3JWYWwpKGl0LCBzY2hlbWEsIFwidHlwZVwiKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZW4sXG4gICAgICAgIGtleXdvcmQ6IFwidHlwZVwiLFxuICAgICAgICBkYXRhLFxuICAgICAgICBzY2hlbWE6IHNjaGVtYS50eXBlLFxuICAgICAgICBzY2hlbWFDb2RlLFxuICAgICAgICBzY2hlbWFWYWx1ZTogc2NoZW1hQ29kZSxcbiAgICAgICAgcGFyZW50U2NoZW1hOiBzY2hlbWEsXG4gICAgICAgIHBhcmFtczoge30sXG4gICAgICAgIGl0LFxuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhVHlwZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYXNzaWduRGVmYXVsdHMgPSB2b2lkIDA7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xuZnVuY3Rpb24gYXNzaWduRGVmYXVsdHMoaXQsIHR5KSB7XG4gICAgY29uc3QgeyBwcm9wZXJ0aWVzLCBpdGVtcyB9ID0gaXQuc2NoZW1hO1xuICAgIGlmICh0eSA9PT0gXCJvYmplY3RcIiAmJiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGFzc2lnbkRlZmF1bHQoaXQsIGtleSwgcHJvcGVydGllc1trZXldLmRlZmF1bHQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5ID09PSBcImFycmF5XCIgJiYgQXJyYXkuaXNBcnJheShpdGVtcykpIHtcbiAgICAgICAgaXRlbXMuZm9yRWFjaCgoc2NoLCBpKSA9PiBhc3NpZ25EZWZhdWx0KGl0LCBpLCBzY2guZGVmYXVsdCkpO1xuICAgIH1cbn1cbmV4cG9ydHMuYXNzaWduRGVmYXVsdHMgPSBhc3NpZ25EZWZhdWx0cztcbmZ1bmN0aW9uIGFzc2lnbkRlZmF1bHQoaXQsIHByb3AsIGRlZmF1bHRWYWx1ZSkge1xuICAgIGNvbnN0IHsgZ2VuLCBjb21wb3NpdGVSdWxlLCBkYXRhLCBvcHRzIH0gPSBpdDtcbiAgICBpZiAoZGVmYXVsdFZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBjaGlsZERhdGEgPSAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9JHsoMCwgY29kZWdlbl8xLmdldFByb3BlcnR5KShwcm9wKX1gO1xuICAgIGlmIChjb21wb3NpdGVSdWxlKSB7XG4gICAgICAgICgwLCB1dGlsXzEuY2hlY2tTdHJpY3RNb2RlKShpdCwgYGRlZmF1bHQgaXMgaWdub3JlZCBmb3I6ICR7Y2hpbGREYXRhfWApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBjb25kaXRpb24gPSAoMCwgY29kZWdlbl8xLl8pIGAke2NoaWxkRGF0YX0gPT09IHVuZGVmaW5lZGA7XG4gICAgaWYgKG9wdHMudXNlRGVmYXVsdHMgPT09IFwiZW1wdHlcIikge1xuICAgICAgICBjb25kaXRpb24gPSAoMCwgY29kZWdlbl8xLl8pIGAke2NvbmRpdGlvbn0gfHwgJHtjaGlsZERhdGF9ID09PSBudWxsIHx8ICR7Y2hpbGREYXRhfSA9PT0gXCJcImA7XG4gICAgfVxuICAgIC8vIGAke2NoaWxkRGF0YX0gPT09IHVuZGVmaW5lZGAgK1xuICAgIC8vIChvcHRzLnVzZURlZmF1bHRzID09PSBcImVtcHR5XCIgPyBgIHx8ICR7Y2hpbGREYXRhfSA9PT0gbnVsbCB8fCAke2NoaWxkRGF0YX0gPT09IFwiXCJgIDogXCJcIilcbiAgICBnZW4uaWYoY29uZGl0aW9uLCAoMCwgY29kZWdlbl8xLl8pIGAke2NoaWxkRGF0YX0gPSAkeygwLCBjb2RlZ2VuXzEuc3RyaW5naWZ5KShkZWZhdWx0VmFsdWUpfWApO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVmYXVsdHMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldERhdGEgPSBleHBvcnRzLktleXdvcmRDeHQgPSBleHBvcnRzLnZhbGlkYXRlRnVuY3Rpb25Db2RlID0gdm9pZCAwO1xuY29uc3QgYm9vbFNjaGVtYV8xID0gcmVxdWlyZShcIi4vYm9vbFNjaGVtYVwiKTtcbmNvbnN0IGRhdGFUeXBlXzEgPSByZXF1aXJlKFwiLi9kYXRhVHlwZVwiKTtcbmNvbnN0IGFwcGxpY2FiaWxpdHlfMSA9IHJlcXVpcmUoXCIuL2FwcGxpY2FiaWxpdHlcIik7XG5jb25zdCBkYXRhVHlwZV8yID0gcmVxdWlyZShcIi4vZGF0YVR5cGVcIik7XG5jb25zdCBkZWZhdWx0c18xID0gcmVxdWlyZShcIi4vZGVmYXVsdHNcIik7XG5jb25zdCBrZXl3b3JkXzEgPSByZXF1aXJlKFwiLi9rZXl3b3JkXCIpO1xuY29uc3Qgc3Vic2NoZW1hXzEgPSByZXF1aXJlKFwiLi9zdWJzY2hlbWFcIik7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vY29kZWdlblwiKTtcbmNvbnN0IG5hbWVzXzEgPSByZXF1aXJlKFwiLi4vbmFtZXNcIik7XG5jb25zdCByZXNvbHZlXzEgPSByZXF1aXJlKFwiLi4vcmVzb2x2ZVwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xuY29uc3QgZXJyb3JzXzEgPSByZXF1aXJlKFwiLi4vZXJyb3JzXCIpO1xuLy8gc2NoZW1hIGNvbXBpbGF0aW9uIC0gZ2VuZXJhdGVzIHZhbGlkYXRpb24gZnVuY3Rpb24sIHN1YnNjaGVtYUNvZGUgKGJlbG93KSBpcyB1c2VkIGZvciBzdWJzY2hlbWFzXG5mdW5jdGlvbiB2YWxpZGF0ZUZ1bmN0aW9uQ29kZShpdCkge1xuICAgIGlmIChpc1NjaGVtYU9iaihpdCkpIHtcbiAgICAgICAgY2hlY2tLZXl3b3JkcyhpdCk7XG4gICAgICAgIGlmIChzY2hlbWFDeHRIYXNSdWxlcyhpdCkpIHtcbiAgICAgICAgICAgIHRvcFNjaGVtYU9iakNvZGUoaXQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhbGlkYXRlRnVuY3Rpb24oaXQsICgpID0+ICgwLCBib29sU2NoZW1hXzEudG9wQm9vbE9yRW1wdHlTY2hlbWEpKGl0KSk7XG59XG5leHBvcnRzLnZhbGlkYXRlRnVuY3Rpb25Db2RlID0gdmFsaWRhdGVGdW5jdGlvbkNvZGU7XG5mdW5jdGlvbiB2YWxpZGF0ZUZ1bmN0aW9uKHsgZ2VuLCB2YWxpZGF0ZU5hbWUsIHNjaGVtYSwgc2NoZW1hRW52LCBvcHRzIH0sIGJvZHkpIHtcbiAgICBpZiAob3B0cy5jb2RlLmVzNSkge1xuICAgICAgICBnZW4uZnVuYyh2YWxpZGF0ZU5hbWUsICgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LmRhdGF9LCAke25hbWVzXzEuZGVmYXVsdC52YWxDeHR9YCwgc2NoZW1hRW52LiRhc3luYywgKCkgPT4ge1xuICAgICAgICAgICAgZ2VuLmNvZGUoKDAsIGNvZGVnZW5fMS5fKSBgXCJ1c2Ugc3RyaWN0XCI7ICR7ZnVuY1NvdXJjZVVybChzY2hlbWEsIG9wdHMpfWApO1xuICAgICAgICAgICAgZGVzdHJ1Y3R1cmVWYWxDeHRFUzUoZ2VuLCBvcHRzKTtcbiAgICAgICAgICAgIGdlbi5jb2RlKGJvZHkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdlbi5mdW5jKHZhbGlkYXRlTmFtZSwgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQuZGF0YX0sICR7ZGVzdHJ1Y3R1cmVWYWxDeHQob3B0cyl9YCwgc2NoZW1hRW52LiRhc3luYywgKCkgPT4gZ2VuLmNvZGUoZnVuY1NvdXJjZVVybChzY2hlbWEsIG9wdHMpKS5jb2RlKGJvZHkpKTtcbiAgICB9XG59XG5mdW5jdGlvbiBkZXN0cnVjdHVyZVZhbEN4dChvcHRzKSB7XG4gICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYHske25hbWVzXzEuZGVmYXVsdC5pbnN0YW5jZVBhdGh9PVwiXCIsICR7bmFtZXNfMS5kZWZhdWx0LnBhcmVudERhdGF9LCAke25hbWVzXzEuZGVmYXVsdC5wYXJlbnREYXRhUHJvcGVydHl9LCAke25hbWVzXzEuZGVmYXVsdC5yb290RGF0YX09JHtuYW1lc18xLmRlZmF1bHQuZGF0YX0ke29wdHMuZHluYW1pY1JlZiA/ICgwLCBjb2RlZ2VuXzEuXykgYCwgJHtuYW1lc18xLmRlZmF1bHQuZHluYW1pY0FuY2hvcnN9PXt9YCA6IGNvZGVnZW5fMS5uaWx9fT17fWA7XG59XG5mdW5jdGlvbiBkZXN0cnVjdHVyZVZhbEN4dEVTNShnZW4sIG9wdHMpIHtcbiAgICBnZW4uaWYobmFtZXNfMS5kZWZhdWx0LnZhbEN4dCwgKCkgPT4ge1xuICAgICAgICBnZW4udmFyKG5hbWVzXzEuZGVmYXVsdC5pbnN0YW5jZVBhdGgsICgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnZhbEN4dH0uJHtuYW1lc18xLmRlZmF1bHQuaW5zdGFuY2VQYXRofWApO1xuICAgICAgICBnZW4udmFyKG5hbWVzXzEuZGVmYXVsdC5wYXJlbnREYXRhLCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52YWxDeHR9LiR7bmFtZXNfMS5kZWZhdWx0LnBhcmVudERhdGF9YCk7XG4gICAgICAgIGdlbi52YXIobmFtZXNfMS5kZWZhdWx0LnBhcmVudERhdGFQcm9wZXJ0eSwgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudmFsQ3h0fS4ke25hbWVzXzEuZGVmYXVsdC5wYXJlbnREYXRhUHJvcGVydHl9YCk7XG4gICAgICAgIGdlbi52YXIobmFtZXNfMS5kZWZhdWx0LnJvb3REYXRhLCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52YWxDeHR9LiR7bmFtZXNfMS5kZWZhdWx0LnJvb3REYXRhfWApO1xuICAgICAgICBpZiAob3B0cy5keW5hbWljUmVmKVxuICAgICAgICAgICAgZ2VuLnZhcihuYW1lc18xLmRlZmF1bHQuZHluYW1pY0FuY2hvcnMsICgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnZhbEN4dH0uJHtuYW1lc18xLmRlZmF1bHQuZHluYW1pY0FuY2hvcnN9YCk7XG4gICAgfSwgKCkgPT4ge1xuICAgICAgICBnZW4udmFyKG5hbWVzXzEuZGVmYXVsdC5pbnN0YW5jZVBhdGgsICgwLCBjb2RlZ2VuXzEuXykgYFwiXCJgKTtcbiAgICAgICAgZ2VuLnZhcihuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YSwgKDAsIGNvZGVnZW5fMS5fKSBgdW5kZWZpbmVkYCk7XG4gICAgICAgIGdlbi52YXIobmFtZXNfMS5kZWZhdWx0LnBhcmVudERhdGFQcm9wZXJ0eSwgKDAsIGNvZGVnZW5fMS5fKSBgdW5kZWZpbmVkYCk7XG4gICAgICAgIGdlbi52YXIobmFtZXNfMS5kZWZhdWx0LnJvb3REYXRhLCBuYW1lc18xLmRlZmF1bHQuZGF0YSk7XG4gICAgICAgIGlmIChvcHRzLmR5bmFtaWNSZWYpXG4gICAgICAgICAgICBnZW4udmFyKG5hbWVzXzEuZGVmYXVsdC5keW5hbWljQW5jaG9ycywgKDAsIGNvZGVnZW5fMS5fKSBge31gKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHRvcFNjaGVtYU9iakNvZGUoaXQpIHtcbiAgICBjb25zdCB7IHNjaGVtYSwgb3B0cywgZ2VuIH0gPSBpdDtcbiAgICB2YWxpZGF0ZUZ1bmN0aW9uKGl0LCAoKSA9PiB7XG4gICAgICAgIGlmIChvcHRzLiRjb21tZW50ICYmIHNjaGVtYS4kY29tbWVudClcbiAgICAgICAgICAgIGNvbW1lbnRLZXl3b3JkKGl0KTtcbiAgICAgICAgY2hlY2tOb0RlZmF1bHQoaXQpO1xuICAgICAgICBnZW4ubGV0KG5hbWVzXzEuZGVmYXVsdC52RXJyb3JzLCBudWxsKTtcbiAgICAgICAgZ2VuLmxldChuYW1lc18xLmRlZmF1bHQuZXJyb3JzLCAwKTtcbiAgICAgICAgaWYgKG9wdHMudW5ldmFsdWF0ZWQpXG4gICAgICAgICAgICByZXNldEV2YWx1YXRlZChpdCk7XG4gICAgICAgIHR5cGVBbmRLZXl3b3JkcyhpdCk7XG4gICAgICAgIHJldHVyblJlc3VsdHMoaXQpO1xuICAgIH0pO1xuICAgIHJldHVybjtcbn1cbmZ1bmN0aW9uIHJlc2V0RXZhbHVhdGVkKGl0KSB7XG4gICAgLy8gVE9ETyBtYXliZSBzb21lIGhvb2sgdG8gZXhlY3V0ZSBpdCBpbiB0aGUgZW5kIHRvIGNoZWNrIHdoZXRoZXIgcHJvcHMvaXRlbXMgYXJlIE5hbWUsIGFzIGluIGFzc2lnbkV2YWx1YXRlZFxuICAgIGNvbnN0IHsgZ2VuLCB2YWxpZGF0ZU5hbWUgfSA9IGl0O1xuICAgIGl0LmV2YWx1YXRlZCA9IGdlbi5jb25zdChcImV2YWx1YXRlZFwiLCAoMCwgY29kZWdlbl8xLl8pIGAke3ZhbGlkYXRlTmFtZX0uZXZhbHVhdGVkYCk7XG4gICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7aXQuZXZhbHVhdGVkfS5keW5hbWljUHJvcHNgLCAoKSA9PiBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7aXQuZXZhbHVhdGVkfS5wcm9wc2AsICgwLCBjb2RlZ2VuXzEuXykgYHVuZGVmaW5lZGApKTtcbiAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtpdC5ldmFsdWF0ZWR9LmR5bmFtaWNJdGVtc2AsICgpID0+IGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHtpdC5ldmFsdWF0ZWR9Lml0ZW1zYCwgKDAsIGNvZGVnZW5fMS5fKSBgdW5kZWZpbmVkYCkpO1xufVxuZnVuY3Rpb24gZnVuY1NvdXJjZVVybChzY2hlbWEsIG9wdHMpIHtcbiAgICBjb25zdCBzY2hJZCA9IHR5cGVvZiBzY2hlbWEgPT0gXCJvYmplY3RcIiAmJiBzY2hlbWFbb3B0cy5zY2hlbWFJZF07XG4gICAgcmV0dXJuIHNjaElkICYmIChvcHRzLmNvZGUuc291cmNlIHx8IG9wdHMuY29kZS5wcm9jZXNzKSA/ICgwLCBjb2RlZ2VuXzEuXykgYC8qIyBzb3VyY2VVUkw9JHtzY2hJZH0gKi9gIDogY29kZWdlbl8xLm5pbDtcbn1cbi8vIHNjaGVtYSBjb21waWxhdGlvbiAtIHRoaXMgZnVuY3Rpb24gaXMgdXNlZCByZWN1cnNpdmVseSB0byBnZW5lcmF0ZSBjb2RlIGZvciBzdWItc2NoZW1hc1xuZnVuY3Rpb24gc3Vic2NoZW1hQ29kZShpdCwgdmFsaWQpIHtcbiAgICBpZiAoaXNTY2hlbWFPYmooaXQpKSB7XG4gICAgICAgIGNoZWNrS2V5d29yZHMoaXQpO1xuICAgICAgICBpZiAoc2NoZW1hQ3h0SGFzUnVsZXMoaXQpKSB7XG4gICAgICAgICAgICBzdWJTY2hlbWFPYmpDb2RlKGl0LCB2YWxpZCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgKDAsIGJvb2xTY2hlbWFfMS5ib29sT3JFbXB0eVNjaGVtYSkoaXQsIHZhbGlkKTtcbn1cbmZ1bmN0aW9uIHNjaGVtYUN4dEhhc1J1bGVzKHsgc2NoZW1hLCBzZWxmIH0pIHtcbiAgICBpZiAodHlwZW9mIHNjaGVtYSA9PSBcImJvb2xlYW5cIilcbiAgICAgICAgcmV0dXJuICFzY2hlbWE7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gc2NoZW1hKVxuICAgICAgICBpZiAoc2VsZi5SVUxFUy5hbGxba2V5XSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGlzU2NoZW1hT2JqKGl0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBpdC5zY2hlbWEgIT0gXCJib29sZWFuXCI7XG59XG5mdW5jdGlvbiBzdWJTY2hlbWFPYmpDb2RlKGl0LCB2YWxpZCkge1xuICAgIGNvbnN0IHsgc2NoZW1hLCBnZW4sIG9wdHMgfSA9IGl0O1xuICAgIGlmIChvcHRzLiRjb21tZW50ICYmIHNjaGVtYS4kY29tbWVudClcbiAgICAgICAgY29tbWVudEtleXdvcmQoaXQpO1xuICAgIHVwZGF0ZUNvbnRleHQoaXQpO1xuICAgIGNoZWNrQXN5bmNTY2hlbWEoaXQpO1xuICAgIGNvbnN0IGVycnNDb3VudCA9IGdlbi5jb25zdChcIl9lcnJzXCIsIG5hbWVzXzEuZGVmYXVsdC5lcnJvcnMpO1xuICAgIHR5cGVBbmRLZXl3b3JkcyhpdCwgZXJyc0NvdW50KTtcbiAgICAvLyBUT0RPIHZhclxuICAgIGdlbi52YXIodmFsaWQsICgwLCBjb2RlZ2VuXzEuXykgYCR7ZXJyc0NvdW50fSA9PT0gJHtuYW1lc18xLmRlZmF1bHQuZXJyb3JzfWApO1xufVxuZnVuY3Rpb24gY2hlY2tLZXl3b3JkcyhpdCkge1xuICAgICgwLCB1dGlsXzEuY2hlY2tVbmtub3duUnVsZXMpKGl0KTtcbiAgICBjaGVja1JlZnNBbmRLZXl3b3JkcyhpdCk7XG59XG5mdW5jdGlvbiB0eXBlQW5kS2V5d29yZHMoaXQsIGVycnNDb3VudCkge1xuICAgIGlmIChpdC5vcHRzLmp0ZClcbiAgICAgICAgcmV0dXJuIHNjaGVtYUtleXdvcmRzKGl0LCBbXSwgZmFsc2UsIGVycnNDb3VudCk7XG4gICAgY29uc3QgdHlwZXMgPSAoMCwgZGF0YVR5cGVfMS5nZXRTY2hlbWFUeXBlcykoaXQuc2NoZW1hKTtcbiAgICBjb25zdCBjaGVja2VkVHlwZXMgPSAoMCwgZGF0YVR5cGVfMS5jb2VyY2VBbmRDaGVja0RhdGFUeXBlKShpdCwgdHlwZXMpO1xuICAgIHNjaGVtYUtleXdvcmRzKGl0LCB0eXBlcywgIWNoZWNrZWRUeXBlcywgZXJyc0NvdW50KTtcbn1cbmZ1bmN0aW9uIGNoZWNrUmVmc0FuZEtleXdvcmRzKGl0KSB7XG4gICAgY29uc3QgeyBzY2hlbWEsIGVyclNjaGVtYVBhdGgsIG9wdHMsIHNlbGYgfSA9IGl0O1xuICAgIGlmIChzY2hlbWEuJHJlZiAmJiBvcHRzLmlnbm9yZUtleXdvcmRzV2l0aFJlZiAmJiAoMCwgdXRpbF8xLnNjaGVtYUhhc1J1bGVzQnV0UmVmKShzY2hlbWEsIHNlbGYuUlVMRVMpKSB7XG4gICAgICAgIHNlbGYubG9nZ2VyLndhcm4oYCRyZWY6IGtleXdvcmRzIGlnbm9yZWQgaW4gc2NoZW1hIGF0IHBhdGggXCIke2VyclNjaGVtYVBhdGh9XCJgKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjaGVja05vRGVmYXVsdChpdCkge1xuICAgIGNvbnN0IHsgc2NoZW1hLCBvcHRzIH0gPSBpdDtcbiAgICBpZiAoc2NoZW1hLmRlZmF1bHQgIT09IHVuZGVmaW5lZCAmJiBvcHRzLnVzZURlZmF1bHRzICYmIG9wdHMuc3RyaWN0U2NoZW1hKSB7XG4gICAgICAgICgwLCB1dGlsXzEuY2hlY2tTdHJpY3RNb2RlKShpdCwgXCJkZWZhdWx0IGlzIGlnbm9yZWQgaW4gdGhlIHNjaGVtYSByb290XCIpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZUNvbnRleHQoaXQpIHtcbiAgICBjb25zdCBzY2hJZCA9IGl0LnNjaGVtYVtpdC5vcHRzLnNjaGVtYUlkXTtcbiAgICBpZiAoc2NoSWQpXG4gICAgICAgIGl0LmJhc2VJZCA9ICgwLCByZXNvbHZlXzEucmVzb2x2ZVVybCkoaXQub3B0cy51cmlSZXNvbHZlciwgaXQuYmFzZUlkLCBzY2hJZCk7XG59XG5mdW5jdGlvbiBjaGVja0FzeW5jU2NoZW1hKGl0KSB7XG4gICAgaWYgKGl0LnNjaGVtYS4kYXN5bmMgJiYgIWl0LnNjaGVtYUVudi4kYXN5bmMpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImFzeW5jIHNjaGVtYSBpbiBzeW5jIHNjaGVtYVwiKTtcbn1cbmZ1bmN0aW9uIGNvbW1lbnRLZXl3b3JkKHsgZ2VuLCBzY2hlbWFFbnYsIHNjaGVtYSwgZXJyU2NoZW1hUGF0aCwgb3B0cyB9KSB7XG4gICAgY29uc3QgbXNnID0gc2NoZW1hLiRjb21tZW50O1xuICAgIGlmIChvcHRzLiRjb21tZW50ID09PSB0cnVlKSB7XG4gICAgICAgIGdlbi5jb2RlKCgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnNlbGZ9LmxvZ2dlci5sb2coJHttc2d9KWApO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2Ygb3B0cy4kY29tbWVudCA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY29uc3Qgc2NoZW1hUGF0aCA9ICgwLCBjb2RlZ2VuXzEuc3RyKSBgJHtlcnJTY2hlbWFQYXRofS8kY29tbWVudGA7XG4gICAgICAgIGNvbnN0IHJvb3ROYW1lID0gZ2VuLnNjb3BlVmFsdWUoXCJyb290XCIsIHsgcmVmOiBzY2hlbWFFbnYucm9vdCB9KTtcbiAgICAgICAgZ2VuLmNvZGUoKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQuc2VsZn0ub3B0cy4kY29tbWVudCgke21zZ30sICR7c2NoZW1hUGF0aH0sICR7cm9vdE5hbWV9LnNjaGVtYSlgKTtcbiAgICB9XG59XG5mdW5jdGlvbiByZXR1cm5SZXN1bHRzKGl0KSB7XG4gICAgY29uc3QgeyBnZW4sIHNjaGVtYUVudiwgdmFsaWRhdGVOYW1lLCBWYWxpZGF0aW9uRXJyb3IsIG9wdHMgfSA9IGl0O1xuICAgIGlmIChzY2hlbWFFbnYuJGFzeW5jKSB7XG4gICAgICAgIC8vIFRPRE8gYXNzaWduIHVuZXZhbHVhdGVkXG4gICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC5lcnJvcnN9ID09PSAwYCwgKCkgPT4gZ2VuLnJldHVybihuYW1lc18xLmRlZmF1bHQuZGF0YSksICgpID0+IGdlbi50aHJvdygoMCwgY29kZWdlbl8xLl8pIGBuZXcgJHtWYWxpZGF0aW9uRXJyb3J9KCR7bmFtZXNfMS5kZWZhdWx0LnZFcnJvcnN9KWApKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHt2YWxpZGF0ZU5hbWV9LmVycm9yc2AsIG5hbWVzXzEuZGVmYXVsdC52RXJyb3JzKTtcbiAgICAgICAgaWYgKG9wdHMudW5ldmFsdWF0ZWQpXG4gICAgICAgICAgICBhc3NpZ25FdmFsdWF0ZWQoaXQpO1xuICAgICAgICBnZW4ucmV0dXJuKCgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LmVycm9yc30gPT09IDBgKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhc3NpZ25FdmFsdWF0ZWQoeyBnZW4sIGV2YWx1YXRlZCwgcHJvcHMsIGl0ZW1zIH0pIHtcbiAgICBpZiAocHJvcHMgaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZSlcbiAgICAgICAgZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke2V2YWx1YXRlZH0ucHJvcHNgLCBwcm9wcyk7XG4gICAgaWYgKGl0ZW1zIGluc3RhbmNlb2YgY29kZWdlbl8xLk5hbWUpXG4gICAgICAgIGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHtldmFsdWF0ZWR9Lml0ZW1zYCwgaXRlbXMpO1xufVxuZnVuY3Rpb24gc2NoZW1hS2V5d29yZHMoaXQsIHR5cGVzLCB0eXBlRXJyb3JzLCBlcnJzQ291bnQpIHtcbiAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBkYXRhLCBhbGxFcnJvcnMsIG9wdHMsIHNlbGYgfSA9IGl0O1xuICAgIGNvbnN0IHsgUlVMRVMgfSA9IHNlbGY7XG4gICAgaWYgKHNjaGVtYS4kcmVmICYmIChvcHRzLmlnbm9yZUtleXdvcmRzV2l0aFJlZiB8fCAhKDAsIHV0aWxfMS5zY2hlbWFIYXNSdWxlc0J1dFJlZikoc2NoZW1hLCBSVUxFUykpKSB7XG4gICAgICAgIGdlbi5ibG9jaygoKSA9PiBrZXl3b3JkQ29kZShpdCwgXCIkcmVmXCIsIFJVTEVTLmFsbC4kcmVmLmRlZmluaXRpb24pKTsgLy8gVE9ETyB0eXBlY2FzdFxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghb3B0cy5qdGQpXG4gICAgICAgIGNoZWNrU3RyaWN0VHlwZXMoaXQsIHR5cGVzKTtcbiAgICBnZW4uYmxvY2soKCkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIFJVTEVTLnJ1bGVzKVxuICAgICAgICAgICAgZ3JvdXBLZXl3b3Jkcyhncm91cCk7XG4gICAgICAgIGdyb3VwS2V5d29yZHMoUlVMRVMucG9zdCk7XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gZ3JvdXBLZXl3b3Jkcyhncm91cCkge1xuICAgICAgICBpZiAoISgwLCBhcHBsaWNhYmlsaXR5XzEuc2hvdWxkVXNlR3JvdXApKHNjaGVtYSwgZ3JvdXApKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoZ3JvdXAudHlwZSkge1xuICAgICAgICAgICAgZ2VuLmlmKCgwLCBkYXRhVHlwZV8yLmNoZWNrRGF0YVR5cGUpKGdyb3VwLnR5cGUsIGRhdGEsIG9wdHMuc3RyaWN0TnVtYmVycykpO1xuICAgICAgICAgICAgaXRlcmF0ZUtleXdvcmRzKGl0LCBncm91cCk7XG4gICAgICAgICAgICBpZiAodHlwZXMubGVuZ3RoID09PSAxICYmIHR5cGVzWzBdID09PSBncm91cC50eXBlICYmIHR5cGVFcnJvcnMpIHtcbiAgICAgICAgICAgICAgICBnZW4uZWxzZSgpO1xuICAgICAgICAgICAgICAgICgwLCBkYXRhVHlwZV8yLnJlcG9ydFR5cGVFcnJvcikoaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2VuLmVuZElmKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpdGVyYXRlS2V5d29yZHMoaXQsIGdyb3VwKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPIG1ha2UgaXQgXCJva1wiIGNhbGw/XG4gICAgICAgIGlmICghYWxsRXJyb3JzKVxuICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LmVycm9yc30gPT09ICR7ZXJyc0NvdW50IHx8IDB9YCk7XG4gICAgfVxufVxuZnVuY3Rpb24gaXRlcmF0ZUtleXdvcmRzKGl0LCBncm91cCkge1xuICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIG9wdHM6IHsgdXNlRGVmYXVsdHMgfSwgfSA9IGl0O1xuICAgIGlmICh1c2VEZWZhdWx0cylcbiAgICAgICAgKDAsIGRlZmF1bHRzXzEuYXNzaWduRGVmYXVsdHMpKGl0LCBncm91cC50eXBlKTtcbiAgICBnZW4uYmxvY2soKCkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHJ1bGUgb2YgZ3JvdXAucnVsZXMpIHtcbiAgICAgICAgICAgIGlmICgoMCwgYXBwbGljYWJpbGl0eV8xLnNob3VsZFVzZVJ1bGUpKHNjaGVtYSwgcnVsZSkpIHtcbiAgICAgICAgICAgICAgICBrZXl3b3JkQ29kZShpdCwgcnVsZS5rZXl3b3JkLCBydWxlLmRlZmluaXRpb24sIGdyb3VwLnR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjaGVja1N0cmljdFR5cGVzKGl0LCB0eXBlcykge1xuICAgIGlmIChpdC5zY2hlbWFFbnYubWV0YSB8fCAhaXQub3B0cy5zdHJpY3RUeXBlcylcbiAgICAgICAgcmV0dXJuO1xuICAgIGNoZWNrQ29udGV4dFR5cGVzKGl0LCB0eXBlcyk7XG4gICAgaWYgKCFpdC5vcHRzLmFsbG93VW5pb25UeXBlcylcbiAgICAgICAgY2hlY2tNdWx0aXBsZVR5cGVzKGl0LCB0eXBlcyk7XG4gICAgY2hlY2tLZXl3b3JkVHlwZXMoaXQsIGl0LmRhdGFUeXBlcyk7XG59XG5mdW5jdGlvbiBjaGVja0NvbnRleHRUeXBlcyhpdCwgdHlwZXMpIHtcbiAgICBpZiAoIXR5cGVzLmxlbmd0aClcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmICghaXQuZGF0YVR5cGVzLmxlbmd0aCkge1xuICAgICAgICBpdC5kYXRhVHlwZXMgPSB0eXBlcztcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0eXBlcy5mb3JFYWNoKCh0KSA9PiB7XG4gICAgICAgIGlmICghaW5jbHVkZXNUeXBlKGl0LmRhdGFUeXBlcywgdCkpIHtcbiAgICAgICAgICAgIHN0cmljdFR5cGVzRXJyb3IoaXQsIGB0eXBlIFwiJHt0fVwiIG5vdCBhbGxvd2VkIGJ5IGNvbnRleHQgXCIke2l0LmRhdGFUeXBlcy5qb2luKFwiLFwiKX1cImApO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgbmFycm93U2NoZW1hVHlwZXMoaXQsIHR5cGVzKTtcbn1cbmZ1bmN0aW9uIGNoZWNrTXVsdGlwbGVUeXBlcyhpdCwgdHMpIHtcbiAgICBpZiAodHMubGVuZ3RoID4gMSAmJiAhKHRzLmxlbmd0aCA9PT0gMiAmJiB0cy5pbmNsdWRlcyhcIm51bGxcIikpKSB7XG4gICAgICAgIHN0cmljdFR5cGVzRXJyb3IoaXQsIFwidXNlIGFsbG93VW5pb25UeXBlcyB0byBhbGxvdyB1bmlvbiB0eXBlIGtleXdvcmRcIik7XG4gICAgfVxufVxuZnVuY3Rpb24gY2hlY2tLZXl3b3JkVHlwZXMoaXQsIHRzKSB7XG4gICAgY29uc3QgcnVsZXMgPSBpdC5zZWxmLlJVTEVTLmFsbDtcbiAgICBmb3IgKGNvbnN0IGtleXdvcmQgaW4gcnVsZXMpIHtcbiAgICAgICAgY29uc3QgcnVsZSA9IHJ1bGVzW2tleXdvcmRdO1xuICAgICAgICBpZiAodHlwZW9mIHJ1bGUgPT0gXCJvYmplY3RcIiAmJiAoMCwgYXBwbGljYWJpbGl0eV8xLnNob3VsZFVzZVJ1bGUpKGl0LnNjaGVtYSwgcnVsZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgdHlwZSB9ID0gcnVsZS5kZWZpbml0aW9uO1xuICAgICAgICAgICAgaWYgKHR5cGUubGVuZ3RoICYmICF0eXBlLnNvbWUoKHQpID0+IGhhc0FwcGxpY2FibGVUeXBlKHRzLCB0KSkpIHtcbiAgICAgICAgICAgICAgICBzdHJpY3RUeXBlc0Vycm9yKGl0LCBgbWlzc2luZyB0eXBlIFwiJHt0eXBlLmpvaW4oXCIsXCIpfVwiIGZvciBrZXl3b3JkIFwiJHtrZXl3b3JkfVwiYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBoYXNBcHBsaWNhYmxlVHlwZShzY2hUcywga3dkVCkge1xuICAgIHJldHVybiBzY2hUcy5pbmNsdWRlcyhrd2RUKSB8fCAoa3dkVCA9PT0gXCJudW1iZXJcIiAmJiBzY2hUcy5pbmNsdWRlcyhcImludGVnZXJcIikpO1xufVxuZnVuY3Rpb24gaW5jbHVkZXNUeXBlKHRzLCB0KSB7XG4gICAgcmV0dXJuIHRzLmluY2x1ZGVzKHQpIHx8ICh0ID09PSBcImludGVnZXJcIiAmJiB0cy5pbmNsdWRlcyhcIm51bWJlclwiKSk7XG59XG5mdW5jdGlvbiBuYXJyb3dTY2hlbWFUeXBlcyhpdCwgd2l0aFR5cGVzKSB7XG4gICAgY29uc3QgdHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHQgb2YgaXQuZGF0YVR5cGVzKSB7XG4gICAgICAgIGlmIChpbmNsdWRlc1R5cGUod2l0aFR5cGVzLCB0KSlcbiAgICAgICAgICAgIHRzLnB1c2godCk7XG4gICAgICAgIGVsc2UgaWYgKHdpdGhUeXBlcy5pbmNsdWRlcyhcImludGVnZXJcIikgJiYgdCA9PT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgIHRzLnB1c2goXCJpbnRlZ2VyXCIpO1xuICAgIH1cbiAgICBpdC5kYXRhVHlwZXMgPSB0cztcbn1cbmZ1bmN0aW9uIHN0cmljdFR5cGVzRXJyb3IoaXQsIG1zZykge1xuICAgIGNvbnN0IHNjaGVtYVBhdGggPSBpdC5zY2hlbWFFbnYuYmFzZUlkICsgaXQuZXJyU2NoZW1hUGF0aDtcbiAgICBtc2cgKz0gYCBhdCBcIiR7c2NoZW1hUGF0aH1cIiAoc3RyaWN0VHlwZXMpYDtcbiAgICAoMCwgdXRpbF8xLmNoZWNrU3RyaWN0TW9kZSkoaXQsIG1zZywgaXQub3B0cy5zdHJpY3RUeXBlcyk7XG59XG5jbGFzcyBLZXl3b3JkQ3h0IHtcbiAgICBjb25zdHJ1Y3RvcihpdCwgZGVmLCBrZXl3b3JkKSB7XG4gICAgICAgICgwLCBrZXl3b3JkXzEudmFsaWRhdGVLZXl3b3JkVXNhZ2UpKGl0LCBkZWYsIGtleXdvcmQpO1xuICAgICAgICB0aGlzLmdlbiA9IGl0LmdlbjtcbiAgICAgICAgdGhpcy5hbGxFcnJvcnMgPSBpdC5hbGxFcnJvcnM7XG4gICAgICAgIHRoaXMua2V5d29yZCA9IGtleXdvcmQ7XG4gICAgICAgIHRoaXMuZGF0YSA9IGl0LmRhdGE7XG4gICAgICAgIHRoaXMuc2NoZW1hID0gaXQuc2NoZW1hW2tleXdvcmRdO1xuICAgICAgICB0aGlzLiRkYXRhID0gZGVmLiRkYXRhICYmIGl0Lm9wdHMuJGRhdGEgJiYgdGhpcy5zY2hlbWEgJiYgdGhpcy5zY2hlbWEuJGRhdGE7XG4gICAgICAgIHRoaXMuc2NoZW1hVmFsdWUgPSAoMCwgdXRpbF8xLnNjaGVtYVJlZk9yVmFsKShpdCwgdGhpcy5zY2hlbWEsIGtleXdvcmQsIHRoaXMuJGRhdGEpO1xuICAgICAgICB0aGlzLnNjaGVtYVR5cGUgPSBkZWYuc2NoZW1hVHlwZTtcbiAgICAgICAgdGhpcy5wYXJlbnRTY2hlbWEgPSBpdC5zY2hlbWE7XG4gICAgICAgIHRoaXMucGFyYW1zID0ge307XG4gICAgICAgIHRoaXMuaXQgPSBpdDtcbiAgICAgICAgdGhpcy5kZWYgPSBkZWY7XG4gICAgICAgIGlmICh0aGlzLiRkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVtYUNvZGUgPSBpdC5nZW4uY29uc3QoXCJ2U2NoZW1hXCIsIGdldERhdGEodGhpcy4kZGF0YSwgaXQpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZW1hQ29kZSA9IHRoaXMuc2NoZW1hVmFsdWU7XG4gICAgICAgICAgICBpZiAoISgwLCBrZXl3b3JkXzEudmFsaWRTY2hlbWFUeXBlKSh0aGlzLnNjaGVtYSwgZGVmLnNjaGVtYVR5cGUsIGRlZi5hbGxvd1VuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7a2V5d29yZH0gdmFsdWUgbXVzdCBiZSAke0pTT04uc3RyaW5naWZ5KGRlZi5zY2hlbWFUeXBlKX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoXCJjb2RlXCIgaW4gZGVmID8gZGVmLnRyYWNrRXJyb3JzIDogZGVmLmVycm9ycyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyc0NvdW50ID0gaXQuZ2VuLmNvbnN0KFwiX2VycnNcIiwgbmFtZXNfMS5kZWZhdWx0LmVycm9ycyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0KGNvbmRpdGlvbiwgc3VjY2Vzc0FjdGlvbiwgZmFpbEFjdGlvbikge1xuICAgICAgICB0aGlzLmZhaWxSZXN1bHQoKDAsIGNvZGVnZW5fMS5ub3QpKGNvbmRpdGlvbiksIHN1Y2Nlc3NBY3Rpb24sIGZhaWxBY3Rpb24pO1xuICAgIH1cbiAgICBmYWlsUmVzdWx0KGNvbmRpdGlvbiwgc3VjY2Vzc0FjdGlvbiwgZmFpbEFjdGlvbikge1xuICAgICAgICB0aGlzLmdlbi5pZihjb25kaXRpb24pO1xuICAgICAgICBpZiAoZmFpbEFjdGlvbilcbiAgICAgICAgICAgIGZhaWxBY3Rpb24oKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5lcnJvcigpO1xuICAgICAgICBpZiAoc3VjY2Vzc0FjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5nZW4uZWxzZSgpO1xuICAgICAgICAgICAgc3VjY2Vzc0FjdGlvbigpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYWxsRXJyb3JzKVxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuLmVuZElmKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hbGxFcnJvcnMpXG4gICAgICAgICAgICAgICAgdGhpcy5nZW4uZW5kSWYoKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmdlbi5lbHNlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGFzcyhjb25kaXRpb24sIGZhaWxBY3Rpb24pIHtcbiAgICAgICAgdGhpcy5mYWlsUmVzdWx0KCgwLCBjb2RlZ2VuXzEubm90KShjb25kaXRpb24pLCB1bmRlZmluZWQsIGZhaWxBY3Rpb24pO1xuICAgIH1cbiAgICBmYWlsKGNvbmRpdGlvbikge1xuICAgICAgICBpZiAoY29uZGl0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5hbGxFcnJvcnMpXG4gICAgICAgICAgICAgICAgdGhpcy5nZW4uaWYoZmFsc2UpOyAvLyB0aGlzIGJyYW5jaCB3aWxsIGJlIHJlbW92ZWQgYnkgZ2VuLm9wdGltaXplXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZW4uaWYoY29uZGl0aW9uKTtcbiAgICAgICAgdGhpcy5lcnJvcigpO1xuICAgICAgICBpZiAodGhpcy5hbGxFcnJvcnMpXG4gICAgICAgICAgICB0aGlzLmdlbi5lbmRJZigpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmdlbi5lbHNlKCk7XG4gICAgfVxuICAgIGZhaWwkZGF0YShjb25kaXRpb24pIHtcbiAgICAgICAgaWYgKCF0aGlzLiRkYXRhKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmFpbChjb25kaXRpb24pO1xuICAgICAgICBjb25zdCB7IHNjaGVtYUNvZGUgfSA9IHRoaXM7XG4gICAgICAgIHRoaXMuZmFpbCgoMCwgY29kZWdlbl8xLl8pIGAke3NjaGVtYUNvZGV9ICE9PSB1bmRlZmluZWQgJiYgKCR7KDAsIGNvZGVnZW5fMS5vcikodGhpcy5pbnZhbGlkJGRhdGEoKSwgY29uZGl0aW9uKX0pYCk7XG4gICAgfVxuICAgIGVycm9yKGFwcGVuZCwgZXJyb3JQYXJhbXMsIGVycm9yUGF0aHMpIHtcbiAgICAgICAgaWYgKGVycm9yUGFyYW1zKSB7XG4gICAgICAgICAgICB0aGlzLnNldFBhcmFtcyhlcnJvclBhcmFtcyk7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihhcHBlbmQsIGVycm9yUGF0aHMpO1xuICAgICAgICAgICAgdGhpcy5zZXRQYXJhbXMoe30pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Vycm9yKGFwcGVuZCwgZXJyb3JQYXRocyk7XG4gICAgfVxuICAgIF9lcnJvcihhcHBlbmQsIGVycm9yUGF0aHMpIHtcbiAgICAgICAgO1xuICAgICAgICAoYXBwZW5kID8gZXJyb3JzXzEucmVwb3J0RXh0cmFFcnJvciA6IGVycm9yc18xLnJlcG9ydEVycm9yKSh0aGlzLCB0aGlzLmRlZi5lcnJvciwgZXJyb3JQYXRocyk7XG4gICAgfVxuICAgICRkYXRhRXJyb3IoKSB7XG4gICAgICAgICgwLCBlcnJvcnNfMS5yZXBvcnRFcnJvcikodGhpcywgdGhpcy5kZWYuJGRhdGFFcnJvciB8fCBlcnJvcnNfMS5rZXl3b3JkJERhdGFFcnJvcik7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICBpZiAodGhpcy5lcnJzQ291bnQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYWRkIFwidHJhY2tFcnJvcnNcIiB0byBrZXl3b3JkIGRlZmluaXRpb24nKTtcbiAgICAgICAgKDAsIGVycm9yc18xLnJlc2V0RXJyb3JzQ291bnQpKHRoaXMuZ2VuLCB0aGlzLmVycnNDb3VudCk7XG4gICAgfVxuICAgIG9rKGNvbmQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFsbEVycm9ycylcbiAgICAgICAgICAgIHRoaXMuZ2VuLmlmKGNvbmQpO1xuICAgIH1cbiAgICBzZXRQYXJhbXMob2JqLCBhc3NpZ24pIHtcbiAgICAgICAgaWYgKGFzc2lnbilcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5wYXJhbXMsIG9iaik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMucGFyYW1zID0gb2JqO1xuICAgIH1cbiAgICBibG9jayRkYXRhKHZhbGlkLCBjb2RlQmxvY2ssICRkYXRhVmFsaWQgPSBjb2RlZ2VuXzEubmlsKSB7XG4gICAgICAgIHRoaXMuZ2VuLmJsb2NrKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2skZGF0YSh2YWxpZCwgJGRhdGFWYWxpZCk7XG4gICAgICAgICAgICBjb2RlQmxvY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNoZWNrJGRhdGEodmFsaWQgPSBjb2RlZ2VuXzEubmlsLCAkZGF0YVZhbGlkID0gY29kZWdlbl8xLm5pbCkge1xuICAgICAgICBpZiAoIXRoaXMuJGRhdGEpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWFDb2RlLCBzY2hlbWFUeXBlLCBkZWYgfSA9IHRoaXM7XG4gICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLm9yKSgoMCwgY29kZWdlbl8xLl8pIGAke3NjaGVtYUNvZGV9ID09PSB1bmRlZmluZWRgLCAkZGF0YVZhbGlkKSk7XG4gICAgICAgIGlmICh2YWxpZCAhPT0gY29kZWdlbl8xLm5pbClcbiAgICAgICAgICAgIGdlbi5hc3NpZ24odmFsaWQsIHRydWUpO1xuICAgICAgICBpZiAoc2NoZW1hVHlwZS5sZW5ndGggfHwgZGVmLnZhbGlkYXRlU2NoZW1hKSB7XG4gICAgICAgICAgICBnZW4uZWxzZUlmKHRoaXMuaW52YWxpZCRkYXRhKCkpO1xuICAgICAgICAgICAgdGhpcy4kZGF0YUVycm9yKCk7XG4gICAgICAgICAgICBpZiAodmFsaWQgIT09IGNvZGVnZW5fMS5uaWwpXG4gICAgICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGdlbi5lbHNlKCk7XG4gICAgfVxuICAgIGludmFsaWQkZGF0YSgpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIHNjaGVtYUNvZGUsIHNjaGVtYVR5cGUsIGRlZiwgaXQgfSA9IHRoaXM7XG4gICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLm9yKSh3cm9uZyREYXRhVHlwZSgpLCBpbnZhbGlkJERhdGFTY2hlbWEoKSk7XG4gICAgICAgIGZ1bmN0aW9uIHdyb25nJERhdGFUeXBlKCkge1xuICAgICAgICAgICAgaWYgKHNjaGVtYVR5cGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICAgICAgaWYgKCEoc2NoZW1hQ29kZSBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWp2IGltcGxlbWVudGF0aW9uIGVycm9yXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0ID0gQXJyYXkuaXNBcnJheShzY2hlbWFUeXBlKSA/IHNjaGVtYVR5cGUgOiBbc2NoZW1hVHlwZV07XG4gICAgICAgICAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYCR7KDAsIGRhdGFUeXBlXzIuY2hlY2tEYXRhVHlwZXMpKHN0LCBzY2hlbWFDb2RlLCBpdC5vcHRzLnN0cmljdE51bWJlcnMsIGRhdGFUeXBlXzIuRGF0YVR5cGUuV3JvbmcpfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29kZWdlbl8xLm5pbDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBpbnZhbGlkJERhdGFTY2hlbWEoKSB7XG4gICAgICAgICAgICBpZiAoZGVmLnZhbGlkYXRlU2NoZW1hKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGVTY2hlbWFSZWYgPSBnZW4uc2NvcGVWYWx1ZShcInZhbGlkYXRlJGRhdGFcIiwgeyByZWY6IGRlZi52YWxpZGF0ZVNjaGVtYSB9KTsgLy8gVE9ETyB2YWx1ZS5jb2RlIGZvciBzdGFuZGFsb25lXG4gICAgICAgICAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYCEke3ZhbGlkYXRlU2NoZW1hUmVmfSgke3NjaGVtYUNvZGV9KWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29kZWdlbl8xLm5pbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdWJzY2hlbWEoYXBwbCwgdmFsaWQpIHtcbiAgICAgICAgY29uc3Qgc3Vic2NoZW1hID0gKDAsIHN1YnNjaGVtYV8xLmdldFN1YnNjaGVtYSkodGhpcy5pdCwgYXBwbCk7XG4gICAgICAgICgwLCBzdWJzY2hlbWFfMS5leHRlbmRTdWJzY2hlbWFEYXRhKShzdWJzY2hlbWEsIHRoaXMuaXQsIGFwcGwpO1xuICAgICAgICAoMCwgc3Vic2NoZW1hXzEuZXh0ZW5kU3Vic2NoZW1hTW9kZSkoc3Vic2NoZW1hLCBhcHBsKTtcbiAgICAgICAgY29uc3QgbmV4dENvbnRleHQgPSB7IC4uLnRoaXMuaXQsIC4uLnN1YnNjaGVtYSwgaXRlbXM6IHVuZGVmaW5lZCwgcHJvcHM6IHVuZGVmaW5lZCB9O1xuICAgICAgICBzdWJzY2hlbWFDb2RlKG5leHRDb250ZXh0LCB2YWxpZCk7XG4gICAgICAgIHJldHVybiBuZXh0Q29udGV4dDtcbiAgICB9XG4gICAgbWVyZ2VFdmFsdWF0ZWQoc2NoZW1hQ3h0LCB0b05hbWUpIHtcbiAgICAgICAgY29uc3QgeyBpdCwgZ2VuIH0gPSB0aGlzO1xuICAgICAgICBpZiAoIWl0Lm9wdHMudW5ldmFsdWF0ZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChpdC5wcm9wcyAhPT0gdHJ1ZSAmJiBzY2hlbWFDeHQucHJvcHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaXQucHJvcHMgPSB1dGlsXzEubWVyZ2VFdmFsdWF0ZWQucHJvcHMoZ2VuLCBzY2hlbWFDeHQucHJvcHMsIGl0LnByb3BzLCB0b05hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdC5pdGVtcyAhPT0gdHJ1ZSAmJiBzY2hlbWFDeHQuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaXQuaXRlbXMgPSB1dGlsXzEubWVyZ2VFdmFsdWF0ZWQuaXRlbXMoZ2VuLCBzY2hlbWFDeHQuaXRlbXMsIGl0Lml0ZW1zLCB0b05hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1lcmdlVmFsaWRFdmFsdWF0ZWQoc2NoZW1hQ3h0LCB2YWxpZCkge1xuICAgICAgICBjb25zdCB7IGl0LCBnZW4gfSA9IHRoaXM7XG4gICAgICAgIGlmIChpdC5vcHRzLnVuZXZhbHVhdGVkICYmIChpdC5wcm9wcyAhPT0gdHJ1ZSB8fCBpdC5pdGVtcyAhPT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgIGdlbi5pZih2YWxpZCwgKCkgPT4gdGhpcy5tZXJnZUV2YWx1YXRlZChzY2hlbWFDeHQsIGNvZGVnZW5fMS5OYW1lKSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuS2V5d29yZEN4dCA9IEtleXdvcmRDeHQ7XG5mdW5jdGlvbiBrZXl3b3JkQ29kZShpdCwga2V5d29yZCwgZGVmLCBydWxlVHlwZSkge1xuICAgIGNvbnN0IGN4dCA9IG5ldyBLZXl3b3JkQ3h0KGl0LCBkZWYsIGtleXdvcmQpO1xuICAgIGlmIChcImNvZGVcIiBpbiBkZWYpIHtcbiAgICAgICAgZGVmLmNvZGUoY3h0LCBydWxlVHlwZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGN4dC4kZGF0YSAmJiBkZWYudmFsaWRhdGUpIHtcbiAgICAgICAgKDAsIGtleXdvcmRfMS5mdW5jS2V5d29yZENvZGUpKGN4dCwgZGVmKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoXCJtYWNyb1wiIGluIGRlZikge1xuICAgICAgICAoMCwga2V5d29yZF8xLm1hY3JvS2V5d29yZENvZGUpKGN4dCwgZGVmKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGVmLmNvbXBpbGUgfHwgZGVmLnZhbGlkYXRlKSB7XG4gICAgICAgICgwLCBrZXl3b3JkXzEuZnVuY0tleXdvcmRDb2RlKShjeHQsIGRlZik7XG4gICAgfVxufVxuY29uc3QgSlNPTl9QT0lOVEVSID0gL15cXC8oPzpbXn5dfH4wfH4xKSokLztcbmNvbnN0IFJFTEFUSVZFX0pTT05fUE9JTlRFUiA9IC9eKFswLTldKykoI3xcXC8oPzpbXn5dfH4wfH4xKSopPyQvO1xuZnVuY3Rpb24gZ2V0RGF0YSgkZGF0YSwgeyBkYXRhTGV2ZWwsIGRhdGFOYW1lcywgZGF0YVBhdGhBcnIgfSkge1xuICAgIGxldCBqc29uUG9pbnRlcjtcbiAgICBsZXQgZGF0YTtcbiAgICBpZiAoJGRhdGEgPT09IFwiXCIpXG4gICAgICAgIHJldHVybiBuYW1lc18xLmRlZmF1bHQucm9vdERhdGE7XG4gICAgaWYgKCRkYXRhWzBdID09PSBcIi9cIikge1xuICAgICAgICBpZiAoIUpTT05fUE9JTlRFUi50ZXN0KCRkYXRhKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBKU09OLXBvaW50ZXI6ICR7JGRhdGF9YCk7XG4gICAgICAgIGpzb25Qb2ludGVyID0gJGRhdGE7XG4gICAgICAgIGRhdGEgPSBuYW1lc18xLmRlZmF1bHQucm9vdERhdGE7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gUkVMQVRJVkVfSlNPTl9QT0lOVEVSLmV4ZWMoJGRhdGEpO1xuICAgICAgICBpZiAoIW1hdGNoZXMpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgSlNPTi1wb2ludGVyOiAkeyRkYXRhfWApO1xuICAgICAgICBjb25zdCB1cCA9ICttYXRjaGVzWzFdO1xuICAgICAgICBqc29uUG9pbnRlciA9IG1hdGNoZXNbMl07XG4gICAgICAgIGlmIChqc29uUG9pbnRlciA9PT0gXCIjXCIpIHtcbiAgICAgICAgICAgIGlmICh1cCA+PSBkYXRhTGV2ZWwpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTXNnKFwicHJvcGVydHkvaW5kZXhcIiwgdXApKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhUGF0aEFycltkYXRhTGV2ZWwgLSB1cF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwID4gZGF0YUxldmVsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTXNnKFwiZGF0YVwiLCB1cCkpO1xuICAgICAgICBkYXRhID0gZGF0YU5hbWVzW2RhdGFMZXZlbCAtIHVwXTtcbiAgICAgICAgaWYgKCFqc29uUG9pbnRlcilcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBsZXQgZXhwciA9IGRhdGE7XG4gICAgY29uc3Qgc2VnbWVudHMgPSBqc29uUG9pbnRlci5zcGxpdChcIi9cIik7XG4gICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHNlZ21lbnRzKSB7XG4gICAgICAgIGlmIChzZWdtZW50KSB7XG4gICAgICAgICAgICBkYXRhID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfSR7KDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkoKDAsIHV0aWxfMS51bmVzY2FwZUpzb25Qb2ludGVyKShzZWdtZW50KSl9YDtcbiAgICAgICAgICAgIGV4cHIgPSAoMCwgY29kZWdlbl8xLl8pIGAke2V4cHJ9ICYmICR7ZGF0YX1gO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBleHByO1xuICAgIGZ1bmN0aW9uIGVycm9yTXNnKHBvaW50ZXJUeXBlLCB1cCkge1xuICAgICAgICByZXR1cm4gYENhbm5vdCBhY2Nlc3MgJHtwb2ludGVyVHlwZX0gJHt1cH0gbGV2ZWxzIHVwLCBjdXJyZW50IGxldmVsIGlzICR7ZGF0YUxldmVsfWA7XG4gICAgfVxufVxuZXhwb3J0cy5nZXREYXRhID0gZ2V0RGF0YTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy52YWxpZGF0ZUtleXdvcmRVc2FnZSA9IGV4cG9ydHMudmFsaWRTY2hlbWFUeXBlID0gZXhwb3J0cy5mdW5jS2V5d29yZENvZGUgPSBleHBvcnRzLm1hY3JvS2V5d29yZENvZGUgPSB2b2lkIDA7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vY29kZWdlblwiKTtcbmNvbnN0IG5hbWVzXzEgPSByZXF1aXJlKFwiLi4vbmFtZXNcIik7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi4vLi4vdm9jYWJ1bGFyaWVzL2NvZGVcIik7XG5jb25zdCBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuLi9lcnJvcnNcIik7XG5mdW5jdGlvbiBtYWNyb0tleXdvcmRDb2RlKGN4dCwgZGVmKSB7XG4gICAgY29uc3QgeyBnZW4sIGtleXdvcmQsIHNjaGVtYSwgcGFyZW50U2NoZW1hLCBpdCB9ID0gY3h0O1xuICAgIGNvbnN0IG1hY3JvU2NoZW1hID0gZGVmLm1hY3JvLmNhbGwoaXQuc2VsZiwgc2NoZW1hLCBwYXJlbnRTY2hlbWEsIGl0KTtcbiAgICBjb25zdCBzY2hlbWFSZWYgPSB1c2VLZXl3b3JkKGdlbiwga2V5d29yZCwgbWFjcm9TY2hlbWEpO1xuICAgIGlmIChpdC5vcHRzLnZhbGlkYXRlU2NoZW1hICE9PSBmYWxzZSlcbiAgICAgICAgaXQuc2VsZi52YWxpZGF0ZVNjaGVtYShtYWNyb1NjaGVtYSwgdHJ1ZSk7XG4gICAgY29uc3QgdmFsaWQgPSBnZW4ubmFtZShcInZhbGlkXCIpO1xuICAgIGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICBzY2hlbWE6IG1hY3JvU2NoZW1hLFxuICAgICAgICBzY2hlbWFQYXRoOiBjb2RlZ2VuXzEubmlsLFxuICAgICAgICBlcnJTY2hlbWFQYXRoOiBgJHtpdC5lcnJTY2hlbWFQYXRofS8ke2tleXdvcmR9YCxcbiAgICAgICAgdG9wU2NoZW1hUmVmOiBzY2hlbWFSZWYsXG4gICAgICAgIGNvbXBvc2l0ZVJ1bGU6IHRydWUsXG4gICAgfSwgdmFsaWQpO1xuICAgIGN4dC5wYXNzKHZhbGlkLCAoKSA9PiBjeHQuZXJyb3IodHJ1ZSkpO1xufVxuZXhwb3J0cy5tYWNyb0tleXdvcmRDb2RlID0gbWFjcm9LZXl3b3JkQ29kZTtcbmZ1bmN0aW9uIGZ1bmNLZXl3b3JkQ29kZShjeHQsIGRlZikge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCB7IGdlbiwga2V5d29yZCwgc2NoZW1hLCBwYXJlbnRTY2hlbWEsICRkYXRhLCBpdCB9ID0gY3h0O1xuICAgIGNoZWNrQXN5bmNLZXl3b3JkKGl0LCBkZWYpO1xuICAgIGNvbnN0IHZhbGlkYXRlID0gISRkYXRhICYmIGRlZi5jb21waWxlID8gZGVmLmNvbXBpbGUuY2FsbChpdC5zZWxmLCBzY2hlbWEsIHBhcmVudFNjaGVtYSwgaXQpIDogZGVmLnZhbGlkYXRlO1xuICAgIGNvbnN0IHZhbGlkYXRlUmVmID0gdXNlS2V5d29yZChnZW4sIGtleXdvcmQsIHZhbGlkYXRlKTtcbiAgICBjb25zdCB2YWxpZCA9IGdlbi5sZXQoXCJ2YWxpZFwiKTtcbiAgICBjeHQuYmxvY2skZGF0YSh2YWxpZCwgdmFsaWRhdGVLZXl3b3JkKTtcbiAgICBjeHQub2soKF9hID0gZGVmLnZhbGlkKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB2YWxpZCk7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGVLZXl3b3JkKCkge1xuICAgICAgICBpZiAoZGVmLmVycm9ycyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGFzc2lnblZhbGlkKCk7XG4gICAgICAgICAgICBpZiAoZGVmLm1vZGlmeWluZylcbiAgICAgICAgICAgICAgICBtb2RpZnlEYXRhKGN4dCk7XG4gICAgICAgICAgICByZXBvcnRFcnJzKCgpID0+IGN4dC5lcnJvcigpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHJ1bGVFcnJzID0gZGVmLmFzeW5jID8gdmFsaWRhdGVBc3luYygpIDogdmFsaWRhdGVTeW5jKCk7XG4gICAgICAgICAgICBpZiAoZGVmLm1vZGlmeWluZylcbiAgICAgICAgICAgICAgICBtb2RpZnlEYXRhKGN4dCk7XG4gICAgICAgICAgICByZXBvcnRFcnJzKCgpID0+IGFkZEVycnMoY3h0LCBydWxlRXJycykpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlQXN5bmMoKSB7XG4gICAgICAgIGNvbnN0IHJ1bGVFcnJzID0gZ2VuLmxldChcInJ1bGVFcnJzXCIsIG51bGwpO1xuICAgICAgICBnZW4udHJ5KCgpID0+IGFzc2lnblZhbGlkKCgwLCBjb2RlZ2VuXzEuXykgYGF3YWl0IGApLCAoZSkgPT4gZ2VuLmFzc2lnbih2YWxpZCwgZmFsc2UpLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZX0gaW5zdGFuY2VvZiAke2l0LlZhbGlkYXRpb25FcnJvcn1gLCAoKSA9PiBnZW4uYXNzaWduKHJ1bGVFcnJzLCAoMCwgY29kZWdlbl8xLl8pIGAke2V9LmVycm9yc2ApLCAoKSA9PiBnZW4udGhyb3coZSkpKTtcbiAgICAgICAgcmV0dXJuIHJ1bGVFcnJzO1xuICAgIH1cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZVN5bmMoKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRlRXJycyA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7dmFsaWRhdGVSZWZ9LmVycm9yc2A7XG4gICAgICAgIGdlbi5hc3NpZ24odmFsaWRhdGVFcnJzLCBudWxsKTtcbiAgICAgICAgYXNzaWduVmFsaWQoY29kZWdlbl8xLm5pbCk7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZUVycnM7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFzc2lnblZhbGlkKF9hd2FpdCA9IGRlZi5hc3luYyA/ICgwLCBjb2RlZ2VuXzEuXykgYGF3YWl0IGAgOiBjb2RlZ2VuXzEubmlsKSB7XG4gICAgICAgIGNvbnN0IHBhc3NDeHQgPSBpdC5vcHRzLnBhc3NDb250ZXh0ID8gbmFtZXNfMS5kZWZhdWx0LnRoaXMgOiBuYW1lc18xLmRlZmF1bHQuc2VsZjtcbiAgICAgICAgY29uc3QgcGFzc1NjaGVtYSA9ICEoKFwiY29tcGlsZVwiIGluIGRlZiAmJiAhJGRhdGEpIHx8IGRlZi5zY2hlbWEgPT09IGZhbHNlKTtcbiAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgKDAsIGNvZGVnZW5fMS5fKSBgJHtfYXdhaXR9JHsoMCwgY29kZV8xLmNhbGxWYWxpZGF0ZUNvZGUpKGN4dCwgdmFsaWRhdGVSZWYsIHBhc3NDeHQsIHBhc3NTY2hlbWEpfWAsIGRlZi5tb2RpZnlpbmcpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXBvcnRFcnJzKGVycm9ycykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLm5vdCkoKF9hID0gZGVmLnZhbGlkKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB2YWxpZCksIGVycm9ycyk7XG4gICAgfVxufVxuZXhwb3J0cy5mdW5jS2V5d29yZENvZGUgPSBmdW5jS2V5d29yZENvZGU7XG5mdW5jdGlvbiBtb2RpZnlEYXRhKGN4dCkge1xuICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCBpdCB9ID0gY3h0O1xuICAgIGdlbi5pZihpdC5wYXJlbnREYXRhLCAoKSA9PiBnZW4uYXNzaWduKGRhdGEsICgwLCBjb2RlZ2VuXzEuXykgYCR7aXQucGFyZW50RGF0YX1bJHtpdC5wYXJlbnREYXRhUHJvcGVydHl9XWApKTtcbn1cbmZ1bmN0aW9uIGFkZEVycnMoY3h0LCBlcnJzKSB7XG4gICAgY29uc3QgeyBnZW4gfSA9IGN4dDtcbiAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgQXJyYXkuaXNBcnJheSgke2VycnN9KWAsICgpID0+IHtcbiAgICAgICAgZ2VuXG4gICAgICAgICAgICAuYXNzaWduKG5hbWVzXzEuZGVmYXVsdC52RXJyb3JzLCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfSA9PT0gbnVsbCA/ICR7ZXJyc30gOiAke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfS5jb25jYXQoJHtlcnJzfSlgKVxuICAgICAgICAgICAgLmFzc2lnbihuYW1lc18xLmRlZmF1bHQuZXJyb3JzLCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfS5sZW5ndGhgKTtcbiAgICAgICAgKDAsIGVycm9yc18xLmV4dGVuZEVycm9ycykoY3h0KTtcbiAgICB9LCAoKSA9PiBjeHQuZXJyb3IoKSk7XG59XG5mdW5jdGlvbiBjaGVja0FzeW5jS2V5d29yZCh7IHNjaGVtYUVudiB9LCBkZWYpIHtcbiAgICBpZiAoZGVmLmFzeW5jICYmICFzY2hlbWFFbnYuJGFzeW5jKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhc3luYyBrZXl3b3JkIGluIHN5bmMgc2NoZW1hXCIpO1xufVxuZnVuY3Rpb24gdXNlS2V5d29yZChnZW4sIGtleXdvcmQsIHJlc3VsdCkge1xuICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBrZXl3b3JkIFwiJHtrZXl3b3JkfVwiIGZhaWxlZCB0byBjb21waWxlYCk7XG4gICAgcmV0dXJuIGdlbi5zY29wZVZhbHVlKFwia2V5d29yZFwiLCB0eXBlb2YgcmVzdWx0ID09IFwiZnVuY3Rpb25cIiA/IHsgcmVmOiByZXN1bHQgfSA6IHsgcmVmOiByZXN1bHQsIGNvZGU6ICgwLCBjb2RlZ2VuXzEuc3RyaW5naWZ5KShyZXN1bHQpIH0pO1xufVxuZnVuY3Rpb24gdmFsaWRTY2hlbWFUeXBlKHNjaGVtYSwgc2NoZW1hVHlwZSwgYWxsb3dVbmRlZmluZWQgPSBmYWxzZSkge1xuICAgIC8vIFRPRE8gYWRkIHRlc3RzXG4gICAgcmV0dXJuICghc2NoZW1hVHlwZS5sZW5ndGggfHxcbiAgICAgICAgc2NoZW1hVHlwZS5zb21lKChzdCkgPT4gc3QgPT09IFwiYXJyYXlcIlxuICAgICAgICAgICAgPyBBcnJheS5pc0FycmF5KHNjaGVtYSlcbiAgICAgICAgICAgIDogc3QgPT09IFwib2JqZWN0XCJcbiAgICAgICAgICAgICAgICA/IHNjaGVtYSAmJiB0eXBlb2Ygc2NoZW1hID09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkoc2NoZW1hKVxuICAgICAgICAgICAgICAgIDogdHlwZW9mIHNjaGVtYSA9PSBzdCB8fCAoYWxsb3dVbmRlZmluZWQgJiYgdHlwZW9mIHNjaGVtYSA9PSBcInVuZGVmaW5lZFwiKSkpO1xufVxuZXhwb3J0cy52YWxpZFNjaGVtYVR5cGUgPSB2YWxpZFNjaGVtYVR5cGU7XG5mdW5jdGlvbiB2YWxpZGF0ZUtleXdvcmRVc2FnZSh7IHNjaGVtYSwgb3B0cywgc2VsZiwgZXJyU2NoZW1hUGF0aCB9LCBkZWYsIGtleXdvcmQpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoQXJyYXkuaXNBcnJheShkZWYua2V5d29yZCkgPyAhZGVmLmtleXdvcmQuaW5jbHVkZXMoa2V5d29yZCkgOiBkZWYua2V5d29yZCAhPT0ga2V5d29yZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhanYgaW1wbGVtZW50YXRpb24gZXJyb3JcIik7XG4gICAgfVxuICAgIGNvbnN0IGRlcHMgPSBkZWYuZGVwZW5kZW5jaWVzO1xuICAgIGlmIChkZXBzID09PSBudWxsIHx8IGRlcHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlcHMuc29tZSgoa3dkKSA9PiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNjaGVtYSwga3dkKSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBwYXJlbnQgc2NoZW1hIG11c3QgaGF2ZSBkZXBlbmRlbmNpZXMgb2YgJHtrZXl3b3JkfTogJHtkZXBzLmpvaW4oXCIsXCIpfWApO1xuICAgIH1cbiAgICBpZiAoZGVmLnZhbGlkYXRlU2NoZW1hKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZGVmLnZhbGlkYXRlU2NoZW1hKHNjaGVtYVtrZXl3b3JkXSk7XG4gICAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IGBrZXl3b3JkIFwiJHtrZXl3b3JkfVwiIHZhbHVlIGlzIGludmFsaWQgYXQgcGF0aCBcIiR7ZXJyU2NoZW1hUGF0aH1cIjogYCArXG4gICAgICAgICAgICAgICAgc2VsZi5lcnJvcnNUZXh0KGRlZi52YWxpZGF0ZVNjaGVtYS5lcnJvcnMpO1xuICAgICAgICAgICAgaWYgKG9wdHMudmFsaWRhdGVTY2hlbWEgPT09IFwibG9nXCIpXG4gICAgICAgICAgICAgICAgc2VsZi5sb2dnZXIuZXJyb3IobXNnKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMudmFsaWRhdGVLZXl3b3JkVXNhZ2UgPSB2YWxpZGF0ZUtleXdvcmRVc2FnZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWtleXdvcmQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmV4dGVuZFN1YnNjaGVtYU1vZGUgPSBleHBvcnRzLmV4dGVuZFN1YnNjaGVtYURhdGEgPSBleHBvcnRzLmdldFN1YnNjaGVtYSA9IHZvaWQgMDtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG5mdW5jdGlvbiBnZXRTdWJzY2hlbWEoaXQsIHsga2V5d29yZCwgc2NoZW1hUHJvcCwgc2NoZW1hLCBzY2hlbWFQYXRoLCBlcnJTY2hlbWFQYXRoLCB0b3BTY2hlbWFSZWYgfSkge1xuICAgIGlmIChrZXl3b3JkICE9PSB1bmRlZmluZWQgJiYgc2NoZW1hICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdib3RoIFwia2V5d29yZFwiIGFuZCBcInNjaGVtYVwiIHBhc3NlZCwgb25seSBvbmUgYWxsb3dlZCcpO1xuICAgIH1cbiAgICBpZiAoa2V5d29yZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IHNjaCA9IGl0LnNjaGVtYVtrZXl3b3JkXTtcbiAgICAgICAgcmV0dXJuIHNjaGVtYVByb3AgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgc2NoZW1hOiBzY2gsXG4gICAgICAgICAgICAgICAgc2NoZW1hUGF0aDogKDAsIGNvZGVnZW5fMS5fKSBgJHtpdC5zY2hlbWFQYXRofSR7KDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkoa2V5d29yZCl9YCxcbiAgICAgICAgICAgICAgICBlcnJTY2hlbWFQYXRoOiBgJHtpdC5lcnJTY2hlbWFQYXRofS8ke2tleXdvcmR9YCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgIHNjaGVtYTogc2NoW3NjaGVtYVByb3BdLFxuICAgICAgICAgICAgICAgIHNjaGVtYVBhdGg6ICgwLCBjb2RlZ2VuXzEuXykgYCR7aXQuc2NoZW1hUGF0aH0keygwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKGtleXdvcmQpfSR7KDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkoc2NoZW1hUHJvcCl9YCxcbiAgICAgICAgICAgICAgICBlcnJTY2hlbWFQYXRoOiBgJHtpdC5lcnJTY2hlbWFQYXRofS8ke2tleXdvcmR9LyR7KDAsIHV0aWxfMS5lc2NhcGVGcmFnbWVudCkoc2NoZW1hUHJvcCl9YCxcbiAgICAgICAgICAgIH07XG4gICAgfVxuICAgIGlmIChzY2hlbWEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoc2NoZW1hUGF0aCA9PT0gdW5kZWZpbmVkIHx8IGVyclNjaGVtYVBhdGggPT09IHVuZGVmaW5lZCB8fCB0b3BTY2hlbWFSZWYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdcInNjaGVtYVBhdGhcIiwgXCJlcnJTY2hlbWFQYXRoXCIgYW5kIFwidG9wU2NoZW1hUmVmXCIgYXJlIHJlcXVpcmVkIHdpdGggXCJzY2hlbWFcIicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY2hlbWEsXG4gICAgICAgICAgICBzY2hlbWFQYXRoLFxuICAgICAgICAgICAgdG9wU2NoZW1hUmVmLFxuICAgICAgICAgICAgZXJyU2NoZW1hUGF0aCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdlaXRoZXIgXCJrZXl3b3JkXCIgb3IgXCJzY2hlbWFcIiBtdXN0IGJlIHBhc3NlZCcpO1xufVxuZXhwb3J0cy5nZXRTdWJzY2hlbWEgPSBnZXRTdWJzY2hlbWE7XG5mdW5jdGlvbiBleHRlbmRTdWJzY2hlbWFEYXRhKHN1YnNjaGVtYSwgaXQsIHsgZGF0YVByb3AsIGRhdGFQcm9wVHlwZTogZHBUeXBlLCBkYXRhLCBkYXRhVHlwZXMsIHByb3BlcnR5TmFtZSB9KSB7XG4gICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCAmJiBkYXRhUHJvcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYm90aCBcImRhdGFcIiBhbmQgXCJkYXRhUHJvcFwiIHBhc3NlZCwgb25seSBvbmUgYWxsb3dlZCcpO1xuICAgIH1cbiAgICBjb25zdCB7IGdlbiB9ID0gaXQ7XG4gICAgaWYgKGRhdGFQcm9wICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgeyBlcnJvclBhdGgsIGRhdGFQYXRoQXJyLCBvcHRzIH0gPSBpdDtcbiAgICAgICAgY29uc3QgbmV4dERhdGEgPSBnZW4ubGV0KFwiZGF0YVwiLCAoMCwgY29kZWdlbl8xLl8pIGAke2l0LmRhdGF9JHsoMCwgY29kZWdlbl8xLmdldFByb3BlcnR5KShkYXRhUHJvcCl9YCwgdHJ1ZSk7XG4gICAgICAgIGRhdGFDb250ZXh0UHJvcHMobmV4dERhdGEpO1xuICAgICAgICBzdWJzY2hlbWEuZXJyb3JQYXRoID0gKDAsIGNvZGVnZW5fMS5zdHIpIGAke2Vycm9yUGF0aH0keygwLCB1dGlsXzEuZ2V0RXJyb3JQYXRoKShkYXRhUHJvcCwgZHBUeXBlLCBvcHRzLmpzUHJvcGVydHlTeW50YXgpfWA7XG4gICAgICAgIHN1YnNjaGVtYS5wYXJlbnREYXRhUHJvcGVydHkgPSAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGFQcm9wfWA7XG4gICAgICAgIHN1YnNjaGVtYS5kYXRhUGF0aEFyciA9IFsuLi5kYXRhUGF0aEFyciwgc3Vic2NoZW1hLnBhcmVudERhdGFQcm9wZXJ0eV07XG4gICAgfVxuICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgbmV4dERhdGEgPSBkYXRhIGluc3RhbmNlb2YgY29kZWdlbl8xLk5hbWUgPyBkYXRhIDogZ2VuLmxldChcImRhdGFcIiwgZGF0YSwgdHJ1ZSk7IC8vIHJlcGxhY2VhYmxlIGlmIHVzZWQgb25jZT9cbiAgICAgICAgZGF0YUNvbnRleHRQcm9wcyhuZXh0RGF0YSk7XG4gICAgICAgIGlmIChwcm9wZXJ0eU5hbWUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHN1YnNjaGVtYS5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XG4gICAgICAgIC8vIFRPRE8gc29tZXRoaW5nIGlzIHBvc3NpYmx5IHdyb25nIGhlcmUgd2l0aCBub3QgY2hhbmdpbmcgcGFyZW50RGF0YVByb3BlcnR5IGFuZCBub3QgYXBwZW5kaW5nIGRhdGFQYXRoQXJyXG4gICAgfVxuICAgIGlmIChkYXRhVHlwZXMpXG4gICAgICAgIHN1YnNjaGVtYS5kYXRhVHlwZXMgPSBkYXRhVHlwZXM7XG4gICAgZnVuY3Rpb24gZGF0YUNvbnRleHRQcm9wcyhfbmV4dERhdGEpIHtcbiAgICAgICAgc3Vic2NoZW1hLmRhdGEgPSBfbmV4dERhdGE7XG4gICAgICAgIHN1YnNjaGVtYS5kYXRhTGV2ZWwgPSBpdC5kYXRhTGV2ZWwgKyAxO1xuICAgICAgICBzdWJzY2hlbWEuZGF0YVR5cGVzID0gW107XG4gICAgICAgIGl0LmRlZmluZWRQcm9wZXJ0aWVzID0gbmV3IFNldCgpO1xuICAgICAgICBzdWJzY2hlbWEucGFyZW50RGF0YSA9IGl0LmRhdGE7XG4gICAgICAgIHN1YnNjaGVtYS5kYXRhTmFtZXMgPSBbLi4uaXQuZGF0YU5hbWVzLCBfbmV4dERhdGFdO1xuICAgIH1cbn1cbmV4cG9ydHMuZXh0ZW5kU3Vic2NoZW1hRGF0YSA9IGV4dGVuZFN1YnNjaGVtYURhdGE7XG5mdW5jdGlvbiBleHRlbmRTdWJzY2hlbWFNb2RlKHN1YnNjaGVtYSwgeyBqdGREaXNjcmltaW5hdG9yLCBqdGRNZXRhZGF0YSwgY29tcG9zaXRlUnVsZSwgY3JlYXRlRXJyb3JzLCBhbGxFcnJvcnMgfSkge1xuICAgIGlmIChjb21wb3NpdGVSdWxlICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHN1YnNjaGVtYS5jb21wb3NpdGVSdWxlID0gY29tcG9zaXRlUnVsZTtcbiAgICBpZiAoY3JlYXRlRXJyb3JzICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHN1YnNjaGVtYS5jcmVhdGVFcnJvcnMgPSBjcmVhdGVFcnJvcnM7XG4gICAgaWYgKGFsbEVycm9ycyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBzdWJzY2hlbWEuYWxsRXJyb3JzID0gYWxsRXJyb3JzO1xuICAgIHN1YnNjaGVtYS5qdGREaXNjcmltaW5hdG9yID0ganRkRGlzY3JpbWluYXRvcjsgLy8gbm90IGluaGVyaXRlZFxuICAgIHN1YnNjaGVtYS5qdGRNZXRhZGF0YSA9IGp0ZE1ldGFkYXRhOyAvLyBub3QgaW5oZXJpdGVkXG59XG5leHBvcnRzLmV4dGVuZFN1YnNjaGVtYU1vZGUgPSBleHRlbmRTdWJzY2hlbWFNb2RlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3Vic2NoZW1hLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Db2RlR2VuID0gZXhwb3J0cy5OYW1lID0gZXhwb3J0cy5uaWwgPSBleHBvcnRzLnN0cmluZ2lmeSA9IGV4cG9ydHMuc3RyID0gZXhwb3J0cy5fID0gZXhwb3J0cy5LZXl3b3JkQ3h0ID0gdm9pZCAwO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi9jb21waWxlL3ZhbGlkYXRlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiS2V5d29yZEN4dFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdmFsaWRhdGVfMS5LZXl3b3JkQ3h0OyB9IH0pO1xudmFyIGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuL2NvbXBpbGUvY29kZWdlblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVnZW5fMS5fOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3RyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEuc3RyOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3RyaW5naWZ5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEuc3RyaW5naWZ5OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibmlsXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEubmlsOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTmFtZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLk5hbWU7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJDb2RlR2VuXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEuQ29kZUdlbjsgfSB9KTtcbmNvbnN0IHZhbGlkYXRpb25fZXJyb3JfMSA9IHJlcXVpcmUoXCIuL3J1bnRpbWUvdmFsaWRhdGlvbl9lcnJvclwiKTtcbmNvbnN0IHJlZl9lcnJvcl8xID0gcmVxdWlyZShcIi4vY29tcGlsZS9yZWZfZXJyb3JcIik7XG5jb25zdCBydWxlc18xID0gcmVxdWlyZShcIi4vY29tcGlsZS9ydWxlc1wiKTtcbmNvbnN0IGNvbXBpbGVfMSA9IHJlcXVpcmUoXCIuL2NvbXBpbGVcIik7XG5jb25zdCBjb2RlZ2VuXzIgPSByZXF1aXJlKFwiLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCByZXNvbHZlXzEgPSByZXF1aXJlKFwiLi9jb21waWxlL3Jlc29sdmVcIik7XG5jb25zdCBkYXRhVHlwZV8xID0gcmVxdWlyZShcIi4vY29tcGlsZS92YWxpZGF0ZS9kYXRhVHlwZVwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0ICRkYXRhUmVmU2NoZW1hID0gcmVxdWlyZShcIi4vcmVmcy9kYXRhLmpzb25cIik7XG5jb25zdCB1cmlfMSA9IHJlcXVpcmUoXCIuL3J1bnRpbWUvdXJpXCIpO1xuY29uc3QgZGVmYXVsdFJlZ0V4cCA9IChzdHIsIGZsYWdzKSA9PiBuZXcgUmVnRXhwKHN0ciwgZmxhZ3MpO1xuZGVmYXVsdFJlZ0V4cC5jb2RlID0gXCJuZXcgUmVnRXhwXCI7XG5jb25zdCBNRVRBX0lHTk9SRV9PUFRJT05TID0gW1wicmVtb3ZlQWRkaXRpb25hbFwiLCBcInVzZURlZmF1bHRzXCIsIFwiY29lcmNlVHlwZXNcIl07XG5jb25zdCBFWFRfU0NPUEVfTkFNRVMgPSBuZXcgU2V0KFtcbiAgICBcInZhbGlkYXRlXCIsXG4gICAgXCJzZXJpYWxpemVcIixcbiAgICBcInBhcnNlXCIsXG4gICAgXCJ3cmFwcGVyXCIsXG4gICAgXCJyb290XCIsXG4gICAgXCJzY2hlbWFcIixcbiAgICBcImtleXdvcmRcIixcbiAgICBcInBhdHRlcm5cIixcbiAgICBcImZvcm1hdHNcIixcbiAgICBcInZhbGlkYXRlJGRhdGFcIixcbiAgICBcImZ1bmNcIixcbiAgICBcIm9ialwiLFxuICAgIFwiRXJyb3JcIixcbl0pO1xuY29uc3QgcmVtb3ZlZE9wdGlvbnMgPSB7XG4gICAgZXJyb3JEYXRhUGF0aDogXCJcIixcbiAgICBmb3JtYXQ6IFwiYHZhbGlkYXRlRm9ybWF0czogZmFsc2VgIGNhbiBiZSB1c2VkIGluc3RlYWQuXCIsXG4gICAgbnVsbGFibGU6ICdcIm51bGxhYmxlXCIga2V5d29yZCBpcyBzdXBwb3J0ZWQgYnkgZGVmYXVsdC4nLFxuICAgIGpzb25Qb2ludGVyczogXCJEZXByZWNhdGVkIGpzUHJvcGVydHlTeW50YXggY2FuIGJlIHVzZWQgaW5zdGVhZC5cIixcbiAgICBleHRlbmRSZWZzOiBcIkRlcHJlY2F0ZWQgaWdub3JlS2V5d29yZHNXaXRoUmVmIGNhbiBiZSB1c2VkIGluc3RlYWQuXCIsXG4gICAgbWlzc2luZ1JlZnM6IFwiUGFzcyBlbXB0eSBzY2hlbWEgd2l0aCAkaWQgdGhhdCBzaG91bGQgYmUgaWdub3JlZCB0byBhanYuYWRkU2NoZW1hLlwiLFxuICAgIHByb2Nlc3NDb2RlOiBcIlVzZSBvcHRpb24gYGNvZGU6IHtwcm9jZXNzOiAoY29kZSwgc2NoZW1hRW52OiBvYmplY3QpID0+IHN0cmluZ31gXCIsXG4gICAgc291cmNlQ29kZTogXCJVc2Ugb3B0aW9uIGBjb2RlOiB7c291cmNlOiB0cnVlfWBcIixcbiAgICBzdHJpY3REZWZhdWx0czogXCJJdCBpcyBkZWZhdWx0IG5vdywgc2VlIG9wdGlvbiBgc3RyaWN0YC5cIixcbiAgICBzdHJpY3RLZXl3b3JkczogXCJJdCBpcyBkZWZhdWx0IG5vdywgc2VlIG9wdGlvbiBgc3RyaWN0YC5cIixcbiAgICB1bmlxdWVJdGVtczogJ1widW5pcXVlSXRlbXNcIiBrZXl3b3JkIGlzIGFsd2F5cyB2YWxpZGF0ZWQuJyxcbiAgICB1bmtub3duRm9ybWF0czogXCJEaXNhYmxlIHN0cmljdCBtb2RlIG9yIHBhc3MgYHRydWVgIHRvIGBhanYuYWRkRm9ybWF0YCAob3IgYGZvcm1hdHNgIG9wdGlvbikuXCIsXG4gICAgY2FjaGU6IFwiTWFwIGlzIHVzZWQgYXMgY2FjaGUsIHNjaGVtYSBvYmplY3QgYXMga2V5LlwiLFxuICAgIHNlcmlhbGl6ZTogXCJNYXAgaXMgdXNlZCBhcyBjYWNoZSwgc2NoZW1hIG9iamVjdCBhcyBrZXkuXCIsXG4gICAgYWp2RXJyb3JzOiBcIkl0IGlzIGRlZmF1bHQgbm93LlwiLFxufTtcbmNvbnN0IGRlcHJlY2F0ZWRPcHRpb25zID0ge1xuICAgIGlnbm9yZUtleXdvcmRzV2l0aFJlZjogXCJcIixcbiAgICBqc1Byb3BlcnR5U3ludGF4OiBcIlwiLFxuICAgIHVuaWNvZGU6ICdcIm1pbkxlbmd0aFwiL1wibWF4TGVuZ3RoXCIgYWNjb3VudCBmb3IgdW5pY29kZSBjaGFyYWN0ZXJzIGJ5IGRlZmF1bHQuJyxcbn07XG5jb25zdCBNQVhfRVhQUkVTU0lPTiA9IDIwMDtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG5mdW5jdGlvbiByZXF1aXJlZE9wdGlvbnMobykge1xuICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaywgX2wsIF9tLCBfbywgX3AsIF9xLCBfciwgX3MsIF90LCBfdSwgX3YsIF93LCBfeCwgX3ksIF96LCBfMDtcbiAgICBjb25zdCBzID0gby5zdHJpY3Q7XG4gICAgY29uc3QgX29wdHogPSAoX2EgPSBvLmNvZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5vcHRpbWl6ZTtcbiAgICBjb25zdCBvcHRpbWl6ZSA9IF9vcHR6ID09PSB0cnVlIHx8IF9vcHR6ID09PSB1bmRlZmluZWQgPyAxIDogX29wdHogfHwgMDtcbiAgICBjb25zdCByZWdFeHAgPSAoX2MgPSAoX2IgPSBvLmNvZGUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5yZWdFeHApICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IGRlZmF1bHRSZWdFeHA7XG4gICAgY29uc3QgdXJpUmVzb2x2ZXIgPSAoX2QgPSBvLnVyaVJlc29sdmVyKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiB1cmlfMS5kZWZhdWx0O1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0cmljdFNjaGVtYTogKF9mID0gKF9lID0gby5zdHJpY3RTY2hlbWEpICE9PSBudWxsICYmIF9lICE9PSB2b2lkIDAgPyBfZSA6IHMpICE9PSBudWxsICYmIF9mICE9PSB2b2lkIDAgPyBfZiA6IHRydWUsXG4gICAgICAgIHN0cmljdE51bWJlcnM6IChfaCA9IChfZyA9IG8uc3RyaWN0TnVtYmVycykgIT09IG51bGwgJiYgX2cgIT09IHZvaWQgMCA/IF9nIDogcykgIT09IG51bGwgJiYgX2ggIT09IHZvaWQgMCA/IF9oIDogdHJ1ZSxcbiAgICAgICAgc3RyaWN0VHlwZXM6IChfayA9IChfaiA9IG8uc3RyaWN0VHlwZXMpICE9PSBudWxsICYmIF9qICE9PSB2b2lkIDAgPyBfaiA6IHMpICE9PSBudWxsICYmIF9rICE9PSB2b2lkIDAgPyBfayA6IFwibG9nXCIsXG4gICAgICAgIHN0cmljdFR1cGxlczogKF9tID0gKF9sID0gby5zdHJpY3RUdXBsZXMpICE9PSBudWxsICYmIF9sICE9PSB2b2lkIDAgPyBfbCA6IHMpICE9PSBudWxsICYmIF9tICE9PSB2b2lkIDAgPyBfbSA6IFwibG9nXCIsXG4gICAgICAgIHN0cmljdFJlcXVpcmVkOiAoX3AgPSAoX28gPSBvLnN0cmljdFJlcXVpcmVkKSAhPT0gbnVsbCAmJiBfbyAhPT0gdm9pZCAwID8gX28gOiBzKSAhPT0gbnVsbCAmJiBfcCAhPT0gdm9pZCAwID8gX3AgOiBmYWxzZSxcbiAgICAgICAgY29kZTogby5jb2RlID8geyAuLi5vLmNvZGUsIG9wdGltaXplLCByZWdFeHAgfSA6IHsgb3B0aW1pemUsIHJlZ0V4cCB9LFxuICAgICAgICBsb29wUmVxdWlyZWQ6IChfcSA9IG8ubG9vcFJlcXVpcmVkKSAhPT0gbnVsbCAmJiBfcSAhPT0gdm9pZCAwID8gX3EgOiBNQVhfRVhQUkVTU0lPTixcbiAgICAgICAgbG9vcEVudW06IChfciA9IG8ubG9vcEVudW0pICE9PSBudWxsICYmIF9yICE9PSB2b2lkIDAgPyBfciA6IE1BWF9FWFBSRVNTSU9OLFxuICAgICAgICBtZXRhOiAoX3MgPSBvLm1ldGEpICE9PSBudWxsICYmIF9zICE9PSB2b2lkIDAgPyBfcyA6IHRydWUsXG4gICAgICAgIG1lc3NhZ2VzOiAoX3QgPSBvLm1lc3NhZ2VzKSAhPT0gbnVsbCAmJiBfdCAhPT0gdm9pZCAwID8gX3QgOiB0cnVlLFxuICAgICAgICBpbmxpbmVSZWZzOiAoX3UgPSBvLmlubGluZVJlZnMpICE9PSBudWxsICYmIF91ICE9PSB2b2lkIDAgPyBfdSA6IHRydWUsXG4gICAgICAgIHNjaGVtYUlkOiAoX3YgPSBvLnNjaGVtYUlkKSAhPT0gbnVsbCAmJiBfdiAhPT0gdm9pZCAwID8gX3YgOiBcIiRpZFwiLFxuICAgICAgICBhZGRVc2VkU2NoZW1hOiAoX3cgPSBvLmFkZFVzZWRTY2hlbWEpICE9PSBudWxsICYmIF93ICE9PSB2b2lkIDAgPyBfdyA6IHRydWUsXG4gICAgICAgIHZhbGlkYXRlU2NoZW1hOiAoX3ggPSBvLnZhbGlkYXRlU2NoZW1hKSAhPT0gbnVsbCAmJiBfeCAhPT0gdm9pZCAwID8gX3ggOiB0cnVlLFxuICAgICAgICB2YWxpZGF0ZUZvcm1hdHM6IChfeSA9IG8udmFsaWRhdGVGb3JtYXRzKSAhPT0gbnVsbCAmJiBfeSAhPT0gdm9pZCAwID8gX3kgOiB0cnVlLFxuICAgICAgICB1bmljb2RlUmVnRXhwOiAoX3ogPSBvLnVuaWNvZGVSZWdFeHApICE9PSBudWxsICYmIF96ICE9PSB2b2lkIDAgPyBfeiA6IHRydWUsXG4gICAgICAgIGludDMycmFuZ2U6IChfMCA9IG8uaW50MzJyYW5nZSkgIT09IG51bGwgJiYgXzAgIT09IHZvaWQgMCA/IF8wIDogdHJ1ZSxcbiAgICAgICAgdXJpUmVzb2x2ZXI6IHVyaVJlc29sdmVyLFxuICAgIH07XG59XG5jbGFzcyBBanYge1xuICAgIGNvbnN0cnVjdG9yKG9wdHMgPSB7fSkge1xuICAgICAgICB0aGlzLnNjaGVtYXMgPSB7fTtcbiAgICAgICAgdGhpcy5yZWZzID0ge307XG4gICAgICAgIHRoaXMuZm9ybWF0cyA9IHt9O1xuICAgICAgICB0aGlzLl9jb21waWxhdGlvbnMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuX2xvYWRpbmcgPSB7fTtcbiAgICAgICAgdGhpcy5fY2FjaGUgPSBuZXcgTWFwKCk7XG4gICAgICAgIG9wdHMgPSB0aGlzLm9wdHMgPSB7IC4uLm9wdHMsIC4uLnJlcXVpcmVkT3B0aW9ucyhvcHRzKSB9O1xuICAgICAgICBjb25zdCB7IGVzNSwgbGluZXMgfSA9IHRoaXMub3B0cy5jb2RlO1xuICAgICAgICB0aGlzLnNjb3BlID0gbmV3IGNvZGVnZW5fMi5WYWx1ZVNjb3BlKHsgc2NvcGU6IHt9LCBwcmVmaXhlczogRVhUX1NDT1BFX05BTUVTLCBlczUsIGxpbmVzIH0pO1xuICAgICAgICB0aGlzLmxvZ2dlciA9IGdldExvZ2dlcihvcHRzLmxvZ2dlcik7XG4gICAgICAgIGNvbnN0IGZvcm1hdE9wdCA9IG9wdHMudmFsaWRhdGVGb3JtYXRzO1xuICAgICAgICBvcHRzLnZhbGlkYXRlRm9ybWF0cyA9IGZhbHNlO1xuICAgICAgICB0aGlzLlJVTEVTID0gKDAsIHJ1bGVzXzEuZ2V0UnVsZXMpKCk7XG4gICAgICAgIGNoZWNrT3B0aW9ucy5jYWxsKHRoaXMsIHJlbW92ZWRPcHRpb25zLCBvcHRzLCBcIk5PVCBTVVBQT1JURURcIik7XG4gICAgICAgIGNoZWNrT3B0aW9ucy5jYWxsKHRoaXMsIGRlcHJlY2F0ZWRPcHRpb25zLCBvcHRzLCBcIkRFUFJFQ0FURURcIiwgXCJ3YXJuXCIpO1xuICAgICAgICB0aGlzLl9tZXRhT3B0cyA9IGdldE1ldGFTY2hlbWFPcHRpb25zLmNhbGwodGhpcyk7XG4gICAgICAgIGlmIChvcHRzLmZvcm1hdHMpXG4gICAgICAgICAgICBhZGRJbml0aWFsRm9ybWF0cy5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLl9hZGRWb2NhYnVsYXJpZXMoKTtcbiAgICAgICAgdGhpcy5fYWRkRGVmYXVsdE1ldGFTY2hlbWEoKTtcbiAgICAgICAgaWYgKG9wdHMua2V5d29yZHMpXG4gICAgICAgICAgICBhZGRJbml0aWFsS2V5d29yZHMuY2FsbCh0aGlzLCBvcHRzLmtleXdvcmRzKTtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRzLm1ldGEgPT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgIHRoaXMuYWRkTWV0YVNjaGVtYShvcHRzLm1ldGEpO1xuICAgICAgICBhZGRJbml0aWFsU2NoZW1hcy5jYWxsKHRoaXMpO1xuICAgICAgICBvcHRzLnZhbGlkYXRlRm9ybWF0cyA9IGZvcm1hdE9wdDtcbiAgICB9XG4gICAgX2FkZFZvY2FidWxhcmllcygpIHtcbiAgICAgICAgdGhpcy5hZGRLZXl3b3JkKFwiJGFzeW5jXCIpO1xuICAgIH1cbiAgICBfYWRkRGVmYXVsdE1ldGFTY2hlbWEoKSB7XG4gICAgICAgIGNvbnN0IHsgJGRhdGEsIG1ldGEsIHNjaGVtYUlkIH0gPSB0aGlzLm9wdHM7XG4gICAgICAgIGxldCBfZGF0YVJlZlNjaGVtYSA9ICRkYXRhUmVmU2NoZW1hO1xuICAgICAgICBpZiAoc2NoZW1hSWQgPT09IFwiaWRcIikge1xuICAgICAgICAgICAgX2RhdGFSZWZTY2hlbWEgPSB7IC4uLiRkYXRhUmVmU2NoZW1hIH07XG4gICAgICAgICAgICBfZGF0YVJlZlNjaGVtYS5pZCA9IF9kYXRhUmVmU2NoZW1hLiRpZDtcbiAgICAgICAgICAgIGRlbGV0ZSBfZGF0YVJlZlNjaGVtYS4kaWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1ldGEgJiYgJGRhdGEpXG4gICAgICAgICAgICB0aGlzLmFkZE1ldGFTY2hlbWEoX2RhdGFSZWZTY2hlbWEsIF9kYXRhUmVmU2NoZW1hW3NjaGVtYUlkXSwgZmFsc2UpO1xuICAgIH1cbiAgICBkZWZhdWx0TWV0YSgpIHtcbiAgICAgICAgY29uc3QgeyBtZXRhLCBzY2hlbWFJZCB9ID0gdGhpcy5vcHRzO1xuICAgICAgICByZXR1cm4gKHRoaXMub3B0cy5kZWZhdWx0TWV0YSA9IHR5cGVvZiBtZXRhID09IFwib2JqZWN0XCIgPyBtZXRhW3NjaGVtYUlkXSB8fCBtZXRhIDogdW5kZWZpbmVkKTtcbiAgICB9XG4gICAgdmFsaWRhdGUoc2NoZW1hS2V5UmVmLCAvLyBrZXksIHJlZiBvciBzY2hlbWEgb2JqZWN0XG4gICAgZGF0YSAvLyB0byBiZSB2YWxpZGF0ZWRcbiAgICApIHtcbiAgICAgICAgbGV0IHY7XG4gICAgICAgIGlmICh0eXBlb2Ygc2NoZW1hS2V5UmVmID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHYgPSB0aGlzLmdldFNjaGVtYShzY2hlbWFLZXlSZWYpO1xuICAgICAgICAgICAgaWYgKCF2KVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgbm8gc2NoZW1hIHdpdGgga2V5IG9yIHJlZiBcIiR7c2NoZW1hS2V5UmVmfVwiYCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2ID0gdGhpcy5jb21waWxlKHNjaGVtYUtleVJlZik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsaWQgPSB2KGRhdGEpO1xuICAgICAgICBpZiAoIShcIiRhc3luY1wiIGluIHYpKVxuICAgICAgICAgICAgdGhpcy5lcnJvcnMgPSB2LmVycm9ycztcbiAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgIH1cbiAgICBjb21waWxlKHNjaGVtYSwgX21ldGEpIHtcbiAgICAgICAgY29uc3Qgc2NoID0gdGhpcy5fYWRkU2NoZW1hKHNjaGVtYSwgX21ldGEpO1xuICAgICAgICByZXR1cm4gKHNjaC52YWxpZGF0ZSB8fCB0aGlzLl9jb21waWxlU2NoZW1hRW52KHNjaCkpO1xuICAgIH1cbiAgICBjb21waWxlQXN5bmMoc2NoZW1hLCBtZXRhKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRzLmxvYWRTY2hlbWEgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJvcHRpb25zLmxvYWRTY2hlbWEgc2hvdWxkIGJlIGEgZnVuY3Rpb25cIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBsb2FkU2NoZW1hIH0gPSB0aGlzLm9wdHM7XG4gICAgICAgIHJldHVybiBydW5Db21waWxlQXN5bmMuY2FsbCh0aGlzLCBzY2hlbWEsIG1ldGEpO1xuICAgICAgICBhc3luYyBmdW5jdGlvbiBydW5Db21waWxlQXN5bmMoX3NjaGVtYSwgX21ldGEpIHtcbiAgICAgICAgICAgIGF3YWl0IGxvYWRNZXRhU2NoZW1hLmNhbGwodGhpcywgX3NjaGVtYS4kc2NoZW1hKTtcbiAgICAgICAgICAgIGNvbnN0IHNjaCA9IHRoaXMuX2FkZFNjaGVtYShfc2NoZW1hLCBfbWV0YSk7XG4gICAgICAgICAgICByZXR1cm4gc2NoLnZhbGlkYXRlIHx8IF9jb21waWxlQXN5bmMuY2FsbCh0aGlzLCBzY2gpO1xuICAgICAgICB9XG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uIGxvYWRNZXRhU2NoZW1hKCRyZWYpIHtcbiAgICAgICAgICAgIGlmICgkcmVmICYmICF0aGlzLmdldFNjaGVtYSgkcmVmKSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHJ1bkNvbXBpbGVBc3luYy5jYWxsKHRoaXMsIHsgJHJlZiB9LCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhc3luYyBmdW5jdGlvbiBfY29tcGlsZUFzeW5jKHNjaCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29tcGlsZVNjaGVtYUVudihzY2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIShlIGluc3RhbmNlb2YgcmVmX2Vycm9yXzEuZGVmYXVsdCkpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICAgICAgY2hlY2tMb2FkZWQuY2FsbCh0aGlzLCBlKTtcbiAgICAgICAgICAgICAgICBhd2FpdCBsb2FkTWlzc2luZ1NjaGVtYS5jYWxsKHRoaXMsIGUubWlzc2luZ1NjaGVtYSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb21waWxlQXN5bmMuY2FsbCh0aGlzLCBzY2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrTG9hZGVkKHsgbWlzc2luZ1NjaGVtYTogcmVmLCBtaXNzaW5nUmVmIH0pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlZnNbcmVmXSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQW55U2NoZW1hICR7cmVmfSBpcyBsb2FkZWQgYnV0ICR7bWlzc2luZ1JlZn0gY2Fubm90IGJlIHJlc29sdmVkYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXN5bmMgZnVuY3Rpb24gbG9hZE1pc3NpbmdTY2hlbWEocmVmKSB7XG4gICAgICAgICAgICBjb25zdCBfc2NoZW1hID0gYXdhaXQgX2xvYWRTY2hlbWEuY2FsbCh0aGlzLCByZWYpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnJlZnNbcmVmXSlcbiAgICAgICAgICAgICAgICBhd2FpdCBsb2FkTWV0YVNjaGVtYS5jYWxsKHRoaXMsIF9zY2hlbWEuJHNjaGVtYSk7XG4gICAgICAgICAgICBpZiAoIXRoaXMucmVmc1tyZWZdKVxuICAgICAgICAgICAgICAgIHRoaXMuYWRkU2NoZW1hKF9zY2hlbWEsIHJlZiwgbWV0YSk7XG4gICAgICAgIH1cbiAgICAgICAgYXN5bmMgZnVuY3Rpb24gX2xvYWRTY2hlbWEocmVmKSB7XG4gICAgICAgICAgICBjb25zdCBwID0gdGhpcy5fbG9hZGluZ1tyZWZdO1xuICAgICAgICAgICAgaWYgKHApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCAodGhpcy5fbG9hZGluZ1tyZWZdID0gbG9hZFNjaGVtYShyZWYpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9sb2FkaW5nW3JlZl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gQWRkcyBzY2hlbWEgdG8gdGhlIGluc3RhbmNlXG4gICAgYWRkU2NoZW1hKHNjaGVtYSwgLy8gSWYgYXJyYXkgaXMgcGFzc2VkLCBga2V5YCB3aWxsIGJlIGlnbm9yZWRcbiAgICBrZXksIC8vIE9wdGlvbmFsIHNjaGVtYSBrZXkuIENhbiBiZSBwYXNzZWQgdG8gYHZhbGlkYXRlYCBtZXRob2QgaW5zdGVhZCBvZiBzY2hlbWEgb2JqZWN0IG9yIGlkL3JlZi4gT25lIHNjaGVtYSBwZXIgaW5zdGFuY2UgY2FuIGhhdmUgZW1wdHkgYGlkYCBhbmQgYGtleWAuXG4gICAgX21ldGEsIC8vIHRydWUgaWYgc2NoZW1hIGlzIGEgbWV0YS1zY2hlbWEuIFVzZWQgaW50ZXJuYWxseSwgYWRkTWV0YVNjaGVtYSBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkLlxuICAgIF92YWxpZGF0ZVNjaGVtYSA9IHRoaXMub3B0cy52YWxpZGF0ZVNjaGVtYSAvLyBmYWxzZSB0byBza2lwIHNjaGVtYSB2YWxpZGF0aW9uLiBVc2VkIGludGVybmFsbHksIG9wdGlvbiB2YWxpZGF0ZVNjaGVtYSBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkLlxuICAgICkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNjaCBvZiBzY2hlbWEpXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTY2hlbWEoc2NoLCB1bmRlZmluZWQsIF9tZXRhLCBfdmFsaWRhdGVTY2hlbWEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGlkO1xuICAgICAgICBpZiAodHlwZW9mIHNjaGVtYSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgY29uc3QgeyBzY2hlbWFJZCB9ID0gdGhpcy5vcHRzO1xuICAgICAgICAgICAgaWQgPSBzY2hlbWFbc2NoZW1hSWRdO1xuICAgICAgICAgICAgaWYgKGlkICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGlkICE9IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHNjaGVtYSAke3NjaGVtYUlkfSBtdXN0IGJlIHN0cmluZ2ApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGtleSA9ICgwLCByZXNvbHZlXzEubm9ybWFsaXplSWQpKGtleSB8fCBpZCk7XG4gICAgICAgIHRoaXMuX2NoZWNrVW5pcXVlKGtleSk7XG4gICAgICAgIHRoaXMuc2NoZW1hc1trZXldID0gdGhpcy5fYWRkU2NoZW1hKHNjaGVtYSwgX21ldGEsIGtleSwgX3ZhbGlkYXRlU2NoZW1hLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIEFkZCBzY2hlbWEgdGhhdCB3aWxsIGJlIHVzZWQgdG8gdmFsaWRhdGUgb3RoZXIgc2NoZW1hc1xuICAgIC8vIG9wdGlvbnMgaW4gTUVUQV9JR05PUkVfT1BUSU9OUyBhcmUgYWx3YXkgc2V0IHRvIGZhbHNlXG4gICAgYWRkTWV0YVNjaGVtYShzY2hlbWEsIGtleSwgLy8gc2NoZW1hIGtleVxuICAgIF92YWxpZGF0ZVNjaGVtYSA9IHRoaXMub3B0cy52YWxpZGF0ZVNjaGVtYSAvLyBmYWxzZSB0byBza2lwIHNjaGVtYSB2YWxpZGF0aW9uLCBjYW4gYmUgdXNlZCB0byBvdmVycmlkZSB2YWxpZGF0ZVNjaGVtYSBvcHRpb24gZm9yIG1ldGEtc2NoZW1hXG4gICAgKSB7XG4gICAgICAgIHRoaXMuYWRkU2NoZW1hKHNjaGVtYSwga2V5LCB0cnVlLCBfdmFsaWRhdGVTY2hlbWEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8gIFZhbGlkYXRlIHNjaGVtYSBhZ2FpbnN0IGl0cyBtZXRhLXNjaGVtYVxuICAgIHZhbGlkYXRlU2NoZW1hKHNjaGVtYSwgdGhyb3dPckxvZ0Vycm9yKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2NoZW1hID09IFwiYm9vbGVhblwiKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGxldCAkc2NoZW1hO1xuICAgICAgICAkc2NoZW1hID0gc2NoZW1hLiRzY2hlbWE7XG4gICAgICAgIGlmICgkc2NoZW1hICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mICRzY2hlbWEgIT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiJHNjaGVtYSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgICAgICB9XG4gICAgICAgICRzY2hlbWEgPSAkc2NoZW1hIHx8IHRoaXMub3B0cy5kZWZhdWx0TWV0YSB8fCB0aGlzLmRlZmF1bHRNZXRhKCk7XG4gICAgICAgIGlmICghJHNjaGVtYSkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybihcIm1ldGEtc2NoZW1hIG5vdCBhdmFpbGFibGVcIik7XG4gICAgICAgICAgICB0aGlzLmVycm9ycyA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWxpZCA9IHRoaXMudmFsaWRhdGUoJHNjaGVtYSwgc2NoZW1hKTtcbiAgICAgICAgaWYgKCF2YWxpZCAmJiB0aHJvd09yTG9nRXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBcInNjaGVtYSBpcyBpbnZhbGlkOiBcIiArIHRoaXMuZXJyb3JzVGV4dCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy52YWxpZGF0ZVNjaGVtYSA9PT0gXCJsb2dcIilcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgIH1cbiAgICAvLyBHZXQgY29tcGlsZWQgc2NoZW1hIGJ5IGBrZXlgIG9yIGByZWZgLlxuICAgIC8vIChga2V5YCB0aGF0IHdhcyBwYXNzZWQgdG8gYGFkZFNjaGVtYWAgb3IgZnVsbCBzY2hlbWEgcmVmZXJlbmNlIC0gYHNjaGVtYS4kaWRgIG9yIHJlc29sdmVkIGlkKVxuICAgIGdldFNjaGVtYShrZXlSZWYpIHtcbiAgICAgICAgbGV0IHNjaDtcbiAgICAgICAgd2hpbGUgKHR5cGVvZiAoc2NoID0gZ2V0U2NoRW52LmNhbGwodGhpcywga2V5UmVmKSkgPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIGtleVJlZiA9IHNjaDtcbiAgICAgICAgaWYgKHNjaCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCB7IHNjaGVtYUlkIH0gPSB0aGlzLm9wdHM7XG4gICAgICAgICAgICBjb25zdCByb290ID0gbmV3IGNvbXBpbGVfMS5TY2hlbWFFbnYoeyBzY2hlbWE6IHt9LCBzY2hlbWFJZCB9KTtcbiAgICAgICAgICAgIHNjaCA9IGNvbXBpbGVfMS5yZXNvbHZlU2NoZW1hLmNhbGwodGhpcywgcm9vdCwga2V5UmVmKTtcbiAgICAgICAgICAgIGlmICghc2NoKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMucmVmc1trZXlSZWZdID0gc2NoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoc2NoLnZhbGlkYXRlIHx8IHRoaXMuX2NvbXBpbGVTY2hlbWFFbnYoc2NoKSk7XG4gICAgfVxuICAgIC8vIFJlbW92ZSBjYWNoZWQgc2NoZW1hKHMpLlxuICAgIC8vIElmIG5vIHBhcmFtZXRlciBpcyBwYXNzZWQgYWxsIHNjaGVtYXMgYnV0IG1ldGEtc2NoZW1hcyBhcmUgcmVtb3ZlZC5cbiAgICAvLyBJZiBSZWdFeHAgaXMgcGFzc2VkIGFsbCBzY2hlbWFzIHdpdGgga2V5L2lkIG1hdGNoaW5nIHBhdHRlcm4gYnV0IG1ldGEtc2NoZW1hcyBhcmUgcmVtb3ZlZC5cbiAgICAvLyBFdmVuIGlmIHNjaGVtYSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIHNjaGVtYXMgaXQgc3RpbGwgY2FuIGJlIHJlbW92ZWQgYXMgb3RoZXIgc2NoZW1hcyBoYXZlIGxvY2FsIHJlZmVyZW5jZXMuXG4gICAgcmVtb3ZlU2NoZW1hKHNjaGVtYUtleVJlZikge1xuICAgICAgICBpZiAoc2NoZW1hS2V5UmVmIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVBbGxTY2hlbWFzKHRoaXMuc2NoZW1hcywgc2NoZW1hS2V5UmVmKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUFsbFNjaGVtYXModGhpcy5yZWZzLCBzY2hlbWFLZXlSZWYpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoICh0eXBlb2Ygc2NoZW1hS2V5UmVmKSB7XG4gICAgICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlQWxsU2NoZW1hcyh0aGlzLnNjaGVtYXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZUFsbFNjaGVtYXModGhpcy5yZWZzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZS5jbGVhcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2NoID0gZ2V0U2NoRW52LmNhbGwodGhpcywgc2NoZW1hS2V5UmVmKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNjaCA9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZS5kZWxldGUoc2NoLnNjaGVtYSk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc2NoZW1hc1tzY2hlbWFLZXlSZWZdO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnJlZnNbc2NoZW1hS2V5UmVmXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJvYmplY3RcIjoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhY2hlS2V5ID0gc2NoZW1hS2V5UmVmO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlLmRlbGV0ZShjYWNoZUtleSk7XG4gICAgICAgICAgICAgICAgbGV0IGlkID0gc2NoZW1hS2V5UmVmW3RoaXMub3B0cy5zY2hlbWFJZF07XG4gICAgICAgICAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkID0gKDAsIHJlc29sdmVfMS5ub3JtYWxpemVJZCkoaWQpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zY2hlbWFzW2lkXTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMucmVmc1tpZF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhanYucmVtb3ZlU2NoZW1hOiBpbnZhbGlkIHBhcmFtZXRlclwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBhZGQgXCJ2b2NhYnVsYXJ5XCIgLSBhIGNvbGxlY3Rpb24gb2Yga2V5d29yZHNcbiAgICBhZGRWb2NhYnVsYXJ5KGRlZmluaXRpb25zKSB7XG4gICAgICAgIGZvciAoY29uc3QgZGVmIG9mIGRlZmluaXRpb25zKVxuICAgICAgICAgICAgdGhpcy5hZGRLZXl3b3JkKGRlZik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRLZXl3b3JkKGt3ZE9yRGVmLCBkZWYgLy8gZGVwcmVjYXRlZFxuICAgICkge1xuICAgICAgICBsZXQga2V5d29yZDtcbiAgICAgICAgaWYgKHR5cGVvZiBrd2RPckRlZiA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBrZXl3b3JkID0ga3dkT3JEZWY7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlZiA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybihcInRoZXNlIHBhcmFtZXRlcnMgYXJlIGRlcHJlY2F0ZWQsIHNlZSBkb2NzIGZvciBhZGRLZXl3b3JkXCIpO1xuICAgICAgICAgICAgICAgIGRlZi5rZXl3b3JkID0ga2V5d29yZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Yga3dkT3JEZWYgPT0gXCJvYmplY3RcIiAmJiBkZWYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZGVmID0ga3dkT3JEZWY7XG4gICAgICAgICAgICBrZXl3b3JkID0gZGVmLmtleXdvcmQ7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShrZXl3b3JkKSAmJiAha2V5d29yZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhZGRLZXl3b3Jkczoga2V5d29yZCBtdXN0IGJlIHN0cmluZyBvciBub24tZW1wdHkgYXJyYXlcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGFkZEtleXdvcmRzIHBhcmFtZXRlcnNcIik7XG4gICAgICAgIH1cbiAgICAgICAgY2hlY2tLZXl3b3JkLmNhbGwodGhpcywga2V5d29yZCwgZGVmKTtcbiAgICAgICAgaWYgKCFkZWYpIHtcbiAgICAgICAgICAgICgwLCB1dGlsXzEuZWFjaEl0ZW0pKGtleXdvcmQsIChrd2QpID0+IGFkZFJ1bGUuY2FsbCh0aGlzLCBrd2QpKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGtleXdvcmRNZXRhc2NoZW1hLmNhbGwodGhpcywgZGVmKTtcbiAgICAgICAgY29uc3QgZGVmaW5pdGlvbiA9IHtcbiAgICAgICAgICAgIC4uLmRlZixcbiAgICAgICAgICAgIHR5cGU6ICgwLCBkYXRhVHlwZV8xLmdldEpTT05UeXBlcykoZGVmLnR5cGUpLFxuICAgICAgICAgICAgc2NoZW1hVHlwZTogKDAsIGRhdGFUeXBlXzEuZ2V0SlNPTlR5cGVzKShkZWYuc2NoZW1hVHlwZSksXG4gICAgICAgIH07XG4gICAgICAgICgwLCB1dGlsXzEuZWFjaEl0ZW0pKGtleXdvcmQsIGRlZmluaXRpb24udHlwZS5sZW5ndGggPT09IDBcbiAgICAgICAgICAgID8gKGspID0+IGFkZFJ1bGUuY2FsbCh0aGlzLCBrLCBkZWZpbml0aW9uKVxuICAgICAgICAgICAgOiAoaykgPT4gZGVmaW5pdGlvbi50eXBlLmZvckVhY2goKHQpID0+IGFkZFJ1bGUuY2FsbCh0aGlzLCBrLCBkZWZpbml0aW9uLCB0KSkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0S2V5d29yZChrZXl3b3JkKSB7XG4gICAgICAgIGNvbnN0IHJ1bGUgPSB0aGlzLlJVTEVTLmFsbFtrZXl3b3JkXTtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBydWxlID09IFwib2JqZWN0XCIgPyBydWxlLmRlZmluaXRpb24gOiAhIXJ1bGU7XG4gICAgfVxuICAgIC8vIFJlbW92ZSBrZXl3b3JkXG4gICAgcmVtb3ZlS2V5d29yZChrZXl3b3JkKSB7XG4gICAgICAgIC8vIFRPRE8gcmV0dXJuIHR5cGUgc2hvdWxkIGJlIEFqdlxuICAgICAgICBjb25zdCB7IFJVTEVTIH0gPSB0aGlzO1xuICAgICAgICBkZWxldGUgUlVMRVMua2V5d29yZHNba2V5d29yZF07XG4gICAgICAgIGRlbGV0ZSBSVUxFUy5hbGxba2V5d29yZF07XG4gICAgICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgUlVMRVMucnVsZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGkgPSBncm91cC5ydWxlcy5maW5kSW5kZXgoKHJ1bGUpID0+IHJ1bGUua2V5d29yZCA9PT0ga2V5d29yZCk7XG4gICAgICAgICAgICBpZiAoaSA+PSAwKVxuICAgICAgICAgICAgICAgIGdyb3VwLnJ1bGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8gQWRkIGZvcm1hdFxuICAgIGFkZEZvcm1hdChuYW1lLCBmb3JtYXQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXQgPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIGZvcm1hdCA9IG5ldyBSZWdFeHAoZm9ybWF0KTtcbiAgICAgICAgdGhpcy5mb3JtYXRzW25hbWVdID0gZm9ybWF0O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZXJyb3JzVGV4dChlcnJvcnMgPSB0aGlzLmVycm9ycywgLy8gb3B0aW9uYWwgYXJyYXkgb2YgdmFsaWRhdGlvbiBlcnJvcnNcbiAgICB7IHNlcGFyYXRvciA9IFwiLCBcIiwgZGF0YVZhciA9IFwiZGF0YVwiIH0gPSB7fSAvLyBvcHRpb25hbCBvcHRpb25zIHdpdGggcHJvcGVydGllcyBgc2VwYXJhdG9yYCBhbmQgYGRhdGFWYXJgXG4gICAgKSB7XG4gICAgICAgIGlmICghZXJyb3JzIHx8IGVycm9ycy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gXCJObyBlcnJvcnNcIjtcbiAgICAgICAgcmV0dXJuIGVycm9yc1xuICAgICAgICAgICAgLm1hcCgoZSkgPT4gYCR7ZGF0YVZhcn0ke2UuaW5zdGFuY2VQYXRofSAke2UubWVzc2FnZX1gKVxuICAgICAgICAgICAgLnJlZHVjZSgodGV4dCwgbXNnKSA9PiB0ZXh0ICsgc2VwYXJhdG9yICsgbXNnKTtcbiAgICB9XG4gICAgJGRhdGFNZXRhU2NoZW1hKG1ldGFTY2hlbWEsIGtleXdvcmRzSnNvblBvaW50ZXJzKSB7XG4gICAgICAgIGNvbnN0IHJ1bGVzID0gdGhpcy5SVUxFUy5hbGw7XG4gICAgICAgIG1ldGFTY2hlbWEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG1ldGFTY2hlbWEpKTtcbiAgICAgICAgZm9yIChjb25zdCBqc29uUG9pbnRlciBvZiBrZXl3b3Jkc0pzb25Qb2ludGVycykge1xuICAgICAgICAgICAgY29uc3Qgc2VnbWVudHMgPSBqc29uUG9pbnRlci5zcGxpdChcIi9cIikuc2xpY2UoMSk7IC8vIGZpcnN0IHNlZ21lbnQgaXMgYW4gZW1wdHkgc3RyaW5nXG4gICAgICAgICAgICBsZXQga2V5d29yZHMgPSBtZXRhU2NoZW1hO1xuICAgICAgICAgICAgZm9yIChjb25zdCBzZWcgb2Ygc2VnbWVudHMpXG4gICAgICAgICAgICAgICAga2V5d29yZHMgPSBrZXl3b3Jkc1tzZWddO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcnVsZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBydWxlID0gcnVsZXNba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJ1bGUgIT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgY29uc3QgeyAkZGF0YSB9ID0gcnVsZS5kZWZpbml0aW9uO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjaGVtYSA9IGtleXdvcmRzW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKCRkYXRhICYmIHNjaGVtYSlcbiAgICAgICAgICAgICAgICAgICAga2V5d29yZHNba2V5XSA9IHNjaGVtYU9yRGF0YShzY2hlbWEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZXRhU2NoZW1hO1xuICAgIH1cbiAgICBfcmVtb3ZlQWxsU2NoZW1hcyhzY2hlbWFzLCByZWdleCkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleVJlZiBpbiBzY2hlbWFzKSB7XG4gICAgICAgICAgICBjb25zdCBzY2ggPSBzY2hlbWFzW2tleVJlZl07XG4gICAgICAgICAgICBpZiAoIXJlZ2V4IHx8IHJlZ2V4LnRlc3Qoa2V5UmVmKSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2NoID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHNjaGVtYXNba2V5UmVmXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2NoICYmICFzY2gubWV0YSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZS5kZWxldGUoc2NoLnNjaGVtYSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzY2hlbWFzW2tleVJlZl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9hZGRTY2hlbWEoc2NoZW1hLCBtZXRhLCBiYXNlSWQsIHZhbGlkYXRlU2NoZW1hID0gdGhpcy5vcHRzLnZhbGlkYXRlU2NoZW1hLCBhZGRTY2hlbWEgPSB0aGlzLm9wdHMuYWRkVXNlZFNjaGVtYSkge1xuICAgICAgICBsZXQgaWQ7XG4gICAgICAgIGNvbnN0IHsgc2NoZW1hSWQgfSA9IHRoaXMub3B0cztcbiAgICAgICAgaWYgKHR5cGVvZiBzY2hlbWEgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgaWQgPSBzY2hlbWFbc2NoZW1hSWRdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5qdGQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2NoZW1hIG11c3QgYmUgb2JqZWN0XCIpO1xuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHNjaGVtYSAhPSBcImJvb2xlYW5cIilcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzY2hlbWEgbXVzdCBiZSBvYmplY3Qgb3IgYm9vbGVhblwiKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2NoID0gdGhpcy5fY2FjaGUuZ2V0KHNjaGVtYSk7XG4gICAgICAgIGlmIChzY2ggIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiBzY2g7XG4gICAgICAgIGJhc2VJZCA9ICgwLCByZXNvbHZlXzEubm9ybWFsaXplSWQpKGlkIHx8IGJhc2VJZCk7XG4gICAgICAgIGNvbnN0IGxvY2FsUmVmcyA9IHJlc29sdmVfMS5nZXRTY2hlbWFSZWZzLmNhbGwodGhpcywgc2NoZW1hLCBiYXNlSWQpO1xuICAgICAgICBzY2ggPSBuZXcgY29tcGlsZV8xLlNjaGVtYUVudih7IHNjaGVtYSwgc2NoZW1hSWQsIG1ldGEsIGJhc2VJZCwgbG9jYWxSZWZzIH0pO1xuICAgICAgICB0aGlzLl9jYWNoZS5zZXQoc2NoLnNjaGVtYSwgc2NoKTtcbiAgICAgICAgaWYgKGFkZFNjaGVtYSAmJiAhYmFzZUlkLnN0YXJ0c1dpdGgoXCIjXCIpKSB7XG4gICAgICAgICAgICAvLyBUT0RPIGF0bSBpdCBpcyBhbGxvd2VkIHRvIG92ZXJ3cml0ZSBzY2hlbWFzIHdpdGhvdXQgaWQgKGluc3RlYWQgb2Ygbm90IGFkZGluZyB0aGVtKVxuICAgICAgICAgICAgaWYgKGJhc2VJZClcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja1VuaXF1ZShiYXNlSWQpO1xuICAgICAgICAgICAgdGhpcy5yZWZzW2Jhc2VJZF0gPSBzY2g7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbGlkYXRlU2NoZW1hKVxuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVNjaGVtYShzY2hlbWEsIHRydWUpO1xuICAgICAgICByZXR1cm4gc2NoO1xuICAgIH1cbiAgICBfY2hlY2tVbmlxdWUoaWQpIHtcbiAgICAgICAgaWYgKHRoaXMuc2NoZW1hc1tpZF0gfHwgdGhpcy5yZWZzW2lkXSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBzY2hlbWEgd2l0aCBrZXkgb3IgaWQgXCIke2lkfVwiIGFscmVhZHkgZXhpc3RzYCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2NvbXBpbGVTY2hlbWFFbnYoc2NoKSB7XG4gICAgICAgIGlmIChzY2gubWV0YSlcbiAgICAgICAgICAgIHRoaXMuX2NvbXBpbGVNZXRhU2NoZW1hKHNjaCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbXBpbGVfMS5jb21waWxlU2NoZW1hLmNhbGwodGhpcywgc2NoKTtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICghc2NoLnZhbGlkYXRlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWp2IGltcGxlbWVudGF0aW9uIGVycm9yXCIpO1xuICAgICAgICByZXR1cm4gc2NoLnZhbGlkYXRlO1xuICAgIH1cbiAgICBfY29tcGlsZU1ldGFTY2hlbWEoc2NoKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRPcHRzID0gdGhpcy5vcHRzO1xuICAgICAgICB0aGlzLm9wdHMgPSB0aGlzLl9tZXRhT3B0cztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbXBpbGVfMS5jb21waWxlU2NoZW1hLmNhbGwodGhpcywgc2NoKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMub3B0cyA9IGN1cnJlbnRPcHRzO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gQWp2O1xuQWp2LlZhbGlkYXRpb25FcnJvciA9IHZhbGlkYXRpb25fZXJyb3JfMS5kZWZhdWx0O1xuQWp2Lk1pc3NpbmdSZWZFcnJvciA9IHJlZl9lcnJvcl8xLmRlZmF1bHQ7XG5mdW5jdGlvbiBjaGVja09wdGlvbnMoY2hlY2tPcHRzLCBvcHRpb25zLCBtc2csIGxvZyA9IFwiZXJyb3JcIikge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGNoZWNrT3B0cykge1xuICAgICAgICBjb25zdCBvcHQgPSBrZXk7XG4gICAgICAgIGlmIChvcHQgaW4gb3B0aW9ucylcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyW2xvZ10oYCR7bXNnfTogb3B0aW9uICR7a2V5fS4gJHtjaGVja09wdHNbb3B0XX1gKTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRTY2hFbnYoa2V5UmVmKSB7XG4gICAga2V5UmVmID0gKDAsIHJlc29sdmVfMS5ub3JtYWxpemVJZCkoa2V5UmVmKTsgLy8gVE9ETyB0ZXN0cyBmYWlsIHdpdGhvdXQgdGhpcyBsaW5lXG4gICAgcmV0dXJuIHRoaXMuc2NoZW1hc1trZXlSZWZdIHx8IHRoaXMucmVmc1trZXlSZWZdO1xufVxuZnVuY3Rpb24gYWRkSW5pdGlhbFNjaGVtYXMoKSB7XG4gICAgY29uc3Qgb3B0c1NjaGVtYXMgPSB0aGlzLm9wdHMuc2NoZW1hcztcbiAgICBpZiAoIW9wdHNTY2hlbWFzKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob3B0c1NjaGVtYXMpKVxuICAgICAgICB0aGlzLmFkZFNjaGVtYShvcHRzU2NoZW1hcyk7XG4gICAgZWxzZVxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvcHRzU2NoZW1hcylcbiAgICAgICAgICAgIHRoaXMuYWRkU2NoZW1hKG9wdHNTY2hlbWFzW2tleV0sIGtleSk7XG59XG5mdW5jdGlvbiBhZGRJbml0aWFsRm9ybWF0cygpIHtcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gdGhpcy5vcHRzLmZvcm1hdHMpIHtcbiAgICAgICAgY29uc3QgZm9ybWF0ID0gdGhpcy5vcHRzLmZvcm1hdHNbbmFtZV07XG4gICAgICAgIGlmIChmb3JtYXQpXG4gICAgICAgICAgICB0aGlzLmFkZEZvcm1hdChuYW1lLCBmb3JtYXQpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFkZEluaXRpYWxLZXl3b3JkcyhkZWZzKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGVmcykpIHtcbiAgICAgICAgdGhpcy5hZGRWb2NhYnVsYXJ5KGRlZnMpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubG9nZ2VyLndhcm4oXCJrZXl3b3JkcyBvcHRpb24gYXMgbWFwIGlzIGRlcHJlY2F0ZWQsIHBhc3MgYXJyYXlcIik7XG4gICAgZm9yIChjb25zdCBrZXl3b3JkIGluIGRlZnMpIHtcbiAgICAgICAgY29uc3QgZGVmID0gZGVmc1trZXl3b3JkXTtcbiAgICAgICAgaWYgKCFkZWYua2V5d29yZClcbiAgICAgICAgICAgIGRlZi5rZXl3b3JkID0ga2V5d29yZDtcbiAgICAgICAgdGhpcy5hZGRLZXl3b3JkKGRlZik7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0TWV0YVNjaGVtYU9wdGlvbnMoKSB7XG4gICAgY29uc3QgbWV0YU9wdHMgPSB7IC4uLnRoaXMub3B0cyB9O1xuICAgIGZvciAoY29uc3Qgb3B0IG9mIE1FVEFfSUdOT1JFX09QVElPTlMpXG4gICAgICAgIGRlbGV0ZSBtZXRhT3B0c1tvcHRdO1xuICAgIHJldHVybiBtZXRhT3B0cztcbn1cbmNvbnN0IG5vTG9ncyA9IHsgbG9nKCkgeyB9LCB3YXJuKCkgeyB9LCBlcnJvcigpIHsgfSB9O1xuZnVuY3Rpb24gZ2V0TG9nZ2VyKGxvZ2dlcikge1xuICAgIGlmIChsb2dnZXIgPT09IGZhbHNlKVxuICAgICAgICByZXR1cm4gbm9Mb2dzO1xuICAgIGlmIChsb2dnZXIgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIGNvbnNvbGU7XG4gICAgaWYgKGxvZ2dlci5sb2cgJiYgbG9nZ2VyLndhcm4gJiYgbG9nZ2VyLmVycm9yKVxuICAgICAgICByZXR1cm4gbG9nZ2VyO1xuICAgIHRocm93IG5ldyBFcnJvcihcImxvZ2dlciBtdXN0IGltcGxlbWVudCBsb2csIHdhcm4gYW5kIGVycm9yIG1ldGhvZHNcIik7XG59XG5jb25zdCBLRVlXT1JEX05BTUUgPSAvXlthLXpfJF1bYS16MC05XyQ6LV0qJC9pO1xuZnVuY3Rpb24gY2hlY2tLZXl3b3JkKGtleXdvcmQsIGRlZikge1xuICAgIGNvbnN0IHsgUlVMRVMgfSA9IHRoaXM7XG4gICAgKDAsIHV0aWxfMS5lYWNoSXRlbSkoa2V5d29yZCwgKGt3ZCkgPT4ge1xuICAgICAgICBpZiAoUlVMRVMua2V5d29yZHNba3dkXSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgS2V5d29yZCAke2t3ZH0gaXMgYWxyZWFkeSBkZWZpbmVkYCk7XG4gICAgICAgIGlmICghS0VZV09SRF9OQU1FLnRlc3Qoa3dkKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgS2V5d29yZCAke2t3ZH0gaGFzIGludmFsaWQgbmFtZWApO1xuICAgIH0pO1xuICAgIGlmICghZGVmKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKGRlZi4kZGF0YSAmJiAhKFwiY29kZVwiIGluIGRlZiB8fCBcInZhbGlkYXRlXCIgaW4gZGVmKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJyRkYXRhIGtleXdvcmQgbXVzdCBoYXZlIFwiY29kZVwiIG9yIFwidmFsaWRhdGVcIiBmdW5jdGlvbicpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFkZFJ1bGUoa2V5d29yZCwgZGVmaW5pdGlvbiwgZGF0YVR5cGUpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgcG9zdCA9IGRlZmluaXRpb24gPT09IG51bGwgfHwgZGVmaW5pdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVmaW5pdGlvbi5wb3N0O1xuICAgIGlmIChkYXRhVHlwZSAmJiBwb3N0KVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2tleXdvcmQgd2l0aCBcInBvc3RcIiBmbGFnIGNhbm5vdCBoYXZlIFwidHlwZVwiJyk7XG4gICAgY29uc3QgeyBSVUxFUyB9ID0gdGhpcztcbiAgICBsZXQgcnVsZUdyb3VwID0gcG9zdCA/IFJVTEVTLnBvc3QgOiBSVUxFUy5ydWxlcy5maW5kKCh7IHR5cGU6IHQgfSkgPT4gdCA9PT0gZGF0YVR5cGUpO1xuICAgIGlmICghcnVsZUdyb3VwKSB7XG4gICAgICAgIHJ1bGVHcm91cCA9IHsgdHlwZTogZGF0YVR5cGUsIHJ1bGVzOiBbXSB9O1xuICAgICAgICBSVUxFUy5ydWxlcy5wdXNoKHJ1bGVHcm91cCk7XG4gICAgfVxuICAgIFJVTEVTLmtleXdvcmRzW2tleXdvcmRdID0gdHJ1ZTtcbiAgICBpZiAoIWRlZmluaXRpb24pXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBydWxlID0ge1xuICAgICAgICBrZXl3b3JkLFxuICAgICAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgICAgICAuLi5kZWZpbml0aW9uLFxuICAgICAgICAgICAgdHlwZTogKDAsIGRhdGFUeXBlXzEuZ2V0SlNPTlR5cGVzKShkZWZpbml0aW9uLnR5cGUpLFxuICAgICAgICAgICAgc2NoZW1hVHlwZTogKDAsIGRhdGFUeXBlXzEuZ2V0SlNPTlR5cGVzKShkZWZpbml0aW9uLnNjaGVtYVR5cGUpLFxuICAgICAgICB9LFxuICAgIH07XG4gICAgaWYgKGRlZmluaXRpb24uYmVmb3JlKVxuICAgICAgICBhZGRCZWZvcmVSdWxlLmNhbGwodGhpcywgcnVsZUdyb3VwLCBydWxlLCBkZWZpbml0aW9uLmJlZm9yZSk7XG4gICAgZWxzZVxuICAgICAgICBydWxlR3JvdXAucnVsZXMucHVzaChydWxlKTtcbiAgICBSVUxFUy5hbGxba2V5d29yZF0gPSBydWxlO1xuICAgIChfYSA9IGRlZmluaXRpb24uaW1wbGVtZW50cykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmZvckVhY2goKGt3ZCkgPT4gdGhpcy5hZGRLZXl3b3JkKGt3ZCkpO1xufVxuZnVuY3Rpb24gYWRkQmVmb3JlUnVsZShydWxlR3JvdXAsIHJ1bGUsIGJlZm9yZSkge1xuICAgIGNvbnN0IGkgPSBydWxlR3JvdXAucnVsZXMuZmluZEluZGV4KChfcnVsZSkgPT4gX3J1bGUua2V5d29yZCA9PT0gYmVmb3JlKTtcbiAgICBpZiAoaSA+PSAwKSB7XG4gICAgICAgIHJ1bGVHcm91cC5ydWxlcy5zcGxpY2UoaSwgMCwgcnVsZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBydWxlR3JvdXAucnVsZXMucHVzaChydWxlKTtcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihgcnVsZSAke2JlZm9yZX0gaXMgbm90IGRlZmluZWRgKTtcbiAgICB9XG59XG5mdW5jdGlvbiBrZXl3b3JkTWV0YXNjaGVtYShkZWYpIHtcbiAgICBsZXQgeyBtZXRhU2NoZW1hIH0gPSBkZWY7XG4gICAgaWYgKG1ldGFTY2hlbWEgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChkZWYuJGRhdGEgJiYgdGhpcy5vcHRzLiRkYXRhKVxuICAgICAgICBtZXRhU2NoZW1hID0gc2NoZW1hT3JEYXRhKG1ldGFTY2hlbWEpO1xuICAgIGRlZi52YWxpZGF0ZVNjaGVtYSA9IHRoaXMuY29tcGlsZShtZXRhU2NoZW1hLCB0cnVlKTtcbn1cbmNvbnN0ICRkYXRhUmVmID0ge1xuICAgICRyZWY6IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Fqdi12YWxpZGF0b3IvYWp2L21hc3Rlci9saWIvcmVmcy9kYXRhLmpzb24jXCIsXG59O1xuZnVuY3Rpb24gc2NoZW1hT3JEYXRhKHNjaGVtYSkge1xuICAgIHJldHVybiB7IGFueU9mOiBbc2NoZW1hLCAkZGF0YVJlZl0gfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvcmUuanMubWFwIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIiRpZFwiOiBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9hanYtdmFsaWRhdG9yL2Fqdi9tYXN0ZXIvbGliL3JlZnMvZGF0YS5qc29uI1wiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiTWV0YS1zY2hlbWEgZm9yICRkYXRhIHJlZmVyZW5jZSAoSlNPTiBBbnlTY2hlbWEgZXh0ZW5zaW9uIHByb3Bvc2FsKVwiLFxuICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgXCJyZXF1aXJlZFwiOiBbXCIkZGF0YVwiXSxcbiAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICBcIiRkYXRhXCI6IHtcbiAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgXCJhbnlPZlwiOiBbe1wiZm9ybWF0XCI6IFwicmVsYXRpdmUtanNvbi1wb2ludGVyXCJ9LCB7XCJmb3JtYXRcIjogXCJqc29uLXBvaW50ZXJcIn1dXG4gICAgfVxuICB9LFxuICBcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCI6IGZhbHNlXG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IG1ldGFTY2hlbWEgPSByZXF1aXJlKFwiLi9zY2hlbWEuanNvblwiKTtcbmNvbnN0IGFwcGxpY2F0b3IgPSByZXF1aXJlKFwiLi9tZXRhL2FwcGxpY2F0b3IuanNvblwiKTtcbmNvbnN0IGNvbnRlbnQgPSByZXF1aXJlKFwiLi9tZXRhL2NvbnRlbnQuanNvblwiKTtcbmNvbnN0IGNvcmUgPSByZXF1aXJlKFwiLi9tZXRhL2NvcmUuanNvblwiKTtcbmNvbnN0IGZvcm1hdCA9IHJlcXVpcmUoXCIuL21ldGEvZm9ybWF0Lmpzb25cIik7XG5jb25zdCBtZXRhZGF0YSA9IHJlcXVpcmUoXCIuL21ldGEvbWV0YS1kYXRhLmpzb25cIik7XG5jb25zdCB2YWxpZGF0aW9uID0gcmVxdWlyZShcIi4vbWV0YS92YWxpZGF0aW9uLmpzb25cIik7XG5jb25zdCBNRVRBX1NVUFBPUlRfREFUQSA9IFtcIi9wcm9wZXJ0aWVzXCJdO1xuZnVuY3Rpb24gYWRkTWV0YVNjaGVtYTIwMTkoJGRhdGEpIHtcbiAgICA7XG4gICAgW1xuICAgICAgICBtZXRhU2NoZW1hLFxuICAgICAgICBhcHBsaWNhdG9yLFxuICAgICAgICBjb250ZW50LFxuICAgICAgICBjb3JlLFxuICAgICAgICB3aXRoJGRhdGEodGhpcywgZm9ybWF0KSxcbiAgICAgICAgbWV0YWRhdGEsXG4gICAgICAgIHdpdGgkZGF0YSh0aGlzLCB2YWxpZGF0aW9uKSxcbiAgICBdLmZvckVhY2goKHNjaCkgPT4gdGhpcy5hZGRNZXRhU2NoZW1hKHNjaCwgdW5kZWZpbmVkLCBmYWxzZSkpO1xuICAgIHJldHVybiB0aGlzO1xuICAgIGZ1bmN0aW9uIHdpdGgkZGF0YShhanYsIHNjaCkge1xuICAgICAgICByZXR1cm4gJGRhdGEgPyBhanYuJGRhdGFNZXRhU2NoZW1hKHNjaCwgTUVUQV9TVVBQT1JUX0RBVEEpIDogc2NoO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGFkZE1ldGFTY2hlbWEyMDE5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIiRzY2hlbWFcIjogXCJodHRwczovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC8yMDE5LTA5L3NjaGVtYVwiLFxuICBcIiRpZFwiOiBcImh0dHBzOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LzIwMTktMDkvbWV0YS9hcHBsaWNhdG9yXCIsXG4gIFwiJHZvY2FidWxhcnlcIjoge1xuICAgIFwiaHR0cHM6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQvMjAxOS0wOS92b2NhYi9hcHBsaWNhdG9yXCI6IHRydWVcbiAgfSxcbiAgXCIkcmVjdXJzaXZlQW5jaG9yXCI6IHRydWUsXG5cbiAgXCJ0aXRsZVwiOiBcIkFwcGxpY2F0b3Igdm9jYWJ1bGFyeSBtZXRhLXNjaGVtYVwiLFxuICBcInR5cGVcIjogW1wib2JqZWN0XCIsIFwiYm9vbGVhblwiXSxcbiAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICBcImFkZGl0aW9uYWxJdGVtc1wiOiB7XCIkcmVjdXJzaXZlUmVmXCI6IFwiI1wifSxcbiAgICBcInVuZXZhbHVhdGVkSXRlbXNcIjoge1wiJHJlY3Vyc2l2ZVJlZlwiOiBcIiNcIn0sXG4gICAgXCJpdGVtc1wiOiB7XG4gICAgICBcImFueU9mXCI6IFt7XCIkcmVjdXJzaXZlUmVmXCI6IFwiI1wifSwge1wiJHJlZlwiOiBcIiMvJGRlZnMvc2NoZW1hQXJyYXlcIn1dXG4gICAgfSxcbiAgICBcImNvbnRhaW5zXCI6IHtcIiRyZWN1cnNpdmVSZWZcIjogXCIjXCJ9LFxuICAgIFwiYWRkaXRpb25hbFByb3BlcnRpZXNcIjoge1wiJHJlY3Vyc2l2ZVJlZlwiOiBcIiNcIn0sXG4gICAgXCJ1bmV2YWx1YXRlZFByb3BlcnRpZXNcIjoge1wiJHJlY3Vyc2l2ZVJlZlwiOiBcIiNcIn0sXG4gICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgICAgXCJhZGRpdGlvbmFsUHJvcGVydGllc1wiOiB7XCIkcmVjdXJzaXZlUmVmXCI6IFwiI1wifSxcbiAgICAgIFwiZGVmYXVsdFwiOiB7fVxuICAgIH0sXG4gICAgXCJwYXR0ZXJuUHJvcGVydGllc1wiOiB7XG4gICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgIFwiYWRkaXRpb25hbFByb3BlcnRpZXNcIjoge1wiJHJlY3Vyc2l2ZVJlZlwiOiBcIiNcIn0sXG4gICAgICBcInByb3BlcnR5TmFtZXNcIjoge1wiZm9ybWF0XCI6IFwicmVnZXhcIn0sXG4gICAgICBcImRlZmF1bHRcIjoge31cbiAgICB9LFxuICAgIFwiZGVwZW5kZW50U2NoZW1hc1wiOiB7XG4gICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgIFwiYWRkaXRpb25hbFByb3BlcnRpZXNcIjoge1xuICAgICAgICBcIiRyZWN1cnNpdmVSZWZcIjogXCIjXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFwicHJvcGVydHlOYW1lc1wiOiB7XCIkcmVjdXJzaXZlUmVmXCI6IFwiI1wifSxcbiAgICBcImlmXCI6IHtcIiRyZWN1cnNpdmVSZWZcIjogXCIjXCJ9LFxuICAgIFwidGhlblwiOiB7XCIkcmVjdXJzaXZlUmVmXCI6IFwiI1wifSxcbiAgICBcImVsc2VcIjoge1wiJHJlY3Vyc2l2ZVJlZlwiOiBcIiNcIn0sXG4gICAgXCJhbGxPZlwiOiB7XCIkcmVmXCI6IFwiIy8kZGVmcy9zY2hlbWFBcnJheVwifSxcbiAgICBcImFueU9mXCI6IHtcIiRyZWZcIjogXCIjLyRkZWZzL3NjaGVtYUFycmF5XCJ9LFxuICAgIFwib25lT2ZcIjoge1wiJHJlZlwiOiBcIiMvJGRlZnMvc2NoZW1hQXJyYXlcIn0sXG4gICAgXCJub3RcIjoge1wiJHJlY3Vyc2l2ZVJlZlwiOiBcIiNcIn1cbiAgfSxcbiAgXCIkZGVmc1wiOiB7XG4gICAgXCJzY2hlbWFBcnJheVwiOiB7XG4gICAgICBcInR5cGVcIjogXCJhcnJheVwiLFxuICAgICAgXCJtaW5JdGVtc1wiOiAxLFxuICAgICAgXCJpdGVtc1wiOiB7XCIkcmVjdXJzaXZlUmVmXCI6IFwiI1wifVxuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIiRzY2hlbWFcIjogXCJodHRwczovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC8yMDE5LTA5L3NjaGVtYVwiLFxuICBcIiRpZFwiOiBcImh0dHBzOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LzIwMTktMDkvbWV0YS9jb250ZW50XCIsXG4gIFwiJHZvY2FidWxhcnlcIjoge1xuICAgIFwiaHR0cHM6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQvMjAxOS0wOS92b2NhYi9jb250ZW50XCI6IHRydWVcbiAgfSxcbiAgXCIkcmVjdXJzaXZlQW5jaG9yXCI6IHRydWUsXG5cbiAgXCJ0aXRsZVwiOiBcIkNvbnRlbnQgdm9jYWJ1bGFyeSBtZXRhLXNjaGVtYVwiLFxuXG4gIFwidHlwZVwiOiBbXCJvYmplY3RcIiwgXCJib29sZWFuXCJdLFxuICBcInByb3BlcnRpZXNcIjoge1xuICAgIFwiY29udGVudE1lZGlhVHlwZVwiOiB7XCJ0eXBlXCI6IFwic3RyaW5nXCJ9LFxuICAgIFwiY29udGVudEVuY29kaW5nXCI6IHtcInR5cGVcIjogXCJzdHJpbmdcIn0sXG4gICAgXCJjb250ZW50U2NoZW1hXCI6IHtcIiRyZWN1cnNpdmVSZWZcIjogXCIjXCJ9XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIkc2NoZW1hXCI6IFwiaHR0cHM6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQvMjAxOS0wOS9zY2hlbWFcIixcbiAgXCIkaWRcIjogXCJodHRwczovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC8yMDE5LTA5L21ldGEvY29yZVwiLFxuICBcIiR2b2NhYnVsYXJ5XCI6IHtcbiAgICBcImh0dHBzOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LzIwMTktMDkvdm9jYWIvY29yZVwiOiB0cnVlXG4gIH0sXG4gIFwiJHJlY3Vyc2l2ZUFuY2hvclwiOiB0cnVlLFxuXG4gIFwidGl0bGVcIjogXCJDb3JlIHZvY2FidWxhcnkgbWV0YS1zY2hlbWFcIixcbiAgXCJ0eXBlXCI6IFtcIm9iamVjdFwiLCBcImJvb2xlYW5cIl0sXG4gIFwicHJvcGVydGllc1wiOiB7XG4gICAgXCIkaWRcIjoge1xuICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICBcImZvcm1hdFwiOiBcInVyaS1yZWZlcmVuY2VcIixcbiAgICAgIFwiJGNvbW1lbnRcIjogXCJOb24tZW1wdHkgZnJhZ21lbnRzIG5vdCBhbGxvd2VkLlwiLFxuICAgICAgXCJwYXR0ZXJuXCI6IFwiXlteI10qIz8kXCJcbiAgICB9LFxuICAgIFwiJHNjaGVtYVwiOiB7XG4gICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgIFwiZm9ybWF0XCI6IFwidXJpXCJcbiAgICB9LFxuICAgIFwiJGFuY2hvclwiOiB7XG4gICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgIFwicGF0dGVyblwiOiBcIl5bQS1aYS16XVstQS1aYS16MC05LjpfXSokXCJcbiAgICB9LFxuICAgIFwiJHJlZlwiOiB7XG4gICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgIFwiZm9ybWF0XCI6IFwidXJpLXJlZmVyZW5jZVwiXG4gICAgfSxcbiAgICBcIiRyZWN1cnNpdmVSZWZcIjoge1xuICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICBcImZvcm1hdFwiOiBcInVyaS1yZWZlcmVuY2VcIlxuICAgIH0sXG4gICAgXCIkcmVjdXJzaXZlQW5jaG9yXCI6IHtcbiAgICAgIFwidHlwZVwiOiBcImJvb2xlYW5cIixcbiAgICAgIFwiZGVmYXVsdFwiOiBmYWxzZVxuICAgIH0sXG4gICAgXCIkdm9jYWJ1bGFyeVwiOiB7XG4gICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgIFwicHJvcGVydHlOYW1lc1wiOiB7XG4gICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICBcImZvcm1hdFwiOiBcInVyaVwiXG4gICAgICB9LFxuICAgICAgXCJhZGRpdGlvbmFsUHJvcGVydGllc1wiOiB7XG4gICAgICAgIFwidHlwZVwiOiBcImJvb2xlYW5cIlxuICAgICAgfVxuICAgIH0sXG4gICAgXCIkY29tbWVudFwiOiB7XG4gICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgIH0sXG4gICAgXCIkZGVmc1wiOiB7XG4gICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgIFwiYWRkaXRpb25hbFByb3BlcnRpZXNcIjoge1wiJHJlY3Vyc2l2ZVJlZlwiOiBcIiNcIn0sXG4gICAgICBcImRlZmF1bHRcIjoge31cbiAgICB9XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIkc2NoZW1hXCI6IFwiaHR0cHM6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQvMjAxOS0wOS9zY2hlbWFcIixcbiAgXCIkaWRcIjogXCJodHRwczovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC8yMDE5LTA5L21ldGEvZm9ybWF0XCIsXG4gIFwiJHZvY2FidWxhcnlcIjoge1xuICAgIFwiaHR0cHM6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQvMjAxOS0wOS92b2NhYi9mb3JtYXRcIjogdHJ1ZVxuICB9LFxuICBcIiRyZWN1cnNpdmVBbmNob3JcIjogdHJ1ZSxcblxuICBcInRpdGxlXCI6IFwiRm9ybWF0IHZvY2FidWxhcnkgbWV0YS1zY2hlbWFcIixcbiAgXCJ0eXBlXCI6IFtcIm9iamVjdFwiLCBcImJvb2xlYW5cIl0sXG4gIFwicHJvcGVydGllc1wiOiB7XG4gICAgXCJmb3JtYXRcIjoge1widHlwZVwiOiBcInN0cmluZ1wifVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiJHNjaGVtYVwiOiBcImh0dHBzOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LzIwMTktMDkvc2NoZW1hXCIsXG4gIFwiJGlkXCI6IFwiaHR0cHM6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQvMjAxOS0wOS9tZXRhL21ldGEtZGF0YVwiLFxuICBcIiR2b2NhYnVsYXJ5XCI6IHtcbiAgICBcImh0dHBzOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LzIwMTktMDkvdm9jYWIvbWV0YS1kYXRhXCI6IHRydWVcbiAgfSxcbiAgXCIkcmVjdXJzaXZlQW5jaG9yXCI6IHRydWUsXG5cbiAgXCJ0aXRsZVwiOiBcIk1ldGEtZGF0YSB2b2NhYnVsYXJ5IG1ldGEtc2NoZW1hXCIsXG5cbiAgXCJ0eXBlXCI6IFtcIm9iamVjdFwiLCBcImJvb2xlYW5cIl0sXG4gIFwicHJvcGVydGllc1wiOiB7XG4gICAgXCJ0aXRsZVwiOiB7XG4gICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiB7XG4gICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgIH0sXG4gICAgXCJkZWZhdWx0XCI6IHRydWUsXG4gICAgXCJkZXByZWNhdGVkXCI6IHtcbiAgICAgIFwidHlwZVwiOiBcImJvb2xlYW5cIixcbiAgICAgIFwiZGVmYXVsdFwiOiBmYWxzZVxuICAgIH0sXG4gICAgXCJyZWFkT25seVwiOiB7XG4gICAgICBcInR5cGVcIjogXCJib29sZWFuXCIsXG4gICAgICBcImRlZmF1bHRcIjogZmFsc2VcbiAgICB9LFxuICAgIFwid3JpdGVPbmx5XCI6IHtcbiAgICAgIFwidHlwZVwiOiBcImJvb2xlYW5cIixcbiAgICAgIFwiZGVmYXVsdFwiOiBmYWxzZVxuICAgIH0sXG4gICAgXCJleGFtcGxlc1wiOiB7XG4gICAgICBcInR5cGVcIjogXCJhcnJheVwiLFxuICAgICAgXCJpdGVtc1wiOiB0cnVlXG4gICAgfVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiJHNjaGVtYVwiOiBcImh0dHBzOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LzIwMTktMDkvc2NoZW1hXCIsXG4gIFwiJGlkXCI6IFwiaHR0cHM6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQvMjAxOS0wOS9tZXRhL3ZhbGlkYXRpb25cIixcbiAgXCIkdm9jYWJ1bGFyeVwiOiB7XG4gICAgXCJodHRwczovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC8yMDE5LTA5L3ZvY2FiL3ZhbGlkYXRpb25cIjogdHJ1ZVxuICB9LFxuICBcIiRyZWN1cnNpdmVBbmNob3JcIjogdHJ1ZSxcblxuICBcInRpdGxlXCI6IFwiVmFsaWRhdGlvbiB2b2NhYnVsYXJ5IG1ldGEtc2NoZW1hXCIsXG4gIFwidHlwZVwiOiBbXCJvYmplY3RcIiwgXCJib29sZWFuXCJdLFxuICBcInByb3BlcnRpZXNcIjoge1xuICAgIFwibXVsdGlwbGVPZlwiOiB7XG4gICAgICBcInR5cGVcIjogXCJudW1iZXJcIixcbiAgICAgIFwiZXhjbHVzaXZlTWluaW11bVwiOiAwXG4gICAgfSxcbiAgICBcIm1heGltdW1cIjoge1xuICAgICAgXCJ0eXBlXCI6IFwibnVtYmVyXCJcbiAgICB9LFxuICAgIFwiZXhjbHVzaXZlTWF4aW11bVwiOiB7XG4gICAgICBcInR5cGVcIjogXCJudW1iZXJcIlxuICAgIH0sXG4gICAgXCJtaW5pbXVtXCI6IHtcbiAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiXG4gICAgfSxcbiAgICBcImV4Y2x1c2l2ZU1pbmltdW1cIjoge1xuICAgICAgXCJ0eXBlXCI6IFwibnVtYmVyXCJcbiAgICB9LFxuICAgIFwibWF4TGVuZ3RoXCI6IHtcIiRyZWZcIjogXCIjLyRkZWZzL25vbk5lZ2F0aXZlSW50ZWdlclwifSxcbiAgICBcIm1pbkxlbmd0aFwiOiB7XCIkcmVmXCI6IFwiIy8kZGVmcy9ub25OZWdhdGl2ZUludGVnZXJEZWZhdWx0MFwifSxcbiAgICBcInBhdHRlcm5cIjoge1xuICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICBcImZvcm1hdFwiOiBcInJlZ2V4XCJcbiAgICB9LFxuICAgIFwibWF4SXRlbXNcIjoge1wiJHJlZlwiOiBcIiMvJGRlZnMvbm9uTmVnYXRpdmVJbnRlZ2VyXCJ9LFxuICAgIFwibWluSXRlbXNcIjoge1wiJHJlZlwiOiBcIiMvJGRlZnMvbm9uTmVnYXRpdmVJbnRlZ2VyRGVmYXVsdDBcIn0sXG4gICAgXCJ1bmlxdWVJdGVtc1wiOiB7XG4gICAgICBcInR5cGVcIjogXCJib29sZWFuXCIsXG4gICAgICBcImRlZmF1bHRcIjogZmFsc2VcbiAgICB9LFxuICAgIFwibWF4Q29udGFpbnNcIjoge1wiJHJlZlwiOiBcIiMvJGRlZnMvbm9uTmVnYXRpdmVJbnRlZ2VyXCJ9LFxuICAgIFwibWluQ29udGFpbnNcIjoge1xuICAgICAgXCIkcmVmXCI6IFwiIy8kZGVmcy9ub25OZWdhdGl2ZUludGVnZXJcIixcbiAgICAgIFwiZGVmYXVsdFwiOiAxXG4gICAgfSxcbiAgICBcIm1heFByb3BlcnRpZXNcIjoge1wiJHJlZlwiOiBcIiMvJGRlZnMvbm9uTmVnYXRpdmVJbnRlZ2VyXCJ9LFxuICAgIFwibWluUHJvcGVydGllc1wiOiB7XCIkcmVmXCI6IFwiIy8kZGVmcy9ub25OZWdhdGl2ZUludGVnZXJEZWZhdWx0MFwifSxcbiAgICBcInJlcXVpcmVkXCI6IHtcIiRyZWZcIjogXCIjLyRkZWZzL3N0cmluZ0FycmF5XCJ9LFxuICAgIFwiZGVwZW5kZW50UmVxdWlyZWRcIjoge1xuICAgICAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gICAgICBcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgXCIkcmVmXCI6IFwiIy8kZGVmcy9zdHJpbmdBcnJheVwiXG4gICAgICB9XG4gICAgfSxcbiAgICBcImNvbnN0XCI6IHRydWUsXG4gICAgXCJlbnVtXCI6IHtcbiAgICAgIFwidHlwZVwiOiBcImFycmF5XCIsXG4gICAgICBcIml0ZW1zXCI6IHRydWVcbiAgICB9LFxuICAgIFwidHlwZVwiOiB7XG4gICAgICBcImFueU9mXCI6IFtcbiAgICAgICAge1wiJHJlZlwiOiBcIiMvJGRlZnMvc2ltcGxlVHlwZXNcIn0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJhcnJheVwiLFxuICAgICAgICAgIFwiaXRlbXNcIjoge1wiJHJlZlwiOiBcIiMvJGRlZnMvc2ltcGxlVHlwZXNcIn0sXG4gICAgICAgICAgXCJtaW5JdGVtc1wiOiAxLFxuICAgICAgICAgIFwidW5pcXVlSXRlbXNcIjogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9LFxuICBcIiRkZWZzXCI6IHtcbiAgICBcIm5vbk5lZ2F0aXZlSW50ZWdlclwiOiB7XG4gICAgICBcInR5cGVcIjogXCJpbnRlZ2VyXCIsXG4gICAgICBcIm1pbmltdW1cIjogMFxuICAgIH0sXG4gICAgXCJub25OZWdhdGl2ZUludGVnZXJEZWZhdWx0MFwiOiB7XG4gICAgICBcIiRyZWZcIjogXCIjLyRkZWZzL25vbk5lZ2F0aXZlSW50ZWdlclwiLFxuICAgICAgXCJkZWZhdWx0XCI6IDBcbiAgICB9LFxuICAgIFwic2ltcGxlVHlwZXNcIjoge1xuICAgICAgXCJlbnVtXCI6IFtcImFycmF5XCIsIFwiYm9vbGVhblwiLCBcImludGVnZXJcIiwgXCJudWxsXCIsIFwibnVtYmVyXCIsIFwib2JqZWN0XCIsIFwic3RyaW5nXCJdXG4gICAgfSxcbiAgICBcInN0cmluZ0FycmF5XCI6IHtcbiAgICAgIFwidHlwZVwiOiBcImFycmF5XCIsXG4gICAgICBcIml0ZW1zXCI6IHtcInR5cGVcIjogXCJzdHJpbmdcIn0sXG4gICAgICBcInVuaXF1ZUl0ZW1zXCI6IHRydWUsXG4gICAgICBcImRlZmF1bHRcIjogW11cbiAgICB9XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIkc2NoZW1hXCI6IFwiaHR0cHM6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQvMjAxOS0wOS9zY2hlbWFcIixcbiAgXCIkaWRcIjogXCJodHRwczovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC8yMDE5LTA5L3NjaGVtYVwiLFxuICBcIiR2b2NhYnVsYXJ5XCI6IHtcbiAgICBcImh0dHBzOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LzIwMTktMDkvdm9jYWIvY29yZVwiOiB0cnVlLFxuICAgIFwiaHR0cHM6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQvMjAxOS0wOS92b2NhYi9hcHBsaWNhdG9yXCI6IHRydWUsXG4gICAgXCJodHRwczovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC8yMDE5LTA5L3ZvY2FiL3ZhbGlkYXRpb25cIjogdHJ1ZSxcbiAgICBcImh0dHBzOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LzIwMTktMDkvdm9jYWIvbWV0YS1kYXRhXCI6IHRydWUsXG4gICAgXCJodHRwczovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC8yMDE5LTA5L3ZvY2FiL2Zvcm1hdFwiOiBmYWxzZSxcbiAgICBcImh0dHBzOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LzIwMTktMDkvdm9jYWIvY29udGVudFwiOiB0cnVlXG4gIH0sXG4gIFwiJHJlY3Vyc2l2ZUFuY2hvclwiOiB0cnVlLFxuXG4gIFwidGl0bGVcIjogXCJDb3JlIGFuZCBWYWxpZGF0aW9uIHNwZWNpZmljYXRpb25zIG1ldGEtc2NoZW1hXCIsXG4gIFwiYWxsT2ZcIjogW1xuICAgIHtcIiRyZWZcIjogXCJtZXRhL2NvcmVcIn0sXG4gICAge1wiJHJlZlwiOiBcIm1ldGEvYXBwbGljYXRvclwifSxcbiAgICB7XCIkcmVmXCI6IFwibWV0YS92YWxpZGF0aW9uXCJ9LFxuICAgIHtcIiRyZWZcIjogXCJtZXRhL21ldGEtZGF0YVwifSxcbiAgICB7XCIkcmVmXCI6IFwibWV0YS9mb3JtYXRcIn0sXG4gICAge1wiJHJlZlwiOiBcIm1ldGEvY29udGVudFwifVxuICBdLFxuICBcInR5cGVcIjogW1wib2JqZWN0XCIsIFwiYm9vbGVhblwiXSxcbiAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICBcImRlZmluaXRpb25zXCI6IHtcbiAgICAgIFwiJGNvbW1lbnRcIjogXCJXaGlsZSBubyBsb25nZXIgYW4gb2ZmaWNpYWwga2V5d29yZCBhcyBpdCBpcyByZXBsYWNlZCBieSAkZGVmcywgdGhpcyBrZXl3b3JkIGlzIHJldGFpbmVkIGluIHRoZSBtZXRhLXNjaGVtYSB0byBwcmV2ZW50IGluY29tcGF0aWJsZSBleHRlbnNpb25zIGFzIGl0IHJlbWFpbnMgaW4gY29tbW9uIHVzZS5cIixcbiAgICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgICAgXCJhZGRpdGlvbmFsUHJvcGVydGllc1wiOiB7XCIkcmVjdXJzaXZlUmVmXCI6IFwiI1wifSxcbiAgICAgIFwiZGVmYXVsdFwiOiB7fVxuICAgIH0sXG4gICAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgICAgXCIkY29tbWVudFwiOiBcIlxcXCJkZXBlbmRlbmNpZXNcXFwiIGlzIG5vIGxvbmdlciBhIGtleXdvcmQsIGJ1dCBzY2hlbWEgYXV0aG9ycyBzaG91bGQgYXZvaWQgcmVkZWZpbmluZyBpdCB0byBmYWNpbGl0YXRlIGEgc21vb3RoIHRyYW5zaXRpb24gdG8gXFxcImRlcGVuZGVudFNjaGVtYXNcXFwiIGFuZCBcXFwiZGVwZW5kZW50UmVxdWlyZWRcXFwiXCIsXG4gICAgICBcInR5cGVcIjogXCJvYmplY3RcIixcbiAgICAgIFwiYWRkaXRpb25hbFByb3BlcnRpZXNcIjoge1xuICAgICAgICBcImFueU9mXCI6IFt7XCIkcmVjdXJzaXZlUmVmXCI6IFwiI1wifSwge1wiJHJlZlwiOiBcIm1ldGEvdmFsaWRhdGlvbiMvJGRlZnMvc3RyaW5nQXJyYXlcIn1dXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hanYtdmFsaWRhdG9yL2Fqdi9pc3N1ZXMvODg5XG5jb25zdCBlcXVhbCA9IHJlcXVpcmUoXCJmYXN0LWRlZXAtZXF1YWxcIik7XG5lcXVhbC5jb2RlID0gJ3JlcXVpcmUoXCJhanYvZGlzdC9ydW50aW1lL2VxdWFsXCIpLmRlZmF1bHQnO1xuZXhwb3J0cy5kZWZhdWx0ID0gZXF1YWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lcXVhbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYmVzdGllanMvcHVueWNvZGUuanMgLSBwdW55Y29kZS51Y3MyLmRlY29kZVxuZnVuY3Rpb24gdWNzMmxlbmd0aChzdHIpIHtcbiAgICBjb25zdCBsZW4gPSBzdHIubGVuZ3RoO1xuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGxldCBwb3MgPSAwO1xuICAgIGxldCB2YWx1ZTtcbiAgICB3aGlsZSAocG9zIDwgbGVuKSB7XG4gICAgICAgIGxlbmd0aCsrO1xuICAgICAgICB2YWx1ZSA9IHN0ci5jaGFyQ29kZUF0KHBvcysrKTtcbiAgICAgICAgaWYgKHZhbHVlID49IDB4ZDgwMCAmJiB2YWx1ZSA8PSAweGRiZmYgJiYgcG9zIDwgbGVuKSB7XG4gICAgICAgICAgICAvLyBoaWdoIHN1cnJvZ2F0ZSwgYW5kIHRoZXJlIGlzIGEgbmV4dCBjaGFyYWN0ZXJcbiAgICAgICAgICAgIHZhbHVlID0gc3RyLmNoYXJDb2RlQXQocG9zKTtcbiAgICAgICAgICAgIGlmICgodmFsdWUgJiAweGZjMDApID09PSAweGRjMDApXG4gICAgICAgICAgICAgICAgcG9zKys7IC8vIGxvdyBzdXJyb2dhdGVcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbGVuZ3RoO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gdWNzMmxlbmd0aDtcbnVjczJsZW5ndGguY29kZSA9ICdyZXF1aXJlKFwiYWp2L2Rpc3QvcnVudGltZS91Y3MybGVuZ3RoXCIpLmRlZmF1bHQnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dWNzMmxlbmd0aC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHVyaSA9IHJlcXVpcmUoXCJ1cmktanNcIik7XG51cmkuY29kZSA9ICdyZXF1aXJlKFwiYWp2L2Rpc3QvcnVudGltZS91cmlcIikuZGVmYXVsdCc7XG5leHBvcnRzLmRlZmF1bHQgPSB1cmk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11cmkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBWYWxpZGF0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IoZXJyb3JzKSB7XG4gICAgICAgIHN1cGVyKFwidmFsaWRhdGlvbiBmYWlsZWRcIik7XG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuICAgICAgICB0aGlzLmFqdiA9IHRoaXMudmFsaWRhdGlvbiA9IHRydWU7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gVmFsaWRhdGlvbkVycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dmFsaWRhdGlvbl9lcnJvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudmFsaWRhdGVBZGRpdGlvbmFsSXRlbXMgPSB2b2lkIDA7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IHBhcmFtczogeyBsZW4gfSB9KSA9PiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgTk9UIGhhdmUgbW9yZSB0aGFuICR7bGVufSBpdGVtc2AsXG4gICAgcGFyYW1zOiAoeyBwYXJhbXM6IHsgbGVuIH0gfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge2xpbWl0OiAke2xlbn19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJhZGRpdGlvbmFsSXRlbXNcIixcbiAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgc2NoZW1hVHlwZTogW1wiYm9vbGVhblwiLCBcIm9iamVjdFwiXSxcbiAgICBiZWZvcmU6IFwidW5pcXVlSXRlbXNcIixcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IHBhcmVudFNjaGVtYSwgaXQgfSA9IGN4dDtcbiAgICAgICAgY29uc3QgeyBpdGVtcyB9ID0gcGFyZW50U2NoZW1hO1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoaXRlbXMpKSB7XG4gICAgICAgICAgICAoMCwgdXRpbF8xLmNoZWNrU3RyaWN0TW9kZSkoaXQsICdcImFkZGl0aW9uYWxJdGVtc1wiIGlzIGlnbm9yZWQgd2hlbiBcIml0ZW1zXCIgaXMgbm90IGFuIGFycmF5IG9mIHNjaGVtYXMnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YWxpZGF0ZUFkZGl0aW9uYWxJdGVtcyhjeHQsIGl0ZW1zKTtcbiAgICB9LFxufTtcbmZ1bmN0aW9uIHZhbGlkYXRlQWRkaXRpb25hbEl0ZW1zKGN4dCwgaXRlbXMpIHtcbiAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBkYXRhLCBrZXl3b3JkLCBpdCB9ID0gY3h0O1xuICAgIGl0Lml0ZW1zID0gdHJ1ZTtcbiAgICBjb25zdCBsZW4gPSBnZW4uY29uc3QoXCJsZW5cIiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfS5sZW5ndGhgKTtcbiAgICBpZiAoc2NoZW1hID09PSBmYWxzZSkge1xuICAgICAgICBjeHQuc2V0UGFyYW1zKHsgbGVuOiBpdGVtcy5sZW5ndGggfSk7XG4gICAgICAgIGN4dC5wYXNzKCgwLCBjb2RlZ2VuXzEuXykgYCR7bGVufSA8PSAke2l0ZW1zLmxlbmd0aH1gKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHNjaGVtYSA9PSBcIm9iamVjdFwiICYmICEoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoZW1hKSkge1xuICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi52YXIoXCJ2YWxpZFwiLCAoMCwgY29kZWdlbl8xLl8pIGAke2xlbn0gPD0gJHtpdGVtcy5sZW5ndGh9YCk7IC8vIFRPRE8gdmFyXG4gICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLm5vdCkodmFsaWQpLCAoKSA9PiB2YWxpZGF0ZUl0ZW1zKHZhbGlkKSk7XG4gICAgICAgIGN4dC5vayh2YWxpZCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlSXRlbXModmFsaWQpIHtcbiAgICAgICAgZ2VuLmZvclJhbmdlKFwiaVwiLCBpdGVtcy5sZW5ndGgsIGxlbiwgKGkpID0+IHtcbiAgICAgICAgICAgIGN4dC5zdWJzY2hlbWEoeyBrZXl3b3JkLCBkYXRhUHJvcDogaSwgZGF0YVByb3BUeXBlOiB1dGlsXzEuVHlwZS5OdW0gfSwgdmFsaWQpO1xuICAgICAgICAgICAgaWYgKCFpdC5hbGxFcnJvcnMpXG4gICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEubm90KSh2YWxpZCksICgpID0+IGdlbi5icmVhaygpKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy52YWxpZGF0ZUFkZGl0aW9uYWxJdGVtcyA9IHZhbGlkYXRlQWRkaXRpb25hbEl0ZW1zO1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWRkaXRpb25hbEl0ZW1zLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4uL2NvZGVcIik7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgbmFtZXNfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL25hbWVzXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6IFwibXVzdCBOT1QgaGF2ZSBhZGRpdGlvbmFsIHByb3BlcnRpZXNcIixcbiAgICBwYXJhbXM6ICh7IHBhcmFtcyB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7YWRkaXRpb25hbFByb3BlcnR5OiAke3BhcmFtcy5hZGRpdGlvbmFsUHJvcGVydHl9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiYWRkaXRpb25hbFByb3BlcnRpZXNcIixcbiAgICB0eXBlOiBbXCJvYmplY3RcIl0sXG4gICAgc2NoZW1hVHlwZTogW1wiYm9vbGVhblwiLCBcIm9iamVjdFwiXSxcbiAgICBhbGxvd1VuZGVmaW5lZDogdHJ1ZSxcbiAgICB0cmFja0Vycm9yczogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBwYXJlbnRTY2hlbWEsIGRhdGEsIGVycnNDb3VudCwgaXQgfSA9IGN4dDtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICghZXJyc0NvdW50KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWp2IGltcGxlbWVudGF0aW9uIGVycm9yXCIpO1xuICAgICAgICBjb25zdCB7IGFsbEVycm9ycywgb3B0cyB9ID0gaXQ7XG4gICAgICAgIGl0LnByb3BzID0gdHJ1ZTtcbiAgICAgICAgaWYgKG9wdHMucmVtb3ZlQWRkaXRpb25hbCAhPT0gXCJhbGxcIiAmJiAoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoZW1hKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgcHJvcHMgPSAoMCwgY29kZV8xLmFsbFNjaGVtYVByb3BlcnRpZXMpKHBhcmVudFNjaGVtYS5wcm9wZXJ0aWVzKTtcbiAgICAgICAgY29uc3QgcGF0UHJvcHMgPSAoMCwgY29kZV8xLmFsbFNjaGVtYVByb3BlcnRpZXMpKHBhcmVudFNjaGVtYS5wYXR0ZXJuUHJvcGVydGllcyk7XG4gICAgICAgIGNoZWNrQWRkaXRpb25hbFByb3BlcnRpZXMoKTtcbiAgICAgICAgY3h0Lm9rKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZXJyc0NvdW50fSA9PT0gJHtuYW1lc18xLmRlZmF1bHQuZXJyb3JzfWApO1xuICAgICAgICBmdW5jdGlvbiBjaGVja0FkZGl0aW9uYWxQcm9wZXJ0aWVzKCkge1xuICAgICAgICAgICAgZ2VuLmZvckluKFwia2V5XCIsIGRhdGEsIChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXByb3BzLmxlbmd0aCAmJiAhcGF0UHJvcHMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsUHJvcGVydHlDb2RlKGtleSk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBnZW4uaWYoaXNBZGRpdGlvbmFsKGtleSksICgpID0+IGFkZGl0aW9uYWxQcm9wZXJ0eUNvZGUoa2V5KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBpc0FkZGl0aW9uYWwoa2V5KSB7XG4gICAgICAgICAgICBsZXQgZGVmaW5lZFByb3A7XG4gICAgICAgICAgICBpZiAocHJvcHMubGVuZ3RoID4gOCkge1xuICAgICAgICAgICAgICAgIC8vIFRPRE8gbWF5YmUgYW4gb3B0aW9uIGluc3RlYWQgb2YgaGFyZC1jb2RlZCA4P1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BzU2NoZW1hID0gKDAsIHV0aWxfMS5zY2hlbWFSZWZPclZhbCkoaXQsIHBhcmVudFNjaGVtYS5wcm9wZXJ0aWVzLCBcInByb3BlcnRpZXNcIik7XG4gICAgICAgICAgICAgICAgZGVmaW5lZFByb3AgPSAoMCwgY29kZV8xLmlzT3duUHJvcGVydHkpKGdlbiwgcHJvcHNTY2hlbWEsIGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBkZWZpbmVkUHJvcCA9ICgwLCBjb2RlZ2VuXzEub3IpKC4uLnByb3BzLm1hcCgocCkgPT4gKDAsIGNvZGVnZW5fMS5fKSBgJHtrZXl9ID09PSAke3B9YCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVmaW5lZFByb3AgPSBjb2RlZ2VuXzEubmlsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhdFByb3BzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGRlZmluZWRQcm9wID0gKDAsIGNvZGVnZW5fMS5vcikoZGVmaW5lZFByb3AsIC4uLnBhdFByb3BzLm1hcCgocCkgPT4gKDAsIGNvZGVnZW5fMS5fKSBgJHsoMCwgY29kZV8xLnVzZVBhdHRlcm4pKGN4dCwgcCl9LnRlc3QoJHtrZXl9KWApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLm5vdCkoZGVmaW5lZFByb3ApO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGRlbGV0ZUFkZGl0aW9uYWwoa2V5KSB7XG4gICAgICAgICAgICBnZW4uY29kZSgoMCwgY29kZWdlbl8xLl8pIGBkZWxldGUgJHtkYXRhfVske2tleX1dYCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYWRkaXRpb25hbFByb3BlcnR5Q29kZShrZXkpIHtcbiAgICAgICAgICAgIGlmIChvcHRzLnJlbW92ZUFkZGl0aW9uYWwgPT09IFwiYWxsXCIgfHwgKG9wdHMucmVtb3ZlQWRkaXRpb25hbCAmJiBzY2hlbWEgPT09IGZhbHNlKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZUFkZGl0aW9uYWwoa2V5KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2NoZW1hID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGN4dC5zZXRQYXJhbXMoeyBhZGRpdGlvbmFsUHJvcGVydHk6IGtleSB9KTtcbiAgICAgICAgICAgICAgICBjeHQuZXJyb3IoKTtcbiAgICAgICAgICAgICAgICBpZiAoIWFsbEVycm9ycylcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmJyZWFrKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzY2hlbWEgPT0gXCJvYmplY3RcIiAmJiAhKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaGVtYSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5uYW1lKFwidmFsaWRcIik7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMucmVtb3ZlQWRkaXRpb25hbCA9PT0gXCJmYWlsaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlBZGRpdGlvbmFsU2NoZW1hKGtleSwgdmFsaWQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEubm90KSh2YWxpZCksICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN4dC5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlQWRkaXRpb25hbChrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGx5QWRkaXRpb25hbFNjaGVtYShrZXksIHZhbGlkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhbGxFcnJvcnMpXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKHZhbGlkKSwgKCkgPT4gZ2VuLmJyZWFrKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBhcHBseUFkZGl0aW9uYWxTY2hlbWEoa2V5LCB2YWxpZCwgZXJyb3JzKSB7XG4gICAgICAgICAgICBjb25zdCBzdWJzY2hlbWEgPSB7XG4gICAgICAgICAgICAgICAga2V5d29yZDogXCJhZGRpdGlvbmFsUHJvcGVydGllc1wiLFxuICAgICAgICAgICAgICAgIGRhdGFQcm9wOiBrZXksXG4gICAgICAgICAgICAgICAgZGF0YVByb3BUeXBlOiB1dGlsXzEuVHlwZS5TdHIsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGVycm9ycyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHN1YnNjaGVtYSwge1xuICAgICAgICAgICAgICAgICAgICBjb21wb3NpdGVSdWxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFcnJvcnM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBhbGxFcnJvcnM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3h0LnN1YnNjaGVtYShzdWJzY2hlbWEsIHZhbGlkKTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWRkaXRpb25hbFByb3BlcnRpZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiYWxsT2ZcIixcbiAgICBzY2hlbWFUeXBlOiBcImFycmF5XCIsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIHNjaGVtYSwgaXQgfSA9IGN4dDtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShzY2hlbWEpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWp2IGltcGxlbWVudGF0aW9uIGVycm9yXCIpO1xuICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5uYW1lKFwidmFsaWRcIik7XG4gICAgICAgIHNjaGVtYS5mb3JFYWNoKChzY2gsIGkpID0+IHtcbiAgICAgICAgICAgIGlmICgoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoKSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBzY2hDeHQgPSBjeHQuc3Vic2NoZW1hKHsga2V5d29yZDogXCJhbGxPZlwiLCBzY2hlbWFQcm9wOiBpIH0sIHZhbGlkKTtcbiAgICAgICAgICAgIGN4dC5vayh2YWxpZCk7XG4gICAgICAgICAgICBjeHQubWVyZ2VFdmFsdWF0ZWQoc2NoQ3h0KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hbGxPZi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVfMSA9IHJlcXVpcmUoXCIuLi9jb2RlXCIpO1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiYW55T2ZcIixcbiAgICBzY2hlbWFUeXBlOiBcImFycmF5XCIsXG4gICAgdHJhY2tFcnJvcnM6IHRydWUsXG4gICAgY29kZTogY29kZV8xLnZhbGlkYXRlVW5pb24sXG4gICAgZXJyb3I6IHsgbWVzc2FnZTogXCJtdXN0IG1hdGNoIGEgc2NoZW1hIGluIGFueU9mXCIgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hbnlPZi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsgcGFyYW1zOiB7IG1pbiwgbWF4IH0gfSkgPT4gbWF4ID09PSB1bmRlZmluZWRcbiAgICAgICAgPyAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgY29udGFpbiBhdCBsZWFzdCAke21pbn0gdmFsaWQgaXRlbShzKWBcbiAgICAgICAgOiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgY29udGFpbiBhdCBsZWFzdCAke21pbn0gYW5kIG5vIG1vcmUgdGhhbiAke21heH0gdmFsaWQgaXRlbShzKWAsXG4gICAgcGFyYW1zOiAoeyBwYXJhbXM6IHsgbWluLCBtYXggfSB9KSA9PiBtYXggPT09IHVuZGVmaW5lZCA/ICgwLCBjb2RlZ2VuXzEuXykgYHttaW5Db250YWluczogJHttaW59fWAgOiAoMCwgY29kZWdlbl8xLl8pIGB7bWluQ29udGFpbnM6ICR7bWlufSwgbWF4Q29udGFpbnM6ICR7bWF4fX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcImNvbnRhaW5zXCIsXG4gICAgdHlwZTogXCJhcnJheVwiLFxuICAgIHNjaGVtYVR5cGU6IFtcIm9iamVjdFwiLCBcImJvb2xlYW5cIl0sXG4gICAgYmVmb3JlOiBcInVuaXF1ZUl0ZW1zXCIsXG4gICAgdHJhY2tFcnJvcnM6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIHNjaGVtYSwgcGFyZW50U2NoZW1hLCBkYXRhLCBpdCB9ID0gY3h0O1xuICAgICAgICBsZXQgbWluO1xuICAgICAgICBsZXQgbWF4O1xuICAgICAgICBjb25zdCB7IG1pbkNvbnRhaW5zLCBtYXhDb250YWlucyB9ID0gcGFyZW50U2NoZW1hO1xuICAgICAgICBpZiAoaXQub3B0cy5uZXh0KSB7XG4gICAgICAgICAgICBtaW4gPSBtaW5Db250YWlucyA9PT0gdW5kZWZpbmVkID8gMSA6IG1pbkNvbnRhaW5zO1xuICAgICAgICAgICAgbWF4ID0gbWF4Q29udGFpbnM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtaW4gPSAxO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxlbiA9IGdlbi5jb25zdChcImxlblwiLCAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9Lmxlbmd0aGApO1xuICAgICAgICBjeHQuc2V0UGFyYW1zKHsgbWluLCBtYXggfSk7XG4gICAgICAgIGlmIChtYXggPT09IHVuZGVmaW5lZCAmJiBtaW4gPT09IDApIHtcbiAgICAgICAgICAgICgwLCB1dGlsXzEuY2hlY2tTdHJpY3RNb2RlKShpdCwgYFwibWluQ29udGFpbnNcIiA9PSAwIHdpdGhvdXQgXCJtYXhDb250YWluc1wiOiBcImNvbnRhaW5zXCIga2V5d29yZCBpZ25vcmVkYCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1heCAhPT0gdW5kZWZpbmVkICYmIG1pbiA+IG1heCkge1xuICAgICAgICAgICAgKDAsIHV0aWxfMS5jaGVja1N0cmljdE1vZGUpKGl0LCBgXCJtaW5Db250YWluc1wiID4gXCJtYXhDb250YWluc1wiIGlzIGFsd2F5cyBpbnZhbGlkYCk7XG4gICAgICAgICAgICBjeHQuZmFpbCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoZW1hKSkge1xuICAgICAgICAgICAgbGV0IGNvbmQgPSAoMCwgY29kZWdlbl8xLl8pIGAke2xlbn0gPj0gJHttaW59YDtcbiAgICAgICAgICAgIGlmIChtYXggIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBjb25kID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtjb25kfSAmJiAke2xlbn0gPD0gJHttYXh9YDtcbiAgICAgICAgICAgIGN4dC5wYXNzKGNvbmQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGl0Lml0ZW1zID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgdmFsaWQgPSBnZW4ubmFtZShcInZhbGlkXCIpO1xuICAgICAgICBpZiAobWF4ID09PSB1bmRlZmluZWQgJiYgbWluID09PSAxKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZUl0ZW1zKHZhbGlkLCAoKSA9PiBnZW4uaWYodmFsaWQsICgpID0+IGdlbi5icmVhaygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobWluID09PSAwKSB7XG4gICAgICAgICAgICBnZW4ubGV0KHZhbGlkLCB0cnVlKTtcbiAgICAgICAgICAgIGlmIChtYXggIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfS5sZW5ndGggPiAwYCwgdmFsaWRhdGVJdGVtc1dpdGhDb3VudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnZW4ubGV0KHZhbGlkLCBmYWxzZSk7XG4gICAgICAgICAgICB2YWxpZGF0ZUl0ZW1zV2l0aENvdW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgY3h0LnJlc3VsdCh2YWxpZCwgKCkgPT4gY3h0LnJlc2V0KCkpO1xuICAgICAgICBmdW5jdGlvbiB2YWxpZGF0ZUl0ZW1zV2l0aENvdW50KCkge1xuICAgICAgICAgICAgY29uc3Qgc2NoVmFsaWQgPSBnZW4ubmFtZShcIl92YWxpZFwiKTtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gZ2VuLmxldChcImNvdW50XCIsIDApO1xuICAgICAgICAgICAgdmFsaWRhdGVJdGVtcyhzY2hWYWxpZCwgKCkgPT4gZ2VuLmlmKHNjaFZhbGlkLCAoKSA9PiBjaGVja0xpbWl0cyhjb3VudCkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB2YWxpZGF0ZUl0ZW1zKF92YWxpZCwgYmxvY2spIHtcbiAgICAgICAgICAgIGdlbi5mb3JSYW5nZShcImlcIiwgMCwgbGVuLCAoaSkgPT4ge1xuICAgICAgICAgICAgICAgIGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICAgICAgICAgICAgICBrZXl3b3JkOiBcImNvbnRhaW5zXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFQcm9wOiBpLFxuICAgICAgICAgICAgICAgICAgICBkYXRhUHJvcFR5cGU6IHV0aWxfMS5UeXBlLk51bSxcbiAgICAgICAgICAgICAgICAgICAgY29tcG9zaXRlUnVsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LCBfdmFsaWQpO1xuICAgICAgICAgICAgICAgIGJsb2NrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjaGVja0xpbWl0cyhjb3VudCkge1xuICAgICAgICAgICAgZ2VuLmNvZGUoKDAsIGNvZGVnZW5fMS5fKSBgJHtjb3VudH0rK2ApO1xuICAgICAgICAgICAgaWYgKG1heCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7Y291bnR9ID49ICR7bWlufWAsICgpID0+IGdlbi5hc3NpZ24odmFsaWQsIHRydWUpLmJyZWFrKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7Y291bnR9ID4gJHttYXh9YCwgKCkgPT4gZ2VuLmFzc2lnbih2YWxpZCwgZmFsc2UpLmJyZWFrKCkpO1xuICAgICAgICAgICAgICAgIGlmIChtaW4gPT09IDEpXG4gICAgICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24odmFsaWQsIHRydWUpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7Y291bnR9ID49ICR7bWlufWAsICgpID0+IGdlbi5hc3NpZ24odmFsaWQsIHRydWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29udGFpbnMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnZhbGlkYXRlU2NoZW1hRGVwcyA9IGV4cG9ydHMudmFsaWRhdGVQcm9wZXJ0eURlcHMgPSBleHBvcnRzLmVycm9yID0gdm9pZCAwO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi4vY29kZVwiKTtcbmV4cG9ydHMuZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsgcGFyYW1zOiB7IHByb3BlcnR5LCBkZXBzQ291bnQsIGRlcHMgfSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHByb3BlcnR5X2llcyA9IGRlcHNDb3VudCA9PT0gMSA/IFwicHJvcGVydHlcIiA6IFwicHJvcGVydGllc1wiO1xuICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IGhhdmUgJHtwcm9wZXJ0eV9pZXN9ICR7ZGVwc30gd2hlbiBwcm9wZXJ0eSAke3Byb3BlcnR5fSBpcyBwcmVzZW50YDtcbiAgICB9LFxuICAgIHBhcmFtczogKHsgcGFyYW1zOiB7IHByb3BlcnR5LCBkZXBzQ291bnQsIGRlcHMsIG1pc3NpbmdQcm9wZXJ0eSB9IH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHtwcm9wZXJ0eTogJHtwcm9wZXJ0eX0sXG4gICAgbWlzc2luZ1Byb3BlcnR5OiAke21pc3NpbmdQcm9wZXJ0eX0sXG4gICAgZGVwc0NvdW50OiAke2RlcHNDb3VudH0sXG4gICAgZGVwczogJHtkZXBzfX1gLCAvLyBUT0RPIGNoYW5nZSB0byByZWZlcmVuY2Vcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJkZXBlbmRlbmNpZXNcIixcbiAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgIHNjaGVtYVR5cGU6IFwib2JqZWN0XCIsXG4gICAgZXJyb3I6IGV4cG9ydHMuZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgW3Byb3BEZXBzLCBzY2hEZXBzXSA9IHNwbGl0RGVwZW5kZW5jaWVzKGN4dCk7XG4gICAgICAgIHZhbGlkYXRlUHJvcGVydHlEZXBzKGN4dCwgcHJvcERlcHMpO1xuICAgICAgICB2YWxpZGF0ZVNjaGVtYURlcHMoY3h0LCBzY2hEZXBzKTtcbiAgICB9LFxufTtcbmZ1bmN0aW9uIHNwbGl0RGVwZW5kZW5jaWVzKHsgc2NoZW1hIH0pIHtcbiAgICBjb25zdCBwcm9wZXJ0eURlcHMgPSB7fTtcbiAgICBjb25zdCBzY2hlbWFEZXBzID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgaW4gc2NoZW1hKSB7XG4gICAgICAgIGlmIChrZXkgPT09IFwiX19wcm90b19fXCIpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgY29uc3QgZGVwcyA9IEFycmF5LmlzQXJyYXkoc2NoZW1hW2tleV0pID8gcHJvcGVydHlEZXBzIDogc2NoZW1hRGVwcztcbiAgICAgICAgZGVwc1trZXldID0gc2NoZW1hW2tleV07XG4gICAgfVxuICAgIHJldHVybiBbcHJvcGVydHlEZXBzLCBzY2hlbWFEZXBzXTtcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcGVydHlEZXBzKGN4dCwgcHJvcGVydHlEZXBzID0gY3h0LnNjaGVtYSkge1xuICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCBpdCB9ID0gY3h0O1xuICAgIGlmIChPYmplY3Qua2V5cyhwcm9wZXJ0eURlcHMpLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IG1pc3NpbmcgPSBnZW4ubGV0KFwibWlzc2luZ1wiKTtcbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gcHJvcGVydHlEZXBzKSB7XG4gICAgICAgIGNvbnN0IGRlcHMgPSBwcm9wZXJ0eURlcHNbcHJvcF07XG4gICAgICAgIGlmIChkZXBzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCBoYXNQcm9wZXJ0eSA9ICgwLCBjb2RlXzEucHJvcGVydHlJbkRhdGEpKGdlbiwgZGF0YSwgcHJvcCwgaXQub3B0cy5vd25Qcm9wZXJ0aWVzKTtcbiAgICAgICAgY3h0LnNldFBhcmFtcyh7XG4gICAgICAgICAgICBwcm9wZXJ0eTogcHJvcCxcbiAgICAgICAgICAgIGRlcHNDb3VudDogZGVwcy5sZW5ndGgsXG4gICAgICAgICAgICBkZXBzOiBkZXBzLmpvaW4oXCIsIFwiKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpdC5hbGxFcnJvcnMpIHtcbiAgICAgICAgICAgIGdlbi5pZihoYXNQcm9wZXJ0eSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZGVwUHJvcCBvZiBkZXBzKSB7XG4gICAgICAgICAgICAgICAgICAgICgwLCBjb2RlXzEuY2hlY2tSZXBvcnRNaXNzaW5nUHJvcCkoY3h0LCBkZXBQcm9wKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2hhc1Byb3BlcnR5fSAmJiAoJHsoMCwgY29kZV8xLmNoZWNrTWlzc2luZ1Byb3ApKGN4dCwgZGVwcywgbWlzc2luZyl9KWApO1xuICAgICAgICAgICAgKDAsIGNvZGVfMS5yZXBvcnRNaXNzaW5nUHJvcCkoY3h0LCBtaXNzaW5nKTtcbiAgICAgICAgICAgIGdlbi5lbHNlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnZhbGlkYXRlUHJvcGVydHlEZXBzID0gdmFsaWRhdGVQcm9wZXJ0eURlcHM7XG5mdW5jdGlvbiB2YWxpZGF0ZVNjaGVtYURlcHMoY3h0LCBzY2hlbWFEZXBzID0gY3h0LnNjaGVtYSkge1xuICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCBrZXl3b3JkLCBpdCB9ID0gY3h0O1xuICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gc2NoZW1hRGVwcykge1xuICAgICAgICBpZiAoKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaGVtYURlcHNbcHJvcF0pKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGdlbi5pZigoMCwgY29kZV8xLnByb3BlcnR5SW5EYXRhKShnZW4sIGRhdGEsIHByb3AsIGl0Lm9wdHMub3duUHJvcGVydGllcyksICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNjaEN4dCA9IGN4dC5zdWJzY2hlbWEoeyBrZXl3b3JkLCBzY2hlbWFQcm9wOiBwcm9wIH0sIHZhbGlkKTtcbiAgICAgICAgICAgIGN4dC5tZXJnZVZhbGlkRXZhbHVhdGVkKHNjaEN4dCwgdmFsaWQpO1xuICAgICAgICB9LCAoKSA9PiBnZW4udmFyKHZhbGlkLCB0cnVlKSAvLyBUT0RPIHZhclxuICAgICAgICApO1xuICAgICAgICBjeHQub2sodmFsaWQpO1xuICAgIH1cbn1cbmV4cG9ydHMudmFsaWRhdGVTY2hlbWFEZXBzID0gdmFsaWRhdGVTY2hlbWFEZXBzO1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVwZW5kZW5jaWVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZGVwZW5kZW5jaWVzXzEgPSByZXF1aXJlKFwiLi9kZXBlbmRlbmNpZXNcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJkZXBlbmRlbnRTY2hlbWFzXCIsXG4gICAgdHlwZTogXCJvYmplY3RcIixcbiAgICBzY2hlbWFUeXBlOiBcIm9iamVjdFwiLFxuICAgIGNvZGU6IChjeHQpID0+ICgwLCBkZXBlbmRlbmNpZXNfMS52YWxpZGF0ZVNjaGVtYURlcHMpKGN4dCksXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVwZW5kZW50U2NoZW1hcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsgcGFyYW1zIH0pID0+ICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBtYXRjaCBcIiR7cGFyYW1zLmlmQ2xhdXNlfVwiIHNjaGVtYWAsXG4gICAgcGFyYW1zOiAoeyBwYXJhbXMgfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge2ZhaWxpbmdLZXl3b3JkOiAke3BhcmFtcy5pZkNsYXVzZX19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJpZlwiLFxuICAgIHNjaGVtYVR5cGU6IFtcIm9iamVjdFwiLCBcImJvb2xlYW5cIl0sXG4gICAgdHJhY2tFcnJvcnM6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIHBhcmVudFNjaGVtYSwgaXQgfSA9IGN4dDtcbiAgICAgICAgaWYgKHBhcmVudFNjaGVtYS50aGVuID09PSB1bmRlZmluZWQgJiYgcGFyZW50U2NoZW1hLmVsc2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgKDAsIHV0aWxfMS5jaGVja1N0cmljdE1vZGUpKGl0LCAnXCJpZlwiIHdpdGhvdXQgXCJ0aGVuXCIgYW5kIFwiZWxzZVwiIGlzIGlnbm9yZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBoYXNUaGVuID0gaGFzU2NoZW1hKGl0LCBcInRoZW5cIik7XG4gICAgICAgIGNvbnN0IGhhc0Vsc2UgPSBoYXNTY2hlbWEoaXQsIFwiZWxzZVwiKTtcbiAgICAgICAgaWYgKCFoYXNUaGVuICYmICFoYXNFbHNlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5sZXQoXCJ2YWxpZFwiLCB0cnVlKTtcbiAgICAgICAgY29uc3Qgc2NoVmFsaWQgPSBnZW4ubmFtZShcIl92YWxpZFwiKTtcbiAgICAgICAgdmFsaWRhdGVJZigpO1xuICAgICAgICBjeHQucmVzZXQoKTtcbiAgICAgICAgaWYgKGhhc1RoZW4gJiYgaGFzRWxzZSkge1xuICAgICAgICAgICAgY29uc3QgaWZDbGF1c2UgPSBnZW4ubGV0KFwiaWZDbGF1c2VcIik7XG4gICAgICAgICAgICBjeHQuc2V0UGFyYW1zKHsgaWZDbGF1c2UgfSk7XG4gICAgICAgICAgICBnZW4uaWYoc2NoVmFsaWQsIHZhbGlkYXRlQ2xhdXNlKFwidGhlblwiLCBpZkNsYXVzZSksIHZhbGlkYXRlQ2xhdXNlKFwiZWxzZVwiLCBpZkNsYXVzZSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGhhc1RoZW4pIHtcbiAgICAgICAgICAgIGdlbi5pZihzY2hWYWxpZCwgdmFsaWRhdGVDbGF1c2UoXCJ0aGVuXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLm5vdCkoc2NoVmFsaWQpLCB2YWxpZGF0ZUNsYXVzZShcImVsc2VcIikpO1xuICAgICAgICB9XG4gICAgICAgIGN4dC5wYXNzKHZhbGlkLCAoKSA9PiBjeHQuZXJyb3IodHJ1ZSkpO1xuICAgICAgICBmdW5jdGlvbiB2YWxpZGF0ZUlmKCkge1xuICAgICAgICAgICAgY29uc3Qgc2NoQ3h0ID0gY3h0LnN1YnNjaGVtYSh7XG4gICAgICAgICAgICAgICAga2V5d29yZDogXCJpZlwiLFxuICAgICAgICAgICAgICAgIGNvbXBvc2l0ZVJ1bGU6IHRydWUsXG4gICAgICAgICAgICAgICAgY3JlYXRlRXJyb3JzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhbGxFcnJvcnM6IGZhbHNlLFxuICAgICAgICAgICAgfSwgc2NoVmFsaWQpO1xuICAgICAgICAgICAgY3h0Lm1lcmdlRXZhbHVhdGVkKHNjaEN4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGVDbGF1c2Uoa2V5d29yZCwgaWZDbGF1c2UpIHtcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2NoQ3h0ID0gY3h0LnN1YnNjaGVtYSh7IGtleXdvcmQgfSwgc2NoVmFsaWQpO1xuICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24odmFsaWQsIHNjaFZhbGlkKTtcbiAgICAgICAgICAgICAgICBjeHQubWVyZ2VWYWxpZEV2YWx1YXRlZChzY2hDeHQsIHZhbGlkKTtcbiAgICAgICAgICAgICAgICBpZiAoaWZDbGF1c2UpXG4gICAgICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24oaWZDbGF1c2UsICgwLCBjb2RlZ2VuXzEuXykgYCR7a2V5d29yZH1gKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGN4dC5zZXRQYXJhbXMoeyBpZkNsYXVzZToga2V5d29yZCB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmZ1bmN0aW9uIGhhc1NjaGVtYShpdCwga2V5d29yZCkge1xuICAgIGNvbnN0IHNjaGVtYSA9IGl0LnNjaGVtYVtrZXl3b3JkXTtcbiAgICByZXR1cm4gc2NoZW1hICE9PSB1bmRlZmluZWQgJiYgISgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWEpO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aWYuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhZGRpdGlvbmFsSXRlbXNfMSA9IHJlcXVpcmUoXCIuL2FkZGl0aW9uYWxJdGVtc1wiKTtcbmNvbnN0IHByZWZpeEl0ZW1zXzEgPSByZXF1aXJlKFwiLi9wcmVmaXhJdGVtc1wiKTtcbmNvbnN0IGl0ZW1zXzEgPSByZXF1aXJlKFwiLi9pdGVtc1wiKTtcbmNvbnN0IGl0ZW1zMjAyMF8xID0gcmVxdWlyZShcIi4vaXRlbXMyMDIwXCIpO1xuY29uc3QgY29udGFpbnNfMSA9IHJlcXVpcmUoXCIuL2NvbnRhaW5zXCIpO1xuY29uc3QgZGVwZW5kZW5jaWVzXzEgPSByZXF1aXJlKFwiLi9kZXBlbmRlbmNpZXNcIik7XG5jb25zdCBwcm9wZXJ0eU5hbWVzXzEgPSByZXF1aXJlKFwiLi9wcm9wZXJ0eU5hbWVzXCIpO1xuY29uc3QgYWRkaXRpb25hbFByb3BlcnRpZXNfMSA9IHJlcXVpcmUoXCIuL2FkZGl0aW9uYWxQcm9wZXJ0aWVzXCIpO1xuY29uc3QgcHJvcGVydGllc18xID0gcmVxdWlyZShcIi4vcHJvcGVydGllc1wiKTtcbmNvbnN0IHBhdHRlcm5Qcm9wZXJ0aWVzXzEgPSByZXF1aXJlKFwiLi9wYXR0ZXJuUHJvcGVydGllc1wiKTtcbmNvbnN0IG5vdF8xID0gcmVxdWlyZShcIi4vbm90XCIpO1xuY29uc3QgYW55T2ZfMSA9IHJlcXVpcmUoXCIuL2FueU9mXCIpO1xuY29uc3Qgb25lT2ZfMSA9IHJlcXVpcmUoXCIuL29uZU9mXCIpO1xuY29uc3QgYWxsT2ZfMSA9IHJlcXVpcmUoXCIuL2FsbE9mXCIpO1xuY29uc3QgaWZfMSA9IHJlcXVpcmUoXCIuL2lmXCIpO1xuY29uc3QgdGhlbkVsc2VfMSA9IHJlcXVpcmUoXCIuL3RoZW5FbHNlXCIpO1xuZnVuY3Rpb24gZ2V0QXBwbGljYXRvcihkcmFmdDIwMjAgPSBmYWxzZSkge1xuICAgIGNvbnN0IGFwcGxpY2F0b3IgPSBbXG4gICAgICAgIC8vIGFueVxuICAgICAgICBub3RfMS5kZWZhdWx0LFxuICAgICAgICBhbnlPZl8xLmRlZmF1bHQsXG4gICAgICAgIG9uZU9mXzEuZGVmYXVsdCxcbiAgICAgICAgYWxsT2ZfMS5kZWZhdWx0LFxuICAgICAgICBpZl8xLmRlZmF1bHQsXG4gICAgICAgIHRoZW5FbHNlXzEuZGVmYXVsdCxcbiAgICAgICAgLy8gb2JqZWN0XG4gICAgICAgIHByb3BlcnR5TmFtZXNfMS5kZWZhdWx0LFxuICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllc18xLmRlZmF1bHQsXG4gICAgICAgIGRlcGVuZGVuY2llc18xLmRlZmF1bHQsXG4gICAgICAgIHByb3BlcnRpZXNfMS5kZWZhdWx0LFxuICAgICAgICBwYXR0ZXJuUHJvcGVydGllc18xLmRlZmF1bHQsXG4gICAgXTtcbiAgICAvLyBhcnJheVxuICAgIGlmIChkcmFmdDIwMjApXG4gICAgICAgIGFwcGxpY2F0b3IucHVzaChwcmVmaXhJdGVtc18xLmRlZmF1bHQsIGl0ZW1zMjAyMF8xLmRlZmF1bHQpO1xuICAgIGVsc2VcbiAgICAgICAgYXBwbGljYXRvci5wdXNoKGFkZGl0aW9uYWxJdGVtc18xLmRlZmF1bHQsIGl0ZW1zXzEuZGVmYXVsdCk7XG4gICAgYXBwbGljYXRvci5wdXNoKGNvbnRhaW5zXzEuZGVmYXVsdCk7XG4gICAgcmV0dXJuIGFwcGxpY2F0b3I7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBnZXRBcHBsaWNhdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnZhbGlkYXRlVHVwbGUgPSB2b2lkIDA7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGNvZGVfMSA9IHJlcXVpcmUoXCIuLi9jb2RlXCIpO1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiaXRlbXNcIixcbiAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgc2NoZW1hVHlwZTogW1wib2JqZWN0XCIsIFwiYXJyYXlcIiwgXCJib29sZWFuXCJdLFxuICAgIGJlZm9yZTogXCJ1bmlxdWVJdGVtc1wiLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgc2NoZW1hLCBpdCB9ID0gY3h0O1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEpKVxuICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRlVHVwbGUoY3h0LCBcImFkZGl0aW9uYWxJdGVtc1wiLCBzY2hlbWEpO1xuICAgICAgICBpdC5pdGVtcyA9IHRydWU7XG4gICAgICAgIGlmICgoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoZW1hKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY3h0Lm9rKCgwLCBjb2RlXzEudmFsaWRhdGVBcnJheSkoY3h0KSk7XG4gICAgfSxcbn07XG5mdW5jdGlvbiB2YWxpZGF0ZVR1cGxlKGN4dCwgZXh0cmFJdGVtcywgc2NoQXJyID0gY3h0LnNjaGVtYSkge1xuICAgIGNvbnN0IHsgZ2VuLCBwYXJlbnRTY2hlbWEsIGRhdGEsIGtleXdvcmQsIGl0IH0gPSBjeHQ7XG4gICAgY2hlY2tTdHJpY3RUdXBsZShwYXJlbnRTY2hlbWEpO1xuICAgIGlmIChpdC5vcHRzLnVuZXZhbHVhdGVkICYmIHNjaEFyci5sZW5ndGggJiYgaXQuaXRlbXMgIT09IHRydWUpIHtcbiAgICAgICAgaXQuaXRlbXMgPSB1dGlsXzEubWVyZ2VFdmFsdWF0ZWQuaXRlbXMoZ2VuLCBzY2hBcnIubGVuZ3RoLCBpdC5pdGVtcyk7XG4gICAgfVxuICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICBjb25zdCBsZW4gPSBnZW4uY29uc3QoXCJsZW5cIiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfS5sZW5ndGhgKTtcbiAgICBzY2hBcnIuZm9yRWFjaCgoc2NoLCBpKSA9PiB7XG4gICAgICAgIGlmICgoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7bGVufSA+ICR7aX1gLCAoKSA9PiBjeHQuc3Vic2NoZW1hKHtcbiAgICAgICAgICAgIGtleXdvcmQsXG4gICAgICAgICAgICBzY2hlbWFQcm9wOiBpLFxuICAgICAgICAgICAgZGF0YVByb3A6IGksXG4gICAgICAgIH0sIHZhbGlkKSk7XG4gICAgICAgIGN4dC5vayh2YWxpZCk7XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gY2hlY2tTdHJpY3RUdXBsZShzY2gpIHtcbiAgICAgICAgY29uc3QgeyBvcHRzLCBlcnJTY2hlbWFQYXRoIH0gPSBpdDtcbiAgICAgICAgY29uc3QgbCA9IHNjaEFyci5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGZ1bGxUdXBsZSA9IGwgPT09IHNjaC5taW5JdGVtcyAmJiAobCA9PT0gc2NoLm1heEl0ZW1zIHx8IHNjaFtleHRyYUl0ZW1zXSA9PT0gZmFsc2UpO1xuICAgICAgICBpZiAob3B0cy5zdHJpY3RUdXBsZXMgJiYgIWZ1bGxUdXBsZSkge1xuICAgICAgICAgICAgY29uc3QgbXNnID0gYFwiJHtrZXl3b3JkfVwiIGlzICR7bH0tdHVwbGUsIGJ1dCBtaW5JdGVtcyBvciBtYXhJdGVtcy8ke2V4dHJhSXRlbXN9IGFyZSBub3Qgc3BlY2lmaWVkIG9yIGRpZmZlcmVudCBhdCBwYXRoIFwiJHtlcnJTY2hlbWFQYXRofVwiYDtcbiAgICAgICAgICAgICgwLCB1dGlsXzEuY2hlY2tTdHJpY3RNb2RlKShpdCwgbXNnLCBvcHRzLnN0cmljdFR1cGxlcyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnZhbGlkYXRlVHVwbGUgPSB2YWxpZGF0ZVR1cGxlO1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXRlbXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGNvZGVfMSA9IHJlcXVpcmUoXCIuLi9jb2RlXCIpO1xuY29uc3QgYWRkaXRpb25hbEl0ZW1zXzEgPSByZXF1aXJlKFwiLi9hZGRpdGlvbmFsSXRlbXNcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBwYXJhbXM6IHsgbGVuIH0gfSkgPT4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IE5PVCBoYXZlIG1vcmUgdGhhbiAke2xlbn0gaXRlbXNgLFxuICAgIHBhcmFtczogKHsgcGFyYW1zOiB7IGxlbiB9IH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHtsaW1pdDogJHtsZW59fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiaXRlbXNcIixcbiAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgc2NoZW1hVHlwZTogW1wib2JqZWN0XCIsIFwiYm9vbGVhblwiXSxcbiAgICBiZWZvcmU6IFwidW5pcXVlSXRlbXNcIixcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IHNjaGVtYSwgcGFyZW50U2NoZW1hLCBpdCB9ID0gY3h0O1xuICAgICAgICBjb25zdCB7IHByZWZpeEl0ZW1zIH0gPSBwYXJlbnRTY2hlbWE7XG4gICAgICAgIGl0Lml0ZW1zID0gdHJ1ZTtcbiAgICAgICAgaWYgKCgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWEpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAocHJlZml4SXRlbXMpXG4gICAgICAgICAgICAoMCwgYWRkaXRpb25hbEl0ZW1zXzEudmFsaWRhdGVBZGRpdGlvbmFsSXRlbXMpKGN4dCwgcHJlZml4SXRlbXMpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBjeHQub2soKDAsIGNvZGVfMS52YWxpZGF0ZUFycmF5KShjeHQpKTtcbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWl0ZW1zMjAyMC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJub3RcIixcbiAgICBzY2hlbWFUeXBlOiBbXCJvYmplY3RcIiwgXCJib29sZWFuXCJdLFxuICAgIHRyYWNrRXJyb3JzOiB0cnVlLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGlmICgoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoZW1hKSkge1xuICAgICAgICAgICAgY3h0LmZhaWwoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5uYW1lKFwidmFsaWRcIik7XG4gICAgICAgIGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICAgICAga2V5d29yZDogXCJub3RcIixcbiAgICAgICAgICAgIGNvbXBvc2l0ZVJ1bGU6IHRydWUsXG4gICAgICAgICAgICBjcmVhdGVFcnJvcnM6IGZhbHNlLFxuICAgICAgICAgICAgYWxsRXJyb3JzOiBmYWxzZSxcbiAgICAgICAgfSwgdmFsaWQpO1xuICAgICAgICBjeHQuZmFpbFJlc3VsdCh2YWxpZCwgKCkgPT4gY3h0LnJlc2V0KCksICgpID0+IGN4dC5lcnJvcigpKTtcbiAgICB9LFxuICAgIGVycm9yOiB7IG1lc3NhZ2U6IFwibXVzdCBOT1QgYmUgdmFsaWRcIiB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogXCJtdXN0IG1hdGNoIGV4YWN0bHkgb25lIHNjaGVtYSBpbiBvbmVPZlwiLFxuICAgIHBhcmFtczogKHsgcGFyYW1zIH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHtwYXNzaW5nU2NoZW1hczogJHtwYXJhbXMucGFzc2luZ319YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJvbmVPZlwiLFxuICAgIHNjaGVtYVR5cGU6IFwiYXJyYXlcIixcbiAgICB0cmFja0Vycm9yczogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBwYXJlbnRTY2hlbWEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoc2NoZW1hKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImFqdiBpbXBsZW1lbnRhdGlvbiBlcnJvclwiKTtcbiAgICAgICAgaWYgKGl0Lm9wdHMuZGlzY3JpbWluYXRvciAmJiBwYXJlbnRTY2hlbWEuZGlzY3JpbWluYXRvcilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3Qgc2NoQXJyID0gc2NoZW1hO1xuICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5sZXQoXCJ2YWxpZFwiLCBmYWxzZSk7XG4gICAgICAgIGNvbnN0IHBhc3NpbmcgPSBnZW4ubGV0KFwicGFzc2luZ1wiLCBudWxsKTtcbiAgICAgICAgY29uc3Qgc2NoVmFsaWQgPSBnZW4ubmFtZShcIl92YWxpZFwiKTtcbiAgICAgICAgY3h0LnNldFBhcmFtcyh7IHBhc3NpbmcgfSk7XG4gICAgICAgIC8vIFRPRE8gcG9zc2libHkgZmFpbCBzdHJhaWdodCBhd2F5ICh3aXRoIHdhcm5pbmcgb3IgZXhjZXB0aW9uKSBpZiB0aGVyZSBhcmUgdHdvIGVtcHR5IGFsd2F5cyB2YWxpZCBzY2hlbWFzXG4gICAgICAgIGdlbi5ibG9jayh2YWxpZGF0ZU9uZU9mKTtcbiAgICAgICAgY3h0LnJlc3VsdCh2YWxpZCwgKCkgPT4gY3h0LnJlc2V0KCksICgpID0+IGN4dC5lcnJvcih0cnVlKSk7XG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlT25lT2YoKSB7XG4gICAgICAgICAgICBzY2hBcnIuZm9yRWFjaCgoc2NoLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHNjaEN4dDtcbiAgICAgICAgICAgICAgICBpZiAoKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VuLnZhcihzY2hWYWxpZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzY2hDeHQgPSBjeHQuc3Vic2NoZW1hKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXdvcmQ6IFwib25lT2ZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVtYVByb3A6IGksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb3NpdGVSdWxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9LCBzY2hWYWxpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBnZW5cbiAgICAgICAgICAgICAgICAgICAgICAgIC5pZigoMCwgY29kZWdlbl8xLl8pIGAke3NjaFZhbGlkfSAmJiAke3ZhbGlkfWApXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXNzaWduKHZhbGlkLCBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hc3NpZ24ocGFzc2luZywgKDAsIGNvZGVnZW5fMS5fKSBgWyR7cGFzc2luZ30sICR7aX1dYClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lbHNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGdlbi5pZihzY2hWYWxpZCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBnZW4uYXNzaWduKHZhbGlkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmFzc2lnbihwYXNzaW5nLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjaEN4dClcbiAgICAgICAgICAgICAgICAgICAgICAgIGN4dC5tZXJnZUV2YWx1YXRlZChzY2hDeHQsIGNvZGVnZW5fMS5OYW1lKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vbmVPZi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVfMSA9IHJlcXVpcmUoXCIuLi9jb2RlXCIpO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCB1dGlsXzIgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwicGF0dGVyblByb3BlcnRpZXNcIixcbiAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgIHNjaGVtYVR5cGU6IFwib2JqZWN0XCIsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIHNjaGVtYSwgZGF0YSwgcGFyZW50U2NoZW1hLCBpdCB9ID0gY3h0O1xuICAgICAgICBjb25zdCB7IG9wdHMgfSA9IGl0O1xuICAgICAgICBjb25zdCBwYXR0ZXJucyA9ICgwLCBjb2RlXzEuYWxsU2NoZW1hUHJvcGVydGllcykoc2NoZW1hKTtcbiAgICAgICAgY29uc3QgYWx3YXlzVmFsaWRQYXR0ZXJucyA9IHBhdHRlcm5zLmZpbHRlcigocCkgPT4gKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaGVtYVtwXSkpO1xuICAgICAgICBpZiAocGF0dGVybnMubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICAgICAoYWx3YXlzVmFsaWRQYXR0ZXJucy5sZW5ndGggPT09IHBhdHRlcm5zLmxlbmd0aCAmJlxuICAgICAgICAgICAgICAgICghaXQub3B0cy51bmV2YWx1YXRlZCB8fCBpdC5wcm9wcyA9PT0gdHJ1ZSkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2hlY2tQcm9wZXJ0aWVzID0gb3B0cy5zdHJpY3RTY2hlbWEgJiYgIW9wdHMuYWxsb3dNYXRjaGluZ1Byb3BlcnRpZXMgJiYgcGFyZW50U2NoZW1hLnByb3BlcnRpZXM7XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICAgICAgaWYgKGl0LnByb3BzICE9PSB0cnVlICYmICEoaXQucHJvcHMgaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZSkpIHtcbiAgICAgICAgICAgIGl0LnByb3BzID0gKDAsIHV0aWxfMi5ldmFsdWF0ZWRQcm9wc1RvTmFtZSkoZ2VuLCBpdC5wcm9wcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBwcm9wcyB9ID0gaXQ7XG4gICAgICAgIHZhbGlkYXRlUGF0dGVyblByb3BlcnRpZXMoKTtcbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGVQYXR0ZXJuUHJvcGVydGllcygpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcGF0IG9mIHBhdHRlcm5zKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrUHJvcGVydGllcylcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tNYXRjaGluZ1Byb3BlcnRpZXMocGF0KTtcbiAgICAgICAgICAgICAgICBpZiAoaXQuYWxsRXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlUHJvcGVydGllcyhwYXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VuLnZhcih2YWxpZCwgdHJ1ZSk7IC8vIFRPRE8gdmFyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlUHJvcGVydGllcyhwYXQpO1xuICAgICAgICAgICAgICAgICAgICBnZW4uaWYodmFsaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjaGVja01hdGNoaW5nUHJvcGVydGllcyhwYXQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBjaGVja1Byb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3IFJlZ0V4cChwYXQpLnRlc3QocHJvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgKDAsIHV0aWxfMS5jaGVja1N0cmljdE1vZGUpKGl0LCBgcHJvcGVydHkgJHtwcm9wfSBtYXRjaGVzIHBhdHRlcm4gJHtwYXR9ICh1c2UgYWxsb3dNYXRjaGluZ1Byb3BlcnRpZXMpYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlUHJvcGVydGllcyhwYXQpIHtcbiAgICAgICAgICAgIGdlbi5mb3JJbihcImtleVwiLCBkYXRhLCAoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7KDAsIGNvZGVfMS51c2VQYXR0ZXJuKShjeHQsIHBhdCl9LnRlc3QoJHtrZXl9KWAsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWx3YXlzVmFsaWQgPSBhbHdheXNWYWxpZFBhdHRlcm5zLmluY2x1ZGVzKHBhdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghYWx3YXlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXdvcmQ6IFwicGF0dGVyblByb3BlcnRpZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2hlbWFQcm9wOiBwYXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVByb3A6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhUHJvcFR5cGU6IHV0aWxfMi5UeXBlLlN0cixcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHZhbGlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoaXQub3B0cy51bmV2YWx1YXRlZCAmJiBwcm9wcyAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke3Byb3BzfVske2tleX1dYCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIWFsd2F5c1ZhbGlkICYmICFpdC5hbGxFcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbiBzaG9ydC1jaXJjdWl0IGlmIGB1bmV2YWx1YXRlZFByb3BlcnRpZXNgIGlzIG5vdCBzdXBwb3J0ZWQgKG9wdHMubmV4dCA9PT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvciBpZiBhbGwgcHJvcGVydGllcyB3ZXJlIGV2YWx1YXRlZCAocHJvcHMgPT09IHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKHZhbGlkKSwgKCkgPT4gZ2VuLmJyZWFrKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGF0dGVyblByb3BlcnRpZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBpdGVtc18xID0gcmVxdWlyZShcIi4vaXRlbXNcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJwcmVmaXhJdGVtc1wiLFxuICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICBzY2hlbWFUeXBlOiBbXCJhcnJheVwiXSxcbiAgICBiZWZvcmU6IFwidW5pcXVlSXRlbXNcIixcbiAgICBjb2RlOiAoY3h0KSA9PiAoMCwgaXRlbXNfMS52YWxpZGF0ZVR1cGxlKShjeHQsIFwiaXRlbXNcIiksXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJlZml4SXRlbXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdmFsaWRhdGVcIik7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi4vY29kZVwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBhZGRpdGlvbmFsUHJvcGVydGllc18xID0gcmVxdWlyZShcIi4vYWRkaXRpb25hbFByb3BlcnRpZXNcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJwcm9wZXJ0aWVzXCIsXG4gICAgdHlwZTogXCJvYmplY3RcIixcbiAgICBzY2hlbWFUeXBlOiBcIm9iamVjdFwiLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIHBhcmVudFNjaGVtYSwgZGF0YSwgaXQgfSA9IGN4dDtcbiAgICAgICAgaWYgKGl0Lm9wdHMucmVtb3ZlQWRkaXRpb25hbCA9PT0gXCJhbGxcIiAmJiBwYXJlbnRTY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXNfMS5kZWZhdWx0LmNvZGUobmV3IHZhbGlkYXRlXzEuS2V5d29yZEN4dChpdCwgYWRkaXRpb25hbFByb3BlcnRpZXNfMS5kZWZhdWx0LCBcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhbGxQcm9wcyA9ICgwLCBjb2RlXzEuYWxsU2NoZW1hUHJvcGVydGllcykoc2NoZW1hKTtcbiAgICAgICAgZm9yIChjb25zdCBwcm9wIG9mIGFsbFByb3BzKSB7XG4gICAgICAgICAgICBpdC5kZWZpbmVkUHJvcGVydGllcy5hZGQocHJvcCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0Lm9wdHMudW5ldmFsdWF0ZWQgJiYgYWxsUHJvcHMubGVuZ3RoICYmIGl0LnByb3BzICE9PSB0cnVlKSB7XG4gICAgICAgICAgICBpdC5wcm9wcyA9IHV0aWxfMS5tZXJnZUV2YWx1YXRlZC5wcm9wcyhnZW4sICgwLCB1dGlsXzEudG9IYXNoKShhbGxQcm9wcyksIGl0LnByb3BzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gYWxsUHJvcHMuZmlsdGVyKChwKSA9PiAhKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaGVtYVtwXSkpO1xuICAgICAgICBpZiAocHJvcGVydGllcy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICAgICAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGlmIChoYXNEZWZhdWx0KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgYXBwbHlQcm9wZXJ0eVNjaGVtYShwcm9wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZV8xLnByb3BlcnR5SW5EYXRhKShnZW4sIGRhdGEsIHByb3AsIGl0Lm9wdHMub3duUHJvcGVydGllcykpO1xuICAgICAgICAgICAgICAgIGFwcGx5UHJvcGVydHlTY2hlbWEocHJvcCk7XG4gICAgICAgICAgICAgICAgaWYgKCFpdC5hbGxFcnJvcnMpXG4gICAgICAgICAgICAgICAgICAgIGdlbi5lbHNlKCkudmFyKHZhbGlkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBnZW4uZW5kSWYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN4dC5pdC5kZWZpbmVkUHJvcGVydGllcy5hZGQocHJvcCk7XG4gICAgICAgICAgICBjeHQub2sodmFsaWQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGhhc0RlZmF1bHQocHJvcCkge1xuICAgICAgICAgICAgcmV0dXJuIGl0Lm9wdHMudXNlRGVmYXVsdHMgJiYgIWl0LmNvbXBvc2l0ZVJ1bGUgJiYgc2NoZW1hW3Byb3BdLmRlZmF1bHQgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBhcHBseVByb3BlcnR5U2NoZW1hKHByb3ApIHtcbiAgICAgICAgICAgIGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICAgICAgICAgIGtleXdvcmQ6IFwicHJvcGVydGllc1wiLFxuICAgICAgICAgICAgICAgIHNjaGVtYVByb3A6IHByb3AsXG4gICAgICAgICAgICAgICAgZGF0YVByb3A6IHByb3AsXG4gICAgICAgICAgICB9LCB2YWxpZCk7XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb3BlcnRpZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6IFwicHJvcGVydHkgbmFtZSBtdXN0IGJlIHZhbGlkXCIsXG4gICAgcGFyYW1zOiAoeyBwYXJhbXMgfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge3Byb3BlcnR5TmFtZTogJHtwYXJhbXMucHJvcGVydHlOYW1lfX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcInByb3BlcnR5TmFtZXNcIixcbiAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgIHNjaGVtYVR5cGU6IFtcIm9iamVjdFwiLCBcImJvb2xlYW5cIl0sXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIHNjaGVtYSwgZGF0YSwgaXQgfSA9IGN4dDtcbiAgICAgICAgaWYgKCgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWEpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5uYW1lKFwidmFsaWRcIik7XG4gICAgICAgIGdlbi5mb3JJbihcImtleVwiLCBkYXRhLCAoa2V5KSA9PiB7XG4gICAgICAgICAgICBjeHQuc2V0UGFyYW1zKHsgcHJvcGVydHlOYW1lOiBrZXkgfSk7XG4gICAgICAgICAgICBjeHQuc3Vic2NoZW1hKHtcbiAgICAgICAgICAgICAgICBrZXl3b3JkOiBcInByb3BlcnR5TmFtZXNcIixcbiAgICAgICAgICAgICAgICBkYXRhOiBrZXksXG4gICAgICAgICAgICAgICAgZGF0YVR5cGVzOiBbXCJzdHJpbmdcIl0sXG4gICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lOiBrZXksXG4gICAgICAgICAgICAgICAgY29tcG9zaXRlUnVsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0sIHZhbGlkKTtcbiAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLm5vdCkodmFsaWQpLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY3h0LmVycm9yKHRydWUpO1xuICAgICAgICAgICAgICAgIGlmICghaXQuYWxsRXJyb3JzKVxuICAgICAgICAgICAgICAgICAgICBnZW4uYnJlYWsoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb3BlcnR5TmFtZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFtcInRoZW5cIiwgXCJlbHNlXCJdLFxuICAgIHNjaGVtYVR5cGU6IFtcIm9iamVjdFwiLCBcImJvb2xlYW5cIl0sXG4gICAgY29kZSh7IGtleXdvcmQsIHBhcmVudFNjaGVtYSwgaXQgfSkge1xuICAgICAgICBpZiAocGFyZW50U2NoZW1hLmlmID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAoMCwgdXRpbF8xLmNoZWNrU3RyaWN0TW9kZSkoaXQsIGBcIiR7a2V5d29yZH1cIiB3aXRob3V0IFwiaWZcIiBpcyBpZ25vcmVkYCk7XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aGVuRWxzZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudmFsaWRhdGVVbmlvbiA9IGV4cG9ydHMudmFsaWRhdGVBcnJheSA9IGV4cG9ydHMudXNlUGF0dGVybiA9IGV4cG9ydHMuY2FsbFZhbGlkYXRlQ29kZSA9IGV4cG9ydHMuc2NoZW1hUHJvcGVydGllcyA9IGV4cG9ydHMuYWxsU2NoZW1hUHJvcGVydGllcyA9IGV4cG9ydHMubm9Qcm9wZXJ0eUluRGF0YSA9IGV4cG9ydHMucHJvcGVydHlJbkRhdGEgPSBleHBvcnRzLmlzT3duUHJvcGVydHkgPSBleHBvcnRzLmhhc1Byb3BGdW5jID0gZXhwb3J0cy5yZXBvcnRNaXNzaW5nUHJvcCA9IGV4cG9ydHMuY2hlY2tNaXNzaW5nUHJvcCA9IGV4cG9ydHMuY2hlY2tSZXBvcnRNaXNzaW5nUHJvcCA9IHZvaWQgMDtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgbmFtZXNfMSA9IHJlcXVpcmUoXCIuLi9jb21waWxlL25hbWVzXCIpO1xuY29uc3QgdXRpbF8yID0gcmVxdWlyZShcIi4uL2NvbXBpbGUvdXRpbFwiKTtcbmZ1bmN0aW9uIGNoZWNrUmVwb3J0TWlzc2luZ1Byb3AoY3h0LCBwcm9wKSB7XG4gICAgY29uc3QgeyBnZW4sIGRhdGEsIGl0IH0gPSBjeHQ7XG4gICAgZ2VuLmlmKG5vUHJvcGVydHlJbkRhdGEoZ2VuLCBkYXRhLCBwcm9wLCBpdC5vcHRzLm93blByb3BlcnRpZXMpLCAoKSA9PiB7XG4gICAgICAgIGN4dC5zZXRQYXJhbXMoeyBtaXNzaW5nUHJvcGVydHk6ICgwLCBjb2RlZ2VuXzEuXykgYCR7cHJvcH1gIH0sIHRydWUpO1xuICAgICAgICBjeHQuZXJyb3IoKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuY2hlY2tSZXBvcnRNaXNzaW5nUHJvcCA9IGNoZWNrUmVwb3J0TWlzc2luZ1Byb3A7XG5mdW5jdGlvbiBjaGVja01pc3NpbmdQcm9wKHsgZ2VuLCBkYXRhLCBpdDogeyBvcHRzIH0gfSwgcHJvcGVydGllcywgbWlzc2luZykge1xuICAgIHJldHVybiAoMCwgY29kZWdlbl8xLm9yKSguLi5wcm9wZXJ0aWVzLm1hcCgocHJvcCkgPT4gKDAsIGNvZGVnZW5fMS5hbmQpKG5vUHJvcGVydHlJbkRhdGEoZ2VuLCBkYXRhLCBwcm9wLCBvcHRzLm93blByb3BlcnRpZXMpLCAoMCwgY29kZWdlbl8xLl8pIGAke21pc3Npbmd9ID0gJHtwcm9wfWApKSk7XG59XG5leHBvcnRzLmNoZWNrTWlzc2luZ1Byb3AgPSBjaGVja01pc3NpbmdQcm9wO1xuZnVuY3Rpb24gcmVwb3J0TWlzc2luZ1Byb3AoY3h0LCBtaXNzaW5nKSB7XG4gICAgY3h0LnNldFBhcmFtcyh7IG1pc3NpbmdQcm9wZXJ0eTogbWlzc2luZyB9LCB0cnVlKTtcbiAgICBjeHQuZXJyb3IoKTtcbn1cbmV4cG9ydHMucmVwb3J0TWlzc2luZ1Byb3AgPSByZXBvcnRNaXNzaW5nUHJvcDtcbmZ1bmN0aW9uIGhhc1Byb3BGdW5jKGdlbikge1xuICAgIHJldHVybiBnZW4uc2NvcGVWYWx1ZShcImZ1bmNcIiwge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3VuYm91bmQtbWV0aG9kXG4gICAgICAgIHJlZjogT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxcbiAgICAgICAgY29kZTogKDAsIGNvZGVnZW5fMS5fKSBgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eWAsXG4gICAgfSk7XG59XG5leHBvcnRzLmhhc1Byb3BGdW5jID0gaGFzUHJvcEZ1bmM7XG5mdW5jdGlvbiBpc093blByb3BlcnR5KGdlbiwgZGF0YSwgcHJvcGVydHkpIHtcbiAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5fKSBgJHtoYXNQcm9wRnVuYyhnZW4pfS5jYWxsKCR7ZGF0YX0sICR7cHJvcGVydHl9KWA7XG59XG5leHBvcnRzLmlzT3duUHJvcGVydHkgPSBpc093blByb3BlcnR5O1xuZnVuY3Rpb24gcHJvcGVydHlJbkRhdGEoZ2VuLCBkYXRhLCBwcm9wZXJ0eSwgb3duUHJvcGVydGllcykge1xuICAgIGNvbnN0IGNvbmQgPSAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9JHsoMCwgY29kZWdlbl8xLmdldFByb3BlcnR5KShwcm9wZXJ0eSl9ICE9PSB1bmRlZmluZWRgO1xuICAgIHJldHVybiBvd25Qcm9wZXJ0aWVzID8gKDAsIGNvZGVnZW5fMS5fKSBgJHtjb25kfSAmJiAke2lzT3duUHJvcGVydHkoZ2VuLCBkYXRhLCBwcm9wZXJ0eSl9YCA6IGNvbmQ7XG59XG5leHBvcnRzLnByb3BlcnR5SW5EYXRhID0gcHJvcGVydHlJbkRhdGE7XG5mdW5jdGlvbiBub1Byb3BlcnR5SW5EYXRhKGdlbiwgZGF0YSwgcHJvcGVydHksIG93blByb3BlcnRpZXMpIHtcbiAgICBjb25zdCBjb25kID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfSR7KDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkocHJvcGVydHkpfSA9PT0gdW5kZWZpbmVkYDtcbiAgICByZXR1cm4gb3duUHJvcGVydGllcyA/ICgwLCBjb2RlZ2VuXzEub3IpKGNvbmQsICgwLCBjb2RlZ2VuXzEubm90KShpc093blByb3BlcnR5KGdlbiwgZGF0YSwgcHJvcGVydHkpKSkgOiBjb25kO1xufVxuZXhwb3J0cy5ub1Byb3BlcnR5SW5EYXRhID0gbm9Qcm9wZXJ0eUluRGF0YTtcbmZ1bmN0aW9uIGFsbFNjaGVtYVByb3BlcnRpZXMoc2NoZW1hTWFwKSB7XG4gICAgcmV0dXJuIHNjaGVtYU1hcCA/IE9iamVjdC5rZXlzKHNjaGVtYU1hcCkuZmlsdGVyKChwKSA9PiBwICE9PSBcIl9fcHJvdG9fX1wiKSA6IFtdO1xufVxuZXhwb3J0cy5hbGxTY2hlbWFQcm9wZXJ0aWVzID0gYWxsU2NoZW1hUHJvcGVydGllcztcbmZ1bmN0aW9uIHNjaGVtYVByb3BlcnRpZXMoaXQsIHNjaGVtYU1hcCkge1xuICAgIHJldHVybiBhbGxTY2hlbWFQcm9wZXJ0aWVzKHNjaGVtYU1hcCkuZmlsdGVyKChwKSA9PiAhKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaGVtYU1hcFtwXSkpO1xufVxuZXhwb3J0cy5zY2hlbWFQcm9wZXJ0aWVzID0gc2NoZW1hUHJvcGVydGllcztcbmZ1bmN0aW9uIGNhbGxWYWxpZGF0ZUNvZGUoeyBzY2hlbWFDb2RlLCBkYXRhLCBpdDogeyBnZW4sIHRvcFNjaGVtYVJlZiwgc2NoZW1hUGF0aCwgZXJyb3JQYXRoIH0sIGl0IH0sIGZ1bmMsIGNvbnRleHQsIHBhc3NTY2hlbWEpIHtcbiAgICBjb25zdCBkYXRhQW5kU2NoZW1hID0gcGFzc1NjaGVtYSA/ICgwLCBjb2RlZ2VuXzEuXykgYCR7c2NoZW1hQ29kZX0sICR7ZGF0YX0sICR7dG9wU2NoZW1hUmVmfSR7c2NoZW1hUGF0aH1gIDogZGF0YTtcbiAgICBjb25zdCB2YWxDeHQgPSBbXG4gICAgICAgIFtuYW1lc18xLmRlZmF1bHQuaW5zdGFuY2VQYXRoLCAoMCwgY29kZWdlbl8xLnN0ckNvbmNhdCkobmFtZXNfMS5kZWZhdWx0Lmluc3RhbmNlUGF0aCwgZXJyb3JQYXRoKV0sXG4gICAgICAgIFtuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YSwgaXQucGFyZW50RGF0YV0sXG4gICAgICAgIFtuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YVByb3BlcnR5LCBpdC5wYXJlbnREYXRhUHJvcGVydHldLFxuICAgICAgICBbbmFtZXNfMS5kZWZhdWx0LnJvb3REYXRhLCBuYW1lc18xLmRlZmF1bHQucm9vdERhdGFdLFxuICAgIF07XG4gICAgaWYgKGl0Lm9wdHMuZHluYW1pY1JlZilcbiAgICAgICAgdmFsQ3h0LnB1c2goW25hbWVzXzEuZGVmYXVsdC5keW5hbWljQW5jaG9ycywgbmFtZXNfMS5kZWZhdWx0LmR5bmFtaWNBbmNob3JzXSk7XG4gICAgY29uc3QgYXJncyA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YUFuZFNjaGVtYX0sICR7Z2VuLm9iamVjdCguLi52YWxDeHQpfWA7XG4gICAgcmV0dXJuIGNvbnRleHQgIT09IGNvZGVnZW5fMS5uaWwgPyAoMCwgY29kZWdlbl8xLl8pIGAke2Z1bmN9LmNhbGwoJHtjb250ZXh0fSwgJHthcmdzfSlgIDogKDAsIGNvZGVnZW5fMS5fKSBgJHtmdW5jfSgke2FyZ3N9KWA7XG59XG5leHBvcnRzLmNhbGxWYWxpZGF0ZUNvZGUgPSBjYWxsVmFsaWRhdGVDb2RlO1xuY29uc3QgbmV3UmVnRXhwID0gKDAsIGNvZGVnZW5fMS5fKSBgbmV3IFJlZ0V4cGA7XG5mdW5jdGlvbiB1c2VQYXR0ZXJuKHsgZ2VuLCBpdDogeyBvcHRzIH0gfSwgcGF0dGVybikge1xuICAgIGNvbnN0IHUgPSBvcHRzLnVuaWNvZGVSZWdFeHAgPyBcInVcIiA6IFwiXCI7XG4gICAgY29uc3QgeyByZWdFeHAgfSA9IG9wdHMuY29kZTtcbiAgICBjb25zdCByeCA9IHJlZ0V4cChwYXR0ZXJuLCB1KTtcbiAgICByZXR1cm4gZ2VuLnNjb3BlVmFsdWUoXCJwYXR0ZXJuXCIsIHtcbiAgICAgICAga2V5OiByeC50b1N0cmluZygpLFxuICAgICAgICByZWY6IHJ4LFxuICAgICAgICBjb2RlOiAoMCwgY29kZWdlbl8xLl8pIGAke3JlZ0V4cC5jb2RlID09PSBcIm5ldyBSZWdFeHBcIiA/IG5ld1JlZ0V4cCA6ICgwLCB1dGlsXzIudXNlRnVuYykoZ2VuLCByZWdFeHApfSgke3BhdHRlcm59LCAke3V9KWAsXG4gICAgfSk7XG59XG5leHBvcnRzLnVzZVBhdHRlcm4gPSB1c2VQYXR0ZXJuO1xuZnVuY3Rpb24gdmFsaWRhdGVBcnJheShjeHQpIHtcbiAgICBjb25zdCB7IGdlbiwgZGF0YSwga2V5d29yZCwgaXQgfSA9IGN4dDtcbiAgICBjb25zdCB2YWxpZCA9IGdlbi5uYW1lKFwidmFsaWRcIik7XG4gICAgaWYgKGl0LmFsbEVycm9ycykge1xuICAgICAgICBjb25zdCB2YWxpZEFyciA9IGdlbi5sZXQoXCJ2YWxpZFwiLCB0cnVlKTtcbiAgICAgICAgdmFsaWRhdGVJdGVtcygoKSA9PiBnZW4uYXNzaWduKHZhbGlkQXJyLCBmYWxzZSkpO1xuICAgICAgICByZXR1cm4gdmFsaWRBcnI7XG4gICAgfVxuICAgIGdlbi52YXIodmFsaWQsIHRydWUpO1xuICAgIHZhbGlkYXRlSXRlbXMoKCkgPT4gZ2VuLmJyZWFrKCkpO1xuICAgIHJldHVybiB2YWxpZDtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZUl0ZW1zKG5vdFZhbGlkKSB7XG4gICAgICAgIGNvbnN0IGxlbiA9IGdlbi5jb25zdChcImxlblwiLCAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9Lmxlbmd0aGApO1xuICAgICAgICBnZW4uZm9yUmFuZ2UoXCJpXCIsIDAsIGxlbiwgKGkpID0+IHtcbiAgICAgICAgICAgIGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICAgICAgICAgIGtleXdvcmQsXG4gICAgICAgICAgICAgICAgZGF0YVByb3A6IGksXG4gICAgICAgICAgICAgICAgZGF0YVByb3BUeXBlOiB1dGlsXzEuVHlwZS5OdW0sXG4gICAgICAgICAgICB9LCB2YWxpZCk7XG4gICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKHZhbGlkKSwgbm90VmFsaWQpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLnZhbGlkYXRlQXJyYXkgPSB2YWxpZGF0ZUFycmF5O1xuZnVuY3Rpb24gdmFsaWRhdGVVbmlvbihjeHQpIHtcbiAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBrZXl3b3JkLCBpdCB9ID0gY3h0O1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghQXJyYXkuaXNBcnJheShzY2hlbWEpKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhanYgaW1wbGVtZW50YXRpb24gZXJyb3JcIik7XG4gICAgY29uc3QgYWx3YXlzVmFsaWQgPSBzY2hlbWEuc29tZSgoc2NoKSA9PiAoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoKSk7XG4gICAgaWYgKGFsd2F5c1ZhbGlkICYmICFpdC5vcHRzLnVuZXZhbHVhdGVkKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgdmFsaWQgPSBnZW4ubGV0KFwidmFsaWRcIiwgZmFsc2UpO1xuICAgIGNvbnN0IHNjaFZhbGlkID0gZ2VuLm5hbWUoXCJfdmFsaWRcIik7XG4gICAgZ2VuLmJsb2NrKCgpID0+IHNjaGVtYS5mb3JFYWNoKChfc2NoLCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IHNjaEN4dCA9IGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICAgICAga2V5d29yZCxcbiAgICAgICAgICAgIHNjaGVtYVByb3A6IGksXG4gICAgICAgICAgICBjb21wb3NpdGVSdWxlOiB0cnVlLFxuICAgICAgICB9LCBzY2hWYWxpZCk7XG4gICAgICAgIGdlbi5hc3NpZ24odmFsaWQsICgwLCBjb2RlZ2VuXzEuXykgYCR7dmFsaWR9IHx8ICR7c2NoVmFsaWR9YCk7XG4gICAgICAgIGNvbnN0IG1lcmdlZCA9IGN4dC5tZXJnZVZhbGlkRXZhbHVhdGVkKHNjaEN4dCwgc2NoVmFsaWQpO1xuICAgICAgICAvLyBjYW4gc2hvcnQtY2lyY3VpdCBpZiBgdW5ldmFsdWF0ZWRQcm9wZXJ0aWVzL0l0ZW1zYCBub3Qgc3VwcG9ydGVkIChvcHRzLnVuZXZhbHVhdGVkICE9PSB0cnVlKVxuICAgICAgICAvLyBvciBpZiBhbGwgcHJvcGVydGllcyBhbmQgaXRlbXMgd2VyZSBldmFsdWF0ZWQgKGl0LnByb3BzID09PSB0cnVlICYmIGl0Lml0ZW1zID09PSB0cnVlKVxuICAgICAgICBpZiAoIW1lcmdlZClcbiAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLm5vdCkodmFsaWQpKTtcbiAgICB9KSk7XG4gICAgY3h0LnJlc3VsdCh2YWxpZCwgKCkgPT4gY3h0LnJlc2V0KCksICgpID0+IGN4dC5lcnJvcih0cnVlKSk7XG59XG5leHBvcnRzLnZhbGlkYXRlVW5pb24gPSB2YWxpZGF0ZVVuaW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29kZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcImlkXCIsXG4gICAgY29kZSgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOT1QgU1VQUE9SVEVEOiBrZXl3b3JkIFwiaWRcIiwgdXNlIFwiJGlkXCIgZm9yIHNjaGVtYSBJRCcpO1xuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aWQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBpZF8xID0gcmVxdWlyZShcIi4vaWRcIik7XG5jb25zdCByZWZfMSA9IHJlcXVpcmUoXCIuL3JlZlwiKTtcbmNvbnN0IGNvcmUgPSBbXG4gICAgXCIkc2NoZW1hXCIsXG4gICAgXCIkaWRcIixcbiAgICBcIiRkZWZzXCIsXG4gICAgXCIkdm9jYWJ1bGFyeVwiLFxuICAgIHsga2V5d29yZDogXCIkY29tbWVudFwiIH0sXG4gICAgXCJkZWZpbml0aW9uc1wiLFxuICAgIGlkXzEuZGVmYXVsdCxcbiAgICByZWZfMS5kZWZhdWx0LFxuXTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNvcmU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY2FsbFJlZiA9IGV4cG9ydHMuZ2V0VmFsaWRhdGUgPSB2b2lkIDA7XG5jb25zdCByZWZfZXJyb3JfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3JlZl9lcnJvclwiKTtcbmNvbnN0IGNvZGVfMSA9IHJlcXVpcmUoXCIuLi9jb2RlXCIpO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IG5hbWVzXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9uYW1lc1wiKTtcbmNvbnN0IGNvbXBpbGVfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcIiRyZWZcIixcbiAgICBzY2hlbWFUeXBlOiBcInN0cmluZ1wiLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWE6ICRyZWYsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGNvbnN0IHsgYmFzZUlkLCBzY2hlbWFFbnY6IGVudiwgdmFsaWRhdGVOYW1lLCBvcHRzLCBzZWxmIH0gPSBpdDtcbiAgICAgICAgY29uc3QgeyByb290IH0gPSBlbnY7XG4gICAgICAgIGlmICgoJHJlZiA9PT0gXCIjXCIgfHwgJHJlZiA9PT0gXCIjL1wiKSAmJiBiYXNlSWQgPT09IHJvb3QuYmFzZUlkKVxuICAgICAgICAgICAgcmV0dXJuIGNhbGxSb290UmVmKCk7XG4gICAgICAgIGNvbnN0IHNjaE9yRW52ID0gY29tcGlsZV8xLnJlc29sdmVSZWYuY2FsbChzZWxmLCByb290LCBiYXNlSWQsICRyZWYpO1xuICAgICAgICBpZiAoc2NoT3JFbnYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyByZWZfZXJyb3JfMS5kZWZhdWx0KGl0Lm9wdHMudXJpUmVzb2x2ZXIsIGJhc2VJZCwgJHJlZik7XG4gICAgICAgIGlmIChzY2hPckVudiBpbnN0YW5jZW9mIGNvbXBpbGVfMS5TY2hlbWFFbnYpXG4gICAgICAgICAgICByZXR1cm4gY2FsbFZhbGlkYXRlKHNjaE9yRW52KTtcbiAgICAgICAgcmV0dXJuIGlubGluZVJlZlNjaGVtYShzY2hPckVudik7XG4gICAgICAgIGZ1bmN0aW9uIGNhbGxSb290UmVmKCkge1xuICAgICAgICAgICAgaWYgKGVudiA9PT0gcm9vdClcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbFJlZihjeHQsIHZhbGlkYXRlTmFtZSwgZW52LCBlbnYuJGFzeW5jKTtcbiAgICAgICAgICAgIGNvbnN0IHJvb3ROYW1lID0gZ2VuLnNjb3BlVmFsdWUoXCJyb290XCIsIHsgcmVmOiByb290IH0pO1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxSZWYoY3h0LCAoMCwgY29kZWdlbl8xLl8pIGAke3Jvb3ROYW1lfS52YWxpZGF0ZWAsIHJvb3QsIHJvb3QuJGFzeW5jKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjYWxsVmFsaWRhdGUoc2NoKSB7XG4gICAgICAgICAgICBjb25zdCB2ID0gZ2V0VmFsaWRhdGUoY3h0LCBzY2gpO1xuICAgICAgICAgICAgY2FsbFJlZihjeHQsIHYsIHNjaCwgc2NoLiRhc3luYyk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaW5saW5lUmVmU2NoZW1hKHNjaCkge1xuICAgICAgICAgICAgY29uc3Qgc2NoTmFtZSA9IGdlbi5zY29wZVZhbHVlKFwic2NoZW1hXCIsIG9wdHMuY29kZS5zb3VyY2UgPT09IHRydWUgPyB7IHJlZjogc2NoLCBjb2RlOiAoMCwgY29kZWdlbl8xLnN0cmluZ2lmeSkoc2NoKSB9IDogeyByZWY6IHNjaCB9KTtcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICAgICAgICAgIGNvbnN0IHNjaEN4dCA9IGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICAgICAgICAgIHNjaGVtYTogc2NoLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlczogW10sXG4gICAgICAgICAgICAgICAgc2NoZW1hUGF0aDogY29kZWdlbl8xLm5pbCxcbiAgICAgICAgICAgICAgICB0b3BTY2hlbWFSZWY6IHNjaE5hbWUsXG4gICAgICAgICAgICAgICAgZXJyU2NoZW1hUGF0aDogJHJlZixcbiAgICAgICAgICAgIH0sIHZhbGlkKTtcbiAgICAgICAgICAgIGN4dC5tZXJnZUV2YWx1YXRlZChzY2hDeHQpO1xuICAgICAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuZnVuY3Rpb24gZ2V0VmFsaWRhdGUoY3h0LCBzY2gpIHtcbiAgICBjb25zdCB7IGdlbiB9ID0gY3h0O1xuICAgIHJldHVybiBzY2gudmFsaWRhdGVcbiAgICAgICAgPyBnZW4uc2NvcGVWYWx1ZShcInZhbGlkYXRlXCIsIHsgcmVmOiBzY2gudmFsaWRhdGUgfSlcbiAgICAgICAgOiAoMCwgY29kZWdlbl8xLl8pIGAke2dlbi5zY29wZVZhbHVlKFwid3JhcHBlclwiLCB7IHJlZjogc2NoIH0pfS52YWxpZGF0ZWA7XG59XG5leHBvcnRzLmdldFZhbGlkYXRlID0gZ2V0VmFsaWRhdGU7XG5mdW5jdGlvbiBjYWxsUmVmKGN4dCwgdiwgc2NoLCAkYXN5bmMpIHtcbiAgICBjb25zdCB7IGdlbiwgaXQgfSA9IGN4dDtcbiAgICBjb25zdCB7IGFsbEVycm9ycywgc2NoZW1hRW52OiBlbnYsIG9wdHMgfSA9IGl0O1xuICAgIGNvbnN0IHBhc3NDeHQgPSBvcHRzLnBhc3NDb250ZXh0ID8gbmFtZXNfMS5kZWZhdWx0LnRoaXMgOiBjb2RlZ2VuXzEubmlsO1xuICAgIGlmICgkYXN5bmMpXG4gICAgICAgIGNhbGxBc3luY1JlZigpO1xuICAgIGVsc2VcbiAgICAgICAgY2FsbFN5bmNSZWYoKTtcbiAgICBmdW5jdGlvbiBjYWxsQXN5bmNSZWYoKSB7XG4gICAgICAgIGlmICghZW52LiRhc3luYylcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImFzeW5jIHNjaGVtYSByZWZlcmVuY2VkIGJ5IHN5bmMgc2NoZW1hXCIpO1xuICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5sZXQoXCJ2YWxpZFwiKTtcbiAgICAgICAgZ2VuLnRyeSgoKSA9PiB7XG4gICAgICAgICAgICBnZW4uY29kZSgoMCwgY29kZWdlbl8xLl8pIGBhd2FpdCAkeygwLCBjb2RlXzEuY2FsbFZhbGlkYXRlQ29kZSkoY3h0LCB2LCBwYXNzQ3h0KX1gKTtcbiAgICAgICAgICAgIGFkZEV2YWx1YXRlZEZyb20odik7IC8vIFRPRE8gd2lsbCBub3Qgd29yayB3aXRoIGFzeW5jLCBpdCBoYXMgdG8gYmUgcmV0dXJuZWQgd2l0aCB0aGUgcmVzdWx0XG4gICAgICAgICAgICBpZiAoIWFsbEVycm9ycylcbiAgICAgICAgICAgICAgICBnZW4uYXNzaWduKHZhbGlkLCB0cnVlKTtcbiAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAhKCR7ZX0gaW5zdGFuY2VvZiAke2l0LlZhbGlkYXRpb25FcnJvcn0pYCwgKCkgPT4gZ2VuLnRocm93KGUpKTtcbiAgICAgICAgICAgIGFkZEVycm9yc0Zyb20oZSk7XG4gICAgICAgICAgICBpZiAoIWFsbEVycm9ycylcbiAgICAgICAgICAgICAgICBnZW4uYXNzaWduKHZhbGlkLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjeHQub2sodmFsaWQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjYWxsU3luY1JlZigpIHtcbiAgICAgICAgY3h0LnJlc3VsdCgoMCwgY29kZV8xLmNhbGxWYWxpZGF0ZUNvZGUpKGN4dCwgdiwgcGFzc0N4dCksICgpID0+IGFkZEV2YWx1YXRlZEZyb20odiksICgpID0+IGFkZEVycm9yc0Zyb20odikpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRFcnJvcnNGcm9tKHNvdXJjZSkge1xuICAgICAgICBjb25zdCBlcnJzID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtzb3VyY2V9LmVycm9yc2A7XG4gICAgICAgIGdlbi5hc3NpZ24obmFtZXNfMS5kZWZhdWx0LnZFcnJvcnMsICgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnZFcnJvcnN9ID09PSBudWxsID8gJHtlcnJzfSA6ICR7bmFtZXNfMS5kZWZhdWx0LnZFcnJvcnN9LmNvbmNhdCgke2VycnN9KWApOyAvLyBUT0RPIHRhZ2dlZFxuICAgICAgICBnZW4uYXNzaWduKG5hbWVzXzEuZGVmYXVsdC5lcnJvcnMsICgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnZFcnJvcnN9Lmxlbmd0aGApO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRFdmFsdWF0ZWRGcm9tKHNvdXJjZSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICghaXQub3B0cy51bmV2YWx1YXRlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3Qgc2NoRXZhbHVhdGVkID0gKF9hID0gc2NoID09PSBudWxsIHx8IHNjaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2NoLnZhbGlkYXRlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZXZhbHVhdGVkO1xuICAgICAgICAvLyBUT0RPIHJlZmFjdG9yXG4gICAgICAgIGlmIChpdC5wcm9wcyAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHNjaEV2YWx1YXRlZCAmJiAhc2NoRXZhbHVhdGVkLmR5bmFtaWNQcm9wcykge1xuICAgICAgICAgICAgICAgIGlmIChzY2hFdmFsdWF0ZWQucHJvcHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpdC5wcm9wcyA9IHV0aWxfMS5tZXJnZUV2YWx1YXRlZC5wcm9wcyhnZW4sIHNjaEV2YWx1YXRlZC5wcm9wcywgaXQucHJvcHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BzID0gZ2VuLnZhcihcInByb3BzXCIsICgwLCBjb2RlZ2VuXzEuXykgYCR7c291cmNlfS5ldmFsdWF0ZWQucHJvcHNgKTtcbiAgICAgICAgICAgICAgICBpdC5wcm9wcyA9IHV0aWxfMS5tZXJnZUV2YWx1YXRlZC5wcm9wcyhnZW4sIHByb3BzLCBpdC5wcm9wcywgY29kZWdlbl8xLk5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpdC5pdGVtcyAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHNjaEV2YWx1YXRlZCAmJiAhc2NoRXZhbHVhdGVkLmR5bmFtaWNJdGVtcykge1xuICAgICAgICAgICAgICAgIGlmIChzY2hFdmFsdWF0ZWQuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpdC5pdGVtcyA9IHV0aWxfMS5tZXJnZUV2YWx1YXRlZC5pdGVtcyhnZW4sIHNjaEV2YWx1YXRlZC5pdGVtcywgaXQuaXRlbXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gZ2VuLnZhcihcIml0ZW1zXCIsICgwLCBjb2RlZ2VuXzEuXykgYCR7c291cmNlfS5ldmFsdWF0ZWQuaXRlbXNgKTtcbiAgICAgICAgICAgICAgICBpdC5pdGVtcyA9IHV0aWxfMS5tZXJnZUV2YWx1YXRlZC5pdGVtcyhnZW4sIGl0ZW1zLCBpdC5pdGVtcywgY29kZWdlbl8xLk5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5jYWxsUmVmID0gY2FsbFJlZjtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlZi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB0eXBlc18xID0gcmVxdWlyZShcIi4uL2Rpc2NyaW1pbmF0b3IvdHlwZXNcIik7XG5jb25zdCBjb21waWxlXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZVwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBwYXJhbXM6IHsgZGlzY3JFcnJvciwgdGFnTmFtZSB9IH0pID0+IGRpc2NyRXJyb3IgPT09IHR5cGVzXzEuRGlzY3JFcnJvci5UYWdcbiAgICAgICAgPyBgdGFnIFwiJHt0YWdOYW1lfVwiIG11c3QgYmUgc3RyaW5nYFxuICAgICAgICA6IGB2YWx1ZSBvZiB0YWcgXCIke3RhZ05hbWV9XCIgbXVzdCBiZSBpbiBvbmVPZmAsXG4gICAgcGFyYW1zOiAoeyBwYXJhbXM6IHsgZGlzY3JFcnJvciwgdGFnLCB0YWdOYW1lIH0gfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge2Vycm9yOiAke2Rpc2NyRXJyb3J9LCB0YWc6ICR7dGFnTmFtZX0sIHRhZ1ZhbHVlOiAke3RhZ319YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJkaXNjcmltaW5hdG9yXCIsXG4gICAgdHlwZTogXCJvYmplY3RcIixcbiAgICBzY2hlbWFUeXBlOiBcIm9iamVjdFwiLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCBzY2hlbWEsIHBhcmVudFNjaGVtYSwgaXQgfSA9IGN4dDtcbiAgICAgICAgY29uc3QgeyBvbmVPZiB9ID0gcGFyZW50U2NoZW1hO1xuICAgICAgICBpZiAoIWl0Lm9wdHMuZGlzY3JpbWluYXRvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGlzY3JpbWluYXRvcjogcmVxdWlyZXMgZGlzY3JpbWluYXRvciBvcHRpb25cIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IHNjaGVtYS5wcm9wZXJ0eU5hbWU7XG4gICAgICAgIGlmICh0eXBlb2YgdGFnTmFtZSAhPSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGlzY3JpbWluYXRvcjogcmVxdWlyZXMgcHJvcGVydHlOYW1lXCIpO1xuICAgICAgICBpZiAoc2NoZW1hLm1hcHBpbmcpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkaXNjcmltaW5hdG9yOiBtYXBwaW5nIGlzIG5vdCBzdXBwb3J0ZWRcIik7XG4gICAgICAgIGlmICghb25lT2YpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkaXNjcmltaW5hdG9yOiByZXF1aXJlcyBvbmVPZiBrZXl3b3JkXCIpO1xuICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5sZXQoXCJ2YWxpZFwiLCBmYWxzZSk7XG4gICAgICAgIGNvbnN0IHRhZyA9IGdlbi5jb25zdChcInRhZ1wiLCAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9JHsoMCwgY29kZWdlbl8xLmdldFByb3BlcnR5KSh0YWdOYW1lKX1gKTtcbiAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYHR5cGVvZiAke3RhZ30gPT0gXCJzdHJpbmdcImAsICgpID0+IHZhbGlkYXRlTWFwcGluZygpLCAoKSA9PiBjeHQuZXJyb3IoZmFsc2UsIHsgZGlzY3JFcnJvcjogdHlwZXNfMS5EaXNjckVycm9yLlRhZywgdGFnLCB0YWdOYW1lIH0pKTtcbiAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGVNYXBwaW5nKCkge1xuICAgICAgICAgICAgY29uc3QgbWFwcGluZyA9IGdldE1hcHBpbmcoKTtcbiAgICAgICAgICAgIGdlbi5pZihmYWxzZSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRhZ1ZhbHVlIGluIG1hcHBpbmcpIHtcbiAgICAgICAgICAgICAgICBnZW4uZWxzZUlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7dGFnfSA9PT0gJHt0YWdWYWx1ZX1gKTtcbiAgICAgICAgICAgICAgICBnZW4uYXNzaWduKHZhbGlkLCBhcHBseVRhZ1NjaGVtYShtYXBwaW5nW3RhZ1ZhbHVlXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2VuLmVsc2UoKTtcbiAgICAgICAgICAgIGN4dC5lcnJvcihmYWxzZSwgeyBkaXNjckVycm9yOiB0eXBlc18xLkRpc2NyRXJyb3IuTWFwcGluZywgdGFnLCB0YWdOYW1lIH0pO1xuICAgICAgICAgICAgZ2VuLmVuZElmKCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYXBwbHlUYWdTY2hlbWEoc2NoZW1hUHJvcCkge1xuICAgICAgICAgICAgY29uc3QgX3ZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICAgICAgICAgIGNvbnN0IHNjaEN4dCA9IGN4dC5zdWJzY2hlbWEoeyBrZXl3b3JkOiBcIm9uZU9mXCIsIHNjaGVtYVByb3AgfSwgX3ZhbGlkKTtcbiAgICAgICAgICAgIGN4dC5tZXJnZUV2YWx1YXRlZChzY2hDeHQsIGNvZGVnZW5fMS5OYW1lKTtcbiAgICAgICAgICAgIHJldHVybiBfdmFsaWQ7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0TWFwcGluZygpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IG9uZU9mTWFwcGluZyA9IHt9O1xuICAgICAgICAgICAgY29uc3QgdG9wUmVxdWlyZWQgPSBoYXNSZXF1aXJlZChwYXJlbnRTY2hlbWEpO1xuICAgICAgICAgICAgbGV0IHRhZ1JlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb25lT2YubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2NoID0gb25lT2ZbaV07XG4gICAgICAgICAgICAgICAgaWYgKChzY2ggPT09IG51bGwgfHwgc2NoID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzY2guJHJlZikgJiYgISgwLCB1dGlsXzEuc2NoZW1hSGFzUnVsZXNCdXRSZWYpKHNjaCwgaXQuc2VsZi5SVUxFUykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NoID0gY29tcGlsZV8xLnJlc29sdmVSZWYuY2FsbChpdC5zZWxmLCBpdC5zY2hlbWFFbnYucm9vdCwgaXQuYmFzZUlkLCBzY2ggPT09IG51bGwgfHwgc2NoID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzY2guJHJlZik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzY2ggaW5zdGFuY2VvZiBjb21waWxlXzEuU2NoZW1hRW52KVxuICAgICAgICAgICAgICAgICAgICAgICAgc2NoID0gc2NoLnNjaGVtYTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcFNjaCA9IChfYSA9IHNjaCA9PT0gbnVsbCB8fCBzY2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNjaC5wcm9wZXJ0aWVzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbdGFnTmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wU2NoICE9IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBkaXNjcmltaW5hdG9yOiBvbmVPZiBzdWJzY2hlbWFzIChvciByZWZlcmVuY2VkIHNjaGVtYXMpIG11c3QgaGF2ZSBcInByb3BlcnRpZXMvJHt0YWdOYW1lfVwiYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRhZ1JlcXVpcmVkID0gdGFnUmVxdWlyZWQgJiYgKHRvcFJlcXVpcmVkIHx8IGhhc1JlcXVpcmVkKHNjaCkpO1xuICAgICAgICAgICAgICAgIGFkZE1hcHBpbmdzKHByb3BTY2gsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0YWdSZXF1aXJlZClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGRpc2NyaW1pbmF0b3I6IFwiJHt0YWdOYW1lfVwiIG11c3QgYmUgcmVxdWlyZWRgKTtcbiAgICAgICAgICAgIHJldHVybiBvbmVPZk1hcHBpbmc7XG4gICAgICAgICAgICBmdW5jdGlvbiBoYXNSZXF1aXJlZCh7IHJlcXVpcmVkIH0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShyZXF1aXJlZCkgJiYgcmVxdWlyZWQuaW5jbHVkZXModGFnTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBhZGRNYXBwaW5ncyhzY2gsIGkpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NoLmNvbnN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZE1hcHBpbmcoc2NoLmNvbnN0LCBpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2NoLmVudW0pIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCB0YWdWYWx1ZSBvZiBzY2guZW51bSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkTWFwcGluZyh0YWdWYWx1ZSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZGlzY3JpbWluYXRvcjogXCJwcm9wZXJ0aWVzLyR7dGFnTmFtZX1cIiBtdXN0IGhhdmUgXCJjb25zdFwiIG9yIFwiZW51bVwiYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkTWFwcGluZyh0YWdWYWx1ZSwgaSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFnVmFsdWUgIT0gXCJzdHJpbmdcIiB8fCB0YWdWYWx1ZSBpbiBvbmVPZk1hcHBpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBkaXNjcmltaW5hdG9yOiBcIiR7dGFnTmFtZX1cIiB2YWx1ZXMgbXVzdCBiZSB1bmlxdWUgc3RyaW5nc2ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvbmVPZk1hcHBpbmdbdGFnVmFsdWVdID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkRpc2NyRXJyb3IgPSB2b2lkIDA7XG52YXIgRGlzY3JFcnJvcjtcbihmdW5jdGlvbiAoRGlzY3JFcnJvcikge1xuICAgIERpc2NyRXJyb3JbXCJUYWdcIl0gPSBcInRhZ1wiO1xuICAgIERpc2NyRXJyb3JbXCJNYXBwaW5nXCJdID0gXCJtYXBwaW5nXCI7XG59KShEaXNjckVycm9yID0gZXhwb3J0cy5EaXNjckVycm9yIHx8IChleHBvcnRzLkRpc2NyRXJyb3IgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb3JlXzEgPSByZXF1aXJlKFwiLi9jb3JlXCIpO1xuY29uc3QgdmFsaWRhdGlvbl8xID0gcmVxdWlyZShcIi4vdmFsaWRhdGlvblwiKTtcbmNvbnN0IGFwcGxpY2F0b3JfMSA9IHJlcXVpcmUoXCIuL2FwcGxpY2F0b3JcIik7XG5jb25zdCBmb3JtYXRfMSA9IHJlcXVpcmUoXCIuL2Zvcm1hdFwiKTtcbmNvbnN0IG1ldGFkYXRhXzEgPSByZXF1aXJlKFwiLi9tZXRhZGF0YVwiKTtcbmNvbnN0IGRyYWZ0N1ZvY2FidWxhcmllcyA9IFtcbiAgICBjb3JlXzEuZGVmYXVsdCxcbiAgICB2YWxpZGF0aW9uXzEuZGVmYXVsdCxcbiAgICAoMCwgYXBwbGljYXRvcl8xLmRlZmF1bHQpKCksXG4gICAgZm9ybWF0XzEuZGVmYXVsdCxcbiAgICBtZXRhZGF0YV8xLm1ldGFkYXRhVm9jYWJ1bGFyeSxcbiAgICBtZXRhZGF0YV8xLmNvbnRlbnRWb2NhYnVsYXJ5LFxuXTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRyYWZ0N1ZvY2FidWxhcmllcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRyYWZ0Ny5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZHluYW1pY0FuY2hvciA9IHZvaWQgMDtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvbmFtZXNcIik7XG5jb25zdCBjb21waWxlXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZVwiKTtcbmNvbnN0IHJlZl8xID0gcmVxdWlyZShcIi4uL2NvcmUvcmVmXCIpO1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiJGR5bmFtaWNBbmNob3JcIixcbiAgICBzY2hlbWFUeXBlOiBcInN0cmluZ1wiLFxuICAgIGNvZGU6IChjeHQpID0+IGR5bmFtaWNBbmNob3IoY3h0LCBjeHQuc2NoZW1hKSxcbn07XG5mdW5jdGlvbiBkeW5hbWljQW5jaG9yKGN4dCwgYW5jaG9yKSB7XG4gICAgY29uc3QgeyBnZW4sIGl0IH0gPSBjeHQ7XG4gICAgaXQuc2NoZW1hRW52LnJvb3QuZHluYW1pY0FuY2hvcnNbYW5jaG9yXSA9IHRydWU7XG4gICAgY29uc3QgdiA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LmR5bmFtaWNBbmNob3JzfSR7KDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkoYW5jaG9yKX1gO1xuICAgIGNvbnN0IHZhbGlkYXRlID0gaXQuZXJyU2NoZW1hUGF0aCA9PT0gXCIjXCIgPyBpdC52YWxpZGF0ZU5hbWUgOiBfZ2V0VmFsaWRhdGUoY3h0KTtcbiAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgISR7dn1gLCAoKSA9PiBnZW4uYXNzaWduKHYsIHZhbGlkYXRlKSk7XG59XG5leHBvcnRzLmR5bmFtaWNBbmNob3IgPSBkeW5hbWljQW5jaG9yO1xuZnVuY3Rpb24gX2dldFZhbGlkYXRlKGN4dCkge1xuICAgIGNvbnN0IHsgc2NoZW1hRW52LCBzY2hlbWEsIHNlbGYgfSA9IGN4dC5pdDtcbiAgICBjb25zdCB7IHJvb3QsIGJhc2VJZCwgbG9jYWxSZWZzLCBtZXRhIH0gPSBzY2hlbWFFbnYucm9vdDtcbiAgICBjb25zdCB7IHNjaGVtYUlkIH0gPSBzZWxmLm9wdHM7XG4gICAgY29uc3Qgc2NoID0gbmV3IGNvbXBpbGVfMS5TY2hlbWFFbnYoeyBzY2hlbWEsIHNjaGVtYUlkLCByb290LCBiYXNlSWQsIGxvY2FsUmVmcywgbWV0YSB9KTtcbiAgICBjb21waWxlXzEuY29tcGlsZVNjaGVtYS5jYWxsKHNlbGYsIHNjaCk7XG4gICAgcmV0dXJuICgwLCByZWZfMS5nZXRWYWxpZGF0ZSkoY3h0LCBzY2gpO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZHluYW1pY0FuY2hvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZHluYW1pY1JlZiA9IHZvaWQgMDtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvbmFtZXNcIik7XG5jb25zdCByZWZfMSA9IHJlcXVpcmUoXCIuLi9jb3JlL3JlZlwiKTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcIiRkeW5hbWljUmVmXCIsXG4gICAgc2NoZW1hVHlwZTogXCJzdHJpbmdcIixcbiAgICBjb2RlOiAoY3h0KSA9PiBkeW5hbWljUmVmKGN4dCwgY3h0LnNjaGVtYSksXG59O1xuZnVuY3Rpb24gZHluYW1pY1JlZihjeHQsIHJlZikge1xuICAgIGNvbnN0IHsgZ2VuLCBrZXl3b3JkLCBpdCB9ID0gY3h0O1xuICAgIGlmIChyZWZbMF0gIT09IFwiI1wiKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFwiJHtrZXl3b3JkfVwiIG9ubHkgc3VwcG9ydHMgaGFzaCBmcmFnbWVudCByZWZlcmVuY2VgKTtcbiAgICBjb25zdCBhbmNob3IgPSByZWYuc2xpY2UoMSk7XG4gICAgaWYgKGl0LmFsbEVycm9ycykge1xuICAgICAgICBfZHluYW1pY1JlZigpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgdmFsaWQgPSBnZW4ubGV0KFwidmFsaWRcIiwgZmFsc2UpO1xuICAgICAgICBfZHluYW1pY1JlZih2YWxpZCk7XG4gICAgICAgIGN4dC5vayh2YWxpZCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIF9keW5hbWljUmVmKHZhbGlkKSB7XG4gICAgICAgIC8vIFRPRE8gdGhlIGFzc3VtcHRpb24gaGVyZSBpcyB0aGF0IGByZWN1cnNpdmVSZWY6ICNgIGFsd2F5cyBwb2ludHMgdG8gdGhlIHJvb3RcbiAgICAgICAgLy8gb2YgdGhlIHNjaGVtYSBvYmplY3QsIHdoaWNoIGlzIG5vdCBjb3JyZWN0LCBiZWNhdXNlIHRoZXJlIG1heSBiZSAkaWQgdGhhdFxuICAgICAgICAvLyBtYWtlcyAjIHBvaW50IHRvIGl0LCBhbmQgdGhlIHRhcmdldCBzY2hlbWEgbWF5IG5vdCBjb250YWluIGR5bmFtaWMvcmVjdXJzaXZlQW5jaG9yLlxuICAgICAgICAvLyBCZWNhdXNlIG9mIHRoYXQgMiB0ZXN0cyBpbiByZWN1cnNpdmVSZWYuanNvbiBmYWlsLlxuICAgICAgICAvLyBUaGlzIGlzIGEgc2ltaWxhciBwcm9ibGVtIHRvICM4MTUgKGAkaWRgIGRvZXNuJ3QgYWx0ZXIgcmVzb2x1dGlvbiBzY29wZSBmb3IgYHsgXCIkcmVmXCI6IFwiI1wiIH1gKS5cbiAgICAgICAgLy8gKFRoaXMgcHJvYmxlbSBpcyBub3QgdGVzdGVkIGluIEpTT04tU2NoZW1hLVRlc3QtU3VpdGUpXG4gICAgICAgIGlmIChpdC5zY2hlbWFFbnYucm9vdC5keW5hbWljQW5jaG9yc1thbmNob3JdKSB7XG4gICAgICAgICAgICBjb25zdCB2ID0gZ2VuLmxldChcIl92XCIsICgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LmR5bmFtaWNBbmNob3JzfSR7KDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkoYW5jaG9yKX1gKTtcbiAgICAgICAgICAgIGdlbi5pZih2LCBfY2FsbFJlZih2LCB2YWxpZCksIF9jYWxsUmVmKGl0LnZhbGlkYXRlTmFtZSwgdmFsaWQpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIF9jYWxsUmVmKGl0LnZhbGlkYXRlTmFtZSwgdmFsaWQpKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gX2NhbGxSZWYodmFsaWRhdGUsIHZhbGlkKSB7XG4gICAgICAgIHJldHVybiB2YWxpZFxuICAgICAgICAgICAgPyAoKSA9PiBnZW4uYmxvY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICgwLCByZWZfMS5jYWxsUmVmKShjeHQsIHZhbGlkYXRlKTtcbiAgICAgICAgICAgICAgICBnZW4ubGV0KHZhbGlkLCB0cnVlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA6ICgpID0+ICgwLCByZWZfMS5jYWxsUmVmKShjeHQsIHZhbGlkYXRlKTtcbiAgICB9XG59XG5leHBvcnRzLmR5bmFtaWNSZWYgPSBkeW5hbWljUmVmO1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZHluYW1pY1JlZi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGR5bmFtaWNBbmNob3JfMSA9IHJlcXVpcmUoXCIuL2R5bmFtaWNBbmNob3JcIik7XG5jb25zdCBkeW5hbWljUmVmXzEgPSByZXF1aXJlKFwiLi9keW5hbWljUmVmXCIpO1xuY29uc3QgcmVjdXJzaXZlQW5jaG9yXzEgPSByZXF1aXJlKFwiLi9yZWN1cnNpdmVBbmNob3JcIik7XG5jb25zdCByZWN1cnNpdmVSZWZfMSA9IHJlcXVpcmUoXCIuL3JlY3Vyc2l2ZVJlZlwiKTtcbmNvbnN0IGR5bmFtaWMgPSBbZHluYW1pY0FuY2hvcl8xLmRlZmF1bHQsIGR5bmFtaWNSZWZfMS5kZWZhdWx0LCByZWN1cnNpdmVBbmNob3JfMS5kZWZhdWx0LCByZWN1cnNpdmVSZWZfMS5kZWZhdWx0XTtcbmV4cG9ydHMuZGVmYXVsdCA9IGR5bmFtaWM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGR5bmFtaWNBbmNob3JfMSA9IHJlcXVpcmUoXCIuL2R5bmFtaWNBbmNob3JcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiJHJlY3Vyc2l2ZUFuY2hvclwiLFxuICAgIHNjaGVtYVR5cGU6IFwiYm9vbGVhblwiLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGlmIChjeHQuc2NoZW1hKVxuICAgICAgICAgICAgKDAsIGR5bmFtaWNBbmNob3JfMS5keW5hbWljQW5jaG9yKShjeHQsIFwiXCIpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICAoMCwgdXRpbF8xLmNoZWNrU3RyaWN0TW9kZSkoY3h0Lml0LCBcIiRyZWN1cnNpdmVBbmNob3I6IGZhbHNlIGlzIGlnbm9yZWRcIik7XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWN1cnNpdmVBbmNob3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBkeW5hbWljUmVmXzEgPSByZXF1aXJlKFwiLi9keW5hbWljUmVmXCIpO1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiJHJlY3Vyc2l2ZVJlZlwiLFxuICAgIHNjaGVtYVR5cGU6IFwic3RyaW5nXCIsXG4gICAgY29kZTogKGN4dCkgPT4gKDAsIGR5bmFtaWNSZWZfMS5keW5hbWljUmVmKShjeHQsIGN4dC5zY2hlbWEpLFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlY3Vyc2l2ZVJlZi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBzY2hlbWFDb2RlIH0pID0+ICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBtYXRjaCBmb3JtYXQgXCIke3NjaGVtYUNvZGV9XCJgLFxuICAgIHBhcmFtczogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7Zm9ybWF0OiAke3NjaGVtYUNvZGV9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiZm9ybWF0XCIsXG4gICAgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdLFxuICAgIHNjaGVtYVR5cGU6IFwic3RyaW5nXCIsXG4gICAgJGRhdGE6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQsIHJ1bGVUeXBlKSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCAkZGF0YSwgc2NoZW1hLCBzY2hlbWFDb2RlLCBpdCB9ID0gY3h0O1xuICAgICAgICBjb25zdCB7IG9wdHMsIGVyclNjaGVtYVBhdGgsIHNjaGVtYUVudiwgc2VsZiB9ID0gaXQ7XG4gICAgICAgIGlmICghb3B0cy52YWxpZGF0ZUZvcm1hdHMpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICgkZGF0YSlcbiAgICAgICAgICAgIHZhbGlkYXRlJERhdGFGb3JtYXQoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdmFsaWRhdGVGb3JtYXQoKTtcbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGUkRGF0YUZvcm1hdCgpIHtcbiAgICAgICAgICAgIGNvbnN0IGZtdHMgPSBnZW4uc2NvcGVWYWx1ZShcImZvcm1hdHNcIiwge1xuICAgICAgICAgICAgICAgIHJlZjogc2VsZi5mb3JtYXRzLFxuICAgICAgICAgICAgICAgIGNvZGU6IG9wdHMuY29kZS5mb3JtYXRzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBmRGVmID0gZ2VuLmNvbnN0KFwiZkRlZlwiLCAoMCwgY29kZWdlbl8xLl8pIGAke2ZtdHN9WyR7c2NoZW1hQ29kZX1dYCk7XG4gICAgICAgICAgICBjb25zdCBmVHlwZSA9IGdlbi5sZXQoXCJmVHlwZVwiKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IGdlbi5sZXQoXCJmb3JtYXRcIik7XG4gICAgICAgICAgICAvLyBUT0RPIHNpbXBsaWZ5XG4gICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgdHlwZW9mICR7ZkRlZn0gPT0gXCJvYmplY3RcIiAmJiAhKCR7ZkRlZn0gaW5zdGFuY2VvZiBSZWdFeHApYCwgKCkgPT4gZ2VuLmFzc2lnbihmVHlwZSwgKDAsIGNvZGVnZW5fMS5fKSBgJHtmRGVmfS50eXBlIHx8IFwic3RyaW5nXCJgKS5hc3NpZ24oZm9ybWF0LCAoMCwgY29kZWdlbl8xLl8pIGAke2ZEZWZ9LnZhbGlkYXRlYCksICgpID0+IGdlbi5hc3NpZ24oZlR5cGUsICgwLCBjb2RlZ2VuXzEuXykgYFwic3RyaW5nXCJgKS5hc3NpZ24oZm9ybWF0LCBmRGVmKSk7XG4gICAgICAgICAgICBjeHQuZmFpbCRkYXRhKCgwLCBjb2RlZ2VuXzEub3IpKHVua25vd25GbXQoKSwgaW52YWxpZEZtdCgpKSk7XG4gICAgICAgICAgICBmdW5jdGlvbiB1bmtub3duRm10KCkge1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLnN0cmljdFNjaGVtYSA9PT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb2RlZ2VuXzEubmlsO1xuICAgICAgICAgICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGAke3NjaGVtYUNvZGV9ICYmICEke2Zvcm1hdH1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gaW52YWxpZEZtdCgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYWxsRm9ybWF0ID0gc2NoZW1hRW52LiRhc3luY1xuICAgICAgICAgICAgICAgICAgICA/ICgwLCBjb2RlZ2VuXzEuXykgYCgke2ZEZWZ9LmFzeW5jID8gYXdhaXQgJHtmb3JtYXR9KCR7ZGF0YX0pIDogJHtmb3JtYXR9KCR7ZGF0YX0pKWBcbiAgICAgICAgICAgICAgICAgICAgOiAoMCwgY29kZWdlbl8xLl8pIGAke2Zvcm1hdH0oJHtkYXRhfSlgO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkRGF0YSA9ICgwLCBjb2RlZ2VuXzEuXykgYCh0eXBlb2YgJHtmb3JtYXR9ID09IFwiZnVuY3Rpb25cIiA/ICR7Y2FsbEZvcm1hdH0gOiAke2Zvcm1hdH0udGVzdCgke2RhdGF9KSlgO1xuICAgICAgICAgICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGAke2Zvcm1hdH0gJiYgJHtmb3JtYXR9ICE9PSB0cnVlICYmICR7ZlR5cGV9ID09PSAke3J1bGVUeXBlfSAmJiAhJHt2YWxpZERhdGF9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdCgpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdERlZiA9IHNlbGYuZm9ybWF0c1tzY2hlbWFdO1xuICAgICAgICAgICAgaWYgKCFmb3JtYXREZWYpIHtcbiAgICAgICAgICAgICAgICB1bmtub3duRm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZvcm1hdERlZiA9PT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBbZm10VHlwZSwgZm9ybWF0LCBmbXRSZWZdID0gZ2V0Rm9ybWF0KGZvcm1hdERlZik7XG4gICAgICAgICAgICBpZiAoZm10VHlwZSA9PT0gcnVsZVR5cGUpXG4gICAgICAgICAgICAgICAgY3h0LnBhc3ModmFsaWRDb25kaXRpb24oKSk7XG4gICAgICAgICAgICBmdW5jdGlvbiB1bmtub3duRm9ybWF0KCkge1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLnN0cmljdFNjaGVtYSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2dnZXIud2Fybih1bmtub3duTXNnKCkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih1bmtub3duTXNnKCkpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHVua25vd25Nc2coKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgdW5rbm93biBmb3JtYXQgXCIke3NjaGVtYX1cIiBpZ25vcmVkIGluIHNjaGVtYSBhdCBwYXRoIFwiJHtlcnJTY2hlbWFQYXRofVwiYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRGb3JtYXQoZm10RGVmKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29kZSA9IGZtdERlZiBpbnN0YW5jZW9mIFJlZ0V4cFxuICAgICAgICAgICAgICAgICAgICA/ICgwLCBjb2RlZ2VuXzEucmVnZXhwQ29kZSkoZm10RGVmKVxuICAgICAgICAgICAgICAgICAgICA6IG9wdHMuY29kZS5mb3JtYXRzXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICgwLCBjb2RlZ2VuXzEuXykgYCR7b3B0cy5jb2RlLmZvcm1hdHN9JHsoMCwgY29kZWdlbl8xLmdldFByb3BlcnR5KShzY2hlbWEpfWBcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZtdCA9IGdlbi5zY29wZVZhbHVlKFwiZm9ybWF0c1wiLCB7IGtleTogc2NoZW1hLCByZWY6IGZtdERlZiwgY29kZSB9KTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZtdERlZiA9PSBcIm9iamVjdFwiICYmICEoZm10RGVmIGluc3RhbmNlb2YgUmVnRXhwKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW2ZtdERlZi50eXBlIHx8IFwic3RyaW5nXCIsIGZtdERlZi52YWxpZGF0ZSwgKDAsIGNvZGVnZW5fMS5fKSBgJHtmbXR9LnZhbGlkYXRlYF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbXCJzdHJpbmdcIiwgZm10RGVmLCBmbXRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gdmFsaWRDb25kaXRpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXREZWYgPT0gXCJvYmplY3RcIiAmJiAhKGZvcm1hdERlZiBpbnN0YW5jZW9mIFJlZ0V4cCkgJiYgZm9ybWF0RGVmLmFzeW5jKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2NoZW1hRW52LiRhc3luYylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImFzeW5jIGZvcm1hdCBpbiBzeW5jIHNjaGVtYVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYGF3YWl0ICR7Zm10UmVmfSgke2RhdGF9KWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgZm9ybWF0ID09IFwiZnVuY3Rpb25cIiA/ICgwLCBjb2RlZ2VuXzEuXykgYCR7Zm10UmVmfSgke2RhdGF9KWAgOiAoMCwgY29kZWdlbl8xLl8pIGAke2ZtdFJlZn0udGVzdCgke2RhdGF9KWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZvcm1hdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGZvcm1hdF8xID0gcmVxdWlyZShcIi4vZm9ybWF0XCIpO1xuY29uc3QgZm9ybWF0ID0gW2Zvcm1hdF8xLmRlZmF1bHRdO1xuZXhwb3J0cy5kZWZhdWx0ID0gZm9ybWF0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbnRlbnRWb2NhYnVsYXJ5ID0gZXhwb3J0cy5tZXRhZGF0YVZvY2FidWxhcnkgPSB2b2lkIDA7XG5leHBvcnRzLm1ldGFkYXRhVm9jYWJ1bGFyeSA9IFtcbiAgICBcInRpdGxlXCIsXG4gICAgXCJkZXNjcmlwdGlvblwiLFxuICAgIFwiZGVmYXVsdFwiLFxuICAgIFwiZGVwcmVjYXRlZFwiLFxuICAgIFwicmVhZE9ubHlcIixcbiAgICBcIndyaXRlT25seVwiLFxuICAgIFwiZXhhbXBsZXNcIixcbl07XG5leHBvcnRzLmNvbnRlbnRWb2NhYnVsYXJ5ID0gW1xuICAgIFwiY29udGVudE1lZGlhVHlwZVwiLFxuICAgIFwiY29udGVudEVuY29kaW5nXCIsXG4gICAgXCJjb250ZW50U2NoZW1hXCIsXG5dO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWV0YWRhdGEuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBkZXBlbmRlbnRSZXF1aXJlZF8xID0gcmVxdWlyZShcIi4vdmFsaWRhdGlvbi9kZXBlbmRlbnRSZXF1aXJlZFwiKTtcbmNvbnN0IGRlcGVuZGVudFNjaGVtYXNfMSA9IHJlcXVpcmUoXCIuL2FwcGxpY2F0b3IvZGVwZW5kZW50U2NoZW1hc1wiKTtcbmNvbnN0IGxpbWl0Q29udGFpbnNfMSA9IHJlcXVpcmUoXCIuL3ZhbGlkYXRpb24vbGltaXRDb250YWluc1wiKTtcbmNvbnN0IG5leHQgPSBbZGVwZW5kZW50UmVxdWlyZWRfMS5kZWZhdWx0LCBkZXBlbmRlbnRTY2hlbWFzXzEuZGVmYXVsdCwgbGltaXRDb250YWluc18xLmRlZmF1bHRdO1xuZXhwb3J0cy5kZWZhdWx0ID0gbmV4dDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5leHQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB1bmV2YWx1YXRlZFByb3BlcnRpZXNfMSA9IHJlcXVpcmUoXCIuL3VuZXZhbHVhdGVkUHJvcGVydGllc1wiKTtcbmNvbnN0IHVuZXZhbHVhdGVkSXRlbXNfMSA9IHJlcXVpcmUoXCIuL3VuZXZhbHVhdGVkSXRlbXNcIik7XG5jb25zdCB1bmV2YWx1YXRlZCA9IFt1bmV2YWx1YXRlZFByb3BlcnRpZXNfMS5kZWZhdWx0LCB1bmV2YWx1YXRlZEl0ZW1zXzEuZGVmYXVsdF07XG5leHBvcnRzLmRlZmF1bHQgPSB1bmV2YWx1YXRlZDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBwYXJhbXM6IHsgbGVuIH0gfSkgPT4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IE5PVCBoYXZlIG1vcmUgdGhhbiAke2xlbn0gaXRlbXNgLFxuICAgIHBhcmFtczogKHsgcGFyYW1zOiB7IGxlbiB9IH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHtsaW1pdDogJHtsZW59fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwidW5ldmFsdWF0ZWRJdGVtc1wiLFxuICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICBzY2hlbWFUeXBlOiBbXCJib29sZWFuXCIsIFwib2JqZWN0XCJdLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIGRhdGEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gaXQuaXRlbXMgfHwgMDtcbiAgICAgICAgaWYgKGl0ZW1zID09PSB0cnVlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBsZW4gPSBnZW4uY29uc3QoXCJsZW5cIiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfS5sZW5ndGhgKTtcbiAgICAgICAgaWYgKHNjaGVtYSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGN4dC5zZXRQYXJhbXMoeyBsZW46IGl0ZW1zIH0pO1xuICAgICAgICAgICAgY3h0LmZhaWwoKDAsIGNvZGVnZW5fMS5fKSBgJHtsZW59ID4gJHtpdGVtc31gKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygc2NoZW1hID09IFwib2JqZWN0XCIgJiYgISgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWEpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi52YXIoXCJ2YWxpZFwiLCAoMCwgY29kZWdlbl8xLl8pIGAke2xlbn0gPD0gJHtpdGVtc31gKTtcbiAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLm5vdCkodmFsaWQpLCAoKSA9PiB2YWxpZGF0ZUl0ZW1zKHZhbGlkLCBpdGVtcykpO1xuICAgICAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICAgICAgfVxuICAgICAgICBpdC5pdGVtcyA9IHRydWU7XG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlSXRlbXModmFsaWQsIGZyb20pIHtcbiAgICAgICAgICAgIGdlbi5mb3JSYW5nZShcImlcIiwgZnJvbSwgbGVuLCAoaSkgPT4ge1xuICAgICAgICAgICAgICAgIGN4dC5zdWJzY2hlbWEoeyBrZXl3b3JkOiBcInVuZXZhbHVhdGVkSXRlbXNcIiwgZGF0YVByb3A6IGksIGRhdGFQcm9wVHlwZTogdXRpbF8xLlR5cGUuTnVtIH0sIHZhbGlkKTtcbiAgICAgICAgICAgICAgICBpZiAoIWl0LmFsbEVycm9ycylcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEubm90KSh2YWxpZCksICgpID0+IGdlbi5icmVhaygpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11bmV2YWx1YXRlZEl0ZW1zLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvbmFtZXNcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiBcIm11c3QgTk9UIGhhdmUgdW5ldmFsdWF0ZWQgcHJvcGVydGllc1wiLFxuICAgIHBhcmFtczogKHsgcGFyYW1zIH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHt1bmV2YWx1YXRlZFByb3BlcnR5OiAke3BhcmFtcy51bmV2YWx1YXRlZFByb3BlcnR5fX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcInVuZXZhbHVhdGVkUHJvcGVydGllc1wiLFxuICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgc2NoZW1hVHlwZTogW1wiYm9vbGVhblwiLCBcIm9iamVjdFwiXSxcbiAgICB0cmFja0Vycm9yczogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBkYXRhLCBlcnJzQ291bnQsIGl0IH0gPSBjeHQ7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoIWVycnNDb3VudClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImFqdiBpbXBsZW1lbnRhdGlvbiBlcnJvclwiKTtcbiAgICAgICAgY29uc3QgeyBhbGxFcnJvcnMsIHByb3BzIH0gPSBpdDtcbiAgICAgICAgaWYgKHByb3BzIGluc3RhbmNlb2YgY29kZWdlbl8xLk5hbWUpIHtcbiAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke3Byb3BzfSAhPT0gdHJ1ZWAsICgpID0+IGdlbi5mb3JJbihcImtleVwiLCBkYXRhLCAoa2V5KSA9PiBnZW4uaWYodW5ldmFsdWF0ZWREeW5hbWljKHByb3BzLCBrZXkpLCAoKSA9PiB1bmV2YWx1YXRlZFByb3BDb2RlKGtleSkpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocHJvcHMgIT09IHRydWUpIHtcbiAgICAgICAgICAgIGdlbi5mb3JJbihcImtleVwiLCBkYXRhLCAoa2V5KSA9PiBwcm9wcyA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgPyB1bmV2YWx1YXRlZFByb3BDb2RlKGtleSlcbiAgICAgICAgICAgICAgICA6IGdlbi5pZih1bmV2YWx1YXRlZFN0YXRpYyhwcm9wcywga2V5KSwgKCkgPT4gdW5ldmFsdWF0ZWRQcm9wQ29kZShrZXkpKSk7XG4gICAgICAgIH1cbiAgICAgICAgaXQucHJvcHMgPSB0cnVlO1xuICAgICAgICBjeHQub2soKDAsIGNvZGVnZW5fMS5fKSBgJHtlcnJzQ291bnR9ID09PSAke25hbWVzXzEuZGVmYXVsdC5lcnJvcnN9YCk7XG4gICAgICAgIGZ1bmN0aW9uIHVuZXZhbHVhdGVkUHJvcENvZGUoa2V5KSB7XG4gICAgICAgICAgICBpZiAoc2NoZW1hID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGN4dC5zZXRQYXJhbXMoeyB1bmV2YWx1YXRlZFByb3BlcnR5OiBrZXkgfSk7XG4gICAgICAgICAgICAgICAgY3h0LmVycm9yKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFhbGxFcnJvcnMpXG4gICAgICAgICAgICAgICAgICAgIGdlbi5icmVhaygpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaGVtYSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5uYW1lKFwidmFsaWRcIik7XG4gICAgICAgICAgICAgICAgY3h0LnN1YnNjaGVtYSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXdvcmQ6IFwidW5ldmFsdWF0ZWRQcm9wZXJ0aWVzXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFQcm9wOiBrZXksXG4gICAgICAgICAgICAgICAgICAgIGRhdGFQcm9wVHlwZTogdXRpbF8xLlR5cGUuU3RyLFxuICAgICAgICAgICAgICAgIH0sIHZhbGlkKTtcbiAgICAgICAgICAgICAgICBpZiAoIWFsbEVycm9ycylcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEubm90KSh2YWxpZCksICgpID0+IGdlbi5icmVhaygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB1bmV2YWx1YXRlZER5bmFtaWMoZXZhbHVhdGVkUHJvcHMsIGtleSkge1xuICAgICAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYCEke2V2YWx1YXRlZFByb3BzfSB8fCAhJHtldmFsdWF0ZWRQcm9wc31bJHtrZXl9XWA7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdW5ldmFsdWF0ZWRTdGF0aWMoZXZhbHVhdGVkUHJvcHMsIGtleSkge1xuICAgICAgICAgICAgY29uc3QgcHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcCBpbiBldmFsdWF0ZWRQcm9wcykge1xuICAgICAgICAgICAgICAgIGlmIChldmFsdWF0ZWRQcm9wc1twXSA9PT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgcHMucHVzaCgoMCwgY29kZWdlbl8xLl8pIGAke2tleX0gIT09ICR7cH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLmFuZCkoLi4ucHMpO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11bmV2YWx1YXRlZFByb3BlcnRpZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGVxdWFsXzEgPSByZXF1aXJlKFwiLi4vLi4vcnVudGltZS9lcXVhbFwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6IFwibXVzdCBiZSBlcXVhbCB0byBjb25zdGFudFwiLFxuICAgIHBhcmFtczogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7YWxsb3dlZFZhbHVlOiAke3NjaGVtYUNvZGV9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiY29uc3RcIixcbiAgICAkZGF0YTogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgZGF0YSwgJGRhdGEsIHNjaGVtYUNvZGUsIHNjaGVtYSB9ID0gY3h0O1xuICAgICAgICBpZiAoJGRhdGEgfHwgKHNjaGVtYSAmJiB0eXBlb2Ygc2NoZW1hID09IFwib2JqZWN0XCIpKSB7XG4gICAgICAgICAgICBjeHQuZmFpbCRkYXRhKCgwLCBjb2RlZ2VuXzEuXykgYCEkeygwLCB1dGlsXzEudXNlRnVuYykoZ2VuLCBlcXVhbF8xLmRlZmF1bHQpfSgke2RhdGF9LCAke3NjaGVtYUNvZGV9KWApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3h0LmZhaWwoKDAsIGNvZGVnZW5fMS5fKSBgJHtzY2hlbWF9ICE9PSAke2RhdGF9YCk7XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZGVwZW5kZW5jaWVzXzEgPSByZXF1aXJlKFwiLi4vYXBwbGljYXRvci9kZXBlbmRlbmNpZXNcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJkZXBlbmRlbnRSZXF1aXJlZFwiLFxuICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgc2NoZW1hVHlwZTogXCJvYmplY3RcIixcbiAgICBlcnJvcjogZGVwZW5kZW5jaWVzXzEuZXJyb3IsXG4gICAgY29kZTogKGN4dCkgPT4gKDAsIGRlcGVuZGVuY2llc18xLnZhbGlkYXRlUHJvcGVydHlEZXBzKShjeHQpLFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlcGVuZGVudFJlcXVpcmVkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBlcXVhbF8xID0gcmVxdWlyZShcIi4uLy4uL3J1bnRpbWUvZXF1YWxcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiBcIm11c3QgYmUgZXF1YWwgdG8gb25lIG9mIHRoZSBhbGxvd2VkIHZhbHVlc1wiLFxuICAgIHBhcmFtczogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7YWxsb3dlZFZhbHVlczogJHtzY2hlbWFDb2RlfX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcImVudW1cIixcbiAgICBzY2hlbWFUeXBlOiBcImFycmF5XCIsXG4gICAgJGRhdGE6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIGRhdGEsICRkYXRhLCBzY2hlbWEsIHNjaGVtYUNvZGUsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGlmICghJGRhdGEgJiYgc2NoZW1hLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImVudW0gbXVzdCBoYXZlIG5vbi1lbXB0eSBhcnJheVwiKTtcbiAgICAgICAgY29uc3QgdXNlTG9vcCA9IHNjaGVtYS5sZW5ndGggPj0gaXQub3B0cy5sb29wRW51bTtcbiAgICAgICAgbGV0IGVxbDtcbiAgICAgICAgY29uc3QgZ2V0RXFsID0gKCkgPT4gKGVxbCAhPT0gbnVsbCAmJiBlcWwgIT09IHZvaWQgMCA/IGVxbCA6IChlcWwgPSAoMCwgdXRpbF8xLnVzZUZ1bmMpKGdlbiwgZXF1YWxfMS5kZWZhdWx0KSkpO1xuICAgICAgICBsZXQgdmFsaWQ7XG4gICAgICAgIGlmICh1c2VMb29wIHx8ICRkYXRhKSB7XG4gICAgICAgICAgICB2YWxpZCA9IGdlbi5sZXQoXCJ2YWxpZFwiKTtcbiAgICAgICAgICAgIGN4dC5ibG9jayRkYXRhKHZhbGlkLCBsb29wRW51bSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShzY2hlbWEpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImFqdiBpbXBsZW1lbnRhdGlvbiBlcnJvclwiKTtcbiAgICAgICAgICAgIGNvbnN0IHZTY2hlbWEgPSBnZW4uY29uc3QoXCJ2U2NoZW1hXCIsIHNjaGVtYUNvZGUpO1xuICAgICAgICAgICAgdmFsaWQgPSAoMCwgY29kZWdlbl8xLm9yKSguLi5zY2hlbWEubWFwKChfeCwgaSkgPT4gZXF1YWxDb2RlKHZTY2hlbWEsIGkpKSk7XG4gICAgICAgIH1cbiAgICAgICAgY3h0LnBhc3ModmFsaWQpO1xuICAgICAgICBmdW5jdGlvbiBsb29wRW51bSgpIHtcbiAgICAgICAgICAgIGdlbi5hc3NpZ24odmFsaWQsIGZhbHNlKTtcbiAgICAgICAgICAgIGdlbi5mb3JPZihcInZcIiwgc2NoZW1hQ29kZSwgKHYpID0+IGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2dldEVxbCgpfSgke2RhdGF9LCAke3Z9KWAsICgpID0+IGdlbi5hc3NpZ24odmFsaWQsIHRydWUpLmJyZWFrKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBlcXVhbENvZGUodlNjaGVtYSwgaSkge1xuICAgICAgICAgICAgY29uc3Qgc2NoID0gc2NoZW1hW2ldO1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBzY2ggPT09IFwib2JqZWN0XCIgJiYgc2NoICE9PSBudWxsXG4gICAgICAgICAgICAgICAgPyAoMCwgY29kZWdlbl8xLl8pIGAke2dldEVxbCgpfSgke2RhdGF9LCAke3ZTY2hlbWF9WyR7aX1dKWBcbiAgICAgICAgICAgICAgICA6ICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0gPT09ICR7c2NofWA7XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVudW0uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBsaW1pdE51bWJlcl8xID0gcmVxdWlyZShcIi4vbGltaXROdW1iZXJcIik7XG5jb25zdCBtdWx0aXBsZU9mXzEgPSByZXF1aXJlKFwiLi9tdWx0aXBsZU9mXCIpO1xuY29uc3QgbGltaXRMZW5ndGhfMSA9IHJlcXVpcmUoXCIuL2xpbWl0TGVuZ3RoXCIpO1xuY29uc3QgcGF0dGVybl8xID0gcmVxdWlyZShcIi4vcGF0dGVyblwiKTtcbmNvbnN0IGxpbWl0UHJvcGVydGllc18xID0gcmVxdWlyZShcIi4vbGltaXRQcm9wZXJ0aWVzXCIpO1xuY29uc3QgcmVxdWlyZWRfMSA9IHJlcXVpcmUoXCIuL3JlcXVpcmVkXCIpO1xuY29uc3QgbGltaXRJdGVtc18xID0gcmVxdWlyZShcIi4vbGltaXRJdGVtc1wiKTtcbmNvbnN0IHVuaXF1ZUl0ZW1zXzEgPSByZXF1aXJlKFwiLi91bmlxdWVJdGVtc1wiKTtcbmNvbnN0IGNvbnN0XzEgPSByZXF1aXJlKFwiLi9jb25zdFwiKTtcbmNvbnN0IGVudW1fMSA9IHJlcXVpcmUoXCIuL2VudW1cIik7XG5jb25zdCB2YWxpZGF0aW9uID0gW1xuICAgIC8vIG51bWJlclxuICAgIGxpbWl0TnVtYmVyXzEuZGVmYXVsdCxcbiAgICBtdWx0aXBsZU9mXzEuZGVmYXVsdCxcbiAgICAvLyBzdHJpbmdcbiAgICBsaW1pdExlbmd0aF8xLmRlZmF1bHQsXG4gICAgcGF0dGVybl8xLmRlZmF1bHQsXG4gICAgLy8gb2JqZWN0XG4gICAgbGltaXRQcm9wZXJ0aWVzXzEuZGVmYXVsdCxcbiAgICByZXF1aXJlZF8xLmRlZmF1bHQsXG4gICAgLy8gYXJyYXlcbiAgICBsaW1pdEl0ZW1zXzEuZGVmYXVsdCxcbiAgICB1bmlxdWVJdGVtc18xLmRlZmF1bHQsXG4gICAgLy8gYW55XG4gICAgeyBrZXl3b3JkOiBcInR5cGVcIiwgc2NoZW1hVHlwZTogW1wic3RyaW5nXCIsIFwiYXJyYXlcIl0gfSxcbiAgICB7IGtleXdvcmQ6IFwibnVsbGFibGVcIiwgc2NoZW1hVHlwZTogXCJib29sZWFuXCIgfSxcbiAgICBjb25zdF8xLmRlZmF1bHQsXG4gICAgZW51bV8xLmRlZmF1bHQsXG5dO1xuZXhwb3J0cy5kZWZhdWx0ID0gdmFsaWRhdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBbXCJtYXhDb250YWluc1wiLCBcIm1pbkNvbnRhaW5zXCJdLFxuICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICBzY2hlbWFUeXBlOiBcIm51bWJlclwiLFxuICAgIGNvZGUoeyBrZXl3b3JkLCBwYXJlbnRTY2hlbWEsIGl0IH0pIHtcbiAgICAgICAgaWYgKHBhcmVudFNjaGVtYS5jb250YWlucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAoMCwgdXRpbF8xLmNoZWNrU3RyaWN0TW9kZSkoaXQsIGBcIiR7a2V5d29yZH1cIiB3aXRob3V0IFwiY29udGFpbnNcIiBpcyBpZ25vcmVkYCk7XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpbWl0Q29udGFpbnMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZSh7IGtleXdvcmQsIHNjaGVtYUNvZGUgfSkge1xuICAgICAgICBjb25zdCBjb21wID0ga2V5d29yZCA9PT0gXCJtYXhJdGVtc1wiID8gXCJtb3JlXCIgOiBcImZld2VyXCI7XG4gICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgTk9UIGhhdmUgJHtjb21wfSB0aGFuICR7c2NoZW1hQ29kZX0gaXRlbXNgO1xuICAgIH0sXG4gICAgcGFyYW1zOiAoeyBzY2hlbWFDb2RlIH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHtsaW1pdDogJHtzY2hlbWFDb2RlfX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBbXCJtYXhJdGVtc1wiLCBcIm1pbkl0ZW1zXCJdLFxuICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICBzY2hlbWFUeXBlOiBcIm51bWJlclwiLFxuICAgICRkYXRhOiB0cnVlLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsga2V5d29yZCwgZGF0YSwgc2NoZW1hQ29kZSB9ID0gY3h0O1xuICAgICAgICBjb25zdCBvcCA9IGtleXdvcmQgPT09IFwibWF4SXRlbXNcIiA/IGNvZGVnZW5fMS5vcGVyYXRvcnMuR1QgOiBjb2RlZ2VuXzEub3BlcmF0b3JzLkxUO1xuICAgICAgICBjeHQuZmFpbCRkYXRhKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0ubGVuZ3RoICR7b3B9ICR7c2NoZW1hQ29kZX1gKTtcbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpbWl0SXRlbXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IHVjczJsZW5ndGhfMSA9IHJlcXVpcmUoXCIuLi8uLi9ydW50aW1lL3VjczJsZW5ndGhcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlKHsga2V5d29yZCwgc2NoZW1hQ29kZSB9KSB7XG4gICAgICAgIGNvbnN0IGNvbXAgPSBrZXl3b3JkID09PSBcIm1heExlbmd0aFwiID8gXCJtb3JlXCIgOiBcImZld2VyXCI7XG4gICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgTk9UIGhhdmUgJHtjb21wfSB0aGFuICR7c2NoZW1hQ29kZX0gY2hhcmFjdGVyc2A7XG4gICAgfSxcbiAgICBwYXJhbXM6ICh7IHNjaGVtYUNvZGUgfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge2xpbWl0OiAke3NjaGVtYUNvZGV9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFtcIm1heExlbmd0aFwiLCBcIm1pbkxlbmd0aFwiXSxcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIHNjaGVtYVR5cGU6IFwibnVtYmVyXCIsXG4gICAgJGRhdGE6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBrZXl3b3JkLCBkYXRhLCBzY2hlbWFDb2RlLCBpdCB9ID0gY3h0O1xuICAgICAgICBjb25zdCBvcCA9IGtleXdvcmQgPT09IFwibWF4TGVuZ3RoXCIgPyBjb2RlZ2VuXzEub3BlcmF0b3JzLkdUIDogY29kZWdlbl8xLm9wZXJhdG9ycy5MVDtcbiAgICAgICAgY29uc3QgbGVuID0gaXQub3B0cy51bmljb2RlID09PSBmYWxzZSA/ICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0ubGVuZ3RoYCA6ICgwLCBjb2RlZ2VuXzEuXykgYCR7KDAsIHV0aWxfMS51c2VGdW5jKShjeHQuZ2VuLCB1Y3MybGVuZ3RoXzEuZGVmYXVsdCl9KCR7ZGF0YX0pYDtcbiAgICAgICAgY3h0LmZhaWwkZGF0YSgoMCwgY29kZWdlbl8xLl8pIGAke2xlbn0gJHtvcH0gJHtzY2hlbWFDb2RlfWApO1xuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGltaXRMZW5ndGguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3Qgb3BzID0gY29kZWdlbl8xLm9wZXJhdG9ycztcbmNvbnN0IEtXRHMgPSB7XG4gICAgbWF4aW11bTogeyBva1N0cjogXCI8PVwiLCBvazogb3BzLkxURSwgZmFpbDogb3BzLkdUIH0sXG4gICAgbWluaW11bTogeyBva1N0cjogXCI+PVwiLCBvazogb3BzLkdURSwgZmFpbDogb3BzLkxUIH0sXG4gICAgZXhjbHVzaXZlTWF4aW11bTogeyBva1N0cjogXCI8XCIsIG9rOiBvcHMuTFQsIGZhaWw6IG9wcy5HVEUgfSxcbiAgICBleGNsdXNpdmVNaW5pbXVtOiB7IG9rU3RyOiBcIj5cIiwgb2s6IG9wcy5HVCwgZmFpbDogb3BzLkxURSB9LFxufTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IGtleXdvcmQsIHNjaGVtYUNvZGUgfSkgPT4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IGJlICR7S1dEc1trZXl3b3JkXS5va1N0cn0gJHtzY2hlbWFDb2RlfWAsXG4gICAgcGFyYW1zOiAoeyBrZXl3b3JkLCBzY2hlbWFDb2RlIH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHtjb21wYXJpc29uOiAke0tXRHNba2V5d29yZF0ub2tTdHJ9LCBsaW1pdDogJHtzY2hlbWFDb2RlfX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBPYmplY3Qua2V5cyhLV0RzKSxcbiAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgIHNjaGVtYVR5cGU6IFwibnVtYmVyXCIsXG4gICAgJGRhdGE6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBrZXl3b3JkLCBkYXRhLCBzY2hlbWFDb2RlIH0gPSBjeHQ7XG4gICAgICAgIGN4dC5mYWlsJGRhdGEoKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfSAke0tXRHNba2V5d29yZF0uZmFpbH0gJHtzY2hlbWFDb2RlfSB8fCBpc05hTigke2RhdGF9KWApO1xuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGltaXROdW1iZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZSh7IGtleXdvcmQsIHNjaGVtYUNvZGUgfSkge1xuICAgICAgICBjb25zdCBjb21wID0ga2V5d29yZCA9PT0gXCJtYXhQcm9wZXJ0aWVzXCIgPyBcIm1vcmVcIiA6IFwiZmV3ZXJcIjtcbiAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBOT1QgaGF2ZSAke2NvbXB9IHRoYW4gJHtzY2hlbWFDb2RlfSBwcm9wZXJ0aWVzYDtcbiAgICB9LFxuICAgIHBhcmFtczogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7bGltaXQ6ICR7c2NoZW1hQ29kZX19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogW1wibWF4UHJvcGVydGllc1wiLCBcIm1pblByb3BlcnRpZXNcIl0sXG4gICAgdHlwZTogXCJvYmplY3RcIixcbiAgICBzY2hlbWFUeXBlOiBcIm51bWJlclwiLFxuICAgICRkYXRhOiB0cnVlLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsga2V5d29yZCwgZGF0YSwgc2NoZW1hQ29kZSB9ID0gY3h0O1xuICAgICAgICBjb25zdCBvcCA9IGtleXdvcmQgPT09IFwibWF4UHJvcGVydGllc1wiID8gY29kZWdlbl8xLm9wZXJhdG9ycy5HVCA6IGNvZGVnZW5fMS5vcGVyYXRvcnMuTFQ7XG4gICAgICAgIGN4dC5mYWlsJGRhdGEoKDAsIGNvZGVnZW5fMS5fKSBgT2JqZWN0LmtleXMoJHtkYXRhfSkubGVuZ3RoICR7b3B9ICR7c2NoZW1hQ29kZX1gKTtcbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpbWl0UHJvcGVydGllcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBzY2hlbWFDb2RlIH0pID0+ICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBiZSBtdWx0aXBsZSBvZiAke3NjaGVtYUNvZGV9YCxcbiAgICBwYXJhbXM6ICh7IHNjaGVtYUNvZGUgfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge211bHRpcGxlT2Y6ICR7c2NoZW1hQ29kZX19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJtdWx0aXBsZU9mXCIsXG4gICAgdHlwZTogXCJudW1iZXJcIixcbiAgICBzY2hlbWFUeXBlOiBcIm51bWJlclwiLFxuICAgICRkYXRhOiB0cnVlLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCBzY2hlbWFDb2RlLCBpdCB9ID0gY3h0O1xuICAgICAgICAvLyBjb25zdCBiZHQgPSBiYWQkRGF0YVR5cGUoc2NoZW1hQ29kZSwgPHN0cmluZz5kZWYuc2NoZW1hVHlwZSwgJGRhdGEpXG4gICAgICAgIGNvbnN0IHByZWMgPSBpdC5vcHRzLm11bHRpcGxlT2ZQcmVjaXNpb247XG4gICAgICAgIGNvbnN0IHJlcyA9IGdlbi5sZXQoXCJyZXNcIik7XG4gICAgICAgIGNvbnN0IGludmFsaWQgPSBwcmVjXG4gICAgICAgICAgICA/ICgwLCBjb2RlZ2VuXzEuXykgYE1hdGguYWJzKE1hdGgucm91bmQoJHtyZXN9KSAtICR7cmVzfSkgPiAxZS0ke3ByZWN9YFxuICAgICAgICAgICAgOiAoMCwgY29kZWdlbl8xLl8pIGAke3Jlc30gIT09IHBhcnNlSW50KCR7cmVzfSlgO1xuICAgICAgICBjeHQuZmFpbCRkYXRhKCgwLCBjb2RlZ2VuXzEuXykgYCgke3NjaGVtYUNvZGV9ID09PSAwIHx8ICgke3Jlc30gPSAke2RhdGF9LyR7c2NoZW1hQ29kZX0sICR7aW52YWxpZH0pKWApO1xuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bXVsdGlwbGVPZi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVfMSA9IHJlcXVpcmUoXCIuLi9jb2RlXCIpO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IHNjaGVtYUNvZGUgfSkgPT4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IG1hdGNoIHBhdHRlcm4gXCIke3NjaGVtYUNvZGV9XCJgLFxuICAgIHBhcmFtczogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7cGF0dGVybjogJHtzY2hlbWFDb2RlfX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcInBhdHRlcm5cIixcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIHNjaGVtYVR5cGU6IFwic3RyaW5nXCIsXG4gICAgJGRhdGE6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBkYXRhLCAkZGF0YSwgc2NoZW1hLCBzY2hlbWFDb2RlLCBpdCB9ID0gY3h0O1xuICAgICAgICAvLyBUT0RPIHJlZ2V4cCBzaG91bGQgYmUgd3JhcHBlZCBpbiB0cnkvY2F0Y2hzXG4gICAgICAgIGNvbnN0IHUgPSBpdC5vcHRzLnVuaWNvZGVSZWdFeHAgPyBcInVcIiA6IFwiXCI7XG4gICAgICAgIGNvbnN0IHJlZ0V4cCA9ICRkYXRhID8gKDAsIGNvZGVnZW5fMS5fKSBgKG5ldyBSZWdFeHAoJHtzY2hlbWFDb2RlfSwgJHt1fSkpYCA6ICgwLCBjb2RlXzEudXNlUGF0dGVybikoY3h0LCBzY2hlbWEpO1xuICAgICAgICBjeHQuZmFpbCRkYXRhKCgwLCBjb2RlZ2VuXzEuXykgYCEke3JlZ0V4cH0udGVzdCgke2RhdGF9KWApO1xuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGF0dGVybi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVfMSA9IHJlcXVpcmUoXCIuLi9jb2RlXCIpO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBwYXJhbXM6IHsgbWlzc2luZ1Byb3BlcnR5IH0gfSkgPT4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IGhhdmUgcmVxdWlyZWQgcHJvcGVydHkgJyR7bWlzc2luZ1Byb3BlcnR5fSdgLFxuICAgIHBhcmFtczogKHsgcGFyYW1zOiB7IG1pc3NpbmdQcm9wZXJ0eSB9IH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHttaXNzaW5nUHJvcGVydHk6ICR7bWlzc2luZ1Byb3BlcnR5fX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcInJlcXVpcmVkXCIsXG4gICAgdHlwZTogXCJvYmplY3RcIixcbiAgICBzY2hlbWFUeXBlOiBcImFycmF5XCIsXG4gICAgJGRhdGE6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIHNjaGVtYSwgc2NoZW1hQ29kZSwgZGF0YSwgJGRhdGEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGNvbnN0IHsgb3B0cyB9ID0gaXQ7XG4gICAgICAgIGlmICghJGRhdGEgJiYgc2NoZW1hLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgdXNlTG9vcCA9IHNjaGVtYS5sZW5ndGggPj0gb3B0cy5sb29wUmVxdWlyZWQ7XG4gICAgICAgIGlmIChpdC5hbGxFcnJvcnMpXG4gICAgICAgICAgICBhbGxFcnJvcnNNb2RlKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGV4aXRPbkVycm9yTW9kZSgpO1xuICAgICAgICBpZiAob3B0cy5zdHJpY3RSZXF1aXJlZCkge1xuICAgICAgICAgICAgY29uc3QgcHJvcHMgPSBjeHQucGFyZW50U2NoZW1hLnByb3BlcnRpZXM7XG4gICAgICAgICAgICBjb25zdCB7IGRlZmluZWRQcm9wZXJ0aWVzIH0gPSBjeHQuaXQ7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJlcXVpcmVkS2V5IG9mIHNjaGVtYSkge1xuICAgICAgICAgICAgICAgIGlmICgocHJvcHMgPT09IG51bGwgfHwgcHJvcHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHByb3BzW3JlcXVpcmVkS2V5XSkgPT09IHVuZGVmaW5lZCAmJiAhZGVmaW5lZFByb3BlcnRpZXMuaGFzKHJlcXVpcmVkS2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzY2hlbWFQYXRoID0gaXQuc2NoZW1hRW52LmJhc2VJZCArIGl0LmVyclNjaGVtYVBhdGg7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1zZyA9IGByZXF1aXJlZCBwcm9wZXJ0eSBcIiR7cmVxdWlyZWRLZXl9XCIgaXMgbm90IGRlZmluZWQgYXQgXCIke3NjaGVtYVBhdGh9XCIgKHN0cmljdFJlcXVpcmVkKWA7XG4gICAgICAgICAgICAgICAgICAgICgwLCB1dGlsXzEuY2hlY2tTdHJpY3RNb2RlKShpdCwgbXNnLCBpdC5vcHRzLnN0cmljdFJlcXVpcmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYWxsRXJyb3JzTW9kZSgpIHtcbiAgICAgICAgICAgIGlmICh1c2VMb29wIHx8ICRkYXRhKSB7XG4gICAgICAgICAgICAgICAgY3h0LmJsb2NrJGRhdGEoY29kZWdlbl8xLm5pbCwgbG9vcEFsbFJlcXVpcmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcCBvZiBzY2hlbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgKDAsIGNvZGVfMS5jaGVja1JlcG9ydE1pc3NpbmdQcm9wKShjeHQsIHByb3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBleGl0T25FcnJvck1vZGUoKSB7XG4gICAgICAgICAgICBjb25zdCBtaXNzaW5nID0gZ2VuLmxldChcIm1pc3NpbmdcIik7XG4gICAgICAgICAgICBpZiAodXNlTG9vcCB8fCAkZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLmxldChcInZhbGlkXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgIGN4dC5ibG9jayRkYXRhKHZhbGlkLCAoKSA9PiBsb29wVW50aWxNaXNzaW5nKG1pc3NpbmcsIHZhbGlkKSk7XG4gICAgICAgICAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZV8xLmNoZWNrTWlzc2luZ1Byb3ApKGN4dCwgc2NoZW1hLCBtaXNzaW5nKSk7XG4gICAgICAgICAgICAgICAgKDAsIGNvZGVfMS5yZXBvcnRNaXNzaW5nUHJvcCkoY3h0LCBtaXNzaW5nKTtcbiAgICAgICAgICAgICAgICBnZW4uZWxzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGxvb3BBbGxSZXF1aXJlZCgpIHtcbiAgICAgICAgICAgIGdlbi5mb3JPZihcInByb3BcIiwgc2NoZW1hQ29kZSwgKHByb3ApID0+IHtcbiAgICAgICAgICAgICAgICBjeHQuc2V0UGFyYW1zKHsgbWlzc2luZ1Byb3BlcnR5OiBwcm9wIH0pO1xuICAgICAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZV8xLm5vUHJvcGVydHlJbkRhdGEpKGdlbiwgZGF0YSwgcHJvcCwgb3B0cy5vd25Qcm9wZXJ0aWVzKSwgKCkgPT4gY3h0LmVycm9yKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbG9vcFVudGlsTWlzc2luZyhtaXNzaW5nLCB2YWxpZCkge1xuICAgICAgICAgICAgY3h0LnNldFBhcmFtcyh7IG1pc3NpbmdQcm9wZXJ0eTogbWlzc2luZyB9KTtcbiAgICAgICAgICAgIGdlbi5mb3JPZihtaXNzaW5nLCBzY2hlbWFDb2RlLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgKDAsIGNvZGVfMS5wcm9wZXJ0eUluRGF0YSkoZ2VuLCBkYXRhLCBtaXNzaW5nLCBvcHRzLm93blByb3BlcnRpZXMpKTtcbiAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKHZhbGlkKSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjeHQuZXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmJyZWFrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBjb2RlZ2VuXzEubmlsKTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVxdWlyZWQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBkYXRhVHlwZV8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdmFsaWRhdGUvZGF0YVR5cGVcIik7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGVxdWFsXzEgPSByZXF1aXJlKFwiLi4vLi4vcnVudGltZS9lcXVhbFwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IHBhcmFtczogeyBpLCBqIH0gfSkgPT4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IE5PVCBoYXZlIGR1cGxpY2F0ZSBpdGVtcyAoaXRlbXMgIyMgJHtqfSBhbmQgJHtpfSBhcmUgaWRlbnRpY2FsKWAsXG4gICAgcGFyYW1zOiAoeyBwYXJhbXM6IHsgaSwgaiB9IH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHtpOiAke2l9LCBqOiAke2p9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwidW5pcXVlSXRlbXNcIixcbiAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgc2NoZW1hVHlwZTogXCJib29sZWFuXCIsXG4gICAgJGRhdGE6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIGRhdGEsICRkYXRhLCBzY2hlbWEsIHBhcmVudFNjaGVtYSwgc2NoZW1hQ29kZSwgaXQgfSA9IGN4dDtcbiAgICAgICAgaWYgKCEkZGF0YSAmJiAhc2NoZW1hKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5sZXQoXCJ2YWxpZFwiKTtcbiAgICAgICAgY29uc3QgaXRlbVR5cGVzID0gcGFyZW50U2NoZW1hLml0ZW1zID8gKDAsIGRhdGFUeXBlXzEuZ2V0U2NoZW1hVHlwZXMpKHBhcmVudFNjaGVtYS5pdGVtcykgOiBbXTtcbiAgICAgICAgY3h0LmJsb2NrJGRhdGEodmFsaWQsIHZhbGlkYXRlVW5pcXVlSXRlbXMsICgwLCBjb2RlZ2VuXzEuXykgYCR7c2NoZW1hQ29kZX0gPT09IGZhbHNlYCk7XG4gICAgICAgIGN4dC5vayh2YWxpZCk7XG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlVW5pcXVlSXRlbXMoKSB7XG4gICAgICAgICAgICBjb25zdCBpID0gZ2VuLmxldChcImlcIiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfS5sZW5ndGhgKTtcbiAgICAgICAgICAgIGNvbnN0IGogPSBnZW4ubGV0KFwialwiKTtcbiAgICAgICAgICAgIGN4dC5zZXRQYXJhbXMoeyBpLCBqIH0pO1xuICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgdHJ1ZSk7XG4gICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtpfSA+IDFgLCAoKSA9PiAoY2FuT3B0aW1pemUoKSA/IGxvb3BOIDogbG9vcE4yKShpLCBqKSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2FuT3B0aW1pemUoKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbVR5cGVzLmxlbmd0aCA+IDAgJiYgIWl0ZW1UeXBlcy5zb21lKCh0KSA9PiB0ID09PSBcIm9iamVjdFwiIHx8IHQgPT09IFwiYXJyYXlcIik7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbG9vcE4oaSwgaikge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGdlbi5uYW1lKFwiaXRlbVwiKTtcbiAgICAgICAgICAgIGNvbnN0IHdyb25nVHlwZSA9ICgwLCBkYXRhVHlwZV8xLmNoZWNrRGF0YVR5cGVzKShpdGVtVHlwZXMsIGl0ZW0sIGl0Lm9wdHMuc3RyaWN0TnVtYmVycywgZGF0YVR5cGVfMS5EYXRhVHlwZS5Xcm9uZyk7XG4gICAgICAgICAgICBjb25zdCBpbmRpY2VzID0gZ2VuLmNvbnN0KFwiaW5kaWNlc1wiLCAoMCwgY29kZWdlbl8xLl8pIGB7fWApO1xuICAgICAgICAgICAgZ2VuLmZvcigoMCwgY29kZWdlbl8xLl8pIGA7JHtpfS0tO2AsICgpID0+IHtcbiAgICAgICAgICAgICAgICBnZW4ubGV0KGl0ZW0sICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX1bJHtpfV1gKTtcbiAgICAgICAgICAgICAgICBnZW4uaWYod3JvbmdUeXBlLCAoMCwgY29kZWdlbl8xLl8pIGBjb250aW51ZWApO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtVHlwZXMubGVuZ3RoID4gMSlcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYHR5cGVvZiAke2l0ZW19ID09IFwic3RyaW5nXCJgLCAoMCwgY29kZWdlbl8xLl8pIGAke2l0ZW19ICs9IFwiX1wiYCk7XG4gICAgICAgICAgICAgICAgZ2VuXG4gICAgICAgICAgICAgICAgICAgIC5pZigoMCwgY29kZWdlbl8xLl8pIGB0eXBlb2YgJHtpbmRpY2VzfVske2l0ZW19XSA9PSBcIm51bWJlclwiYCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBnZW4uYXNzaWduKGosICgwLCBjb2RlZ2VuXzEuXykgYCR7aW5kaWNlc31bJHtpdGVtfV1gKTtcbiAgICAgICAgICAgICAgICAgICAgY3h0LmVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24odmFsaWQsIGZhbHNlKS5icmVhaygpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jb2RlKCgwLCBjb2RlZ2VuXzEuXykgYCR7aW5kaWNlc31bJHtpdGVtfV0gPSAke2l9YCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBsb29wTjIoaSwgaikge1xuICAgICAgICAgICAgY29uc3QgZXFsID0gKDAsIHV0aWxfMS51c2VGdW5jKShnZW4sIGVxdWFsXzEuZGVmYXVsdCk7XG4gICAgICAgICAgICBjb25zdCBvdXRlciA9IGdlbi5uYW1lKFwib3V0ZXJcIik7XG4gICAgICAgICAgICBnZW4ubGFiZWwob3V0ZXIpLmZvcigoMCwgY29kZWdlbl8xLl8pIGA7JHtpfS0tO2AsICgpID0+IGdlbi5mb3IoKDAsIGNvZGVnZW5fMS5fKSBgJHtqfSA9ICR7aX07ICR7an0tLTtgLCAoKSA9PiBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtlcWx9KCR7ZGF0YX1bJHtpfV0sICR7ZGF0YX1bJHtqfV0pYCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGN4dC5lcnJvcigpO1xuICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24odmFsaWQsIGZhbHNlKS5icmVhayhvdXRlcik7XG4gICAgICAgICAgICB9KSkpO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11bmlxdWVJdGVtcy5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbi8vIGRvIG5vdCBlZGl0IC5qcyBmaWxlcyBkaXJlY3RseSAtIGVkaXQgc3JjL2luZGV4LmpzdFxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlcXVhbChhLCBiKSB7XG4gIGlmIChhID09PSBiKSByZXR1cm4gdHJ1ZTtcblxuICBpZiAoYSAmJiBiICYmIHR5cGVvZiBhID09ICdvYmplY3QnICYmIHR5cGVvZiBiID09ICdvYmplY3QnKSB7XG4gICAgaWYgKGEuY29uc3RydWN0b3IgIT09IGIuY29uc3RydWN0b3IpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBsZW5ndGgsIGksIGtleXM7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYSkpIHtcbiAgICAgIGxlbmd0aCA9IGEubGVuZ3RoO1xuICAgICAgaWYgKGxlbmd0aCAhPSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KVxuICAgICAgICBpZiAoIWVxdWFsKGFbaV0sIGJbaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cblxuXG4gICAgaWYgKGEuY29uc3RydWN0b3IgPT09IFJlZ0V4cCkgcmV0dXJuIGEuc291cmNlID09PSBiLnNvdXJjZSAmJiBhLmZsYWdzID09PSBiLmZsYWdzO1xuICAgIGlmIChhLnZhbHVlT2YgIT09IE9iamVjdC5wcm90b3R5cGUudmFsdWVPZikgcmV0dXJuIGEudmFsdWVPZigpID09PSBiLnZhbHVlT2YoKTtcbiAgICBpZiAoYS50b1N0cmluZyAhPT0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZykgcmV0dXJuIGEudG9TdHJpbmcoKSA9PT0gYi50b1N0cmluZygpO1xuXG4gICAga2V5cyA9IE9iamVjdC5rZXlzKGEpO1xuICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIGlmIChsZW5ndGggIT09IE9iamVjdC5rZXlzKGIpLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KVxuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwga2V5c1tpXSkpIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV07XG5cbiAgICAgIGlmICghZXF1YWwoYVtrZXldLCBiW2tleV0pKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyB0cnVlIGlmIGJvdGggTmFOLCBmYWxzZSBvdGhlcndpc2VcbiAgcmV0dXJuIGEhPT1hICYmIGIhPT1iO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRyYXZlcnNlID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2NoZW1hLCBvcHRzLCBjYikge1xuICAvLyBMZWdhY3kgc3VwcG9ydCBmb3IgdjAuMy4xIGFuZCBlYXJsaWVyLlxuICBpZiAodHlwZW9mIG9wdHMgPT0gJ2Z1bmN0aW9uJykge1xuICAgIGNiID0gb3B0cztcbiAgICBvcHRzID0ge307XG4gIH1cblxuICBjYiA9IG9wdHMuY2IgfHwgY2I7XG4gIHZhciBwcmUgPSAodHlwZW9mIGNiID09ICdmdW5jdGlvbicpID8gY2IgOiBjYi5wcmUgfHwgZnVuY3Rpb24oKSB7fTtcbiAgdmFyIHBvc3QgPSBjYi5wb3N0IHx8IGZ1bmN0aW9uKCkge307XG5cbiAgX3RyYXZlcnNlKG9wdHMsIHByZSwgcG9zdCwgc2NoZW1hLCAnJywgc2NoZW1hKTtcbn07XG5cblxudHJhdmVyc2Uua2V5d29yZHMgPSB7XG4gIGFkZGl0aW9uYWxJdGVtczogdHJ1ZSxcbiAgaXRlbXM6IHRydWUsXG4gIGNvbnRhaW5zOiB0cnVlLFxuICBhZGRpdGlvbmFsUHJvcGVydGllczogdHJ1ZSxcbiAgcHJvcGVydHlOYW1lczogdHJ1ZSxcbiAgbm90OiB0cnVlLFxuICBpZjogdHJ1ZSxcbiAgdGhlbjogdHJ1ZSxcbiAgZWxzZTogdHJ1ZVxufTtcblxudHJhdmVyc2UuYXJyYXlLZXl3b3JkcyA9IHtcbiAgaXRlbXM6IHRydWUsXG4gIGFsbE9mOiB0cnVlLFxuICBhbnlPZjogdHJ1ZSxcbiAgb25lT2Y6IHRydWVcbn07XG5cbnRyYXZlcnNlLnByb3BzS2V5d29yZHMgPSB7XG4gICRkZWZzOiB0cnVlLFxuICBkZWZpbml0aW9uczogdHJ1ZSxcbiAgcHJvcGVydGllczogdHJ1ZSxcbiAgcGF0dGVyblByb3BlcnRpZXM6IHRydWUsXG4gIGRlcGVuZGVuY2llczogdHJ1ZVxufTtcblxudHJhdmVyc2Uuc2tpcEtleXdvcmRzID0ge1xuICBkZWZhdWx0OiB0cnVlLFxuICBlbnVtOiB0cnVlLFxuICBjb25zdDogdHJ1ZSxcbiAgcmVxdWlyZWQ6IHRydWUsXG4gIG1heGltdW06IHRydWUsXG4gIG1pbmltdW06IHRydWUsXG4gIGV4Y2x1c2l2ZU1heGltdW06IHRydWUsXG4gIGV4Y2x1c2l2ZU1pbmltdW06IHRydWUsXG4gIG11bHRpcGxlT2Y6IHRydWUsXG4gIG1heExlbmd0aDogdHJ1ZSxcbiAgbWluTGVuZ3RoOiB0cnVlLFxuICBwYXR0ZXJuOiB0cnVlLFxuICBmb3JtYXQ6IHRydWUsXG4gIG1heEl0ZW1zOiB0cnVlLFxuICBtaW5JdGVtczogdHJ1ZSxcbiAgdW5pcXVlSXRlbXM6IHRydWUsXG4gIG1heFByb3BlcnRpZXM6IHRydWUsXG4gIG1pblByb3BlcnRpZXM6IHRydWVcbn07XG5cblxuZnVuY3Rpb24gX3RyYXZlcnNlKG9wdHMsIHByZSwgcG9zdCwgc2NoZW1hLCBqc29uUHRyLCByb290U2NoZW1hLCBwYXJlbnRKc29uUHRyLCBwYXJlbnRLZXl3b3JkLCBwYXJlbnRTY2hlbWEsIGtleUluZGV4KSB7XG4gIGlmIChzY2hlbWEgJiYgdHlwZW9mIHNjaGVtYSA9PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShzY2hlbWEpKSB7XG4gICAgcHJlKHNjaGVtYSwganNvblB0ciwgcm9vdFNjaGVtYSwgcGFyZW50SnNvblB0ciwgcGFyZW50S2V5d29yZCwgcGFyZW50U2NoZW1hLCBrZXlJbmRleCk7XG4gICAgZm9yICh2YXIga2V5IGluIHNjaGVtYSkge1xuICAgICAgdmFyIHNjaCA9IHNjaGVtYVtrZXldO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoKSkge1xuICAgICAgICBpZiAoa2V5IGluIHRyYXZlcnNlLmFycmF5S2V5d29yZHMpIHtcbiAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8c2NoLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgX3RyYXZlcnNlKG9wdHMsIHByZSwgcG9zdCwgc2NoW2ldLCBqc29uUHRyICsgJy8nICsga2V5ICsgJy8nICsgaSwgcm9vdFNjaGVtYSwganNvblB0ciwga2V5LCBzY2hlbWEsIGkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGtleSBpbiB0cmF2ZXJzZS5wcm9wc0tleXdvcmRzKSB7XG4gICAgICAgIGlmIChzY2ggJiYgdHlwZW9mIHNjaCA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gc2NoKVxuICAgICAgICAgICAgX3RyYXZlcnNlKG9wdHMsIHByZSwgcG9zdCwgc2NoW3Byb3BdLCBqc29uUHRyICsgJy8nICsga2V5ICsgJy8nICsgZXNjYXBlSnNvblB0cihwcm9wKSwgcm9vdFNjaGVtYSwganNvblB0ciwga2V5LCBzY2hlbWEsIHByb3ApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGtleSBpbiB0cmF2ZXJzZS5rZXl3b3JkcyB8fCAob3B0cy5hbGxLZXlzICYmICEoa2V5IGluIHRyYXZlcnNlLnNraXBLZXl3b3JkcykpKSB7XG4gICAgICAgIF90cmF2ZXJzZShvcHRzLCBwcmUsIHBvc3QsIHNjaCwganNvblB0ciArICcvJyArIGtleSwgcm9vdFNjaGVtYSwganNvblB0ciwga2V5LCBzY2hlbWEpO1xuICAgICAgfVxuICAgIH1cbiAgICBwb3N0KHNjaGVtYSwganNvblB0ciwgcm9vdFNjaGVtYSwgcGFyZW50SnNvblB0ciwgcGFyZW50S2V5d29yZCwgcGFyZW50U2NoZW1hLCBrZXlJbmRleCk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBlc2NhcGVKc29uUHRyKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL34vZywgJ34wJykucmVwbGFjZSgvXFwvL2csICd+MScpO1xufVxuIiwiLyoqIEBsaWNlbnNlIFVSSS5qcyB2NC40LjEgKGMpIDIwMTEgR2FyeSBDb3VydC4gTGljZW5zZTogaHR0cDovL2dpdGh1Yi5jb20vZ2FyeWNvdXJ0L3VyaS1qcyAqL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuXHQoZmFjdG9yeSgoZ2xvYmFsLlVSSSA9IGdsb2JhbC5VUkkgfHwge30pKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG1lcmdlKCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBzZXRzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIHNldHNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgaWYgKHNldHMubGVuZ3RoID4gMSkge1xuICAgICAgICBzZXRzWzBdID0gc2V0c1swXS5zbGljZSgwLCAtMSk7XG4gICAgICAgIHZhciB4bCA9IHNldHMubGVuZ3RoIC0gMTtcbiAgICAgICAgZm9yICh2YXIgeCA9IDE7IHggPCB4bDsgKyt4KSB7XG4gICAgICAgICAgICBzZXRzW3hdID0gc2V0c1t4XS5zbGljZSgxLCAtMSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0c1t4bF0gPSBzZXRzW3hsXS5zbGljZSgxKTtcbiAgICAgICAgcmV0dXJuIHNldHMuam9pbignJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNldHNbMF07XG4gICAgfVxufVxuZnVuY3Rpb24gc3ViZXhwKHN0cikge1xuICAgIHJldHVybiBcIig/OlwiICsgc3RyICsgXCIpXCI7XG59XG5mdW5jdGlvbiB0eXBlT2Yobykge1xuICAgIHJldHVybiBvID09PSB1bmRlZmluZWQgPyBcInVuZGVmaW5lZFwiIDogbyA9PT0gbnVsbCA/IFwibnVsbFwiIDogT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNwbGl0KFwiIFwiKS5wb3AoKS5zcGxpdChcIl1cIikuc2hpZnQoKS50b0xvd2VyQ2FzZSgpO1xufVxuZnVuY3Rpb24gdG9VcHBlckNhc2Uoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci50b1VwcGVyQ2FzZSgpO1xufVxuZnVuY3Rpb24gdG9BcnJheShvYmopIHtcbiAgICByZXR1cm4gb2JqICE9PSB1bmRlZmluZWQgJiYgb2JqICE9PSBudWxsID8gb2JqIGluc3RhbmNlb2YgQXJyYXkgPyBvYmogOiB0eXBlb2Ygb2JqLmxlbmd0aCAhPT0gXCJudW1iZXJcIiB8fCBvYmouc3BsaXQgfHwgb2JqLnNldEludGVydmFsIHx8IG9iai5jYWxsID8gW29ial0gOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChvYmopIDogW107XG59XG5mdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpIHtcbiAgICB2YXIgb2JqID0gdGFyZ2V0O1xuICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgb2JqW2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBidWlsZEV4cHMoaXNJUkkpIHtcbiAgICB2YXIgQUxQSEEkJCA9IFwiW0EtWmEtel1cIixcbiAgICAgICAgQ1IkID0gXCJbXFxcXHgwRF1cIixcbiAgICAgICAgRElHSVQkJCA9IFwiWzAtOV1cIixcbiAgICAgICAgRFFVT1RFJCQgPSBcIltcXFxceDIyXVwiLFxuICAgICAgICBIRVhESUckJCA9IG1lcmdlKERJR0lUJCQsIFwiW0EtRmEtZl1cIiksXG4gICAgICAgIC8vY2FzZS1pbnNlbnNpdGl2ZVxuICAgIExGJCQgPSBcIltcXFxceDBBXVwiLFxuICAgICAgICBTUCQkID0gXCJbXFxcXHgyMF1cIixcbiAgICAgICAgUENUX0VOQ09ERUQkID0gc3ViZXhwKHN1YmV4cChcIiVbRUZlZl1cIiArIEhFWERJRyQkICsgXCIlXCIgKyBIRVhESUckJCArIEhFWERJRyQkICsgXCIlXCIgKyBIRVhESUckJCArIEhFWERJRyQkKSArIFwifFwiICsgc3ViZXhwKFwiJVs4OUEtRmEtZl1cIiArIEhFWERJRyQkICsgXCIlXCIgKyBIRVhESUckJCArIEhFWERJRyQkKSArIFwifFwiICsgc3ViZXhwKFwiJVwiICsgSEVYRElHJCQgKyBIRVhESUckJCkpLFxuICAgICAgICAvL2V4cGFuZGVkXG4gICAgR0VOX0RFTElNUyQkID0gXCJbXFxcXDpcXFxcL1xcXFw/XFxcXCNcXFxcW1xcXFxdXFxcXEBdXCIsXG4gICAgICAgIFNVQl9ERUxJTVMkJCA9IFwiW1xcXFwhXFxcXCRcXFxcJlxcXFwnXFxcXChcXFxcKVxcXFwqXFxcXCtcXFxcLFxcXFw7XFxcXD1dXCIsXG4gICAgICAgIFJFU0VSVkVEJCQgPSBtZXJnZShHRU5fREVMSU1TJCQsIFNVQl9ERUxJTVMkJCksXG4gICAgICAgIFVDU0NIQVIkJCA9IGlzSVJJID8gXCJbXFxcXHhBMC1cXFxcdTIwMERcXFxcdTIwMTAtXFxcXHUyMDI5XFxcXHUyMDJGLVxcXFx1RDdGRlxcXFx1RjkwMC1cXFxcdUZEQ0ZcXFxcdUZERjAtXFxcXHVGRkVGXVwiIDogXCJbXVwiLFxuICAgICAgICAvL3N1YnNldCwgZXhjbHVkZXMgYmlkaSBjb250cm9sIGNoYXJhY3RlcnNcbiAgICBJUFJJVkFURSQkID0gaXNJUkkgPyBcIltcXFxcdUUwMDAtXFxcXHVGOEZGXVwiIDogXCJbXVwiLFxuICAgICAgICAvL3N1YnNldFxuICAgIFVOUkVTRVJWRUQkJCA9IG1lcmdlKEFMUEhBJCQsIERJR0lUJCQsIFwiW1xcXFwtXFxcXC5cXFxcX1xcXFx+XVwiLCBVQ1NDSEFSJCQpLFxuICAgICAgICBTQ0hFTUUkID0gc3ViZXhwKEFMUEhBJCQgKyBtZXJnZShBTFBIQSQkLCBESUdJVCQkLCBcIltcXFxcK1xcXFwtXFxcXC5dXCIpICsgXCIqXCIpLFxuICAgICAgICBVU0VSSU5GTyQgPSBzdWJleHAoc3ViZXhwKFBDVF9FTkNPREVEJCArIFwifFwiICsgbWVyZ2UoVU5SRVNFUlZFRCQkLCBTVUJfREVMSU1TJCQsIFwiW1xcXFw6XVwiKSkgKyBcIipcIiksXG4gICAgICAgIERFQ19PQ1RFVCQgPSBzdWJleHAoc3ViZXhwKFwiMjVbMC01XVwiKSArIFwifFwiICsgc3ViZXhwKFwiMlswLTRdXCIgKyBESUdJVCQkKSArIFwifFwiICsgc3ViZXhwKFwiMVwiICsgRElHSVQkJCArIERJR0lUJCQpICsgXCJ8XCIgKyBzdWJleHAoXCJbMS05XVwiICsgRElHSVQkJCkgKyBcInxcIiArIERJR0lUJCQpLFxuICAgICAgICBERUNfT0NURVRfUkVMQVhFRCQgPSBzdWJleHAoc3ViZXhwKFwiMjVbMC01XVwiKSArIFwifFwiICsgc3ViZXhwKFwiMlswLTRdXCIgKyBESUdJVCQkKSArIFwifFwiICsgc3ViZXhwKFwiMVwiICsgRElHSVQkJCArIERJR0lUJCQpICsgXCJ8XCIgKyBzdWJleHAoXCIwP1sxLTldXCIgKyBESUdJVCQkKSArIFwifDA/MD9cIiArIERJR0lUJCQpLFxuICAgICAgICAvL3JlbGF4ZWQgcGFyc2luZyBydWxlc1xuICAgIElQVjRBRERSRVNTJCA9IHN1YmV4cChERUNfT0NURVRfUkVMQVhFRCQgKyBcIlxcXFwuXCIgKyBERUNfT0NURVRfUkVMQVhFRCQgKyBcIlxcXFwuXCIgKyBERUNfT0NURVRfUkVMQVhFRCQgKyBcIlxcXFwuXCIgKyBERUNfT0NURVRfUkVMQVhFRCQpLFxuICAgICAgICBIMTYkID0gc3ViZXhwKEhFWERJRyQkICsgXCJ7MSw0fVwiKSxcbiAgICAgICAgTFMzMiQgPSBzdWJleHAoc3ViZXhwKEgxNiQgKyBcIlxcXFw6XCIgKyBIMTYkKSArIFwifFwiICsgSVBWNEFERFJFU1MkKSxcbiAgICAgICAgSVBWNkFERFJFU1MxJCA9IHN1YmV4cChzdWJleHAoSDE2JCArIFwiXFxcXDpcIikgKyBcIns2fVwiICsgTFMzMiQpLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIDYoIGgxNiBcIjpcIiApIGxzMzJcbiAgICBJUFY2QUREUkVTUzIkID0gc3ViZXhwKFwiXFxcXDpcXFxcOlwiICsgc3ViZXhwKEgxNiQgKyBcIlxcXFw6XCIpICsgXCJ7NX1cIiArIExTMzIkKSxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgXCI6OlwiIDUoIGgxNiBcIjpcIiApIGxzMzJcbiAgICBJUFY2QUREUkVTUzMkID0gc3ViZXhwKHN1YmV4cChIMTYkKSArIFwiP1xcXFw6XFxcXDpcIiArIHN1YmV4cChIMTYkICsgXCJcXFxcOlwiKSArIFwiezR9XCIgKyBMUzMyJCksXG4gICAgICAgIC8vWyAgICAgICAgICAgICAgIGgxNiBdIFwiOjpcIiA0KCBoMTYgXCI6XCIgKSBsczMyXG4gICAgSVBWNkFERFJFU1M0JCA9IHN1YmV4cChzdWJleHAoc3ViZXhwKEgxNiQgKyBcIlxcXFw6XCIpICsgXCJ7MCwxfVwiICsgSDE2JCkgKyBcIj9cXFxcOlxcXFw6XCIgKyBzdWJleHAoSDE2JCArIFwiXFxcXDpcIikgKyBcInszfVwiICsgTFMzMiQpLFxuICAgICAgICAvL1sgKjEoIGgxNiBcIjpcIiApIGgxNiBdIFwiOjpcIiAzKCBoMTYgXCI6XCIgKSBsczMyXG4gICAgSVBWNkFERFJFU1M1JCA9IHN1YmV4cChzdWJleHAoc3ViZXhwKEgxNiQgKyBcIlxcXFw6XCIpICsgXCJ7MCwyfVwiICsgSDE2JCkgKyBcIj9cXFxcOlxcXFw6XCIgKyBzdWJleHAoSDE2JCArIFwiXFxcXDpcIikgKyBcInsyfVwiICsgTFMzMiQpLFxuICAgICAgICAvL1sgKjIoIGgxNiBcIjpcIiApIGgxNiBdIFwiOjpcIiAyKCBoMTYgXCI6XCIgKSBsczMyXG4gICAgSVBWNkFERFJFU1M2JCA9IHN1YmV4cChzdWJleHAoc3ViZXhwKEgxNiQgKyBcIlxcXFw6XCIpICsgXCJ7MCwzfVwiICsgSDE2JCkgKyBcIj9cXFxcOlxcXFw6XCIgKyBIMTYkICsgXCJcXFxcOlwiICsgTFMzMiQpLFxuICAgICAgICAvL1sgKjMoIGgxNiBcIjpcIiApIGgxNiBdIFwiOjpcIiAgICBoMTYgXCI6XCIgICBsczMyXG4gICAgSVBWNkFERFJFU1M3JCA9IHN1YmV4cChzdWJleHAoc3ViZXhwKEgxNiQgKyBcIlxcXFw6XCIpICsgXCJ7MCw0fVwiICsgSDE2JCkgKyBcIj9cXFxcOlxcXFw6XCIgKyBMUzMyJCksXG4gICAgICAgIC8vWyAqNCggaDE2IFwiOlwiICkgaDE2IF0gXCI6OlwiICAgICAgICAgICAgICBsczMyXG4gICAgSVBWNkFERFJFU1M4JCA9IHN1YmV4cChzdWJleHAoc3ViZXhwKEgxNiQgKyBcIlxcXFw6XCIpICsgXCJ7MCw1fVwiICsgSDE2JCkgKyBcIj9cXFxcOlxcXFw6XCIgKyBIMTYkKSxcbiAgICAgICAgLy9bICo1KCBoMTYgXCI6XCIgKSBoMTYgXSBcIjo6XCIgICAgICAgICAgICAgIGgxNlxuICAgIElQVjZBRERSRVNTOSQgPSBzdWJleHAoc3ViZXhwKHN1YmV4cChIMTYkICsgXCJcXFxcOlwiKSArIFwiezAsNn1cIiArIEgxNiQpICsgXCI/XFxcXDpcXFxcOlwiKSxcbiAgICAgICAgLy9bICo2KCBoMTYgXCI6XCIgKSBoMTYgXSBcIjo6XCJcbiAgICBJUFY2QUREUkVTUyQgPSBzdWJleHAoW0lQVjZBRERSRVNTMSQsIElQVjZBRERSRVNTMiQsIElQVjZBRERSRVNTMyQsIElQVjZBRERSRVNTNCQsIElQVjZBRERSRVNTNSQsIElQVjZBRERSRVNTNiQsIElQVjZBRERSRVNTNyQsIElQVjZBRERSRVNTOCQsIElQVjZBRERSRVNTOSRdLmpvaW4oXCJ8XCIpKSxcbiAgICAgICAgWk9ORUlEJCA9IHN1YmV4cChzdWJleHAoVU5SRVNFUlZFRCQkICsgXCJ8XCIgKyBQQ1RfRU5DT0RFRCQpICsgXCIrXCIpLFxuICAgICAgICAvL1JGQyA2ODc0XG4gICAgSVBWNkFERFJaJCA9IHN1YmV4cChJUFY2QUREUkVTUyQgKyBcIlxcXFwlMjVcIiArIFpPTkVJRCQpLFxuICAgICAgICAvL1JGQyA2ODc0XG4gICAgSVBWNkFERFJaX1JFTEFYRUQkID0gc3ViZXhwKElQVjZBRERSRVNTJCArIHN1YmV4cChcIlxcXFwlMjV8XFxcXCUoPyFcIiArIEhFWERJRyQkICsgXCJ7Mn0pXCIpICsgWk9ORUlEJCksXG4gICAgICAgIC8vUkZDIDY4NzQsIHdpdGggcmVsYXhlZCBwYXJzaW5nIHJ1bGVzXG4gICAgSVBWRlVUVVJFJCA9IHN1YmV4cChcIlt2Vl1cIiArIEhFWERJRyQkICsgXCIrXFxcXC5cIiArIG1lcmdlKFVOUkVTRVJWRUQkJCwgU1VCX0RFTElNUyQkLCBcIltcXFxcOl1cIikgKyBcIitcIiksXG4gICAgICAgIElQX0xJVEVSQUwkID0gc3ViZXhwKFwiXFxcXFtcIiArIHN1YmV4cChJUFY2QUREUlpfUkVMQVhFRCQgKyBcInxcIiArIElQVjZBRERSRVNTJCArIFwifFwiICsgSVBWRlVUVVJFJCkgKyBcIlxcXFxdXCIpLFxuICAgICAgICAvL1JGQyA2ODc0XG4gICAgUkVHX05BTUUkID0gc3ViZXhwKHN1YmV4cChQQ1RfRU5DT0RFRCQgKyBcInxcIiArIG1lcmdlKFVOUkVTRVJWRUQkJCwgU1VCX0RFTElNUyQkKSkgKyBcIipcIiksXG4gICAgICAgIEhPU1QkID0gc3ViZXhwKElQX0xJVEVSQUwkICsgXCJ8XCIgKyBJUFY0QUREUkVTUyQgKyBcIig/IVwiICsgUkVHX05BTUUkICsgXCIpXCIgKyBcInxcIiArIFJFR19OQU1FJCksXG4gICAgICAgIFBPUlQkID0gc3ViZXhwKERJR0lUJCQgKyBcIipcIiksXG4gICAgICAgIEFVVEhPUklUWSQgPSBzdWJleHAoc3ViZXhwKFVTRVJJTkZPJCArIFwiQFwiKSArIFwiP1wiICsgSE9TVCQgKyBzdWJleHAoXCJcXFxcOlwiICsgUE9SVCQpICsgXCI/XCIpLFxuICAgICAgICBQQ0hBUiQgPSBzdWJleHAoUENUX0VOQ09ERUQkICsgXCJ8XCIgKyBtZXJnZShVTlJFU0VSVkVEJCQsIFNVQl9ERUxJTVMkJCwgXCJbXFxcXDpcXFxcQF1cIikpLFxuICAgICAgICBTRUdNRU5UJCA9IHN1YmV4cChQQ0hBUiQgKyBcIipcIiksXG4gICAgICAgIFNFR01FTlRfTlokID0gc3ViZXhwKFBDSEFSJCArIFwiK1wiKSxcbiAgICAgICAgU0VHTUVOVF9OWl9OQyQgPSBzdWJleHAoc3ViZXhwKFBDVF9FTkNPREVEJCArIFwifFwiICsgbWVyZ2UoVU5SRVNFUlZFRCQkLCBTVUJfREVMSU1TJCQsIFwiW1xcXFxAXVwiKSkgKyBcIitcIiksXG4gICAgICAgIFBBVEhfQUJFTVBUWSQgPSBzdWJleHAoc3ViZXhwKFwiXFxcXC9cIiArIFNFR01FTlQkKSArIFwiKlwiKSxcbiAgICAgICAgUEFUSF9BQlNPTFVURSQgPSBzdWJleHAoXCJcXFxcL1wiICsgc3ViZXhwKFNFR01FTlRfTlokICsgUEFUSF9BQkVNUFRZJCkgKyBcIj9cIiksXG4gICAgICAgIC8vc2ltcGxpZmllZFxuICAgIFBBVEhfTk9TQ0hFTUUkID0gc3ViZXhwKFNFR01FTlRfTlpfTkMkICsgUEFUSF9BQkVNUFRZJCksXG4gICAgICAgIC8vc2ltcGxpZmllZFxuICAgIFBBVEhfUk9PVExFU1MkID0gc3ViZXhwKFNFR01FTlRfTlokICsgUEFUSF9BQkVNUFRZJCksXG4gICAgICAgIC8vc2ltcGxpZmllZFxuICAgIFBBVEhfRU1QVFkkID0gXCIoPyFcIiArIFBDSEFSJCArIFwiKVwiLFxuICAgICAgICBQQVRIJCA9IHN1YmV4cChQQVRIX0FCRU1QVFkkICsgXCJ8XCIgKyBQQVRIX0FCU09MVVRFJCArIFwifFwiICsgUEFUSF9OT1NDSEVNRSQgKyBcInxcIiArIFBBVEhfUk9PVExFU1MkICsgXCJ8XCIgKyBQQVRIX0VNUFRZJCksXG4gICAgICAgIFFVRVJZJCA9IHN1YmV4cChzdWJleHAoUENIQVIkICsgXCJ8XCIgKyBtZXJnZShcIltcXFxcL1xcXFw/XVwiLCBJUFJJVkFURSQkKSkgKyBcIipcIiksXG4gICAgICAgIEZSQUdNRU5UJCA9IHN1YmV4cChzdWJleHAoUENIQVIkICsgXCJ8W1xcXFwvXFxcXD9dXCIpICsgXCIqXCIpLFxuICAgICAgICBISUVSX1BBUlQkID0gc3ViZXhwKHN1YmV4cChcIlxcXFwvXFxcXC9cIiArIEFVVEhPUklUWSQgKyBQQVRIX0FCRU1QVFkkKSArIFwifFwiICsgUEFUSF9BQlNPTFVURSQgKyBcInxcIiArIFBBVEhfUk9PVExFU1MkICsgXCJ8XCIgKyBQQVRIX0VNUFRZJCksXG4gICAgICAgIFVSSSQgPSBzdWJleHAoU0NIRU1FJCArIFwiXFxcXDpcIiArIEhJRVJfUEFSVCQgKyBzdWJleHAoXCJcXFxcP1wiICsgUVVFUlkkKSArIFwiP1wiICsgc3ViZXhwKFwiXFxcXCNcIiArIEZSQUdNRU5UJCkgKyBcIj9cIiksXG4gICAgICAgIFJFTEFUSVZFX1BBUlQkID0gc3ViZXhwKHN1YmV4cChcIlxcXFwvXFxcXC9cIiArIEFVVEhPUklUWSQgKyBQQVRIX0FCRU1QVFkkKSArIFwifFwiICsgUEFUSF9BQlNPTFVURSQgKyBcInxcIiArIFBBVEhfTk9TQ0hFTUUkICsgXCJ8XCIgKyBQQVRIX0VNUFRZJCksXG4gICAgICAgIFJFTEFUSVZFJCA9IHN1YmV4cChSRUxBVElWRV9QQVJUJCArIHN1YmV4cChcIlxcXFw/XCIgKyBRVUVSWSQpICsgXCI/XCIgKyBzdWJleHAoXCJcXFxcI1wiICsgRlJBR01FTlQkKSArIFwiP1wiKSxcbiAgICAgICAgVVJJX1JFRkVSRU5DRSQgPSBzdWJleHAoVVJJJCArIFwifFwiICsgUkVMQVRJVkUkKSxcbiAgICAgICAgQUJTT0xVVEVfVVJJJCA9IHN1YmV4cChTQ0hFTUUkICsgXCJcXFxcOlwiICsgSElFUl9QQVJUJCArIHN1YmV4cChcIlxcXFw/XCIgKyBRVUVSWSQpICsgXCI/XCIpLFxuICAgICAgICBHRU5FUklDX1JFRiQgPSBcIl4oXCIgKyBTQ0hFTUUkICsgXCIpXFxcXDpcIiArIHN1YmV4cChzdWJleHAoXCJcXFxcL1xcXFwvKFwiICsgc3ViZXhwKFwiKFwiICsgVVNFUklORk8kICsgXCIpQFwiKSArIFwiPyhcIiArIEhPU1QkICsgXCIpXCIgKyBzdWJleHAoXCJcXFxcOihcIiArIFBPUlQkICsgXCIpXCIpICsgXCI/KVwiKSArIFwiPyhcIiArIFBBVEhfQUJFTVBUWSQgKyBcInxcIiArIFBBVEhfQUJTT0xVVEUkICsgXCJ8XCIgKyBQQVRIX1JPT1RMRVNTJCArIFwifFwiICsgUEFUSF9FTVBUWSQgKyBcIilcIikgKyBzdWJleHAoXCJcXFxcPyhcIiArIFFVRVJZJCArIFwiKVwiKSArIFwiP1wiICsgc3ViZXhwKFwiXFxcXCMoXCIgKyBGUkFHTUVOVCQgKyBcIilcIikgKyBcIj8kXCIsXG4gICAgICAgIFJFTEFUSVZFX1JFRiQgPSBcIl4oKXswfVwiICsgc3ViZXhwKHN1YmV4cChcIlxcXFwvXFxcXC8oXCIgKyBzdWJleHAoXCIoXCIgKyBVU0VSSU5GTyQgKyBcIilAXCIpICsgXCI/KFwiICsgSE9TVCQgKyBcIilcIiArIHN1YmV4cChcIlxcXFw6KFwiICsgUE9SVCQgKyBcIilcIikgKyBcIj8pXCIpICsgXCI/KFwiICsgUEFUSF9BQkVNUFRZJCArIFwifFwiICsgUEFUSF9BQlNPTFVURSQgKyBcInxcIiArIFBBVEhfTk9TQ0hFTUUkICsgXCJ8XCIgKyBQQVRIX0VNUFRZJCArIFwiKVwiKSArIHN1YmV4cChcIlxcXFw/KFwiICsgUVVFUlkkICsgXCIpXCIpICsgXCI/XCIgKyBzdWJleHAoXCJcXFxcIyhcIiArIEZSQUdNRU5UJCArIFwiKVwiKSArIFwiPyRcIixcbiAgICAgICAgQUJTT0xVVEVfUkVGJCA9IFwiXihcIiArIFNDSEVNRSQgKyBcIilcXFxcOlwiICsgc3ViZXhwKHN1YmV4cChcIlxcXFwvXFxcXC8oXCIgKyBzdWJleHAoXCIoXCIgKyBVU0VSSU5GTyQgKyBcIilAXCIpICsgXCI/KFwiICsgSE9TVCQgKyBcIilcIiArIHN1YmV4cChcIlxcXFw6KFwiICsgUE9SVCQgKyBcIilcIikgKyBcIj8pXCIpICsgXCI/KFwiICsgUEFUSF9BQkVNUFRZJCArIFwifFwiICsgUEFUSF9BQlNPTFVURSQgKyBcInxcIiArIFBBVEhfUk9PVExFU1MkICsgXCJ8XCIgKyBQQVRIX0VNUFRZJCArIFwiKVwiKSArIHN1YmV4cChcIlxcXFw/KFwiICsgUVVFUlkkICsgXCIpXCIpICsgXCI/JFwiLFxuICAgICAgICBTQU1FRE9DX1JFRiQgPSBcIl5cIiArIHN1YmV4cChcIlxcXFwjKFwiICsgRlJBR01FTlQkICsgXCIpXCIpICsgXCI/JFwiLFxuICAgICAgICBBVVRIT1JJVFlfUkVGJCA9IFwiXlwiICsgc3ViZXhwKFwiKFwiICsgVVNFUklORk8kICsgXCIpQFwiKSArIFwiPyhcIiArIEhPU1QkICsgXCIpXCIgKyBzdWJleHAoXCJcXFxcOihcIiArIFBPUlQkICsgXCIpXCIpICsgXCI/JFwiO1xuICAgIHJldHVybiB7XG4gICAgICAgIE5PVF9TQ0hFTUU6IG5ldyBSZWdFeHAobWVyZ2UoXCJbXl1cIiwgQUxQSEEkJCwgRElHSVQkJCwgXCJbXFxcXCtcXFxcLVxcXFwuXVwiKSwgXCJnXCIpLFxuICAgICAgICBOT1RfVVNFUklORk86IG5ldyBSZWdFeHAobWVyZ2UoXCJbXlxcXFwlXFxcXDpdXCIsIFVOUkVTRVJWRUQkJCwgU1VCX0RFTElNUyQkKSwgXCJnXCIpLFxuICAgICAgICBOT1RfSE9TVDogbmV3IFJlZ0V4cChtZXJnZShcIlteXFxcXCVcXFxcW1xcXFxdXFxcXDpdXCIsIFVOUkVTRVJWRUQkJCwgU1VCX0RFTElNUyQkKSwgXCJnXCIpLFxuICAgICAgICBOT1RfUEFUSDogbmV3IFJlZ0V4cChtZXJnZShcIlteXFxcXCVcXFxcL1xcXFw6XFxcXEBdXCIsIFVOUkVTRVJWRUQkJCwgU1VCX0RFTElNUyQkKSwgXCJnXCIpLFxuICAgICAgICBOT1RfUEFUSF9OT1NDSEVNRTogbmV3IFJlZ0V4cChtZXJnZShcIlteXFxcXCVcXFxcL1xcXFxAXVwiLCBVTlJFU0VSVkVEJCQsIFNVQl9ERUxJTVMkJCksIFwiZ1wiKSxcbiAgICAgICAgTk9UX1FVRVJZOiBuZXcgUmVnRXhwKG1lcmdlKFwiW15cXFxcJV1cIiwgVU5SRVNFUlZFRCQkLCBTVUJfREVMSU1TJCQsIFwiW1xcXFw6XFxcXEBcXFxcL1xcXFw/XVwiLCBJUFJJVkFURSQkKSwgXCJnXCIpLFxuICAgICAgICBOT1RfRlJBR01FTlQ6IG5ldyBSZWdFeHAobWVyZ2UoXCJbXlxcXFwlXVwiLCBVTlJFU0VSVkVEJCQsIFNVQl9ERUxJTVMkJCwgXCJbXFxcXDpcXFxcQFxcXFwvXFxcXD9dXCIpLCBcImdcIiksXG4gICAgICAgIEVTQ0FQRTogbmV3IFJlZ0V4cChtZXJnZShcIlteXVwiLCBVTlJFU0VSVkVEJCQsIFNVQl9ERUxJTVMkJCksIFwiZ1wiKSxcbiAgICAgICAgVU5SRVNFUlZFRDogbmV3IFJlZ0V4cChVTlJFU0VSVkVEJCQsIFwiZ1wiKSxcbiAgICAgICAgT1RIRVJfQ0hBUlM6IG5ldyBSZWdFeHAobWVyZ2UoXCJbXlxcXFwlXVwiLCBVTlJFU0VSVkVEJCQsIFJFU0VSVkVEJCQpLCBcImdcIiksXG4gICAgICAgIFBDVF9FTkNPREVEOiBuZXcgUmVnRXhwKFBDVF9FTkNPREVEJCwgXCJnXCIpLFxuICAgICAgICBJUFY0QUREUkVTUzogbmV3IFJlZ0V4cChcIl4oXCIgKyBJUFY0QUREUkVTUyQgKyBcIikkXCIpLFxuICAgICAgICBJUFY2QUREUkVTUzogbmV3IFJlZ0V4cChcIl5cXFxcWz8oXCIgKyBJUFY2QUREUkVTUyQgKyBcIilcIiArIHN1YmV4cChzdWJleHAoXCJcXFxcJTI1fFxcXFwlKD8hXCIgKyBIRVhESUckJCArIFwiezJ9KVwiKSArIFwiKFwiICsgWk9ORUlEJCArIFwiKVwiKSArIFwiP1xcXFxdPyRcIikgLy9SRkMgNjg3NCwgd2l0aCByZWxheGVkIHBhcnNpbmcgcnVsZXNcbiAgICB9O1xufVxudmFyIFVSSV9QUk9UT0NPTCA9IGJ1aWxkRXhwcyhmYWxzZSk7XG5cbnZhciBJUklfUFJPVE9DT0wgPSBidWlsZEV4cHModHJ1ZSk7XG5cbnZhciBzbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkge1xuICAgIHZhciBfYXJyID0gW107XG4gICAgdmFyIF9uID0gdHJ1ZTtcbiAgICB2YXIgX2QgPSBmYWxzZTtcbiAgICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtcbiAgICAgIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2FycjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkge1xuICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gICAgfVxuICB9O1xufSgpO1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG52YXIgdG9Db25zdW1hYmxlQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSBhcnIyW2ldID0gYXJyW2ldO1xuXG4gICAgcmV0dXJuIGFycjI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oYXJyKTtcbiAgfVxufTtcblxuLyoqIEhpZ2hlc3QgcG9zaXRpdmUgc2lnbmVkIDMyLWJpdCBmbG9hdCB2YWx1ZSAqL1xuXG52YXIgbWF4SW50ID0gMjE0NzQ4MzY0NzsgLy8gYWthLiAweDdGRkZGRkZGIG9yIDJeMzEtMVxuXG4vKiogQm9vdHN0cmluZyBwYXJhbWV0ZXJzICovXG52YXIgYmFzZSA9IDM2O1xudmFyIHRNaW4gPSAxO1xudmFyIHRNYXggPSAyNjtcbnZhciBza2V3ID0gMzg7XG52YXIgZGFtcCA9IDcwMDtcbnZhciBpbml0aWFsQmlhcyA9IDcyO1xudmFyIGluaXRpYWxOID0gMTI4OyAvLyAweDgwXG52YXIgZGVsaW1pdGVyID0gJy0nOyAvLyAnXFx4MkQnXG5cbi8qKiBSZWd1bGFyIGV4cHJlc3Npb25zICovXG52YXIgcmVnZXhQdW55Y29kZSA9IC9eeG4tLS87XG52YXIgcmVnZXhOb25BU0NJSSA9IC9bXlxcMC1cXHg3RV0vOyAvLyBub24tQVNDSUkgY2hhcnNcbnZhciByZWdleFNlcGFyYXRvcnMgPSAvW1xceDJFXFx1MzAwMlxcdUZGMEVcXHVGRjYxXS9nOyAvLyBSRkMgMzQ5MCBzZXBhcmF0b3JzXG5cbi8qKiBFcnJvciBtZXNzYWdlcyAqL1xudmFyIGVycm9ycyA9IHtcblx0J292ZXJmbG93JzogJ092ZXJmbG93OiBpbnB1dCBuZWVkcyB3aWRlciBpbnRlZ2VycyB0byBwcm9jZXNzJyxcblx0J25vdC1iYXNpYyc6ICdJbGxlZ2FsIGlucHV0ID49IDB4ODAgKG5vdCBhIGJhc2ljIGNvZGUgcG9pbnQpJyxcblx0J2ludmFsaWQtaW5wdXQnOiAnSW52YWxpZCBpbnB1dCdcbn07XG5cbi8qKiBDb252ZW5pZW5jZSBzaG9ydGN1dHMgKi9cbnZhciBiYXNlTWludXNUTWluID0gYmFzZSAtIHRNaW47XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xudmFyIHN0cmluZ0Zyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIEEgZ2VuZXJpYyBlcnJvciB1dGlsaXR5IGZ1bmN0aW9uLlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIFRoZSBlcnJvciB0eXBlLlxuICogQHJldHVybnMge0Vycm9yfSBUaHJvd3MgYSBgUmFuZ2VFcnJvcmAgd2l0aCB0aGUgYXBwbGljYWJsZSBlcnJvciBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBlcnJvciQxKHR5cGUpIHtcblx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoZXJyb3JzW3R5cGVdKTtcbn1cblxuLyoqXG4gKiBBIGdlbmVyaWMgYEFycmF5I21hcGAgdXRpbGl0eSBmdW5jdGlvbi5cbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgZm9yIGV2ZXJ5IGFycmF5XG4gKiBpdGVtLlxuICogQHJldHVybnMge0FycmF5fSBBIG5ldyBhcnJheSBvZiB2YWx1ZXMgcmV0dXJuZWQgYnkgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBtYXAoYXJyYXksIGZuKSB7XG5cdHZhciByZXN1bHQgPSBbXTtcblx0dmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblx0d2hpbGUgKGxlbmd0aC0tKSB7XG5cdFx0cmVzdWx0W2xlbmd0aF0gPSBmbihhcnJheVtsZW5ndGhdKTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEEgc2ltcGxlIGBBcnJheSNtYXBgLWxpa2Ugd3JhcHBlciB0byB3b3JrIHdpdGggZG9tYWluIG5hbWUgc3RyaW5ncyBvciBlbWFpbFxuICogYWRkcmVzc2VzLlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBkb21haW4gVGhlIGRvbWFpbiBuYW1lIG9yIGVtYWlsIGFkZHJlc3MuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnlcbiAqIGNoYXJhY3Rlci5cbiAqIEByZXR1cm5zIHtBcnJheX0gQSBuZXcgc3RyaW5nIG9mIGNoYXJhY3RlcnMgcmV0dXJuZWQgYnkgdGhlIGNhbGxiYWNrXG4gKiBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gbWFwRG9tYWluKHN0cmluZywgZm4pIHtcblx0dmFyIHBhcnRzID0gc3RyaW5nLnNwbGl0KCdAJyk7XG5cdHZhciByZXN1bHQgPSAnJztcblx0aWYgKHBhcnRzLmxlbmd0aCA+IDEpIHtcblx0XHQvLyBJbiBlbWFpbCBhZGRyZXNzZXMsIG9ubHkgdGhlIGRvbWFpbiBuYW1lIHNob3VsZCBiZSBwdW55Y29kZWQuIExlYXZlXG5cdFx0Ly8gdGhlIGxvY2FsIHBhcnQgKGkuZS4gZXZlcnl0aGluZyB1cCB0byBgQGApIGludGFjdC5cblx0XHRyZXN1bHQgPSBwYXJ0c1swXSArICdAJztcblx0XHRzdHJpbmcgPSBwYXJ0c1sxXTtcblx0fVxuXHQvLyBBdm9pZCBgc3BsaXQocmVnZXgpYCBmb3IgSUU4IGNvbXBhdGliaWxpdHkuIFNlZSAjMTcuXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlZ2V4U2VwYXJhdG9ycywgJ1xceDJFJyk7XG5cdHZhciBsYWJlbHMgPSBzdHJpbmcuc3BsaXQoJy4nKTtcblx0dmFyIGVuY29kZWQgPSBtYXAobGFiZWxzLCBmbikuam9pbignLicpO1xuXHRyZXR1cm4gcmVzdWx0ICsgZW5jb2RlZDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIG51bWVyaWMgY29kZSBwb2ludHMgb2YgZWFjaCBVbmljb2RlXG4gKiBjaGFyYWN0ZXIgaW4gdGhlIHN0cmluZy4gV2hpbGUgSmF2YVNjcmlwdCB1c2VzIFVDUy0yIGludGVybmFsbHksXG4gKiB0aGlzIGZ1bmN0aW9uIHdpbGwgY29udmVydCBhIHBhaXIgb2Ygc3Vycm9nYXRlIGhhbHZlcyAoZWFjaCBvZiB3aGljaFxuICogVUNTLTIgZXhwb3NlcyBhcyBzZXBhcmF0ZSBjaGFyYWN0ZXJzKSBpbnRvIGEgc2luZ2xlIGNvZGUgcG9pbnQsXG4gKiBtYXRjaGluZyBVVEYtMTYuXG4gKiBAc2VlIGBwdW55Y29kZS51Y3MyLmVuY29kZWBcbiAqIEBzZWUgPGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nPlxuICogQG1lbWJlck9mIHB1bnljb2RlLnVjczJcbiAqIEBuYW1lIGRlY29kZVxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgVW5pY29kZSBpbnB1dCBzdHJpbmcgKFVDUy0yKS5cbiAqIEByZXR1cm5zIHtBcnJheX0gVGhlIG5ldyBhcnJheSBvZiBjb2RlIHBvaW50cy5cbiAqL1xuZnVuY3Rpb24gdWNzMmRlY29kZShzdHJpbmcpIHtcblx0dmFyIG91dHB1dCA9IFtdO1xuXHR2YXIgY291bnRlciA9IDA7XG5cdHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuXHR3aGlsZSAoY291bnRlciA8IGxlbmd0aCkge1xuXHRcdHZhciB2YWx1ZSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0aWYgKHZhbHVlID49IDB4RDgwMCAmJiB2YWx1ZSA8PSAweERCRkYgJiYgY291bnRlciA8IGxlbmd0aCkge1xuXHRcdFx0Ly8gSXQncyBhIGhpZ2ggc3Vycm9nYXRlLCBhbmQgdGhlcmUgaXMgYSBuZXh0IGNoYXJhY3Rlci5cblx0XHRcdHZhciBleHRyYSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRpZiAoKGV4dHJhICYgMHhGQzAwKSA9PSAweERDMDApIHtcblx0XHRcdFx0Ly8gTG93IHN1cnJvZ2F0ZS5cblx0XHRcdFx0b3V0cHV0LnB1c2goKCh2YWx1ZSAmIDB4M0ZGKSA8PCAxMCkgKyAoZXh0cmEgJiAweDNGRikgKyAweDEwMDAwKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIEl0J3MgYW4gdW5tYXRjaGVkIHN1cnJvZ2F0ZTsgb25seSBhcHBlbmQgdGhpcyBjb2RlIHVuaXQsIGluIGNhc2UgdGhlXG5cdFx0XHRcdC8vIG5leHQgY29kZSB1bml0IGlzIHRoZSBoaWdoIHN1cnJvZ2F0ZSBvZiBhIHN1cnJvZ2F0ZSBwYWlyLlxuXHRcdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdGNvdW50ZXItLTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gb3V0cHV0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBzdHJpbmcgYmFzZWQgb24gYW4gYXJyYXkgb2YgbnVtZXJpYyBjb2RlIHBvaW50cy5cbiAqIEBzZWUgYHB1bnljb2RlLnVjczIuZGVjb2RlYFxuICogQG1lbWJlck9mIHB1bnljb2RlLnVjczJcbiAqIEBuYW1lIGVuY29kZVxuICogQHBhcmFtIHtBcnJheX0gY29kZVBvaW50cyBUaGUgYXJyYXkgb2YgbnVtZXJpYyBjb2RlIHBvaW50cy5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBuZXcgVW5pY29kZSBzdHJpbmcgKFVDUy0yKS5cbiAqL1xudmFyIHVjczJlbmNvZGUgPSBmdW5jdGlvbiB1Y3MyZW5jb2RlKGFycmF5KSB7XG5cdHJldHVybiBTdHJpbmcuZnJvbUNvZGVQb2ludC5hcHBseShTdHJpbmcsIHRvQ29uc3VtYWJsZUFycmF5KGFycmF5KSk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGEgYmFzaWMgY29kZSBwb2ludCBpbnRvIGEgZGlnaXQvaW50ZWdlci5cbiAqIEBzZWUgYGRpZ2l0VG9CYXNpYygpYFxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb2RlUG9pbnQgVGhlIGJhc2ljIG51bWVyaWMgY29kZSBwb2ludCB2YWx1ZS5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBudW1lcmljIHZhbHVlIG9mIGEgYmFzaWMgY29kZSBwb2ludCAoZm9yIHVzZSBpblxuICogcmVwcmVzZW50aW5nIGludGVnZXJzKSBpbiB0aGUgcmFuZ2UgYDBgIHRvIGBiYXNlIC0gMWAsIG9yIGBiYXNlYCBpZlxuICogdGhlIGNvZGUgcG9pbnQgZG9lcyBub3QgcmVwcmVzZW50IGEgdmFsdWUuXG4gKi9cbnZhciBiYXNpY1RvRGlnaXQgPSBmdW5jdGlvbiBiYXNpY1RvRGlnaXQoY29kZVBvaW50KSB7XG5cdGlmIChjb2RlUG9pbnQgLSAweDMwIDwgMHgwQSkge1xuXHRcdHJldHVybiBjb2RlUG9pbnQgLSAweDE2O1xuXHR9XG5cdGlmIChjb2RlUG9pbnQgLSAweDQxIDwgMHgxQSkge1xuXHRcdHJldHVybiBjb2RlUG9pbnQgLSAweDQxO1xuXHR9XG5cdGlmIChjb2RlUG9pbnQgLSAweDYxIDwgMHgxQSkge1xuXHRcdHJldHVybiBjb2RlUG9pbnQgLSAweDYxO1xuXHR9XG5cdHJldHVybiBiYXNlO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIGRpZ2l0L2ludGVnZXIgaW50byBhIGJhc2ljIGNvZGUgcG9pbnQuXG4gKiBAc2VlIGBiYXNpY1RvRGlnaXQoKWBcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gZGlnaXQgVGhlIG51bWVyaWMgdmFsdWUgb2YgYSBiYXNpYyBjb2RlIHBvaW50LlxuICogQHJldHVybnMge051bWJlcn0gVGhlIGJhc2ljIGNvZGUgcG9pbnQgd2hvc2UgdmFsdWUgKHdoZW4gdXNlZCBmb3JcbiAqIHJlcHJlc2VudGluZyBpbnRlZ2VycykgaXMgYGRpZ2l0YCwgd2hpY2ggbmVlZHMgdG8gYmUgaW4gdGhlIHJhbmdlXG4gKiBgMGAgdG8gYGJhc2UgLSAxYC4gSWYgYGZsYWdgIGlzIG5vbi16ZXJvLCB0aGUgdXBwZXJjYXNlIGZvcm0gaXNcbiAqIHVzZWQ7IGVsc2UsIHRoZSBsb3dlcmNhc2UgZm9ybSBpcyB1c2VkLiBUaGUgYmVoYXZpb3IgaXMgdW5kZWZpbmVkXG4gKiBpZiBgZmxhZ2AgaXMgbm9uLXplcm8gYW5kIGBkaWdpdGAgaGFzIG5vIHVwcGVyY2FzZSBmb3JtLlxuICovXG52YXIgZGlnaXRUb0Jhc2ljID0gZnVuY3Rpb24gZGlnaXRUb0Jhc2ljKGRpZ2l0LCBmbGFnKSB7XG5cdC8vICAwLi4yNSBtYXAgdG8gQVNDSUkgYS4ueiBvciBBLi5aXG5cdC8vIDI2Li4zNSBtYXAgdG8gQVNDSUkgMC4uOVxuXHRyZXR1cm4gZGlnaXQgKyAyMiArIDc1ICogKGRpZ2l0IDwgMjYpIC0gKChmbGFnICE9IDApIDw8IDUpO1xufTtcblxuLyoqXG4gKiBCaWFzIGFkYXB0YXRpb24gZnVuY3Rpb24gYXMgcGVyIHNlY3Rpb24gMy40IG9mIFJGQyAzNDkyLlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM0OTIjc2VjdGlvbi0zLjRcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBhZGFwdCA9IGZ1bmN0aW9uIGFkYXB0KGRlbHRhLCBudW1Qb2ludHMsIGZpcnN0VGltZSkge1xuXHR2YXIgayA9IDA7XG5cdGRlbHRhID0gZmlyc3RUaW1lID8gZmxvb3IoZGVsdGEgLyBkYW1wKSA6IGRlbHRhID4+IDE7XG5cdGRlbHRhICs9IGZsb29yKGRlbHRhIC8gbnVtUG9pbnRzKTtcblx0Zm9yICg7IC8qIG5vIGluaXRpYWxpemF0aW9uICovZGVsdGEgPiBiYXNlTWludXNUTWluICogdE1heCA+PiAxOyBrICs9IGJhc2UpIHtcblx0XHRkZWx0YSA9IGZsb29yKGRlbHRhIC8gYmFzZU1pbnVzVE1pbik7XG5cdH1cblx0cmV0dXJuIGZsb29yKGsgKyAoYmFzZU1pbnVzVE1pbiArIDEpICogZGVsdGEgLyAoZGVsdGEgKyBza2V3KSk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGEgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scyB0byBhIHN0cmluZyBvZiBVbmljb2RlXG4gKiBzeW1ib2xzLlxuICogQG1lbWJlck9mIHB1bnljb2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcmVzdWx0aW5nIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMuXG4gKi9cbnZhciBkZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUoaW5wdXQpIHtcblx0Ly8gRG9uJ3QgdXNlIFVDUy0yLlxuXHR2YXIgb3V0cHV0ID0gW107XG5cdHZhciBpbnB1dExlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0dmFyIGkgPSAwO1xuXHR2YXIgbiA9IGluaXRpYWxOO1xuXHR2YXIgYmlhcyA9IGluaXRpYWxCaWFzO1xuXG5cdC8vIEhhbmRsZSB0aGUgYmFzaWMgY29kZSBwb2ludHM6IGxldCBgYmFzaWNgIGJlIHRoZSBudW1iZXIgb2YgaW5wdXQgY29kZVxuXHQvLyBwb2ludHMgYmVmb3JlIHRoZSBsYXN0IGRlbGltaXRlciwgb3IgYDBgIGlmIHRoZXJlIGlzIG5vbmUsIHRoZW4gY29weVxuXHQvLyB0aGUgZmlyc3QgYmFzaWMgY29kZSBwb2ludHMgdG8gdGhlIG91dHB1dC5cblxuXHR2YXIgYmFzaWMgPSBpbnB1dC5sYXN0SW5kZXhPZihkZWxpbWl0ZXIpO1xuXHRpZiAoYmFzaWMgPCAwKSB7XG5cdFx0YmFzaWMgPSAwO1xuXHR9XG5cblx0Zm9yICh2YXIgaiA9IDA7IGogPCBiYXNpYzsgKytqKSB7XG5cdFx0Ly8gaWYgaXQncyBub3QgYSBiYXNpYyBjb2RlIHBvaW50XG5cdFx0aWYgKGlucHV0LmNoYXJDb2RlQXQoaikgPj0gMHg4MCkge1xuXHRcdFx0ZXJyb3IkMSgnbm90LWJhc2ljJyk7XG5cdFx0fVxuXHRcdG91dHB1dC5wdXNoKGlucHV0LmNoYXJDb2RlQXQoaikpO1xuXHR9XG5cblx0Ly8gTWFpbiBkZWNvZGluZyBsb29wOiBzdGFydCBqdXN0IGFmdGVyIHRoZSBsYXN0IGRlbGltaXRlciBpZiBhbnkgYmFzaWMgY29kZVxuXHQvLyBwb2ludHMgd2VyZSBjb3BpZWQ7IHN0YXJ0IGF0IHRoZSBiZWdpbm5pbmcgb3RoZXJ3aXNlLlxuXG5cdGZvciAodmFyIGluZGV4ID0gYmFzaWMgPiAwID8gYmFzaWMgKyAxIDogMDsgaW5kZXggPCBpbnB1dExlbmd0aDspIC8qIG5vIGZpbmFsIGV4cHJlc3Npb24gKi97XG5cblx0XHQvLyBgaW5kZXhgIGlzIHRoZSBpbmRleCBvZiB0aGUgbmV4dCBjaGFyYWN0ZXIgdG8gYmUgY29uc3VtZWQuXG5cdFx0Ly8gRGVjb2RlIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXIgaW50byBgZGVsdGFgLFxuXHRcdC8vIHdoaWNoIGdldHMgYWRkZWQgdG8gYGlgLiBUaGUgb3ZlcmZsb3cgY2hlY2tpbmcgaXMgZWFzaWVyXG5cdFx0Ly8gaWYgd2UgaW5jcmVhc2UgYGlgIGFzIHdlIGdvLCB0aGVuIHN1YnRyYWN0IG9mZiBpdHMgc3RhcnRpbmdcblx0XHQvLyB2YWx1ZSBhdCB0aGUgZW5kIHRvIG9idGFpbiBgZGVsdGFgLlxuXHRcdHZhciBvbGRpID0gaTtcblx0XHRmb3IgKHZhciB3ID0gMSwgayA9IGJhc2U7OyAvKiBubyBjb25kaXRpb24gKi9rICs9IGJhc2UpIHtcblxuXHRcdFx0aWYgKGluZGV4ID49IGlucHV0TGVuZ3RoKSB7XG5cdFx0XHRcdGVycm9yJDEoJ2ludmFsaWQtaW5wdXQnKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGRpZ2l0ID0gYmFzaWNUb0RpZ2l0KGlucHV0LmNoYXJDb2RlQXQoaW5kZXgrKykpO1xuXG5cdFx0XHRpZiAoZGlnaXQgPj0gYmFzZSB8fCBkaWdpdCA+IGZsb29yKChtYXhJbnQgLSBpKSAvIHcpKSB7XG5cdFx0XHRcdGVycm9yJDEoJ292ZXJmbG93Jyk7XG5cdFx0XHR9XG5cblx0XHRcdGkgKz0gZGlnaXQgKiB3O1xuXHRcdFx0dmFyIHQgPSBrIDw9IGJpYXMgPyB0TWluIDogayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcztcblxuXHRcdFx0aWYgKGRpZ2l0IDwgdCkge1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0dmFyIGJhc2VNaW51c1QgPSBiYXNlIC0gdDtcblx0XHRcdGlmICh3ID4gZmxvb3IobWF4SW50IC8gYmFzZU1pbnVzVCkpIHtcblx0XHRcdFx0ZXJyb3IkMSgnb3ZlcmZsb3cnKTtcblx0XHRcdH1cblxuXHRcdFx0dyAqPSBiYXNlTWludXNUO1xuXHRcdH1cblxuXHRcdHZhciBvdXQgPSBvdXRwdXQubGVuZ3RoICsgMTtcblx0XHRiaWFzID0gYWRhcHQoaSAtIG9sZGksIG91dCwgb2xkaSA9PSAwKTtcblxuXHRcdC8vIGBpYCB3YXMgc3VwcG9zZWQgdG8gd3JhcCBhcm91bmQgZnJvbSBgb3V0YCB0byBgMGAsXG5cdFx0Ly8gaW5jcmVtZW50aW5nIGBuYCBlYWNoIHRpbWUsIHNvIHdlJ2xsIGZpeCB0aGF0IG5vdzpcblx0XHRpZiAoZmxvb3IoaSAvIG91dCkgPiBtYXhJbnQgLSBuKSB7XG5cdFx0XHRlcnJvciQxKCdvdmVyZmxvdycpO1xuXHRcdH1cblxuXHRcdG4gKz0gZmxvb3IoaSAvIG91dCk7XG5cdFx0aSAlPSBvdXQ7XG5cblx0XHQvLyBJbnNlcnQgYG5gIGF0IHBvc2l0aW9uIGBpYCBvZiB0aGUgb3V0cHV0LlxuXHRcdG91dHB1dC5zcGxpY2UoaSsrLCAwLCBuKTtcblx0fVxuXG5cdHJldHVybiBTdHJpbmcuZnJvbUNvZGVQb2ludC5hcHBseShTdHJpbmcsIG91dHB1dCk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGEgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scyAoZS5nLiBhIGRvbWFpbiBuYW1lIGxhYmVsKSB0byBhXG4gKiBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuICogQG1lbWJlck9mIHB1bnljb2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcmVzdWx0aW5nIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMuXG4gKi9cbnZhciBlbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUoaW5wdXQpIHtcblx0dmFyIG91dHB1dCA9IFtdO1xuXG5cdC8vIENvbnZlcnQgdGhlIGlucHV0IGluIFVDUy0yIHRvIGFuIGFycmF5IG9mIFVuaWNvZGUgY29kZSBwb2ludHMuXG5cdGlucHV0ID0gdWNzMmRlY29kZShpbnB1dCk7XG5cblx0Ly8gQ2FjaGUgdGhlIGxlbmd0aC5cblx0dmFyIGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXG5cdC8vIEluaXRpYWxpemUgdGhlIHN0YXRlLlxuXHR2YXIgbiA9IGluaXRpYWxOO1xuXHR2YXIgZGVsdGEgPSAwO1xuXHR2YXIgYmlhcyA9IGluaXRpYWxCaWFzO1xuXG5cdC8vIEhhbmRsZSB0aGUgYmFzaWMgY29kZSBwb2ludHMuXG5cdHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcblx0dmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG5cdHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuXHR0cnkge1xuXHRcdGZvciAodmFyIF9pdGVyYXRvciA9IGlucHV0W1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuXHRcdFx0dmFyIF9jdXJyZW50VmFsdWUyID0gX3N0ZXAudmFsdWU7XG5cblx0XHRcdGlmIChfY3VycmVudFZhbHVlMiA8IDB4ODApIHtcblx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKF9jdXJyZW50VmFsdWUyKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGNhdGNoIChlcnIpIHtcblx0XHRfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG5cdFx0X2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG5cdH0gZmluYWxseSB7XG5cdFx0dHJ5IHtcblx0XHRcdGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG5cdFx0XHRcdF9pdGVyYXRvci5yZXR1cm4oKTtcblx0XHRcdH1cblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0aWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG5cdFx0XHRcdHRocm93IF9pdGVyYXRvckVycm9yO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHZhciBiYXNpY0xlbmd0aCA9IG91dHB1dC5sZW5ndGg7XG5cdHZhciBoYW5kbGVkQ1BDb3VudCA9IGJhc2ljTGVuZ3RoO1xuXG5cdC8vIGBoYW5kbGVkQ1BDb3VudGAgaXMgdGhlIG51bWJlciBvZiBjb2RlIHBvaW50cyB0aGF0IGhhdmUgYmVlbiBoYW5kbGVkO1xuXHQvLyBgYmFzaWNMZW5ndGhgIGlzIHRoZSBudW1iZXIgb2YgYmFzaWMgY29kZSBwb2ludHMuXG5cblx0Ly8gRmluaXNoIHRoZSBiYXNpYyBzdHJpbmcgd2l0aCBhIGRlbGltaXRlciB1bmxlc3MgaXQncyBlbXB0eS5cblx0aWYgKGJhc2ljTGVuZ3RoKSB7XG5cdFx0b3V0cHV0LnB1c2goZGVsaW1pdGVyKTtcblx0fVxuXG5cdC8vIE1haW4gZW5jb2RpbmcgbG9vcDpcblx0d2hpbGUgKGhhbmRsZWRDUENvdW50IDwgaW5wdXRMZW5ndGgpIHtcblxuXHRcdC8vIEFsbCBub24tYmFzaWMgY29kZSBwb2ludHMgPCBuIGhhdmUgYmVlbiBoYW5kbGVkIGFscmVhZHkuIEZpbmQgdGhlIG5leHRcblx0XHQvLyBsYXJnZXIgb25lOlxuXHRcdHZhciBtID0gbWF4SW50O1xuXHRcdHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG5cdFx0dmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuXHRcdHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cblx0XHR0cnkge1xuXHRcdFx0Zm9yICh2YXIgX2l0ZXJhdG9yMiA9IGlucHV0W1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG5cdFx0XHRcdHZhciBjdXJyZW50VmFsdWUgPSBfc3RlcDIudmFsdWU7XG5cblx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA+PSBuICYmIGN1cnJlbnRWYWx1ZSA8IG0pIHtcblx0XHRcdFx0XHRtID0gY3VycmVudFZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEluY3JlYXNlIGBkZWx0YWAgZW5vdWdoIHRvIGFkdmFuY2UgdGhlIGRlY29kZXIncyA8bixpPiBzdGF0ZSB0byA8bSwwPixcblx0XHRcdC8vIGJ1dCBndWFyZCBhZ2FpbnN0IG92ZXJmbG93LlxuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0X2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcblx0XHRcdF9pdGVyYXRvckVycm9yMiA9IGVycjtcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuXHRcdFx0XHRcdF9pdGVyYXRvcjIucmV0dXJuKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZmluYWxseSB7XG5cdFx0XHRcdGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcblx0XHRcdFx0XHR0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YXIgaGFuZGxlZENQQ291bnRQbHVzT25lID0gaGFuZGxlZENQQ291bnQgKyAxO1xuXHRcdGlmIChtIC0gbiA+IGZsb29yKChtYXhJbnQgLSBkZWx0YSkgLyBoYW5kbGVkQ1BDb3VudFBsdXNPbmUpKSB7XG5cdFx0XHRlcnJvciQxKCdvdmVyZmxvdycpO1xuXHRcdH1cblxuXHRcdGRlbHRhICs9IChtIC0gbikgKiBoYW5kbGVkQ1BDb3VudFBsdXNPbmU7XG5cdFx0biA9IG07XG5cblx0XHR2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlO1xuXHRcdHZhciBfZGlkSXRlcmF0b3JFcnJvcjMgPSBmYWxzZTtcblx0XHR2YXIgX2l0ZXJhdG9yRXJyb3IzID0gdW5kZWZpbmVkO1xuXG5cdFx0dHJ5IHtcblx0XHRcdGZvciAodmFyIF9pdGVyYXRvcjMgPSBpbnB1dFtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMzsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IChfc3RlcDMgPSBfaXRlcmF0b3IzLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZSkge1xuXHRcdFx0XHR2YXIgX2N1cnJlbnRWYWx1ZSA9IF9zdGVwMy52YWx1ZTtcblxuXHRcdFx0XHRpZiAoX2N1cnJlbnRWYWx1ZSA8IG4gJiYgKytkZWx0YSA+IG1heEludCkge1xuXHRcdFx0XHRcdGVycm9yJDEoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKF9jdXJyZW50VmFsdWUgPT0gbikge1xuXHRcdFx0XHRcdC8vIFJlcHJlc2VudCBkZWx0YSBhcyBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyLlxuXHRcdFx0XHRcdHZhciBxID0gZGVsdGE7XG5cdFx0XHRcdFx0Zm9yICh2YXIgayA9IGJhc2U7OyAvKiBubyBjb25kaXRpb24gKi9rICs9IGJhc2UpIHtcblx0XHRcdFx0XHRcdHZhciB0ID0gayA8PSBiaWFzID8gdE1pbiA6IGsgPj0gYmlhcyArIHRNYXggPyB0TWF4IDogayAtIGJpYXM7XG5cdFx0XHRcdFx0XHRpZiAocSA8IHQpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR2YXIgcU1pbnVzVCA9IHEgLSB0O1xuXHRcdFx0XHRcdFx0dmFyIGJhc2VNaW51c1QgPSBiYXNlIC0gdDtcblx0XHRcdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShkaWdpdFRvQmFzaWModCArIHFNaW51c1QgJSBiYXNlTWludXNULCAwKSkpO1xuXHRcdFx0XHRcdFx0cSA9IGZsb29yKHFNaW51c1QgLyBiYXNlTWludXNUKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRvdXRwdXQucHVzaChzdHJpbmdGcm9tQ2hhckNvZGUoZGlnaXRUb0Jhc2ljKHEsIDApKSk7XG5cdFx0XHRcdFx0YmlhcyA9IGFkYXB0KGRlbHRhLCBoYW5kbGVkQ1BDb3VudFBsdXNPbmUsIGhhbmRsZWRDUENvdW50ID09IGJhc2ljTGVuZ3RoKTtcblx0XHRcdFx0XHRkZWx0YSA9IDA7XG5cdFx0XHRcdFx0KytoYW5kbGVkQ1BDb3VudDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0X2RpZEl0ZXJhdG9yRXJyb3IzID0gdHJ1ZTtcblx0XHRcdF9pdGVyYXRvckVycm9yMyA9IGVycjtcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyAmJiBfaXRlcmF0b3IzLnJldHVybikge1xuXHRcdFx0XHRcdF9pdGVyYXRvcjMucmV0dXJuKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZmluYWxseSB7XG5cdFx0XHRcdGlmIChfZGlkSXRlcmF0b3JFcnJvcjMpIHtcblx0XHRcdFx0XHR0aHJvdyBfaXRlcmF0b3JFcnJvcjM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQrK2RlbHRhO1xuXHRcdCsrbjtcblx0fVxuXHRyZXR1cm4gb3V0cHV0LmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIFB1bnljb2RlIHN0cmluZyByZXByZXNlbnRpbmcgYSBkb21haW4gbmFtZSBvciBhbiBlbWFpbCBhZGRyZXNzXG4gKiB0byBVbmljb2RlLiBPbmx5IHRoZSBQdW55Y29kZWQgcGFydHMgb2YgdGhlIGlucHV0IHdpbGwgYmUgY29udmVydGVkLCBpLmUuXG4gKiBpdCBkb2Vzbid0IG1hdHRlciBpZiB5b3UgY2FsbCBpdCBvbiBhIHN0cmluZyB0aGF0IGhhcyBhbHJlYWR5IGJlZW5cbiAqIGNvbnZlcnRlZCB0byBVbmljb2RlLlxuICogQG1lbWJlck9mIHB1bnljb2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFB1bnljb2RlZCBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzIHRvXG4gKiBjb252ZXJ0IHRvIFVuaWNvZGUuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgVW5pY29kZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gUHVueWNvZGVcbiAqIHN0cmluZy5cbiAqL1xudmFyIHRvVW5pY29kZSA9IGZ1bmN0aW9uIHRvVW5pY29kZShpbnB1dCkge1xuXHRyZXR1cm4gbWFwRG9tYWluKGlucHV0LCBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHJlZ2V4UHVueWNvZGUudGVzdChzdHJpbmcpID8gZGVjb2RlKHN0cmluZy5zbGljZSg0KS50b0xvd2VyQ2FzZSgpKSA6IHN0cmluZztcblx0fSk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGEgVW5pY29kZSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgZG9tYWluIG5hbWUgb3IgYW4gZW1haWwgYWRkcmVzcyB0b1xuICogUHVueWNvZGUuIE9ubHkgdGhlIG5vbi1BU0NJSSBwYXJ0cyBvZiB0aGUgZG9tYWluIG5hbWUgd2lsbCBiZSBjb252ZXJ0ZWQsXG4gKiBpLmUuIGl0IGRvZXNuJ3QgbWF0dGVyIGlmIHlvdSBjYWxsIGl0IHdpdGggYSBkb21haW4gdGhhdCdzIGFscmVhZHkgaW5cbiAqIEFTQ0lJLlxuICogQG1lbWJlck9mIHB1bnljb2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIGRvbWFpbiBuYW1lIG9yIGVtYWlsIGFkZHJlc3MgdG8gY29udmVydCwgYXMgYVxuICogVW5pY29kZSBzdHJpbmcuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgUHVueWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIGRvbWFpbiBuYW1lIG9yXG4gKiBlbWFpbCBhZGRyZXNzLlxuICovXG52YXIgdG9BU0NJSSA9IGZ1bmN0aW9uIHRvQVNDSUkoaW5wdXQpIHtcblx0cmV0dXJuIG1hcERvbWFpbihpbnB1dCwgZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdHJldHVybiByZWdleE5vbkFTQ0lJLnRlc3Qoc3RyaW5nKSA/ICd4bi0tJyArIGVuY29kZShzdHJpbmcpIDogc3RyaW5nO1xuXHR9KTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKiogRGVmaW5lIHRoZSBwdWJsaWMgQVBJICovXG52YXIgcHVueWNvZGUgPSB7XG5cdC8qKlxuICAqIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgY3VycmVudCBQdW55Y29kZS5qcyB2ZXJzaW9uIG51bWJlci5cbiAgKiBAbWVtYmVyT2YgcHVueWNvZGVcbiAgKiBAdHlwZSBTdHJpbmdcbiAgKi9cblx0J3ZlcnNpb24nOiAnMi4xLjAnLFxuXHQvKipcbiAgKiBBbiBvYmplY3Qgb2YgbWV0aG9kcyB0byBjb252ZXJ0IGZyb20gSmF2YVNjcmlwdCdzIGludGVybmFsIGNoYXJhY3RlclxuICAqIHJlcHJlc2VudGF0aW9uIChVQ1MtMikgdG8gVW5pY29kZSBjb2RlIHBvaW50cywgYW5kIGJhY2suXG4gICogQHNlZSA8aHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmc+XG4gICogQG1lbWJlck9mIHB1bnljb2RlXG4gICogQHR5cGUgT2JqZWN0XG4gICovXG5cdCd1Y3MyJzoge1xuXHRcdCdkZWNvZGUnOiB1Y3MyZGVjb2RlLFxuXHRcdCdlbmNvZGUnOiB1Y3MyZW5jb2RlXG5cdH0sXG5cdCdkZWNvZGUnOiBkZWNvZGUsXG5cdCdlbmNvZGUnOiBlbmNvZGUsXG5cdCd0b0FTQ0lJJzogdG9BU0NJSSxcblx0J3RvVW5pY29kZSc6IHRvVW5pY29kZVxufTtcblxuLyoqXG4gKiBVUkkuanNcbiAqXG4gKiBAZmlsZW92ZXJ2aWV3IEFuIFJGQyAzOTg2IGNvbXBsaWFudCwgc2NoZW1lIGV4dGVuZGFibGUgVVJJIHBhcnNpbmcvdmFsaWRhdGluZy9yZXNvbHZpbmcgbGlicmFyeSBmb3IgSmF2YVNjcmlwdC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpnYXJ5LmNvdXJ0QGdtYWlsLmNvbVwiPkdhcnkgQ291cnQ8L2E+XG4gKiBAc2VlIGh0dHA6Ly9naXRodWIuY29tL2dhcnljb3VydC91cmktanNcbiAqL1xuLyoqXG4gKiBDb3B5cmlnaHQgMjAxMSBHYXJ5IENvdXJ0LiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sIGFyZVxuICogcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKlxuICogICAgMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzIGxpc3Qgb2ZcbiAqICAgICAgIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqXG4gKiAgICAyLiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXMgbGlzdFxuICogICAgICAgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlciBtYXRlcmlhbHNcbiAqICAgICAgIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIEdBUlkgQ09VUlQgYGBBUyBJUycnIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEXG4gKiBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgR0FSWSBDT1VSVCBPUlxuICogQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1JcbiAqIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1JcbiAqIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT05cbiAqIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkdcbiAqIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRlxuICogQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKlxuICogVGhlIHZpZXdzIGFuZCBjb25jbHVzaW9ucyBjb250YWluZWQgaW4gdGhlIHNvZnR3YXJlIGFuZCBkb2N1bWVudGF0aW9uIGFyZSB0aG9zZSBvZiB0aGVcbiAqIGF1dGhvcnMgYW5kIHNob3VsZCBub3QgYmUgaW50ZXJwcmV0ZWQgYXMgcmVwcmVzZW50aW5nIG9mZmljaWFsIHBvbGljaWVzLCBlaXRoZXIgZXhwcmVzc2VkXG4gKiBvciBpbXBsaWVkLCBvZiBHYXJ5IENvdXJ0LlxuICovXG52YXIgU0NIRU1FUyA9IHt9O1xuZnVuY3Rpb24gcGN0RW5jQ2hhcihjaHIpIHtcbiAgICB2YXIgYyA9IGNoci5jaGFyQ29kZUF0KDApO1xuICAgIHZhciBlID0gdm9pZCAwO1xuICAgIGlmIChjIDwgMTYpIGUgPSBcIiUwXCIgKyBjLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO2Vsc2UgaWYgKGMgPCAxMjgpIGUgPSBcIiVcIiArIGMudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7ZWxzZSBpZiAoYyA8IDIwNDgpIGUgPSBcIiVcIiArIChjID4+IDYgfCAxOTIpLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpICsgXCIlXCIgKyAoYyAmIDYzIHwgMTI4KS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtlbHNlIGUgPSBcIiVcIiArIChjID4+IDEyIHwgMjI0KS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSArIFwiJVwiICsgKGMgPj4gNiAmIDYzIHwgMTI4KS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSArIFwiJVwiICsgKGMgJiA2MyB8IDEyOCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG4gICAgcmV0dXJuIGU7XG59XG5mdW5jdGlvbiBwY3REZWNDaGFycyhzdHIpIHtcbiAgICB2YXIgbmV3U3RyID0gXCJcIjtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGlsID0gc3RyLmxlbmd0aDtcbiAgICB3aGlsZSAoaSA8IGlsKSB7XG4gICAgICAgIHZhciBjID0gcGFyc2VJbnQoc3RyLnN1YnN0cihpICsgMSwgMiksIDE2KTtcbiAgICAgICAgaWYgKGMgPCAxMjgpIHtcbiAgICAgICAgICAgIG5ld1N0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpO1xuICAgICAgICAgICAgaSArPSAzO1xuICAgICAgICB9IGVsc2UgaWYgKGMgPj0gMTk0ICYmIGMgPCAyMjQpIHtcbiAgICAgICAgICAgIGlmIChpbCAtIGkgPj0gNikge1xuICAgICAgICAgICAgICAgIHZhciBjMiA9IHBhcnNlSW50KHN0ci5zdWJzdHIoaSArIDQsIDIpLCAxNik7XG4gICAgICAgICAgICAgICAgbmV3U3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGMgJiAzMSkgPDwgNiB8IGMyICYgNjMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdTdHIgKz0gc3RyLnN1YnN0cihpLCA2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkgKz0gNjtcbiAgICAgICAgfSBlbHNlIGlmIChjID49IDIyNCkge1xuICAgICAgICAgICAgaWYgKGlsIC0gaSA+PSA5KSB7XG4gICAgICAgICAgICAgICAgdmFyIF9jID0gcGFyc2VJbnQoc3RyLnN1YnN0cihpICsgNCwgMiksIDE2KTtcbiAgICAgICAgICAgICAgICB2YXIgYzMgPSBwYXJzZUludChzdHIuc3Vic3RyKGkgKyA3LCAyKSwgMTYpO1xuICAgICAgICAgICAgICAgIG5ld1N0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChjICYgMTUpIDw8IDEyIHwgKF9jICYgNjMpIDw8IDYgfCBjMyAmIDYzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3U3RyICs9IHN0ci5zdWJzdHIoaSwgOSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpICs9IDk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdTdHIgKz0gc3RyLnN1YnN0cihpLCAzKTtcbiAgICAgICAgICAgIGkgKz0gMztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3U3RyO1xufVxuZnVuY3Rpb24gX25vcm1hbGl6ZUNvbXBvbmVudEVuY29kaW5nKGNvbXBvbmVudHMsIHByb3RvY29sKSB7XG4gICAgZnVuY3Rpb24gZGVjb2RlVW5yZXNlcnZlZChzdHIpIHtcbiAgICAgICAgdmFyIGRlY1N0ciA9IHBjdERlY0NoYXJzKHN0cik7XG4gICAgICAgIHJldHVybiAhZGVjU3RyLm1hdGNoKHByb3RvY29sLlVOUkVTRVJWRUQpID8gc3RyIDogZGVjU3RyO1xuICAgIH1cbiAgICBpZiAoY29tcG9uZW50cy5zY2hlbWUpIGNvbXBvbmVudHMuc2NoZW1lID0gU3RyaW5nKGNvbXBvbmVudHMuc2NoZW1lKS5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCBkZWNvZGVVbnJlc2VydmVkKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UocHJvdG9jb2wuTk9UX1NDSEVNRSwgXCJcIik7XG4gICAgaWYgKGNvbXBvbmVudHMudXNlcmluZm8gIT09IHVuZGVmaW5lZCkgY29tcG9uZW50cy51c2VyaW5mbyA9IFN0cmluZyhjb21wb25lbnRzLnVzZXJpbmZvKS5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCBkZWNvZGVVbnJlc2VydmVkKS5yZXBsYWNlKHByb3RvY29sLk5PVF9VU0VSSU5GTywgcGN0RW5jQ2hhcikucmVwbGFjZShwcm90b2NvbC5QQ1RfRU5DT0RFRCwgdG9VcHBlckNhc2UpO1xuICAgIGlmIChjb21wb25lbnRzLmhvc3QgIT09IHVuZGVmaW5lZCkgY29tcG9uZW50cy5ob3N0ID0gU3RyaW5nKGNvbXBvbmVudHMuaG9zdCkucmVwbGFjZShwcm90b2NvbC5QQ1RfRU5DT0RFRCwgZGVjb2RlVW5yZXNlcnZlZCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKHByb3RvY29sLk5PVF9IT1NULCBwY3RFbmNDaGFyKS5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCB0b1VwcGVyQ2FzZSk7XG4gICAgaWYgKGNvbXBvbmVudHMucGF0aCAhPT0gdW5kZWZpbmVkKSBjb21wb25lbnRzLnBhdGggPSBTdHJpbmcoY29tcG9uZW50cy5wYXRoKS5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCBkZWNvZGVVbnJlc2VydmVkKS5yZXBsYWNlKGNvbXBvbmVudHMuc2NoZW1lID8gcHJvdG9jb2wuTk9UX1BBVEggOiBwcm90b2NvbC5OT1RfUEFUSF9OT1NDSEVNRSwgcGN0RW5jQ2hhcikucmVwbGFjZShwcm90b2NvbC5QQ1RfRU5DT0RFRCwgdG9VcHBlckNhc2UpO1xuICAgIGlmIChjb21wb25lbnRzLnF1ZXJ5ICE9PSB1bmRlZmluZWQpIGNvbXBvbmVudHMucXVlcnkgPSBTdHJpbmcoY29tcG9uZW50cy5xdWVyeSkucmVwbGFjZShwcm90b2NvbC5QQ1RfRU5DT0RFRCwgZGVjb2RlVW5yZXNlcnZlZCkucmVwbGFjZShwcm90b2NvbC5OT1RfUVVFUlksIHBjdEVuY0NoYXIpLnJlcGxhY2UocHJvdG9jb2wuUENUX0VOQ09ERUQsIHRvVXBwZXJDYXNlKTtcbiAgICBpZiAoY29tcG9uZW50cy5mcmFnbWVudCAhPT0gdW5kZWZpbmVkKSBjb21wb25lbnRzLmZyYWdtZW50ID0gU3RyaW5nKGNvbXBvbmVudHMuZnJhZ21lbnQpLnJlcGxhY2UocHJvdG9jb2wuUENUX0VOQ09ERUQsIGRlY29kZVVucmVzZXJ2ZWQpLnJlcGxhY2UocHJvdG9jb2wuTk9UX0ZSQUdNRU5ULCBwY3RFbmNDaGFyKS5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCB0b1VwcGVyQ2FzZSk7XG4gICAgcmV0dXJuIGNvbXBvbmVudHM7XG59XG5cbmZ1bmN0aW9uIF9zdHJpcExlYWRpbmdaZXJvcyhzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL14wKiguKikvLCBcIiQxXCIpIHx8IFwiMFwiO1xufVxuZnVuY3Rpb24gX25vcm1hbGl6ZUlQdjQoaG9zdCwgcHJvdG9jb2wpIHtcbiAgICB2YXIgbWF0Y2hlcyA9IGhvc3QubWF0Y2gocHJvdG9jb2wuSVBWNEFERFJFU1MpIHx8IFtdO1xuXG4gICAgdmFyIF9tYXRjaGVzID0gc2xpY2VkVG9BcnJheShtYXRjaGVzLCAyKSxcbiAgICAgICAgYWRkcmVzcyA9IF9tYXRjaGVzWzFdO1xuXG4gICAgaWYgKGFkZHJlc3MpIHtcbiAgICAgICAgcmV0dXJuIGFkZHJlc3Muc3BsaXQoXCIuXCIpLm1hcChfc3RyaXBMZWFkaW5nWmVyb3MpLmpvaW4oXCIuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBob3N0O1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9ub3JtYWxpemVJUHY2KGhvc3QsIHByb3RvY29sKSB7XG4gICAgdmFyIG1hdGNoZXMgPSBob3N0Lm1hdGNoKHByb3RvY29sLklQVjZBRERSRVNTKSB8fCBbXTtcblxuICAgIHZhciBfbWF0Y2hlczIgPSBzbGljZWRUb0FycmF5KG1hdGNoZXMsIDMpLFxuICAgICAgICBhZGRyZXNzID0gX21hdGNoZXMyWzFdLFxuICAgICAgICB6b25lID0gX21hdGNoZXMyWzJdO1xuXG4gICAgaWYgKGFkZHJlc3MpIHtcbiAgICAgICAgdmFyIF9hZGRyZXNzJHRvTG93ZXJDYXNlJCA9IGFkZHJlc3MudG9Mb3dlckNhc2UoKS5zcGxpdCgnOjonKS5yZXZlcnNlKCksXG4gICAgICAgICAgICBfYWRkcmVzcyR0b0xvd2VyQ2FzZSQyID0gc2xpY2VkVG9BcnJheShfYWRkcmVzcyR0b0xvd2VyQ2FzZSQsIDIpLFxuICAgICAgICAgICAgbGFzdCA9IF9hZGRyZXNzJHRvTG93ZXJDYXNlJDJbMF0sXG4gICAgICAgICAgICBmaXJzdCA9IF9hZGRyZXNzJHRvTG93ZXJDYXNlJDJbMV07XG5cbiAgICAgICAgdmFyIGZpcnN0RmllbGRzID0gZmlyc3QgPyBmaXJzdC5zcGxpdChcIjpcIikubWFwKF9zdHJpcExlYWRpbmdaZXJvcykgOiBbXTtcbiAgICAgICAgdmFyIGxhc3RGaWVsZHMgPSBsYXN0LnNwbGl0KFwiOlwiKS5tYXAoX3N0cmlwTGVhZGluZ1plcm9zKTtcbiAgICAgICAgdmFyIGlzTGFzdEZpZWxkSVB2NEFkZHJlc3MgPSBwcm90b2NvbC5JUFY0QUREUkVTUy50ZXN0KGxhc3RGaWVsZHNbbGFzdEZpZWxkcy5sZW5ndGggLSAxXSk7XG4gICAgICAgIHZhciBmaWVsZENvdW50ID0gaXNMYXN0RmllbGRJUHY0QWRkcmVzcyA/IDcgOiA4O1xuICAgICAgICB2YXIgbGFzdEZpZWxkc1N0YXJ0ID0gbGFzdEZpZWxkcy5sZW5ndGggLSBmaWVsZENvdW50O1xuICAgICAgICB2YXIgZmllbGRzID0gQXJyYXkoZmllbGRDb3VudCk7XG4gICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgZmllbGRDb3VudDsgKyt4KSB7XG4gICAgICAgICAgICBmaWVsZHNbeF0gPSBmaXJzdEZpZWxkc1t4XSB8fCBsYXN0RmllbGRzW2xhc3RGaWVsZHNTdGFydCArIHhdIHx8ICcnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0xhc3RGaWVsZElQdjRBZGRyZXNzKSB7XG4gICAgICAgICAgICBmaWVsZHNbZmllbGRDb3VudCAtIDFdID0gX25vcm1hbGl6ZUlQdjQoZmllbGRzW2ZpZWxkQ291bnQgLSAxXSwgcHJvdG9jb2wpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhbGxaZXJvRmllbGRzID0gZmllbGRzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmICghZmllbGQgfHwgZmllbGQgPT09IFwiMFwiKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhc3RMb25nZXN0ID0gYWNjW2FjYy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdExvbmdlc3QgJiYgbGFzdExvbmdlc3QuaW5kZXggKyBsYXN0TG9uZ2VzdC5sZW5ndGggPT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RMb25nZXN0Lmxlbmd0aCsrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYy5wdXNoKHsgaW5kZXg6IGluZGV4LCBsZW5ndGg6IDEgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwgW10pO1xuICAgICAgICB2YXIgbG9uZ2VzdFplcm9GaWVsZHMgPSBhbGxaZXJvRmllbGRzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoO1xuICAgICAgICB9KVswXTtcbiAgICAgICAgdmFyIG5ld0hvc3QgPSB2b2lkIDA7XG4gICAgICAgIGlmIChsb25nZXN0WmVyb0ZpZWxkcyAmJiBsb25nZXN0WmVyb0ZpZWxkcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB2YXIgbmV3Rmlyc3QgPSBmaWVsZHMuc2xpY2UoMCwgbG9uZ2VzdFplcm9GaWVsZHMuaW5kZXgpO1xuICAgICAgICAgICAgdmFyIG5ld0xhc3QgPSBmaWVsZHMuc2xpY2UobG9uZ2VzdFplcm9GaWVsZHMuaW5kZXggKyBsb25nZXN0WmVyb0ZpZWxkcy5sZW5ndGgpO1xuICAgICAgICAgICAgbmV3SG9zdCA9IG5ld0ZpcnN0LmpvaW4oXCI6XCIpICsgXCI6OlwiICsgbmV3TGFzdC5qb2luKFwiOlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0hvc3QgPSBmaWVsZHMuam9pbihcIjpcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHpvbmUpIHtcbiAgICAgICAgICAgIG5ld0hvc3QgKz0gXCIlXCIgKyB6b25lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdIb3N0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBob3N0O1xuICAgIH1cbn1cbnZhciBVUklfUEFSU0UgPSAvXig/OihbXjpcXC8/I10rKTopPyg/OlxcL1xcLygoPzooW15cXC8/I0BdKilAKT8oXFxbW15cXC8/I1xcXV0rXFxdfFteXFwvPyM6XSopKD86XFw6KFxcZCopKT8pKT8oW14/I10qKSg/OlxcPyhbXiNdKikpPyg/OiMoKD86LnxcXG58XFxyKSopKT8vaTtcbnZhciBOT19NQVRDSF9JU19VTkRFRklORUQgPSBcIlwiLm1hdGNoKC8oKXswfS8pWzFdID09PSB1bmRlZmluZWQ7XG5mdW5jdGlvbiBwYXJzZSh1cmlTdHJpbmcpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICB2YXIgY29tcG9uZW50cyA9IHt9O1xuICAgIHZhciBwcm90b2NvbCA9IG9wdGlvbnMuaXJpICE9PSBmYWxzZSA/IElSSV9QUk9UT0NPTCA6IFVSSV9QUk9UT0NPTDtcbiAgICBpZiAob3B0aW9ucy5yZWZlcmVuY2UgPT09IFwic3VmZml4XCIpIHVyaVN0cmluZyA9IChvcHRpb25zLnNjaGVtZSA/IG9wdGlvbnMuc2NoZW1lICsgXCI6XCIgOiBcIlwiKSArIFwiLy9cIiArIHVyaVN0cmluZztcbiAgICB2YXIgbWF0Y2hlcyA9IHVyaVN0cmluZy5tYXRjaChVUklfUEFSU0UpO1xuICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgIGlmIChOT19NQVRDSF9JU19VTkRFRklORUQpIHtcbiAgICAgICAgICAgIC8vc3RvcmUgZWFjaCBjb21wb25lbnRcbiAgICAgICAgICAgIGNvbXBvbmVudHMuc2NoZW1lID0gbWF0Y2hlc1sxXTtcbiAgICAgICAgICAgIGNvbXBvbmVudHMudXNlcmluZm8gPSBtYXRjaGVzWzNdO1xuICAgICAgICAgICAgY29tcG9uZW50cy5ob3N0ID0gbWF0Y2hlc1s0XTtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucG9ydCA9IHBhcnNlSW50KG1hdGNoZXNbNV0sIDEwKTtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucGF0aCA9IG1hdGNoZXNbNl0gfHwgXCJcIjtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucXVlcnkgPSBtYXRjaGVzWzddO1xuICAgICAgICAgICAgY29tcG9uZW50cy5mcmFnbWVudCA9IG1hdGNoZXNbOF07XG4gICAgICAgICAgICAvL2ZpeCBwb3J0IG51bWJlclxuICAgICAgICAgICAgaWYgKGlzTmFOKGNvbXBvbmVudHMucG9ydCkpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRzLnBvcnQgPSBtYXRjaGVzWzVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9JRSBGSVggZm9yIGltcHJvcGVyIFJlZ0V4cCBtYXRjaGluZ1xuICAgICAgICAgICAgLy9zdG9yZSBlYWNoIGNvbXBvbmVudFxuICAgICAgICAgICAgY29tcG9uZW50cy5zY2hlbWUgPSBtYXRjaGVzWzFdIHx8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbXBvbmVudHMudXNlcmluZm8gPSB1cmlTdHJpbmcuaW5kZXhPZihcIkBcIikgIT09IC0xID8gbWF0Y2hlc1szXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbXBvbmVudHMuaG9zdCA9IHVyaVN0cmluZy5pbmRleE9mKFwiLy9cIikgIT09IC0xID8gbWF0Y2hlc1s0XSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucG9ydCA9IHBhcnNlSW50KG1hdGNoZXNbNV0sIDEwKTtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucGF0aCA9IG1hdGNoZXNbNl0gfHwgXCJcIjtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucXVlcnkgPSB1cmlTdHJpbmcuaW5kZXhPZihcIj9cIikgIT09IC0xID8gbWF0Y2hlc1s3XSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbXBvbmVudHMuZnJhZ21lbnQgPSB1cmlTdHJpbmcuaW5kZXhPZihcIiNcIikgIT09IC0xID8gbWF0Y2hlc1s4XSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIC8vZml4IHBvcnQgbnVtYmVyXG4gICAgICAgICAgICBpZiAoaXNOYU4oY29tcG9uZW50cy5wb3J0KSkge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMucG9ydCA9IHVyaVN0cmluZy5tYXRjaCgvXFwvXFwvKD86LnxcXG4pKlxcOig/OlxcL3xcXD98XFwjfCQpLykgPyBtYXRjaGVzWzRdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjb21wb25lbnRzLmhvc3QpIHtcbiAgICAgICAgICAgIC8vbm9ybWFsaXplIElQIGhvc3RzXG4gICAgICAgICAgICBjb21wb25lbnRzLmhvc3QgPSBfbm9ybWFsaXplSVB2Nihfbm9ybWFsaXplSVB2NChjb21wb25lbnRzLmhvc3QsIHByb3RvY29sKSwgcHJvdG9jb2wpO1xuICAgICAgICB9XG4gICAgICAgIC8vZGV0ZXJtaW5lIHJlZmVyZW5jZSB0eXBlXG4gICAgICAgIGlmIChjb21wb25lbnRzLnNjaGVtZSA9PT0gdW5kZWZpbmVkICYmIGNvbXBvbmVudHMudXNlcmluZm8gPT09IHVuZGVmaW5lZCAmJiBjb21wb25lbnRzLmhvc3QgPT09IHVuZGVmaW5lZCAmJiBjb21wb25lbnRzLnBvcnQgPT09IHVuZGVmaW5lZCAmJiAhY29tcG9uZW50cy5wYXRoICYmIGNvbXBvbmVudHMucXVlcnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29tcG9uZW50cy5yZWZlcmVuY2UgPSBcInNhbWUtZG9jdW1lbnRcIjtcbiAgICAgICAgfSBlbHNlIGlmIChjb21wb25lbnRzLnNjaGVtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLnJlZmVyZW5jZSA9IFwicmVsYXRpdmVcIjtcbiAgICAgICAgfSBlbHNlIGlmIChjb21wb25lbnRzLmZyYWdtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucmVmZXJlbmNlID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29tcG9uZW50cy5yZWZlcmVuY2UgPSBcInVyaVwiO1xuICAgICAgICB9XG4gICAgICAgIC8vY2hlY2sgZm9yIHJlZmVyZW5jZSBlcnJvcnNcbiAgICAgICAgaWYgKG9wdGlvbnMucmVmZXJlbmNlICYmIG9wdGlvbnMucmVmZXJlbmNlICE9PSBcInN1ZmZpeFwiICYmIG9wdGlvbnMucmVmZXJlbmNlICE9PSBjb21wb25lbnRzLnJlZmVyZW5jZSkge1xuICAgICAgICAgICAgY29tcG9uZW50cy5lcnJvciA9IGNvbXBvbmVudHMuZXJyb3IgfHwgXCJVUkkgaXMgbm90IGEgXCIgKyBvcHRpb25zLnJlZmVyZW5jZSArIFwiIHJlZmVyZW5jZS5cIjtcbiAgICAgICAgfVxuICAgICAgICAvL2ZpbmQgc2NoZW1lIGhhbmRsZXJcbiAgICAgICAgdmFyIHNjaGVtZUhhbmRsZXIgPSBTQ0hFTUVTWyhvcHRpb25zLnNjaGVtZSB8fCBjb21wb25lbnRzLnNjaGVtZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgLy9jaGVjayBpZiBzY2hlbWUgY2FuJ3QgaGFuZGxlIElSSXNcbiAgICAgICAgaWYgKCFvcHRpb25zLnVuaWNvZGVTdXBwb3J0ICYmICghc2NoZW1lSGFuZGxlciB8fCAhc2NoZW1lSGFuZGxlci51bmljb2RlU3VwcG9ydCkpIHtcbiAgICAgICAgICAgIC8vaWYgaG9zdCBjb21wb25lbnQgaXMgYSBkb21haW4gbmFtZVxuICAgICAgICAgICAgaWYgKGNvbXBvbmVudHMuaG9zdCAmJiAob3B0aW9ucy5kb21haW5Ib3N0IHx8IHNjaGVtZUhhbmRsZXIgJiYgc2NoZW1lSGFuZGxlci5kb21haW5Ib3N0KSkge1xuICAgICAgICAgICAgICAgIC8vY29udmVydCBVbmljb2RlIElETiAtPiBBU0NJSSBJRE5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzLmhvc3QgPSBwdW55Y29kZS50b0FTQ0lJKGNvbXBvbmVudHMuaG9zdC5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCBwY3REZWNDaGFycykudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzLmVycm9yID0gY29tcG9uZW50cy5lcnJvciB8fCBcIkhvc3QncyBkb21haW4gbmFtZSBjYW4gbm90IGJlIGNvbnZlcnRlZCB0byBBU0NJSSB2aWEgcHVueWNvZGU6IFwiICsgZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2NvbnZlcnQgSVJJIC0+IFVSSVxuICAgICAgICAgICAgX25vcm1hbGl6ZUNvbXBvbmVudEVuY29kaW5nKGNvbXBvbmVudHMsIFVSSV9QUk9UT0NPTCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL25vcm1hbGl6ZSBlbmNvZGluZ3NcbiAgICAgICAgICAgIF9ub3JtYWxpemVDb21wb25lbnRFbmNvZGluZyhjb21wb25lbnRzLCBwcm90b2NvbCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9wZXJmb3JtIHNjaGVtZSBzcGVjaWZpYyBwYXJzaW5nXG4gICAgICAgIGlmIChzY2hlbWVIYW5kbGVyICYmIHNjaGVtZUhhbmRsZXIucGFyc2UpIHtcbiAgICAgICAgICAgIHNjaGVtZUhhbmRsZXIucGFyc2UoY29tcG9uZW50cywgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBjb21wb25lbnRzLmVycm9yID0gY29tcG9uZW50cy5lcnJvciB8fCBcIlVSSSBjYW4gbm90IGJlIHBhcnNlZC5cIjtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudHM7XG59XG5cbmZ1bmN0aW9uIF9yZWNvbXBvc2VBdXRob3JpdHkoY29tcG9uZW50cywgb3B0aW9ucykge1xuICAgIHZhciBwcm90b2NvbCA9IG9wdGlvbnMuaXJpICE9PSBmYWxzZSA/IElSSV9QUk9UT0NPTCA6IFVSSV9QUk9UT0NPTDtcbiAgICB2YXIgdXJpVG9rZW5zID0gW107XG4gICAgaWYgKGNvbXBvbmVudHMudXNlcmluZm8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB1cmlUb2tlbnMucHVzaChjb21wb25lbnRzLnVzZXJpbmZvKTtcbiAgICAgICAgdXJpVG9rZW5zLnB1c2goXCJAXCIpO1xuICAgIH1cbiAgICBpZiAoY29tcG9uZW50cy5ob3N0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy9ub3JtYWxpemUgSVAgaG9zdHMsIGFkZCBicmFja2V0cyBhbmQgZXNjYXBlIHpvbmUgc2VwYXJhdG9yIGZvciBJUHY2XG4gICAgICAgIHVyaVRva2Vucy5wdXNoKF9ub3JtYWxpemVJUHY2KF9ub3JtYWxpemVJUHY0KFN0cmluZyhjb21wb25lbnRzLmhvc3QpLCBwcm90b2NvbCksIHByb3RvY29sKS5yZXBsYWNlKHByb3RvY29sLklQVjZBRERSRVNTLCBmdW5jdGlvbiAoXywgJDEsICQyKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJbXCIgKyAkMSArICgkMiA/IFwiJTI1XCIgKyAkMiA6IFwiXCIpICsgXCJdXCI7XG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjb21wb25lbnRzLnBvcnQgPT09IFwibnVtYmVyXCIgfHwgdHlwZW9mIGNvbXBvbmVudHMucG9ydCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB1cmlUb2tlbnMucHVzaChcIjpcIik7XG4gICAgICAgIHVyaVRva2Vucy5wdXNoKFN0cmluZyhjb21wb25lbnRzLnBvcnQpKTtcbiAgICB9XG4gICAgcmV0dXJuIHVyaVRva2Vucy5sZW5ndGggPyB1cmlUb2tlbnMuam9pbihcIlwiKSA6IHVuZGVmaW5lZDtcbn1cblxudmFyIFJEUzEgPSAvXlxcLlxcLj9cXC8vO1xudmFyIFJEUzIgPSAvXlxcL1xcLihcXC98JCkvO1xudmFyIFJEUzMgPSAvXlxcL1xcLlxcLihcXC98JCkvO1xudmFyIFJEUzUgPSAvXlxcLz8oPzoufFxcbikqPyg/PVxcL3wkKS87XG5mdW5jdGlvbiByZW1vdmVEb3RTZWdtZW50cyhpbnB1dCkge1xuICAgIHZhciBvdXRwdXQgPSBbXTtcbiAgICB3aGlsZSAoaW5wdXQubGVuZ3RoKSB7XG4gICAgICAgIGlmIChpbnB1dC5tYXRjaChSRFMxKSkge1xuICAgICAgICAgICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKFJEUzEsIFwiXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0Lm1hdGNoKFJEUzIpKSB7XG4gICAgICAgICAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoUkRTMiwgXCIvXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0Lm1hdGNoKFJEUzMpKSB7XG4gICAgICAgICAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoUkRTMywgXCIvXCIpO1xuICAgICAgICAgICAgb3V0cHV0LnBvcCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0ID09PSBcIi5cIiB8fCBpbnB1dCA9PT0gXCIuLlwiKSB7XG4gICAgICAgICAgICBpbnB1dCA9IFwiXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgaW0gPSBpbnB1dC5tYXRjaChSRFM1KTtcbiAgICAgICAgICAgIGlmIChpbSkge1xuICAgICAgICAgICAgICAgIHZhciBzID0gaW1bMF07XG4gICAgICAgICAgICAgICAgaW5wdXQgPSBpbnB1dC5zbGljZShzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgb3V0cHV0LnB1c2gocyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgZG90IHNlZ21lbnQgY29uZGl0aW9uXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQuam9pbihcIlwiKTtcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplKGNvbXBvbmVudHMpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICB2YXIgcHJvdG9jb2wgPSBvcHRpb25zLmlyaSA/IElSSV9QUk9UT0NPTCA6IFVSSV9QUk9UT0NPTDtcbiAgICB2YXIgdXJpVG9rZW5zID0gW107XG4gICAgLy9maW5kIHNjaGVtZSBoYW5kbGVyXG4gICAgdmFyIHNjaGVtZUhhbmRsZXIgPSBTQ0hFTUVTWyhvcHRpb25zLnNjaGVtZSB8fCBjb21wb25lbnRzLnNjaGVtZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpXTtcbiAgICAvL3BlcmZvcm0gc2NoZW1lIHNwZWNpZmljIHNlcmlhbGl6YXRpb25cbiAgICBpZiAoc2NoZW1lSGFuZGxlciAmJiBzY2hlbWVIYW5kbGVyLnNlcmlhbGl6ZSkgc2NoZW1lSGFuZGxlci5zZXJpYWxpemUoY29tcG9uZW50cywgb3B0aW9ucyk7XG4gICAgaWYgKGNvbXBvbmVudHMuaG9zdCkge1xuICAgICAgICAvL2lmIGhvc3QgY29tcG9uZW50IGlzIGFuIElQdjYgYWRkcmVzc1xuICAgICAgICBpZiAocHJvdG9jb2wuSVBWNkFERFJFU1MudGVzdChjb21wb25lbnRzLmhvc3QpKSB7fVxuICAgICAgICAvL1RPRE86IG5vcm1hbGl6ZSBJUHY2IGFkZHJlc3MgYXMgcGVyIFJGQyA1OTUyXG5cbiAgICAgICAgLy9pZiBob3N0IGNvbXBvbmVudCBpcyBhIGRvbWFpbiBuYW1lXG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbnMuZG9tYWluSG9zdCB8fCBzY2hlbWVIYW5kbGVyICYmIHNjaGVtZUhhbmRsZXIuZG9tYWluSG9zdCkge1xuICAgICAgICAgICAgICAgIC8vY29udmVydCBJRE4gdmlhIHB1bnljb2RlXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50cy5ob3N0ID0gIW9wdGlvbnMuaXJpID8gcHVueWNvZGUudG9BU0NJSShjb21wb25lbnRzLmhvc3QucmVwbGFjZShwcm90b2NvbC5QQ1RfRU5DT0RFRCwgcGN0RGVjQ2hhcnMpLnRvTG93ZXJDYXNlKCkpIDogcHVueWNvZGUudG9Vbmljb2RlKGNvbXBvbmVudHMuaG9zdCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzLmVycm9yID0gY29tcG9uZW50cy5lcnJvciB8fCBcIkhvc3QncyBkb21haW4gbmFtZSBjYW4gbm90IGJlIGNvbnZlcnRlZCB0byBcIiArICghb3B0aW9ucy5pcmkgPyBcIkFTQ0lJXCIgOiBcIlVuaWNvZGVcIikgKyBcIiB2aWEgcHVueWNvZGU6IFwiICsgZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgfVxuICAgIC8vbm9ybWFsaXplIGVuY29kaW5nXG4gICAgX25vcm1hbGl6ZUNvbXBvbmVudEVuY29kaW5nKGNvbXBvbmVudHMsIHByb3RvY29sKTtcbiAgICBpZiAob3B0aW9ucy5yZWZlcmVuY2UgIT09IFwic3VmZml4XCIgJiYgY29tcG9uZW50cy5zY2hlbWUpIHtcbiAgICAgICAgdXJpVG9rZW5zLnB1c2goY29tcG9uZW50cy5zY2hlbWUpO1xuICAgICAgICB1cmlUb2tlbnMucHVzaChcIjpcIik7XG4gICAgfVxuICAgIHZhciBhdXRob3JpdHkgPSBfcmVjb21wb3NlQXV0aG9yaXR5KGNvbXBvbmVudHMsIG9wdGlvbnMpO1xuICAgIGlmIChhdXRob3JpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAob3B0aW9ucy5yZWZlcmVuY2UgIT09IFwic3VmZml4XCIpIHtcbiAgICAgICAgICAgIHVyaVRva2Vucy5wdXNoKFwiLy9cIik7XG4gICAgICAgIH1cbiAgICAgICAgdXJpVG9rZW5zLnB1c2goYXV0aG9yaXR5KTtcbiAgICAgICAgaWYgKGNvbXBvbmVudHMucGF0aCAmJiBjb21wb25lbnRzLnBhdGguY2hhckF0KDApICE9PSBcIi9cIikge1xuICAgICAgICAgICAgdXJpVG9rZW5zLnB1c2goXCIvXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjb21wb25lbnRzLnBhdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgcyA9IGNvbXBvbmVudHMucGF0aDtcbiAgICAgICAgaWYgKCFvcHRpb25zLmFic29sdXRlUGF0aCAmJiAoIXNjaGVtZUhhbmRsZXIgfHwgIXNjaGVtZUhhbmRsZXIuYWJzb2x1dGVQYXRoKSkge1xuICAgICAgICAgICAgcyA9IHJlbW92ZURvdFNlZ21lbnRzKHMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhdXRob3JpdHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcyA9IHMucmVwbGFjZSgvXlxcL1xcLy8sIFwiLyUyRlwiKTsgLy9kb24ndCBhbGxvdyB0aGUgcGF0aCB0byBzdGFydCB3aXRoIFwiLy9cIlxuICAgICAgICB9XG4gICAgICAgIHVyaVRva2Vucy5wdXNoKHMpO1xuICAgIH1cbiAgICBpZiAoY29tcG9uZW50cy5xdWVyeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHVyaVRva2Vucy5wdXNoKFwiP1wiKTtcbiAgICAgICAgdXJpVG9rZW5zLnB1c2goY29tcG9uZW50cy5xdWVyeSk7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnRzLmZyYWdtZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdXJpVG9rZW5zLnB1c2goXCIjXCIpO1xuICAgICAgICB1cmlUb2tlbnMucHVzaChjb21wb25lbnRzLmZyYWdtZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHVyaVRva2Vucy5qb2luKFwiXCIpOyAvL21lcmdlIHRva2VucyBpbnRvIGEgc3RyaW5nXG59XG5cbmZ1bmN0aW9uIHJlc29sdmVDb21wb25lbnRzKGJhc2UsIHJlbGF0aXZlKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgIHZhciBza2lwTm9ybWFsaXphdGlvbiA9IGFyZ3VtZW50c1szXTtcblxuICAgIHZhciB0YXJnZXQgPSB7fTtcbiAgICBpZiAoIXNraXBOb3JtYWxpemF0aW9uKSB7XG4gICAgICAgIGJhc2UgPSBwYXJzZShzZXJpYWxpemUoYmFzZSwgb3B0aW9ucyksIG9wdGlvbnMpOyAvL25vcm1hbGl6ZSBiYXNlIGNvbXBvbmVudHNcbiAgICAgICAgcmVsYXRpdmUgPSBwYXJzZShzZXJpYWxpemUocmVsYXRpdmUsIG9wdGlvbnMpLCBvcHRpb25zKTsgLy9ub3JtYWxpemUgcmVsYXRpdmUgY29tcG9uZW50c1xuICAgIH1cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAoIW9wdGlvbnMudG9sZXJhbnQgJiYgcmVsYXRpdmUuc2NoZW1lKSB7XG4gICAgICAgIHRhcmdldC5zY2hlbWUgPSByZWxhdGl2ZS5zY2hlbWU7XG4gICAgICAgIC8vdGFyZ2V0LmF1dGhvcml0eSA9IHJlbGF0aXZlLmF1dGhvcml0eTtcbiAgICAgICAgdGFyZ2V0LnVzZXJpbmZvID0gcmVsYXRpdmUudXNlcmluZm87XG4gICAgICAgIHRhcmdldC5ob3N0ID0gcmVsYXRpdmUuaG9zdDtcbiAgICAgICAgdGFyZ2V0LnBvcnQgPSByZWxhdGl2ZS5wb3J0O1xuICAgICAgICB0YXJnZXQucGF0aCA9IHJlbW92ZURvdFNlZ21lbnRzKHJlbGF0aXZlLnBhdGggfHwgXCJcIik7XG4gICAgICAgIHRhcmdldC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChyZWxhdGl2ZS51c2VyaW5mbyAhPT0gdW5kZWZpbmVkIHx8IHJlbGF0aXZlLmhvc3QgIT09IHVuZGVmaW5lZCB8fCByZWxhdGl2ZS5wb3J0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vdGFyZ2V0LmF1dGhvcml0eSA9IHJlbGF0aXZlLmF1dGhvcml0eTtcbiAgICAgICAgICAgIHRhcmdldC51c2VyaW5mbyA9IHJlbGF0aXZlLnVzZXJpbmZvO1xuICAgICAgICAgICAgdGFyZ2V0Lmhvc3QgPSByZWxhdGl2ZS5ob3N0O1xuICAgICAgICAgICAgdGFyZ2V0LnBvcnQgPSByZWxhdGl2ZS5wb3J0O1xuICAgICAgICAgICAgdGFyZ2V0LnBhdGggPSByZW1vdmVEb3RTZWdtZW50cyhyZWxhdGl2ZS5wYXRoIHx8IFwiXCIpO1xuICAgICAgICAgICAgdGFyZ2V0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXJlbGF0aXZlLnBhdGgpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQucGF0aCA9IGJhc2UucGF0aDtcbiAgICAgICAgICAgICAgICBpZiAocmVsYXRpdmUucXVlcnkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucXVlcnkgPSBiYXNlLnF1ZXJ5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlbGF0aXZlLnBhdGguY2hhckF0KDApID09PSBcIi9cIikge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucGF0aCA9IHJlbW92ZURvdFNlZ21lbnRzKHJlbGF0aXZlLnBhdGgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoYmFzZS51c2VyaW5mbyAhPT0gdW5kZWZpbmVkIHx8IGJhc2UuaG9zdCAhPT0gdW5kZWZpbmVkIHx8IGJhc2UucG9ydCAhPT0gdW5kZWZpbmVkKSAmJiAhYmFzZS5wYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQucGF0aCA9IFwiL1wiICsgcmVsYXRpdmUucGF0aDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghYmFzZS5wYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQucGF0aCA9IHJlbGF0aXZlLnBhdGg7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQucGF0aCA9IGJhc2UucGF0aC5zbGljZSgwLCBiYXNlLnBhdGgubGFzdEluZGV4T2YoXCIvXCIpICsgMSkgKyByZWxhdGl2ZS5wYXRoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5wYXRoID0gcmVtb3ZlRG90U2VnbWVudHModGFyZ2V0LnBhdGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0YXJnZXQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vdGFyZ2V0LmF1dGhvcml0eSA9IGJhc2UuYXV0aG9yaXR5O1xuICAgICAgICAgICAgdGFyZ2V0LnVzZXJpbmZvID0gYmFzZS51c2VyaW5mbztcbiAgICAgICAgICAgIHRhcmdldC5ob3N0ID0gYmFzZS5ob3N0O1xuICAgICAgICAgICAgdGFyZ2V0LnBvcnQgPSBiYXNlLnBvcnQ7XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0LnNjaGVtZSA9IGJhc2Uuc2NoZW1lO1xuICAgIH1cbiAgICB0YXJnZXQuZnJhZ21lbnQgPSByZWxhdGl2ZS5mcmFnbWVudDtcbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlKGJhc2VVUkksIHJlbGF0aXZlVVJJLCBvcHRpb25zKSB7XG4gICAgdmFyIHNjaGVtZWxlc3NPcHRpb25zID0gYXNzaWduKHsgc2NoZW1lOiAnbnVsbCcgfSwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHNlcmlhbGl6ZShyZXNvbHZlQ29tcG9uZW50cyhwYXJzZShiYXNlVVJJLCBzY2hlbWVsZXNzT3B0aW9ucyksIHBhcnNlKHJlbGF0aXZlVVJJLCBzY2hlbWVsZXNzT3B0aW9ucyksIHNjaGVtZWxlc3NPcHRpb25zLCB0cnVlKSwgc2NoZW1lbGVzc09wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemUodXJpLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiB1cmkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdXJpID0gc2VyaWFsaXplKHBhcnNlKHVyaSwgb3B0aW9ucyksIG9wdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAodHlwZU9mKHVyaSkgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdXJpID0gcGFyc2Uoc2VyaWFsaXplKHVyaSwgb3B0aW9ucyksIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gdXJpO1xufVxuXG5mdW5jdGlvbiBlcXVhbCh1cmlBLCB1cmlCLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiB1cmlBID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHVyaUEgPSBzZXJpYWxpemUocGFyc2UodXJpQSwgb3B0aW9ucyksIG9wdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAodHlwZU9mKHVyaUEpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHVyaUEgPSBzZXJpYWxpemUodXJpQSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdXJpQiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB1cmlCID0gc2VyaWFsaXplKHBhcnNlKHVyaUIsIG9wdGlvbnMpLCBvcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVPZih1cmlCKSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB1cmlCID0gc2VyaWFsaXplKHVyaUIsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gdXJpQSA9PT0gdXJpQjtcbn1cblxuZnVuY3Rpb24gZXNjYXBlQ29tcG9uZW50KHN0ciwgb3B0aW9ucykge1xuICAgIHJldHVybiBzdHIgJiYgc3RyLnRvU3RyaW5nKCkucmVwbGFjZSghb3B0aW9ucyB8fCAhb3B0aW9ucy5pcmkgPyBVUklfUFJPVE9DT0wuRVNDQVBFIDogSVJJX1BST1RPQ09MLkVTQ0FQRSwgcGN0RW5jQ2hhcik7XG59XG5cbmZ1bmN0aW9uIHVuZXNjYXBlQ29tcG9uZW50KHN0ciwgb3B0aW9ucykge1xuICAgIHJldHVybiBzdHIgJiYgc3RyLnRvU3RyaW5nKCkucmVwbGFjZSghb3B0aW9ucyB8fCAhb3B0aW9ucy5pcmkgPyBVUklfUFJPVE9DT0wuUENUX0VOQ09ERUQgOiBJUklfUFJPVE9DT0wuUENUX0VOQ09ERUQsIHBjdERlY0NoYXJzKTtcbn1cblxudmFyIGhhbmRsZXIgPSB7XG4gICAgc2NoZW1lOiBcImh0dHBcIixcbiAgICBkb21haW5Ib3N0OiB0cnVlLFxuICAgIHBhcnNlOiBmdW5jdGlvbiBwYXJzZShjb21wb25lbnRzLCBvcHRpb25zKSB7XG4gICAgICAgIC8vcmVwb3J0IG1pc3NpbmcgaG9zdFxuICAgICAgICBpZiAoIWNvbXBvbmVudHMuaG9zdCkge1xuICAgICAgICAgICAgY29tcG9uZW50cy5lcnJvciA9IGNvbXBvbmVudHMuZXJyb3IgfHwgXCJIVFRQIFVSSXMgbXVzdCBoYXZlIGEgaG9zdC5cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tcG9uZW50cztcbiAgICB9LFxuICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gc2VyaWFsaXplKGNvbXBvbmVudHMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHNlY3VyZSA9IFN0cmluZyhjb21wb25lbnRzLnNjaGVtZSkudG9Mb3dlckNhc2UoKSA9PT0gXCJodHRwc1wiO1xuICAgICAgICAvL25vcm1hbGl6ZSB0aGUgZGVmYXVsdCBwb3J0XG4gICAgICAgIGlmIChjb21wb25lbnRzLnBvcnQgPT09IChzZWN1cmUgPyA0NDMgOiA4MCkgfHwgY29tcG9uZW50cy5wb3J0ID09PSBcIlwiKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLnBvcnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy9ub3JtYWxpemUgdGhlIGVtcHR5IHBhdGhcbiAgICAgICAgaWYgKCFjb21wb25lbnRzLnBhdGgpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucGF0aCA9IFwiL1wiO1xuICAgICAgICB9XG4gICAgICAgIC8vTk9URTogV2UgZG8gbm90IHBhcnNlIHF1ZXJ5IHN0cmluZ3MgZm9yIEhUVFAgVVJJc1xuICAgICAgICAvL2FzIFdXVyBGb3JtIFVybCBFbmNvZGVkIHF1ZXJ5IHN0cmluZ3MgYXJlIHBhcnQgb2YgdGhlIEhUTUw0KyBzcGVjLFxuICAgICAgICAvL2FuZCBub3QgdGhlIEhUVFAgc3BlYy5cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudHM7XG4gICAgfVxufTtcblxudmFyIGhhbmRsZXIkMSA9IHtcbiAgICBzY2hlbWU6IFwiaHR0cHNcIixcbiAgICBkb21haW5Ib3N0OiBoYW5kbGVyLmRvbWFpbkhvc3QsXG4gICAgcGFyc2U6IGhhbmRsZXIucGFyc2UsXG4gICAgc2VyaWFsaXplOiBoYW5kbGVyLnNlcmlhbGl6ZVxufTtcblxuZnVuY3Rpb24gaXNTZWN1cmUod3NDb21wb25lbnRzKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3c0NvbXBvbmVudHMuc2VjdXJlID09PSAnYm9vbGVhbicgPyB3c0NvbXBvbmVudHMuc2VjdXJlIDogU3RyaW5nKHdzQ29tcG9uZW50cy5zY2hlbWUpLnRvTG93ZXJDYXNlKCkgPT09IFwid3NzXCI7XG59XG4vL1JGQyA2NDU1XG52YXIgaGFuZGxlciQyID0ge1xuICAgIHNjaGVtZTogXCJ3c1wiLFxuICAgIGRvbWFpbkhvc3Q6IHRydWUsXG4gICAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlKGNvbXBvbmVudHMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHdzQ29tcG9uZW50cyA9IGNvbXBvbmVudHM7XG4gICAgICAgIC8vaW5kaWNhdGUgaWYgdGhlIHNlY3VyZSBmbGFnIGlzIHNldFxuICAgICAgICB3c0NvbXBvbmVudHMuc2VjdXJlID0gaXNTZWN1cmUod3NDb21wb25lbnRzKTtcbiAgICAgICAgLy9jb25zdHJ1Y3QgcmVzb3VjZSBuYW1lXG4gICAgICAgIHdzQ29tcG9uZW50cy5yZXNvdXJjZU5hbWUgPSAod3NDb21wb25lbnRzLnBhdGggfHwgJy8nKSArICh3c0NvbXBvbmVudHMucXVlcnkgPyAnPycgKyB3c0NvbXBvbmVudHMucXVlcnkgOiAnJyk7XG4gICAgICAgIHdzQ29tcG9uZW50cy5wYXRoID0gdW5kZWZpbmVkO1xuICAgICAgICB3c0NvbXBvbmVudHMucXVlcnkgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiB3c0NvbXBvbmVudHM7XG4gICAgfSxcbiAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIHNlcmlhbGl6ZSh3c0NvbXBvbmVudHMsIG9wdGlvbnMpIHtcbiAgICAgICAgLy9ub3JtYWxpemUgdGhlIGRlZmF1bHQgcG9ydFxuICAgICAgICBpZiAod3NDb21wb25lbnRzLnBvcnQgPT09IChpc1NlY3VyZSh3c0NvbXBvbmVudHMpID8gNDQzIDogODApIHx8IHdzQ29tcG9uZW50cy5wb3J0ID09PSBcIlwiKSB7XG4gICAgICAgICAgICB3c0NvbXBvbmVudHMucG9ydCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvL2Vuc3VyZSBzY2hlbWUgbWF0Y2hlcyBzZWN1cmUgZmxhZ1xuICAgICAgICBpZiAodHlwZW9mIHdzQ29tcG9uZW50cy5zZWN1cmUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgd3NDb21wb25lbnRzLnNjaGVtZSA9IHdzQ29tcG9uZW50cy5zZWN1cmUgPyAnd3NzJyA6ICd3cyc7XG4gICAgICAgICAgICB3c0NvbXBvbmVudHMuc2VjdXJlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vcmVjb25zdHJ1Y3QgcGF0aCBmcm9tIHJlc291cmNlIG5hbWVcbiAgICAgICAgaWYgKHdzQ29tcG9uZW50cy5yZXNvdXJjZU5hbWUpIHtcbiAgICAgICAgICAgIHZhciBfd3NDb21wb25lbnRzJHJlc291cmMgPSB3c0NvbXBvbmVudHMucmVzb3VyY2VOYW1lLnNwbGl0KCc/JyksXG4gICAgICAgICAgICAgICAgX3dzQ29tcG9uZW50cyRyZXNvdXJjMiA9IHNsaWNlZFRvQXJyYXkoX3dzQ29tcG9uZW50cyRyZXNvdXJjLCAyKSxcbiAgICAgICAgICAgICAgICBwYXRoID0gX3dzQ29tcG9uZW50cyRyZXNvdXJjMlswXSxcbiAgICAgICAgICAgICAgICBxdWVyeSA9IF93c0NvbXBvbmVudHMkcmVzb3VyYzJbMV07XG5cbiAgICAgICAgICAgIHdzQ29tcG9uZW50cy5wYXRoID0gcGF0aCAmJiBwYXRoICE9PSAnLycgPyBwYXRoIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgd3NDb21wb25lbnRzLnF1ZXJ5ID0gcXVlcnk7XG4gICAgICAgICAgICB3c0NvbXBvbmVudHMucmVzb3VyY2VOYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vZm9yYmlkIGZyYWdtZW50IGNvbXBvbmVudFxuICAgICAgICB3c0NvbXBvbmVudHMuZnJhZ21lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiB3c0NvbXBvbmVudHM7XG4gICAgfVxufTtcblxudmFyIGhhbmRsZXIkMyA9IHtcbiAgICBzY2hlbWU6IFwid3NzXCIsXG4gICAgZG9tYWluSG9zdDogaGFuZGxlciQyLmRvbWFpbkhvc3QsXG4gICAgcGFyc2U6IGhhbmRsZXIkMi5wYXJzZSxcbiAgICBzZXJpYWxpemU6IGhhbmRsZXIkMi5zZXJpYWxpemVcbn07XG5cbnZhciBPID0ge307XG52YXIgaXNJUkkgPSB0cnVlO1xuLy9SRkMgMzk4NlxudmFyIFVOUkVTRVJWRUQkJCA9IFwiW0EtWmEtejAtOVxcXFwtXFxcXC5cXFxcX1xcXFx+XCIgKyAoaXNJUkkgPyBcIlxcXFx4QTAtXFxcXHUyMDBEXFxcXHUyMDEwLVxcXFx1MjAyOVxcXFx1MjAyRi1cXFxcdUQ3RkZcXFxcdUY5MDAtXFxcXHVGRENGXFxcXHVGREYwLVxcXFx1RkZFRlwiIDogXCJcIikgKyBcIl1cIjtcbnZhciBIRVhESUckJCA9IFwiWzAtOUEtRmEtZl1cIjsgLy9jYXNlLWluc2Vuc2l0aXZlXG52YXIgUENUX0VOQ09ERUQkID0gc3ViZXhwKHN1YmV4cChcIiVbRUZlZl1cIiArIEhFWERJRyQkICsgXCIlXCIgKyBIRVhESUckJCArIEhFWERJRyQkICsgXCIlXCIgKyBIRVhESUckJCArIEhFWERJRyQkKSArIFwifFwiICsgc3ViZXhwKFwiJVs4OUEtRmEtZl1cIiArIEhFWERJRyQkICsgXCIlXCIgKyBIRVhESUckJCArIEhFWERJRyQkKSArIFwifFwiICsgc3ViZXhwKFwiJVwiICsgSEVYRElHJCQgKyBIRVhESUckJCkpOyAvL2V4cGFuZGVkXG4vL1JGQyA1MzIyLCBleGNlcHQgdGhlc2Ugc3ltYm9scyBhcyBwZXIgUkZDIDYwNjg6IEAgOiAvID8gIyBbIF0gJiA7ID1cbi8vY29uc3QgQVRFWFQkJCA9IFwiW0EtWmEtejAtOVxcXFwhXFxcXCNcXFxcJFxcXFwlXFxcXCZcXFxcJ1xcXFwqXFxcXCtcXFxcLVxcXFwvXFxcXD1cXFxcP1xcXFxeXFxcXF9cXFxcYFxcXFx7XFxcXHxcXFxcfVxcXFx+XVwiO1xuLy9jb25zdCBXU1AkJCA9IFwiW1xcXFx4MjBcXFxceDA5XVwiO1xuLy9jb25zdCBPQlNfUVRFWFQkJCA9IFwiW1xcXFx4MDEtXFxcXHgwOFxcXFx4MEJcXFxceDBDXFxcXHgwRS1cXFxceDFGXFxcXHg3Rl1cIjsgIC8vKCVkMS04IC8gJWQxMS0xMiAvICVkMTQtMzEgLyAlZDEyNylcbi8vY29uc3QgUVRFWFQkJCA9IG1lcmdlKFwiW1xcXFx4MjFcXFxceDIzLVxcXFx4NUJcXFxceDVELVxcXFx4N0VdXCIsIE9CU19RVEVYVCQkKTsgIC8vJWQzMyAvICVkMzUtOTEgLyAlZDkzLTEyNiAvIG9icy1xdGV4dFxuLy9jb25zdCBWQ0hBUiQkID0gXCJbXFxcXHgyMS1cXFxceDdFXVwiO1xuLy9jb25zdCBXU1AkJCA9IFwiW1xcXFx4MjBcXFxceDA5XVwiO1xuLy9jb25zdCBPQlNfUVAkID0gc3ViZXhwKFwiXFxcXFxcXFxcIiArIG1lcmdlKFwiW1xcXFx4MDBcXFxceDBEXFxcXHgwQV1cIiwgT0JTX1FURVhUJCQpKTsgIC8vJWQwIC8gQ1IgLyBMRiAvIG9icy1xdGV4dFxuLy9jb25zdCBGV1MkID0gc3ViZXhwKHN1YmV4cChXU1AkJCArIFwiKlwiICsgXCJcXFxceDBEXFxcXHgwQVwiKSArIFwiP1wiICsgV1NQJCQgKyBcIitcIik7XG4vL2NvbnN0IFFVT1RFRF9QQUlSJCA9IHN1YmV4cChzdWJleHAoXCJcXFxcXFxcXFwiICsgc3ViZXhwKFZDSEFSJCQgKyBcInxcIiArIFdTUCQkKSkgKyBcInxcIiArIE9CU19RUCQpO1xuLy9jb25zdCBRVU9URURfU1RSSU5HJCA9IHN1YmV4cCgnXFxcXFwiJyArIHN1YmV4cChGV1MkICsgXCI/XCIgKyBRQ09OVEVOVCQpICsgXCIqXCIgKyBGV1MkICsgXCI/XCIgKyAnXFxcXFwiJyk7XG52YXIgQVRFWFQkJCA9IFwiW0EtWmEtejAtOVxcXFwhXFxcXCRcXFxcJVxcXFwnXFxcXCpcXFxcK1xcXFwtXFxcXF5cXFxcX1xcXFxgXFxcXHtcXFxcfFxcXFx9XFxcXH5dXCI7XG52YXIgUVRFWFQkJCA9IFwiW1xcXFwhXFxcXCRcXFxcJVxcXFwnXFxcXChcXFxcKVxcXFwqXFxcXCtcXFxcLFxcXFwtXFxcXC4wLTlcXFxcPFxcXFw+QS1aXFxcXHg1RS1cXFxceDdFXVwiO1xudmFyIFZDSEFSJCQgPSBtZXJnZShRVEVYVCQkLCBcIltcXFxcXFxcIlxcXFxcXFxcXVwiKTtcbnZhciBTT01FX0RFTElNUyQkID0gXCJbXFxcXCFcXFxcJFxcXFwnXFxcXChcXFxcKVxcXFwqXFxcXCtcXFxcLFxcXFw7XFxcXDpcXFxcQF1cIjtcbnZhciBVTlJFU0VSVkVEID0gbmV3IFJlZ0V4cChVTlJFU0VSVkVEJCQsIFwiZ1wiKTtcbnZhciBQQ1RfRU5DT0RFRCA9IG5ldyBSZWdFeHAoUENUX0VOQ09ERUQkLCBcImdcIik7XG52YXIgTk9UX0xPQ0FMX1BBUlQgPSBuZXcgUmVnRXhwKG1lcmdlKFwiW15dXCIsIEFURVhUJCQsIFwiW1xcXFwuXVwiLCAnW1xcXFxcIl0nLCBWQ0hBUiQkKSwgXCJnXCIpO1xudmFyIE5PVF9IRk5BTUUgPSBuZXcgUmVnRXhwKG1lcmdlKFwiW15dXCIsIFVOUkVTRVJWRUQkJCwgU09NRV9ERUxJTVMkJCksIFwiZ1wiKTtcbnZhciBOT1RfSEZWQUxVRSA9IE5PVF9IRk5BTUU7XG5mdW5jdGlvbiBkZWNvZGVVbnJlc2VydmVkKHN0cikge1xuICAgIHZhciBkZWNTdHIgPSBwY3REZWNDaGFycyhzdHIpO1xuICAgIHJldHVybiAhZGVjU3RyLm1hdGNoKFVOUkVTRVJWRUQpID8gc3RyIDogZGVjU3RyO1xufVxudmFyIGhhbmRsZXIkNCA9IHtcbiAgICBzY2hlbWU6IFwibWFpbHRvXCIsXG4gICAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlJCQxKGNvbXBvbmVudHMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIG1haWx0b0NvbXBvbmVudHMgPSBjb21wb25lbnRzO1xuICAgICAgICB2YXIgdG8gPSBtYWlsdG9Db21wb25lbnRzLnRvID0gbWFpbHRvQ29tcG9uZW50cy5wYXRoID8gbWFpbHRvQ29tcG9uZW50cy5wYXRoLnNwbGl0KFwiLFwiKSA6IFtdO1xuICAgICAgICBtYWlsdG9Db21wb25lbnRzLnBhdGggPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChtYWlsdG9Db21wb25lbnRzLnF1ZXJ5KSB7XG4gICAgICAgICAgICB2YXIgdW5rbm93bkhlYWRlcnMgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBoZWFkZXJzID0ge307XG4gICAgICAgICAgICB2YXIgaGZpZWxkcyA9IG1haWx0b0NvbXBvbmVudHMucXVlcnkuc3BsaXQoXCImXCIpO1xuICAgICAgICAgICAgZm9yICh2YXIgeCA9IDAsIHhsID0gaGZpZWxkcy5sZW5ndGg7IHggPCB4bDsgKyt4KSB7XG4gICAgICAgICAgICAgICAgdmFyIGhmaWVsZCA9IGhmaWVsZHNbeF0uc3BsaXQoXCI9XCIpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoaGZpZWxkWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0b1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRvQWRkcnMgPSBoZmllbGRbMV0uc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX3ggPSAwLCBfeGwgPSB0b0FkZHJzLmxlbmd0aDsgX3ggPCBfeGw7ICsrX3gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0by5wdXNoKHRvQWRkcnNbX3hdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwic3ViamVjdFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbHRvQ29tcG9uZW50cy5zdWJqZWN0ID0gdW5lc2NhcGVDb21wb25lbnQoaGZpZWxkWzFdLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYm9keVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbHRvQ29tcG9uZW50cy5ib2R5ID0gdW5lc2NhcGVDb21wb25lbnQoaGZpZWxkWzFdLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgdW5rbm93bkhlYWRlcnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1t1bmVzY2FwZUNvbXBvbmVudChoZmllbGRbMF0sIG9wdGlvbnMpXSA9IHVuZXNjYXBlQ29tcG9uZW50KGhmaWVsZFsxXSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodW5rbm93bkhlYWRlcnMpIG1haWx0b0NvbXBvbmVudHMuaGVhZGVycyA9IGhlYWRlcnM7XG4gICAgICAgIH1cbiAgICAgICAgbWFpbHRvQ29tcG9uZW50cy5xdWVyeSA9IHVuZGVmaW5lZDtcbiAgICAgICAgZm9yICh2YXIgX3gyID0gMCwgX3hsMiA9IHRvLmxlbmd0aDsgX3gyIDwgX3hsMjsgKytfeDIpIHtcbiAgICAgICAgICAgIHZhciBhZGRyID0gdG9bX3gyXS5zcGxpdChcIkBcIik7XG4gICAgICAgICAgICBhZGRyWzBdID0gdW5lc2NhcGVDb21wb25lbnQoYWRkclswXSk7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMudW5pY29kZVN1cHBvcnQpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnZlcnQgVW5pY29kZSBJRE4gLT4gQVNDSUkgSUROXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgYWRkclsxXSA9IHB1bnljb2RlLnRvQVNDSUkodW5lc2NhcGVDb21wb25lbnQoYWRkclsxXSwgb3B0aW9ucykudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBtYWlsdG9Db21wb25lbnRzLmVycm9yID0gbWFpbHRvQ29tcG9uZW50cy5lcnJvciB8fCBcIkVtYWlsIGFkZHJlc3MncyBkb21haW4gbmFtZSBjYW4gbm90IGJlIGNvbnZlcnRlZCB0byBBU0NJSSB2aWEgcHVueWNvZGU6IFwiICsgZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFkZHJbMV0gPSB1bmVzY2FwZUNvbXBvbmVudChhZGRyWzFdLCBvcHRpb25zKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9bX3gyXSA9IGFkZHIuam9pbihcIkBcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1haWx0b0NvbXBvbmVudHM7XG4gICAgfSxcbiAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIHNlcmlhbGl6ZSQkMShtYWlsdG9Db21wb25lbnRzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBjb21wb25lbnRzID0gbWFpbHRvQ29tcG9uZW50cztcbiAgICAgICAgdmFyIHRvID0gdG9BcnJheShtYWlsdG9Db21wb25lbnRzLnRvKTtcbiAgICAgICAgaWYgKHRvKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gMCwgeGwgPSB0by5sZW5ndGg7IHggPCB4bDsgKyt4KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRvQWRkciA9IFN0cmluZyh0b1t4XSk7XG4gICAgICAgICAgICAgICAgdmFyIGF0SWR4ID0gdG9BZGRyLmxhc3RJbmRleE9mKFwiQFwiKTtcbiAgICAgICAgICAgICAgICB2YXIgbG9jYWxQYXJ0ID0gdG9BZGRyLnNsaWNlKDAsIGF0SWR4KS5yZXBsYWNlKFBDVF9FTkNPREVELCBkZWNvZGVVbnJlc2VydmVkKS5yZXBsYWNlKFBDVF9FTkNPREVELCB0b1VwcGVyQ2FzZSkucmVwbGFjZShOT1RfTE9DQUxfUEFSVCwgcGN0RW5jQ2hhcik7XG4gICAgICAgICAgICAgICAgdmFyIGRvbWFpbiA9IHRvQWRkci5zbGljZShhdElkeCArIDEpO1xuICAgICAgICAgICAgICAgIC8vY29udmVydCBJRE4gdmlhIHB1bnljb2RlXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluID0gIW9wdGlvbnMuaXJpID8gcHVueWNvZGUudG9BU0NJSSh1bmVzY2FwZUNvbXBvbmVudChkb21haW4sIG9wdGlvbnMpLnRvTG93ZXJDYXNlKCkpIDogcHVueWNvZGUudG9Vbmljb2RlKGRvbWFpbik7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzLmVycm9yID0gY29tcG9uZW50cy5lcnJvciB8fCBcIkVtYWlsIGFkZHJlc3MncyBkb21haW4gbmFtZSBjYW4gbm90IGJlIGNvbnZlcnRlZCB0byBcIiArICghb3B0aW9ucy5pcmkgPyBcIkFTQ0lJXCIgOiBcIlVuaWNvZGVcIikgKyBcIiB2aWEgcHVueWNvZGU6IFwiICsgZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG9beF0gPSBsb2NhbFBhcnQgKyBcIkBcIiArIGRvbWFpbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbXBvbmVudHMucGF0aCA9IHRvLmpvaW4oXCIsXCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoZWFkZXJzID0gbWFpbHRvQ29tcG9uZW50cy5oZWFkZXJzID0gbWFpbHRvQ29tcG9uZW50cy5oZWFkZXJzIHx8IHt9O1xuICAgICAgICBpZiAobWFpbHRvQ29tcG9uZW50cy5zdWJqZWN0KSBoZWFkZXJzW1wic3ViamVjdFwiXSA9IG1haWx0b0NvbXBvbmVudHMuc3ViamVjdDtcbiAgICAgICAgaWYgKG1haWx0b0NvbXBvbmVudHMuYm9keSkgaGVhZGVyc1tcImJvZHlcIl0gPSBtYWlsdG9Db21wb25lbnRzLmJvZHk7XG4gICAgICAgIHZhciBmaWVsZHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBoZWFkZXJzKSB7XG4gICAgICAgICAgICBpZiAoaGVhZGVyc1tuYW1lXSAhPT0gT1tuYW1lXSkge1xuICAgICAgICAgICAgICAgIGZpZWxkcy5wdXNoKG5hbWUucmVwbGFjZShQQ1RfRU5DT0RFRCwgZGVjb2RlVW5yZXNlcnZlZCkucmVwbGFjZShQQ1RfRU5DT0RFRCwgdG9VcHBlckNhc2UpLnJlcGxhY2UoTk9UX0hGTkFNRSwgcGN0RW5jQ2hhcikgKyBcIj1cIiArIGhlYWRlcnNbbmFtZV0ucmVwbGFjZShQQ1RfRU5DT0RFRCwgZGVjb2RlVW5yZXNlcnZlZCkucmVwbGFjZShQQ1RfRU5DT0RFRCwgdG9VcHBlckNhc2UpLnJlcGxhY2UoTk9UX0hGVkFMVUUsIHBjdEVuY0NoYXIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29tcG9uZW50cy5xdWVyeSA9IGZpZWxkcy5qb2luKFwiJlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tcG9uZW50cztcbiAgICB9XG59O1xuXG52YXIgVVJOX1BBUlNFID0gL14oW15cXDpdKylcXDooLiopLztcbi8vUkZDIDIxNDFcbnZhciBoYW5kbGVyJDUgPSB7XG4gICAgc2NoZW1lOiBcInVyblwiLFxuICAgIHBhcnNlOiBmdW5jdGlvbiBwYXJzZSQkMShjb21wb25lbnRzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBtYXRjaGVzID0gY29tcG9uZW50cy5wYXRoICYmIGNvbXBvbmVudHMucGF0aC5tYXRjaChVUk5fUEFSU0UpO1xuICAgICAgICB2YXIgdXJuQ29tcG9uZW50cyA9IGNvbXBvbmVudHM7XG4gICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgICB2YXIgc2NoZW1lID0gb3B0aW9ucy5zY2hlbWUgfHwgdXJuQ29tcG9uZW50cy5zY2hlbWUgfHwgXCJ1cm5cIjtcbiAgICAgICAgICAgIHZhciBuaWQgPSBtYXRjaGVzWzFdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB2YXIgbnNzID0gbWF0Y2hlc1syXTtcbiAgICAgICAgICAgIHZhciB1cm5TY2hlbWUgPSBzY2hlbWUgKyBcIjpcIiArIChvcHRpb25zLm5pZCB8fCBuaWQpO1xuICAgICAgICAgICAgdmFyIHNjaGVtZUhhbmRsZXIgPSBTQ0hFTUVTW3VyblNjaGVtZV07XG4gICAgICAgICAgICB1cm5Db21wb25lbnRzLm5pZCA9IG5pZDtcbiAgICAgICAgICAgIHVybkNvbXBvbmVudHMubnNzID0gbnNzO1xuICAgICAgICAgICAgdXJuQ29tcG9uZW50cy5wYXRoID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKHNjaGVtZUhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICB1cm5Db21wb25lbnRzID0gc2NoZW1lSGFuZGxlci5wYXJzZSh1cm5Db21wb25lbnRzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVybkNvbXBvbmVudHMuZXJyb3IgPSB1cm5Db21wb25lbnRzLmVycm9yIHx8IFwiVVJOIGNhbiBub3QgYmUgcGFyc2VkLlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cm5Db21wb25lbnRzO1xuICAgIH0sXG4gICAgc2VyaWFsaXplOiBmdW5jdGlvbiBzZXJpYWxpemUkJDEodXJuQ29tcG9uZW50cywgb3B0aW9ucykge1xuICAgICAgICB2YXIgc2NoZW1lID0gb3B0aW9ucy5zY2hlbWUgfHwgdXJuQ29tcG9uZW50cy5zY2hlbWUgfHwgXCJ1cm5cIjtcbiAgICAgICAgdmFyIG5pZCA9IHVybkNvbXBvbmVudHMubmlkO1xuICAgICAgICB2YXIgdXJuU2NoZW1lID0gc2NoZW1lICsgXCI6XCIgKyAob3B0aW9ucy5uaWQgfHwgbmlkKTtcbiAgICAgICAgdmFyIHNjaGVtZUhhbmRsZXIgPSBTQ0hFTUVTW3VyblNjaGVtZV07XG4gICAgICAgIGlmIChzY2hlbWVIYW5kbGVyKSB7XG4gICAgICAgICAgICB1cm5Db21wb25lbnRzID0gc2NoZW1lSGFuZGxlci5zZXJpYWxpemUodXJuQ29tcG9uZW50cywgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHVyaUNvbXBvbmVudHMgPSB1cm5Db21wb25lbnRzO1xuICAgICAgICB2YXIgbnNzID0gdXJuQ29tcG9uZW50cy5uc3M7XG4gICAgICAgIHVyaUNvbXBvbmVudHMucGF0aCA9IChuaWQgfHwgb3B0aW9ucy5uaWQpICsgXCI6XCIgKyBuc3M7XG4gICAgICAgIHJldHVybiB1cmlDb21wb25lbnRzO1xuICAgIH1cbn07XG5cbnZhciBVVUlEID0gL15bMC05QS1GYS1mXXs4fSg/OlxcLVswLTlBLUZhLWZdezR9KXszfVxcLVswLTlBLUZhLWZdezEyfSQvO1xuLy9SRkMgNDEyMlxudmFyIGhhbmRsZXIkNiA9IHtcbiAgICBzY2hlbWU6IFwidXJuOnV1aWRcIixcbiAgICBwYXJzZTogZnVuY3Rpb24gcGFyc2UodXJuQ29tcG9uZW50cywgb3B0aW9ucykge1xuICAgICAgICB2YXIgdXVpZENvbXBvbmVudHMgPSB1cm5Db21wb25lbnRzO1xuICAgICAgICB1dWlkQ29tcG9uZW50cy51dWlkID0gdXVpZENvbXBvbmVudHMubnNzO1xuICAgICAgICB1dWlkQ29tcG9uZW50cy5uc3MgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghb3B0aW9ucy50b2xlcmFudCAmJiAoIXV1aWRDb21wb25lbnRzLnV1aWQgfHwgIXV1aWRDb21wb25lbnRzLnV1aWQubWF0Y2goVVVJRCkpKSB7XG4gICAgICAgICAgICB1dWlkQ29tcG9uZW50cy5lcnJvciA9IHV1aWRDb21wb25lbnRzLmVycm9yIHx8IFwiVVVJRCBpcyBub3QgdmFsaWQuXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHV1aWRDb21wb25lbnRzO1xuICAgIH0sXG4gICAgc2VyaWFsaXplOiBmdW5jdGlvbiBzZXJpYWxpemUodXVpZENvbXBvbmVudHMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHVybkNvbXBvbmVudHMgPSB1dWlkQ29tcG9uZW50cztcbiAgICAgICAgLy9ub3JtYWxpemUgVVVJRFxuICAgICAgICB1cm5Db21wb25lbnRzLm5zcyA9ICh1dWlkQ29tcG9uZW50cy51dWlkIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiB1cm5Db21wb25lbnRzO1xuICAgIH1cbn07XG5cblNDSEVNRVNbaGFuZGxlci5zY2hlbWVdID0gaGFuZGxlcjtcblNDSEVNRVNbaGFuZGxlciQxLnNjaGVtZV0gPSBoYW5kbGVyJDE7XG5TQ0hFTUVTW2hhbmRsZXIkMi5zY2hlbWVdID0gaGFuZGxlciQyO1xuU0NIRU1FU1toYW5kbGVyJDMuc2NoZW1lXSA9IGhhbmRsZXIkMztcblNDSEVNRVNbaGFuZGxlciQ0LnNjaGVtZV0gPSBoYW5kbGVyJDQ7XG5TQ0hFTUVTW2hhbmRsZXIkNS5zY2hlbWVdID0gaGFuZGxlciQ1O1xuU0NIRU1FU1toYW5kbGVyJDYuc2NoZW1lXSA9IGhhbmRsZXIkNjtcblxuZXhwb3J0cy5TQ0hFTUVTID0gU0NIRU1FUztcbmV4cG9ydHMucGN0RW5jQ2hhciA9IHBjdEVuY0NoYXI7XG5leHBvcnRzLnBjdERlY0NoYXJzID0gcGN0RGVjQ2hhcnM7XG5leHBvcnRzLnBhcnNlID0gcGFyc2U7XG5leHBvcnRzLnJlbW92ZURvdFNlZ21lbnRzID0gcmVtb3ZlRG90U2VnbWVudHM7XG5leHBvcnRzLnNlcmlhbGl6ZSA9IHNlcmlhbGl6ZTtcbmV4cG9ydHMucmVzb2x2ZUNvbXBvbmVudHMgPSByZXNvbHZlQ29tcG9uZW50cztcbmV4cG9ydHMucmVzb2x2ZSA9IHJlc29sdmU7XG5leHBvcnRzLm5vcm1hbGl6ZSA9IG5vcm1hbGl6ZTtcbmV4cG9ydHMuZXF1YWwgPSBlcXVhbDtcbmV4cG9ydHMuZXNjYXBlQ29tcG9uZW50ID0gZXNjYXBlQ29tcG9uZW50O1xuZXhwb3J0cy51bmVzY2FwZUNvbXBvbmVudCA9IHVuZXNjYXBlQ29tcG9uZW50O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG59KSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXJpLmFsbC5qcy5tYXBcbiJdfQ==
