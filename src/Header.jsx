import { Link } from "@tanstack/react-router";
import { useContext } from "react";
import { CartContext } from "./contexts";

export default function Header() {
  const [cart] = useContext(CartContext); // not using setCart, so don't destructure it

  return (
    <nav>
      <Link to="/">
        <h1 className="logo">Padre Gino's Pizza</h1>
      </Link>
      <div className="nav-cart">
        🛒<span className="nav-cart-number">{cart.length}</span>
      </div>
    </nav>
  );
}
