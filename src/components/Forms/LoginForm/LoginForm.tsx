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
import useInput from "../../../hooks/useInput";

interface Props {
  submitHandler: (
    event: React.FormEvent<HTMLFormElement>,
    email: String,
    password: String
  ) => void;
  isLoading: boolean;
}

const LoginForm = (props: Props) => {
  const {
    inputChangeHandler: emailChangeHandler,
    blurChangeHandler: emailBlurHandler,
    inputValue: emailValue,
    hasError: emailHasError,
    resetFields: emailResetFields,
  } = useInput((value: String) => value.includes("@"));

  const {
    inputChangeHandler: passwordChangeHandler,
    blurChangeHandler: passwordBlurHandler,
    inputValue: passwordValue,
    hasError: passwordHasError,
    resetFields: passwordResetFields,
  } = useInput((value: String) => value.trim().length > 6);

  const [showPassword, setShowPassword] = useState(false);
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    props.submitHandler(event, emailValue, passwordValue);
    emailResetFields();
    passwordResetFields();
  };

  return (
    <Flex height={"60%"}>
      <form onSubmit={submitHandler}>
        <Box p={5} width="350px">
          <Stack spacing={5}>
            <FormControl id="email" isInvalid={emailHasError}>
              <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
                Phone / E-mail
              </FormLabel>
              <Input
                fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}
                type="email"
                variant={"flushed"}
                value={emailValue}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  emailChangeHandler(e.currentTarget.value);
                }}
                onBlur={emailBlurHandler}
              />
            </FormControl>
            <FormControl id="password" isInvalid={passwordHasError}>
              <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}
                  type={showPassword ? "text" : "password"}
                  variant={"flushed"}
                  value={passwordValue}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    passwordChangeHandler(e.currentTarget.value);
                  }}
                  onBlur={passwordBlurHandler}
                />
                <InputRightElement h={"75%"}>
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
                  isLoading={props.isLoading}
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
