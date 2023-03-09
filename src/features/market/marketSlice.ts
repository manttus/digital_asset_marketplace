import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  marketItems: any[];
  feeds: any[];
  wallet: string;
  market: any;
  nft: any;
};

const initialState: initialStateType = {
  marketItems: [],
  feeds: [],
  wallet: "",
  market: null,
  nft: null,
};
const marketSlice = createSlice({
  name: "market",
  initialState: initialState,
  reducers: {
    setMarketList: (state, action) => {
      state.marketItems = action.payload.marketItems;
      console.log("marketItems", state.marketItems);
    },
    setFeedList: (state, action) => {},
    setWallet: (state, action) => {
      state.wallet = action.payload.wallet;
    },
    setContracts: (state, action) => {},
  },
});

export const { setMarketList, setFeedList, setWallet } = marketSlice.actions;
export default marketSlice.reducer;
export const selectMarketItems = (state: any) => state.market.marketItems;
