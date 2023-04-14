import { Flex, Input } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BiImageAdd } from "react-icons/bi";
import NormalButton from "../Button/NormalButton";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectUserData,
} from "../../features/auth/authSlice";

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type ProfileProps = {
  addImage: (e: FileList | null, flag: string) => void;
  isEditPage: boolean;
};

const Profile = ({ addImage, isEditPage }: ProfileProps) => {
  const user = useSelector(selectCurrentUser);
  console.log(user);
  const userData = useSelector(selectUserData);
  const [profile, setProfile] = useState<string | null>(userData.profileImage);
  const [background, setBackground] = useState<string | null>(
    userData.backgroundImage
  );

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    flag: string
  ) => {
    addImage(e.target.files, flag);
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
        bgImage={background ? `url(${background})` : ""}
        bgPos={"center"}
        bgSize={"cover"}
      >
        <Flex
          position={"relative"}
          width={"full"}
          height={"full"}
          bg={"rgba(0,0,0,0.2)"}
          justifyContent={"center"}
          alignItems={"center"}
          transition={"all 0.3s ease-in-out"}
          opacity={"0"}
          _hover={{
            opacity: "1",
            bg: background ? "rgba(255,255, 255, 0.2)" : "rgba(0,0,0,0.2)",
            transition: "all 0.3s ease-in-out",
          }}
          cursor={"pointer"}
        >
          <BiImageAdd size={"28px"} />
          <Input
            type={"file"}
            position={"absolute"}
            height={"100%"}
            width={"100%"}
            opacity={"0"}
            onChange={(e) => {
              const file = e.target.files![0];
              const fullPath = URL.createObjectURL(file);
              setBackground(fullPath);
              addImage(e.target.files, "background");
            }}
          />
        </Flex>
      </Flex>

      <Flex
        left={"50"}
        top={"160"}
        position={"absolute"}
        width={"150px"}
        height={"150px"}
        bg={"gray.200"}
        bgImage={profile ? `url(${profile})` : ""}
        bgPos={"center"}
        bgSize={"cover"}
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
            bg: profile ? "rgba(255,255, 255, 0.2)" : "rgba(0,0,0,0.2)",
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
              const file = e.target.files![0];
              const fullPath = URL.createObjectURL(file);
              setProfile(fullPath);
              addImage(e.target.files, "profile");
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Profile;
