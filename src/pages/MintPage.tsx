import { Flex, Text } from "@chakra-ui/react";
import illustration1 from "../assets/register.png";
import Mint from "../components/Forms/Mint";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { selectToken } from "../features/market/marketSlice";
import Circular from "../components/Abstracts/Circular";
import useHttp from "../hooks/useHttp";
import { selectCurrentWallet } from "../features/auth/authSlice";
import useAlert from "../hooks/useAlert";

const MintPage = () => {
  const contract = useSelector(selectToken);
  const wallet = useSelector(selectCurrentWallet);
  const [token, setTokenInst] = useState<any>(null);
  const { setOpen, setErrorState } = useAlert();

  useEffect(() => {
    loadContract();
  }, []);

  const loadContract = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const token = await new ethers.Contract(
      contract.address,
      contract.abi,
      signer
    );
    setTokenInst(token);
  };

  const mintAsset = async (
    name: string,
    description: string,
    image: any,
    price: string,
    category: string,
    type: string
  ) => {
    console.log(name, description, image, price, category, type);
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("pinataMetadata", JSON.stringify({ name }));
    formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));
    const requestConfig = {
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT} `,
      },
      body: formData,
    };
    const { sendRequest } = useHttp(requestConfig, async (data: any) => {
      if (!data.error) {
        console.log(data);
        const asset = `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
        try {
          await token._mint(name, asset, category, type, wallet);
          setErrorState({
            message: "Asset Minted",
            type: "success",
            action: "SET_MESSAGE",
          });
          setOpen(true);
        } catch (err) {
          const requestConfig = {
            url: `https://api.pinata.cloud/pinning/unpin/${data.IpfsHash}`,
            method: "DELETE",
          };
          const { sendRequest } = useHttp(requestConfig, (data: any) => {
            setErrorState({
              message: "Asset Minting Failed",
              type: "error",
              action: "SET_MESSAGE",
            });
          });
          sendRequest();
        }
      }
    });
    sendRequest();
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
