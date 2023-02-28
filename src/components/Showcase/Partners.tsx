import { Flex, Image, Box } from "@chakra-ui/react";
import metamask from "../../assets/metamask.png";
import opensea from "../../assets/opensea.png";
import dribbble from "../../assets/dribbble.png";

const Partners = () => {
  return (
    <Flex
      w={"full"}
      height={"100px"}
      justifyContent={"center"}
      alignItems={"center"}
      h={"100px"}
      marginY={"40px"}
      gap={28}
    >
      <Box
        width={"200px"}
        cursor={"pointer"}
        transition={"all 0.5s ease-in-out"}
        _hover={{
          transform: "scale(1.04)",
          transition: "all 0.5s ease-in-out",
        }}
      >
        <Image src={dribbble} />
      </Box>
      <Box
        width={"200px"}
        cursor={"pointer"}
        transition={"all 0.5s ease-in-out"}
        _hover={{
          transform: "scale(1.04)",
          transition: "all 0.5s ease-in-out",
        }}
      >
        <Image src={opensea} />
      </Box>

      <Box
        width={"200px"}
        cursor={"pointer"}
        transition={"all 0.5s ease-in-out"}
        _hover={{
          transform: "scale(1.04)",
          transition: "all 0.5s ease-in-out",
        }}
      >
        <Image src={metamask} />
      </Box>
    </Flex>
  );
};

export default Partners;
