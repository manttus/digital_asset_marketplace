import { useRoutes } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
import NFTAddress from "./contract_data/NFTAddress.json";
import NFTAbi from "./contract_data/NFT.json";
import MarketAddress from "./contract_data/MarketAddress.json";
import MarketAbi from "./contract_data/Market.json";
import Marketplace from "./pages/Marketplace";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthRoute from "./routes/AuthRoute";

declare var window: any;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState<any>({});

  const metaMaskHandler = async () => {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setAccount(account);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    loadContract(signer);
  };

  const loadContract = async (signer: any) => {
    const marketplace = new ethers.Contract(
      MarketAddress.address,
      MarketAbi.abi,
      signer
    );
    setMarketplace(marketplace);
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    setNFT(nft);
    setLoading(false);
  };

  const routes = useRoutes([
    {
      path: "/",
      element: <AuthRoute />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <RegisterPage />,
    },
  ]);

  return routes;
};

export default App;
