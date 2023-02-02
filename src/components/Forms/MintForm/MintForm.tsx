import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import { useState } from "react";

const MintForm = (props: any) => {
  const pinataApiKey = "4432c7211a70461b2e29";
  const pinataSecretApiKey =
    "d969af09221316194b5f70b89c52aed14f56e851e293d3a36b8f32e17ae460d5";
  const headers = {
    pinata_api_key: pinataApiKey,
    pinata_secret_api_key: pinataSecretApiKey,
  };

  const [file, setFile] = useState<any>(null);
  const [imageLink, setImageLink] = useState("");
  const [price, setPrice] = useState<any>(null);
  const [name, setName] = useState<any>(null);

  const captureFile = (event: any) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  const uploadToIPFS = async (event: any) => {
    event.preventDefault();
    if (typeof file != undefined) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await fetch(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          {
            method: "POST",
            headers: headers,
            body: formData,
          }
        );
        const data = await response.json();
        console.log(data.IpfsHash);
        const imageLink = `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
        setImageLink(imageLink);
        mintFunction();
      } catch (error) {
        console.error(error);
        console.log("Failed to Upload");
      }
    }
  };

  const mintFunction = async () => {
    const tokenId = await props.nft.mint(imageLink);
    console.log(tokenId);
    const priceInWei = ethers.utils.parseEther(price);
    console.log(priceInWei);
    // await props.marketplace.addToList(props.nft.address, tokenId, priceInWei);
    setName("");
    setPrice("");
    setImageLink("");
  };

  return (
    <Flex height={"80%"} justifyContent={"center"} alignItems={"center"}>
      <form onSubmit={uploadToIPFS}>
        <Box p={5} width="550px">
          <Stack spacing={5}>
            <FormControl id="email">
              <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
                Name (NFT)
              </FormLabel>
              <Input
                type="text"
                variant={"flushed"}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
                Choose Your NFT
              </FormLabel>
              <InputGroup>
                <Input
                  type={"file"}
                  variant={"flushed"}
                  onChangeCapture={captureFile}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="password">
              <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
                Price (ETH)
              </FormLabel>
              <InputGroup>
                <Input
                  type={"number"}
                  variant={"flushed"}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </InputGroup>
            </FormControl>
            <Stack spacing={9}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              ></Stack>

              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Button
                  type="submit"
                  as={motion.button}
                  fontWeight={"300"}
                  fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}
                  bg={"purple.400"}
                  whileHover={{ scale: 1.05 }}
                  color={"white"}
                  _hover={{
                    bg: "purple.500",
                  }}
                >
                  Mint NFT
                </Button>
              </Flex>
            </Stack>
          </Stack>
        </Box>
      </form>
    </Flex>
  );
};

export default MintForm;
