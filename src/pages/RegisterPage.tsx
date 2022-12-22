import { Box, Flex, Link, Stack, Text, Image } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/illustration4.png";
import RegisterForm from "../components/Forms/RegisterForm/RegisterForm";

const RegisterPage = () => {
  return (
    <Flex height={"100vh"} direction={["column", "column", "row", "row"]}>
      <Flex
        width={["100%", "100%", "50%", "50%"]}
        backgroundImage={image}
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        backgroundPosition={"center"}
      />
      <Flex
        height={"100vh"}
        width={["100%", "100%", "50%", "50%"]}
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"column"}
      >
        <Flex
          width="100%"
          height="80px"
          alignItems={"center"}
          border={"1px solid #E2E8F0"}
        >
          <Box>
            <Image src={logo} width="240px" height={"80px"} />
          </Box>
        </Flex>
        <RegisterForm />

        <Flex
          width="100%"
          justifyContent={"center"}
          height="70px"
          border={"1px solid #E2E8F0"}
          pt={5}
        >
          <Text color="gray" fontSize="xs">
            Copyright © 2022. All Rights Reserved.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RegisterPage;
