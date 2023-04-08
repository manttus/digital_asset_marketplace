import { Flex, Text, list } from "@chakra-ui/react";
import CustomBadge from "../Badge/CustomBadge";
import MarketCard from "../Card/MarketCard";
import {
  selectMarket,
  selectMarketItems,
} from "../../features/market/marketSlice";
import { useSelector } from "react-redux";
import NoResult from "../NoResult";
import NormalButton from "../Button/NormalButton";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { selectUserData } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Collection = () => {
  const currentUser = useSelector(selectUserData);
  const marketContract = useSelector(selectMarket);
  const [market, setMarket] = useState<any>([]);
  const [marketItems, setMarketItems] = useState<any>([]);
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
      });
    }
    setMarketItems(refined);
  };

  useEffect(() => {
    if (market) {
      setFlag(true);
    }
  }, [market]);

  useEffect(() => {
    if (currentUser) {
      LoadContract();
    }
  }, [currentUser]);

  useEffect(() => {
    if (market && flag) {
      fetchMarketData();
    }
  }, [market]);

  return (
    <>
      <Flex justifyContent={"space-between"}>
        <Text
          as={Flex}
          fontSize={"28px"}
          fontWeight={"600"}
          alignItems={"center"}
          gap={5}
        >
          Collections Products
          <CustomBadge text="40+" color="orange" bg="orangeLight" />
        </Text>

        <Text
          fontSize={"13px"}
          fontWeight={"700"}
          letterSpacing={"2px"}
          textDecoration={"underline"}
          textUnderlineOffset={"10px"}
          textDecorationThickness={"1.5px"}
        >
          LATEST 4 PRODUCTS
        </Text>
      </Flex>
      <Flex
        gap={5}
        mt={"20px"}
        w={"full"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {marketItems.length === 0 ? <NoResult /> : null}
        {marketItems.map((item: any) => {
          return <MarketCard key={item.name} item={item} />;
        })}
      </Flex>
      <Flex w={"100%"} justifyContent={"center"} pt={"30px"}>
        <NormalButton
          width={"380px"}
          text="Check More"
          onClick={() => {
            navigate("/collections");
          }}
          type={"solid"}
        />
      </Flex>
    </>
  );
};
export default Collection;
