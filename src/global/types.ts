export interface Product{
    id: string,
    payment_amount: number // Amount to be paid for the product, chosen by the customer
    metadata: {
        minimum_brl: number,
        minimum_usd: number,
        [key: string]: any
    },
}

export interface Customer{
    name: string,
    email: string,
    description: string,
}

export interface Order{
    currency: string,
    products: Product[],
    customer?: Customer, // The buyer can identify himself or buy anonymously
    message?: string, // The buyer can send a message, that will be attached to the payment
}

export interface PaymentMessage{
    customer_message: string,
    customer_name: string | null,
    date: number, // Measured in seconds since the Unix epoch.
    amount: number,
    currency: string,
}

export interface defaultServiceResponse {
    error?: {
        message: string,
        status: number,
    }
}