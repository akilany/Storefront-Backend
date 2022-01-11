import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import errorController from './controllers/errorController'
import AppError from './utils/appError'

import userRouter from './routes/userRouter'
import productRouter from './routes/productRouter'
import orderRouter from './routes/orderRouter'

dotenv.config()

const app: express.Application = express()
const PORT = process.env.PORT

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

// Routes
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Storefront Backend API')
})

// Catch Unhandled Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(errorController)

app.listen(PORT, () => {
  console.log(`Server is listning on port: http://localhost:${PORT}`)
})

export default app
