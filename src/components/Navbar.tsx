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
  Button,
  IconButton,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router";
import { BsDot } from "react-icons/bs";
import CustomButton from "./Button/CustomButton";
import CustomLink from "./Links/CustomLink";
import CustomIconButton from "./Button/CustomIconButton";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import Overlay from "./Overlay";
import { motion } from "framer-motion";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import {
  selectCurrentBalance,
  selectCurrentToken,
  selectCurrentWallet,
  selectCurrentUser,
} from "../features/auth/authSlice";
import ScrollToTop from "./ScrollToTop";
import { useDispatch } from "react-redux";
import logo from "../assets/logo2.png";
import { FaEthereum, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { AiOutlineDisconnect } from "react-icons/ai";
import AuthModal from "./AuthModal";
import {
  useGetNotificationQuery,
  useSendNewsLetterMutation,
} from "../features/api/authApi/apiSlice";
import { Socket } from "socket.io-client";

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
  disconnect: () => Promise<void>;
  buttonLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  sendOtp: (email: string) => Promise<boolean>;
  signupHandler: (
    email: string,
    otp: string,
    username: string
  ) => Promise<void>;
  address: string;
  isSendLoading: boolean;
  notification: any;
  refetch: any;
};

const navlinks = [
  { name: "About us", path: "/about" },
  { name: "Collection", path: "/collections" },
  { name: "Archives", path: "/archive" },
  { name: "Be a Creator", path: "/mint" },
];

const menuItems = [
  {
    name: "Account",
    path: "/profile",
    icon: <FiUser size={"24px"} />,
  },

  {
    name: "Sign Out",
    path: "/",
    icon: <AiOutlineDisconnect size={"24px"} />,
  },
];

const Navbar = ({
  metaMaskHandler,
  disconnect,
  buttonLoading,
  isOpen,
  onClose,
  sendOtp,
  signupHandler,
  address,
  notification,
  isSendLoading,
  refetch,
}: NavbarProps) => {
  const navigate = useNavigate();
  const state = useSelector(selectCurrentToken);
  const id = useSelector(selectCurrentUser);
  const wallet = useSelector(selectCurrentWallet);
  const balance = useSelector(selectCurrentBalance);
  const [overlay, setOverlay] = useState<boolean>(false);
  const [otpField, setOtpField] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [otpValue, setOtpValue] = useState<string>("");

  const [send, isLoading] = useSendNewsLetterMutation();

  const submitHandler = async (value: any) => {
    try {
      const resposne = await sendOtp(value.email);
      if (resposne) {
        setOtpField(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const registerHandler = () => {
    signupHandler(email, otpValue, username);
  };

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const currentPosition = window.pageYOffset;
    setScrollPosition(currentPosition);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <AuthModal
        isOpen={isOpen}
        onClose={onClose}
        submitHandler={submitHandler}
        address={address}
        otpField={otpField}
        registerHandler={registerHandler}
        setOtpValue={setOtpValue}
        setEmail={setEmail}
        email={email}
        isSendLoading={buttonLoading}
        sendOtp={sendOtp}
        setUsername={setUsername}
        setOtpField={setOtpField}
        username={username}
      />
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
                      key={link.path}
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
            gap={1}
          >
            <Hide below="xl">
              {/* {wallet && (
                <Menu autoSelect={false}>
                  <Flex
                    h={"35px"}
                    w={"35px"}
                    rounded={"full"}
                    border={"1px solid"}
                    borderColor={"gray.500"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    cursor={"pointer"}
                    as={MenuButton}
                  >
                    {notification.length}
                  </Flex>
                  <MenuList
                    bg={"background"}
                    rounded={"lg"}
                    shadow={"md"}
                    overflow={"hidden"}
                  >
                    {notification.length === 0 && (
                      <Flex py={5} w={"full"} justifyContent={"center"}>
                        <Text>No New Notifications</Text>
                      </Flex>
                    )}
                    {notification.map((item: any, index: number) => (
                      <>
                        <MenuItem display={"flex"} gap={3} key={item.id} px={5}>
                          <Avatar src={item.senderProfile} />
                          {`New Message from ${item.senderName}`}
                        </MenuItem>
                        {index !== notification.length - 1 && <MenuDivider />}
                      </>
                    ))}
                    <MenuDivider />
                    <Flex w={"full"} justifyContent={"center"}>
                      <Text onClick={() => {}} cursor={"pointer"}>
                        Mark as Read
                      </Text>
                    </Flex>
                  </MenuList>
                </Menu>
              )} */}

              {!wallet ? (
                <CustomButton
                  text="Connect"
                  onClick={metaMaskHandler}
                  type={"filled"}
                  isLoading={buttonLoading}
                />
              ) : (
                <Menu autoSelect={false}>
                  <Flex
                    position={"relative"}
                    cursor={"pointer"}
                    gap={5}
                    alignItems={"center"}
                  >
                    <Flex
                      position={"absolute"}
                      top={2}
                      left={3}
                      as={MenuButton}
                    >
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        bg={"buttonPrimary"}
                        p={1}
                        rounded={"full"}
                        h={"35px"}
                        w={"35px"}
                      >
                        <FaEthereum color="white" size={"20px"} />
                      </Box>
                    </Flex>

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

                  <MenuList
                    bg={"background"}
                    rounded={"lg"}
                    shadow={"md"}
                    overflow={"hidden"}
                  >
                    {menuItems.map((item, index) => (
                      <>
                        <MenuItem
                          bg={"background"}
                          key={item.name}
                          onClick={() => {
                            if (item.name === "Sign Out") {
                              disconnect();
                            }
                            navigate(item.path);
                          }}
                        >
                          <Flex alignItems={"center"} w={"full"} gap={5} px={2}>
                            <Flex alignItems={"center"}>
                              <Box display={"flex"} rounded={"full"}>
                                {item.icon}
                              </Box>
                            </Flex>
                            <Flex>
                              <Text fontSize={"16px"} fontWeight={"500"}>
                                {item.name}
                              </Text>
                            </Flex>
                          </Flex>
                        </MenuItem>
                        {index !== menuItems.length - 1 && <MenuDivider />}
                      </>
                    ))}
                  </MenuList>
                </Menu>
              )}
            </Hide>
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
      <Box
        display={"flex"}
        position={"sticky"}
        bottom={0}
        pb={"10px"}
        px={"25px"}
        zIndex={99}
        justifyContent={"flex-end"}
      >
        <CustomIconButton
          type="outline"
          icon={scrollPosition > 100 ? <FaArrowUp /> : <FaArrowDown />}
          aria="scroll"
          onClick={() => {
            if (scrollPosition > 100) {
              // Scroll to Top
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              // Scroll to Bottom
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              });
            }
          }}
        />
      </Box>
      <Footer sendNewsLetter={send} />
    </>
  );
};

export default Navbar;
