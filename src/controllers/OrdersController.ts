import { Request, Response } from "express";
import OrdersService from "../services/OrdersService";
import { Order } from '../global/types';

class OrdersController{
    public async store(req: Request, res: Response){
        const data: Order = { 
            products: req.body.products,
            currency: req.body.currency,
            customer: req.body.customer ? 
            { 
                ...req.body.customer, 
                description: `Customer created at ${process.env.APP_NAME}.` 
            }: null,
            message: req.body.message,
        }

        const { error, client_secret } = await OrdersService.createOrder(data)
        if(error) return res.status(error.status).json({ message: error.message })
        
        return res.json({ client_secret })
    }
}

export default new OrdersController()