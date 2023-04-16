import {
  Box,
  FormControl,
  FormLabel,
  VStack,
  Input,
  HStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import NormalButton from "../Button/NormalButton";
import { useSelector } from "react-redux";
import { selectUserData } from "../../features/auth/authSlice";

type EditProps = {
  submitHandler: (data: FormData) => Promise<void>;
};

type FormData = {
  username: string;
  email: string;
  twitter: string;
  instagram: string;
};

const Edit = ({ submitHandler }: EditProps) => {
  const { register, handleSubmit } = useForm<FormData>();
  const userData = useSelector(selectUserData);

  return (
    <Box
      as="form"
      display={"flex"}
      flexDirection={"column"}
      gap={"10"}
      zIndex={2}
      w={"100%"}
      onSubmit={handleSubmit(submitHandler)}
    >
      <HStack spacing={5}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            {...register("username", { required: true })}
            type={"text"}
            h={12}
            rounded={"sm"}
            fontWeight={"500"}
            defaultValue={userData.username}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            {...register("email", { required: true })}
            type={"text"}
            h={12}
            rounded={"sm"}
            fontWeight={"500"}
            defaultValue={userData.email}
            disabled
          />
        </FormControl>
      </HStack>
      <HStack spacing={5}>
        <FormControl>
          <FormLabel>Twitter</FormLabel>
          <Input
            {...register("twitter", { required: true })}
            type={"text"}
            h={12}
            rounded={"sm"}
            fontWeight={"500"}
            defaultValue={userData.social.twitter}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Instagram</FormLabel>
          <Input
            {...register("instagram", { required: true })}
            type={"text"}
            h={12}
            rounded={"sm"}
            fontWeight={"500"}
            defaultValue={userData.social.instagram}
          />
        </FormControl>
      </HStack>

      <HStack w={"full"} display={"flex"} justifyContent={"end"}>
        <NormalButton text="Save Changes" width="200px" />
      </HStack>
    </Box>
  );
};

export default Edit;

// Path: src\components\Forms\Edit.tsx
