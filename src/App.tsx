import { useGoogleLogin } from "@react-oauth/google";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import Marketplace from "./pages/Marketplace";
import RegisterPage from "./pages/RegisterPage";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const App = () => {
  const [wallet, setWallet] = useState<string | null>(null);

  const [googleToken, setGoogleToken] = useState<string>("");
  const [googleData, setGoogleData] = useState<{
    email: string;
    username: string;
  }>({
    email: "",
    username: "",
  });

  const metaMaskHandler = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setWallet(address);
  };

  const oauthHandler = useGoogleLogin({
    onSuccess: (response) => {
      const googleToken = response.access_token;
      setGoogleToken(googleToken);
    },
  });

  useEffect(() => {
    if (googleToken != "") {
      fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleToken}`,
        {
          headers: {
            Authorization: `Bearer ${googleToken}`,
            Accept: "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setGoogleData({ email: res.email, username: res.username });
        });
    }
  }, [googleToken]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar metaMaskHandler={metaMaskHandler} wallet={wallet} />,
      children: [
        {
          path: "home",
          element: <Marketplace />,
        },
      ],
    },
    {
      path: "/signin",
      element: (
        <LoginPage oauthHandler={oauthHandler} googleData={googleData} />
      ),
    },
    {
      path: "/signup",
      element: <RegisterPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
