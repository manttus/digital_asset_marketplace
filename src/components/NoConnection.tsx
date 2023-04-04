import { Spinner, Flex, Text } from "@chakra-ui/react";

const NoConnection = () => {
  return (
    <Flex gap={5} alignItems={"center"}>
      <Spinner />
      <Text fontSize={"18px"}>Awaiting MetaMask Connection</Text>
    </Flex>
  );
};

export default NoConnection;
