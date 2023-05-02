import Stripe from "stripe";
import { Order, defaultServiceResponse } from '../global/types';
import CustomersService from "./CustomersService";
import PaymentsService from "./PaymentsService";
import ProductsService from "./ProductsService";


interface createOrderResponse extends defaultServiceResponse {
    client_secret?: string | null;
}

class OrdersService{
   
    async createOrder(order: Order) : Promise<createOrderResponse>
    {
        var stripe_customer: Stripe.Customer = <Stripe.Customer>{}
        const stripe_products: Stripe.Product[] = await ProductsService.get({ active: true, ids: order.products.map(product => product.id) })
        const total_payment: number = ProductsService.getTotalAmountFromProducts(order.products, order.currency)
        
        if(order.customer){
            stripe_customer = await CustomersService.searchCustomer(order.customer.email) ?? await CustomersService.createCustomer(order.customer)
        }  

        if(!ProductsService.isValueWithinAcceptableRange(order.currency, order.products, stripe_products)){ 
            return { error: { message: 'The amount to be paid is not within the acceptable range of the product.', status: 422 }}
        }

        const payment: Stripe.PaymentIntentCreateParams = {            
            currency: order.currency,
            amount: total_payment,
            customer: stripe_customer.id ?? null,
            description: `Purchase made in ${process.env.APP_NAME}. ❤️`,
            metadata: { 
                customer_message: order.message ?? null,
            }
        }
        
        // Set payment.metadata comma separated values that contains product_id, amount_paid
        order.products.map((product, index) => {
            payment.metadata = { 
                ...payment.metadata, 
                [`product_${index + 1}`]: product.id + ',' + product.payment_amount 
            }
        })

        // Call payment-intent builder and return the token for the client to continue the payment
        const paymentIntent = await PaymentsService.createPaymentIntent(payment)

        return { client_secret: paymentIntent.client_secret }
    }

}

export default new OrdersService()