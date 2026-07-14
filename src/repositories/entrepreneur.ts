import bcrypt from 'bcrypt'

import { Entrepreneur, EntrepreneurCreationAttributes } from '@/models/init-model'

const SALT_ROUNDS = 10

class EntrepreneurRepository {
  public static async create(payload: EntrepreneurCreationAttributes) {
    const password = await bcrypt.hash(payload.password, SALT_ROUNDS)
    return Entrepreneur.create({ ...payload, password })
  }

  public static findByEmail(email: string) {
    return Entrepreneur.findOne({ where: { email } })
  }

  public static list() {
    return Entrepreneur.findAll({
      order: [['id', 'ASC']],
    })
  }

  public static findById(id: number) {
    return Entrepreneur.findByPk(id)
  }
}

export default EntrepreneurRepository
