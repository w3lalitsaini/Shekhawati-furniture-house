import connectToDatabase from "./db";
import { StoreSettings } from "./models/StoreSettings";

export async function getStoreSettings() {
  try {
    await connectToDatabase();
    let settings = await StoreSettings.findOne().lean();
    
    if (!settings) {
      // Create default settings if none exist
      settings = await StoreSettings.create({});
    }
    
    return JSON.parse(JSON.stringify(settings));
  } catch (error) {
    console.error("Error fetching store settings:", error);
    // Return a default object if DB fails to avoid crashing the whole app
    return {
      phone: "7689044278",
      email: "sainilalit2751@gmail.com",
      address: "Nawalgarh, Rajasthan",
      socialLinks: { whatsapp: "7689044278" },
      seo: {
        title: "Shekhawati Furniture House",
        description: "Discover furniture that blends modern aesthetics with the comforting warmth of traditional craftsmanship. Built for life, designed for you.",
        keywords: ["Shekhawati Furniture", "Nawalgarh", "Handcrafted Furniture"],
      }
    };
  }
}
