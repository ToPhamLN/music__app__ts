import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { connect } from '~/config/db'
import { authRoutes } from './routes'
import {
  notFound,
  errorHandler
} from '~/middlewares/error.middlewares'

dotenv.config()
const app: express.Application = express()
const port = process.env.PORT ?? 5000

const corsOptions: cors.CorsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(bodyParser.json({ limit: '30mb' }))

app.use('/api/auths', authRoutes)

app.use(notFound)
app.use(errorHandler)

connect()

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})