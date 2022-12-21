import { SmallCloseIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
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
import { NavLink, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [usename, setUsername] = useState("");
  return (
    <Box width={"450px"} p={"20px"}>
      <Stack pb={"50"}>
        <Text fontSize={"35px"} fontWeight={"bold"} pb={"3"}>
          {" "}
          WELCOME BACK
        </Text>
        <Divider borderColor={"#D3D3D3"} />
      </Stack>
      <FormControl id="username" isRequired>
        <HStack>
          <FormLabel fontSize={"sm"} mr={10} fontWeight="bold">
            Username
          </FormLabel>
          <InputGroup>
            <Input
              colorScheme={"purple.600"}
              type="text"
              borderWidth={"1px"}
              isRequired
              value={usename}
              variant={"filled"}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputRightElement h={"full"}>
              <Button onClick={() => setUsername("")} variant={"ghost"}>
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
          loadingText="Submitting"
          size="sm"
          width={"100px"}
          bg={"purple.600"}
          color={"white"}
          _hover={{
            bg: "purple.500",
          }}
        >
          Login
        </Button>
      </Stack>
      <Stack pt={14} alignItems={"center"}>
        <Text align={"center"} fontSize="sm">
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
