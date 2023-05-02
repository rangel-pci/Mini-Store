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
const PaymentsService_1 = __importDefault(require("../services/PaymentsService"));
class PaymentsController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payments = yield PaymentsService_1.default.get();
            const paymentsWithSpecificProperties = payments.map(product => {
                return (({ id, currency, amount, created }) => ({ id, currency, amount, created }))(product);
            });
            return res.json(paymentsWithSpecificProperties);
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payments = yield PaymentsService_1.default.search(req.params.customer_email);
            const paymentsWithSpecificProperties = payments.map(product => {
                return (({ id, currency, amount, created }) => ({ id, currency, amount, created }))(product);
            });
            return res.json(paymentsWithSpecificProperties);
        });
    }
}
exports.default = new PaymentsController();
