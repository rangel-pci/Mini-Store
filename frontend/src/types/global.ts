export interface Payment {
    id: string,
    currency: string,
    amount: number,
    created: number, //unix date format
}
export interface PaymentMessage {
    customer_message?: string,
    customer_name?: string,
    amount: number,
    currency: string,
    date: number, //unix date format
}
export interface Statistics {
    payments_usd: number,
    payments_brl: number,
    payments_messages: PaymentMessage[],
    last_update_at: string,
}
export interface Product {
    id: string,
    name: string,
    images: string[],
    metadata: {
        title_en: string,
        title_pt: string,
        description_en: string,
        description_pt: string,
        minimum_brl: number,
        minimum_usd: number,
        total_sold: number,
        [key: string]: any
    },
}

export interface Cart {
    products: Product[],
    total: number,
}

export interface Customer {
    id: string,
    name: string,
    email: string
}

export interface Order {
    customer: Customer,
    currency: string,
    products: Product[]
}