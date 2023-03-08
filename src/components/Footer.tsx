import { Flex, Hide, Stack, Text, Box, Image } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import NormalButton from "./Button/NormalButton";
import NormalLink from "./Links/NormalLink";
import logo from "../assets/logo2.png";

const Footer = () => {
  return (
    <Flex direction={"column"}>
      <Flex
        px={"68px"}
        pt={"40px"}
        pb={"25px"}
        gap={40}
        borderY={"1px"}
        borderColor={"gray.200"}
        marginTop={"20px"}
      >
        <Flex
          direction={"column"}
          w={"30%"}
          gap={12}
          transition={"all 0.5s ease-in-out"}
          textAlign={"justify"}
          lineHeight={"30px"}
          cursor={"pointer"}
        >
          <Box as={Flex} w={"75px"} alignItems={"center"} gap={2}>
            <Image src={logo} alt="logo" />
            <Text fontSize={"23px"} fontWeight={"600"}>
              Mintables
            </Text>
          </Box>
          <Text color={"fontGhost"} fontWeight={"500"}>
            <b> Mintables </b> is a template created with the STUDIO tool. All
            information contained here is <b>fictional</b> and preview to create
            your own website.
          </Text>
        </Flex>
        <Hide below="lg">
          <Flex
            direction={"column"}
            w={"15%"}
            gap={12}
            textAlign={"justify"}
            transition={"all 0.5s ease-in-out"}
            cursor={"pointer"}
            mt={1}
            alignItems={"center"}
          >
            <Text fontSize={"23px"} fontWeight={"600"}>
              Navigation
            </Text>
            <Stack lineHeight={"20px"} letterSpacing={"0.3px"}>
              <NormalLink text={"Home page"} to={"mum"} color={"fontGhost"} />
              <NormalLink text={"About us"} to={"mum"} color={"fontGhost"} />
              <NormalLink text={"Collections"} to={"mum"} color={"fontGhost"} />
              <NormalLink text={"Archives"} to={"mum"} color={"fontGhost"} />
              <NormalLink
                text={"Add new asset"}
                to={"mum"}
                color={"fontGhost"}
              />
            </Stack>
          </Flex>
          <Flex
            direction={"column"}
            gap={12}
            w={"15%"}
            transition={"all 0.5s ease-in-out"}
            cursor={"pointer"}
            mt={1}
            alignItems={"center"}
          >
            <Text fontSize={"23px"} fontWeight={"600"}>
              Categories
            </Text>
            <Stack lineHeight={"20px"} letterSpacing={"0.4px"}>
              <NormalLink
                text={"Privacy Policy"}
                to={"mum"}
                color={"fontGhost"}
              />
              <NormalLink text={"Contact"} to={"mum"} color={"fontGhost"} />
              <NormalLink
                text={"Our publishers"}
                to={"mum"}
                color={"fontGhost"}
              />
            </Stack>
          </Flex>
        </Hide>
        <Flex
          direction={"column"}
          gap={12}
          w={"35%"}
          textAlign={"justify"}
          lineHeight={"30px"}
          transition={"all 0.5s ease-in-out"}
          cursor={"pointer"}
          mt={1}
        >
          <Text fontSize={"23px"} fontWeight={"600"}>
            Send Message
          </Text>
          <Text color={"fontGhost"} fontWeight={"500"}>
            if you need help or<b color="black"> have a question </b> about
            Noplomi, please contact us and use our advanced form.
          </Text>
          <NormalButton
            text="Contact Now"
            type="outline"
            rightIcon={<IoIosArrowForward fontWeight={"700"} />}
          />
        </Flex>
      </Flex>
      <Flex px={"60px"} py={"30px"} color={"fontGhost"} fontWeight={"500"}>
        Copyright © 2022. All right reserved.
      </Flex>
    </Flex>
  );
};

export default Footer;
