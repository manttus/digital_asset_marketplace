import {
  Flex,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";

import illustration1 from "../assets/register.png";
import Mint from "../components/Forms/Mint";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import { selectToken } from "../features/market/marketSlice";
import Circular from "../components/Abstract/Circular";
import { selectCurrentWallet } from "../features/auth/authSlice";
import NoConnection from "../components/NoConnection";
import { RootState } from "../types/StoreType";
import useToast from "../hooks/useToast";
import { usePostFeedMutation } from "../features/api/authApi/apiSlice";

const MintPage = () => {
  const id = useSelector((state: RootState) => state.auth.user);
  const contract = useSelector(selectToken);
  const [postFeed] = usePostFeedMutation();
  const walletCategory = useSelector((state: RootState) => state.auth.data);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const wallet = useSelector(selectCurrentWallet);
  const [token, setTokenInst] = useState<any>(null);
  const [categories, setCategories] = useState<any>([]);
  const [mintDetails, setMintDetails] = useState<any>({});
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const { showToast } = useToast();
  const cancelRef = useRef<any>();

  const getCategory = () => {
    if (wallet) {
      const category = walletCategory?.category;
      setCategories(category);
    }
  };

  useEffect(() => {
    if (walletCategory) {
      getCategory();
    }
    loadContract();
  }, [wallet, walletCategory]);

  const loadContract = async () => {
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
    category: string,
    type: string
  ) => {
    // console.log(name, description, image, price, category, type);
    // const formData = new FormData();
    // formData.append("file", image[0]);
    // formData.append("pinataMetadata", JSON.stringify({ name }));
    // formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));
    // const requestConfig = {
    //   url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT} `,
    //   },
    //   body: formData,
    // };
    // const { sendRequest } = useHttp(requestConfig, async (data: any) => {
    //   if (!data.error) {
    //     console.log(data);
    //     const asset = `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
    //     try {
    //       await token._mint(name, asset, category, type, wallet);
    //       setErrorState({
    //         message: "Asset Minted",
    //         type: "success",
    //         action: "SET_MESSAGE",
    //       });
    //       setOpen(true);
    //     } catch (err: Error | any) {
    //       console.log(err);
    //       setErrorState({
    //         message: err.data.data.reason,
    //         type: "error",
    //         action: "SET_MESSAGE",
    //       });
    //       setOpen(true);
    //     }
    //   }
    // });
    // sendRequest();
    const formData = new FormData();
    formData.append("file", image![0]);
    formData.append("upload_preset", import.meta.env.VITE_CLOUD_UPLOAD_PRESET);
    const requestConfig = {
      url: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      method: "POST",
      body: formData,
    };

    const response = await fetch(requestConfig.url, {
      method: requestConfig.method,
      body: requestConfig.body,
    });

    if (response.ok) {
      showToast("Image Uploaded", "success", 2000);
      const data = await response.json();

      try {
        const response = await token._mint(
          name,
          data.secure_url,
          category,
          type,
          wallet
        );
        const receipt = await response.wait();
        const tokenId = receipt.events[0].args[2];

        await postFeed({
          id: id!,
          token_name: name,
          token_id: parseInt(tokenId._hex.toString()).toString(),
          token_url: data.secure_url,
        }).unwrap();

        showToast("Asset Minted", "success", 2000);
      } catch (err: Error | any) {
        showToast("Server Error", "error", 2000);
      }
    } else {
      showToast("Image Upload Failed", "error", 2000);
    }
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
        bgPos={"bottom"}
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
      >
        <Text
          mt={"20"}
          fontSize={"6xl"}
          fontWeight={"bold"}
          color={"white"}
          zIndex={"10"}
        >
          Your asset awaits .
        </Text>
      </Flex>

      <Flex
        h={"full"}
        width={"full"}
        mt={"410px"}
        direction={"column"}
        gap={20}
        position={"relative"}
      >
        <Circular top="-400" left="-50" />
        <Circular top="300" left="1000" zIndex={0} />
        <Flex direction={"column"} alignItems={"center"} zIndex={2}>
          <Text fontSize={"4xl"} fontWeight={"bold"}></Text>
        </Flex>
        <Flex
          direction={"column"}
          w={"full"}
          alignItems={"center"}
          position={"relative"}
        >
          {wallet ? (
            <Mint mintAsset={mintAsset} categories={categories} />
          ) : (
            <Flex py={"100"}>
              <NoConnection />
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MintPage;
