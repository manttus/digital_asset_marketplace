import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useHttp from "../../hooks/useHttp";
import NormalButton from "../Button/NormalButton";
import { useSelector } from "react-redux";
import { selectUserData } from "../../features/auth/authSlice";

type EditProps = {
  // userData: {
  //   username: string;
  //   phone: string;
  //   email: string;
  //   country: string;
  //   address: string;
  //   postal: string;
  //   id: string;
  // };
  submitHandler: (data: FormData) => Promise<void>;
};

type FormData = {
  username: string;
  phone: string;
  email: string;
  country: string;
  address: string;
  postal: string;
  id: string;
  backgroundImage: Buffer;
  profileImage: Buffer;
  followers: string[];
  following: string[];
};

const Edit = ({ submitHandler }: EditProps) => {
  const [countries, setContries] = useState<any>([]);
  const { register, handleSubmit } = useForm<FormData>();
  const userData = useSelector(selectUserData);
  console.log(userData);

  useEffect(() => {
    const requestConfig = {
      url: "https://restcountries.com/v3.1/all",
      method: "GET",
      body: {},
    };
    const { sendRequest } = useHttp<any>(requestConfig, (data) => {
      setContries(data);
    });
    sendRequest();
  }, []);

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
            value={userData.username}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email Address</FormLabel>
          <Input
            {...register("email", { required: true })}
            type={"text"}
            h={12}
            rounded={"sm"}
            fontWeight={"500"}
            value={userData.email}
          />
        </FormControl>
      </HStack>
      <HStack spacing={5}>
        <FormControl>
          <FormLabel>Country</FormLabel>
          <Select
            {...register("country", { required: true })}
            fontWeight={"500"}
          >
            {countries.map((country: any) => {
              return (
                <option
                  key={country.cca2}
                  selected={country.name.common === userData.country}
                >
                  {country.name.common}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Address Line</FormLabel>
          <Input
            {...register("address", { required: true })}
            type={"text"}
            h={12}
            rounded={"sm"}
            fontWeight={"500"}
            value={userData.address}
          />
        </FormControl>
      </HStack>
      <HStack spacing={5}>
        <FormControl>
          <FormLabel>Zip Code</FormLabel>
          <Input
            {...register("postal", { required: true })}
            type={"text"}
            h={12}
            rounded={"sm"}
            fontWeight={"500"}
            value={userData.postal}
          />
        </FormControl>
        <FormControl>
          <FormLabel> Phone Number</FormLabel>
          <Input
            {...register("phone", { required: true })}
            type={"text"}
            h={12}
            rounded={"sm"}
            fontWeight={"500"}
            value={userData.phone}
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
