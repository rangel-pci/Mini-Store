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
class ProductsService {
    get(supportedParams = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield stripe_1.stripe.products.list(supportedParams);
            const products = response.data;
            return products;
        });
    }
    getTotalAmountFromProducts(products, currency) {
        return products.reduce((total_amount, product) => {
            // return total_amount + parseInt(product.payment_amount.toString().replace('.', '').replace(',', ''))
            return total_amount + parseInt(product.metadata[`minimum_${currency}`].toString().replace('.', '').replace(',', ''));
        }, 0);
    }
    /**
     * Checks whether the amount to be paid is within the acceptable range of the product at stripe or not
     */
    isValueWithinAcceptableRange(currency, products, stripe_products) {
        if (!Array.isArray(products)) {
            products = [products];
        }
        var isValid = true;
        products.forEach(product => {
            const stripe_product = stripe_products.find(stp => stp.id == product.id);
            if (!stripe_product ||
                product.payment_amount < parseInt(stripe_product.metadata['minimum_' + currency]) ||
                product.payment_amount > parseInt(stripe_product.metadata['maximum' + currency])) {
                isValid = false;
            }
        });
        return isValid;
    }
}
exports.default = new ProductsService();
