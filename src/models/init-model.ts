import type { Sequelize } from 'sequelize'

import { Application } from './application'
import { Engagement } from './engagement'
import { Entrepreneur } from './entrepreneur'
import { Influencer } from './influencer'
import { InfluencerAddon } from './influencer-addon'
import { InfluencerPackage } from './influencer-package'
import { InfluencerPortfolioItem } from './influencer-portfolio-item'
import { InfluencerReview } from './influencer-review'
import { Job } from './job'
import { JobAddon } from './job-addon'
import { JobRequirementFile } from './job-requirement-file'
import { Submission } from './submission'

export { Application, Engagement, Entrepreneur, Influencer, InfluencerAddon, InfluencerPackage, InfluencerPortfolioItem, InfluencerReview, Job, JobAddon, JobRequirementFile, Submission }
export type { ApplicationAttributes, ApplicationCreationAttributes } from './application'
export type { EngagementAttributes, EngagementCreationAttributes } from './engagement'
export type { EntrepreneurCreationAttributes } from './entrepreneur'
export type { InfluencerAttributes, InfluencerCreationAttributes } from './influencer'
export type { InfluencerAddonAttributes, InfluencerAddonCreationAttributes } from './influencer-addon'
export type { InfluencerPackageAttributes, InfluencerPackageCreationAttributes } from './influencer-package'
export type { InfluencerPortfolioItemAttributes, InfluencerPortfolioItemCreationAttributes } from './influencer-portfolio-item'
export type { InfluencerReviewAttributes, InfluencerReviewCreationAttributes } from './influencer-review'
export type { JobAttributes, JobCreationAttributes } from './job'
export type { JobAddonAttributes, JobAddonCreationAttributes } from './job-addon'
export type { JobRequirementFileAttributes, JobRequirementFileCreationAttributes } from './job-requirement-file'
export type { SubmissionAttributes, SubmissionCreationAttributes } from './submission'

// As you add models, import + init + (optionally) wire up associations here.
// The umi-erp-service repo generates this file with sequelize-auto from an
// existing database; for a brand-new project it's simplest to hand-write it
// and add one block per model as you create them.
export function initModels(sequelize: Sequelize) {
  Influencer.initModel(sequelize)
  InfluencerAddon.initModel(sequelize)
  InfluencerPackage.initModel(sequelize)
  InfluencerPortfolioItem.initModel(sequelize)
  InfluencerReview.initModel(sequelize)
  Entrepreneur.initModel(sequelize)
  Job.initModel(sequelize)
  JobAddon.initModel(sequelize)
  JobRequirementFile.initModel(sequelize)
  Application.initModel(sequelize)
  Engagement.initModel(sequelize)
  Submission.initModel(sequelize)

  return {
    Influencer,
    InfluencerAddon,
    InfluencerPackage,
    InfluencerPortfolioItem,
    InfluencerReview,
    Entrepreneur,
    Job,
    JobAddon,
    JobRequirementFile,
    Application,
    Engagement,
    Submission,
  }
}
