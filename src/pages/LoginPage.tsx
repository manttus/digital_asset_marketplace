import { Box, Divider, Flex, Hide, Image, Show } from "@chakra-ui/react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import illustration1 from "../assets/nice.webp";
import LoginForm from "../components/Forms/LoginForm/LoginForm";

const LoginPage = () => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  const rightVariants = {
    hidden: {
      x: 200,
      opacity: 0,
      overflow: "hidden",
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: "30",
        velocity: "0.5",
      },
    },
  };

  const bottomVariants = {
    hidden: {
      y: 500,
      opacity: 0,
      overflow: "hidden",
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: "30",
        velocity: "0.5",
      },
    },
  };

  return (
    <>
      <Flex
        h={"100vh"}
        overflow={"hidden"}
        direction={{ sm: "column", md: "column", lg: "row", xl: "row" }}
      >
        <Flex
          width={{ sm: "100%", md: "100%", lg: "40%", xl: "40%" }}
          height={"100%"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Flex
            p={"10px"}
            height={"15%"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            backgroundPosition={"center"}
          ></Flex>
          <Flex
            as={motion.div}
            height={"85%"}
            variants={bottomVariants}
            p={"10px"}
            animate={"visible"}
            initial={"hidden"}
            flexDirection={"column"}
            alignItems={"center"}
            backgroundImage={{
              sm: illustration1,
              md: illustration1,
              lg: "none",
              xl: "none",
            }}
            backgroundSize={"cover"}
            backgroundPosition={"center"}
          >
            hELLO
          </Flex>
        </Flex>
        <Hide below="lg">
          <Flex
            height={"100%"}
            as={motion.div}
            width={"60%"}
            backgroundImage={illustration1}
            backgroundSize={"cover"}
            backgroundRepeat={"no-repeat"}
            backgroundPosition={"center"}
            variants={rightVariants}
            animate={"visible"}
            initial={"hidden"}
          ></Flex>
        </Hide>
      </Flex>
    </>
  );
};

export default LoginPage;
