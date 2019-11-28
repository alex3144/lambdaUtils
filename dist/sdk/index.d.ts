import awsSdk from 'aws-sdk';
export declare const sdkFactory: (config: any, service: any, options?: any) => awsSdk.CognitoIdentityServiceProvider | awsSdk.Lambda | awsSdk.S3 | awsSdk.SES;
