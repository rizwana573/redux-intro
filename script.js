import { createStore, combineReducers } from "redux";
import productsReducer from "./productsReducer";
import cartReducer, {
  addItemToCart,
  removeItemFromCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} from "./cartReducer";
import wishListReducer, {
  addItemToWishList,
  removeItemFromWishList,
} from "./wishListReducer";

function myCombineReducers(reducers) {
  const reducersKeys = Object.keys(reducers);

  return function (state = {}, action) {
    const nextState = {};

    for (let i = 0; i < reducersKeys.length; i++) {
      const key = reducersKeys[i];
      const reducer = reducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
    }

    return nextState;
  };
}

const reducer = myCombineReducers({
  products: productsReducer,
  cartItems: cartReducer,
  wishList: wishListReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.dispatch(addItemToCart(1, 1));
console.log(store.getState());
store.dispatch(addItemToCart(10, 1));
console.log(store.getState());
store.dispatch(removeItemFromCart(1,1));
console.log(store.getState());
store.dispatch(increaseCartItemQuantity(10, 4));
console.log(store.getState());
store.dispatch(decreaseCartItemQuantity(10,1));
console.log(store.getState());
store.dispatch(addItemToWishList(10));
store.dispatch(addItemToWishList(2));
console.log(store.getState());
store.dispatch(removeItemFromWishList(10));
console.log(store.getState());
