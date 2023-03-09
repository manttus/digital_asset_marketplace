import { Flex, Box } from "@chakra-ui/react";
import NormalButton from "../components/Button/NormalButton";

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
        <Box as={"form"}>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Category" />
          <input type="text" placeholder="Type" />
          <input type="text" placeholder="Asset" />
          <NormalButton text="Mint" />
        </Box>
      </Flex>
    </Flex>
  );
};

export default MintPage;
