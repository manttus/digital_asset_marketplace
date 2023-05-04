import { Flex, Box, Avatar, Text, Img, Stack } from "@chakra-ui/react";
import { MdLink } from "react-icons/md";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import CustomIconButton from "../Button/CustomIconButton";
import { useNavigate } from "react-router-dom";

const FeedCard = ({ data, liked, handleLike }: any) => {
  const navigate = useNavigate();
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
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Flex alignItems={"center"} gap={6}>
          <Avatar
            src={data.user.profileImage}
            size={"lg"}
            onClick={() => {
              navigate(`/profile/${data.user._id}`);
            }}
            cursor={"pointer"}
          />
          <Flex fontSize={"18px"} gap={2} alignItems={"center"}>
            <b>{data.user.username.split(0, 10)}</b>created <b>{data.title}</b>
          </Flex>
        </Flex>

        <Flex gap={4}>
          <CustomIconButton
            aria="liked"
            icon={<MdLink size={"22px"} />}
            type={"outline"}
            color={"gray.200"}
            onClick={() => {}}
          />

          <CustomIconButton
            aria="liked"
            icon={
              !liked ? (
                <MdFavoriteBorder size={"22px"} />
              ) : (
                <MdFavorite size={"22px"} />
              )
            }
            type={"outline"}
            color={"gray.200"}
            onClick={() => {
              liked ? handleLike("unlike", data) : handleLike("like", data);
            }}
          />
        </Flex>
      </Flex>
      <Flex>
        <Flex
          bgImage={data.tokenUrl}
          w={"full"}
          height={"450px"}
          bgPos={"center"}
          bgSize={"cover"}
        />
      </Flex>
    </Box>
  );
};

export default FeedCard;
