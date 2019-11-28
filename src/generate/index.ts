import { Handler } from 'aws-lambda';
import { validate } from './validate';
import { createHandler } from './createHandler';
import { getArgs } from './getArgs';

const compose = (...functions) => args => functions.reduceRight((arg, fn) => fn(arg), args);

export const generate = ({ schema, params, fn }):Handler => compose(
    createHandler,
    getArgs(params),
    validate(schema),
)(fn)

