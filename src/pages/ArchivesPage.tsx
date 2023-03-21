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
  Circle,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { VscSettings, VscAdd } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Circular from "../components/Abstracts/Circular";
import CustomBadge from "../components/Badge/CustomBadge";
import CustomIconButton from "../components/Button/CustomIconButton";
import CollectionCard from "../components/Card/CollectionCard";
import MarketCard from "../components/Card/MarketCard";
import { selectCurrentWallet } from "../features/auth/authSlice";
import { selectToken } from "../features/market/marketSlice";

const ArchivesPage = () => {
  const contract = useSelector(selectToken);
  const wallet = useSelector(selectCurrentWallet);
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
  const [token, setToken] = useState<any>();

  const loadListing = async () => {
    const listing = await token._getTokens(wallet);
    setArchives(listing);
  };

  window.ethereum.on("accountsChanged", async (accounts: any) => {
    loadListing();
  });

  const loadContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tokenContract = await new ethers.Contract(
      contract.address,
      contract.abi,
      signer
    );
    setToken(tokenContract);
  };

  return (
    <Grid
      height={"full"}
      width={"full"}
      gridTemplateColumns={"20% 2fr"}
      gridTemplateRows={"200px 100px 1fr"}
      rowGap={"20px"}
      p={"30px"}
      position={"relative"}
      zIndex={2}
    >
      <Flex
        px={"90px"}
        direction={"column"}
        w={"full"}
        gridColumn={"span 2"}
        position={"relative"}
        zIndex={3}
        gap={1}
      >
        {/* <Circular top="-400" left={"-140"} zIndex={-4} bottom={"-500"} /> */}
        {/* <Flex>
          <CustomBadge text="Inventory" color="orangeDark" bg="orangeLight" />
        </Flex>
        <Text fontSize={"95px"} fontWeight={"600"} color={"buttonHover"}>
          Archives
        </Text> */}
      </Flex>

      <Flex
        gridColumn={"span 2"}
        gap={5}
        px={"90px"}
        justifyContent={"start"}
        alignItems={"center"}
      >
        <Flex gap={4}>
          <CustomIconButton
            aria="filter"
            color="gray.200"
            icon={<VscSettings size={"25px"} />}
            type={"outline"}
            onClick={() => {}}
          />
          <CustomIconButton
            aria="filter"
            color="gray.200"
            icon={<VscAdd size={"25px"} />}
            type={"outline"}
            onClick={() => {}}
          />
        </Flex>
      </Flex>

      <Flex
        gap={8}
        width={"full"}
        wrap={"wrap"}
        alignItems={"center"}
        gridColumn={"span 2"}
        pl={"90px"}
        position={"relative"}
        zIndex={3}
      >
        {archives.map((archive: any) => {
          return <CollectionCard key={archive.id} />;
        })}
      </Flex>
    </Grid>
  );
};

export default ArchivesPage;
