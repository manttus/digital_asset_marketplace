import {
  Flex,
  FormControl,
  Input,
  FormLabel,
  HStack,
  Box,
} from "@chakra-ui/react";

export const FormStep1 = () => {
  return (
    <Flex justifyContent={"center"} mt={"55"}>
      <form>
        <HStack spacing={10}>
          <FormControl id="email">
            <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
              First Name
            </FormLabel>
            <Input type="email" variant={"flushed"} />
          </FormControl>
          <FormControl id="email">
            <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
              Surname
            </FormLabel>
            <Input type="email" variant={"flushed"} />
          </FormControl>
        </HStack>
        <HStack spacing={10} mt={"40px"}>
          <FormControl id="email">
            <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
              E-mail / Phone
            </FormLabel>
            <Input type="email" variant={"flushed"} />
          </FormControl>
        </HStack>
        <HStack spacing={10} mt={"40px"}>
          <FormControl id="email">
            <FormLabel fontSize={{ sm: "sm", md: "sm", lg: "sm", xl: "sm" }}>
              Password
            </FormLabel>
            <Input type="email" variant={"flushed"} />
          </FormControl>
        </HStack>
      </form>
    </Flex>
  );
};

export const FormStep2 = () => {
  return (
    <Flex>
      <h1>Step 2</h1>
    </Flex>
  );
};

export const FormStep3 = () => {
  return (
    <Flex>
      <h1>Step 3</h1>
    </Flex>
  );
};
