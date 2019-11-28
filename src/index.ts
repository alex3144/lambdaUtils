import * as generateLambda from './generate'
import { invoke as Invoke } from './helpers/Invoke'
import { returnFormater, errorFactory } from './helpers/responseFormater'

export function invoke({config, method, params, project, stage}) {
    return Invoke(config, method, params, project, stage)
}

export function generate({ schema, params, fn }) {
    return generateLambda.generate({ schema, params, fn })
}

export function formatLambdaReturn({ statusCode, data}) {
    return returnFormater({ statusCode, data})
}

export function createLambdaError({ statusCode, message, errorCode}) {
    return errorFactory({ statusCode, message, errorCode})
}

