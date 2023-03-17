import { createSlice } from "@reduxjs/toolkit";

type market = {};
type token = {};

type initialStateType = {
  token: token;
  market: market;
  marketItems: [];
  feeds: [];
  wallet: string;
};

const initialState: initialStateType = {
  marketItems: [],
  feeds: [],
  wallet: "",
  token: {},
  market: {},
};
const marketSlice = createSlice({
  name: "market",
  initialState: initialState,
  reducers: {
    setContractData: (state, action) => {
      state.market = action.payload.market;
      state.token = action.payload.token;
    },
    setMarketItems: (state, action) => {
      state.marketItems = action.payload.marketItems;
    },
  },
});

export const { setContractData, setMarketItems } = marketSlice.actions;
export default marketSlice.reducer;
export const selectMarketItems = (state: any) => state.market.marketItems;
export const selectMarketSlice = (state: any) => state.market;
export const selectToken = (state: any) => state.market.token;
export const selectMarket = (state: any) => state.market.market;
