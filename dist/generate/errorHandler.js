"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const responseFormater_1 = require("../helpers/responseFormater");
// the purpose of this handler is to catch JS errors, and explicit them to debug
// (should not be explicit in prod env)
exports.ErrorInternal = responseFormater_1.errorFactory({
    statusCode: 500,
    message: 'there was an error in calling the server, it may come from a lambda timeout or another problem, contact the administrator fcom if it persists',
    errorCode: 40000,
});
exports.errorHandler = {
    onError: (handler, next) => {
        // if it looks like an error from our API, we return it
        // it's similar to httpErrorHandler from middy, kindof
        const statusCode = lodash_1.get(handler, 'error.statusCode');
        const body = lodash_1.get(handler, 'error.body');
        // maybe there is a better way to determine if it's our error
        if (statusCode && (body || body === null)) {
            handler.response = handler.error;
            return next();
        }
        // else something we didn't handle occured, so go with an internal for now
        const response = exports.ErrorInternal({ data: handler.error });
        console.log(handler.error);
        handler.response = response;
        return next();
    },
};
//# sourceMappingURL=errorHandler.js.map