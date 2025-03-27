import { TbStarFilled } from 'react-icons/tb';
import useCartStore from '../stores/cartStore';
import { CartItem } from 'types/cart';
import Button from './button';

export default function CartList() {
  const cart: CartItem[] = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const totalAmount = cart.reduce(
    (total, item) => total + Number(item.quantity) * item.price,
    0,
  );

  return (
    <div className="container">
      <h1 className="text-primary font-bold">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="w-full text-center">
          <img src="/empty-cart.svg" className="w-1-3 mb-10" />
          <p className="text-primary font-bold">Your cart is empty.</p>
        </div>
      ) : (
        <div>
          <div className="grid">
            {cart.map((item: CartItem) => (
              <div key={item.id} className="grid-item">
                <img src={item.thumbnail} alt={item.title} width="100%" />

                <div className="card-body">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
                <div className="flex card-body">
                  <p className="text-sm text-gray-600">Price: ${item.price}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-600">
                    Total: {(Number(item.quantity) * item.price).toFixed(2)}
                  </p>
                </div>
                <div className="text-sm card-body">
                  <TbStarFilled className="text-warning" />{' '}
                  <span className="ml-2 text-gray-500">({item.rating})</span>
                </div>
                <div className="text-center mb-10">
                  <Button
                    onClick={() => removeFromCart(item.id)}
                    label="Remove"
                    customClass="danger"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-30">
            <h3 className="text-lg font-semibold">
              Total Amount:{' '}
              <span className="text-green-600">${totalAmount.toFixed(2)}</span>
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
