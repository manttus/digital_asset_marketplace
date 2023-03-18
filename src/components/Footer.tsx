import { Flex, Text, Box, Image, Input } from "@chakra-ui/react";
import NormalButton from "./Button/NormalButton";
import logo from "../assets/logo2.png";
import CustomIconButton from "./Button/CustomIconButton";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <Flex direction={"column"} mt={"50px"} zIndex={2}>
      <Flex
        px={"60px"}
        pt={"40px"}
        pb={"25px"}
        gap={40}
        borderY={"1px"}
        borderColor={"gray.200"}
        marginTop={"40px"}
        justifyContent={"space-between"}
        alignItems={"space-between"}
      >
        <Flex
          direction={"column"}
          w={"20%"}
          gap={12}
          transition={"all 0.5s ease-in-out"}
          textAlign={"justify"}
          lineHeight={"30px"}
          cursor={"pointer"}
          justifyContent={"center"}
        >
          <Box as={Flex} w={"75px"} alignItems={"center"} gap={2}>
            <Image src={logo} alt="logo" />
            <Text fontSize={"23px"} fontWeight={"600"}>
              Mintables
            </Text>
          </Box>
        </Flex>

        <Flex
          gap={2}
          w={"60%"}
          textAlign={"justify"}
          lineHeight={"30px"}
          transition={"all 0.5s ease-in-out"}
          cursor={"pointer"}
          justifyContent={"end"}
          alignItems={"center"}
          mt={1}
        >
          <Flex w={"300px"}>
            <Input placeholder="Email Address" py={"25px"} />
          </Flex>
          <NormalButton text="Subscribe" type="filled" />
        </Flex>
      </Flex>
      <Flex
        px={"60px"}
        py={"30px"}
        color={"fontGhost"}
        fontWeight={"500"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        Copyright © 2022. All right reserved.
        <Flex alignItems={"center"} gap={5} w={"20%"} justifyContent={"end"}>
          <Flex gap={4}>
            <CustomIconButton
              icon={<BsTwitter size={"20px"} />}
              aria={"twitter"}
              type={"outline"}
              color={"buttonPrimary"}
              onClick={() => console.log("twitter")}
            />

            <CustomIconButton
              icon={<BsLinkedin size={"20px"} />}
              aria={"twitter"}
              type={"outline"}
              color={"buttonPrimary"}
              onClick={() => console.log("twitter")}
            />
            <CustomIconButton
              icon={<BsGithub size={"25px"} />}
              aria={"twitter"}
              type={"outline"}
              color={"buttonPrimary"}
              onClick={() => console.log("twitter")}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
