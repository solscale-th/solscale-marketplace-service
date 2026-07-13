import { isNil } from 'lodash'

import { ResponseMessage } from './constant'

const { Error } = ResponseMessage

type BuildResponseInput = {
  success: boolean
  data?: unknown
  message: string
  code?: string
}

type BuildResponseOutput = {
  /*eslint-disable-next-line*/
  data: any
  status: {
    code: string
    message?: string | null
    error?: string | null
  }
}

export const buildResponse = ({ success, data, message, code }: BuildResponseInput): BuildResponseOutput => {
  if (success) {
    return {
      data,
      status: {
        code: '200',
        message,
        error: null,
      }
    }
  } else {
    if (!isNil(code)) {
      return {
        data,
        status: {
          code,
          error: message,
          message: null,
        },
      }
    } else {
      return {
        data: null,
        status: {
          code: '500',
          error: Error.Internal,
          message: null,
        }
      }
    }
  }
}
