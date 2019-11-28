export declare const ErrorInternal: ({ data }?: {
    data?: any;
}) => {
    statusCode: number;
    body: any;
};
export declare const errorHandler: {
    onError: (handler: any, next: any) => any;
};
