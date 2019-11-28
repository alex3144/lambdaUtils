"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
exports.sdkFactory = (config, service, options) => {
    aws_sdk_1.default.config = new aws_sdk_1.default.Config();
    aws_sdk_1.default.config.accessKeyId = config.AWS_KEY;
    aws_sdk_1.default.config.secretAccessKey = config.AWS_SECRET;
    aws_sdk_1.default.config.region = config.AWS_REGION;
    if (service === 'cognito') {
        return new aws_sdk_1.default.CognitoIdentityServiceProvider();
    }
    if (service === 'lambda') {
        const endpoint = process.env.NODE_ENV === 'local' ? { endpoint: 'http://localhost:3000' } : {};
        return new aws_sdk_1.default.Lambda(endpoint);
    }
    if (service === 's3') {
        return new aws_sdk_1.default.S3(options);
    }
    if (service === 'ses') {
        return new aws_sdk_1.default.SES(options);
    }
};
//# sourceMappingURL=index.js.map