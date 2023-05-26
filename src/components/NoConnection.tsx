import { Spinner, Flex, Text } from "@chakra-ui/react";

const NoConnection = () => {
  return (
    <Flex
      gap={8}
      alignItems={"center"}
      justifyContent={"center"}
      direction={"column"}
      height={"500px"}
    >
      <Spinner height={"50px"} width={"50px"} />
      <Text fontSize={"21px"}>Awaiting MetaMask Connection</Text>
    </Flex>
  );
};

export default NoConnection;
