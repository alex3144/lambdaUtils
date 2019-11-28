import Ajv from 'ajv';
import { JSONSchema4 } from 'json-schema';

import { errorFactory } from '../helpers/responseFormater';

const ErrorBadRequest = errorFactory({
  statusCode: 400,
  message: 'The request is invalid',
  errorCode: 10400,
});

const ajvInstance = new Ajv({ allErrors: true });

export const validate = (schema: JSONSchema4) => {
  let validator; 
  if(schema) validator = ajvInstance.compile(schema);
  return (wrapped) => (arg) => {
    if(!schema) return wrapped(arg);
    const valid = validator(arg);

    if (!valid) {
      throw  ErrorBadRequest({ data: validator.errors });
    }

    return wrapped(arg);
  };
};