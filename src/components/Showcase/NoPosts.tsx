import { Flex, Text } from "@chakra-ui/react";
const NoPost = ({ text }: { text: string }) => {
  return (
    <Flex
      justifyContent={"center"}
      w={"100%"}
      alignItems={"center"}
      height={"300px"}
    >
      <Text fontSize={"lg"} fontWeight={"bold"} color={"gray.500"}>
        {text}
      </Text>
    </Flex>
  );
};

export default NoPost;
