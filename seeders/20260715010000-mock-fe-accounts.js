'use strict'

const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10

// Mirrors the two mock accounts used in solscale-fe (src/lib/mock-users.ts).
// Same email/password so loginInfluencer / loginEntrepreneur work with the
// exact credentials used in the frontend.
const ACCOUNT_EMAIL = 'toppst128@gmail.com'
const ACCOUNT_PASSWORD = 'Password123'

const INFLUENCER = {
  email: ACCOUNT_EMAIL,
  firstName: 'Influ',
  lastName: 'One',
  stageName: 'influ1',
  age: 25,
  avatarUrl: 'https://i.pravatar.cc/300?img=5',
  platforms: ['Instagram', 'TikTok'],
  contentCategories: ['beauty', 'fashion'],
  languages: ['Thai', 'English'],
  bankName: 'Kasikorn Bank (KBank)',
  bankAccountName: 'Influ One',
  bankAccountNumber: '062-5-48695-1',
  averageRating: 4.8,
  reviewCount: 12,
}

const ENTREPRENEUR = {
  email: ACCOUNT_EMAIL,
  companyName: 'Entre One',
  brandDescription: 'Demo entrepreneur account for solscale-fe testing.',
  logoUrl: 'https://i.pravatar.cc/300?img=8',
  bankName: 'Bangkok Bank (BBL)',
  bankAccountName: 'Entre One',
  bankAccountNumber: '062-5-48695-2',
}

// 10 additional mock influencers mirroring solscale-fe (src/lib/mock-influencers.ts).
const EXTRA_INFLUENCERS = [
  {
    email: 'nina.glows@example.com',
    firstName: 'Nina',
    lastName: 'Somchai',
    stageName: 'nina.glows',
    age: 27,
    avatarUrl: 'https://i.pravatar.cc/300?img=11',
    platforms: ['Instagram'],
    contentCategories: ['beauty', 'fashion'],
    languages: ['Thai', 'English'],
    bankName: 'Kasikorn Bank (KBank)',
    bankAccountName: 'Nina Somchai',
    bankAccountNumber: '062-5-10001-1',
    averageRating: 4.9,
    reviewCount: 84,
  },
  {
    email: 'tom.eats@example.com',
    firstName: 'Tom',
    lastName: 'Foodie',
    stageName: 'tom.eats.th',
    age: 29,
    avatarUrl: 'https://i.pravatar.cc/300?img=12',
    platforms: ['TikTok'],
    contentCategories: ['food', 'travel'],
    languages: ['Thai'],
    bankName: 'Siam Commercial Bank (SCB)',
    bankAccountName: 'Tom Foodie',
    bankAccountNumber: '062-5-10002-2',
    averageRating: 4.6,
    reviewCount: 52,
  },
  {
    email: 'arkin.unbox@example.com',
    firstName: 'Arkin',
    lastName: 'Tech',
    stageName: 'arkin.unbox',
    age: 31,
    avatarUrl: 'https://i.pravatar.cc/300?img=13',
    platforms: ['YouTube'],
    contentCategories: ['tech', 'gaming'],
    languages: ['Thai', 'English'],
    bankName: 'Bangkok Bank (BBL)',
    bankAccountName: 'Arkin Tech',
    bankAccountNumber: '062-5-10003-3',
    averageRating: 4.8,
    reviewCount: 131,
  },
  {
    email: 'maya.moves@example.com',
    firstName: 'Maya',
    lastName: 'Fit',
    stageName: 'maya.moves',
    age: 26,
    avatarUrl: 'https://i.pravatar.cc/300?img=14',
    platforms: ['Instagram'],
    contentCategories: ['fitness', 'fashion'],
    languages: ['Thai', 'English'],
    bankName: 'Kasikorn Bank (KBank)',
    bankAccountName: 'Maya Fit',
    bankAccountNumber: '062-5-10004-4',
    averageRating: 4.7,
    reviewCount: 39,
  },
  {
    email: 'james.wallet@example.com',
    firstName: 'James',
    lastName: 'Wallet',
    stageName: 'james.wallet',
    age: 33,
    avatarUrl: 'https://i.pravatar.cc/300?img=15',
    platforms: ['YouTube'],
    contentCategories: ['finance', 'tech'],
    languages: ['English'],
    bankName: 'Krungthai Bank (KTB)',
    bankAccountName: 'James Wallet',
    bankAccountNumber: '062-5-10005-5',
    averageRating: 4.5,
    reviewCount: 67,
  },
  {
    email: 'ploy.wanders@example.com',
    firstName: 'Ploy',
    lastName: 'Travels',
    stageName: 'ploy.wanders',
    age: 30,
    avatarUrl: 'https://i.pravatar.cc/300?img=16',
    platforms: ['Instagram'],
    contentCategories: ['travel', 'food'],
    languages: ['Thai', 'English'],
    bankName: 'Siam Commercial Bank (SCB)',
    bankAccountName: 'Ploy Travels',
    bankAccountNumber: '062-5-10006-6',
    averageRating: 4.8,
    reviewCount: 98,
  },
  {
    email: 'beam.plays@example.com',
    firstName: 'Beam',
    lastName: 'Gamer',
    stageName: 'beam.plays',
    age: 23,
    avatarUrl: 'https://i.pravatar.cc/300?img=17',
    platforms: ['TikTok'],
    contentCategories: ['gaming', 'tech'],
    languages: ['Thai'],
    bankName: 'Bangkok Bank (BBL)',
    bankAccountName: 'Beam Gamer',
    bankAccountNumber: '062-5-10007-7',
    averageRating: 4.4,
    reviewCount: 76,
  },
  {
    email: 'mint.momlife@example.com',
    firstName: 'Mint',
    lastName: 'Mom',
    stageName: 'mint.momlife',
    age: 34,
    avatarUrl: 'https://i.pravatar.cc/300?img=18',
    platforms: ['Instagram'],
    contentCategories: ['parenting', 'home'],
    languages: ['Thai'],
    bankName: 'Kasikorn Bank (KBank)',
    bankAccountName: 'Mint Mom',
    bankAccountNumber: '062-5-10008-8',
    averageRating: 4.6,
    reviewCount: 41,
  },
  {
    email: 'kai.fits@example.com',
    firstName: 'Kai',
    lastName: 'Streetwear',
    stageName: 'kai.fits',
    age: 24,
    avatarUrl: 'https://i.pravatar.cc/300?img=19',
    platforms: ['Instagram'],
    contentCategories: ['fashion', 'home'],
    languages: ['Thai', 'English'],
    bankName: 'Siam Commercial Bank (SCB)',
    bankAccountName: 'Kai Streetwear',
    bankAccountNumber: '062-5-10009-9',
    averageRating: 4.7,
    reviewCount: 58,
  },
  {
    email: 'dao.makeup@example.com',
    firstName: 'Dao',
    lastName: 'Beauty',
    stageName: 'dao.makeup',
    age: 25,
    avatarUrl: 'https://i.pravatar.cc/300?img=20',
    platforms: ['TikTok'],
    contentCategories: ['beauty', 'fashion'],
    languages: ['Thai', 'English'],
    bankName: 'Krungthai Bank (KTB)',
    bankAccountName: 'Dao Beauty',
    bankAccountNumber: '062-5-10010-0',
    averageRating: 4.7,
    reviewCount: 92,
  },
]

