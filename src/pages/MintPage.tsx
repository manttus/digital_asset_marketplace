import { Flex, Box, Text, Input } from "@chakra-ui/react";
import illustration1 from "../assets/register.png";
import Mint from "../components/Forms/Mint";
import { BsCloudUpload } from "react-icons/bs";
import CustomButton from "../components/Button/CustomButton";
import CustomBadge from "../components/Badge/CustomBadge";
import NormalButton from "../components/Button/NormalButton";

const MintPage = () => {
  return (
    <Flex direction={"column"} justifyContent={"center"} alignItems={"center"}>
      <Flex
        h={"500px"}
        bgImage={illustration1}
        width={"full"}
        bgSize={"cover"}
        top={0}
        pos={"absolute"}
        bgPos={"center"}
        _after={{
          content: '""',
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
        gap={10}
      >
        {/* <Text
          fontSize={"95px"}
          fontWeight={"600"}
          zIndex={2}
          color={"white"}
          mt={20}
        >
          Create your asset.
        </Text> */}
        {/* <NormalButton
          type="filled"
          bg="transparent"
          text="Check Form"
          zindex={2}
          width={"400px"}
          rightIcon={<IoIosArrowForward fontWeight={"700"} />}
        /> */}
      </Flex>
      <Flex
        h={"full"}
        width={"full"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={"450px"}
      >
        <Flex
          as={"form"}
          direction={"column"}
          w={"60%"}
          p={"16"}
          alignItems={"end"}
        >
          <Mint />
        </Flex>
        <Flex w={"40%"} px={"10"}>
          <Flex
            boxShadow={"sm"}
            rounded={"md"}
            w={"full"}
            position={"relative"}
          >
            <Flex
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              h={"full"}
              w={"full"}
              gap={5}
              rounded={"md"}
            >
              <Flex
                p={"80px"}
                direction={"column"}
                alignItems={"center"}
                gap={10}
              >
                <Flex gap={2} direction={"column"} alignItems={"center"}>
                  <Text fontSize={"28px"} fontWeight={"600"}>
                    Upload your assets.
                  </Text>
                </Flex>
                <Flex
                  direction={"column"}
                  alignItems={"center"}
                  gap={2}
                  bg={"white"}
                  p={10}
                  border={"2px dashed"}
                  borderColor={"fontGhost"}
                  rounded={"md"}
                >
                  <BsCloudUpload size={60} color={"fontGhost"} />
                  <Text
                    fontSize={"20px"}
                    fontWeight={"600"}
                    color={"fontGhost"}
                  >
                    Drag and drop your files here
                  </Text>
                </Flex>
                {/* <NormalButton text="Upload" type="filled" width="200px" /> */}
              </Flex>
            </Flex>
            <Input
              type="file"
              position="absolute"
              height={"100%"}
              width={"100%"}
              top="0"
              left="0"
              opacity="0"
              aria-hidden="true"
              accept="image/*"
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MintPage;
