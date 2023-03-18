import { Avatar, Flex } from "@chakra-ui/react";

const Profile = () => {
  return (
    <Flex
      position={"relative"}
      w={"full"}
      mb={"12"}
      shadow={"md"}
      rounded={"sm"}
    >
      <Flex height={"300px"} bg={"fontGhost"} w={"full"} rounded={"md"}></Flex>
      <Avatar size={"2xl"} position={"absolute"} top={"220"} left={"10"} />
    </Flex>
  );
};

export default Profile;
