import { Flex, Input } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BiImageAdd } from "react-icons/bi";
import NormalButton from "../Button/NormalButton";
import { useState } from "react";

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type ProfileProps = {
  addImage: (e: FileList | null) => void;
  isEditPage: boolean;
};

const Profile = ({ addImage, isEditPage }: ProfileProps) => {
  const [profile, setProfile] = useState<string | null>(null);
  const [background, setBackground] = useState<any>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files![0];
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(e.target);
      setProfile(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
    addImage(e.target.files);
  };

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
        height={"250px"}
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
          {isEditPage && (
            <NormalButton
              fontSize="15px"
              text="Edit Cover"
              type="filled"
              bg="buttonPrimary"
              py="16px"
            />
          )}
        </Flex>
      </Flex>
      {isEditPage ? (
        <Flex
          left={"50"}
          top={"160"}
          position={"absolute"}
          width={"150px"}
          height={"150px"}
          bg={profile ? profile : "gray.200"}
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
                console.log(URL.createObjectURL(e.target.files![0]));
              }}
            />
          </Flex>
        </Flex>
      ) : (
        <Flex
          left={"50"}
          top={"160"}
          position={"absolute"}
          width={"150px"}
          height={"150px"}
          bg={"gray.200"}
          rounded={"full"}
          justifyContent={"center"}
          alignItems={"center"}
        ></Flex>
      )}
    </Flex>
  );
};

export default Profile;
