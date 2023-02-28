import { Box, Flex, Text } from "@chakra-ui/react";
import illustration1 from "../assets/eth3.webp";
import illustration2 from "../assets/abstract2.webp";
import illustration3 from "../assets/blob.webp";
import NormalButton from "../components/Button/NormalButton";
import { IoIosArrowForward } from "react-icons/io";
import Partners from "../components/Showcase/Partners";
import Featured from "../components/Showcase/Featured";
import Collection from "../components/Showcase/Collection";

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
        <Collection />
        <Flex w={"100%"} justifyContent={"center"} pt={"30px"}>
          <NormalButton
            width={"380px"}
            text="Check More"
            rightIcon={<IoIosArrowForward />}
            onClick={() => {}}
            type={"solid"}
          />
        </Flex>
        <Partners />
        <Featured />
      </Flex>
    </Flex>
  );
};

export default LandingPage;
