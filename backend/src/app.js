import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { env } from './config/env.js'
import { authRouter } from './modules/auth/auth.routes.js'
import { userRouter } from './modules/users/users.routes.js'
import { productRouter } from './modules/products/products.routes.js'
import { orderRouter } from './modules/orders/orders.routes.js'
import { deliveryRouter } from './modules/delivery/delivery.routes.js'
import { paymentRouter } from './modules/payments/payments.routes.js'
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js'

export const app = express()

app.use(helmet())
app.use(cors({ origin: env.corsOrigin === '*' ? true : env.corsOrigin.split(',') }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'API is healthy.' })
})

app.use(`${env.apiPrefix}/auth`, authRouter)
app.use(`${env.apiPrefix}/users`, userRouter)
app.use(`${env.apiPrefix}/products`, productRouter)
app.use(`${env.apiPrefix}/orders`, orderRouter)
app.use(`${env.apiPrefix}/delivery`, deliveryRouter)
app.use(`${env.apiPrefix}/payments`, paymentRouter)

app.use(notFoundHandler)
app.use(errorHandler)
