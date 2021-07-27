import { createSlice } from "@reduxjs/toolkit";
import { getAllTokens } from "../utils/token";

const tokens = getAllTokens()
let tokenBalances = {}
for(let i =0;i<tokens.length;i++)
{ const {balance , symbol, address} = tokens[i]
  tokenBalances[symbol] = {balance , key:symbol, address}
}

export const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    walletAddress: null,
    balances: tokenBalances,
    lpTokens:{
      Uniswap:null,
      Sushiswap:null,
    }
  },
  reducers: {
    setLpTokens: (state, { payload }) => {
      const { lpTokens } = payload;
      state.lpTokens = lpTokens;
    },
    setWalletAddress: (state, { payload }) => {
      const { walletAddress } = payload;
      state.walletAddress = walletAddress;
    },
    setWalletBalance: (state, { payload }) => {
      const { key } = payload;
      if(!state.balances[key]) state.balances[key] = {}
      state.balances[key] = payload;
    },
    setWalletUSDValue: (state, { payload }) => {
      const { key, usdValue } = payload;
      state.balances[key].usdValue = usdValue;
    },
  },
});

export const { setWalletAddress, setWalletBalance, setLpTokens, setWalletUSDValue } =
  walletSlice.actions;

export default walletSlice.reducer;
