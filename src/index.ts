import models from './models'
models.initModels()

import server from './server'

server()
  .catch(() => {
    process.exit(0)
  })
