import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/Auth";
import productsReducer from "./features/Products/Products";

const store = configureStore({
  reducer: {
    auth: authReducer,
    productsState: productsReducer,
  },
});

export default store;
