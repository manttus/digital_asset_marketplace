import { Flex } from "@chakra-ui/react";
import MintForm from "../components/Forms/MintForm/MintForm";

const MintPage = () => {
  return (
    <Flex h={"80vh"} justifyContent={"center"} alignItems={"center"}>
      <Flex h={"full"} width={"50%"}></Flex>
      <Flex
        h={"full"}
        width={"50%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <MintForm />
      </Flex>
    </Flex>
  );
};

export default MintPage;
