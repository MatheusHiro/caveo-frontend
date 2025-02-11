import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: CartItem, quantity?: number) => void;
  removeOneFromCart: (product: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
              ),
            };
          }

          return {
            cart: [...state.cart, { ...product, quantity }],
          };
        }),

      removeOneFromCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);
          if (existingItem) {
            if (existingItem.quantity > 1) {
              return {
                cart: state.cart.map((item) =>
                  item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
                ),
              };
            } else {
              return {
                cart: state.cart.filter((item) => item.id !== product.id),
              };
            }
          }
          return state;
        }),



      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
