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
import Circular from "../components/Abstract/Circular";
import CustomBadge from "../components/Badge/CustomBadge";
import { useSelector } from "react-redux";
import { selectMarket } from "../features/market/marketSlice";
import { ethers } from "ethers";
import {
  selectCurrentUser,
  selectCurrentWallet,
} from "../features/auth/authSlice";
import MarketCard from "../components/Card/MarketCard";

const CollectionPage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const currentWallet = useSelector(selectCurrentWallet);
  const market = useSelector(selectMarket);
  const [marketContract, setMarketContract] = useState<any>([]);
  const [marketItems, setMarketItems] = useState<any>([]);
  const [flag, setFlag] = useState<boolean>(false);

  const LoadContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const shop = new ethers.Contract(market.address, market.abi, signer);
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
        owner: listing[i][2]._owner,
      });
    }
    if (currentUser) {
      const filtered = refined.filter((item: any) => {
        return item.owner.toUpperCase() !== currentWallet!.toUpperCase();
      });
      setMarketItems(filtered);
    } else {
      setMarketItems(refined);
    }
  };

  useEffect(() => {
    if (marketContract) {
      setFlag(true);
    }
  }, [marketContract]);

  useEffect(() => {
    console.log("load contract");
    LoadContract();
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
      <Flex
        gridColumn={"span 2"}
        w={"full"}
        justifyContent={"center"}
        alignItems={"center"}
        wrap={"wrap"}
        gap={10}
      >
        <Flex w={"100%"} zIndex={"3"} justifyContent={"center"}>
          {marketItems.map((item: any) => {
            return <MarketCard item={item} key={item.id} />;
          })}
        </Flex>
      </Flex>
    </Grid>
  );
};

export default CollectionPage;
