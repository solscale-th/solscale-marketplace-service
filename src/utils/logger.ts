import { Request, Response } from 'express'
import { writeFileSync } from 'fs'
import { Kind, OperationDefinitionNode, parse } from 'graphql'
import logger, { TokenIndexer } from 'morgan'

import { Dir } from '@/utils'

const getCurrentDate = (): string => new Date().toLocaleString('sv-SE', { year: 'numeric', month: 'numeric', day: 'numeric' })

const getCurrentDateTime = (): string => new Date().toLocaleString('sv-SE')

export const writeLog = ({ type, relatedTask, requestUUID, message }: { type: 'INFO' | 'WARN' | 'ERROR', relatedTask: string, requestUUID: string, message: string }) => new Promise((resolve, reject) => {
  try {
    if (process.env.NODE_ENV === 'test') {
      resolve([])
      return
    }
    const logDir = './logs'
    Dir.makeDirIfNotExists(logDir)
    const appName = (process.env.APP_NAME || 'app').toLowerCase().replace(/ /g, '-')
    writeFileSync(`${logDir}/${appName}-${getCurrentDate()}.log`, `${getCurrentDateTime()} ${type} ${requestUUID} | ${relatedTask} | ${message}\n`, { flag: 'a+' })
    resolve([])
  } catch (e) {
    reject(e)
  }
})

export const requestLogger = logger((tokens: TokenIndexer<Request, Response>, req: Request, res: Response) => {
  const requestUUID = req.headers['x-request-id'] as string || 'None'
  const requestInfo = (() => {
    if (req.baseUrl === '/graphql') {
      const parsedQs = req.body && req.body.query ? parse(req.body.query) : { definitions: [] }
      const definition = parsedQs.definitions.find((def) => def.kind === 'OperationDefinition') as OperationDefinitionNode
      const selection = definition && definition.selectionSet.selections[0]
      const operationName = selection && selection.kind !== Kind.INLINE_FRAGMENT ? selection.name.value : 'None'
      return `"${tokens.method(req, res)} ${tokens.url(req, res)} [${operationName}]"`
    } else {
      return `"${tokens.method(req, res)} ${tokens.url(req, res)}"`
    }
  })()
  // example: 04/Nov/2024:08:11:53 +0000 <None> "GET /healthz" 200 1.852 ms
  return ([
    tokens.date(req, res, 'clf'),
    `<${requestUUID}>`,
    requestInfo,
    tokens.status(req, res),
    tokens['response-time'](req, res), 'ms',
  ].join(' '))
})
