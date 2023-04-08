import { Flex, Text } from "@chakra-ui/react";
import SingleProduct from "../components/Card/SingleProduct";
import Circular from "../components/Abstracts/Circular";
import CustomBadge from "../components/Badge/CustomBadge";
import CustomIconButton from "../components/Button/CustomIconButton";
import Collection from "../components/Showcase/Collection";
import { useSelector } from "react-redux";
import { selectMarket } from "../features/market/marketSlice";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const AssetDetails = () => {
  const market = useSelector(selectMarket);
  const [marketContract, setMarketContract] = useState<any>(null);

  const loadContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const token = new ethers.Contract(market.address, market.abi, signer);
    setMarketContract(token);
  };

  useEffect(() => {
    loadContract();
  }, [market]);

  return (
    <Flex w={"full"} px={"70px"} direction={"column"}>
      <SingleProduct contract={marketContract} />
      <Collection />
    </Flex>
  );
};

export default AssetDetails;
