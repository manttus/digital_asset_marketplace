import {
  Box,
  Flex,
  FormControl,
  HStack,
  Input,
  PinInput,
  PinInputField,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import CustomLink from "../Links/CustomLink";
import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { StepProps, StepType1, StepType2 } from "../../types/RegisterPageType";

export const Step1 = ({ submitHandler, userData }: StepProps) => {
  const { register, watch } = useForm<StepType1>();
  useEffect(() => {
    submitHandler!(watch());
  }, [watch("first"), watch("last"), watch("user"), watch("password")]);
  return (
    <Box as={"form"} w={"450px"}>
      <Stack spacing={5}>
        <HStack spacing={3}>
          <FormControl>
            <Input
              {...register("first", {
                required: true,
                minLength: { value: 4, message: "Minimum Value 4" },
                maxLength: { value: 4, message: "Maximum Value 4" },
              })}
              placeholder={"First Name"}
              type={"text"}
              py={6}
              px={5}
              value={userData.name && userData.name?.split(" ")[0]}
            />
          </FormControl>
          <FormControl>
            <Input
              {...register("last", {
                required: true,
                minLength: { value: 4, message: "Minimum Value 4" },
                maxLength: { value: 4, message: "Maximum Value 4" },
              })}
              placeholder={"Last Name"}
              type={"text"}
              py={6}
              px={5}
              value={userData.name && userData.name?.split(" ")[1]}
            />
          </FormControl>
        </HStack>
        <FormControl>
          <Input
            {...register("user", {
              required: true,
              minLength: { value: 4, message: "Minimum Value 4" },
              maxLength: { value: 4, message: "Maximum Value 4" },
            })}
            placeholder={"Email or Phone"}
            type={"text"}
            py={6}
            px={5}
            value={userData?.login}
          />
        </FormControl>
        <FormControl>
          <Input
            {...register("password", {
              required: true,
              minLength: { value: 4, message: "Minimum Value 4" },
              maxLength: { value: 4, message: "Maximum Value 4" },
            })}
            placeholder={"Password"}
            type={"password"}
            py={6}
            px={5}
          />
        </FormControl>
        <FormControl>
          <Input
            {...register("confirm", {
              required: true,
              minLength: { value: 4, message: "Minimum Value 4" },
              maxLength: { value: 4, message: "Maximum Value 4" },
              validate: (value) => {
                return value === watch("password");
              },
            })}
            placeholder={"Confirm Password"}
            type={"password"}
            py={6}
            px={5}
          />
        </FormControl>
      </Stack>
    </Box>
  );
};

export const Step2 = ({ userData, verifyOtp }: StepProps) => {
  return (
    <Box as={"form"} w={"400px"}>
      <Flex w={"full"} gap={8} direction={"column"} alignItems={"center"}>
        <Flex direction={"column"} alignItems={"center"} gap={2}>
          <Text fontSize={"18px"}>We have sent code to your email</Text>
          <Text fontSize={"15px"} fontWeight={"600"}>
            {userData.login}
          </Text>
        </Flex>
        <HStack spacing={3}>
          <PinInput
            size={"lg"}
            onComplete={(value) => {
              verifyOtp!(userData!.login!, value);
            }}
          >
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
      </Flex>

      <Flex justifyContent={"center"} mt={5}>
        <CustomLink text={"Resend OTP"} size="15px" />
      </Flex>
    </Box>
  );
};

export const Step3 = ({ submitHandler, userData }: StepProps) => {
  const { register, watch } = useForm<StepType2>();
  const [countries, setContries] = useState([]);

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

  useEffect(() => {
    console.log(watch());
    submitHandler!(watch());
  }, [watch("contact"), watch("address"), watch("zipcode"), watch("country")]);

  return (
    <Box as={"form"} w={"450px"}>
      <Stack spacing={5}>
        <FormControl>
          {userData.login?.includes("@") ? (
            <Input
              {...register("contact", {
                required: true,
                minLength: { value: 4, message: "Minimum Value 4" },
                maxLength: { value: 4, message: "Maximum Value 4" },
              })}
              placeholder={"Phone Number"}
              type={"text"}
              py={6}
              px={5}
            />
          ) : (
            <Input
              {...register("contact")}
              placeholder={"Email Address"}
              type={"email"}
              py={6}
              px={5}
            />
          )}
        </FormControl>
        <FormControl>
          <Select
            placeholder="Country"
            size={"lg"}
            fontSize={"16px"}
            color={"gray.500"}
            {...register("country", { required: true })}
          >
            {countries.map((country: any) => {
              return (
                <option value={country.name.common} key={country.cca2}>
                  {country.name.common}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <FormControl>
          <Input
            {...register("address", {
              required: true,
              minLength: { value: 4, message: "Minimum Value 4" },
              maxLength: { value: 4, message: "Maximum Value 4" },
            })}
            placeholder={"Address Line 1"}
            type={"text"}
            py={6}
            px={5}
          />
        </FormControl>

        <FormControl>
          <Input
            {...register("zipcode", {
              required: true,
              minLength: { value: 4, message: "Minimum Value 4" },
              maxLength: { value: 4, message: "Maximum Value 4" },
            })}
            placeholder={"Postal Code"}
            type={"text"}
            py={6}
            px={5}
          />
        </FormControl>
      </Stack>
    </Box>
  );
};
