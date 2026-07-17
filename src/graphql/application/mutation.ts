import { isNil } from 'lodash'

import { ApplicationPayload, MutationAcceptInviteArgs, MutationApplyToJobArgs, MutationDeclineInviteArgs, MutationWithdrawApplicationArgs } from '@/generated/graphql'
import { ApplicationRepository, EngagementRepository, JobRepository } from '@/repositories'
import { buildResponse, CustomError, formatError, ResponseMessage } from '@/utils'
import { Context } from '@/utils/context'

const { Success, Error: ErrorMessage } = ResponseMessage

class ApplicationController {
  public static async applyToJob(_: unknown, { jobId }: MutationApplyToJobArgs, ctx: Context): Promise<ApplicationPayload> {
    try {
      if (isNil(ctx.id) || ctx.type !== 'INFLUENCER')
        throw new CustomError('401', ErrorMessage.Unauthorized)

      const job = await JobRepository.findById(jobId)
      if (isNil(job) || job.status !== 'open')
        throw new CustomError('400', ErrorMessage.JobNotOpen)

      const data = await ApplicationRepository.create({
        jobId,
        influencerId: Number(ctx.id),
        source: 'application',
        status: 'pending',
      })
      return buildResponse({ success: true, data, message: Success.Mutation })
    } catch (err) {
      const { code, message } = formatError('applyToJob', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }

  public static async withdrawApplication(_: unknown, { id }: MutationWithdrawApplicationArgs, ctx: Context): Promise<ApplicationPayload> {
    try {
      if (isNil(ctx.id) || ctx.type !== 'INFLUENCER')
        throw new CustomError('401', ErrorMessage.Unauthorized)

      const existing = await ApplicationRepository.findById(id)
      if (isNil(existing) || existing.influencerId !== Number(ctx.id) || existing.source !== 'application' || existing.status !== 'pending')
        throw new CustomError('404', ErrorMessage.NotFound)

      const data = await ApplicationRepository.update(id, { status: 'withdrawn' })
      return buildResponse({ success: true, data, message: Success.Update })
    } catch (err) {
      const { code, message } = formatError('withdrawApplication', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }

  public static async acceptInvite(_: unknown, { id }: MutationAcceptInviteArgs, ctx: Context): Promise<ApplicationPayload> {
    try {
      if (isNil(ctx.id) || ctx.type !== 'INFLUENCER')
        throw new CustomError('401', ErrorMessage.Unauthorized)

      const existing = await ApplicationRepository.findById(id)
      if (isNil(existing) || existing.influencerId !== Number(ctx.id) || existing.source !== 'invite' || existing.status !== 'pending')
        throw new CustomError('404', ErrorMessage.NotFound)

      const data = await ApplicationRepository.update(id, { status: 'accepted' })
      if (!isNil(data)) {
        await EngagementRepository.create({
          applicationId: data.id,
          jobId: data.jobId,
          influencerId: data.influencerId,
        })
      }
      return buildResponse({ success: true, data, message: Success.Update })
    } catch (err) {
      const { code, message } = formatError('acceptInvite', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }

  public static async declineInvite(_: unknown, { id }: MutationDeclineInviteArgs, ctx: Context): Promise<ApplicationPayload> {
    try {
      if (isNil(ctx.id) || ctx.type !== 'INFLUENCER')
        throw new CustomError('401', ErrorMessage.Unauthorized)

      const existing = await ApplicationRepository.findById(id)
      if (isNil(existing) || existing.influencerId !== Number(ctx.id) || existing.source !== 'invite' || existing.status !== 'pending')
        throw new CustomError('404', ErrorMessage.NotFound)

      const data = await ApplicationRepository.update(id, { status: 'declined' })
      return buildResponse({ success: true, data, message: Success.Update })
    } catch (err) {
      const { code, message } = formatError('declineInvite', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }
}

const mutations = {
  Mutation: {
    applyToJob: ApplicationController.applyToJob,
    withdrawApplication: ApplicationController.withdrawApplication,
    acceptInvite: ApplicationController.acceptInvite,
    declineInvite: ApplicationController.declineInvite,
  },
}

export default mutations
