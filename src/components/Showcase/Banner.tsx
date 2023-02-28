import { Flex, Text } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import NormalButton from "../Button/NormalButton";

const Banner = () => {
  return (
    <Flex alignItems={"center"}>
      <Flex>
        <Flex w={"50%"}></Flex>
        <Flex w={"20%"} rounded={"32px"}></Flex>
      </Flex>
      <Flex w={"full"} alignItems={"center"} justifyContent={"space-between"}>
        <Flex
          w={"50%"}
          fontSize={"42px"}
          fontWeight={"700"}
          direction={"column"}
          alignItems={"left"}
          justifyContent={"center"}
        >
          <Text>Browse and Start</Text>
          <Text>selling your products</Text>
        </Flex>
        <Flex w={"50%"} justifyContent={"center"}>
          <NormalButton
            type="outline"
            text={"Check more"}
            rightIcon={<IoIosArrowForward />}
            width={"300px"}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Banner;
