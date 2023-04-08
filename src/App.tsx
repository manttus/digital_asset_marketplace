import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import { setUserData, setWallet } from "./features/auth/authSlice";
import useLocalStorage from "./hooks/useLocalStorage";
import { setContractData, setMarketItems } from "./features/market/marketSlice";
import NFT from "../contract_data/NFT.json";
import NFTAddress from "../contract_data/NFT-address.json";
import Market from "../contract_data/Market.json";
import MarketAddress from "../contract_data/Market-address.json";
import { Suspense, useEffect } from "react";
import { ethers } from "ethers";
import NavRoutes from "./routes/NavRoutes";
import detectEthereumProvider from "@metamask/detect-provider";
import { useUserMutation } from "./features/api/authApi/apiSlice";
import { RootState } from "./types/StoreType";

const App = () => {
  const id = useSelector((state: RootState) => state.auth.user);
  const [user] = useUserMutation();
  const dispatch = useDispatch();
  const { value, setItem, removeItem } = useLocalStorage("wallet");

  const fetchData = async () => {
    if (id) {
      const data = await user(id).unwrap();

      dispatch(setUserData({ user: data.user }));
    }
  };

  const metaMaskHandler = async () => {
    const isMetaMask = await detectEthereumProvider();
    !isMetaMask && console.log("MetaMask is not installed");
    if (isMetaMask === window.ethereum) {
      const account = await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
      const address = account[0]["caveats"][0]["value"][0];
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
      const balanceInEth = ethers.utils.formatEther(balance).slice(0, 5);
      setItem(JSON.stringify({ wallet: address, balance: balanceInEth }));
      dispatch(setWallet({ address: address, balance: balanceInEth }));
    }
  };

  const reConnect = async () => {
    const data = value ? JSON.parse(value) : null;
    if (data) {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [data.wallet, "latest"],
      });

      const balanceInEth = ethers.utils.formatEther(balance).slice(0, 5);
      setItem(JSON.stringify({ wallet: data.wallet, balance: balanceInEth }));
      dispatch(setWallet({ address: data.wallet, balance: balanceInEth }));
    }
  };

  // window.ethereum.on("chainChanged", async (chainId: number) => {});
  // window.ethereum.on("networkChanged", async (networkId: number) => {});

  window.ethereum.on("accountsChanged", async (accounts: string[]) => {
    if (accounts.length === 0) {
      removeItem();
      dispatch(setWallet({ address: null, balance: null }));
    } else {
      const data = value ? JSON.parse(value) : null;
      if (data) {
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0], "latest"],
        });
        const balanceInEth = ethers.utils.formatEther(balance).slice(0, 5);
        setItem(JSON.stringify({ wallet: accounts[0], balance: balanceInEth }));
        dispatch(setWallet({ address: accounts[0], balance: balanceInEth }));
      }
    }
    window.location.reload();
  });

  const saveContract = async () => {
    const market = { address: MarketAddress.address, abi: Market.abi };
    const nft = { address: NFTAddress.address, abi: NFT.abi };
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    dispatch(setContractData({ market, token: nft }));
  };

  useEffect(() => {
    reConnect();
    saveContract();
  }, []);

  useEffect(() => {
    fetchData();
  }, [id]);

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
