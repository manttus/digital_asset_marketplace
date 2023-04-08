import { Flex, Text } from "@chakra-ui/react";
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
  const [price, setPrice] = useState<number>(2.95);

  console.log(state);

  const createListing = () => {
    console.log(wallet);
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
      {/* <Flex w={"full"} justifyContent={"space-between"}>
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
      </Flex> */}

      <Flex
        w={"full"}
        shadow={"sm"}
        border={"1px solid #E2E8F0"}
        rounded={"10px"}
        mt={"20px"}
      >
        <Flex
          w={"50%"}
          bgImg={state.image}
          bgPos={"center"}
          bgSize={"cover"}
          height={"600px"}
          rounded={"10px"}
        ></Flex>
        <Flex
          w={"50%"}
          direction={"column"}
          bg={"white"}
          rounded={"10px"}
          justifyContent={"center"}
        >
          <Flex
            mt={"20px"}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={1}
          >
            <CustomBadge
              bg="greenLight"
              color="successLight"
              text="Best Popular"
            />
            <CustomLink size="38px" text={state.name} to="mum" />
            <Text
              color={"fontGhost"}
              px={"100px"}
              fontSize={"15px"}
              fontWeight={"600"}
              mt={"20px"}
              textAlign={"center"}
            >
              A unique collection of missing puzzles. Attractive appearance and
              attractive power in colored wooden blocks
            </Text>
            <Flex
              mt={"30px"}
              gap={5}
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Flex
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Text fontSize={"18px"} fontWeight={"600"}>
                  Price Proposition
                </Text>
                <Text fontSize={"38px"} fontWeight={"600"}>
                  2.95 ETH
                </Text>
              </Flex>
              <NormalButton
                text="Add to Listing"
                type="outline"
                width="380px"
                onClick={() => {
                  createListing();
                }}
                bg={"buttonHover"}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SingleProduct;
