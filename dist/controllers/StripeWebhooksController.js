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
const stripe_1 = require("../configs/stripe");
const StripeWebhooksService_1 = __importDefault(require("../services/StripeWebhooksService"));
// Check stripe signature then call the correct event handler
class StripeWebhooksController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint_secret = process.env.STRIPE_ENDPOINT_SECRET_KEY;
            const stripe_signature = req.headers['stripe-signature'];
            let event;
            try {
                event = stripe_1.stripe.webhooks.constructEvent(req.body, stripe_signature, endpoint_secret);
            }
            catch (err) {
                res.status(400).send(`Webhook Error: ${err.message}`);
                return;
            }
            switch (event.type) {
                case 'payment_intent.succeeded':
                    const payment_intent_succeeded = event.data.object;
                    StripeWebhooksService_1.default.handlePaymentIntentSucceeded(payment_intent_succeeded);
                    break;
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }
            res.send();
        });
    }
}
exports.default = new StripeWebhooksController();
