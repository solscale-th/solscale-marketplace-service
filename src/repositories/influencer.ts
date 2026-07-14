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
}

export default InfluencerRepository
