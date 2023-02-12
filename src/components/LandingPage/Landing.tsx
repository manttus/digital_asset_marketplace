import { SearchIcon } from "@chakra-ui/icons";
import { VscSettings } from "react-icons/vsc";
import { FaEthereum } from "react-icons/fa";
import { FiGrid } from "react-icons/fi";
import {
  Box,
  Flex,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Show,
  Hide,
  HStack,
} from "@chakra-ui/react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar/Sidebar";
import MarketCard from "../Cards/MarketCard";
import CustomIconButton from "../Buttons/CustomIconButton";

const metaMaskHandler = () => {};

const Landing = () => {
  return (
    <>
      <Navbar metaMaskHandler={metaMaskHandler} />
      <Flex width={"100%"} justifyContent={"space-between"} my={"40px"}>
        <Flex
          display={{ sm: "none", md: "none", lg: "flex", xl: "flex" }}
          width={{ sm: "0", md: "0", lg: "20%", xl: "20%" }}
          justifyContent={"center"}
        ></Flex>
        <Flex
          width={{ sm: "100%", md: "100%", lg: "75%", xl: "75%" }}
          px={"30px"}
        >
          <HStack
            spacing={3}
            w={"full"}
            display={"flex"}
            justifyContent={{
              sm: "center",
              md: "center",
              lg: "end",
              xl: "end",
            }}
          >
            <Box
              minW={"306px"}
              w={{ sm: "100%", md: "100%", lg: "30%", xl: "30%" }}
            >
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon />}
                />
                <Input
                  type="text"
                  placeholder="Search"
                  focusBorderColor={"black"}
                />
              </InputGroup>
            </Box>
            <Box>
              <CustomIconButton
                icon={<VscSettings size={"20px"} />}
                aria={"Sort"}
              />
            </Box>
            <Box>
              <CustomIconButton icon={<FiGrid size={"20px"} />} aria={"Sort"} />
            </Box>
            <Box>
              <CustomIconButton
                icon={<VscSettings size={"20px"} />}
                aria={"Sort"}
              />
            </Box>
          </HStack>
        </Flex>
      </Flex>
      <Flex justifyContent={"space-between"} mt={{ lg: "50px", xl: "50px" }}>
        {/* <Sidebar /> */}
        {/* <Flex
          display={{ sm: "none", md: "none", lg: "flex", xl: "flex" }}
          minW={"75%"}
          width={"75%"}
          height={"100%"}
          justifyContent={"center"}
        >
          <SimpleGrid columns={{ lg: 3, xl: 4 }} spacing={5}>
            <MarketCard />
            <MarketCard />
            <MarketCard />
            <MarketCard />
            <MarketCard />
            <MarketCard />
            <MarketCard />
            <MarketCard />
          </SimpleGrid>
        </Flex> */}
      </Flex>
      {/* <Show below={"xl"}>
        <Flex width={"100%"} justifyContent={"center"} mt={"40px"}>
          <SimpleGrid columns={4} spacing={20}>
            <MarketCard />
            <MarketCard />
            <MarketCard />
            <MarketCard />
            <MarketCard />
            <MarketCard />
            <MarketCard />
          </SimpleGrid>
        </Flex>
      </Show> */}
    </>
  );
};

export default Landing;
