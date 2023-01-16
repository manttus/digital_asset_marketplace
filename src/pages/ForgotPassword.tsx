import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Link,
  Image,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

type ForgotPasswordFormInputs = {
  email: string;
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <Flex
      minH={"100vh"}
      flexDirection={"column"}
      align={"center"}
      justify={"space-between"}
    >
      <Flex width="100%" height="80px" border={"1PX solid #E2E8F0"}>
        <Box>
          <Image src={logo} width="240px" height={"80px"} />
        </Box>
      </Flex>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading
          lineHeight={1.1}
          fontSize={{ base: "2xl", md: "3xl" }}
          textAlign={"center"}
        >
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
          textAlign={"center"}
        ></Text>
        <FormControl id="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"purple.600"}
            color={"white"}
            _hover={{
              bg: "purple.400",
            }}
          >
            Send Request
          </Button>
        </Stack>
        <Stack spacing={6} textAlign={"center"}>
          <Link
            color={"purple.600"}
            fontSize="md"
            fontWeight={"bold"}
            onClick={() => {
              navigate("/login");
            }}
          ></Link>
        </Stack>
      </Stack>
      <Flex
        width="100%"
        justifyContent={"center"}
        height="70px"
        border={"1PX solid #E2E8F0"}
        pt={5}
      ></Flex>
    </Flex>
  );
};

export default ForgotPassword;
