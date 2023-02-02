import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AuthRoute from "./routes/AuthRoute";
import RequireAuth from "./features/auth/RequireAuth";
import ForgotPassword from "./pages/ForgotPassword";
import MintNFT from "./pages/MintNFT";
import { useState } from "react";
import { ethers } from "ethers";
import NFTAddress from "./contract_data/NFTAddress.json";
import NFTAbi from "./contract_data/NFT.json";
import MarketAddress from "./contract_data/MarketAddress.json";
import MarketAbi from "./contract_data/Market.json";
import Marketplace from "./pages/Marketplace";
import Inventory from "./components/Inventory/Inventory";

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

  return (
    <Routes>
      <Route path="/login/*" element={<AuthRoute />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<RequireAuth HomePage={HomePage} />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/market" element={<Marketplace />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route
        path="/mint"
        element={
          <MintNFT
            marketplace={marketplace}
            nft={nft}
            connectWallet={metaMaskHandler}
            account={account}
            loading={loading}
          />
        }
      />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default App;
