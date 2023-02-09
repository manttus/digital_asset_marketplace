import { configureStore } from "@reduxjs/toolkit";
import { marketApi } from "./api/authApi/apiSlice";
import authReducer from "./auth/authSlice";

const store = configureStore({
  reducer: {
    [marketApi.reducerPath]: marketApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(marketApi.middleware),
});

export default store;
