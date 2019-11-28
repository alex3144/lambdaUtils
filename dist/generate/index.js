"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = require("./validate");
const createHandler_1 = require("./createHandler");
const getArgs_1 = require("./getArgs");
const compose = (...functions) => args => functions.reduceRight((arg, fn) => fn(arg), args);
exports.generate = ({ schema, params, fn }) => compose(createHandler_1.createHandler, getArgs_1.getArgs(params), validate_1.validate(schema))(fn);
//# sourceMappingURL=index.js.map