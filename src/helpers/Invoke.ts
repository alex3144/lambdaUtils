import { omit } from 'lodash';

import { sdkFactory } from '../sdk';

export const invoke = async (config, method, params, project, stage) => {
  const lambda: any = sdkFactory(config, 'lambda');
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
        body: omit(params, 'clientId'),
        requestContext,
      }), // pass params
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
};
