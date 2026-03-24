"use client";

import { useState, useEffect, useCallback } from "react";
import { CartItem } from "@/types";

const CART_KEY = "sfh_cart";

function getStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getStoredCart());
  }, []);

  const persist = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem(CART_KEY, JSON.stringify(newItems));
  };

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    const current = getStoredCart();
    const idx = current.findIndex((i) => i.productId === item.productId);
    if (idx > -1) {
      current[idx].quantity += 1;
    } else {
      current.push({ ...item, quantity: 1 });
    }
    persist(current);
  }, []);

  const removeItem = useCallback((productId: string) => {
    const current = getStoredCart().filter((i) => i.productId !== productId);
    persist(current);
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const current = getStoredCart().map((i) =>
      i.productId === productId ? { ...i, quantity: Math.max(1, quantity) } : i
    );
    persist(current);
  }, []);

  const clearCart = useCallback(() => {
    persist([]);
  }, []);

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, addItem, removeItem, updateQuantity, clearCart, totalAmount, totalItems };
}
