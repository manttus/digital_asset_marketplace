import { createSlice } from "@reduxjs/toolkit";
import { Contract } from "ethers";

type initialStateType = {
  marketInstance: Contract | null;
  nftInstance: Contract | null;
  marketItems: any[];
  feeds: any[];
  walletAddress: string | null;
};

const initialState: initialStateType = {
  marketItems: [],
  feeds: [],
  nftInstance: null,
  marketInstance: null,
  walletAddress: null,
};
const marketSlice = createSlice({
  name: "market",
  initialState: initialState,
  reducers: {
    setMarketList: (state, action) => {
      state.marketItems = action.payload.marketItems;
      console.log("marketItems", state.marketItems);
    },
    setMarketInstance: (state, action) => {
      state.marketInstance = action.payload.marketInstance;
    },
    setNftInstance: (state, action) => {
      state.nftInstance = action.payload.nftInstance;
    },
  },
});

export const { setMarketList, setMarketInstance, setNftInstance } =
  marketSlice.actions;
export default marketSlice.reducer;
export const selectMarketItems = (state: any) => state.market.marketItems;
export const selectMarketInstance = (state: any) => state.market.marketInstance;
export const selectNftInstance = (state: any) => state.market.nftInstance;
