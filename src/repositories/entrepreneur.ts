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

  public static async findOrCreateByGoogle(email: string) {
    const existing = await Entrepreneur.findOne({ where: { email } })
    if (existing) return { entrepreneur: existing, created: false }

    const password = await bcrypt.hash(Math.random().toString(36), SALT_ROUNDS)
    const entrepreneur = await Entrepreneur.create({ email, password, companyName: '' })
    return { entrepreneur, created: true }
  }

  public static async updateById(id: number, payload: Partial<{ companyName: string }>) {
    const entrepreneur = await Entrepreneur.findByPk(id)
    if (!entrepreneur) return null
    return entrepreneur.update(payload)
  }
}

export default EntrepreneurRepository
