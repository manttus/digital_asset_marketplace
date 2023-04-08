import {
  FormControl,
  Stack,
  Box,
  Input,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import NormalButton from "../Button/NormalButton";
import CustomLink from "../Links/CustomLink";
import { useNavigate } from "react-router-dom";
import { LoginFormType, LoginProps } from "../../types/LoginPageType";

const Login = ({ sendOtp, isLoading, oauth }: LoginProps) => {
  const {
    register,
    handleSubmit,
    formState: {
      errors: { type, pass },
    },
    reset,
  } = useForm<LoginFormType>();

  const navigate = useNavigate();

  return (
    <Box
      as="form"
      onSubmit={handleSubmit((data) => {
        sendOtp(data);
        reset();
      })}
      w={"400px"}
    >
      <Stack spacing={6}>
        <FormControl isInvalid={type ? true : false}>
          <Input
            {...register("type", {
              required: true,
              minLength: { value: 4, message: "Minimum Value 4" },
            })}
            focusBorderColor={"buttonPrimary"}
            placeholder={"Email or Phone"}
            type={"text"}
            py={6}
            px={5}
          />
        </FormControl>
        <FormControl isInvalid={pass ? true : false}>
          <Input
            {...register("pass", {
              required: true,
              minLength: { value: 8, message: "Minimum Value 8" },
            })}
            placeholder={"Password"}
            focusBorderColor={"buttonPrimary"}
            type={"password"}
            py={6}
            px={5}
          />
        </FormControl>
        <Flex justifyContent={"end"}>
          <CustomLink
            text={"Forgot Password"}
            size={"15px"}
            onClick={() => {
              navigate("/forgot");
            }}
          />
        </Flex>
        <NormalButton
          text="Login"
          type={"filled"}
          bg={"buttonPrimary"}
          fontSize={"15px"}
          isLoading={isLoading}
          onClick={() => {}}
        />

        <Button
          w={"full"}
          variant={"outline"}
          leftIcon={<FcGoogle size={"20px"} />}
          py={"25px"}
          fontSize={"15px"}
          onClick={oauth}
          transition={"all 0.3s ease-in-out"}
          _hover={{
            bg: "white",
            transform: "scale(1.02)",
            transition: "all 0.3s ease-in-out",
          }}
          iconSpacing={4}
        >
          <Text>Sign in with Google</Text>
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;
