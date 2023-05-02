import { PaymentMessage } from "../global/types"
import PaymentsService from "../services/PaymentsService"
import Stripe from 'stripe';
import { Request, Response } from "express";

export const getInitialInformation = async () =>{
    var total_paid_usd: number = 0
    var total_paid_brl: number = 0

    const payments = await PaymentsService.get()
    
    payments.forEach((payment) => {
        if(payment.currency === 'usd'){ total_paid_usd += payment.amount }
        else if(payment.currency === 'brl'){ total_paid_brl += payment.amount }
    })

    const payments_messages: PaymentMessage[] = []
    const max_messages = 3

    for (let index = 0; index < max_messages; index++) {
        const random_int = (Math.floor(Math.random() * payments.length) + 1) - 1

        const customer = payments[random_int].customer as Stripe.Customer

        payments_messages[index] = {
            customer_message: payments[random_int].metadata.customer_message ?? null,
            customer_name: customer?.name ?? null,
            amount: payments[random_int].amount,
            currency: payments[random_int].currency,
            date: payments[random_int].created
        }
    }

    return ({ 
        payments_usd: total_paid_usd, 
        payments_brl: total_paid_brl,
        payments_messages
    })
}

export const getInitialInfo = async (req: Request, res: Response) => {
    res.json(await getInitialInformation())
}