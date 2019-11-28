"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const generateLambda = __importStar(require("./generate"));
const Invoke_1 = require("./helpers/Invoke");
const responseFormater_1 = require("./helpers/responseFormater");
function invoke({ config, method, params, project, stage }) {
    return Invoke_1.invoke(config, method, params, project, stage);
}
exports.invoke = invoke;
function generate({ schema, params, fn }) {
    return generateLambda.generate({ schema, params, fn });
}
exports.generate = generate;
function formatLambdaReturn({ statusCode, data }) {
    return responseFormater_1.returnFormater({ statusCode, data });
}
exports.formatLambdaReturn = formatLambdaReturn;
function createLambdaError({ statusCode, message, errorCode }) {
    return responseFormater_1.errorFactory({ statusCode, message, errorCode });
}
exports.createLambdaError = createLambdaError;
//# sourceMappingURL=index.js.map