import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../features/auth/authSlice";
import { Link } from "react-router-dom";
const HomePage = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const welcome = user ? `Welcome ${user}` : "Welcome";
  const tokenAbbr = `${token.slice(0, 9)}...`;

  return (
    <>
      <Flex height={"40"}>
        <h1> {welcome} </h1>
      </Flex>
      <h2> {tokenAbbr}</h2>
    </>
  );
};

export default HomePage;
