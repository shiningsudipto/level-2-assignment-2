import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

// application routes

app.get('/', (req: Request, res: Response) => {
  res.send('Assignment 2 running')
})

export default app
