import { Flex, Text, Avatar, HStack } from "@chakra-ui/react";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";

import Illustration from "../../assets/abstract1.webp";
import CustomBadge from "../Badge/CustomBadge";
import CustomIconButton from "../Button/CustomIconButton";
import CustomLink from "../Links/CustomLink";
import NormalButton from "../Button/NormalButton";

const Featured = () => {
  return (
    <Flex py={"20px"} bg={"background"} direction={"column"} gap={5}>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Text
          as={Flex}
          fontSize={"28px"}
          fontWeight={"600"}
          alignItems={"center"}
          gap={5}
        >
          Featured Products
          <CustomBadge text="The best choice" color="orange" bg="orangeLight" />
        </Text>

        <Text
          fontSize={"13px"}
          fontWeight={"700"}
          letterSpacing={"2px"}
          textDecoration={"underline"}
          textUnderlineOffset={"10px"}
          textDecorationThickness={"1.5px"}
        >
          SORTED BY LATEST
        </Text>
      </Flex>
      <Flex w={"full"} shadow={"sm"}>
        <Flex w={"50%"} direction={"column"} bg={"white"} rounded={"10px"}>
          <Flex
            alignItems={"center"}
            px={"30px"}
            py={"40px"}
            justifyContent={"space-between"}
          >
            <Flex alignItems={"center"} gap={4} cursor={"pointer"}>
              <Avatar size={"md"} />
              <Text
                fontWeight={"600"}
                fontSize={"15px"}
                letterSpacing={"0.4px"}
              >
                Michael Noris
              </Text>
            </Flex>
            <Flex>
              <HStack>
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
              </HStack>
            </Flex>
          </Flex>
          <Flex
            mt={"20px"}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={1}
          >
            <CustomBadge
              bg="greenLight"
              color="successLight"
              text="Best Popular"
            />
            <CustomLink size="38px" text="Missing Puzzle" to="mum" />
            <Text
              color={"fontGhost"}
              px={"100px"}
              fontSize={"15px"}
              fontWeight={"600"}
              mt={"20px"}
              textAlign={"center"}
            >
              A unique collection of missing puzzles. Attractive appearance and
              attractive power in colored wooden blocks
            </Text>
            <Flex
              mt={"30px"}
              gap={5}
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Flex
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Text fontSize={"18px"} fontWeight={"600"}>
                  Price Proposition
                </Text>
                <Text fontSize={"38px"} fontWeight={"600"}>
                  2.95 ETH
                </Text>
              </Flex>
              <NormalButton
                text="Check Product"
                type="outline"
                width="380px"
                rightIcon={<IoIosArrowForward />}
                onClick={() => {}}
                bg={"buttonHover"}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex
          w={"50%"}
          bgImg={Illustration}
          bgPos={"center"}
          height={"600px"}
          roundedRight={"10px"}
        ></Flex>
      </Flex>
    </Flex>
  );
};

export default Featured;
