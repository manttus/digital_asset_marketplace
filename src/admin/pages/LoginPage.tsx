import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";

import logo from "../../assets/logo2.png";
import NormalButton from "../../components/Button/NormalButton";
import { useForm } from "react-hook-form";
import useCustomToast from "../../hooks/useToast";
import { motion } from "framer-motion";
import { bottomVariants } from "../../theme/animation/variants";

const AdminLogin = () => {
  const { showToast } = useCustomToast();
  const {
    register,
    handleSubmit,
    formState: {
      errors: { username, password },
    },
  } = useForm<{
    username: string;
    password: string;
  }>();

  const authHandler = (data: { username: string; password: string }) => {
    if (data.username === "admin" && data.password === "admin") {
      showToast("Login Successful", "success", 2000);
    } else {
      showToast("Invalid Credentials", "error", 2000);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      rounded={"sm"}
    >
      <Stack
        spacing={10}
        mx={"auto"}
        py={16}
        px={6}
        as={"form"}
        onSubmit={handleSubmit((data: { username: string; password: string }) =>
          authHandler(data)
        )}
      >
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={10}
          w={"400px"}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          gap={6}
          as={motion.div}
          variants={bottomVariants}
          initial={"hidden"}
          animate={"visible"}
        >
          <Stack>
            <Image src={logo} w={"100px"} />
          </Stack>
          <Stack spacing={4} w={"full"}>
            <FormControl id="email" isInvalid={username ? true : false}>
              <FormLabel>Username</FormLabel>

              <Input
                {...register("username", {
                  required: true,
                })}
                type="text"
              />
            </FormControl>
            <FormControl id="password" isInvalid={password ? true : false}>
              <FormLabel>Password</FormLabel>
              <Input
                {...register("password", {
                  required: true,
                })}
                type="password"
              />
            </FormControl>
          </Stack>
          <Stack spacing={10} w={"full"}>
            <NormalButton type="filled" text="Login" />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default AdminLogin;
