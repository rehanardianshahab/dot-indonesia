import { Link, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import useCartStore from '../stores/cartStore';
import { TbShoppingCart } from 'react-icons/tb';
import Button from './button';

export default function Navbar() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const menus = [
    { link: '/', label: 'Home' },
    { link: '/todo', label: 'Todo' },
    { link: '/product', label: 'Shop' },
    { link: '/login', label: 'Login' },
    { link: '/register', label: 'Register' },
  ];

  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce(
    (total, item) => total + Number(item.quantity),
    0,
  );

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
    setIsLogin(isAuthenticated);
  }, []);

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLogin(false);
    navigate({ to: '/', replace: true });
  };

  return (
    <div className="navbar container">
      <div className="navbar-body flex items-center gap-4">
        {menus.map((data, index) => {
          if (isLogin && ['/register', '/login'].includes(data.link))
            return null;

          return (
            <Link key={index} to={data.link} className="[&.active]:font-bold">
              {data.label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Link to="/cart" className="text-primary">
            <TbShoppingCart size={24} />
          </Link>
          <span className="font-semibold">{cartCount}</span>
        </div>

        {isLogin && (
          <Button label="Logout" customClass="primary" onClick={handleLogout} />
        )}
      </div>
    </div>
  );
}
