import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/Auth";
import productsReducer from "./features/Products/Products";
import usersSlice  from "./features/Users/Users";

const store = configureStore({
  reducer: {
    auth: authReducer,
    productsState: productsReducer,
    usersState: usersSlice
  },
});

export default store;
