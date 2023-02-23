import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import NormalButton from "./NormalButton";
import NormalLink from "./NormalLink";

const Footer = () => {
  return (
    <Flex direction={"column"} mt={"30px"}>
      <Flex
        px={"64px"}
        pt={"40px"}
        pb={"25px"}
        gap={40}
        borderY={"1px"}
        borderColor={"gray.200"}
      >
        <Flex
          direction={"column"}
          w={"30%"}
          gap={12}
          transition={"all 0.5s ease-in-out"}
          textAlign={"justify"}
          lineHeight={"30px"}
          _hover={{
            transform: "scale(1.05)",
            transition: "all 0.5s ease-in-out",
          }}
          cursor={"pointer"}
        >
          <Text fontSize={"23px"} fontWeight={"600"}>
            Mintables
          </Text>
          <Text color={"fontGhost"} fontWeight={"500"}>
            Noplomi is a template created with the STUDIO tool. All information
            contained here is fictional and preview to create your own website.
          </Text>
        </Flex>
        <Flex
          direction={"column"}
          w={"10%"}
          gap={12}
          textAlign={"justify"}
          transition={"all 0.5s ease-in-out"}
          _hover={{
            transform: "scale(1.05)",
            transition: "all 0.5s ease-in-out",
          }}
          cursor={"pointer"}
        >
          <Text fontSize={"23px"} fontWeight={"600"}>
            Navigation
          </Text>
          <Stack lineHeight={"20px"} letterSpacing={"0.3px"}>
            <NormalLink text={"Home page"} to={"mum"} color={"fontGhost"} />
            <NormalLink text={"About us"} to={"mum"} color={"fontGhost"} />
            <NormalLink text={"Collections"} to={"mum"} color={"fontGhost"} />
            <NormalLink text={"Archives"} to={"mum"} color={"fontGhost"} />
            <NormalLink text={"Add new asset"} to={"mum"} color={"fontGhost"} />
          </Stack>
        </Flex>
        <Flex
          direction={"column"}
          gap={12}
          w={"15%"}
          transition={"all 0.5s ease-in-out"}
          _hover={{
            transform: "scale(1.05)",
            transition: "all 0.5s ease-in-out",
          }}
          cursor={"pointer"}
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
            <NormalLink
              text={"Our publishers"}
              to={"mum"}
              color={"fontGhost"}
            />
            <NormalLink text={"Contact"} to={"mum"} color={"fontGhost"} />
          </Stack>
        </Flex>
        <Flex
          direction={"column"}
          gap={12}
          w={"35%"}
          textAlign={"justify"}
          lineHeight={"30px"}
          transition={"all 0.5s ease-in-out"}
          _hover={{
            transform: "scale(1.05)",
            transition: "all 0.5s ease-in-out",
          }}
          cursor={"pointer"}
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
      <Flex
        px={"60px"}
        pt={"30px"}
        pb={"60px"}
        color={"fontGhost"}
        fontWeight={"500"}
      >
        Copyright © 2022. All right reserved.
      </Flex>
    </Flex>
  );
};

export default Footer;
