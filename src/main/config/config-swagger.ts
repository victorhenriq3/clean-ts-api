import { Express } from 'express'
import { noCache } from '@/main/middlewares/no-cache'
import {serve, setup} from "swagger-ui-express"
import swaggerConfig from '@/main/docs'

export default (app: Express): void => {
    app.use('/api-docs',noCache, serve, setup(swaggerConfig))
}