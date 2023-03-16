import { Flex, Text } from "@chakra-ui/react";
import illustration1 from "../assets/register.png";
import Mint from "../components/Forms/Mint";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { selectMarketSlice } from "../features/market/marketSlice";
import Circular from "../components/Abstracts/Circular";

const MintPage = () => {
  const state = useSelector(selectMarketSlice);
  const Wallet = useSelector(selectMarketSlice).walletAddress;
  const [nftInstance, setNftInstance] = useState<any>(null);
  const loadContract = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const nftInstance = new ethers.Contract(
      state.nftAddress,
      state.nftAbi,
      signer
    );

    setNftInstance(nftInstance);
  };

  useEffect(() => {
    loadContract();
  }, [Wallet]);

  const mintAsset = async (
    name: string,
    description: string,
    image: string,
    price: string,
    category: string,
    type: string
  ) => {
    console.log(image);
    const tx = await nftInstance._getTokens(state.walletAddress);
    console.log(tx);
  };

  return (
    <Flex direction={"column"} justifyContent={"center"} alignItems={"center"}>
      <Flex
        h={"500px"}
        bgImage={illustration1}
        width={"full"}
        bgSize={"cover"}
        top={0}
        pos={"absolute"}
        bgPos={"center"}
        _after={{
          content: '""',
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
        zIndex={2}
        gap={10}
      ></Flex>

      <Flex
        h={"full"}
        width={"full"}
        mt={"450px"}
        direction={"column"}
        gap={20}
        position={"relative"}
      >
        <Circular top="-400" left="-50" />
        <Flex direction={"column"} alignItems={"center"} zIndex={2}>
          <Text fontSize={"4xl"} fontWeight={"bold"}>
            Your asset awaits .
          </Text>

          <Text fontSize={"4xl"} fontWeight={"bold"}></Text>
        </Flex>
        <Flex
          direction={"column"}
          w={"full"}
          alignItems={"center"}
          position={"relative"}
        >
          <Mint mintAsset={mintAsset} />
          {/* <Circular top="400" left="740" /> */}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MintPage;
