import { Box, Flex, Text } from "@chakra-ui/react";

import illustration1 from "../assets/eth3.webp";
import illustration2 from "../assets/abstract2.webp";
import illustration3 from "../assets/blob.webp";
import MarketCard from "../components/Cards/MarketCard";
const LandingPage = () => {
  return (
    <Flex direction={"column"}>
      <Flex
        py={"80px"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        textAlign={"center"}
        lineHeight={"1.2"}
        letterSpacing={"-0.2em"}
      >
        <Flex alignItems={"center"} gap={6}>
          <Text fontSize={"95px"} fontWeight={"600"}>
            Start selling
          </Text>
          <Box
            rounded={"50px"}
            height={"90px"}
            width={"300px"}
            bgImg={illustration2}
            backgroundSize={"cover"}
            bgPos={"center"}
          ></Box>
        </Flex>
        <Flex alignItems={"center"} gap={10}>
          <Text fontSize={"95px"} fontWeight={"600"}>
            creative
          </Text>
          <Box
            rounded={"50px"}
            height={"90px"}
            width={"300px"}
            bgSize={"cover"}
            bgImg={illustration1}
            bgPos={"bottom"}
          ></Box>
          <Text fontSize={"95px"} fontWeight={"600"} color={"tealGreen"}>
            assets
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={6}>
          <Box
            rounded={"50px"}
            height={"90px"}
            width={"90px"}
            scale={"10"}
            bgImg={illustration3}
            bgSize={"cover"}
            bgPos={"center"}
          ></Box>
          <Text fontSize={"95px"} fontWeight={"600"}>
            collections
          </Text>
        </Flex>
      </Flex>
      <Flex
        px={"70px"}
        py={"20px"}
        bg={"background"}
        direction={"column"}
        gap={5}
      >
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text fontSize={"28px"} fontWeight={"600"}>
            Collections Products
          </Text>

          <Text
            fontSize={"13px"}
            fontWeight={"700"}
            letterSpacing={"2px"}
            textDecoration={"underline"}
            textUnderlineOffset={"10px"}
            textDecorationThickness={"1.5px"}
          >
            LATEST 4 PRODUCTS
          </Text>
        </Flex>
        <Flex gap={10} mt={"20px"}>
          <MarketCard />
          <MarketCard />
          <MarketCard />
          <MarketCard />
        </Flex>
      </Flex>
      <Flex></Flex>
    </Flex>
  );
};

export default LandingPage;
