import { Flex, Text, Hide, useMediaQuery } from "@chakra-ui/react";
import CustomBadge from "../Badge/CustomBadge";
import MarketCard from "../Card/MarketCard";
import { useSelector } from "react-redux";
import NoResult from "../NoResult";
import NormalButton from "../Button/NormalButton";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { selectUserData } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../types/StoreType";

const Collection = () => {
  const { marketItems: marketData } = useSelector(
    (state: RootState) => state.market
  );
  const [isLargerThan1346] = useMediaQuery("(min-width: 1346px)");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const currentUser = useSelector(selectUserData);
  const [marketItems, setMarketItems] = useState<any>(marketData);

  const navigate = useNavigate();

  return (
    <>
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
          justifyContent={"space-between"}
        >
          {marketItems.slice(0, 4).map((item: any) => {
            return <MarketCard key={item.name} item={item} />;
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
            justifyContent={"space-between"}
          >
            {marketItems.slice(0, 2).map((item: any) => {
              return <MarketCard key={item.name} item={item} />;
            })}
          </Flex>
          <Flex
            gap={5}
            mt={"20px"}
            w={"full"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            {marketItems.slice(2, 4).map((item: any) => {
              return <MarketCard key={item.name} item={item} />;
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
          {marketItems.map((item: any) => {
            return <MarketCard key={item.name} item={item} />;
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
