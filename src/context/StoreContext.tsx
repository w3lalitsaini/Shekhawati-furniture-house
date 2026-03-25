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
  loading: boolean;
}

const StoreContext = createContext<StoreContextType>({ settings: null, loading: true });

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/store-settings");
        const data = await res.json();
        setSettings(data);
      } catch (error) {
        console.error("Failed to fetch store settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  return (
    <StoreContext.Provider value={{ settings, loading }}>
      {children}
    </StoreContext.Provider>
  );
};
