import bcrypt from 'bcrypt'

import { Influencer, InfluencerCreationAttributes } from '@/models/init-model'

const SALT_ROUNDS = 10

class InfluencerRepository {
  public static async create(payload: InfluencerCreationAttributes) {
    const password = await bcrypt.hash(payload.password, SALT_ROUNDS)
    return Influencer.create({ ...payload, password })
  }

  public static findByEmail(email: string) {
    return Influencer.findOne({ where: { email } })
  }

  public static list() {
    return Influencer.findAll({
      order: [['id', 'ASC']],
    })
  }

  public static findById(id: number) {
    return Influencer.findByPk(id)
  }

  public static async findOrCreateByGoogle(email: string, firstName: string, lastName: string) {
    const existing = await Influencer.findOne({ where: { email } })
    if (existing) return { influencer: existing, created: false }

    const password = await bcrypt.hash(Math.random().toString(36), SALT_ROUNDS)
    const influencer = await Influencer.create({ email, password, firstName, lastName })
    return { influencer, created: true }
  }
}

export default InfluencerRepository
