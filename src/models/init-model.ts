import type { Sequelize } from 'sequelize'

import { Entrepreneur } from './entrepreneur'
import { Influencer } from './influencer'
import { Job } from './job'

export { Entrepreneur, Influencer, Job }
export type { EntrepreneurCreationAttributes } from './entrepreneur'
export type { InfluencerAttributes, InfluencerCreationAttributes } from './influencer'
export type { JobAttributes, JobCreationAttributes } from './job'

// As you add models, import + init + (optionally) wire up associations here.
// The umi-erp-service repo generates this file with sequelize-auto from an
// existing database; for a brand-new project it's simplest to hand-write it
// and add one block per model as you create them.
export function initModels(sequelize: Sequelize) {
  Influencer.initModel(sequelize)
  Entrepreneur.initModel(sequelize)
  Job.initModel(sequelize)

  return {
    Influencer,
    Entrepreneur,
    Job,
  }
}
