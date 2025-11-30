import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
   name: "product",
   initialState: {
    loading: false,
    list:[],
    error: ""
   },
   reducers:{
    updateAllProducts(state, action){
      state.loading=false;
      state.error="";
      state.list= action.payload;
    },
    fetchProducts(state){
        state.loading=true;
        state.error="";
    },
    fetchProductsError(state, action){
      state.loading=false;
        state.error= action.payload || "Something went wrong"
    }
   }
})

export const {updateAllProducts, fetchProducts, fetchProductsError} = slice.actions

export default slice.reducer;