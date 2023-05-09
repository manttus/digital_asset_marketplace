import { Flex, Text } from "@chakra-ui/react";
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
import { bottomVariants } from "../theme/animation/variants";
import { motion } from "framer-motion";

const CollectionPage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const currentWallet = useSelector(selectCurrentWallet);
  const { market } = useSelector(selectMarket);
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
    <Flex
      direction={"column"}
      w={"full"}
      marginTop={"60px"}
      as={motion.div}
      variants={bottomVariants}
      initial={"hidden"}
      animate={"visible"}
    >
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
            Collections
          </Text>
          <Flex>
            <CustomBadge text="shop" color="tealGreen" bg="greenLight" />
          </Flex>
        </Flex>
      </Flex>
      <Flex
        w={"full"}
        direction={"column"}
        justifyContent={"space-between"}
        px={"110px"}
        py={"50px"}
        zIndex={2}
      >
        <Flex w={"full"} h={"350px"} bg={"gray.400"} rounded={"10px"}></Flex>

        <Flex marginTop={"70px"} gap={10} direction={"column"}>
          <Flex
            justifyContent={{
              sm: "center",
              md: "space-between",
              lg: "space-between",
              xl: "space-between",
            }}
          >
            <Text
              as={Flex}
              fontSize={{
                sm: "18px",
                md: "28px",
              }}
              fontWeight={"600"}
              alignItems={"center"}
              gap={5}
            >
              Collection Products
              <CustomBadge text="new" color="successLight " bg="greenLight" />
            </Text>

            <Text
              as={Flex}
              alignItems={"center"}
              fontSize={{
                sm: "15px",
                md: "13px",
                lg: "13px",
                xl: "13px",
              }}
              fontWeight={"700"}
              letterSpacing={"2px"}
              textDecoration={"underline"}
              textUnderlineOffset={"10px"}
              textDecorationThickness={"1.5px"}
            >
              LATEST 4 PRODUCTS
            </Text>
          </Flex>
          <Flex gap={"20px"}>
            {marketItems.map((item: any) => {
              return <MarketCard item={item} />;
            })}
          </Flex>
        </Flex>
        <Flex marginTop={"70px"} gap={10} direction={"column"}>
          <Flex
            justifyContent={{
              sm: "center",
              md: "space-between",
              lg: "space-between",
              xl: "space-between",
            }}
          >
            <Text
              as={Flex}
              fontSize={{
                sm: "18px",
                md: "28px",
              }}
              fontWeight={"600"}
              alignItems={"center"}
              gap={5}
            >
              Hot Categories
              <CustomBadge text="Hot" color="red.400 " bg="red.100" />
            </Text>

            <Text
              as={Flex}
              alignItems={"center"}
              fontSize={{
                sm: "15px",
                md: "13px",
                lg: "13px",
                xl: "13px",
              }}
              fontWeight={"700"}
              letterSpacing={"2px"}
              textDecoration={"underline"}
              textUnderlineOffset={"10px"}
              textDecorationThickness={"1.5px"}
            >
              LATEST 4 PRODUCTS
            </Text>
          </Flex>
          <Flex gap={"20px"}>
            {marketItems.map((item: any) => {
              return <MarketCard item={item} />;
            })}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CollectionPage;
