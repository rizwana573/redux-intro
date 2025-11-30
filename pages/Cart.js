import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";

export default function Cart() {
  const cartItems = useSelector(({ products, cartItems }) =>
    cartItems.list.map(({ productId, quantity }) => {
      const cartProducts = products.list.find(
        (product) => product.id === productId
      );
      return {...cartProducts, quantity};
    })
    .filter(({title}) => title)
  );

  const isLoading = useSelector(({cartItems}) => cartItems.loading);
  const cartItemsErr = useSelector(({cartItems}) => cartItems.error);

  return isLoading ? (
    <h1 style={{ textAlign: "center" }}>Loading.... </h1>
  ) : (
    <>
    {cartItemsErr ? <h1 style={{ textAlign: "center" }}> {cartItemsErr} </h1>  : 
     <div className="cart-container">
      <h2>Items in Your Cart</h2>
      <div className="cart-items-container">
        <div className="cart-header cart-item-container">
          <div className="cart-item">Item</div>
          <div className="item-price">Price</div>
          <div className="quantity">Quantity</div>
          <div className="total">Total</div>
        </div>
        {cartItems.map(
          ({ id, title, rating, price, image, quantity }) => (
            <CartItem
              key={id}
              productId={id}
              title={title}
              price={price}
              quantity={quantity}
              imageUrl={image}
              rating={rating.rate}
            />
          )
        )}
        <div className="cart-header cart-item-container">
          <div></div>
          <div></div>
          <div></div>
          <div className="total">
            $
            {cartItems.reduce(
              (acc, current) => acc + current.price * current.quantity,
              0
            )}
          </div>
        </div>
      </div>
    </div>} 
     
    </>
   
  );
}
