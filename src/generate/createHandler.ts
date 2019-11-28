// We centralize handler creation here to be able to apply middlewares to all functions at once
import { Handler } from 'aws-lambda';
import { jsonBodyParser, doNotWaitForEmptyEventLoop } from 'middy/middlewares';
import { errorHandler } from './errorHandler';
import middy from 'middy';

export const createHandler = (handler): Handler => middy(handler)
  .use(jsonBodyParser())
  .use(doNotWaitForEmptyEventLoop())
  .use(errorHandler)