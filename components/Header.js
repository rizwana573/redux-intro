import { Link } from "react-router";
import { useSelector } from "react-redux";

const Header = () => {
  const cartIconUrl = new URL("../assets/cart-icon.svg", import.meta.url).href;
  const cartItems = useSelector((state) => state.cartItems);

  console.log(cartItems);

  return (
    <header>
      <div className="header-contents">
        <h1>
          <Link to="/">MyShoppy</Link>
        </h1>
        <Link className="cart-icon" to="/cart">
          <img src={cartIconUrl} alt="cart-icon" />
          <div className="cart-items-count">
            {cartItems.reduce((acc, current) => acc + current.quantity, 0)}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
