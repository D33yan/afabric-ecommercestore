"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  incrementQuantity: (itemId: number) => void;
  decrementQuantity: (itemId: number) => void;
  clearCart: () => void;
  totalAmount: number;
  totalItems: number;
  getItem: (itemId: number) => CartItem | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity < 0) return;
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const incrementQuantity = (itemId: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (itemId: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getItem = (itemId: number) => {
    return cartItems.find((item) => item.id === itemId);
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        totalAmount,
        totalItems,
        getItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};