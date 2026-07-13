import { Sequelize } from 'sequelize'

import cnf from '@/config/config'

import * as models from './init-model'

const env = process.env.NODE_ENV || 'development'
const config = env === 'development' ? cnf.development : env === 'uat' ? cnf.uat : cnf.production

const sequelize = new Sequelize(config.database, config.username, config.password, config)

sequelize.authenticate()
  .then(() => {
    if (env === 'development') console.info(`Database connected successfully at: ${config.host}:${config.port}`)
  })
  .catch((err) => {
    if (env === 'development') {
      console.error(`Database connected failed at: ${config.host}:${config.port}`)
      console.error(`Error: ${err}`)
    }
  })

export default {
  ...models,
  initModels: () => {
    models.initModels(sequelize)
  },
  sequelize,
  Sequelize,
}

export {
  sequelize,
}
