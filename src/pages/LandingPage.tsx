import { Box, Flex, Text } from "@chakra-ui/react";

import illustration1 from "../assets/eth3.webp";
import illustration2 from "../assets/abstract2.webp";
import illustration3 from "../assets/blob.webp";
import MarketCard from "../components/Cards/MarketCard";
import NormalButton from "../components/Buttons/NormalButton";
import { IoIosArrowForward } from "react-icons/io";
import Partners from "../components/Partners";
import Featured from "../components/Featured";
import CustomBadge from "../components/Badge/CustomBadge";
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
        <Featured />
        <Partners />

        <Flex justifyContent={"space-between"}>
          <Text
            as={Flex}
            fontSize={"28px"}
            fontWeight={"600"}
            alignItems={"center"}
            gap={5}
          >
            Collections Products
            <CustomBadge text="40+" color="orange" bg="orangeLight" />
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
        <Flex
          gap={8}
          mt={"20px"}
          w={"full"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <MarketCard />
          <MarketCard />
          <MarketCard />
          <MarketCard />
        </Flex>
        <Flex w={"100%"} justifyContent={"center"} pt={"30px"}>
          <NormalButton
            width={"380px"}
            text="Check More"
            rightIcon={<IoIosArrowForward />}
            onClick={() => {}}
            type={"solid"}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LandingPage;
