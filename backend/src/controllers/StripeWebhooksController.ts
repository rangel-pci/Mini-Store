import { Request, Response } from "express";
import { stripe } from '../configs/stripe';
import Stripe from 'stripe';
import StripeWebhooksService from "../services/StripeWebhooksService";

// Check stripe signature then call the correct event handler
class StripeWebhooksController{
    async index(req: Request, res: Response){
        const endpoint_secret = process.env.STRIPE_ENDPOINT_SECRET_KEY as string
        const stripe_signature = req.headers['stripe-signature'] as string
    
        let event: Stripe.Event
        
        try {
            event = stripe.webhooks.constructEvent(req.body, stripe_signature, endpoint_secret);
        }catch (err: any) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return
        }

        switch(event.type){
            case 'payment_intent.succeeded':
                const payment_intent_succeeded = event.data.object
                StripeWebhooksService.handlePaymentIntentSucceeded(payment_intent_succeeded)
                break
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.send()
    }
}

export default new StripeWebhooksController()