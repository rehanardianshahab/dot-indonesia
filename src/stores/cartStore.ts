import { CartItem } from 'types/cart';
import { create } from 'zustand';
import { Bounce, toast } from 'react-toastify';

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
}

const notifySuccess = (message: string) =>
  toast.success(message, {
    position: 'top-center',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  });

const notifyError = (message: string) =>
  toast.error(message, {
    position: 'top-center',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  });

const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) => Number(cartItem.id) === Number(item.id),
      );
      if (existingItem) {
        notifySuccess(
          `Add ${existingItem.title} qty ${(existingItem.quantity || 0) + 1}`,
        );
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: (cartItem.quantity || 0) + 1 }
              : cartItem,
          ),
        };
      } else {
        notifySuccess('Added new product to cart');
        return {
          cart: [...state.cart, { ...item, quantity: 1 }],
        };
      }
    }),
  removeFromCart: (id) => {
    notifyError('Product removed from cart');
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));
  },
}));

export default useCartStore;
