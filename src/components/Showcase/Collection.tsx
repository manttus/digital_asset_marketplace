import {
  Flex,
  Text,
  Hide,
  useMediaQuery,
  useDisclosure,
} from "@chakra-ui/react";
import CustomBadge from "../Badge/CustomBadge";
import MarketCard from "../Card/MarketCard";
import { useSelector } from "react-redux";
import NoResult from "../NoResult";
import NormalButton from "../Button/NormalButton";
import {
  selectCurrentWallet,
  selectUserData,
} from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import BuyModal from "../BuyModal";
import { useEffect, useState } from "react";
import { selectMarket } from "../../features/market/marketSlice";
import { ethers } from "ethers";

const Collection = ({ marketItems }: { marketItems: any }) => {
  const [isLargerThan1346] = useMediaQuery("(min-width: 1346px)");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<any>(null); // [1
  const currentUser = useSelector(selectUserData);
  const navigate = useNavigate();
  const wallet = useSelector(selectCurrentWallet);
  const market = useSelector(selectMarket);
  const [shop, setShopInst] = useState<any>(null);

  const loadContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const shop = await new ethers.Contract(market.address, market.abi, signer);
    setShopInst(shop);
  };

  useEffect(() => {
    if (market) {
      loadContract();
    }
  }, [market]);

  const checkIfExists = (wallet: string | null, marketItems: any) => {
    let flag = false;
    marketItems.forEach((item: any) => {
      if (item._token._owner.toLowerCase() !== wallet?.toLowerCase()) {
        flag = true;
      }
    });
    return flag;
  };

  return (
    <>
      <BuyModal
        isOpen={isOpen}
        onClose={onClose}
        selected={selected}
        shop={shop}
      />
      <Flex
        justifyContent={{
          sm: "center",
          md: "space-between",
          lg: "space-between",
          xl: "space-between",
        }}
      >
        <Hide below="md">
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
            Recent Products
            <CustomBadge text="new" color="successLight " bg="greenLight" />
          </Text>
        </Hide>
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
      {isLargerThan1346 && (
        <Flex
          gap={5}
          mt={"20px"}
          w={"full"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {!checkIfExists(wallet, marketItems) && <NoResult />}
          {marketItems.map((item: any) => {
            console.log(
              item._token._owner.toLowerCase() === wallet?.toLowerCase()
            );
            if (item._token._owner.toLowerCase() !== wallet?.toLowerCase()) {
              return (
                <MarketCard
                  key={item._token._owner}
                  item={item}
                  onClick={() => {
                    setSelected(item);
                    onOpen();
                  }}
                />
              );
            }
          })}
        </Flex>
      )}
      {!isLargerThan1346 && isLargerThan768 && (
        <Flex direction={"column"} alignItems={"center"} w={"full"}>
          <Flex
            gap={5}
            mt={"20px"}
            w={"full"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {!checkIfExists(wallet, marketItems) && <NoResult />}
            {marketItems.map((item: any) => {
              if (item._token._owner.toLowerCase() !== wallet?.toLowerCase()) {
                return (
                  <MarketCard
                    key={item._token._owner}
                    item={item}
                    onClick={() => {
                      setSelected(item);
                      onOpen();
                    }}
                  />
                );
              }
            })}
          </Flex>

          <Flex
            gap={5}
            mt={"20px"}
            w={"full"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {!checkIfExists(wallet, marketItems) && <NoResult />}
            {marketItems.map((item: any) => {
              if (item._token._owner.toLowerCase() !== wallet?.toLowerCase()) {
                return (
                  <MarketCard
                    key={item._token._owner}
                    item={item}
                    onClick={() => {
                      setSelected(item);
                      onOpen();
                    }}
                  />
                );
              }
            })}
          </Flex>
        </Flex>
      )}
      {!isLargerThan768 && (
        <Flex
          direction={"column"}
          mt={"20px"}
          gap={5}
          alignItems={"center"}
          w={"full"}
        >
          {!checkIfExists(wallet, marketItems) && <NoResult />}
          {marketItems.map((item: any) => {
            if (item._token._owner.toLowerCase() !== wallet?.toLowerCase()) {
              return (
                <MarketCard
                  key={item._token._owner}
                  item={item}
                  onClick={() => {
                    setSelected(item);
                    onOpen();
                  }}
                />
              );
            }
          })}
        </Flex>
      )}
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
