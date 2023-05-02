import { stripe } from "../configs/stripe"
import Stripe from 'stripe';

class PaymentsService{
    /**
     * List succeeded payments
     */
    async get(){
        const response = await stripe.paymentIntents.search({
            query: `status: 'succeeded'`, expand: ['data.customer']
        })
        
        return response.data
    }

    async createPaymentIntent(payment: Stripe.PaymentIntentCreateParams){
        payment.automatic_payment_methods = { enabled: true }

        const paymentIntent = await stripe.paymentIntents.create(payment)
        return paymentIntent
    }

    async search(customer_id: string){
        const response = await stripe.paymentIntents.search({
            query: `customer: '${customer_id}' AND status: 'succeeded'`,
        })
        const payment_intents = response.data
        return payment_intents
    }
}

export default new PaymentsService()