import bcrypt from 'bcrypt'
import { Op, WhereOptions } from 'sequelize'

import { Influencer, InfluencerAttributes, InfluencerCreationAttributes } from '@/models/init-model'

const SALT_ROUNDS = 10

export interface InfluencerFilter {
  categories?: string[]
  platforms?: string[]
  languages?: string[]
}

export interface ListInfluencersOptions {
  limit?: number
  offset?: number
  search?: string
  filter?: InfluencerFilter
}

class InfluencerRepository {
  public static async create(payload: InfluencerCreationAttributes) {
    const password = payload.password ? await bcrypt.hash(payload.password, SALT_ROUNDS) : null
    return Influencer.create({ ...payload, password })
  }

  public static findByEmail(email: string) {
    return Influencer.findOne({ where: { email } })
  }

  public static findByGoogleId(googleId: string) {
    return Influencer.findOne({ where: { googleId } })
  }

  public static async linkGoogleId(id: number, googleId: string) {
    await Influencer.update({ googleId }, { where: { id } })
    return Influencer.findByPk(id)
  }

  public static findByLineId(lineId: string) {
    return Influencer.findOne({ where: { lineId } })
  }

  public static async linkLineId(id: number, lineId: string) {
    await Influencer.update({ lineId }, { where: { id } })
    return Influencer.findByPk(id)
  }

  public static async update(id: number, payload: Partial<InfluencerCreationAttributes>) {
    await Influencer.update(payload, { where: { id } })
    return Influencer.findByPk(id)
  }

  public static list(options: ListInfluencersOptions = {}) {
    const { limit, offset, search, filter } = options
    const andConditions: WhereOptions<InfluencerAttributes>[] = []

    if (search) {
      andConditions.push({
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${search}%` } },
          { lastName: { [Op.iLike]: `%${search}%` } },
          { stageName: { [Op.iLike]: `%${search}%` } },
        ],
      })
    }

    if (filter?.categories?.length) {
      andConditions.push({
        [Op.or]: filter.categories.map((category) => ({ contentCategories: { [Op.contains]: [category] } })),
      })
    }

    if (filter?.platforms?.length) {
      andConditions.push({
        [Op.or]: filter.platforms.map((platform) => ({ platforms: { [Op.contains]: [platform] } })),
      })
    }

    if (filter?.languages?.length) {
      andConditions.push({
        [Op.or]: filter.languages.map((language) => ({ languages: { [Op.contains]: [language] } })),
      })
    }

    return Influencer.findAll({
      where: andConditions.length ? { [Op.and]: andConditions } : undefined,
      limit,
      offset,
      order: [['id', 'ASC']],
    })
  }

  public static findById(id: number) {
    return Influencer.findByPk(id)
  }
}

export default InfluencerRepository
