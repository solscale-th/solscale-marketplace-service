import { isNil } from 'lodash'

import { ApplicationsPayload } from '@/generated/graphql'
import { ApplicationRepository, JobRepository } from '@/repositories'
import { buildResponse, CustomError, formatError, ResponseMessage } from '@/utils'
import { Context } from '@/utils/context'

const { Success, Error: ErrorMessage } = ResponseMessage

class ApplicationController {
  public static async myApplications(_: unknown, __: unknown, ctx: Context): Promise<ApplicationsPayload> {
    try {
      if (isNil(ctx.id) || ctx.type !== 'INFLUENCER')
        throw new CustomError('401', ErrorMessage.Unauthorized)

      const data = await ApplicationRepository.listByInfluencer(Number(ctx.id), 'application')
      return buildResponse({ success: true, data, message: Success.Query })
    } catch (err) {
      const { code, message } = formatError('myApplications', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }

  public static async myDirectInvites(_: unknown, __: unknown, ctx: Context): Promise<ApplicationsPayload> {
    try {
      if (isNil(ctx.id) || ctx.type !== 'INFLUENCER')
        throw new CustomError('401', ErrorMessage.Unauthorized)

      const data = await ApplicationRepository.listByInfluencer(Number(ctx.id), 'invite')
      return buildResponse({ success: true, data, message: Success.Query })
    } catch (err) {
      const { code, message } = formatError('myDirectInvites', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }
}

const queries = {
  Query: {
    myApplications: ApplicationController.myApplications,
    myDirectInvites: ApplicationController.myDirectInvites,
  },
  Application: {
    job: (parent: { jobId: number }) => JobRepository.findById(parent.jobId),
  },
}

export default queries
