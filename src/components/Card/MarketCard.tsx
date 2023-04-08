import { Flex, Box, Text, Image, Avatar, Divider } from "@chakra-ui/react";
import Illustration from "../../assets/eth1.gif";
import { useEffect, useState } from "react";

import CustomLink from "../Links/CustomLink";
import { FaArrowRight } from "react-icons/fa";

const MarketCard = ({ item }: any) => {
  return (
    <Flex
      width={"400px"}
      direction={"column"}
      rounded={"5px"}
      shadow={"sm"}
      bg={"white"}
      p={"20px"}
    >
      <Image
        src={item.image}
        h={"260px"}
        w={"100%"}
        rounded={"5px"}
        transition={"all 0.5s ease-in-out"}
        _hover={{
          transform: "scale(1.02)",
          transition: "all 0.5s ease-in-out",
        }}
      />
      <Box>
        <Flex
          direction={"column"}
          px={"4px"}
          pt={"25px"}
          letterSpacing={"0.4px"}
        >
          <Flex justifyContent={"space-between"}>
            <Box>
              <CustomLink text={item.name} to="mum" size="18px" weight="700" />
            </Box>
            <Box>
              <CustomLink
                text={item._id._hex}
                to="mum"
                size="18px"
                weight="700"
              />
            </Box>
          </Flex>
          <Text fontSize={"15px"} color={"fontGhost"} fontWeight={"500"}></Text>
        </Flex>

        <Divider w={"full"} py={"10px"} />
        <Flex
          direction={"column"}
          px={"4px"}
          pt={"15px"}
          letterSpacing={"0.2px"}
        >
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text fontSize={"18px"} fontWeight={"700"}>
              {item.price} ETH
            </Text>
            <FaArrowRight color="#3361FF" size={"20px"} />
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default MarketCard;
