import { get } from 'lodash';

import { errorFactory } from '../helpers/responseFormater';

// the purpose of this handler is to catch JS errors, and explicit them to debug
// (should not be explicit in prod env)
export const ErrorInternal = errorFactory({
  statusCode: 500,
  message: 'there was an error in calling the server, it may come from a lambda timeout or another problem, contact the administrator fcom if it persists',
  errorCode: 40000,
});

export const errorHandler = {
  onError: (handler, next) => {
    // if it looks like an error from our API, we return it
    // it's similar to httpErrorHandler from middy, kindof
    const statusCode = get(handler, 'error.statusCode')
    const body = get(handler, 'error.body')
    // maybe there is a better way to determine if it's our error
    if (statusCode && (body || body === null)) {
      handler.response = handler.error;
      return next();
    }

    // else something we didn't handle occured, so go with an internal for now
    const response = ErrorInternal({ data: handler.error });
    console.log(handler.error)
    handler.response = response;
    return next();
  },
};
