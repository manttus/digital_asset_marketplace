import { Box, Flex, Hide, Show, Text, useMediaQuery } from "@chakra-ui/react";
import illustration1 from "../assets/eth3.webp";
import illustration2 from "../assets/abstract2.webp";
import illustration3 from "../assets/blob.webp";
import Collection from "../components/Showcase/Collection";
import Circular from "../components/Abstract/Circular";
import { motion } from "framer-motion";
import { bottomVariants } from "../theme/animation/variants";

const LandingPage = () => {
  return (
    <Flex
      direction={"column"}
      as={motion.div}
      variants={bottomVariants}
      initial={"hidden"}
      animate={"visible"}
    >
      <Flex
        py={{
          sm: "40px",
          md: "60px",
          lg: "90px",
        }}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        textAlign={"center"}
        lineHeight={"1.2"}
        letterSpacing={"-0.2em"}
        position={"relative"}
      >
        <Hide below={"xl"}>
          <Circular top="-350" left="700" />
          <Circular top="200" left="-50" />
        </Hide>
        <Hide below={"md"}>
          <Show above={"sm"} below={"xl"}>
            <Circular top="-350" left="50" />
          </Show>
        </Hide>
        <Flex
          alignItems={"center"}
          gap={{
            sm: 4,
            md: 4,
            lg: 6,
          }}
          zIndex={2}
        >
          <Text
            fontSize={{
              sm: "48px",
              md: "65px",
              lg: "95px",
            }}
            fontWeight={"600"}
            transition={"0.4s ease-in-out"}
          >
            Start selling
          </Text>
          <Box
            rounded={"50px"}
            height={{
              sm: "70px",
              md: "91px",
            }}
            transition={"0.4s ease-in-out"}
            width={{
              sm: "70px",
              md: "90px",
              lg: "300px",
            }}
            bgImg={illustration2}
            backgroundSize={"cover"}
            bgPos={"center"}
          ></Box>
        </Flex>
        <Flex
          as={motion.div}
          alignItems={"center"}
          gap={{
            sm: 4,
            md: 6,
            lg: 10,
          }}
          zIndex={2}
          variants={bottomVariants}
          initial={"hidden"}
          animate={"visible"}
        >
          <Text
            fontSize={{
              sm: "48px",
              md: "65px",
              lg: "95px",
            }}
            fontWeight={"600"}
            transition={"0.4s ease-in-out"}
          >
            creative
          </Text>
          <Box
            rounded={"50px"}
            height={{
              sm: "70px",
              md: "91px",
              lg: "91px",
            }}
            transition={"0.4s ease-in-out"}
            width={{
              sm: "70px",
              md: "90px",
              lg: "300px",
            }}
            bgSize={"cover"}
            bgImg={illustration1}
            bgPos={"bottom"}
          ></Box>
          <Text
            fontSize={{
              sm: "48px",
              md: "65px",
              lg: "95px",
            }}
            fontWeight={"600"}
            color={"tealGreen"}
            transition={"0.4s ease-in-out"}
          >
            assets
          </Text>
        </Flex>
        <Flex
          as={motion.div}
          alignItems={"center"}
          gap={{
            sm: 4,
            md: 4,
            lg: 6,
          }}
          zIndex={2}
          variants={bottomVariants}
          initial={"hidden"}
          animate={"visible"}
        >
          <Box
            rounded={"50px"}
            height={{
              sm: "70px",
              md: "91px",
              lg: "91px",
            }}
            width={{
              sm: "70px",
              md: "91px",
              lg: "91px",
            }}
            scale={"10"}
            bgImg={illustration3}
            bgSize={"cover"}
            bgPos={"center"}
          ></Box>
          <Text
            fontSize={{
              sm: "42px",
              md: "65px",
              lg: "95px",
            }}
            fontWeight={"600"}
            transition={"0.4s ease-in-out"}
          >
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
        zIndex={2}
      >
        <Collection />
        {/* <Partners />
        <Featured /> */}
        {/* <Popular /> */}
      </Flex>
    </Flex>
  );
};

export default LandingPage;
