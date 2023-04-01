import { Flex, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import ArchiveCard from "../components/Card/ArchiveCard";
import MarketCard from "../components/Card/MarketCard";

const CategoryPage = ({ lisitng }: any) => {
  const state = useLocation();
  const listing = state.state.lisitng;

  return (
    <Flex px={"10"} direction={"column"}>
      <Flex height={"200px"} bg={"fontGhost"} w={"full"} rounded={"md"}></Flex>
      <Flex
        width={"full"}
        my={"10"}
        wrap={"wrap"}
        justifyContent={"space-between"}
      >
        {listing.map((item: any) => {
          return (
            <ArchiveCard
              key={item._name}
              name={item._name}
              image={item._asset}
              description={item._id._hex}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default CategoryPage;
