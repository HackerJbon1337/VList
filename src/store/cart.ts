// Cart and UI state store using Zustand

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/products";

interface CartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
    getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product: Product) => {
                const items = get().items;
                const existingItem = items.find((item) => item.product.id === product.id);

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.product.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({ items: [...items, { product, quantity: 1 }] });
                }
            },

            removeItem: (productId: string) => {
                set({
                    items: get().items.filter((item) => item.product.id !== productId),
                });
            },

            updateQuantity: (productId: string, quantity: number) => {
                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }

                set({
                    items: get().items.map((item) =>
                        item.product.id === productId ? { ...item, quantity } : item
                    ),
                });
            },

            clearCart: () => {
                set({ items: [] });
            },

            getTotal: () => {
                return get().items.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
                );
            },

            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            },
        }),
        {
            name: "vlist-cart",
        }
    )
);

// Filter state for marketplace
interface FilterState {
    search: string;
    category: string;
    location: string;
    setSearch: (search: string) => void;
    setCategory: (category: string) => void;
    setLocation: (location: string) => void;
    resetFilters: () => void;
}

export const useFilterStore = create<FilterState>()((set) => ({
    search: "",
    category: "All",
    location: "All Campuses",

    setSearch: (search) => set({ search }),
    setCategory: (category) => set({ category }),
    setLocation: (location) => set({ location }),
    resetFilters: () =>
        set({ search: "", category: "All", location: "All Campuses" }),
}));
