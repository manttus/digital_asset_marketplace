import { Flex, Text, Image, Box, Stack, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import image from "../assets/illustration6.png";
import logo from "../assets/logo.png";
import LoginForm from "../components/Forms/LoginForm/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <Flex height={"100vh"} direction={["column", "column", "row", "row"]}>
      <Flex
        height={"100vh"}
        width={["100%", "100%", "50%", "50%"]}
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"column"}
      >
        <Flex width="100%" height="80px" border={"1PX solid #E2E8F0"}>
          <Box>
            <Image src={logo} width="240px" height={"80px"} />
          </Box>
        </Flex>
        <Box
          display={["block", "block", "none", "none"]}
          height={"100px"}
          width={" 100%"}
          backgroundImage={image}
          backgroundSize={"cover"}
          backgroundRepeat={"no-repeat"}
          backgroundPosition={"center"}
        />
        <LoginForm />
        <Flex
          width="100%"
          justifyContent={"center"}
          height="70px"
          border={"1PX solid #E2E8F0"}
          pt={5}
        >
          <Text color="gray" fontSize="xs">
            Copyright © 2022. All Rights Reserved.
          </Text>
        </Flex>
      </Flex>
      <Flex
        width={["100%", "100%", "50%", "50%"]}
        backgroundImage={image}
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        backgroundPosition={"center"}
      />
    </Flex>
  );
};

export default LoginPage;
