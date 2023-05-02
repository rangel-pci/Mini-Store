import { stripe } from "../configs/stripe"
import { Product } from '../global/types';
import Stripe from 'stripe';

class ProductsService{
    
    async get(supportedParams: Stripe.ProductListParams | {} = {}): Promise<Stripe.Product[]> {
        const response = await stripe.products.list(supportedParams)
        const products = response.data
        return products
    }

    getTotalAmountFromProducts(products: Product[], currency: string): number {
        return products.reduce(
            (total_amount: number, product) => {
                // return total_amount + parseInt(product.payment_amount.toString().replace('.', '').replace(',', ''))
                return total_amount + parseInt(product.metadata[`minimum_${currency}`].toString().replace('.', '').replace(',', ''))
            }, 0
        )
    }

    /**
     * Checks whether the amount to be paid is within the acceptable range of the product at stripe or not
     */
    isValueWithinAcceptableRange(
        currency: string,
        products: Product | Product[],
        stripe_products: Stripe.Product[]
    ): boolean
    {
        if(!Array.isArray(products)) { products = [products] }
        
        var isValid = true;
        products.forEach(product => {
            const stripe_product = stripe_products.find(stp => stp.id == product.id)

            if(
                !stripe_product ||
                product.payment_amount < parseInt(stripe_product.metadata['minimum_' + currency]) ||
                product.payment_amount > parseInt(stripe_product.metadata['maximum' + currency])
            ){ isValid = false }
        })

        return isValid
    }
}

export default new ProductsService()