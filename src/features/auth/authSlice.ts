import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const initialState = {
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
};

// const initialState = {
//   token: null,
//   user: null,
// };

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredintials: (state, action) => {
      console.log("action.payload", action.payload);
      console.log("state.user", action.payload.user);
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredintials, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.token;
