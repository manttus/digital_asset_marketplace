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
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../features/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredintials } from "../../../features/auth/authSlice";
import jwt_decode from "jwt-decode";
import useInput from "../../../hooks/useInput";

const LoginForm = () => {
  const toast = useToast();
  const [hasError, setHasError] = useState(false);
  const [login, { isLoading, isSuccess }] = useLoginMutation();
  const [saveEmail, setSaveEmail] = useState(
    localStorage.getItem("email") ? true : false
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    hasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    blurChangeHandler: emailBlurHandler,
    inputValue: emailValue,
    resetFields: emailFieldReset,
  } = useInput((email) => email.includes("@"));

  const {
    hasError: passHasError,
    inputChangeHandler: passChangeHandler,
    blurChangeHandler: passBlurHandler,
    inputValue: passValue,
    resetFields: passFieldReset,
  } = useInput((pass) => pass.length > 8);

  useEffect(() => {
    if (hasError) {
      setHasError(false);
    }
  }, [hasError]);

  useEffect(() => {
    emailChangeHandler(
      localStorage.getItem("email") ? localStorage.getItem("email")! : ""
    );
  }, []);

  const submitHandler = async (e: any) => {
    e.preventDefault();

    try {
      const data = { email: emailValue, pass: passValue };
      const userData = await login(data).unwrap();
      const decoded: any = jwt_decode(userData.accessToken);
      localStorage.setItem("Tokens", JSON.stringify(userData));
      dispatch(
        setCredintials({ token: userData.accessToken, user: decoded._id })
      );
      emailFieldReset();
      passFieldReset();
      if (saveEmail) {
        localStorage.setItem("email", emailValue);
      } else {
        localStorage.removeItem("email");
      }
      navigate("/");
    } catch (err: any) {
      if (err.status === 400) {
        setHasError(true);
        console.log({ message: " Invalid Username & Password" });
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box width={["350px", "450px", "450px", "450px"]} p={"20px"}>
      <Stack pb={"50"}>
        <Text
          fontSize={"30px"}
          fontWeight={"bold"}
          pb={"3"}
          textAlign={"center"}
        >
          WELCOME BACK
        </Text>
        <Divider borderColor={"#D3D3D3"} />
      </Stack>
      <form onSubmit={submitHandler}>
        <FormControl id="username" isInvalid={emailHasError} isRequired>
          <HStack justifyContent={"space-between"}>
            <FormLabel fontSize={"md"} fontWeight="bold">
              Email
            </FormLabel>
            <Box width={"65%"}>
              <InputGroup>
                <Input
                  colorScheme={"purple.600"}
                  type="email"
                  borderWidth={"1px"}
                  isRequired
                  value={emailValue}
                  variant={"filled"}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    emailChangeHandler(event.target.value);
                  }}
                  onBlur={emailBlurHandler}
                />
                <InputRightElement h={"full"}>
                  <Button
                    onClick={() => emailChangeHandler("")}
                    variant="ghost"
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

        <FormControl id="password" isInvalid={passHasError} pt={6} isRequired>
          <HStack justifyContent={"space-between"}>
            <FormLabel fontSize={"md"} fontWeight="bold">
              Password
            </FormLabel>
            <Box width={"65%"}>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  borderWidth={"1px"}
                  variant={"filled"}
                  value={passValue}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    passChangeHandler(event.target.value);
                  }}
                  onBlur={passBlurHandler}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword: boolean) => !showPassword)
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
        <Stack spacing={10} pt={8}>
          <Stack direction={{ base: "column", sm: "row" }} justify={"flex-end"}>
            <Link color={"purple.600"} fontSize="md" fontWeight={"bold"}>
              Forgot password?
            </Link>
          </Stack>
        </Stack>
        <Stack pt={6}>
          <Divider borderColor={"#D3D3D3"} />
        </Stack>

        <Stack pt={6} direction={"row"} justify={"space-between"}>
          <Checkbox
            colorScheme={"purple"}
            onChange={() => {
              setSaveEmail(true);
            }}
            defaultChecked={localStorage.getItem("email") ? true : false}
          >
            <Text fontSize={"md"}>Remember Me</Text>
          </Checkbox>
          <Button
            isLoading={isLoading}
            size="md"
            width={"100px"}
            bg={"purple.600"}
            color={"white"}
            _hover={{
              bg: "purple.500",
            }}
            type="submit"
          >
            Login
          </Button>
        </Stack>
      </form>

      <Stack pt={[10, 14, 14, 14]} alignItems={"center"}>
        <Text align={"center"} fontSize={"md"}>
          Don't have an Account?
          <Link
            color={"purple.600"}
            onClick={() => navigate("/register")}
            fontWeight="bold"
          >
            {" "}
            Register
          </Link>
        </Text>
      </Stack>
      <Box hidden>
        {isSuccess &&
          !toast.isActive(1) &&
          toast({
            id: 1,
            title: "Account Logged.",
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
            title: "Invalid Credentials.",
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

export default LoginForm;
