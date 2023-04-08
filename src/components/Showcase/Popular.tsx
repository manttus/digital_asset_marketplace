import { Flex, Text } from "@chakra-ui/react";
import NormalButton from "../Button/NormalButton";
import CustomBadge from "../Badge/CustomBadge";
import CollectionCard from "../Card/CollectionCard";

const Popular = () => {
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
        {/* {marketData.length === 0 ? <NoResult /> : null}
        {marketData.map((item: any) => (
          <MarketCard />
        ))}
        {/* <MarketCard />
        <MarketCard />
        <MarketCard />
        <MarketCard /> */}{" "}
        */
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
      </Flex>
      <Flex w={"100%"} justifyContent={"center"} pt={"30px"}>
        <NormalButton
          width={"380px"}
          text="Check More"
          onClick={() => {}}
          type={"solid"}
        />
      </Flex>
    </>
  );
};

export default Popular;
