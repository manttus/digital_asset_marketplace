import { Flex, Box, Text, Image } from "@chakra-ui/react";
import CustomLink from "../Links/CustomLink";
import { ethers } from "ethers";

const MarketCard = ({ item, onClick }: any) => {
  return (
    <Flex
      minWidth={"200px"}
      width={{
        sm: "200px",
        md: "600px",
        lg: "700px",
        xl: "380px",
      }}
      direction={"column"}
      rounded={"5px"}
      shadow={"md"}
      bg={"white"}
      p={"10px"}
      border={"1px solid "}
      borderColor={"gray.300"}
      position={"relative"}
      onClick={onClick}
    >
      <Image
        src={item._token._asset}
        h={{
          sm: "200px",
          md: "300px",
          lg: "450px",
          xl: "350px",
        }}
        w={"100%"}
        rounded={"5px"}
        transition={"all 0.5s ease-in-out"}
        _hover={{
          transform: "scale(1.01)",
          transition: "all 0.5s ease-in-out",
        }}
      />
      <Box>
        <Flex
          direction={"column"}
          px={"10px"}
          pt={"20px"}
          pb={"5px"}
          letterSpacing={"0.4px"}
        >
          <Flex justifyContent={"space-between"}>
            <Box>
              <CustomLink
                text={item._token._name}
                to="mum"
                size="18px"
                weight="700"
              />
            </Box>
            <Box cursor={"pointer"}>
              <Text
                fontSize={"18px"}
                fontWeight={"700"}
                size="18px"
                cursor={"pointer"}
              >
                {parseInt(ethers.utils.formatEther(item._price))} ETH
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default MarketCard;
