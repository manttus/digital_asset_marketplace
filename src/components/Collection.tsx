import { Flex, Text } from "@chakra-ui/react";
import CustomBadge from "./Badge/CustomBadge";
import MarketCard from "./Cards/MarketCard";

const Collection = () => {
  return (
    <>
      <Flex justifyContent={"space-between"}>
        <Text
          as={Flex}
          fontSize={"28px"}
          fontWeight={"600"}
          alignItems={"center"}
          gap={5}
        >
          Collections Products
          <CustomBadge text="40+" color="orange" bg="orangeLight" />
        </Text>

        <Text
          fontSize={"13px"}
          fontWeight={"700"}
          letterSpacing={"2px"}
          textDecoration={"underline"}
          textUnderlineOffset={"10px"}
          textDecorationThickness={"1.5px"}
        >
          LATEST 4 PRODUCTS
        </Text>
      </Flex>
      <Flex
        gap={8}
        mt={"20px"}
        w={"full"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <MarketCard />
        <MarketCard />
        <MarketCard />
        <MarketCard />
      </Flex>
    </>
  );
};
export default Collection;
