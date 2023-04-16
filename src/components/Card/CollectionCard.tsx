import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CollectionCard = ({ listings, archive }: any) => {
  const [lisitng, setListings] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = listings.filter((listing: any) => {
      return listing._category === archive?.name;
    });
    setListings(data);
  }, [listings, archive]);

  return (
    <Box
      display={"grid"}
      width={"300px"}
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
        navigate(`/archive/${archive?.name}`, { state: { lisitng, archive } });
      }}
    >
      <Box
        bgImg={lisitng[0]?._asset ? lisitng[0]?._asset : ""}
        bgSize={"cover"}
        bgPosition={"center"}
        gridRow={"span 2"}
        gridColumn={"span 2"}
        rounded={"md"}
        bg={!lisitng[0]?._asset ? "fontGhost" : ""}
      ></Box>
      <Box
        gridColumn={"span 2"}
        rounded={"md"}
        bgImg={lisitng[1]?._asset ? lisitng[1]?._asset : ""}
        bgSize={"cover"}
        bgPosition={"center"}
        bg={!lisitng[1]?._asset ? "fontGhost" : ""}
      ></Box>
      <Box
        gridColumn={"span 2"}
        rounded={"md"}
        bgImg={lisitng[2]?._asset ? lisitng[2]?._asset : ""}
        bgSize={"cover"}
        bgPosition={"center"}
        bg={!lisitng[2]?._asset ? "fontGhost" : ""}
      ></Box>
      <Box
        gridColumn={"span 4"}
        fontSize={"18px"}
        display={"flex"}
        px={2}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontWeight={"600"}>{archive?.name}</Text>
      </Box>
    </Box>
  );
};

export default CollectionCard;
