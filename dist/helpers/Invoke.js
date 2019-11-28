"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const sdk_1 = require("../sdk");
exports.invoke = (config, method, params, project, stage) => __awaiter(void 0, void 0, void 0, function* () {
    const lambda = sdk_1.sdkFactory(config, 'lambda');
    // force claims if needed
    const requestContext = params.clientId ? {
        authorizer: {
            claims: {
                client_id: params.clientId,
            },
        },
    } : {};
    return new Promise((resolve, reject) => {
        lambda.invoke({
            FunctionName: `${project}-${stage}-${method}`,
            Payload: JSON.stringify({
                body: lodash_1.omit(params, 'clientId'),
                requestContext,
            }),
            InvocationType: 'RequestResponse',
            LogType: 'Tail',
        }, (error, data) => {
            if (error) {
                return reject(error);
            }
            if (data.Payload) {
                if (+JSON.parse(data.Payload).statusCode >= 400) {
                    return reject(JSON.parse(data.Payload));
                }
                const response = JSON.parse(data.Payload);
                return resolve(response);
            }
        });
    });
});
//# sourceMappingURL=Invoke.js.map