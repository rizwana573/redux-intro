import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },
  reducers: {
    updateAllProducts(state, action) {
      state.loading = false;
      state.error = "";
      state.list = action.payload;
    },
    fetchProducts(state) {
      state.loading = true;
      state.error = "";
    },
    fetchProductsError(state, action) {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    },
  },
});

export const getAllProducts = (state) => state.products.list;
export const getProductsLoadingState = (state) => state.products.loading;
export const getProductsError = (state) => state.products.error;

const { updateAllProducts, fetchProducts, fetchProductsError } = slice.actions;

export const fetchProductsData = (dispatch) => {
  dispatch(fetchProducts());
  fetch(`https://fakestoreapi.com/products`)
    .then((res) => res.json())
    .then((data) => {
      dispatch(updateAllProducts(data));
    })
    .catch(() => dispatch(fetchProductsError()));
};

export default slice.reducer;
