import { Link } from "@tanstack/react-router";
import useCartStore from "../stores/cartStore";
import { TbShoppingCart } from "react-icons/tb";

export default function Navbar() {
  const menus = [
    {
      link: "/",
      label: "Home",
    },
    {
      link: "/todo",
      label: "Todo",
    },
    {
      link: "/product",
      label: "Shop",
    },
    {
      link: "/login",
      label: "Login",
    },
  ];

  const cart = useCartStore((state) => state.cart);

  const cartCount = cart.reduce((total, item) => total + Number(item.quantity), 0);

  return (
    <div className="navbar container">
      <div className="navbar-body">
        {menus.map((data, index) => (
          <Link
            key={index}
            to={data.link}
            className="[&.active]:font-bold"
          >
            {data.label}
          </Link>
        ))}
      </div>
      <div className="">
        <Link to="/cart" className="text-primary"><TbShoppingCart/></Link>
        <span>{ cartCount }</span>
      </div>
    </div>
  );
}
