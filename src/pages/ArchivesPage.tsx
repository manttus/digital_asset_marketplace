import { Flex, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MarketCard from "../components/Card/MarketCard";
import { selectCurrentWallet } from "../features/auth/authSlice";
import { selectToken } from "../features/market/marketSlice";

const ArchivesPage = () => {
  const contract = useSelector(selectToken);
  const wallet = useSelector(selectCurrentWallet);
  const [archives, setArchives] = useState<any>([]);
  const [token, setToken] = useState<any>();

  const loadListing = async () => {
    const listing = await token._getTokens(wallet);
    setArchives(listing);
  };

  window.ethereum.on("accountsChanged", async (accounts: any) => {
    loadListing();
  });

  const loadContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tokenContract = await new ethers.Contract(
      contract.address,
      contract.abi,
      signer
    );
    setToken(tokenContract);
  };

  useEffect(() => {
    loadContract();
  }, []);

  useEffect(() => {
    loadListing();
  }, []);

  return (
    <Flex w={"full"} justifyContent={"center"} gap={8}>
      {archives.map((archive: any) => {
        return <MarketCard />;
      })}
    </Flex>
  );
};

export default ArchivesPage;
