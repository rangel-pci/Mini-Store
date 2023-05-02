"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const ProductsController_1 = __importDefault(require("../controllers/ProductsController"));
const OrdersController_1 = __importDefault(require("../controllers/OrdersController"));
const PaymentsController_1 = __importDefault(require("../controllers/PaymentsController"));
const initialInfo_1 = require("../helpers/initialInfo");
exports.routes = (0, express_1.Router)();
exports.routes.get('/ping', (req, res) => {
    return res.json({ message: '😎 App running...' });
});
exports.routes.get('/products', ProductsController_1.default.index);
exports.routes.post('/orders', OrdersController_1.default.store);
exports.routes.get('/payments/:customer_email', PaymentsController_1.default.index);
exports.routes.get('/initial-info', initialInfo_1.getInitialInfo);
