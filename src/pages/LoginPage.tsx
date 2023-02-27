import { Text, Flex } from "@chakra-ui/react";
import Login from "../components/Forms/Login";

const LoginPage = () => {
  return (
    <Flex alignItems={"center"} py={"10px"} direction={"column"}>
      <Flex py={"30px"}>
        <Text fontSize={"38px"} fontWeight={"700"}>
          Login
        </Text>
      </Flex>
      <Flex w={"full"} justifyContent={"center"}>
        <Login />
      </Flex>
    </Flex>
  );
};

export default LoginPage;
