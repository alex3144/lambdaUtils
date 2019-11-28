export declare const returnFormater: ({ statusCode, data, }: {
    statusCode?: number;
    data?: any;
}) => {
    statusCode: number;
    body: any;
};
export declare const errorFactory: ({ statusCode, message, errorCode, }: {
    statusCode: any;
    message: any;
    errorCode: any;
}) => ({ data }?: {
    data?: any;
}) => {
    statusCode: number;
    body: any;
};
