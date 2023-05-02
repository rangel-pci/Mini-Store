import Stripe from 'stripe';
import env from 'dotenv'
env.config({ path: "./.env" })

if(!process.env.STRIPE_SECRET_KEY){
  throw new Error("STRIPE_SECRET_KEY environment variable is not set")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
  typescript: true,
});