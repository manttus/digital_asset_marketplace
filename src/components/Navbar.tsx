import {
  Avatar,
  Box,
  Flex,
  Hide,
  Show,
  Text,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router";
import { BsDot } from "react-icons/bs";
import CustomButton from "./Button/CustomButton";
import CustomLink from "./Links/CustomLink";
import CustomIconButton from "./Button/CustomIconButton";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import Overlay from "./Overlay";
import { motion } from "framer-motion";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import {
  logout,
  selectCurrentBalance,
  selectCurrentToken,
  selectCurrentWallet,
} from "../features/auth/authSlice";
import ScrollToTop from "./ScrollToTop";
import { useDispatch } from "react-redux";
import logo from "../assets/logo2.png";
import { FaEthereum } from "react-icons/fa";
import { MdOutlineFavoriteBorder, MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

declare global {
  interface Window {
    ethereum?: any;
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

type NavbarProps = {
  metaMaskHandler: () => Promise<void>;
};

const navlinks = [
  { name: "About us", path: "/about" },
  { name: "Collection", path: "/collection" },
  { name: "Be a Creator", path: "/mint" },
  { name: "Archives", path: "/archive" },
];

const menuItems = [
  { name: "Profile", path: "/profile", icon: <CgProfile size={"22px"} /> },
  {
    name: "Favorites",
    path: "/favorites",
    icon: <MdOutlineFavoriteBorder size={"22px"} />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <MdLogout size={"22px"} />,
  },
];

const Navbar = ({ metaMaskHandler }: NavbarProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(selectCurrentToken);
  const wallet = useSelector(selectCurrentWallet);
  const balance = useSelector(selectCurrentBalance);
  const [overlay, setOverlay] = useState<boolean>(false);

  return (
    <>
      <ScrollToTop />
      <Flex height={"115px"} justifyContent={"center"} alignItems={"center"}>
        <Flex
          position={"fixed"}
          w={"98%"}
          rounded={"200px"}
          bg={"white"}
          height={"85px"}
          shadow={"sm"}
          justifyContent={"space-between"}
          px={"20px"}
          zIndex={3}
        >
          <Flex
            w={"70%"}
            alignItems={"center"}
            h={"full"}
            px={"20px"}
            rounded={"200px"}
            justifyContent={"space-between"}
          >
            <Flex w={"20%"} justifyContent={"center"}>
              <Box w={"80px"}>
                <Image src={logo} alt="logo" />
              </Box>
            </Flex>
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
                  onClick={() => navigate("/")}
                  icon={<BsDot size={"40px"} />}
                />
                <Flex gap={8} wrap={"nowrap"}>
                  {navlinks.map((link) => (
                    <CustomLink
                      key={link.name}
                      text={link.name}
                      to={link.path}
                      size={"18px"}
                    />
                  ))}
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
            {state ? (
              <Hide below="xl">
                {!wallet ? (
                  <CustomButton
                    text={"Connect"}
                    type="filled"
                    onClick={!wallet ? metaMaskHandler : () => {}}
                  />
                ) : (
                  <Flex
                    position={"relative"}
                    cursor={"pointer"}
                    gap={5}
                    alignItems={"center"}
                  >
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      position={"absolute"}
                      top={2}
                      left={3}
                      bg={"buttonPrimary"}
                      p={1}
                      rounded={"full"}
                      h={"35px"}
                      w={"35px"}
                    >
                      <FaEthereum color="white" size={"20px"} />
                    </Box>
                    <Flex
                      rounded={"3xl"}
                      pl={"60px"}
                      h={"50px"}
                      bg={"background"}
                      fontWeight={"700"}
                      borderColor={"buttonHover"}
                      alignItems={"center"}
                      justifyContent={"end"}
                      pr={"5"}
                    >
                      <Text> {balance} </Text>
                    </Flex>
                  </Flex>
                )}
                <Menu autoSelect={false}>
                  <Avatar as={MenuButton} h={"45px"} w={"45px"} />
                  <MenuList as={Flex} flexDirection={"column"}>
                    {menuItems.map((item, index) => (
                      <>
                        <MenuItem
                          key={item.name}
                          id={item.name}
                          as={Flex}
                          gap={3}
                          onClick={() => {
                            if (item.name === "Logout") {
                              localStorage.clear();
                              navigate("/");
                              dispatch(logout());
                            } else {
                              navigate(item.path);
                            }
                          }}
                        >
                          {item.icon}
                          <Text fontSize={"16px"} fontWeight={"600"}>
                            {item.name}
                          </Text>
                        </MenuItem>
                        {index !== menuItems.length - 1 && <MenuDivider />}
                      </>
                    ))}
                  </MenuList>
                </Menu>
              </Hide>
            ) : (
              <Hide below="xl">
                <CustomButton
                  text="Register"
                  onClick={() => navigate("/register")}
                  type={"outline"}
                />
                <CustomButton
                  text="Login"
                  onClick={() => navigate("/login")}
                  type={"filled"}
                />
              </Hide>
            )}
            <Show below="xl">
              <CustomIconButton
                icon={<RxHamburgerMenu size={"20px"} />}
                aria={"Plus"}
                type={"outline"}
                color={"buttonPrimary"}
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
              color={"white"}
            />
          </Flex>

          <Flex
            as={motion.div}
            variants={bottomVariants}
            initial={"hidden"}
            animate={overlay ? "visible" : "hidden"}
            direction={"column"}
            justifyContent={"center"}
            height={"80%"}
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
              {navlinks.map((link) => (
                <CustomLink
                  key={link.name}
                  text={link.name}
                  to={""}
                  size={"38px"}
                  color={"white"}
                  onClick={() => {}}
                />
              ))}
              {state ? (
                <Box mt={"40px"}>
                  {!wallet ? (
                    <CustomButton
                      text="Connect"
                      type="filled"
                      onClick={metaMaskHandler}
                      fontSize={"18px"}
                    />
                  ) : (
                    <Flex
                      position={"relative"}
                      cursor={"pointer"}
                      gap={5}
                      alignItems={"center"}
                    >
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        position={"absolute"}
                        top={2}
                        left={3}
                        bg={"buttonPrimary"}
                        p={1}
                        rounded={"full"}
                        h={"35px"}
                        w={"35px"}
                      >
                        {/* <IoIosWallet color="white" size={"20px"} /> */}
                        <FaEthereum color="white" size={"20px"} />
                      </Box>
                      <Flex
                        rounded={"3xl"}
                        pl={"60px"}
                        h={"50px"}
                        bg={"background"}
                        fontWeight={"700"}
                        borderColor={"buttonHover"}
                        alignItems={"center"}
                        justifyContent={"end"}
                        pr={"5"}
                      >
                        <Text> 169.6660</Text>
                      </Flex>
                      <Avatar h={"45px"} w={"45px"} />
                    </Flex>
                  )}
                </Box>
              ) : (
                <Flex gap={5} mt={"40px"}>
                  <CustomButton
                    text="Register"
                    onClick={() => navigate("/register")}
                    type={"filled"}
                  />
                  <CustomButton
                    text="Login"
                    onClick={() => navigate("/login")}
                    type={"filled"}
                  />
                </Flex>
              )}
              <Text color={"fontGhost"} mt={"50px"} letterSpacing={"1px"}>
                Copyright © 2022. All right reserved.
              </Text>
            </Flex>
          </Flex>
        </>
      </Overlay>
      <Outlet />
      <Footer />
    </>
  );
};

export default Navbar;
