import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStoreSettings extends Document {
  phone: string;
  email: string;
  address: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

const StoreSettingsSchema: Schema<IStoreSettings> = new Schema(
  {
    phone: { type: String, default: "7689044278" },
    email: { type: String, default: "sainilalit2751@gmail.com" },
    address: { type: String, default: "Nawalgarh, Rajasthan" },
    socialLinks: {
      facebook: { type: String },
      instagram: { type: String },
      whatsapp: { type: String, default: "7689044278" },
    },
    seo: {
      title: { type: String, default: "Shekhawati Furniture House" },
      description: { type: String, default: "Discover furniture that blends modern aesthetics with the comforting warmth of traditional craftsmanship. Built for life, designed for you." },
      keywords: { type: [String], default: ["Shekhawati Furniture", "Nawalgarh", "Handcrafted Furniture"] },
    },
  },
  { timestamps: true }
);

export const StoreSettings: Model<IStoreSettings> = 
  mongoose.models.StoreSettings || mongoose.model<IStoreSettings>("StoreSettings", StoreSettingsSchema);
