import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  Link,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    props.submitHandler(event);
  };

  return (
    <Flex height={"60%"}>
      <form onSubmit={submitHandler}>
        <Box p={5} width="350px">
          <Stack spacing={5}>
            <FormControl id="email">
              <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
                Phone / E-mail
              </FormLabel>
              <Input type="email" variant={"flushed"} />
            </FormControl>
            <FormControl id="password">
              <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  variant={"flushed"}
                />
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
            <Stack spacing={9}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              ></Stack>

              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Link
                  fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}
                  color={"purple.500"}
                >
                  Forgot Password?
                </Link>
                {/* <Checkbox size={"md"} colorScheme={"purple"}>
                  {" "}
                  Remember Me
                </Checkbox> */}
                <Button
                  as={motion.button}
                  fontWeight={"300"}
                  fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}
                  bg={"purple.400"}
                  whileHover={{ scale: 1.05 }}
                  color={"white"}
                  _hover={{
                    bg: "purple.500",
                  }}
                >
                  Login
                </Button>
              </Flex>
            </Stack>
          </Stack>
        </Box>
      </form>
    </Flex>
  );
};

export default LoginForm;
