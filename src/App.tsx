import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import { logout, setUserData, setWallet } from "./features/auth/authSlice";
import useLocalStorage from "./hooks/useLocalStorage";
import { setContractData } from "./features/market/marketSlice";
import NFT from "../contract_data/NFT.json";
import NFTAddress from "../contract_data/NFT-address.json";
import Market from "../contract_data/Market.json";
import MarketAddress from "../contract_data/Market-address.json";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import NavRoutes from "./routes/NavRoutes";
import detectEthereumProvider from "@metamask/detect-provider";
import {
  useUserMutation,
  useLoginMutation,
  useSendMutation,
  useVerifyMutation,
} from "./features/api/authApi/apiSlice";
import { RootState } from "./types/StoreType";
import { useDisclosure } from "@chakra-ui/react";

const App = () => {
  const id = useSelector((state: RootState) => state.auth.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address, setAddress] = useState<string>("");
  const [user] = useUserMutation();
  const [login, { isLoading, isError }] = useLoginMutation();
  const [send, { isLoading: isSendLoading, isError: isOtpError }] =
    useSendMutation();
  const [verify, { isLoading: isVerifyLoading, isError: isErrorLoading }] =
    useVerifyMutation();
  const dispatch = useDispatch();
  const { value, setItem, removeItem } = useLocalStorage("wallet");

  const fetchData = async () => {
    if (id) {
      const data = await user(id).unwrap();
      console.log(data);
      dispatch(setUserData({ user: data.user }));
    }
  };

  const sendOtp = async (email: string): Promise<boolean> => {
    console.log(email);
    try {
      const response = await send({ email, address }).unwrap();
      if (response.message === "Success") {
        return true;
      }
      return false;
    } catch (err: Error | unknown) {
      return false;
    }
  };

  const signupHandler = async (
    email: string,
    otp: string
  ): Promise<boolean> => {
    console.log(email, otp);
    try {
      const response = await verify({ email, otp }).unwrap();
      console.log(response);
      if (response.status === 200) {
        return true;
      }
      return false;
    } catch (err: Error | unknown) {
      return false;
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
      setAddress(address);
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
      const balanceInEth = ethers.utils.formatEther(balance).slice(0, 5);
      try {
        const response = await login({ address }).unwrap();
        setItem(JSON.stringify({ wallet: address, balance: balanceInEth }));
        dispatch(setWallet({ address: address, balance: balanceInEth }));
      } catch (err:
        | {
            status: number;
            data: { message: string };
          }
        | unknown) {
        if (err && typeof err === "object" && "data" in err) {
          const { data } = err as {
            status: number;
            data: { message: string };
          };
          if (data.message === "Account Invalid") {
            console.log("Account Invalid");
            onOpen();
          }
        }
      }
    }
  };

  const disconnect = async () => {
    const isMetaMask = await detectEthereumProvider();
    !isMetaMask && console.log("MetaMask is not installed");
    if (isMetaMask === window.ethereum) {
      window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
      removeItem();
      dispatch(logout());
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
  });

  const saveContract = async () => {
    const market = { address: MarketAddress.address, abi: Market.abi };
    const nft = { address: NFTAddress.address, abi: NFT.abi };
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
      element: (
        <Navbar
          metaMaskHandler={metaMaskHandler}
          disconnect={disconnect}
          buttonLoading={isLoading}
          isOpen={isOpen}
          onClose={onClose}
          sendOtp={sendOtp}
          signupHandler={signupHandler}
          address={address}
        />
      ),
      children: NavRoutes,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
