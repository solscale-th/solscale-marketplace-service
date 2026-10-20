import { isNil } from 'lodash'

import { JobPayload, JobsPayload, QueryJobArgs, QueryJobsArgs, QueryMyAcceptedJobsArgs, QueryMyRequestedJobsArgs } from '@/generated/graphql'
import { Job } from '@/models/init-model'
import { ApplicationRepository, EntrepreneurRepository, JobAddonRepository, JobRepository, JobRequirementFileRepository } from '@/repositories'
import { buildResponse, CustomError, formatError, ResponseMessage } from '@/utils'
import { Context } from '@/utils/context'

const { Success, Error: ErrorMessage } = ResponseMessage

// Keeps the result ordered by application recency (most recent first)
// rather than by Job.id, since that's what the caller actually paged through.
function sortJobsByIdOrder(jobs: Job[], orderedIds: number[]): Job[] {
  const byId = new Map(jobs.map((job) => [job.id, job]))
  return orderedIds.flatMap((id) => {
    const job = byId.get(id)
    return job ? [job] : []
  })
}

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

  public static async myRequestedJobs(_: unknown, { limit, offset }: QueryMyRequestedJobsArgs, ctx: Context): Promise<JobsPayload> {
    try {
      if (isNil(ctx.id) || ctx.type !== 'INFLUENCER')
        throw new CustomError('401', ErrorMessage.Unauthorized)

      const applications = await ApplicationRepository.listRequestedByInfluencer(Number(ctx.id), limit ?? undefined, offset ?? undefined)
      const jobIds = applications.map((application) => application.jobId)
      const data = sortJobsByIdOrder(await JobRepository.listByIds(jobIds), jobIds)
      return buildResponse({ success: true, data, message: Success.Query })
    } catch (err) {
      const { code, message } = formatError('myRequestedJobs', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }

  public static async myAcceptedJobs(_: unknown, { limit, offset }: QueryMyAcceptedJobsArgs, ctx: Context): Promise<JobsPayload> {
    try {
      if (isNil(ctx.id) || ctx.type !== 'INFLUENCER')
        throw new CustomError('401', ErrorMessage.Unauthorized)

      const applications = await ApplicationRepository.listAcceptedByInfluencer(Number(ctx.id), limit ?? undefined, offset ?? undefined)
      const jobIds = applications.map((application) => application.jobId)
      const data = sortJobsByIdOrder(await JobRepository.listByIds(jobIds), jobIds)
      return buildResponse({ success: true, data, message: Success.Query })
    } catch (err) {
      const { code, message } = formatError('myAcceptedJobs', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }
}

const queries = {
  Query: {
    jobs: JobController.jobs,
    job: JobController.job,
    myJobs: JobController.myJobs,
    myRequestedJobs: JobController.myRequestedJobs,
    myAcceptedJobs: JobController.myAcceptedJobs,
  },
  Job: {
    entrepreneur: (parent: { entrepreneurId: number }) => EntrepreneurRepository.findById(parent.entrepreneurId),
    invites: (parent: { id: number, entrepreneurId: number }, _: unknown, ctx: Context) => {
      if (isNil(ctx.id) || ctx.type !== 'ENTREPRENEUR' || Number(ctx.id) !== parent.entrepreneurId)
        return []

      return ApplicationRepository.listByJob(parent.id, 'invite')
    },
    addons: (parent: { id: number }) => JobAddonRepository.listByJob(parent.id),
    requirementFiles: (parent: { id: number }) => JobRequirementFileRepository.listByJob(parent.id),
  },
}

export default queries
