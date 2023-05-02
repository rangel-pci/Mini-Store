import { Request, Response } from "express";
import ProductsService from "../services/ProductsService";

class ProductsController{
    public async index(req: Request, res: Response){
        const products = await ProductsService.get({ active: true })
        const productsWithSpecificProperties = products.map(product => {
            return (({ id, name, images, metadata }) => ({ id, name, images, metadata }))(product)
        })

        return res.json(productsWithSpecificProperties)
    }
}

export default new ProductsController()