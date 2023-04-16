import {
  Flex,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import FeedCard from "../Card/FeedCard";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentWallet,
  selectUserData,
} from "../../features/auth/authSlice";
import { selectMarket } from "../../features/market/marketSlice";
import { set } from "react-hook-form";

const TabItems = [
  {
    title: "For You",
    content: "two!",
  },
  {
    title: "Following",
    content: "three!",
  },
];

const FeedTabs = () => {
  const currentUser = useSelector(selectUserData);
  const id = useSelector(selectCurrentUser);
  const marketContract = useSelector(selectMarket);
  const wallet = useSelector(selectCurrentWallet);
  const [market, setMarket] = useState<any>([]);
  const [feedItems, setFeedsItems] = useState<any>([]);
  const [flag, setFlag] = useState<boolean>(false);
  const navigate = useNavigate();
  const LoadContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const market = new ethers.Contract(
      marketContract.address,
      marketContract.abi,
      signer
    );
    setMarket(market);
  };

  const fetchMarketData = async () => {
    const listing = await market._getListings();
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
    console.log(refined);
    setFeedsItems(refined);
  };

  useEffect(() => {
    if (market) {
      setFlag(true);
    }
  }, [market]);

  useEffect(() => {
    LoadContract();
  }, [id]);

  useEffect(() => {
    if (market && flag) {
      fetchMarketData();
    }
  }, [market]);
  return (
    <Tabs size={"md"} isFitted w={"70%"}>
      <TabList>
        {TabItems.map((item, index) => {
          return (
            <Tab fontWeight={"500"} key={index}>
              {item.title}
            </Tab>
          );
        })}
      </TabList>
      <TabPanels>
        <TabPanel>
          <Flex direction={"column"} my={10} gap={10}>
            {feedItems.map((item: any) => {
              return <FeedCard key={item.id} data={item} />;
            })}
          </Flex>
        </TabPanel>
        <TabPanel></TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default FeedTabs;
