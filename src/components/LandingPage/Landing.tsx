import { Flex } from "@chakra-ui/react";

import Navbar from "../Navbar";

const metaMaskHandler = () => {};

const Landing = () => {
  return (
    <>
      <Navbar metaMaskHandler={metaMaskHandler} />
      {/* <Flex w={"full"} justifyContent={"space-evenly"} mt={"10"}>
        <Flex
          w={"50%"}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Flex>
            <Box>
              <Text fontSize={"6xl"} fontWeight={"200"}>
                Collect & Sell
              </Text>
              <Text fontSize={"6xl"} fontWeight={"600"}>
                Rare NFTs
              </Text>
            </Box>
          </Flex>

          <Box my={"40px"} w={"380px"} display={"flex"} alignItems={"center"}>
            <Button
              fontSize={"md"}
              bg={"purple.500"}
              color={"white"}
              fontWeight={"500"}
              rightIcon={<AiOutlineArrowRight />}
            >
              Get Started
            </Button>
            <Box ml="8">
              <Link to="/"> Explore Feeds </Link>
            </Box>
          </Box>
        </Flex>
        <Flex w={"40%"}>
          <Image src={animated} height={"450"} />{" "}
        </Flex>
      </Flex> */}
      <Flex> </Flex>
    </>
  );
};

export default Landing;
