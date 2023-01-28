import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  WrapItem,
} from "@chakra-ui/react";
import { BiWalletAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <Flex
      h={"15%"}
      alignItems={"center"}
      justifyContent={"space-between"}
      boxShadow={"sm"}
    >
      <Flex w={"60%"} alignItems={"center"}>
        <Box w={"60%"}>
          <Image src={logo} height="100px" />
        </Box>
        <HStack w={"30%"} spacing={10}>
          <Link to="/">Market</Link>
          <Link to="/">Categories </Link>
          <Link to="/"> Explore </Link>
          <Link to="/">Mint</Link>
        </HStack>
      </Flex>
      <Flex
        w={"20%"}
        mr={"5"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
      >
        <Box px={"4"}>
          <Button
            leftIcon={<BiWalletAlt />}
            variant={"outline"}
            fontSize={"sm"}
            color={"purple.500"}
            fontWeight={"500"}
            _hover={{ bg: "purple.600", color: "white" }}
          >
            Connect
          </Button>
        </Box>
        <Box>
          <WrapItem>
            <Avatar size={"sm"}>
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
          </WrapItem>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
