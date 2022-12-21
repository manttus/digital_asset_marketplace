import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  Image,
  Checkbox,
} from "@chakra-ui/react";
import logo from "../assets/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/illustration4.png";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Flex height={"100vh"}>
      <Flex
        width={"50%"}
        backgroundImage={image}
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        backgroundPosition={"center"}
      />
      <Flex
        width={"50%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"column"}
      >
        <Flex
          width="100%"
          height="80px"
          alignItems={"center"}
          border={"1PX solid #E2E8F0"}
        >
          {" "}
          <Box>
            <Image src={logo} width="240px" height={"80px"} />
          </Box>
        </Flex>

        <Box width={"450px"}>
          <Stack pb={"50"}>
            <Text fontSize={"35px"} fontWeight={"bold"} pb={"3"}>
              NFT AWAITS
            </Text>
            <Divider borderColor={"#D3D3D3"} />
          </Stack>

          <Stack>
            <Box>
              <FormControl id="firstName" isRequired>
                <HStack justifyContent={"space-between"}>
                  <FormLabel fontSize={"sm"} mr={10} fontWeight="bold">
                    Username
                  </FormLabel>
                  <Input type="text" variant={"filled"} />
                </HStack>
              </FormControl>
            </Box>
          </Stack>
          <Stack pt={5}>
            <FormControl id="email" isRequired>
              <HStack justifyContent={"space-between"}>
                <FormLabel fontSize={"sm"} mr={"63px"} fontWeight="bold">
                  Email
                </FormLabel>
                <Input type="email" variant={"filled"} />
              </HStack>
            </FormControl>
          </Stack>
          <Stack pt={5}>
            <FormControl id="password" isRequired>
              <HStack>
                <FormLabel fontSize={"sm"} mr={10} fontWeight="bold">
                  Password
                </FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    variant={"filled"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword(
                          (showPassword: boolean) => !showPassword
                        )
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
              <Text fontSize={"sm"}>
                I agree{" "}
                <Link color={"purple.600"} fontWeight={"bold"}>
                  Terms & Condition{" "}
                </Link>
              </Text>
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
              Register
            </Button>
          </Stack>
        </Box>
        <Stack pt={5}>
          <Text align={"center"} fontSize="sm">
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
        <Flex
          width="100%"
          justifyContent={"center"}
          height="70px"
          border={"1PX solid #E2E8F0"}
          pt={5}
        >
          <Text color="gray.500" fontSize="xs">
            Copyright © 2022. All Rights Reserved.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RegisterPage;
