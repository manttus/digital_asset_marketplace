import {
  Flex,
  Grid,
  Input,
  Text,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { useState } from "react";
import Circular from "../components/Abstracts/Circular";
import CustomBadge from "../components/Badge/CustomBadge";
import Featured from "../components/Showcase/Featured";

const CollectionPage = () => {
  const [archives, setArchives] = useState<any>([
    {
      id: 1,
      name: "Mantuu",
      image: "https://i.imgur.com/1Q1Z1Zu.png",
      description: "Mantuu",
      price: 0.1,
    },
    {
      id: 2,
      name: "Mantuu",
      image: "https://i.imgur.com/1Q1Z1Zu.png",
      description: "Mantuu",
      price: 0.1,
    },
    {
      id: 2,
      name: "Mantuu",
      image: "https://i.imgur.com/1Q1Z1Zu.png",
      description: "Mantuu",
      price: 0.1,
    },
    {
      id: 2,
      name: "Mantuu",
      image: "https://i.imgur.com/1Q1Z1Zu.png",
      description: "Mantuu",
      price: 0.1,
    },
    {
      id: 2,
      name: "Mantuu",
      image: "https://i.imgur.com/1Q1Z1Zu.png",
      description: "Mantuu",
      price: 0.1,
    },
    {
      id: 2,
      name: "Mantuu",
      image: "https://i.imgur.com/1Q1Z1Zu.png",
      description: "Mantuu",
      price: 0.1,
    },
  ]);
  return (
    <Grid
      height={"full"}
      width={"full"}
      gridTemplateRows={"200px  1fr"}
      rowGap={"100px"}
      p={"30px"}
      position={"relative"}
      zIndex={2}
    >
      <Flex
        px={"90px"}
        w={"full"}
        gridColumn={"span 2"}
        position={"relative"}
        zIndex={3}
        gap={1}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Circular top="-200" left={"-180"} zIndex={-4} />
        <Flex>
          <Text fontSize={"95px"} fontWeight={"600"} color={"buttonHover"}>
            Collections
          </Text>
          <Flex>
            <CustomBadge text="shop" color="tealGreen" bg="greenLight" />
          </Flex>
        </Flex>
      </Flex>
      <Flex w={"full"} gridColumn={"span 2"} p={"30px"}>
        <Flex w={"30%"} zIndex={"3"}></Flex>
      </Flex>
    </Grid>
  );
};

export default CollectionPage;
