import { Flex, Box, Avatar, Text, Img, Stack } from "@chakra-ui/react";
import { MdLink } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import CustomIconButton from "../Button/CustomIconButton";
import { useMintersMutation } from "../../features/api/authApi/apiSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FeedCard = ({ data }: any) => {
  const [minters] = useMintersMutation();

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
            <b>{data.owner.slice(0, 6)}</b> created <b>{data._id._hex}</b>
          </Text>
        </Flex>

        <Flex gap={4}>
          <CustomIconButton
            aria="liked"
            icon={<MdLink />}
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
        <Flex
          bgImage={data.image}
          w={"full"}
          height={"500px"}
          bgPos={"center"}
          bgSize={"cover"}
        />
      </Flex>
    </Box>
  );
};

export default FeedCard;
