import { Button, Flex } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState } from "react";
import NFTAbi from "../contract_data/NFT.json";
import MarketAbi from "../contract_data/Market.json";
import MarketAddress from "../contract_data/MarketAddress.json";
import NFTAddress from "../contract_data/NFTAddress.json";
import Landing from "../components/LandingPage/Landing";
import Navbar from "../components/Navbar";

declare var window: any;

const Marketplace = () => {
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

  const loadMarketplaceItems = async () => {
    const itemCount = await marketplace._indi();
    console.log(itemCount);
  };

  return (
    <Flex h={"100vh"} direction={"column"}>
      <Navbar />
      <Flex h={"75%"} justifyContent={"center"} alignItems={"center"}>
        {loading ? <Landing /> : <Flex> Awaiting Wallet Connection </Flex>}
      </Flex>
    </Flex>
  );
};

export default Marketplace;
