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
class PaymentsService {
    /**
     * List succeeded payments
     */
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield stripe_1.stripe.paymentIntents.search({
                query: `status: 'succeeded'`, expand: ['data.customer']
            });
            return response.data;
        });
    }
    createPaymentIntent(payment) {
        return __awaiter(this, void 0, void 0, function* () {
            payment.automatic_payment_methods = { enabled: true };
            const paymentIntent = yield stripe_1.stripe.paymentIntents.create(payment);
            return paymentIntent;
        });
    }
    search(customer_email) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield stripe_1.stripe.paymentIntents.search({
                query: `email: ${customer_email} AND status: succeeded`,
            });
            const payment_intents = response.data;
            return payment_intents;
        });
    }
}
exports.default = new PaymentsService();
