export declare function invoke({ config, method, params, project, stage }: {
    config: any;
    method: any;
    params: any;
    project: any;
    stage: any;
}): Promise<unknown>;
export declare function generate({ schema, params, fn }: {
    schema: any;
    params: any;
    fn: any;
}): import("aws-lambda").Handler<any, any>;
export declare function formatLambdaReturn({ statusCode, data }: {
    statusCode: any;
    data: any;
}): {
    statusCode: number;
    body: any;
};
export declare function createLambdaError({ statusCode, message, errorCode }: {
    statusCode: any;
    message: any;
    errorCode: any;
}): ({ data }?: {
    data?: any;
}) => {
    statusCode: number;
    body: any;
};
export declare function schemaFactory(params: any): import("json-schema").JSONSchema4;
export declare function inputSchemaFactory(params: any): {
    inputSchema: import("json-schema").JSONSchema4;
};
