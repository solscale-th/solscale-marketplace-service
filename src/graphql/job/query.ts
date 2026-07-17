import { isNil } from 'lodash'

import { JobPayload, JobsPayload, QueryJobArgs, QueryJobsArgs } from '@/generated/graphql'
import { EntrepreneurRepository, JobRepository } from '@/repositories'
import { buildResponse, CustomError, formatError, ResponseMessage } from '@/utils'
import { Context } from '@/utils/context'

const { Success, Error: ErrorMessage } = ResponseMessage

class JobController {
  public static async jobs(_: unknown, { limit, offset, search, filter }: QueryJobsArgs, ctx: Context): Promise<JobsPayload> {
    try {
      const data = await JobRepository.list({
        limit: limit ?? undefined,
        offset: offset ?? undefined,
        search: search ?? undefined,
        filter: filter
          ? {
            platforms: filter.platforms ?? undefined,
            tags: filter.tags ?? undefined,
            location: filter.location ?? undefined,
            budgetMin: filter.budgetMin ?? undefined,
            budgetMax: filter.budgetMax ?? undefined,
          }
          : undefined,
      })
      return buildResponse({ success: true, data, message: Success.Query })
    } catch (err) {
      const { code, message } = formatError('jobs', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }

  public static async job(_: unknown, { id }: QueryJobArgs, ctx: Context): Promise<JobPayload> {
    try {
      const data = await JobRepository.findById(id)
      return buildResponse({ success: true, data, message: Success.Query })
    } catch (err) {
      const { code, message } = formatError('job', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }

  public static async myJobs(_: unknown, __: unknown, ctx: Context): Promise<JobsPayload> {
    try {
      if (isNil(ctx.id) || ctx.type !== 'ENTREPRENEUR')
        throw new CustomError('401', ErrorMessage.Unauthorized)

      const data = await JobRepository.listByEntrepreneur(Number(ctx.id))
      return buildResponse({ success: true, data, message: Success.Query })
    } catch (err) {
      const { code, message } = formatError('myJobs', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }
}

const queries = {
  Query: {
    jobs: JobController.jobs,
    job: JobController.job,
    myJobs: JobController.myJobs,
  },
  Job: {
    entrepreneur: (parent: { entrepreneurId: number }) => EntrepreneurRepository.findById(parent.entrepreneurId),
  },
}

export default queries
