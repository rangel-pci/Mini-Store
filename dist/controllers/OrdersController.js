"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrdersService_1 = __importDefault(require("../services/OrdersService"));
class OrdersController {
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                products: req.body.products,
                currency: req.body.currency,
                customer: req.body.customer ? Object.assign(Object.assign({}, req.body.customer), { description: `Customer created at ${process.env.APP_NAME}.` }) : null,
                message: req.body.message,
            };
            const { error, client_secret } = yield OrdersService_1.default.createOrder(data);
            if (error)
                return res.status(error.status).json({ message: error.message });
            return res.json({ client_secret });
        });
    }
}
exports.default = new OrdersController();
