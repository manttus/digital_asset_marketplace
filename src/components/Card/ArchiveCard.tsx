import { Flex, Box, Text, Image, Avatar, Divider } from "@chakra-ui/react";
import Illustration from "../../assets/eth1.gif";

import CustomLink from "../Links/CustomLink";
import { FaArrowRight } from "react-icons/fa";

const ArchiveCard = ({
  name,
  description,
  image,
}: {
  name: string;
  description: string;
  image: string;
}) => {
  return (
    <Flex
      width={"250px"}
      direction={"column"}
      rounded={"5px"}
      shadow={"sm"}
      bg={"white"}
      p={"15px"}
      border={"1px solid #E2E8F0"}
    >
      <Image
        src={image}
        w={"100%"}
        rounded={"5px"}
        transition={"all 0.5s ease-in-out"}
        _hover={{
          transform: "scale(1.03)",
          transition: "all 0.5s ease-in-out",
        }}
        height={"220px"}
        width={"220px"}
      />
      <Box>
        <Flex
          px={"20px"}
          pt={"20px"}
          letterSpacing={"0.4px"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <CustomLink text={name} to="mum" size="18px" weight="700" />
          </Box>
          <Text fontSize={"15px"} color={"fontGhost"} fontWeight={"500"}>
            {description}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ArchiveCard;
