import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  Input,
  FormLabel,
  HStack,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import { useState } from "react";
import useInput from "../../../hooks/useInput";

type Form1Props = {
  setFormData: (e: any) => void;
  formErrors: (e: boolean) => void;
};

export const FormStep1 = ({ formErrors, setFormData }: Form1Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const dataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((formData: any) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const {
    hasError: firstNameError,
    inputChangeHandler: firstNameHandler,
    blurChangeHandler: firstNameBlurHandler,
    resetFields: firstNameResetFields,
  } = useInput((value: string) => value.length !== 0);

  return (
    <Flex justifyContent={"center"} mt={"8"}>
      <form>
        <HStack spacing={8}>
          <FormControl isInvalid={firstNameError}>
            <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
              First Name
            </FormLabel>
            <Input
              type="text"
              name="firstName"
              variant={"outline"}
              focusBorderColor={"buttonPrimary"}
              fontSize={"sm"}
              onChange={dataHandler}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
              Last Name
            </FormLabel>
            <Input
              type="text"
              name="lastName"
              variant={"outline"}
              focusBorderColor={"buttonPrimary"}
              fontSize={"sm"}
              onChange={dataHandler}
            />
          </FormControl>
        </HStack>
        <HStack spacing={20} mt={"40px"}>
          <FormControl>
            <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
              E-mail / Phone
            </FormLabel>
            <Input
              type="text"
              name="type"
              variant={"outline"}
              focusBorderColor={"buttonPrimary"}
              fontSize={"sm"}
              onChange={dataHandler}
            />
          </FormControl>
        </HStack>
        <HStack spacing={10} mt={"40px"}>
          <FormControl>
            <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
              Password
            </FormLabel>
            <InputGroup>
              <Input
                fontSize={"sm"}
                name="password"
                type={showPassword ? "text" : "password"}
                focusBorderColor={"buttonPrimary"}
                variant={"outline"}
                onChange={dataHandler}
              />
              <InputRightElement>
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
          </FormControl>
        </HStack>
      </form>
    </Flex>
  );
};

export const FormStep3 = () => {
  return (
    <Flex justifyContent={"center"} my={"8"}>
      <form>
        <HStack spacing={10}>
          <FormControl id="email">
            <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
              First Name
            </FormLabel>
            <Input
              type="email"
              variant={"flushed"}
              focusBorderColor={"purple.500"}
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
              Surname
            </FormLabel>
            <Input
              type="email"
              variant={"flushed"}
              focusBorderColor={"purple.500"}
              fontSize={"sm"}
            />
          </FormControl>
        </HStack>
        <HStack spacing={10} mt={"40px"}>
          <FormControl id="email">
            <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
              E-mail / Phone
            </FormLabel>
            <Input
              type="email"
              variant={"flushed"}
              focusBorderColor={"purple.500"}
              fontSize={"sm"}
            />
          </FormControl>
        </HStack>
        <HStack spacing={10} mt={"40px"}>
          <FormControl id="email">
            <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
              Password
            </FormLabel>
            <Input
              variant={"flushed"}
              focusBorderColor={"purple.500"}
              fontSize={"sm"}
            />
          </FormControl>
        </HStack>
      </form>
    </Flex>
  );
};
