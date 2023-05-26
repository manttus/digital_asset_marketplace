import { Flex, Box, Text, Image, Avatar, Divider } from "@chakra-ui/react";
import CustomLink from "../Links/CustomLink";
import { useNavigate } from "react-router-dom";

const ArchiveCard = ({
  name,
  description,
  image,
  _id,
  onClick,
  price,
}: {
  name: string;
  description: string;
  image: string;
  _id: any;
  price: string;
  onClick: () => void;
}) => {
  return (
    <Flex
      width={"250px"}
      direction={"column"}
      rounded={"5px"}
      shadow={"sm"}
      bg={"white"}
      p={"15px"}
      mb={"20px"}
      border={"1px solid #E2E8F0"}
      cursor={"pointer"}
      onClick={onClick}
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
          pt={"20px"}
          letterSpacing={"0.4px"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <Text
              fontSize={"18px"}
              fontWeight={"500"}
              color={"fontBlack"}
              lineHeight={"1.5"}
            >
              {_id._hex}
            </Text>
          </Box>
          <Flex
            fontSize={"18px"}
            w={"100px"}
            color={"fontBlack"}
            fontWeight={"500"}
            border={"1px solid"}
            borderColor={"gray.200"}
            rounded={"full"}
            p={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {price}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ArchiveCard;
