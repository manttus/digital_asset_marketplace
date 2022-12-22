import { SmallCloseIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRegisterMutation } from "../../../features/api/apiSlice";
import useInput from "../../../hooks/useInput";

const RegisterForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [hasError, setHasError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [register, { isLoading, isSuccess }] = useRegisterMutation();

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
  } = useInput((name: string) => name.length >= 6);

  const {
    hasError: passHasError,
    inputChangeHandler: passInputHandler,
    blurChangeHandler: passBlurHandler,
    inputValue: passValue,
    resetFields: passReset,
  } = useInput((pass: string) => pass.length > 8);

  useEffect(() => {
    if (hasError) {
      setHasError(false);
    }
  }, [hasError]);

  const submitHandler = async (event: any) => {
    event.preventDefault();
    const isFormValid = inputHasError && nameHasError && passHasError;
    if (!isFormValid) {
      try {
        const data = {
          email: emailValue,
          pass: passValue,
          username: nameValue,
        };
        const message = await register(data).unwrap();
        console.log(message);
        emailReset();
        nameReset();
        passReset();
        navigate("/login");
      } catch (err) {
        setHasError(true);
        console.log({ message: err });
      }
    }
  };

  return (
    <Box width={["350px", "450px", "450px", "450px"]}>
      <Stack pb={"50"}>
        <Text
          fontSize={"30px"}
          fontWeight={"bold"}
          pb={"3"}
          textAlign={"center"}
        >
          NFT AWAITS
        </Text>
        <Divider borderColor={"#D3D3D3"} />
      </Stack>

      <form onSubmit={submitHandler}>
        <Stack>
          <FormControl id="firstName" isInvalid={nameHasError} isRequired>
            <HStack justifyContent={"space-between"}>
              <FormLabel fontSize={"md"} fontWeight="bold">
                Username
              </FormLabel>
              <Box width={"65%"}>
                <InputGroup>
                  <Input
                    type="text"
                    variant={"filled"}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      nameInputHandler(event.target.value)
                    }
                    onBlur={nameBlurHandler}
                    value={nameValue}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      onClick={() => nameReset()}
                      variant={"ghost"}
                      h="1.75rem"
                      size="xs"
                    >
                      <SmallCloseIcon />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
            </HStack>
          </FormControl>
        </Stack>
        <Stack pt={5}>
          <FormControl id="email" isInvalid={inputHasError} isRequired>
            <HStack justifyContent={"space-between"}>
              <FormLabel fontSize={"md"} fontWeight="bold">
                Email
              </FormLabel>
              <Box width={"65%"}>
                <InputGroup>
                  <Input
                    type="email"
                    variant={"filled"}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      emailInputHandler(event.target.value);
                    }}
                    onBlur={emailBlurHandler}
                    value={emailValue}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      onClick={() => emailReset()}
                      variant={"ghost"}
                      h="1.75rem"
                      size="xs"
                    >
                      <SmallCloseIcon />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
            </HStack>
          </FormControl>
        </Stack>
        <Stack pt={5}>
          <FormControl id="password" isInvalid={passHasError} isRequired>
            <HStack justifyContent={"space-between"}>
              <FormLabel fontSize={"md"} fontWeight="bold">
                Password
              </FormLabel>
              <Box width={"65%"}>
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
                        setShowPassword(
                          (showPassword: boolean) => !showPassword
                        )
                      }
                      h="1.75rem"
                      size="xs"
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
            </HStack>
          </FormControl>
        </Stack>
        <Stack pt={10}>
          <Divider borderColor={"#D3D3D3"} />
        </Stack>
        <Stack pt={6} direction={"row"} justify={"space-between"}>
          <Checkbox colorScheme={"purple"} required>
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
            size="md"
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
      <Box hidden>
        {isSuccess &&
          !toast.isActive(1) &&
          toast({
            id: 1,
            title: "Account Created.",
            status: "success",
            duration: 2000,
            variant: "left-accent",
            isClosable: true,
            position: "top-right",
          })}
        {hasError &&
          !toast.isActive(2) &&
          toast({
            id: 2,
            title: "Oops! Something Went Wrong.",
            status: "error",
            duration: 2000,
            variant: "left-accent",
            position: "top-right",
            isClosable: true,
          })}
      </Box>
    </Box>
  );
};

export default RegisterForm;
