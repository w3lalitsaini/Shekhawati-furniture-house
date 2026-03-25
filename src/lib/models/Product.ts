import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: mongoose.Types.ObjectId;
  material?: string;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
    unit: string;
  };
  weight?: number;
  woodType?: string;
  warranty?: string;
  stock: number;
  isFeatured: boolean;
  isNewItem: boolean;
  isCustom: boolean;
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
    dimensions: {
      width: { type: Number },
      height: { type: Number },
      depth: { type: Number },
      unit: { type: String, default: "cm" },
    },
    weight: { type: Number },
    woodType: { type: String },
    warranty: { type: String },
    stock: { type: Number, required: true, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isNewItem: { type: Boolean, default: false },
    isCustom: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
