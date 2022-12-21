import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box width={"350px"}>
      <Heading fontSize={"4xl"} pb={10} textAlign={"center"}>
        Welcome Back
      </Heading>
      <FormControl id="email" isRequired>
        <FormLabel>Username</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl id="password" isRequired pt={6}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input type={showPassword ? "text" : "password"} />
          <InputRightElement h={"full"}>
            <Button
              variant={"ghost"}
              onClick={() =>
                setShowPassword((showPassword: boolean) => !showPassword)
              }
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Stack spacing={10} pt={5}>
        <Stack
          direction={{ base: "column", sm: "row" }}
          align={"start"}
          justify={"space-between"}
        >
          <Checkbox>Remember me</Checkbox>
          <Link color={"blue.400"}>Forgot password?</Link>
        </Stack>
      </Stack>

      <Stack spacing={10} pt={6}>
        <Button
          loadingText="Submitting"
          size="lg"
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
        >
          Login
        </Button>
      </Stack>
      <Stack pt={8}>
        <Text align={"center"} fontSize="md">
          Don't have a account ? <Link color={"blue.400"}>Sign Up</Link>
        </Text>
      </Stack>
    </Box>
  );
};

export default RegisterForm;
