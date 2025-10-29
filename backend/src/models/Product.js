"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
var mongoose_1 = require("mongoose");
var productSchema = new mongoose_1.default.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });
exports.ProductModel = mongoose_1.default.models.Product || mongoose_1.default.model('Product', productSchema);
