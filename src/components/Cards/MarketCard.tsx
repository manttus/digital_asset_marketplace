import {
  Flex,
  Box,
  Text,
  HStack,
  Image,
  Avatar,
  Divider,
  Link,
} from "@chakra-ui/react";
import Illustration from "../../assets/eth1.gif";

import CustomLink from "../CustomLink";
import { FaArrowRight } from "react-icons/fa";

const MarketCard = () => {
  return (
    <Flex
      width={"340px"}
      direction={"column"}
      rounded={"5px"}
      shadow={"sm"}
      bg={"white"}
      p={"15px"}
    >
      <Image
        src={Illustration}
        w={"100%"}
        rounded={"5px"}
        transition={"all 0.5s ease-in-out"}
        _hover={{
          transform: "scale(1.05)",
          transition: "all 0.5s ease-in-out",
        }}
      />
      <Box>
        <Flex
          direction={"column"}
          px={"20px"}
          py={"25px"}
          letterSpacing={"0.4px"}
        >
          <Box>
            <CustomLink
              text="Secret Artistic"
              to="mum"
              size="18px"
              weight="700"
            />
          </Box>
          <Text fontSize={"15px"} color={"fontGhost"} fontWeight={"500"}>
            Amazing viewing
          </Text>
        </Flex>
        <Flex alignItems={"center"} px={"18px"} py={"10px"} gap={4}>
          <Avatar size={"md"} />
          <Text fontWeight={"600"} fontSize={"15px"} letterSpacing={"0.4px"}>
            Michael Noris
          </Text>
        </Flex>
        <Divider w={"full"} py={"10px"} />
        <Flex
          direction={"column"}
          px={"20px"}
          py={"20px"}
          letterSpacing={"0.2px"}
        >
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text fontSize={"18px"} fontWeight={"700"}>
              2.95 ETH
            </Text>
            <FaArrowRight color="#3361FF" />
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default MarketCard;
