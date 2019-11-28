import awsSdk from 'aws-sdk';

export const sdkFactory = (config, service, options?) => {
  awsSdk.config = new awsSdk.Config();
  awsSdk.config.accessKeyId = config.AWS_KEY;
  awsSdk.config.secretAccessKey = config.AWS_SECRET;
  awsSdk.config.region = config.AWS_REGION;
  if (service === 'cognito') {
    return new awsSdk.CognitoIdentityServiceProvider();
  }
  if (service === 'lambda') {
    const endpoint = process.env.NODE_ENV === 'local' ? { endpoint: 'http://localhost:3000' } : {};

    return new awsSdk.Lambda(endpoint);
  }
  if (service === 's3') {
    return new awsSdk.S3(options);
  }
  if (service === 'ses') {
    return new awsSdk.SES(options);
  }
};
