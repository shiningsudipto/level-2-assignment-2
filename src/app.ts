import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/product/product.route'
import { OrderRoutes } from './app/order/order.route'
const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

// application routes
app.use('/api', ProductRoutes)
app.use('/api', OrderRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Assignment 2 running')
})

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

export default app
