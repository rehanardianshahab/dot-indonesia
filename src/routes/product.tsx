import { createFileRoute, Link } from '@tanstack/react-router';
import React from 'react';
import { TbStarHalfFilled } from 'react-icons/tb';
import Button from '../components/button';
import CartButton from '../components/cart-button';
import { CartItem } from '../types/cart';

export const Route = createFileRoute('/product')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container">
      <h1 className="text-primary mb-10">Shop</h1>
      <ProductList />
    </div>
  );
}

function ProductList() {
  const [products, setProducts] = React.useState<CartItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        // @ts-ignore
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/category/sports-accessories`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (err: any) {
        setError(err.message || 'Something went wrong while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  return (
    <div className="grid">
      {products.map((product: CartItem) => (
        <div className="grid-item" key={product.id}>
          <div className="card">
            <img src={product.thumbnail} width="100%"/>
            <div className="card-body gap-10">
              <h3 className="text-primary">{product.title}</h3>
              <p><TbStarHalfFilled className="text-warning"/> {product.rating}</p>
              <p><strong>${product.price}</strong></p>
              <div className="flex items-center mt-10 ">
                <div className="w-full">
                  <Link to="/product/$productName/$productId"  params={{ productId: String(product.id), productName: product.title.toLowerCase().split(' ').join('-') }}>
                    <Button label="Detail" customClass="w-full primary"/>
                  </Link>
                </div>
                <CartButton product={product}/>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
