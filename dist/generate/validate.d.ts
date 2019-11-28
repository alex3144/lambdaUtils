import { JSONSchema4 } from 'json-schema';
export declare const validate: (schema: JSONSchema4) => (wrapped: any) => (arg: any) => any;
