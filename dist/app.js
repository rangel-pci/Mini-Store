"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("./routes/index");
const StripeWebhooksController_1 = __importDefault(require("./controllers/StripeWebhooksController"));
dotenv_1.default.config({ path: "./.env" });
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.post('/api/v1/stripe_webhooks', express_1.default.raw({ type: 'application/json' }), StripeWebhooksController_1.default.index);
exports.app.use(express_1.default.json());
exports.app.use('/api/v1', index_1.routes);
