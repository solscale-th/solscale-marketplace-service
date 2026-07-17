import { isNil } from 'lodash'
import { Op, WhereOptions } from 'sequelize'

import { Job, JobAttributes, JobCreationAttributes } from '@/models/init-model'

export interface JobFilter {
  platforms?: string[]
  tags?: string[]
  location?: string
  budgetMin?: number
  budgetMax?: number
}

export interface ListJobsOptions {
  limit?: number
  offset?: number
  search?: string
  filter?: JobFilter
}

class JobRepository {
  public static create(payload: JobCreationAttributes) {
    return Job.create(payload)
  }

  public static findById(id: number) {
    return Job.findByPk(id)
  }

  public static list(options: ListJobsOptions = {}) {
    const { limit, offset, search, filter } = options
    const andConditions: WhereOptions<JobAttributes>[] = []

    if (search) {
      andConditions.push({
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
        ],
      })
    }

    if (filter?.platforms?.length) {
      andConditions.push({ platform: { [Op.in]: filter.platforms } })
    }

    if (filter?.tags?.length) {
      andConditions.push({
        [Op.or]: filter.tags.map((tag) => ({ tags: { [Op.contains]: [tag] } })),
      })
    }

    if (filter?.location) {
      andConditions.push({ location: { [Op.iLike]: `%${filter.location}%` } })
    }

    if (!isNil(filter?.budgetMin)) {
      andConditions.push({ budgetMax: { [Op.gte]: filter.budgetMin } })
    }

    if (!isNil(filter?.budgetMax)) {
      andConditions.push({ budgetMin: { [Op.lte]: filter.budgetMax } })
    }

    return Job.findAll({
      where: andConditions.length ? { [Op.and]: andConditions } : undefined,
      limit,
      offset,
      order: [['id', 'DESC']],
    })
  }

  public static listByEntrepreneur(entrepreneurId: number) {
    return Job.findAll({
      where: { entrepreneurId },
      order: [['id', 'DESC']],
    })
  }

  public static async update(id: number, payload: Partial<JobCreationAttributes>) {
    await Job.update(payload, { where: { id } })
    return Job.findByPk(id)
  }
}

export default JobRepository
