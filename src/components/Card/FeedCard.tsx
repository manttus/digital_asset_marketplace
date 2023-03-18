import { Flex, Box, Avatar, Text, Img, Stack } from "@chakra-ui/react";
import { BsArrowBarUp } from "react-icons/bs";
import { MdFavoriteBorder } from "react-icons/md";
import card from "../../assets/abstract2.webp";
import CustomIconButton from "../Button/CustomIconButton";

const FeedCard = () => {
  return (
    <Box
      as={Stack}
      spacing={10}
      border={"1px solid"}
      p={10}
      shadow={"sm"}
      borderColor={"gray.200"}
      rounded={"md"}
    >
      <Flex justifyContent={"space-between"}>
        <Flex gap={3} alignItems={"center"}>
          <Avatar />
          <Text>
            <b>@mantuu</b> created <b>03_06</b>
          </Text>
        </Flex>

        <Flex gap={4}>
          <CustomIconButton
            aria="liked"
            icon={<BsArrowBarUp />}
            type={"outline"}
            color={"gray.200"}
            onClick={() => {}}
          />

          <CustomIconButton
            aria="liked"
            icon={<MdFavoriteBorder />}
            type={"outline"}
            color={"gray.200"}
            onClick={() => {}}
          />
        </Flex>
      </Flex>
      <Flex>
        <Img src={card} />
      </Flex>
    </Box>
  );
};

export default FeedCard;
