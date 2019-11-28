"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const responseFormater_1 = require("../helpers/responseFormater");
const ErrorBadRequest = responseFormater_1.errorFactory({
    statusCode: 400,
    message: 'The request is invalid',
    errorCode: 10400,
});
const ajvInstance = new ajv_1.default({ allErrors: true });
exports.validate = (schema) => {
    let validator;
    if (schema)
        validator = ajvInstance.compile(schema);
    return (wrapped) => (arg) => {
        if (!schema)
            return wrapped(arg);
        const valid = validator(arg);
        if (!valid) {
            throw ErrorBadRequest({ data: validator.errors });
        }
        return wrapped(arg);
    };
};
//# sourceMappingURL=validate.js.map