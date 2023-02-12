import { Flex, Box, Text, HStack } from "@chakra-ui/react";
import Illustration from "../../assets/illustration6.png";
import { FaEthereum } from "react-icons/fa";

const MarketCard = () => {
  return (
    <Flex
      height={"250px"}
      width={"210px"}
      shadow={"xs"}
      border={"1px"}
      borderColor={"blackAlpha.400"}
      borderRadius={"xs"}
      _hover={{
        borderColor: "blackAlpha.600",
        marginTop: "-10px",
      }}
      direction={"column"}
    >
      <Flex
        height={"90%"}
        w={"full"}
        bg={"gray"}
        backgroundImage={Illustration}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
      ></Flex>
      <Flex
        height={"20%"}
        w={"full"}
        alignItems={"center"}
        justifyContent={"space-between"}
        px={"10px"}
      >
        <Box>
          <b>21005</b>
        </Box>
        <HStack display={"flex"} alignItems={"center"}>
          <FaEthereum size={"15px"} />
          <Text>0.154</Text>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default MarketCard;
