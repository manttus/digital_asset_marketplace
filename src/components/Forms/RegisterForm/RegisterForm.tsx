import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  Input,
  FormLabel,
  HStack,
  Button,
  Center,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export const FormStep1 = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Flex justifyContent={"center"} mt={"8"}>
      <form>
        <HStack spacing={8}>
          <FormControl id="email">
            <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
              First Name
            </FormLabel>
            <Input
              type="email"
              variant={"flushed"}
              focusBorderColor={"purple.500"}
              fontSize={"sm"}
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
        <HStack spacing={20} mt={"40px"}>
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
        <HStack mt={"40px"}>
          <Button
            size={"md"}
            onClick={() => {}}
            as={motion.button}
            w={"full"}
            variant={"outline"}
            leftIcon={<FcGoogle />}
            whileHover={{ scale: 1.05 }}
          >
            <Center>
              <Text fontWeight={"500"} fontSize={"sm"}>
                Sign up with Google
              </Text>
            </Center>
          </Button>
        </HStack>
        <HStack spacing={10} mt={"40px"}>
          <FormControl id="email">
            <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
              Password
            </FormLabel>
            <InputGroup>
              <Input
                fontSize={"sm"}
                type={showPassword ? "text" : "password"}
                focusBorderColor={"purple.400"}
                variant={"flushed"}
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
