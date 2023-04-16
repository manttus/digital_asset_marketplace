import { Flex, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import ArchiveCard from "../components/Card/ArchiveCard";
import MarketCard from "../components/Card/MarketCard";

const CategoryPage = ({ lisitng }: any) => {
  const state = useLocation();
  const listing = state.state.lisitng;
  const archive = state.state.archive;

  return (
    <Flex px={"10"} py={"5"} direction={"column"}>
      <Flex
        height={"250px"}
        bg={"fontGhost"}
        w={"full"}
        rounded={"md"}
        bgImage={archive.banner}
        bgPos={"center"}
        bgSize={"cover"}
      >
        <Flex
          left={"100"}
          top={"280"}
          position={"absolute"}
          width={"150px"}
          height={"150px"}
          bg={"gray.200"}
          bgImage={archive.avatar ? `url(${archive.avatar})` : ""}
          bgPos={"center"}
          bgSize={"cover"}
          rounded={"full"}
          justifyContent={"center"}
          alignItems={"center"}
        ></Flex>
      </Flex>
      <Flex
        width={"full"}
        my={"10"}
        wrap={"wrap"}
        gap={10}
        justifyContent={"center"}
      >
        {listing.map((item: any) => {
          return (
            <ArchiveCard
              key={item._name}
              name={item._name}
              image={item._asset}
              description={item._id._hex}
              _id={item._id}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default CategoryPage;
