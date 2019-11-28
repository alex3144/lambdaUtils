"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.schemaFactory = (param) => ({
    type: 'object',
    additionalProperties: false,
    required: lodash_1.map(param.requiredProperties, (_, key) => key),
    properties: Object.assign(Object.assign({}, param.optionalProperties), param.requiredProperties),
});
exports.inputSchemaFactory = (param) => ({
    inputSchema: {
        type: 'object',
        required: ['body'],
        properties: {
            body: param.schema || exports.schemaFactory(param),
        },
    },
});
//# sourceMappingURL=inputSchemaFactory.js.map