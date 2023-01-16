import { Box, Button, FormControl, Link, Stack, Text, Input } from "@chakra-ui/react";

const ForgotForm = () => {
  return <Box width={"350px"}>
    <Text fontSize={"30px"} fontWeight={"bold"} textAlign={"center"}>
              FORGOT YOUR PASSWORD
            </Text>
            <Text
              fontSize={{ base: "sm", sm: "md" }}
              textAlign={"center"}
            ></Text>
            <FormControl id="email">
              <Input
                placeholder="your-email@example.com"
                _placeholder={{ color: "gray.500" }}
                type="email"
              />
            </FormControl>
            <Stack spacing={6}>
              <Button
                bg={"purple.600"}
                color={"white"}
                _hover={{
                  bg: "purple.400",
                }}
              >
                Send Request
              </Button>
            </Stack>
            <Stack spacing={6} textAlign={"center"}>
              <Link
                color={"purple.600"}
                fontSize="md"
                fontWeight={"bold"}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Back
              </Link>
  </Box>;
};

export default ForgotForm;
