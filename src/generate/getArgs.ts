import { forEach, get } from 'lodash'

export const getArgs = (params) => wrap => {
    return event => {
      if(!params) return wrap(event)
      let paramsCompile = {}
      forEach(params.bodyParams, (p) => paramsCompile[p] = get(event, `body.${p}`))
      forEach(params.contextParams, (p) => paramsCompile[p] = get(event, `requestContext.authorizer.claims.${p}`))
      return wrap(paramsCompile)
    }
} 
