import bcrypt from 'bcrypt'

import { Entrepreneur, EntrepreneurCreationAttributes } from '@/models/init-model'

const SALT_ROUNDS = 10

class EntrepreneurRepository {
  public static async create(payload: EntrepreneurCreationAttributes) {
    const password = payload.password ? await bcrypt.hash(payload.password, SALT_ROUNDS) : null
    return Entrepreneur.create({ ...payload, password })
  }

  public static findByEmail(email: string) {
    return Entrepreneur.findOne({ where: { email } })
  }

  public static findByGoogleId(googleId: string) {
    return Entrepreneur.findOne({ where: { googleId } })
  }

  public static async linkGoogleId(id: number, googleId: string) {
    await Entrepreneur.update({ googleId }, { where: { id } })
    return Entrepreneur.findByPk(id)
  }

  public static async update(id: number, payload: Partial<EntrepreneurCreationAttributes>) {
    await Entrepreneur.update(payload, { where: { id } })
    return Entrepreneur.findByPk(id)
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
