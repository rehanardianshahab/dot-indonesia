import { createFileRoute } from '@tanstack/react-router';
import CartList from '../components/cart-list';

export const Route = createFileRoute('/cart')({
  component: Cart,
});

function Cart() {
  return <><CartList/></>;
}
