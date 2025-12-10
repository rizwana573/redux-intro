import { createSlice, createSelector } from "@reduxjs/toolkit";

const findIndex = (state, action) =>
  state.findIndex(
    (cartItem) => cartItem.productId === action.payload.productId
  );
const slice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },
  reducers: {
    fetchCartItems(state) {
      state.loading = true;
    },
    fetchCartItemsError(state, action) {
      state.loading = false;
      state.error = action.payload || "Something went wrong!";
    },
    loadCartItems(state, action) {
      state.loading = false;
      state.list = action.payload.products;
    },
    addItemToCart(state, action) {
      const existingItemIndex = findIndex(state.list, action);
      if (existingItemIndex !== -1) {
        state.list[existingItemIndex].quantity += 1;
      } else {
        state.list.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItemFromCart(state, action) {
      const existingItemIndex = findIndex(state.list, action);
      state.list.splice(existingItemIndex, 1);
    },
    increaseCartItemQuantity(state, action) {
      const existingItemIndex = findIndex(state.list, action);
      state.list[existingItemIndex].quantity += 1;
    },
    decreaseCartItemQuantity(state, action) {
      const existingItemIndex = findIndex(state.list, action);
      state.list[existingItemIndex].quantity -= 1;
      if (state.list[existingItemIndex].quantity === 0)
        state.list.splice(existingItemIndex, 1);
    },
  },
});

const getCartItems = ({ products, cartItems }) =>
  cartItems.list
    .map(({ productId, quantity }) => {
      const cartProducts = products.list.find(
        (product) => product.id === productId
      );
      return { ...cartProducts, quantity };
    })
    .filter(({ title }) => title);

export const getAllCartItems = createSelector(getCartItems, (state) => state);
export const getCartLoadingState = ({ cartItems }) => cartItems.loading;
export const getCartItemsError = ({ cartItems }) => cartItems.error;

export const getCartItemList = (state) => state.cartItems.list;

export const {
  addItemToCart,
  removeItemFromCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} = slice.actions;

const { fetchCartItems, fetchCartItemsError, loadCartItems } = slice.actions;

export const fetchCartItemsData = (dispatch) => {
  dispatch(fetchCartItems());
  fetch(`https://fakestoreapi.com/carts/5`)
    .then((res) => res.json())
    .then((data) => {
      dispatch(loadCartItems(data));
    })
    .catch(() => dispatch(fetchCartItemsError));
};

export default slice.reducer;
