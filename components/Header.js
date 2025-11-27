import {useSelector } from "../my-react-redux";
import { Link } from 'react-router'

export default function Header() {
    const cartIcon = new URL('../assets/cart-icon.svg', import.meta.url);
    const cartItems = useSelector(state => state.cartItems);
    const cartQuantity = cartItems.reduce((acc, current)=> acc+current.quantity, 0);
  return (
    <header>
      <div className="header-contents">
        <h1>
          <Link to="/">MyShoppee</Link>
        </h1>
        <Link className="cart-icon" to="/cart">
          <img src={cartIcon} alt="cart-icon" />
          <div className="cart-items-count">{cartQuantity}</div>
        </Link>
      </div>
    </header>
  )
}