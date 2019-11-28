import { map } from 'lodash';
import { JSONSchema4 } from 'json-schema';

type schema = {
  schema: JSONSchema4;
}

type properties = {
  optionalProperties?: object;
  requiredProperties?: object;
}

type inputSchemaFactoryParamType = schema | properties
type inputSchemaFactoryReturnType = {
  inputSchema: JSONSchema4;
}

export const schemaFactory = (param: properties): JSONSchema4 => (
  {
    type: 'object',
    additionalProperties: false,
    required: map(param.requiredProperties, (_, key) => key),
    properties: {
      ...(param as properties).optionalProperties,
      ...(param as properties).requiredProperties,
    },
  }
);


export const inputSchemaFactory = (
  param: inputSchemaFactoryParamType,
): inputSchemaFactoryReturnType => ({
  inputSchema: {
    type: 'object',
    required: ['body'],
    properties: {
      body: (param as schema).schema || schemaFactory(param as properties),
    },
  },
});
