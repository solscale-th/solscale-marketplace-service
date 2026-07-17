import { isNil } from 'lodash'

import { EngagementPayload, EngagementsPayload, QueryEngagementArgs } from '@/generated/graphql'
import { EngagementRepository, JobRepository, SubmissionRepository } from '@/repositories'
import { buildResponse, CustomError, formatError, ResponseMessage } from '@/utils'
import { Context } from '@/utils/context'

const { Success, Error: ErrorMessage } = ResponseMessage

class EngagementController {
  public static async myEngagements(_: unknown, __: unknown, ctx: Context): Promise<EngagementsPayload> {
    try {
      if (isNil(ctx.id) || ctx.type !== 'INFLUENCER')
        throw new CustomError('401', ErrorMessage.Unauthorized)

      const data = await EngagementRepository.listByInfluencer(Number(ctx.id))
      return buildResponse({ success: true, data, message: Success.Query })
    } catch (err) {
      const { code, message } = formatError('myEngagements', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }

  public static async engagement(_: unknown, { id }: QueryEngagementArgs, ctx: Context): Promise<EngagementPayload> {
    try {
      if (isNil(ctx.id))
        throw new CustomError('401', ErrorMessage.Unauthorized)

      const data = await EngagementRepository.findById(id)
      if (isNil(data))
        throw new CustomError('404', ErrorMessage.NotFound)

      if (ctx.type === 'INFLUENCER') {
        if (data.influencerId !== Number(ctx.id))
          throw new CustomError('401', ErrorMessage.Unauthorized)
      } else if (ctx.type === 'ENTREPRENEUR') {
        const job = await JobRepository.findById(data.jobId)
        if (isNil(job) || job.entrepreneurId !== Number(ctx.id))
          throw new CustomError('401', ErrorMessage.Unauthorized)
      } else {
        throw new CustomError('401', ErrorMessage.Unauthorized)
      }

      return buildResponse({ success: true, data, message: Success.Query })
    } catch (err) {
      const { code, message } = formatError('engagement', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }
}

const queries = {
  Query: {
    myEngagements: EngagementController.myEngagements,
    engagement: EngagementController.engagement,
  },
  Engagement: {
    job: (parent: { jobId: number }) => JobRepository.findById(parent.jobId),
    submissions: (parent: { id: number }) => SubmissionRepository.listByEngagement(parent.id),
  },
}

export default queries
