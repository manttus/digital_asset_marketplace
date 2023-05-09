import { useDisclosure } from "@chakra-ui/react";
import { setContractData } from "./features/market/marketSlice";

import NFT from "../contract_data/NFT.json";
import NFTAddress from "../contract_data/NFT-address.json";
import Market from "../contract_data/Market.json";
import MarketAddress from "../contract_data/Market-address.json";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./components/Navbar";
import NavRoutes from "./routes/NavRoutes";

import useLocalStorage from "./hooks/useLocalStorage";
import useCustomToast from "./hooks/useToast";
import detectEthereumProvider from "@metamask/detect-provider";
import jwt_decode from "jwt-decode";
import { RootState } from "./types/StoreType";
import Transactions from "./admin/pages/Transaction";
import Manage from "./admin/pages/Manage";

import { io } from "socket.io-client";

const socket = io("http://localhost:3001/");

import {
  useUserMutation,
  useLoginMutation,
  useSendMutation,
  useVerifyMutation,
  useRegisterMutation,
} from "./features/api/authApi/apiSlice";

import {
  logout,
  setUserData,
  setUserId,
  setWallet,
} from "./features/auth/authSlice";
import AdminLogin from "./admin/pages/LoginPage";
import AdminNavbar from "./admin/components/AdminNavbar";
import Dashboard from "./admin/pages/Dashboard";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const id = useSelector((state: RootState) => state.auth.user);
  const { value, setItem, removeItem } = useLocalStorage("wallet");
  const [address, setAddress] = useState<string>("");
  const [notification, setNotification] = useState<any>([]);
  const dispatch = useDispatch();

  const [user] = useUserMutation();
  const [login] = useLoginMutation();
  const [send, { isLoading }] = useSendMutation();
  const [verify] = useVerifyMutation();
  const [register] = useRegisterMutation();

  const {
    value: tokens,
    setItem: setTokens,
    removeItem: removeTokens,
  } = useLocalStorage("Tokens");

  const { showToast } = useCustomToast();

  useEffect(() => {
    socket.on("notification", (notification) => {
      showToast(`Message from ${notification.senderName}`, "info", 2000);
      setNotification((prev: any) => [...prev, notification]);
    });
  }, []);

  const joinRoom = (roomid: string) => {
    socket.emit("join-notification", roomid);
  };

  const fetchData = async () => {
    if (id) {
      try {
        const data = await user(id).unwrap();
        dispatch(setUserData({ user: data.user }));
        joinRoom(5001 + data.user._id);
      } catch (err) {
        showToast("Server Error", "error", 2000);
      }
    }
  };

  const sendOtp = async (email: string): Promise<boolean> => {
    try {
      const response = await send({ email, address }).unwrap();
      if (response.message === "Success") {
        showToast("Otp Sent", "success", 2000);
        return true;
      }
      showToast("Otp Not Sent", "error", 2000);
      return false;
    } catch (err: Error | unknown) {
      showToast("Otp Not Sent", "error", 2000);
      return false;
    }
  };

  const signupHandler = async (
    email: string,
    otp: string,
    username: string
  ) => {
    try {
      const response = await verify({ email, otp }).unwrap();
      if (response.message === "Success") {
        const data = await register({ email, address, username }).unwrap();
        if (data.message === "Success") {
          showToast("Account Registered", "success", 2000);
          setTokens(
            JSON.stringify({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            })
          );
          const id: {
            _id: string;
          } = jwt_decode(data.accessToken);
          const balance = await window.ethereum.request({
            method: "eth_getBalance",
            params: [address, "latest"],
          });
          const balanceInEth = ethers.utils.formatEther(balance).slice(0, 5);
          const userData = await user(id._id).unwrap();
          dispatch(setUserData({ user: userData.user }));
          dispatch(setWallet({ address: address, balance: balanceInEth }));
          onClose();
        } else {
          showToast("Account Not Registered", "error", 2000);
        }
      }
    } catch (err: Error | unknown) {}
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
        if (response.message === "Success") {
          showToast("Account Connected", "success", 2000);
          setTokens(
            JSON.stringify({
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
            })
          );
          const id: {
            _id: string;
          } = jwt_decode(response.accessToken);
          const data = await user(id._id).unwrap();
          setItem(JSON.stringify({ wallet: address, balance: balanceInEth }));
          dispatch(setWallet({ address: address, balance: balanceInEth }));
          console.log(id._id);
          dispatch(setUserId({ user: id._id }));
          dispatch(setUserData({ user: data.user }));
        }
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
            showToast("Account Invalid", "error", 2000);
            onOpen();
          }
        }
      }
    }
  };

  const disconnect = async () => {
    showToast("Account Disconnected", "info", 2000);
    removeItem();
    removeTokens();
    dispatch(logout());
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
          isSendLoading={isLoading}
          notification={notification}
        />
      ),
      children: NavRoutes,
    },
    {
      path: "/admin/auth",
      element: <AdminLogin />,
    },
    {
      element: <AdminNavbar />,
      children: [
        {
          path: "/admin/dash",
          element: <Dashboard />,
        },
        {
          path: "/admin/tran",
          element: <Transactions />,
        },
        {
          path: "/admin/manage",
          element: <Manage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
