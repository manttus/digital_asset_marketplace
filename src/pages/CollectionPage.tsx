import {
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Hide,
  Input,
  Select,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import nice from "../assets/nice.webp";
import Circular from "../components/Abstract/Circular";
import CustomBadge from "../components/Badge/CustomBadge";
import { useSelector } from "react-redux";
import { selectMarket } from "../features/market/marketSlice";
import { ethers } from "ethers";
import {
  selectCurrentUser,
  selectCurrentWallet,
} from "../features/auth/authSlice";

import { bottomVariants } from "../theme/animation/variants";
import { motion } from "framer-motion";

import CollectionCard from "../components/Card/CollectionCard";
import { useGetLandingDataQuery } from "../features/api/authApi/apiSlice";
import { useNavigate } from "react-router-dom";
import NoResult from "../components/NoResult";

const CollectionPage = () => {
  const wallet = useSelector(selectCurrentWallet);
  const { data, isLoading } = useGetLandingDataQuery();
  const navigate = useNavigate();
  const market = useSelector(selectMarket);
  const [shop, setShopInst] = useState<any>(null);
  const [listings, setListings] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [temp, setTemp] = useState<any>([]);

  const loadContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const shop = await new ethers.Contract(market.address, market.abi, signer);
    setShopInst(shop);
  };

  useEffect(() => {
    if (data) {
      setTemp(data?.categories);
    }
  }, [data]);

  const getListing = async () => {
    const listing = await shop._getListings();
    setListings(listing);
  };
  useEffect(() => {
    if (market) {
      loadContract();
    }
  }, [market]);

  useEffect(() => {
    if (shop) {
      getListing();
    }
  }, [shop]);

  const calculateStats = (name: string) => {
    const filtered = listings.filter(
      (item: any) => item._token._category === name
    );
    const total = filtered.length;
    let totalPrice = 0;
    let allPrices: any = [];
    filtered.forEach((item: any) => {
      const price = ethers.utils.formatEther(item._price);
      totalPrice += parseFloat(price);
      allPrices.push(parseFloat(price));
    });

    const lowest = Math.min(...allPrices);

    return {
      floorPrice: isFinite(lowest) ? lowest : 0,
      total,
      totalPrice,
    };
  };

  const getListingByCategory = (name: string) => {
    const filtered = listings.filter(
      (item: any) => item._token._category === name
    );
    return filtered;
  };

  const seachHandler = (value: string) => {
    const filtered = data?.categories.filter((item: any) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setTemp(filtered);
  };

  const sortHandler = (value: string) => {
    console.log(temp);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          <Flex
            w={"full"}
            h={"350px"}
            bgImg={nice}
            bgPos={"center"}
            bgSize={"cover"}
            rounded={"10px"}
          ></Flex>

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
            <Flex gap={"20px"} justifyContent={"center"} mb={"60px"}>
              {data?.categories?.length === 0 && <NoResult />}
              {data?.categories?.map((item: any) => {
                const specificListing = getListingByCategory(item.name);
                return (
                  <CollectionCard
                    key={item._id}
                    category={item}
                    lisitng={specificListing}
                  />
                );
              })}
            </Flex>
          </Flex>

          <Flex direction={"column"} gap={10} mt={"40px"}>
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
                  Collections
                  <CustomBadge
                    text="Shop"
                    color="successLight "
                    bg="greenLight"
                  />
                </Text>
              </Hide>
              <Text
                as={Flex}
                All
                Collections
                new
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
                MOST POPULAR COLLECTIONS
              </Text>
            </Flex>
            <Flex justifyContent={"end"} w={"full"}>
              <Box w={"30%"}>
                <Input
                  rounded={"sm"}
                  type={"text"}
                  h={12}
                  placeholder="Collection Name"
                  _placeholder={{ color: "gray.400", fontSize: "16px" }}
                  onChange={(e) => seachHandler(e.target.value)}
                />
              </Box>
            </Flex>
            <TableContainer display={"flex"} justifyContent={"center"}>
              <Table variant="unstyled" size={"lg"}>
                <Thead borderBottom={"1px solid"} borderColor={"gray.200"}>
                  <Tr>
                    <Th>Collection</Th>
                    <Th>Total Volume</Th>
                    <Th isNumeric>Floor Price (ETH)</Th>
                    <Th isNumeric>Total Flow (ETH)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {temp.map((category: any) => {
                    const data = calculateStats(category.name);
                    return (
                      <Tr
                        _hover={{
                          bg: "gray.100",
                        }}
                        key={category.userId}
                        onClick={() => {
                          navigate(`/archive/${category.name}`);
                        }}
                      >
                        <Td display={"flex"} alignItems={"center"} gap={"5"}>
                          <Flex
                            height={"80px"}
                            w={"80px"}
                            bgImage={category.avatar}
                            bgSize={"cover"}
                            bgPos={"center"}
                            rounded={"lg"}
                          ></Flex>
                          <Text fontWeight={"600"} fontSize={"18px"} ml={"5"}>
                            {category.name}
                          </Text>
                        </Td>
                        <Td
                          fontWeight={"600"}
                          fontSize={"18px"}
                          align="center"
                          pl={"14"}
                        >
                          {data.total}
                        </Td>
                        <Td fontWeight={"600"} fontSize={"18px"} pl={"16"}>
                          {data.floorPrice}
                        </Td>
                        <Td fontWeight={"600"} fontSize={"18px"} pl={"20"}>
                          {data.totalPrice}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CollectionPage;
