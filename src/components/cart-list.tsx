import useCartStore from '../stores/cartStore';
import { CartItem } from 'types/cart';

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
        <>
          <ul className="space-y-4">
            {cart.map((item: CartItem) => (
              <li
                key={item.id}
                className="cart-item flex items-center gap-4 p-4 border rounded-md shadow-sm"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-md"
                />

                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">Price: ${item.price}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-600">
                    Total: {(Number(item.quantity) * item.price).toFixed(2)}
                  </p>
                  <div className="text-sm text-yellow-500 flex items-center">
                    {Array.from(
                      { length: Math.round(Number(item.rating)) },
                      (_, i) => (
                        <span key={i}>⭐</span>
                      ),
                    )}
                    <span className="ml-2 text-gray-500">({item.rating})</span>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 p-4 border-t text-right">
            <h3 className="text-lg font-semibold">
              Total Amount:{' '}
              <span className="text-green-600">${totalAmount.toFixed(2)}</span>
            </h3>
          </div>
        </>
      )}
    </div>
  );
}
