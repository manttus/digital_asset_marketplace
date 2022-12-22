import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useRegisterMutation } from "../../../features/api/apiSlice";
import useInput from "../../../hooks/useInput";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();

  const {
    hasError: inputHasError,
    inputChangeHandler: emailInputHandler,
    blurChangeHandler: emailBlurHandler,
    inputValue: emailValue,
    resetFields: emailReset,
  } = useInput((email: string) => email.includes("@"));

  const {
    hasError: nameHasError,
    inputChangeHandler: nameInputHandler,
    blurChangeHandler: nameBlurHandler,
    inputValue: nameValue,
    resetFields: nameReset,
  } = useInput((name: string) => name.length > 6);

  const {
    hasError: passHasError,
    inputChangeHandler: passInputHandler,
    blurChangeHandler: passBlurHandler,
    inputValue: passValue,
    resetFields: passReset,
  } = useInput((pass: string) => pass.length > 8);

  const submitHandler = async (event: any) => {
    event.preventDefault();
    const isFormValid = inputHasError && nameHasError && passHasError;
    if (!isFormValid) {
      const data = { email: emailValue, pass: passValue, username: nameValue };
      const message = await register(data).unwrap();
      console.log(message);
      emailReset();
      nameReset();
      passReset();
    }
  };

  return (
    <Box width={["350px", "450px", "450px", "450px"]}>
      <Stack pb={"50"}>
        <Text
          fontSize={"30px"}
          fontWeight={"bold"}
          pb={"3"}
          textAlign={["center", "center", "left", "left"]}
        >
          NFT AWAITS
        </Text>
        <Divider borderColor={"#D3D3D3"} />
      </Stack>

      <form onSubmit={submitHandler}>
        <Stack>
          <FormControl id="firstName" isInvalid={nameHasError} isRequired>
            <HStack justifyContent={"space-between"}>
              <FormLabel fontSize={"md"} mr={10} fontWeight="bold">
                Username
              </FormLabel>
              <Input
                type="text"
                variant={"filled"}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  nameInputHandler(event.target.value)
                }
                onBlur={nameBlurHandler}
                value={nameValue}
              />
            </HStack>
          </FormControl>
        </Stack>
        <Stack pt={5}>
          <FormControl id="email" isInvalid={inputHasError} isRequired>
            <HStack justifyContent={"space-between"}>
              <FormLabel fontSize={"md"} mr={"63px"} fontWeight="bold">
                Email
              </FormLabel>
              <Input
                type="email"
                variant={"filled"}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  emailInputHandler(event.target.value);
                }}
                onBlur={emailBlurHandler}
                value={emailValue}
              />
            </HStack>
          </FormControl>
        </Stack>
        <Stack pt={5}>
          <FormControl id="password" isInvalid={passHasError} isRequired>
            <HStack>
              <FormLabel fontSize={"md"} mr={10} fontWeight="bold">
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  variant={"filled"}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    passInputHandler(event.target.value);
                  }}
                  onBlur={passBlurHandler}
                  value={passValue}
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
            </HStack>
          </FormControl>
        </Stack>
        <Stack pt={10}>
          <Divider borderColor={"#D3D3D3"} />
        </Stack>
        <Stack pt={6} direction={"row"} justify={"space-between"}>
          <Checkbox colorScheme={"purple"}>
            <Text fontSize={"md"}>
              I agree{" "}
              <Link color={"purple.600"} fontWeight={"bold"} fontSize={"sm"}>
                Terms & Condition{" "}
              </Link>
            </Text>
          </Checkbox>
          <Button
            type="submit"
            isLoading={isLoading}
            size="sm"
            width={"100px"}
            bg={"purple.600"}
            color={"white"}
            _hover={{
              bg: "purple.500",
            }}
          >
            Register
          </Button>
        </Stack>
      </form>
      <Stack pt={[10, 14, 14, 14]}>
        <Text align={"center"} fontSize="md">
          Already a Member?
          <Link
            color={"purple.600"}
            fontWeight={"bold"}
            onClick={() => navigate("/login")}
          >
            {" "}
            Sign In
          </Link>
        </Text>
      </Stack>
    </Box>
  );
};

export default RegisterForm;
