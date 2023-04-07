export type RootState = {
  market: MarketSliceType;
  auth: AuthSliceType;
};

export type AuthSliceType = {
  token: string | null;
  user: string | null;
  wallet: string | null;
  balance: string | null;
  data: any;
};

export type MarketSliceType = {
  token: {
    address: string;
    abi: any;
  };
  market: {
    address: string;
    abi: any;
  };
  marketItems: [];
  feeds: [];
  wallet: string;
};
