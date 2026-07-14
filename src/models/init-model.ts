import type { Sequelize } from 'sequelize'

import { Entrepreneur } from './entrepreneur'
import { Influencer } from './influencer'

export { Entrepreneur, Influencer }
export type { EntrepreneurCreationAttributes } from './entrepreneur'
export type { InfluencerCreationAttributes } from './influencer'

// As you add models, import + init + (optionally) wire up associations here.
// The umi-erp-service repo generates this file with sequelize-auto from an
// existing database; for a brand-new project it's simplest to hand-write it
// and add one block per model as you create them.
export function initModels(sequelize: Sequelize) {
  Influencer.initModel(sequelize)
  Entrepreneur.initModel(sequelize)

  return {
    Influencer,
    Entrepreneur,
  }
}
