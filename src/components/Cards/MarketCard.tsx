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
import { FaArrowCircleRight } from "react-icons/fa";

const MarketCard = () => {
  return (
    <Flex
      width={"330px"}
      direction={"column"}
      rounded={"5px"}
      shadow={"sm"}
      bg={"white"}
    >
      <Image
        src={Illustration}
        w={"100%"}
        roundedTop={"5px"}
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
          py={"15px"}
          letterSpacing={"0.2px"}
        >
          <Text fontSize={"18px"} fontWeight={"700"}>
            2.95 ETH
          </Text>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            color={"successLight"}
          >
            <Link color={"successLight"} fontSize={"15px"} fontWeight={"500"}>
              Check the details
            </Link>
            <FaArrowCircleRight />
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default MarketCard;
