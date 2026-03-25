import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGallery extends Document {
  url: string;
  title: string;
  category: string;
  createdAt: Date;
}

const GallerySchema: Schema<IGallery> = new Schema(
  {
    url: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, default: "Project" },
  },
  { timestamps: true }
);

export const Gallery: Model<IGallery> = mongoose.models.Gallery || mongoose.model<IGallery>("Gallery", GallerySchema);
