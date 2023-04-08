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
import { useEffect, useState } from "react";
import Circular from "../components/Abstracts/Circular";
import CustomBadge from "../components/Badge/CustomBadge";
import Featured from "../components/Showcase/Featured";
import { useSelector } from "react-redux";
import {
  selectMarket,
  selectMarketItems,
} from "../features/market/marketSlice";
import { ethers } from "ethers";
import { selectCurrentUser } from "../features/auth/authSlice";
import MarketCard from "../components/Card/MarketCard";

const CollectionPage = () => {
  const marketlist = useSelector(selectMarketItems);
  const currentUser = useSelector(selectCurrentUser);
  const market = useSelector(selectMarket);
  const [archives, setArchives] = useState<any>([]);
  const [marketContract, setMarketContract] = useState<any>([]);
  const [marketItems, setMarketItems] = useState<any>([]);
  const [flag, setFlag] = useState<boolean>(false);

  const LoadContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const shop = new ethers.Contract(market.address, market.abi, signer);
    console.log(shop);
    setMarketContract(shop);
  };

  const fetchMarketData = async () => {
    const listing = await marketContract._getListings();
    const refined = [];
    const limit = listing.length > 4 ? 4 : listing.length;
    for (let i = listing.length - 1; i >= listing.length - limit; i--) {
      refined.push({
        _id: listing[i]._id,
        name: listing[i][2]._name,
        price: parseInt(listing[i]._price._hex) / 1000000000000000000,
        image: listing[i][2]._asset,
      });
    }
    setMarketItems(refined);
  };

  useEffect(() => {
    if (marketContract) {
      setFlag(true);
    }
  }, [marketContract]);

  useEffect(() => {
    if (currentUser) {
      LoadContract();
    }
  }, [currentUser]);

  useEffect(() => {
    if (marketContract && flag) {
      fetchMarketData();
    }
  }, [marketContract]);

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
        <Flex w={"30%"} zIndex={"3"}>
          {marketItems.map((item: any) => {
            return <MarketCard key={item.id} />;
          })}
        </Flex>
      </Flex>
    </Grid>
  );
};

export default CollectionPage;
