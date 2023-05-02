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
const CustomersService_1 = __importDefault(require("./CustomersService"));
const PaymentsService_1 = __importDefault(require("./PaymentsService"));
const ProductsService_1 = __importDefault(require("./ProductsService"));
class OrdersService {
    createOrder(order) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            var stripe_customer = {};
            const stripe_products = yield ProductsService_1.default.get({ active: true, ids: order.products.map(product => product.id) });
            const total_payment = ProductsService_1.default.getTotalAmountFromProducts(order.products, order.currency);
            if (order.customer) {
                stripe_customer = (_a = yield CustomersService_1.default.searchCustomer(order.customer.email)) !== null && _a !== void 0 ? _a : yield CustomersService_1.default.createCustomer(order.customer);
            }
            if (!ProductsService_1.default.isValueWithinAcceptableRange(order.currency, order.products, stripe_products)) {
                return { error: { message: 'The amount to be paid is not within the acceptable range of the product.', status: 422 } };
            }
            const payment = {
                currency: order.currency,
                amount: total_payment,
                customer: (_b = stripe_customer.id) !== null && _b !== void 0 ? _b : null,
                description: `Purchase made in ${process.env.APP_NAME}. ❤️`,
                metadata: {
                    customer_message: (_c = order.message) !== null && _c !== void 0 ? _c : null,
                }
            };
            // Set payment.metadata comma separated values that contains product_id, amount_paid
            order.products.map((product, index) => {
                payment.metadata = Object.assign(Object.assign({}, payment.metadata), { [`product_${index + 1}`]: product.id + ',' + product.payment_amount });
            });
            // Call payment-intent builder and return the token for the client to continue the payment
            const paymentIntent = yield PaymentsService_1.default.createPaymentIntent(payment);
            return { client_secret: paymentIntent.client_secret };
        });
    }
}
exports.default = new OrdersService();
