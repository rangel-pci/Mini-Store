import { Request, Response, Router } from "express"
import ProductsController from "../controllers/ProductsController"
import OrdersController from "../controllers/OrdersController"
import PaymentsController from "../controllers/PaymentsController"
import { getInitialInfo } from "../helpers/initialInfo"

export const routes = Router()
routes.get('/products', ProductsController.index)
routes.post('/orders', OrdersController.store)
routes.get('/payments/:customer_email', PaymentsController.index)
routes.get('/initial-info', getInitialInfo)