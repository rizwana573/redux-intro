export const CART_ADD_ITEM = "cart/addItem";
export const CART_REMOVE_ITEM = "cart/removeItem";
export const CART_ITEM_INCREASE_QUANTITY = "cart/increaseItemQuantity";
export const CART_ITEM_DECREASE_QUANTITY = "cart/decreaseItemQuantity";

export default function cartReducer(state=[], action){
   switch (action.type) {
    case CART_ADD_ITEM:
      return  [...state, action.payload] 
    case CART_REMOVE_ITEM:
      return  state.filter(
          (cartItem) => cartItem.productId !== action.payload.productId
        )
    case CART_ITEM_INCREASE_QUANTITY:
      return state.map((cartItem) => {
          if (cartItem.productId === action.payload.productId)
            return { ...cartItem, quantity: cartItem.quantity + action.payload.quantity };
          return cartItem;
        })
    case CART_ITEM_DECREASE_QUANTITY:
      return state
          .map((cartItem) => {
            if (cartItem.productId === action.payload.productId)
              return { ...cartItem, quantity: cartItem.quantity - action.payload.quantity };
            return cartItem;
          })
          .filter((cartItem) => cartItem.quantity > 0)
    default:
      return state;
  }
}
export function addItemToCart(productId, quantity){
    return {
  type: CART_ADD_ITEM,
  payload: {productId: productId, quantity: quantity },
}
}
export function removeItemFromCart(productId, quantity){
    return {
  type: CART_REMOVE_ITEM,
  payload: {productId: productId, quantity: quantity },
}
}
export function increaseCartItemQuantity(productId, quantity){
    return {
  type: CART_ITEM_INCREASE_QUANTITY,
  payload: {productId: productId, quantity: quantity },
}
}
export function decreaseCartItemQuantity(productId, quantity){
    return {
  type: CART_ITEM_DECREASE_QUANTITY,
  payload: {productId: productId, quantity: quantity },
}
}