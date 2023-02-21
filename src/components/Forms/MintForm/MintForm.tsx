import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import NFTaddress from "../../../../contract_data/NFT-Address.json";
import NFT from "../../../../contract_data/NFT.json";

enum NFTType {
  ART = "ART",
  DOMAIN = "DOMAIN",
  GIFS = "GIFS",
}

const MintForm = (props: any) => {
  const pinataApiKey = import.meta.env.VITE_PINATA_KEY;
  const pinataSecretApiKey = import.meta.env.VITE_PINATA_SECRET;
  const headers = {
    pinata_api_key: pinataApiKey,
    pinata_secret_api_key: pinataSecretApiKey,
  };

  const [file, setFile] = useState<string | null>(null);
  const [imageLink, setImageLink] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [nft, setnftContract] = useState<any>(null);
  const [sender, setSender] = useState<string | null>(null);

  const captureFile = (event: any) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  const uploadToIPFS = async (event: any) => {
    event.preventDefault();

    const provider = new ethers.providers.Web3Provider(window.ethereum!, "any");
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setSender(address);
    const nft = new ethers.Contract(NFTaddress.address, NFT.abi, signer);
    setnftContract(nft);
    if (type !== NFTType.DOMAIN) {
      if (typeof file != undefined) {
        const formData = new FormData();
        formData.append("file", file!);
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
    } else {
      console.log("No file selected");
      mintFunction();
    }
  };

  const mintFunction = async () => {
    console.log(name, type, category, imageLink);

    const tokenId = await nft._mint(name, imageLink, category, type, sender);

    console.log(tokenId);
    setName(null);
    setType(null);
    setImageLink(null);
    setCategory(null);
    setType(null);
  };

  return (
    <Flex height={"80%"} justifyContent={"center"} alignItems={"center"}>
      <form onSubmit={uploadToIPFS}>
        <Box p={5} width="550px">
          <Stack spacing={5}>
            <FormControl>
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
            <FormControl>
              <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
                Type
              </FormLabel>
              <Select
                placeholder="Select option"
                onChange={(e) => {
                  setType(e.target.value);
                }}
                isRequired
              >
                <option value="ART">ART</option>
                <option value="DOMAIN"> DOMAIN </option>
                <option value="GIFS">GIFS</option>
              </Select>
            </FormControl>
            {type && type !== NFTType.DOMAIN && (
              <FormControl>
                <FormLabel
                  fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}
                >
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
            )}
            {type === NFTType.DOMAIN && (
              <FormControl>
                <FormLabel
                  fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}
                >
                  Domain
                </FormLabel>
                <InputGroup>
                  <Input
                    type={"text"}
                    variant={"flushed"}
                    onChange={(e) => {
                      setImageLink(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormControl>
            )}

            <FormControl>
              <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
                Category
              </FormLabel>
              <Select
                placeholder="Select option"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                isRequired
              >
                <option value="Bored Ape Yacht Club">
                  Bored Ape Yacht Club
                </option>
                <option value="CryproPunks"> CryptoPunks </option>
                <option value="Mutant Ape Yacht Club">
                  Mutant Ape Yacht Club
                </option>
              </Select>
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
