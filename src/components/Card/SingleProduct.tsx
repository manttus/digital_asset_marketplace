import { Flex, Img, Input, Text } from "@chakra-ui/react";
import CustomBadge from "../Badge/CustomBadge";
import CustomLink from "../Links/CustomLink";
import NormalButton from "../Button/NormalButton";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { selectCurrentWallet } from "../../features/auth/authSlice";
import { useState } from "react";

const SingleProduct = ({ contract }: any) => {
  const { state } = useLocation();
  const wallet = useSelector(selectCurrentWallet);
  const [price, setPrice] = useState<number>(0);

  const createListing = () => {
    if (price === 0) return;
    const priceinWei = ethers.utils.parseEther(price.toString());
    const id = parseInt(state._id._hex);
    contract._createListing(id, priceinWei, wallet);
  };

  return (
    <Flex
      bg={"background"}
      direction={"column"}
      gap={5}
      w={"full"}
      mt={"40px"}
      mb={"100px"}
    >
      <Flex w={"full"} justifyContent={"space-between"}>
        <Text
          as={Flex}
          fontSize={"28px"}
          fontWeight={"600"}
          alignItems={"center"}
          gap={5}
        >
          Asset Details
          <CustomBadge text="The best choice" color="orange" bg="orangeLight" />
        </Text>

        <Text
          fontSize={"13px"}
          fontWeight={"700"}
          letterSpacing={"2px"}
          textDecoration={"underline"}
          textUnderlineOffset={"10px"}
          textDecorationThickness={"1.5px"}
        >
          DISCOVERY
        </Text>
      </Flex>

      <Flex
        w={"full"}
        shadow={"sm"}
        border={"1px solid #E2E8F0"}
        rounded={"10px"}
        mt={"20px"}
        justifyContent={"center"}
        alignItems={"center"}
        p={"20px"}
      >
        <Flex
          w={"50%"}
          bgPos={"center"}
          bgSize={"cover"}
          height={"600px"}
          rounded={"10px"}
        >
          <Img src={state.image} />
        </Flex>
        <Flex
          w={"50%"}
          direction={"column"}
          bg={"white"}
          rounded={"10px"}
          alignItems={"center"}
          height={"600px"}
        >
          <Flex
            mt={"20px"}
            direction={"column"}
            justifyContent={"start"}
            alignItems={"center"}
            gap={1}
          >
            <Text fontSize={"3xl"} fontWeight={"600"}>
              {state.name}
            </Text>
            {/* <Text fontSize={"lg"} fontWeight={"600"}>
              {state.description}
            </Text> */}
            <Flex
              rounded={"5px"}
              justifyContent={"center"}
              alignItems={"center"}
              direction={"column"}
              position={"relative"}
              p={"60px"}
              gap={5}
            >
              <Input
                rounded={"md"}
                type="text"
                placeholder="Proposed Price"
                border={"1px solid"}
                borderColor={"gray.200"}
                h={"50px"}
                onChange={(e) => {
                  setPrice(parseFloat(e.target.value));
                }}
              />
              <NormalButton
                text="Add to Listing"
                type="outline"
                width="330px"
                onClick={() => {
                  createListing();
                }}
                bg={"buttonPrimary"}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SingleProduct;
