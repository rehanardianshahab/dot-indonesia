import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import React from 'react';
import { TbChevronRight, TbStarHalfFilled } from 'react-icons/tb';
import CartButton from '../components/cart-button';

export const Route = createFileRoute('/product_/$productName/$productId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { productId } = useParams({ from: Route.id });
  const [product, setProduct] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        setError(null);
        // @ts-ignore
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/${productId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong while fetching the product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div className="container"><p>Loading product...</p></div>;
  }

  if (error) {
    return (
      <div className="container">
        <div className="w-full text-center">
          <img src="/not-found.svg" className="w-1-3" />
          <p className="text-primary font-bold">Product not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Breadcrum name={product.title}/>
      <div className="card">
        <div className="card-body">
          <h1 className="text-primary mb-10">{product.title}</h1>
          <div className="product-details">
            <p>{product.description}</p>
            <p><TbStarHalfFilled className="text-warning"/> {product.rating}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <div className="flex items-center">
              <img src={product.thumbnail} alt={product.title} className="w-1-3" />
              <CartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Breadcrum({name}: {name:string}) {
  return (
    <div className="flex items-center bg-disable card card-body mb-10">
      <div>
        <Link className="text-primary font-bold" to="/product">Shop</Link>
      </div>
      <div><TbChevronRight/></div>
      <div>{name}</div>
    </div>
  )
}