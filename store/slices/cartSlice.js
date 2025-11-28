import { produce } from "immer";

//Action Types
export const CART_ADD_ITEM = "cart/addItem";
export const CART_REMOVE_ITEM = "cart/removeItem";
export const CART_ITEM_INCREASE_QUANTITY = "cart/increaseItemQuantity";
export const CART_ITEM_DECREASE_QUANTITY = "cart/decreaseItemQuantity";


//Action Creators
export function addItemToCart(productData) {
  return {
    type: CART_ADD_ITEM,
    payload: productData,
  };
}
export function removeItemFromCart(productId) {
  return {
    type: CART_REMOVE_ITEM,
    payload: { productId },
  };
}
export function increaseCartItemQuantity(productId) {
  return {
    type: CART_ITEM_INCREASE_QUANTITY,
    payload: { productId },
  };
}
export function decreaseCartItemQuantity(productId) {
  return {
    type: CART_ITEM_DECREASE_QUANTITY,
    payload: { productId },
  };
}
//Reducer
export default function cartReducer(initialState = [], action) {
  return produce(initialState, (state) => {
    const existingItemIndex = initialState.findIndex(
      (cartItem) => cartItem.productId === action.payload.productId
    );
    switch (action.type) {
      case CART_ADD_ITEM:
        if (existingItemIndex !== -1) {
          state[existingItemIndex].quantity += 1;
          break;
        }
        state.push({ ...action.payload, quantity: 1 });
        break;
      case CART_REMOVE_ITEM:
        state.splice(existingItemIndex, 1);
        break;
      case CART_ITEM_INCREASE_QUANTITY:
        state[existingItemIndex].quantity += 1;
        break;
      case CART_ITEM_DECREASE_QUANTITY:
        state[existingItemIndex].quantity -= 1;
        if (state[existingItemIndex].quantity === 0)
          state.splice(existingItemIndex, 1);
        break;
    }
    return state;
  });
}
