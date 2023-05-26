import {
  Box,
  Flex,
  Hide,
  Show,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import illustration1 from "../assets/eth3.webp";
import illustration2 from "../assets/abstract2.webp";
import illustration3 from "../assets/blob.webp";
import Collection from "../components/Showcase/Collection";
import Circular from "../components/Abstract/Circular";
import { motion } from "framer-motion";
import { bottomVariants } from "../theme/animation/variants";
import Partners from "../components/Showcase/Partners";
import Featured from "../components/Showcase/Featured";
import CustomBadge from "../components/Badge/CustomBadge";
import abstract2 from "../assets/abstract2.webp";
import {
  useGetLandingDataQuery,
  useGetCategoriesQuery,
} from "../features/api/authApi/apiSlice";
import { useSelector } from "react-redux";
import { selectMarket } from "../features/market/marketSlice";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectCurrentWallet } from "../features/auth/authSlice";
import NoResult from "../components/NoResult";

const LandingPage = () => {
  const wallet = useSelector(selectCurrentWallet);
  const { data, isLoading } = useGetLandingDataQuery();
  console.log(data);
  const navigate = useNavigate();
  const market = useSelector(selectMarket);
  const [shop, setShopInst] = useState<any>(null);
  const [listings, setListings] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const loadContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const shop = await new ethers.Contract(market.address, market.abi, signer);
    setShopInst(shop);
  };

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

  if (isLoading) {
    return;
  }

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

  return (
    <Flex
      direction={"column"}
      as={motion.div}
      variants={bottomVariants}
      initial={"hidden"}
      animate={"visible"}
    >
      <Flex
        py={{
          sm: "40px",
          md: "60px",
          lg: "90px",
        }}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        textAlign={"center"}
        lineHeight={"1.2"}
        letterSpacing={"-0.2em"}
        position={"relative"}
      >
        <Hide below={"xl"}>
          <Circular top="-350" left="700" />
          <Circular top="200" left="-50" />
        </Hide>
        <Hide below={"md"}>
          <Show above={"sm"} below={"xl"}>
            <Circular top="-350" left="50" />
          </Show>
        </Hide>
        <Flex
          alignItems={"center"}
          gap={{
            sm: 4,
            md: 4,
            lg: 6,
          }}
          zIndex={2}
        >
          <Text
            fontSize={{
              sm: "48px",
              md: "65px",
              lg: "95px",
            }}
            fontWeight={"600"}
            transition={"0.4s ease-in-out"}
          >
            Start selling
          </Text>
          <Box
            rounded={"50px"}
            height={{
              sm: "70px",
              md: "91px",
            }}
            transition={"0.4s ease-in-out"}
            width={{
              sm: "70px",
              md: "90px",
              lg: "300px",
            }}
            bgImg={illustration2}
            backgroundSize={"cover"}
            bgPos={"center"}
          ></Box>
        </Flex>
        <Flex
          alignItems={"center"}
          gap={{
            sm: 4,
            md: 6,
            lg: 10,
          }}
          zIndex={2}
          as={motion.div}
          variants={bottomVariants}
          initial={"hidden"}
          animate={"visible"}
        >
          <Text
            fontSize={{
              sm: "48px",
              md: "65px",
              lg: "95px",
            }}
            fontWeight={"600"}
            transition={"0.4s ease-in-out"}
          >
            creative
          </Text>
          <Box
            rounded={"50px"}
            height={{
              sm: "70px",
              md: "91px",
              lg: "91px",
            }}
            transition={"0.4s ease-in-out"}
            width={{
              sm: "70px",
              md: "90px",
              lg: "300px",
            }}
            bgSize={"cover"}
            bgImg={illustration1}
            bgPos={"bottom"}
          ></Box>
          <Text
            fontSize={{
              sm: "48px",
              md: "65px",
              lg: "95px",
            }}
            fontWeight={"600"}
            color={"tealGreen"}
            transition={"0.4s ease-in-out"}
          >
            assets
          </Text>
        </Flex>
        <Flex
          as={motion.div}
          alignItems={"center"}
          gap={{
            sm: 4,
            md: 4,
            lg: 6,
          }}
          zIndex={2}
          variants={bottomVariants}
          initial={"hidden"}
          animate={"visible"}
        >
          <Box
            rounded={"50px"}
            height={{
              sm: "70px",
              md: "91px",
              lg: "91px",
            }}
            width={{
              sm: "70px",
              md: "91px",
              lg: "91px",
            }}
            scale={"10"}
            bgImg={illustration3}
            bgSize={"cover"}
            bgPos={"center"}
          ></Box>
          <Text
            fontSize={{
              sm: "42px",
              md: "65px",
              lg: "95px",
            }}
            fontWeight={"600"}
            transition={"0.4s ease-in-out"}
          >
            collections
          </Text>
        </Flex>
      </Flex>
      <Flex
        px={"70px"}
        py={"20px"}
        bg={"background"}
        direction={"column"}
        gap={5}
        zIndex={2}
      >
        <Collection marketItems={listings} />
        <Partners />

        {/* <Featured featured={data.featured} /> */}
        <Flex direction={"column"} gap={10} my={"20px"}>
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
                Top Collections
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
              MOST POPULAR COLLECTIONS
            </Text>
          </Flex>
          <TableContainer display={"flex"} justifyContent={"center"}>
            <Table variant="unstyled" size={"lg"} w={"85%"}>
              <Thead borderBottom={"1px solid"} borderColor={"gray.200"}>
                <Tr>
                  <Th>Collection</Th>
                  <Th>Total Volume</Th>
                  <Th isNumeric>Floor Price (ETH)</Th>
                  <Th isNumeric>Total Flow (ETH)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.categories.slice(0, 4).map((category: any) => {
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
          {data.categories.length === 0 && <NoResult />}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LandingPage;
