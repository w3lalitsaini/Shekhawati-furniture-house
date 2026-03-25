import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHomeSettings extends Document {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    primaryBtnText: string;
    secondaryBtnText: string;
    images: string[]; // Cloudinary URLs
  };
  featuredCategories: string[]; // Category names or IDs
}

const HomeSettingsSchema: Schema<IHomeSettings> = new Schema(
  {
    hero: {
      title: { type: String, default: "Premium Furniture & Aluminum Work" },
      subtitle: { type: String, default: "Elevate Your Living With Timeless Craft" },
      description: { type: String, default: "Discover furniture that blends modern aesthetics with the comforting warmth of traditional craftsmanship. Built for life, designed for you." },
      primaryBtnText: { type: String, default: "Shop Collection" },
      secondaryBtnText: { type: String, default: "Custom Project" },
      images: { type: [String] },
    },
    featuredCategories: { type: [String] },
  },
  { timestamps: true }
);

export const HomeSettings: Model<IHomeSettings> = 
  mongoose.models.HomeSettings || mongoose.model<IHomeSettings>("HomeSettings", HomeSettingsSchema);
