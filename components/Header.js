import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import {
  // updateAllProducts,
  // fetchProducts,
  // fetchProductsError,
  fetchProductsData,
} from "../store/slices/productsSlice.js";
import {
  // loadCartItems,
  // fetchCartItems,
  // fetchCartItemsError,
  getCartItemList,
  fetchCartItemsData,
} from "../store/slices/cartSlice.js";
import { useEffect } from "react";
// import { fetchData } from "../store/middleware/api.js";

export default function Header() {
  const cartIcon = new URL("../assets/cart-icon.svg", import.meta.url);
  const cartItems = useSelector(getCartItemList);

  const cartQuantity = cartItems.reduce(
    (acc, current) => acc + current.quantity,
    0
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsData);
    dispatch(fetchCartItemsData);
  }, []);
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
  );
}
