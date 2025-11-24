import { createStore, combineReducers } from "redux";
import productsReducer from "./productsReducer";
import cartReducer, {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_ITEM_INCREASE_QUANTITY,
  CART_ITEM_DECREASE_QUANTITY,
} from "./cartReducer";
import wishListReducer, {
  WISHLIST_ADD_ITEM,
  WISHLIST_REMOVE_ITEM,
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

store.dispatch({
  type: CART_ADD_ITEM,
  payload: { productId: 1, quantity: 1 },
});
console.log(store.getState());
store.dispatch({
  type: CART_ADD_ITEM,
  payload: { productId: 10, quantity: 1 },
});
console.log(store.getState());
store.dispatch({
  type: CART_REMOVE_ITEM,
  payload: { productId: 1, quantity: 1 },
});
console.log(store.getState());
store.dispatch({
  type: CART_ITEM_INCREASE_QUANTITY,
  payload: { productId: 10, quantity: 4 },
});
console.log(store.getState());
store.dispatch({
  type: CART_ITEM_DECREASE_QUANTITY,
  payload: { productId: 10, quantity: 2 },
});
console.log(store.getState());
store.dispatch({
  type: WISHLIST_ADD_ITEM,
  payload: { productId: 10 },
});
store.dispatch({
  type: WISHLIST_ADD_ITEM,
  payload: { productId: 1 },
});
console.log(store.getState());
store.dispatch({
  type: WISHLIST_REMOVE_ITEM,
  payload: { productId: 10 },
});
console.log(store.getState());
