import { stripe } from "../configs/stripe"
import Stripe from 'stripe';

type amount_paid_per_product = {
    id: string, 
    amount: number
}

class CustomersService{
    async handlePaymentIntentSucceeded(payment_intent_event: Stripe.Event.Data.Object){
        const payment_intent = <Stripe.PaymentIntent>payment_intent_event
        const products_ids: string[] = []
        const amount_paid_per_product: amount_paid_per_product[] = []

        // Takes each product_id,amount_paid present in the paymentIntent.metadata
        let i = 1
        do{
            const prod = payment_intent.metadata['product_'+ i]?.split(',') ?? 'stop'
            if(typeof prod === 'string') { break }

            products_ids.push(prod[0])
            amount_paid_per_product.push({ id: prod[0], amount: parseInt(prod[1]) })
            i++
        }while(true)

        // Update products total_raised_usd/total_raised_brl and total_sold
        if(products_ids.length > 0){
            const response = await stripe.products.list({ active: true, ids: products_ids })
            response.data.forEach(product => {
                let total_raised = parseInt(product.metadata['total_raised_'+payment_intent.currency])
                total_raised += amount_paid_per_product.find(item => item.id === product.id)?.amount ?? 0
                
                const data = {
                    ['total_raised_'+payment_intent.currency]:  total_raised,
                    total_sold: parseInt(product.metadata['total_sold']) + 1,
                }

                stripe.products.update(product.id, { metadata: data })
            });
        }
    }
}

export default new CustomersService()