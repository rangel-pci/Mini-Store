import { Request, Response } from "express";
import PaymentsService from "../services/PaymentsService";

class PaymentsController{
    public async index(req: Request, res: Response){
        const payments = await PaymentsService.get()
        const paymentsWithSpecificProperties = payments.map(product => {
            return (({ id, currency, amount, created }) => ({ id, currency, amount, created }))(product)
        })
        return res.json(paymentsWithSpecificProperties)
    }
    public async find(req: Request, res: Response){
        const payments = await PaymentsService.search(req.params.customer_id)
        const paymentsWithSpecificProperties = payments.map(product => {
            return (({ id, currency, amount, created }) => ({ id, currency, amount, created }))(product)
        })
        return res.json(paymentsWithSpecificProperties)
    }
}

export default new PaymentsController()