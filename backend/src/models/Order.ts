import mongoose, { Model } from 'mongoose';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  quantity: number;
}

export interface OrderDoc extends mongoose.Document {
  name: string;
  email: string;
  total: number;
  items: OrderItem[];
  createdAt: Date;
}

const orderItemSchema = new mongoose.Schema<OrderItem>(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema<OrderDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    total: { type: Number, required: true },
    items: { type: [orderItemSchema], required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const OrderModel: Model<OrderDoc> =
  mongoose.models.Order || mongoose.model<OrderDoc>('Order', orderSchema);

