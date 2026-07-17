import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@as-integrations/express4'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import { GraphQLError } from 'graphql'
import http from 'http'
import { isNil } from 'lodash'

import router from '@/controllers'
import schema from '@/graphql'
import { AuthorizationService } from '@/services'
import { Context, requestLogger } from '@/utils'

export default async () => {
  const PORT = Number.parseInt(process.env.PORT || '8000')

  const app = express()
  const corsMiddleware = cors()

  app.use(corsMiddleware)
  app.use(requestLogger)
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
  app.use(compression())

  const httpServer = http.createServer(app)
  const server = new ApolloServer<Context>({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer })
    ],
  })

  await server.start()

  app.use(
    '/graphql',
    expressMiddleware<Context>(server, {
      context: async ({ req }) => {
        const authorization = req.headers.authorization
        if (isNil(authorization)) {
          // Allow unauthenticated requests through — resolvers that need
          // a logged-in user should check ctx.id/ctx.type themselves and
          // throw an UNAUTHORIZED GraphQLError.
          return {
            requestUUID: req.headers['x-request-id'] as string,
            token: undefined,
          }
        }
        try {
          const ctx = AuthorizationService.verifyToken(authorization)
          return {
            ...ctx,
            requestUUID: req.headers['x-request-id'] as string,
            token: authorization,
          }
        } catch {
          throw new GraphQLError('Unauthorized', {
            extensions: {
              code: 'UNAUTHORIZED',
              http: { status: 401 }
            }
          })
        }
      }
    })
  )

  app.use('/api', router)
  app.use('/docs', express.static('docs/api'))

  app.get(
    '/healthz',
    (_request, response) => {
      return response.status(200).json({ message: 'Health Check OK' })
    }
  )

  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve))
  console.info(`\n\n\nServer started at port: ${PORT}`)
}
