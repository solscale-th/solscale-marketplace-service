import { isNil } from 'lodash'

import { EngagementPayload, MutationSubmitWorkArgs } from '@/generated/graphql'
import { EngagementRepository, JobRepository, SubmissionRepository } from '@/repositories'
import { buildResponse, CustomError, formatError, ResponseMessage } from '@/utils'
import { Context } from '@/utils/context'

const { Success, Error: ErrorMessage } = ResponseMessage

async function assertEngagementAccess(engagementId: number, ctx: Context) {
  if (isNil(ctx.id))
    throw new CustomError('401', ErrorMessage.Unauthorized)

  const engagement = await EngagementRepository.findById(engagementId)
  if (isNil(engagement))
    throw new CustomError('404', ErrorMessage.NotFound)

  if (ctx.type === 'INFLUENCER') {
    if (engagement.influencerId !== Number(ctx.id))
      throw new CustomError('401', ErrorMessage.Unauthorized)
  } else if (ctx.type === 'ENTREPRENEUR') {
    const job = await JobRepository.findById(engagement.jobId)
    if (isNil(job) || job.entrepreneurId !== Number(ctx.id))
      throw new CustomError('401', ErrorMessage.Unauthorized)
  } else {
    throw new CustomError('401', ErrorMessage.Unauthorized)
  }

  return engagement
}

class EngagementController {
  public static async submitWork(_: unknown, { input }: MutationSubmitWorkArgs, ctx: Context): Promise<EngagementPayload> {
    try {
      if (isNil(ctx.id) || ctx.type !== 'INFLUENCER')
        throw new CustomError('401', ErrorMessage.Unauthorized)

      const engagement = await assertEngagementAccess(input.engagementId, ctx)

      await SubmissionRepository.create({
        engagementId: engagement.id,
        links: input.links,
        note: input.note ?? undefined,
      })
      const data = await EngagementRepository.update(engagement.id, { workStatus: 'submitted' })
      return buildResponse({ success: true, data, message: Success.Mutation })
    } catch (err) {
      const { code, message } = formatError('submitWork', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }
}

const mutations = {
  Mutation: {
    submitWork: EngagementController.submitWork,
  },
}

export default mutations
