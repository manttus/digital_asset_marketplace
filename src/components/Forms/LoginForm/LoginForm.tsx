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
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../features/api/apiSlice";
import { useDispatch } from "react-redux";
import { setCredintials } from "../../../features/auth/authSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const emailHandler = (e: any) => {
    setEmail(e.target.value);
  };

  const passHandler = (e: any) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();

    try {
      const data = { email: email, pass: pass };
      console.log(data);
      const userData = await login(data).unwrap();
      console.log(userData);
      dispatch(setCredintials({ ...userData, user: email }));
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err: any) {
      if (err.status === 400) {
        console.log({ message: " Invalid Username & Password" });
      }
    }
  };

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box width={["350px", "450px", "450px", "450px"]} p={"20px"}>
      <Stack pb={"50"}>
        <Text
          fontSize={["25px", "25px", "30px", "30px"]}
          fontWeight={"bold"}
          pb={"3"}
          textAlign={["center", "center", "left", "left"]}
        >
          WELCOME BACK
        </Text>
        <Divider borderColor={"#D3D3D3"} />
      </Stack>
      <form onSubmit={submitHandler}>
        <FormControl id="username" isRequired>
          <HStack>
            <FormLabel fontSize={"sm"} mr={10} fontWeight="bold">
              Username
            </FormLabel>
            <InputGroup>
              <Input
                colorScheme={"purple.600"}
                type="email"
                borderWidth={"1px"}
                isRequired
                value={email}
                variant={"filled"}
                onChange={emailHandler}
              />
              <InputRightElement h={"full"}>
                <Button onClick={() => setEmail("")} variant={"ghost"}>
                  <SmallCloseIcon />
                </Button>
              </InputRightElement>
            </InputGroup>
          </HStack>
        </FormControl>

        <FormControl id="password" pt={6} isRequired>
          <HStack>
            <FormLabel fontSize={"sm"} mr={10} fontWeight="bold">
              Password
            </FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                borderWidth={"1px"}
                variant={"filled"}
                value={pass}
                onChange={passHandler}
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
        <Stack spacing={10} pt={8}>
          <Stack direction={{ base: "column", sm: "row" }} justify={"flex-end"}>
            <Link color={"purple.600"} fontSize="sm" fontWeight={"bold"}>
              Forgot password?
            </Link>
          </Stack>
        </Stack>
        <Stack pt={6}>
          <Divider borderColor={"#D3D3D3"} />
        </Stack>

        <Stack pt={6} direction={"row"} justify={"space-between"}>
          <Checkbox colorScheme={"purple"}>
            <Text fontSize={"sm"}>Remember me</Text>
          </Checkbox>
          <Button
            isLoading={isLoading}
            loadingText="Submitting"
            size="sm"
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
        <Text align={"center"} fontSize={["xs", "sm"]}>
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
    </Box>
  );
};

export default LoginForm;
