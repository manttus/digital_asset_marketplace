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
  Divider,
  Text,
  Center,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import React, { useState } from "react";
import { motion } from "framer-motion";
import useInput from "../../../hooks/useInput";

interface Props {
  submitHandler: (
    event: React.FormEvent<HTMLFormElement>,
    email: string
  ) => void;
  isSending: boolean;
  oauthHandler: () => void;
}

const LoginForm = (props: Props) => {
  const {
    inputChangeHandler: emailChangeHandler,
    blurChangeHandler: emailBlurHandler,
    inputValue: emailValue,
    resetFields: emailResetFields,
  } = useInput((value: String) => value.includes("@"));

  const {
    inputChangeHandler: passwordChangeHandler,
    blurChangeHandler: passwordBlurHandler,
    inputValue: passwordValue,
    resetFields: passwordResetFields,
  } = useInput((value: String) => value.trim().length > 6);

  const [showPassword, setShowPassword] = useState(false);
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    props.submitHandler(event, emailValue);
    emailResetFields();
    passwordResetFields();
  };

  return (
    <Flex height={"full"} alignItems={"center"}>
      <form onSubmit={submitHandler}>
        <Box p={5} width="350px">
          <Stack spacing={5}>
            <Flex mb={"5"}>
              <Button
                onClick={() => props.oauthHandler()}
                as={motion.button}
                w={"345px"}
                variant={"outline"}
                leftIcon={<FcGoogle />}
                whileHover={{ scale: 1.05 }}
              >
                <Center>
                  <Text fontWeight={"500"} fontSize={"sm"}>
                    Sign in with Google
                  </Text>
                </Center>
              </Button>
            </Flex>
            <FormControl id="email">
              <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
                Phone / E-mail
              </FormLabel>
              <Input
                fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}
                type="text"
                variant={"filled"}
                value={emailValue}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  emailChangeHandler(e.currentTarget.value);
                }}
                onBlur={emailBlurHandler}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}
                  type={showPassword ? "text" : "password"}
                  value={passwordValue}
                  variant={"filled"}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    passwordChangeHandler(e.currentTarget.value);
                  }}
                  onBlur={passwordBlurHandler}
                />
                <InputRightElement>
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
            <Stack spacing={5}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              ></Stack>

              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Link fontSize={"sm"} color={"purple.500"}>
                  Forgot Password?
                </Link>
                <Button
                  w={"40%"}
                  isLoading={props.isSending}
                  type="submit"
                  as={motion.button}
                  fontWeight={"300"}
                  fontSize={"sm"}
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
