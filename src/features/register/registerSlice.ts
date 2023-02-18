import { createSlice } from "@reduxjs/toolkit";

type RegisterState = {
  email?: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

const initialState: RegisterState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
};
const registerSlice = createSlice({
  name: "register",
  initialState: initialState,

  reducers: {
    addState: (state, action) => {
      if (action.payload.step === 1) {
        if (action.payload.email) {
          state.email = action.payload.email;
        } else {
          state.phoneNumber = action.payload.phone;
        }
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.password = action.payload.password;
      }
      if (action.payload.step === 3) {
        state.city = action.payload.city;
        state.state = action.payload.state;
        state.zipCode = action.payload.zipCode;
      }
    },
    clearState: (state) => {
      state = initialState;
    },
  },
});

export const { addState, clearState } = registerSlice.actions;
export default registerSlice.reducer;
export const selectState = (state: RegisterState) => state;
