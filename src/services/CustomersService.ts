import { stripe } from "../configs/stripe"
import { Customer } from "../global/types"

class CustomersService{

    async createCustomer(customer: Customer){
        const responseCustomer = await stripe.customers.create({
            ...customer
        })

        return responseCustomer
    }

    async searchCustomer(email: string, searchQuery: string | undefined = undefined){
        const query = searchQuery ?? `email: '${email}'`
        const response = await stripe.customers.search({
            query,
        })

        return response.data[0]
    }

}

export default new CustomersService()