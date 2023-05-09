import { createSlice } from "@reduxjs/toolkit";
import { MarketSliceType, RootState } from "../../types/StoreType";

const initialState: MarketSliceType = {
  marketItems: [],
  feeds: [],
  wallet: "",
  token: {
    address: "",
    abi: [],
  },
  market: {
    address: "",
    abi: [],
  },
  marketInstance: {},
  nftInstance: {},
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
    setContractInstance: (state, action) => {
      state.marketInstance = action.payload.marketInstance;
      state.nftInstance = action.payload.nftInstance;
    },
  },
});

export const { setContractData, setMarketItems, setContractInstance } =
  marketSlice.actions;
export default marketSlice.reducer;
export const selectMarketItems = (state: RootState) => state.market.marketItems;
export const selectMarketSlice = (state: RootState) => state.market;
export const selectToken = (state: RootState) => state.market.token;
export const selectMarket = (state: RootState) => state.market.market;
