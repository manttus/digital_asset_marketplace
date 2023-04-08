import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { AuthSliceType, RootState } from "../../types/StoreType";

const initialState: AuthSliceType = {
  token: localStorage.getItem("Tokens")
    ? JSON.parse(localStorage.getItem("Tokens")!).accessToken
    : null,
  user: localStorage.getItem("Tokens")
    ? (
        jwt_decode(
          JSON.parse(localStorage.getItem("Tokens")!).accessToken
        ) as any
      )._id
    : null,
  wallet: localStorage.getItem("wallet")
    ? JSON.parse(localStorage.getItem("wallet")!).wallet
    : null,
  balance: localStorage.getItem("wallet")
    ? JSON.parse(localStorage.getItem("wallet")!).balance
    : null,
  data: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredintials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setUserData: (state, action) => {
      state.data = action.payload.user;
    },
    setWallet: (state, action) => {
      state.wallet = action.payload.address;
      state.balance = action.payload.balance;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.wallet = null;
      state.balance = null;
    },
  },
});

export const { setCredintials, logout, setWallet, setUserData } =
  authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentWallet = (state: RootState) => state.auth.wallet;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentBalance = (state: RootState) => state.auth.balance;
export const selectUserData = (state: RootState) => state.auth.data;
