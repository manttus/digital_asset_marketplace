import { Box, Flex, Link, HStack, Text, Button } from "@chakra-ui/react";
import CustomButton from "./Buttons/CustomButton";
import { useState } from "react";
import { SiDiscord, SiTwitter } from "react-icons/si";
import CustomIconButton from "./Buttons/CustomIconButton";

type NavbarProps = {
  metaMaskHandler: () => void;
};

const Navbar = (props: NavbarProps) => {
  return (
    <Flex
      h={"100px"}
      w={"100%"}
      shadow={"sm"}
      justifyContent={"space-between"}
      alignItems={"center"}
      boxShadow={"md"}
      px={"100px"}
    >
      <Flex w={"50%"} gap={10} alignItems={"center"}>
        <Text fontSize={"2xl"}> EUA-01 </Text>
        <Link> Explore </Link>
        <Link> Marketplace </Link>
        <Link> Inventory </Link>
        <Link> Mint </Link>
      </Flex>
      <Flex w={"50%"} gap={2} justifyContent={"end"}>
        <CustomButton type="outlined" text="Sign In" />
        <CustomButton type="filled" text="Sign Up" />
      </Flex>
    </Flex>
  );
};

export default Navbar;
