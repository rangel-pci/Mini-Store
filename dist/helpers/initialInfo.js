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
exports.getInitialInfo = exports.getInitialInformation = void 0;
const PaymentsService_1 = __importDefault(require("../services/PaymentsService"));
const getInitialInformation = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    var total_paid_usd = 0;
    var total_paid_brl = 0;
    const payments = yield PaymentsService_1.default.get();
    payments.forEach((payment) => {
        if (payment.currency === 'usd') {
            total_paid_usd += payment.amount;
        }
        else if (payment.currency === 'brl') {
            total_paid_brl += payment.amount;
        }
    });
    const payments_messages = [];
    const max_messages = 3;
    for (let index = 0; index < max_messages; index++) {
        const random_int = (Math.floor(Math.random() * payments.length) + 1) - 1;
        const customer = payments[random_int].customer;
        payments_messages[index] = {
            customer_message: (_a = payments[random_int].metadata.customer_message) !== null && _a !== void 0 ? _a : null,
            customer_name: (_b = customer === null || customer === void 0 ? void 0 : customer.name) !== null && _b !== void 0 ? _b : null,
            amount: payments[random_int].amount,
            currency: payments[random_int].currency,
            date: payments[random_int].created
        };
    }
    return ({
        payments_usd: total_paid_usd,
        payments_brl: total_paid_brl,
        payments_messages
    });
});
exports.getInitialInformation = getInitialInformation;
const getInitialInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, exports.getInitialInformation)());
});
exports.getInitialInfo = getInitialInfo;
