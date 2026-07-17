import { isNil } from 'lodash'

import { JobPayload, MutationCreateJobArgs, MutationUpdateJobArgs } from '@/generated/graphql'
import { JobRepository } from '@/repositories'
import { buildResponse, CustomError, formatError, ResponseMessage, stripNulls } from '@/utils'
import { Context } from '@/utils/context'

const { Success, Error: ErrorMessage } = ResponseMessage

class JobController {
  public static async createJob(_: unknown, { input }: MutationCreateJobArgs, ctx: Context): Promise<JobPayload> {
    try {
      if (isNil(ctx.id) || ctx.type !== 'ENTREPRENEUR')
        throw new CustomError('401', ErrorMessage.Unauthorized)

      const data = await JobRepository.create({
        ...stripNulls(input),
        entrepreneurId: Number(ctx.id),
      })
      return buildResponse({ success: true, data, message: Success.Mutation })
    } catch (err) {
      const { code, message } = formatError('createJob', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }

  public static async updateJob(_: unknown, { input }: MutationUpdateJobArgs, ctx: Context): Promise<JobPayload> {
    try {
      if (isNil(ctx.id) || ctx.type !== 'ENTREPRENEUR')
        throw new CustomError('401', ErrorMessage.Unauthorized)

      const { id, ...rest } = input
      const existing = await JobRepository.findById(id)
      if (isNil(existing) || existing.entrepreneurId !== Number(ctx.id))
        throw new CustomError('401', ErrorMessage.Unauthorized)

      const data = await JobRepository.update(id, stripNulls(rest))
      return buildResponse({ success: true, data, message: Success.Update })
    } catch (err) {
      const { code, message } = formatError('updateJob', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }
}

const mutations = {
  Mutation: {
    createJob: JobController.createJob,
    updateJob: JobController.updateJob,
  },
}

export default mutations
