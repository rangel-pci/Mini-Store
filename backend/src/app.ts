import express from 'express'
import cors from 'cors'
import env from 'dotenv'
import { routes } from './routes/index';
import StripeWebhooksController from './controllers/StripeWebhooksController';

env.config({ path: "./.env" })

export const app = express()

app.use(cors())
app.post('/api/v1/stripe_webhooks', express.raw({type: 'application/json'}), StripeWebhooksController.index)
app.use(express.json())
app.use('/api/v1', routes)