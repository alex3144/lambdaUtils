import { JSONSchema4 } from 'json-schema';
declare type schema = {
    schema: JSONSchema4;
};
declare type properties = {
    optionalProperties?: object;
    requiredProperties?: object;
};
declare type inputSchemaFactoryParamType = schema | properties;
declare type inputSchemaFactoryReturnType = {
    inputSchema: JSONSchema4;
};
export declare const schemaFactory: (param: properties) => JSONSchema4;
export declare const inputSchemaFactory: (param: inputSchemaFactoryParamType) => inputSchemaFactoryReturnType;
export {};
