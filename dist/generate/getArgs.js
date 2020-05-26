"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.getArgs = (params) => wrap => {
    return event => {
        if (!params)
            return wrap(event);
        let paramsCompile = {};
        lodash_1.forEach(params.bodyParams, (p) => {
            paramsCompile[p] = lodash_1.get(event, `body.${p}`);
        });
        lodash_1.forEach(params.contextParams, (p) => {
            paramsCompile[p] = lodash_1.get(event, `requestContext.authorizer.claims.${p}`);
        });
        return wrap(paramsCompile);
    };
};
//# sourceMappingURL=getArgs.js.map