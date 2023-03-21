import { Flex, Input } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BiImageAdd } from "react-icons/bi";
import NormalButton from "../Button/NormalButton";
const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type ProfileProps = {
  addImage: (e: FileList | null) => void;
};

const Profile = ({ addImage }: ProfileProps) => {
  return (
    <Flex
      position={"relative"}
      w={"full"}
      mb={"12"}
      shadow={"md"}
      rounded={"sm"}
    >
      <Flex
        as={motion.div}
        height={"300px"}
        bg={"fontGhost"}
        w={"full"}
        rounded={"md"}
        justifyContent={"end"}
        alignItems={"end"}
        pb={5}
        pr={5}
        cursor={"pointer"}
        whileHover={"hover"}
      >
        <Flex as={motion.div} variants={buttonVariants}>
          <NormalButton
            fontSize="15px"
            text="Edit Cover"
            type="filled"
            bg="buttonPrimary"
            py="16px"
          />
        </Flex>
      </Flex>
      <Flex
        left={"50"}
        top={"200"}
        position={"absolute"}
        width={"150px"}
        height={"150px"}
        bg={"gray.200"}
        rounded={"full"}
        justifyContent={"center"}
        alignItems={"center"}
        cursor={"pointer"}
      >
        <Flex
          position={"relative"}
          width={"140px"}
          height={"140px"}
          bg={"rgba(0,0,0,0.2)"}
          rounded={"full"}
          justifyContent={"center"}
          alignItems={"center"}
          transition={"all 0.3s ease-in-out"}
          opacity={"0"}
          _hover={{
            opacity: "1",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <BiImageAdd size={"28px"} />
          <Input
            type={"file"}
            position={"absolute"}
            height={"100%"}
            width={"100%"}
            opacity={"0"}
            onChange={(e) => {
              addImage(e.target.files);
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Profile;
