import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import { setWallet } from "./features/auth/authSlice";
import useLocalStorage from "./hooks/useLocalStorage";
import { setContractData } from "./features/market/marketSlice";
import NFT from "../contract_data/NFT.json";
import NFTAddress from "../contract_data/NFT-address.json";
import Market from "../contract_data/Market.json";
import MarketAddress from "../contract_data/Market-address.json";
import { useEffect } from "react";
import { ethers } from "ethers";
import { NavRoutes } from "./routes/NavRoutes";

const App = () => {
  const dispatch = useDispatch();
  const { value, setItem, removeItem } = useLocalStorage("wallet");

  const metaMaskHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getSigner().getBalance();
    const balanceInEth = ethers.utils.formatEther(balance).slice(0, 5);
    setItem(JSON.stringify({ wallet: accounts[0], balance: balanceInEth }));
    dispatch(setWallet({ address: accounts[0], balance: balanceInEth }));
  };

  window.ethereum.on("accountsChanged", async (accounts: any) => {
    if (accounts.length === 0) {
      removeItem();
      dispatch(setWallet({ address: null, balance: null }));
    } else {
      const data = value ? JSON.parse(value) : null;

      if (data) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getSigner().getBalance();
        const balanceInEth = ethers.utils.formatEther(balance).slice(0, 5);
        setItem(JSON.stringify({ wallet: accounts[0], balance: balanceInEth }));
        dispatch(setWallet({ address: accounts[0], balance: balanceInEth }));
      }
    }
  });

  const saveContract = async () => {
    const market = { address: MarketAddress.address, abi: Market.abi };
    const nft = { address: NFTAddress.address, abi: NFT.abi };
    dispatch(setContractData({ market, token: nft }));
  };

  useEffect(() => {
    metaMaskHandler();
    saveContract();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar metaMaskHandler={metaMaskHandler} />,
      children: NavRoutes,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
