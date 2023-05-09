import { ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import logo from "../../assets/logo2.png";
import { Outlet, NavLink as NavigationLink } from "react-router-dom";
import NormalButton from "../../components/Button/NormalButton";

const Links = [
  {
    link: "admin/dash",
    name: "Dashboard",
  },
  {
    link: "admin/tran",
    name: "Transactions",
  },
  {
    link: "admin/manage",
    name: "Management",
  },
];

const NavLink = ({ children, link }: { children: string; link: string }) => (
  <Link
    as={NavigationLink}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    to={link}
  >
    {children}
  </Link>
);

const AdminNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} shadow={"sm"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Image src={logo} w={"60px"} />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.link} link={link.link}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <NormalButton
              type="filled"
              text="Logout"
              py="5px"
              fontSize="16px"
            />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink
                  key={link.link}
                  children={link.name}
                  link={link.link}
                />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4} bg={"Background"} height={"auto"}>
        <Outlet />
      </Box>
    </>
  );
};

export default AdminNavbar;
