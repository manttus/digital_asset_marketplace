import { configureStore } from "@reduxjs/toolkit";
import { marketApi } from "./api/authApi/apiSlice";
import authReducer from "./auth/authSlice";
import marketReducer from "./market/marketSlice";

const store = configureStore({
  reducer: {
    [marketApi.reducerPath]: marketApi.reducer,
    auth: authReducer,
    market: marketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(marketApi.middleware),
});

export default store;
