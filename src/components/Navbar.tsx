import { Avatar, Box, Flex, Hide, HStack, Show, Text } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router";
import { BsDot, BsInstagram, BsTwitter } from "react-icons/bs";

import { ExternalProvider } from "@ethersproject/providers";
import CustomButton from "./Buttons/CustomButton";
import CustomLink from "./CustomLink";
import CustomIconButton from "./Buttons/CustomIconButton";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import Overlay from "./Overlay";
import { motion } from "framer-motion";
declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}

const bottomVariants = {
  hidden: {
    y: 100,
    overflow: "hidden",
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: "40",
      velocity: "1",
    },
  },
};

const Navbar = () => {
  const [overlay, setOverlay] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <Flex height={"115px"} justifyContent={"center"} alignItems={"center"}>
        <Flex
          w={"98%"}
          rounded={"200px"}
          bg={"white"}
          height={"85px"}
          shadow={"sm"}
          justifyContent={"space-between"}
          px={"18px"}
          zIndex={2}
        >
          <Flex
            w={"70%"}
            alignItems={"center"}
            h={"full"}
            px={"20px"}
            rounded={"200px"}
            justifyContent={"space-between"}
          >
            <Flex w={"20%"}></Flex>
            <Hide below="xl">
              <Flex
                w={"80%"}
                justifyContent={"start"}
                alignItems={"center"}
                gap={4}
              >
                <CustomButton
                  text="Explore NFT"
                  type="outlined"
                  onClick={() => {}}
                  icon={<BsDot size={"40px"} />}
                />
                <Flex gap={8} wrap={"nowrap"}>
                  <CustomLink to={"mum"} text={"About us"} size={"18px"} />
                  <CustomLink to={"mum"} text={"Collections"} size={"18px"} />
                  <CustomLink to={"mum"} text={"Archives"} size={"18px"} />
                  <CustomLink to={"mum"} text={"Be a Creator"} size={"18px"} />
                </Flex>
              </Flex>
            </Hide>
          </Flex>

          <Flex
            w={"30%"}
            height={"full"}
            h={"full"}
            alignItems={"center"}
            rounded={"200px"}
            justifyContent={"end"}
            gap={3}
          >
            <Hide below="xl">
              {/* <CustomIconButton
                icon={<BsInstagram size={"20px"} />}
                aria={"Instagram"}
                type={"filled"}
                onClick={() => {}}
              />
              <CustomIconButton
                icon={<BsTwitter size={"20px"} />}
                aria={"Twitter"}
                type={"filled"}
                onClick={() => {}}
              /> */}
              <CustomButton text="Connect" type="filled" onClick={() => {}} />
              <Avatar size={"md"} />
            </Hide>
            <Show below="xl">
              <CustomIconButton
                icon={<RxHamburgerMenu size={"20px"} />}
                aria={"Plus"}
                type={"filled"}
                onClick={() => {
                  setOverlay(true);
                }}
              />
            </Show>
          </Flex>
        </Flex>
      </Flex>
      <Overlay show={overlay}>
        <>
          <Flex alignItems={"center"} justifyContent={"end"} p={"30px"}>
            <CustomIconButton
              icon={<AiOutlineClose size={"20px"} />}
              aria={"Close"}
              type={"outlined"}
              onClick={() => {
                setOverlay(false);
              }}
            />
          </Flex>
          <Flex
            as={motion.div}
            variants={bottomVariants}
            initial={"hidden"}
            animate={overlay ? "visible" : "hidden"}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text
              fontSize={"small"}
              fontWeight={"700"}
              color={"white"}
              letterSpacing={"1px"}
              borderBottom={"2px solid white"}
              py={"2px"}
            >
              MENU
            </Text>
            <Flex
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              mt={"30px"}
            >
              <CustomLink
                to={"mum"}
                text={"Explore NFT"}
                size={"38px"}
                color={"white"}
              />
              <CustomLink
                to={"mum"}
                text={"About us"}
                size={"38px"}
                color={"white"}
              />
              <CustomLink
                to={"mum"}
                text={"Collections"}
                size={"38px"}
                color={"white"}
              />
              <CustomLink
                to={"mum"}
                text={"Archives"}
                size={"38px"}
                color={"white"}
              />
              <CustomLink
                to={"mum"}
                text={"Be a Creator"}
                size={"38px"}
                color={"white"}
              />
              <Box mt={"40px"}>
                <CustomButton
                  text="Connect"
                  type="filled"
                  onClick={() => {}}
                  fontSize={"18px"}
                />
              </Box>
              <Text color={"fontGhost"} mt={"20px"} letterSpacing={"1px"}>
                Copyright © 2022. All right reserved.
              </Text>
              {/* <HStack>
                <CustomIconButton
                  icon={<BsInstagram size={"20px"} />}
                  aria={"Instagram"}
                  type={"filled"}
                  onClick={() => {}}
                />
                <CustomIconButton
                  icon={<BsTwitter size={"20px"} />}
                  aria={"Twitter"}
                  type={"filled"}
                  onClick={() => {}}
                />
              </HStack> */}
            </Flex>
          </Flex>
        </>
      </Overlay>
      <Outlet />
    </>
  );
};

export default Navbar;
