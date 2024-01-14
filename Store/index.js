import { configureStore } from "@reduxjs/toolkit";
import { productListReducer } from "./ProductList/productList";
const rootReducer = {
  productList: productListReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
