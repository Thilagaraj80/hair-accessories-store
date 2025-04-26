import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  setProducts: (products: Product[]) => void;
}

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        cart: [],
        setProducts: (products) => set({ products }),
        addToCart: (product) => {
          const cart = get().cart;
          const existing = cart.find((item) => item.id === product.id);
        
          if (existing) {
            // If the product already exists in cart, increment its quantity
            set({
              cart: cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            });
          } else {
            // If it's a new product, add it to cart with quantity 1
            set({ cart: [...cart, { ...product, quantity: 1 }] });
          }
        },

        updateQuantity: (id: string, operation: 'increase' | 'decrease') => {
          const cart = get().cart;
          set({
            cart: cart.map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: operation === 'increase' ? item.quantity + 1 : item.quantity - 1,
                  }
                : item
            ),
          });
        },
        
        removeFromCart: (id) => {
          set({ cart: get().cart.filter((item) => item.id !== id) });
        },
        clearCart: () => set({ cart: [] }),
      }),
      { name: 'hair-accessories-store' }
    )
  )
);
