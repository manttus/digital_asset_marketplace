import { Flex, Input } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BiImageAdd } from "react-icons/bi";
import { useEffect, useState } from "react";
import { bottomVariants } from "../../theme/animation/variants";

type ProfileProps = {
  addImage: (e: FileList | null, flag: string) => void;
  isEditPage: boolean;
  userData: any;
};

const Profile = ({ addImage, isEditPage, userData }: ProfileProps) => {
  const [profile, setProfile] = useState<string | null>(userData?.profileImage);
  const [background, setBackground] = useState<string | null>(
    userData?.backgroundImage
  );
  useEffect(() => {
    if (userData) {
      setProfile(userData?.profileImage);
    }
  }, [userData]);
  useEffect(() => {
    if (userData) {
      setBackground(userData?.backgroundImage);
    }
  }, [userData]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    flag: string
  ) => {
    addImage(e.target.files, flag);
  };

  return (
    <Flex
      direction={"column"}
      w={"full"}
      height={"320px"}
      as={motion.div}
      variants={bottomVariants}
      initial={"hidden"}
      animate={"visible"}
    >
      <Flex position={"relative"} w={"full"} shadow={"md"} rounded={"sm"}>
        <Flex
          height={"250px"}
          bg={"fontGhost"}
          w={"full"}
          rounded={"md"}
          justifyContent={"end"}
          alignItems={"end"}
          bgImage={background ? `url(${background})` : ""}
          bgPos={"center"}
          bgSize={"cover"}
          border={"1px solid"}
          borderColor={"gray.300"}
        >
          {isEditPage && (
            <Flex
              position={"relative"}
              width={"full"}
              height={"full"}
              bg={"rgba(0,0,0,0.2)"}
              justifyContent={"center"}
              alignItems={"center"}
              transition={"all 0.3s ease-in-out"}
              opacity={"0"}
              shadow={"md"}
              _hover={{
                opacity: "1",
                bg: background ? "rgba(255,255, 255, 0.2)" : "rgba(0,0,0,0.2)",
                transition: "all 0.3s ease-in-out",
              }}
              border={"1px solid"}
              borderColor={"gray.300"}
            >
              <BiImageAdd size={"28px"} />
              <Input
                type={"file"}
                position={"absolute"}
                height={"100%"}
                width={"100%"}
                opacity={"0"}
                cursor={"pointer"}
                onChange={(e) => {
                  const file = e.target.files![0];
                  const fullPath = URL.createObjectURL(file);
                  setBackground(fullPath);
                  addImage(e.target.files, "Background");
                }}
              />
            </Flex>
          )}
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
        >
          {isEditPage && (
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
                cursor={"pointer"}
                onChange={(e) => {
                  const file = e.target.files![0];
                  const fullPath = URL.createObjectURL(file);
                  setProfile(fullPath);
                  addImage(e.target.files, "Profile");
                }}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Profile;
