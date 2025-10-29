// src/data/cartData.ts

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  quantity: number;
}

let cart: CartItem[] = [];

// 🛒 Get current cart
export const getCart = (): CartItem[] => cart;

// ➕ Add item to cart
export const addToCart = (item: CartItem): void => {
  const existing = cart.find((p) => p.id === item.id);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }
};

// ❌ Remove item by ID
export const removeFromCart = (id: number): void => {
  cart = cart.filter((item) => item.id !== id);
};

// 🧹 Clear cart
export const clearCart = (): void => {
  cart = [];
};
