import { Handler } from 'aws-lambda';
export declare const generate: ({ schema, params, fn }: {
    schema: any;
    params: any;
    fn: any;
}) => Handler<any, any>;
