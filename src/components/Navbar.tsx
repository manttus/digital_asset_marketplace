import { Avatar, Box, Flex, Hide, Show, Text, Image } from "@chakra-ui/react";
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
import useLocalStorage from "../hooks/useLocalStorage";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import ScrollToTop from "./ScrollToTop";
import NFT from "../../contract_data/NFT.json";
import NFTaddress from "../../contract_data/NFT-Address.json";
import Market from "../../contract_data/Market.json";
import MarketAddress from "../../contract_data/Market-Address.json";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { setMarketList } from "../features/market/marketSlice";
import logo from "../assets/logo2.png";

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

const navlinks = [
  { name: "About us", path: "/about" },
  { name: "Collection", path: "/collection" },
  { name: "Archives", path: "/archive" },
  { name: "Be a Creator", path: "/mint" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(selectCurrentToken);
  const [overlay, setOverlay] = useState<boolean>(false);
  const { value, setItem, removeItem } = useLocalStorage("wallet");
  const [wallet, setWallet] = useState<string | null | undefined>(value);

  const metaMaskHandler = async () => {
    if (window.ethereum) {
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const address = account[0];
        setItem(address);
        setWallet(address);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  const loadContracts = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(
      NFTaddress.address,
      NFT.abi,
      signer
    );
    const marketContract = new ethers.Contract(
      MarketAddress.address,
      Market.abi,
      signer
    );
    console.log(nftContract, marketContract);
    const data = await marketContract._getListings();
    console.log(data);
    dispatch(setMarketList({ marketItems: data }));
  };

  useEffect(() => {
    if (wallet) {
      loadContracts();
    }
  }, [wallet]);

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
                <CustomButton
                  text={wallet ? "Connected" : "Connect"}
                  type="filled"
                  onClick={
                    !wallet
                      ? metaMaskHandler
                      : () => {
                          removeItem();
                          setWallet(null);
                        }
                  }
                />
                <Avatar size={"md"} />
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
            justifyContent={"flex-end"}
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
                  to={link.path}
                  size={"38px"}
                  color={"white"}
                />
              ))}
              {state ? (
                <Box mt={"40px"}>
                  <CustomButton
                    text="Connect"
                    type="filled"
                    onClick={metaMaskHandler}
                    fontSize={"18px"}
                  />
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
