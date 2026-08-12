import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICustomInquiry extends Document {
  fullName: string;
  phone: string;
  email: string;
  productType: string;
  roomType: string;
  material: string;
  finish: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
    depth?: number;
    unit: "cm" | "inch";
  };
  details: string;
  budget: string;
  timeline: string;
  referenceLinks?: string[];
  images?: string[];
  status: "New" | "Contacted" | "Quoted" | "In Production" | "Completed" | "Cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const CustomInquirySchema: Schema<ICustomInquiry> = new Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    productType: { type: String, required: true },
    roomType: { type: String },
    material: { type: String },
    finish: { type: String },
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
      depth: { type: Number },
      unit: { type: String, enum: ["cm", "inch"], default: "inch" },
    },
    details: { type: String, required: true },
    budget: { type: String },
    timeline: { type: String },
    referenceLinks: [{ type: String }],
    images: [{ type: String }],
    status: {
      type: String,
      enum: ["New", "Contacted", "Quoted", "In Production", "Completed", "Cancelled"],
      default: "New",
    },
  },
  { timestamps: true }
);

export const CustomInquiry: Model<ICustomInquiry> = 
  mongoose.models.CustomInquiry || mongoose.model<ICustomInquiry>("CustomInquiry", CustomInquirySchema);
