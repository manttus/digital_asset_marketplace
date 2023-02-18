import { configureStore } from "@reduxjs/toolkit";
import { marketApi } from "./api/authApi/apiSlice";
import authReducer from "./auth/authSlice";
import registerReducer from "./register/registerSlice";

const store = configureStore({
  reducer: {
    [marketApi.reducerPath]: marketApi.reducer,
    auth: authReducer,
    register: registerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(marketApi.middleware),
});

export default store;
