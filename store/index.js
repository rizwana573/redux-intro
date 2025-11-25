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

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

