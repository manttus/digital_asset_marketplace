import { Flex, Text } from "@chakra-ui/react";

import image1 from "../assets/image1_about.png";
import image2 from "../assets/image2_about.png";
import image3 from "../assets/image3_about.png";
import image4 from "../assets/image4_about.png";
import Circular from "../components/Abstract/Circular";
import CustomBadge from "../components/Badge/CustomBadge";
import { bottomVariants } from "../theme/animation/variants";
import { motion } from "framer-motion";
import AboutCard from "../components/Card/AboutCard";
import Partners from "../components/Showcase/Partners";

const AboutPage = () => {
  return (
    <Flex
      direction={"column"}
      w={"full"}
      as={motion.div}
      variants={bottomVariants}
      initial={"hidden"}
      animate={"visible"}
    >
      <Flex direction={"column"} w={"full"} marginTop={"60px"}>
        <Flex
          px={"110px"}
          w={"full"}
          position={"relative"}
          zIndex={1}
          gap={1}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Circular top="-230" left={"-180"} zIndex={-4} />
          <Flex>
            <Text fontSize={"95px"} fontWeight={"600"} color={"buttonHover"}>
              About us
            </Text>
            <Flex>
              <CustomBadge text="details" color="tealGreen" bg="greenLight" />
            </Flex>
          </Flex>
        </Flex>

        <Flex direction={"column"} px={"110px"} py={"80px"} gap={6}>
          <Flex justifyContent={"space-between"}>
            <AboutCard
              text=""
              image={image1}
              link="https://ethereum.org/en/"
              heading="Ethereum"
            />
            <AboutCard
              text=""
              image={image2}
              link="https://hardhat.org/"
              heading="HardHat"
            />
          </Flex>

          <Flex justifyContent={"space-between"}>
            <AboutCard
              text=""
              image={image3}
              link="https://www.pinata.cloud/"
              heading="Pinata"
            />
            <AboutCard
              text=""
              image={image4}
              link="https://trufflesuite.com/ganache/"
              heading="Ganache"
            />
          </Flex>

          <Partners />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AboutPage;
