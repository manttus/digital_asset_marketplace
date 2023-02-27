import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Box,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import CustomButton from "../Buttons/CustomButton";

type LoginType = {
  type: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>();

  const submitHandler = (data: LoginType) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Stack spacing={10}>
        <FormControl isInvalid={errors.type ? true : false}>
          <FormLabel> Email/Phone </FormLabel>
          <Input
            {...register("type", {
              required: true,
              minLength: { value: 4, message: "" },
            })}
            type={"text"}
          />
          <FormErrorMessage>
            {errors.type && errors.type.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password ? true : false}>
          <FormLabel> Password </FormLabel>
          <Input
            {...register("type", { required: true, minLength: 8 })}
            type={"password"}
          />
        </FormControl>
        <Box>
          <CustomButton text="Login" onClick={() => {}} type={"filled"} />
        </Box>
      </Stack>
    </form>
  );
};

export default Login;
