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
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = require("../configs/stripe");
class CustomersService {
    handlePaymentIntentSucceeded(payment_intent_event) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const payment_intent = payment_intent_event;
            const products_ids = [];
            const amount_paid_per_product = [];
            // Takes each product_id,amount_paid present in the paymentIntent.metadata
            let i = 1;
            do {
                const prod = (_b = (_a = payment_intent.metadata['product_' + i]) === null || _a === void 0 ? void 0 : _a.split(',')) !== null && _b !== void 0 ? _b : 'stop';
                if (typeof prod === 'string') {
                    break;
                }
                products_ids.push(prod[0]);
                amount_paid_per_product.push({ id: prod[0], amount: parseInt(prod[1]) });
                i++;
            } while (true);
            // Update products total_raised_usd/total_raised_brl and total_sold
            if (products_ids.length > 0) {
                const response = yield stripe_1.stripe.products.list({ active: true, ids: products_ids });
                response.data.forEach(product => {
                    var _a, _b;
                    let total_raised = parseInt(product.metadata['total_raised_' + payment_intent.currency]);
                    total_raised += (_b = (_a = amount_paid_per_product.find(item => item.id === product.id)) === null || _a === void 0 ? void 0 : _a.amount) !== null && _b !== void 0 ? _b : 0;
                    const data = {
                        ['total_raised_' + payment_intent.currency]: total_raised,
                        total_sold: parseInt(product.metadata['total_sold']) + 1,
                    };
                    stripe_1.stripe.products.update(product.id, { metadata: data });
                });
            }
        });
    }
}
exports.default = new CustomersService();
