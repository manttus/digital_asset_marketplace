import { Flex, Box, Text, Image } from "@chakra-ui/react";
import CustomLink from "../Links/CustomLink";

const MarketCard = ({ item }: any) => {
  return (
    <Flex
      minWidth={"280px"}
      width={{
        sm: "200px",
        md: "600px",
        lg: "700px",
        xl: "400px",
      }}
      direction={"column"}
      rounded={"5px"}
      shadow={"md"}
      bg={"white"}
      p={"10px"}
      border={"1px solid "}
      borderColor={"gray.300"}
      position={"relative"}
    >
      <Image
        src={item.image}
        h={{
          sm: "200px",
          md: "300px",
          lg: "450px",
          xl: "250px",
        }}
        w={"100%"}
        rounded={"5px"}
        transition={"all 0.5s ease-in-out"}
        _hover={{
          transform: "scale(1.01)",
          transition: "all 0.5s ease-in-out",
        }}
      />
      <Box>
        <Flex
          direction={"column"}
          px={"10px"}
          pt={"20px"}
          pb={"5px"}
          letterSpacing={"0.4px"}
        >
          <Flex justifyContent={"space-between"}>
            <Box>
              <CustomLink text={item.name} to="mum" size="18px" weight="700" />
            </Box>
            <Box>
              <CustomLink
                text={item._id._hex}
                to="mum"
                size="18px"
                weight="700"
              />
            </Box>
          </Flex>
          <Text fontSize={"15px"} color={"fontGhost"} fontWeight={"500"}></Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default MarketCard;
