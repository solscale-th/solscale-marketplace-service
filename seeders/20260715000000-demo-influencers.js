'use strict'

const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10
const DEFAULT_PASSWORD = 'Password123!'

const INFLUENCERS = [
  {
    email: 'nina.glows@example.com',
    firstName: 'Nina',
    lastName: 'Somchai',
    stageName: 'Nina Glows',
    age: 27,
    avatarUrl: 'https://i.pravatar.cc/300?img=47',
    platforms: ['Instagram'],
    contentCategories: ['beauty', 'fashion'],
    languages: ['Thai', 'English'],
    averageRating: 4.9,
    reviewCount: 84,
  },
  {
    email: 'tom.eats@example.com',
    firstName: 'Tom',
    lastName: 'Preecha',
    stageName: 'Tom Foodie',
    age: 31,
    avatarUrl: 'https://i.pravatar.cc/300?img=12',
    platforms: ['TikTok'],
    contentCategories: ['food', 'travel'],
    languages: ['Thai'],
    averageRating: 4.6,
    reviewCount: 52,
  },
  {
    email: 'arkin.unbox@example.com',
    firstName: 'Arkin',
    lastName: 'Wong',
    stageName: 'Arkin Tech',
    age: 29,
    avatarUrl: 'https://i.pravatar.cc/300?img=33',
    platforms: ['YouTube'],
    contentCategories: ['tech', 'gaming'],
    languages: ['Thai', 'English'],
    averageRating: 4.8,
    reviewCount: 131,
  },
  {
    email: 'maya.moves@example.com',
    firstName: 'Maya',
    lastName: 'Chan',
    stageName: 'Maya Fit',
    age: 26,
    avatarUrl: 'https://i.pravatar.cc/300?img=45',
    platforms: ['Instagram'],
    contentCategories: ['fitness', 'fashion'],
    languages: ['Thai', 'English'],
    averageRating: 4.7,
    reviewCount: 39,
  },
  {
    email: 'james.wallet@example.com',
    firstName: 'James',
    lastName: 'Kittipong',
    stageName: 'James Wallet',
    age: 34,
    avatarUrl: 'https://i.pravatar.cc/300?img=15',
    platforms: ['YouTube'],
    contentCategories: ['finance', 'tech'],
    languages: ['English'],
    averageRating: 4.5,
    reviewCount: 67,
  },
  {
    email: 'ploy.wanders@example.com',
    firstName: 'Ploy',
    lastName: 'Rattana',
    stageName: 'Ploy Travels',
    age: 28,
    avatarUrl: 'https://i.pravatar.cc/300?img=32',
    platforms: ['Instagram'],
    contentCategories: ['travel', 'food'],
    languages: ['Thai', 'English'],
    averageRating: 4.8,
    reviewCount: 98,
  },
  {
    email: 'beam.plays@example.com',
    firstName: 'Beam',
    lastName: 'Suksan',
    stageName: 'Beam Gamer',
    age: 23,
    avatarUrl: 'https://i.pravatar.cc/300?img=51',
    platforms: ['TikTok'],
    contentCategories: ['gaming', 'tech'],
    languages: ['Thai'],
    averageRating: 4.4,
    reviewCount: 76,
  },
  {
    email: 'mint.momlife@example.com',
    firstName: 'Mint',
    lastName: 'Boonmee',
    stageName: 'Mint Mom',
    age: 33,
    avatarUrl: 'https://i.pravatar.cc/300?img=44',
    platforms: ['Instagram'],
    contentCategories: ['parenting', 'home'],
    languages: ['Thai'],
    averageRating: 4.6,
    reviewCount: 41,
  },
]

module.exports = {
  async up(queryInterface) {
    const password = await bcrypt.hash(DEFAULT_PASSWORD, SALT_ROUNDS)
    const now = new Date()

    const rows = INFLUENCERS.map((influencer) => ({
      email: influencer.email,
      password,
      firstName: influencer.firstName,
      lastName: influencer.lastName,
      stageName: influencer.stageName,
      age: influencer.age,
      avatarUrl: influencer.avatarUrl,
      platforms: JSON.stringify(influencer.platforms),
      contentCategories: JSON.stringify(influencer.contentCategories),
      languages: JSON.stringify(influencer.languages),
      averageRating: influencer.averageRating,
      reviewCount: influencer.reviewCount,
      createdAt: now,
      updatedAt: now,
    }))

    await queryInterface.bulkInsert('Influencer', rows, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'Influencer',
      { email: { [Sequelize.Op.in]: INFLUENCERS.map((i) => i.email) } },
      {}
    )
  },
}
