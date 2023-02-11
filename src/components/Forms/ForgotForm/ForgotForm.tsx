import { Box, HStack } from "@chakra-ui/react";

const ForgotForm = () => {
  return (
    <Box width={"350px"}>
      <HStack display={"flex"} justifyContent={"space-between"}>
        <Box h={"150px"} w="150px" boxShadow={"md"} rounded={"md"}></Box>
        <Box h={"150px"} w="150px" boxShadow={"md"}></Box>
      </HStack>
    </Box>
  );
};

export default ForgotForm;
