import { Flex, Image, Text } from "@chakra-ui/react";
import noresult from "../assets/noresult.png";
const NoResult = () => {
  return (
    <Flex direction={"column"} alignItems={"center"}>
      <Image src={noresult} w={"450px"} />
      {/* <Text fontSize={"28px"} fontWeight={"600"}>
        No Result Found
      </Text> */}
    </Flex>
  );
};

export default NoResult;
