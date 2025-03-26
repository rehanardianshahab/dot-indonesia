import React from 'react';
import useCartStore from '../stores/cartStore';
import { TbShoppingCartPlus } from 'react-icons/tb';
import { CartItem } from '../types/cart';

const CartButton: React.FC<{ product: CartItem }> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="text-accent cursor-pointer" onClick={() => addToCart(product)}>
      <TbShoppingCartPlus />
    </div>
  );
};

export default CartButton;
