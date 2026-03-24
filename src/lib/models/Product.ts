import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: mongoose.Types.ObjectId;
  material?: string;
  stock: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    material: { type: String },
    stock: { type: Number, required: true, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
