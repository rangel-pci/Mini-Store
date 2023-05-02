/**
 * Creates a new product and a recurring price
 */

import Stripe from 'stripe';
import env from 'dotenv'
env.config({ path: "./.env" })

if(!process.env.STRIPE_SECRET_KEY){
  throw new Error("STRIPE_SECRET_KEY environment variable is not set")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
  typescript: true,
});

const create = async () => {
  const product = await stripe.products.create({
    name: 'Starter Subscription',
    description: '$12/Day subscription',
  })

  const price = await stripe.prices.create({
    unit_amount: 1200,
    currency: 'usd',
    recurring: {
      interval: 'day',
    },
    product: product.id,
  })

  console.log('Starter Subscription product id: ' + product.id);
  console.log('Price id: ' + price.id);
}

create()