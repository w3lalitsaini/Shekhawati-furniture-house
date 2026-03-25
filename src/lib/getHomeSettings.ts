import connectToDatabase from "./db";
import { HomeSettings } from "./models/HomeSettings";
import { StoreSettings } from "./models/StoreSettings";

export async function getHomeSettings() {
  try {
    await connectToDatabase();
    const [home, store] = await Promise.all([
      HomeSettings.findOne().lean(),
      StoreSettings.findOne().lean(),
    ]);

    let activeHome = home;
    if (!activeHome) {
      activeHome = await HomeSettings.create({
        hero: {
          title: "Premium Furniture & Aluminum Work",
          subtitle: "Elevate Your Living With Timeless Craft",
          description: "Discover furniture that blends modern aesthetics with the comforting warmth of traditional craftsmanship. Built for life, designed for you.",
          primaryBtnText: "Shop Collection",
          secondaryBtnText: "Custom Project",
          images: [
            "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&q=80",
            "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=800&q=80",
          ],
        },
      });
    } else if (activeHome.hero.title === "Bespoke Elegance" || activeHome.hero.subtitle === "Furniture for the Discerning") {
      // Force individual update for existing users with old data
      await HomeSettings.updateOne({ _id: activeHome._id }, {
        $set: {
          "hero.title": "Premium Furniture & Aluminum Work",
          "hero.subtitle": "Elevate Your Living With Timeless Craft",
          "hero.description": "Discover furniture that blends modern aesthetics with the comforting warmth of traditional craftsmanship. Built for life, designed for you."
        }
      });
      // Reflect in local object for immediate SSR
      activeHome.hero.title = "Premium Furniture & Aluminum Work";
      activeHome.hero.subtitle = "Elevate Your Living With Timeless Craft";
      activeHome.hero.description = "Discover furniture that blends modern aesthetics with the comforting warmth of traditional craftsmanship. Built for life, designed for you.";
    }

    let activeStore = store;
    if (!activeStore) {
      activeStore = await StoreSettings.create({
        phone: "7689044278",
        email: "sainilalit2751@gmail.com",
        address: "Nawalgarh, Rajasthan",
        socialLinks: { whatsapp: "7689044278" },
        seo: {
          title: "Shekhawati Furniture House",
          description:
            "Premium traditional and modern minimal furniture, handcrafted in Rajasthan.",
          keywords: [
            "Shekhawati Furniture",
            "Nawalgarh",
            "Handcrafted Furniture",
          ],
        },
      });
    }

    return {
      home: JSON.parse(JSON.stringify(activeHome)),
      store: JSON.parse(JSON.stringify(activeStore)),
    };
  } catch (error) {
    console.error("Error fetching home settings:", error);
    return {
      home: {
        hero: {
          title: "Premium Furniture & Aluminum Work",
          subtitle: "Elevate Your Living With Timeless Craft",
          description: "Discover furniture that blends modern aesthetics with the comforting warmth of traditional craftsmanship. Built for life, designed for you.",
          primaryBtnText: "Shop Collection",
          secondaryBtnText: "Custom Project",
          images: [],
        },
      },
      store: {
        phone: "7689044278",
        email: "sainilalit2751@gmail.com",
        address: "Nawalgarh, Rajasthan",
      },
    };
  }
}
