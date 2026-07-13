import dotenv from 'dotenv'
import { Dialect } from 'sequelize'

dotenv.config()

const sharedDbConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  logging: false,
  port: Number.parseInt(process.env.DB_PORT),
  dialect: 'postgres' as Dialect,
}

export default {
  development: {
    ...sharedDbConfig,
  },
  uat: {
    ...sharedDbConfig,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    ...sharedDbConfig,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
}
