import { Spinner, Flex, Text } from "@chakra-ui/react";

const NoConnection = () => {
  return (
    <Flex gap={8} alignItems={"center"} direction={"column"}>
      <Spinner height={"30px"} width={"30px"} />
      <Text fontSize={"21px"}>Awaiting MetaMask Connection</Text>
    </Flex>
  );
};

export default NoConnection;
