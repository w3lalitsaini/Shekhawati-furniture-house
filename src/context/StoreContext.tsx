"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface StoreSettings {
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

interface StoreContextType {
  settings: StoreSettings | null;
  categories: any[];
  loading: boolean;
}

const StoreContext = createContext<StoreContextType>({ settings: null, categories: [], loading: true });

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, categoriesRes] = await Promise.all([
          fetch("/api/store-settings"),
          fetch("/api/categories")
        ]);
        const settingsData = await settingsRes.json();
        const categoriesData = await categoriesRes.json();
        setSettings(settingsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch store settings or categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <StoreContext.Provider value={{ settings, categories, loading }}>
      {children}
    </StoreContext.Provider>
  );
};
