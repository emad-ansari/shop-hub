import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import { api } from '@/api/client';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  // Load cart from backend on mount
  useEffect(() => {
    api.get('/cart').then(res => {
      setCart(res.data.items || []);
    }).catch(() => setCart([]));
  }, []);

  const addToCart = async (product: Product) => {
    try {
      const res = await api.post('/cart', product);
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === product.id);
        if (existingItem) {
          return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });
    } catch {
      // fallback local update
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === product.id);
        if (existingItem) {
          return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      await api.delete(`/cart/${productId}`);
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
    } catch {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const existing = cart.find(i => i.id === productId);
    if (!existing) return;
    try {
      await api.post('/cart', { ...existing, quantity });
      setCart(prevCart => prevCart.map(item => item.id === productId ? { ...item, quantity } : item));
    } catch {
      setCart(prevCart => prevCart.map(item => item.id === productId ? { ...item, quantity } : item));
    }
  };

  const clearCart = async () => {
    // Remove items one by one using backend endpoint for each (unless backend has clearCart)
    await Promise.all(cart.map(item => api.delete(`/cart/${item.id}`).catch(()=>{})));
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
