"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("middy/middlewares");
const errorHandler_1 = require("./errorHandler");
const middy_1 = __importDefault(require("middy"));
exports.createHandler = (handler) => middy_1.default(handler)
    .use(middlewares_1.jsonBodyParser())
    .use(middlewares_1.doNotWaitForEmptyEventLoop())
    .use(errorHandler_1.errorHandler);
//# sourceMappingURL=createHandler.js.map