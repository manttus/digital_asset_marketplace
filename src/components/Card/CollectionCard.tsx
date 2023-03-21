import { Box, Flex, Text } from "@chakra-ui/react";

const CollectionCard = () => {
  return (
    <Box
      display={"grid"}
      width={"300px"}
      gridTemplateColumns={"50px 75px 1fr 1fr"}
      gridTemplateRows={"100px 100px 40px"}
      gap={1}
      shadow={"md"}
      p={3}
      rounded={"md"}
      zIndex={4}
    >
      <Box
        bg={"fontGhost"}
        gridRow={"span 2"}
        gridColumn={"span 2"}
        rounded={"md"}
      ></Box>
      <Box bg={"fontGhost"} gridColumn={"span 2"} rounded={"md"}></Box>
      <Box bg={"fontGhost"} gridColumn={"span 2"} rounded={"md"}></Box>
      <Box
        gridColumn={"span 4"}
        fontSize={"18px"}
        display={"flex"}
        px={2}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontWeight={"600"}>_mantuu</Text>
        {/* <Box
          rounded={"full"}
          w={"30px"}
          h={"30px"}
          border={"1px solid"}
          borderColor={"buttonPrimary"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          p={4}
        >
          20
        </Box> */}
      </Box>
    </Box>
  );
};

export default CollectionCard;
