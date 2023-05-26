import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CollectionCard = ({ lisitng, category }: any) => {
  const navigate = useNavigate();

  return (
    <Box
      display={"grid"}
      width={"325px"}
      gridTemplateColumns={"100px 20% 20%"}
      gridTemplateRows={"100px 110px 40px"}
      gap={1}
      shadow={"md"}
      p={3}
      rounded={"md"}
      zIndex={4}
      transition={"all 0.2s ease-in-out"}
      _hover={{
        cursor: "pointer",
        transform: "scale(1.01)",
        transition: "all 0.2s ease-in-out",
      }}
      onClick={() => {
        navigate(`/archive/${category?.name}`);
      }}
    >
      <Box
        bgImg={lisitng[0]?._token ? lisitng[0]?._token._asset : ""}
        bgSize={"cover"}
        bgPosition={"center"}
        gridRow={"span 2"}
        gridColumn={"span 2"}
        rounded={"md"}
        bg={!lisitng[0] ? "fontGhost" : ""}
      ></Box>
      <Box
        gridColumn={"span 2"}
        rounded={"md"}
        bgImg={lisitng[1]?._token ? lisitng[1]?._token._asset : ""}
        bgSize={"cover"}
        bgPosition={"center"}
        bg={!lisitng[1] ? "fontGhost" : ""}
      ></Box>
      <Box
        gridColumn={"span 2"}
        rounded={"md"}
        bgImg={lisitng[2]?._token ? lisitng[2]?._token._asset : ""}
        bgSize={"cover"}
        bgPosition={"center"}
        bg={!lisitng[2] ? "fontGhost" : ""}
      ></Box>
      <Box
        gridColumn={"span 4"}
        fontSize={"18px"}
        display={"flex"}
        px={2}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontWeight={"600"}>{category?.name}</Text>
      </Box>
    </Box>
  );
};

export default CollectionCard;
