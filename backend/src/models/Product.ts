import mongoose, { Model } from 'mongoose';

export interface ProductDoc extends mongoose.Document {
  id: number; // numeric id used by frontend
  name: string;
  price: number;
  image: string;
  description?: string;
}

const productSchema = new mongoose.Schema<ProductDoc>(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export const ProductModel: Model<ProductDoc> =
  mongoose.models.Product || mongoose.model<ProductDoc>('Product', productSchema);


