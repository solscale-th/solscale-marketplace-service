import { GraphQLError } from 'graphql'
import { DatabaseError, UniqueConstraintError, ValidationError } from 'sequelize'

import { ResponseMessage } from '@/utils'
import { writeLog } from '@/utils'

export class CustomError extends Error {
  public code: string
  constructor(code: string, message: string) {
    super(message)
    this.name = 'CustomError'
    this.code = code
  }
}

export const formatError = (module: string, error: unknown, requestUUID: string): { code: string, message: string } => {
  if (error instanceof CustomError) {
    writeLog({ type: 'ERROR', relatedTask: module, requestUUID, message: error.message })
    return { code: error.code, message: error.message }
  } else if (error instanceof UniqueConstraintError) {
    writeLog({ type: 'ERROR', relatedTask: module, requestUUID, message: error.toString() })
    return { code: '409', message: ResponseMessage.Error.DuplicatedRecord }
  } else if (error instanceof ValidationError) {
    writeLog({ type: 'ERROR', relatedTask: module, requestUUID, message: error.errors?.[0]?.message || error.message })
    return { code: '400', message: error.errors?.[0]?.message || error.message }
  } else if (error instanceof DatabaseError) {
    writeLog({ type: 'ERROR', relatedTask: module, requestUUID, message: error.toString() })
    return { code: '400', message: error.toString() }
  } else if (error instanceof GraphQLError) {
    const ext = error.extensions as { code?: string, http?: { status?: number } } | undefined
    const status = ext?.http?.status
      ?? (ext?.code === 'FORBIDDEN' ? 403 : ext?.code === 'UNAUTHORIZED' ? 401 : 500)
    writeLog({ type: 'ERROR', relatedTask: module, requestUUID, message: error.message })
    return { code: String(status), message: error.message }
  } else if (error instanceof Error) {
    writeLog({ type: 'ERROR', relatedTask: module, requestUUID, message: error.toString() })
    return { code: '500', message: ResponseMessage.Error.Internal }
  } else {
    writeLog({ type: 'ERROR', relatedTask: module, requestUUID, message: String(error) })
    return { code: '500', message: ResponseMessage.Error.Internal }
  }
}
