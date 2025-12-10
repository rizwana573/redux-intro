// import { combineReducers } from "redux";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import wishListReducer from "./slices/wishListSlice";
import { configureStore } from '@reduxjs/toolkit'
import {func} from "./middleware/func.js"
import {apiMiddleware} from "./middleware/api.js"

// function myCombineReducers(reducers) {
//   const reducersKeys = Object.keys(reducers);

//   return function (state = {}, action) {
//     const nextState = {};

//     for (let i = 0; i < reducersKeys.length; i++) {
//       const key = reducersKeys[i];
//       const reducer = reducers[key];
//       const previousStateForKey = state[key];
//       const nextStateForKey = reducer(previousStateForKey, action);
//       nextState[key] = nextStateForKey;
//     }

//     return nextState;
//   };
// }

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cartItems: cartReducer,
    wishList: wishListReducer,
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware().concat(apiMiddleware, func)
});
