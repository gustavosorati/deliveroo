import { create } from "zustand"

export interface Product {
  id: number;
  name: string;
  price: number;
  info: string;
  img: any;
}

export interface BasketState {
  products: Array<Product & { quantity: number}>;
  addProduct: (product: Product) => void;
  reduceProduct: (product: Product) => void;
  clearCart: () => void;
  items: number;
  total: number;
}

const useBasketStore = create<BasketState>()((set) => ({
  products: [],
  items: 0,
  total: 0,
  addProduct: (product) => {
    set((state) => {
        state.items += 1,
        state.total += product.price;

        const hashProduct = state.products.find((p) => p.id === product.id);

        if(hashProduct) {
          hashProduct.quantity += 1;
          return { products: [...state.products ]}
        } else {
          return { products: [...state.products, { ...product, quantity: 1 }]}
        }
    })
  },
  reduceProduct: (prodduct) => {
    set((state) => {
      state.total -= prodduct.price;
      state.items -= 1;
      return {
        products: state.products.map((p) => {
          if(p.id === prodduct.id) {
            p.quantity -= 1;
          }

          return p;
        }).filter((p) => p.quantity > 0)
      }

    })
  },
  clearCart: () => set({ products: [], items: 0, total: 0 }),
}))

export default useBasketStore
