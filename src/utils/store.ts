import { ActionType, CartType } from "@/types/types"
import { persist } from "zustand/middleware";
import { create } from "zustand/react"

const INITIAL_STATE: CartType = {
    products:[],
    totalItems:0,
    totalPrice:0,
};
export const useCartStore = create(
  persist<CartType & ActionType>((set, get) => ({
    products: INITIAL_STATE.products,
    totalItems: INITIAL_STATE.totalItems,
    totalPrice: INITIAL_STATE.totalPrice,
    addTocart: (item) => {
      const products = get().products;
      const productInState = products.find((p) => p.cartId === item.cartId);

      if (productInState) {
        const updatedProducts = products.map((p) =>
          p.cartId === productInState.cartId
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );

        set((state) => ({
          products: updatedProducts,
          totalItems: state.totalItems + item.quantity,
          totalPrice: state.totalPrice + item.price * item.quantity,
        }));

        return;
      }

      // add new item
      set((state) => ({
        products: [...state.products, item],
        totalItems: state.totalItems + item.quantity,
        totalPrice: state.totalPrice + item.price * item.quantity,
      }));
    },

    clearCart: () =>
      set(() => ({
        products: [],
        totalItems: 0,
        totalPrice: 0,
      })),

    removeFromCart: (cartId) => {
      set((state) => {
        const productToRemove = state.products.find((p) => p.cartId === cartId);
        if (!productToRemove) return state;

        return {
          products: state.products.filter((p) => p.cartId !== cartId),
          totalItems: state.totalItems - productToRemove.quantity,
          totalPrice: state.totalPrice - productToRemove.price * productToRemove.quantity,
        };
      });
    },

    increaseQuantity: (cartId) => {
      const item = get().products.find((p) => p.cartId === cartId);
      if (!item) return;

      set((state) => ({
        products: state.products.map((p) =>
          p.cartId === cartId ? { ...p, quantity: p.quantity + 1 } : p
        ),
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + item.price,
      }));
    },

    decreaseQuantity: (cartId) => {
      const item = get().products.find((p) => p.cartId === cartId);
      if (!item) return;

      if (item.quantity <= 1) {
        set((state) => ({
          products: state.products.filter((p) => p.cartId !== cartId),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - item.price,
        }));
        return;
      }

      set((state) => ({
        products: state.products.map((p) =>
          p.cartId === cartId ? { ...p, quantity: p.quantity - 1 } : p
        ),
        totalItems: state.totalItems - 1,
        totalPrice: state.totalPrice - item.price,
      }));
    },
  }), { name: "cart-storage" })
);
