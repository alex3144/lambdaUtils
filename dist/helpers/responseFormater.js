"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnFormater = ({ statusCode = 200, data = undefined, }) => {
    const ret = { statusCode, body: null };
    if (data !== undefined) {
        ret.body = JSON.stringify(data);
    }
    return ret;
};
exports.errorFactory = ({ statusCode, message, errorCode, }) => ({ data = undefined } = {}) => exports.returnFormater({
    statusCode,
    data: {
        message,
        errorCode,
        data,
    },
});
//# sourceMappingURL=responseFormater.js.map