import { RiNotification2Line } from "react-icons/ri";
import { Avatar, Flex, Icon, Image, Link } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router";
import logo from "../assets/logo.png";
import CustomButton from "./Buttons/CustomButton";
import CustomIconButton from "./Buttons/CustomIconButton";
import { ExternalProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { useState } from "react";

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <Flex
        h={"80px"}
        w={"100%"}
        shadow={"sm"}
        justifyContent={"space-between"}
        alignItems={"center"}
        px={"50px"}
      >
        <Flex w={"50%"}>
          <Link onClick={() => navigate("/archives")}>Archives</Link>
        </Flex>
        <Flex
          w={"50%"}
          justifyContent={"end"}
          alignItems={"center"}
          gap={10}
        ></Flex>
      </Flex>
      <Outlet />
    </>
  );
};

export default Navbar;