module.exports = {
  async up(queryInterface) {
    const password = await bcrypt.hash(ACCOUNT_PASSWORD, SALT_ROUNDS)
    const now = new Date()

    await queryInterface.bulkInsert('Influencer', [
      {
        email: INFLUENCER.email,
        password,
        firstName: INFLUENCER.firstName,
        lastName: INFLUENCER.lastName,
        stageName: INFLUENCER.stageName,
        age: INFLUENCER.age,
        avatarUrl: INFLUENCER.avatarUrl,
        platforms: JSON.stringify(INFLUENCER.platforms),
        contentCategories: JSON.stringify(INFLUENCER.contentCategories),
        languages: JSON.stringify(INFLUENCER.languages),
        bankName: INFLUENCER.bankName,
        bankAccountName: INFLUENCER.bankAccountName,
        bankAccountNumber: INFLUENCER.bankAccountNumber,
        averageRating: INFLUENCER.averageRating,
        reviewCount: INFLUENCER.reviewCount,
        createdAt: now,
        updatedAt: now,
      },
    ])

    await queryInterface.bulkInsert('Entrepreneur', [
      {
        email: ENTREPRENEUR.email,
        password,
        companyName: ENTREPRENEUR.companyName,
        brandDescription: ENTREPRENEUR.brandDescription,
        logoUrl: ENTREPRENEUR.logoUrl,
        bankName: ENTREPRENEUR.bankName,
        bankAccountName: ENTREPRENEUR.bankAccountName,
        bankAccountNumber: ENTREPRENEUR.bankAccountNumber,
        createdAt: now,
        updatedAt: now,
      },
    ])

    await queryInterface.bulkInsert(
      'Influencer',
      EXTRA_INFLUENCERS.map((influencer) => ({
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
        bankName: influencer.bankName,
        bankAccountName: influencer.bankAccountName,
        bankAccountNumber: influencer.bankAccountNumber,
        averageRating: influencer.averageRating,
        reviewCount: influencer.reviewCount,
        createdAt: now,
        updatedAt: now,
      }))
    )
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Influencer', { email: ACCOUNT_EMAIL })
    await queryInterface.bulkDelete('Entrepreneur', { email: ACCOUNT_EMAIL })
    await queryInterface.bulkDelete('Influencer', {
      email: EXTRA_INFLUENCERS.map((influencer) => influencer.email),
    })
  },
}
