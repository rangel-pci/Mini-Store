import { Request, Response, Router } from "express"
import ProductsController from "../controllers/ProductsController"
import OrdersController from "../controllers/OrdersController"
import PaymentsController from "../controllers/PaymentsController"
import { getInitialInfo } from "../helpers/initialInfo"

export const routes = Router()
routes.get('/ping', (req, res) => {
    return res.json({message: '😎 App running...'})
})
routes.get('/products', ProductsController.index)
routes.post('/orders', OrdersController.store)
routes.get('/payments/:customer_id', PaymentsController.find)
routes.get('/initial-info', getInitialInfo)