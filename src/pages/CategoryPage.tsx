import {
  Flex,
  Input,
  Text,
  useDisclosure,
  Box,
  Select,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bottomVariants } from "../theme/animation/variants";
import { useSelector } from "react-redux";
import { selectMarket } from "../features/market/marketSlice";
import { ethers } from "ethers";
import { useGetSingleCatQuery } from "../features/api/authApi/apiSlice";
import MarketCard from "../components/Card/MarketCard";
import {
  selectCurrentUser,
  selectCurrentWallet,
} from "../features/auth/authSlice";
import BuyModal from "../components/BuyModal";
import { BiImageAdd } from "react-icons/bi";
import CustomIconButton from "../components/Button/CustomIconButton";
import { RiEditBoxLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import useHttp from "../hooks/useHttp";
import useCustomToast from "../hooks/useToast";
import NoResult from "../components/NoResult";

const CategoryPage = () => {
  const { name } = useParams<{ name: string }>();
  const id = useSelector(selectCurrentUser);
  const wallet = useSelector(selectCurrentWallet);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const market = useSelector(selectMarket);
  const [listings, setListings] = useState<any>([]);
  const [temp, setTempListing] = useState<any>([]);
  const [shop, setShopInst] = useState<any>(null);
  const [stats, setStats] = useState<any>({});
  const [selected, setSelected] = useState<any>(null); //
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { showToast } = useCustomToast();

  const { data, isLoading } = useGetSingleCatQuery(name!);
  const cloudName = import.meta.env.VITE_CLOUD_NAME;

  const loadContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const shop = await new ethers.Contract(market.address, market.abi, signer);
    setShopInst(shop);
  };

  const getListing = async () => {
    const listing = await shop._getListings();

    setListings(listing);
    setTempListing(listing);
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
      floorPrice: lowest,
      total,
      totalPrice,
    };
  };

  useEffect(() => {
    if (listings.length > 0) {
      const data = calculateStats(name!);
      setStats(data);
    }
  }, [listings]);

  const searchHandler = (value: string) => {
    if (value.trim() === "") {
      // If search value is empty, use the reference listing
      setTempListing(listings);
    } else {
      // Perform search based on the provided value
      const filtered = listings.filter((item: any) => {
        return item._token._name.toLowerCase().includes(value.toLowerCase());
      });
      setTempListing(filtered);
    }
  };
  const sortHandler = (value: string) => {
    if (value === "highest") {
      const data = [...temp].sort((a: any, b: any) => {
        return b._price - a._price;
      });
      console.log(data);
      // Set tempListing with the sorted data
    }
    // // Update the state with sorted data
    // setTempListing([]); // Reset tempListing to an empty array
    // setTempListing(sortedData); // Set tempListing with the sorted data
    console.log();
  };

  const AddImage = async (file: FileList | null, flag: string) => {
    try {
      const formData = new FormData();
      formData.append("file", file![0]);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUD_UPLOAD_PRESET
      );
      const requestConfig = {
        url: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        method: "POST",
        body: formData,
      };
      const { sendRequest } = useHttp(requestConfig, (value: any) => {
        const uploadImage = async () => {};
        uploadImage();
      });
      sendRequest();
    } catch (err) {
      showToast("Server Error", "error", 2000);
    }
  };

  const checkIfExists = (wallet: string | null, marketItems: any) => {
    let flag = false;
    marketItems.forEach((item: any) => {
      if (item._token._owner.toLowerCase() !== wallet?.toLowerCase()) {
        flag = true;
      }
    });
    return flag;
  };

  if (isLoading) return;
  return (
    <Flex
      px={"10"}
      py={"5"}
      direction={"column"}
      as={motion.div}
      variants={bottomVariants}
      initial={"hidden"}
      animate={"visible"}
    >
      <BuyModal
        isOpen={isOpen}
        onClose={onClose}
        selected={selected}
        shop={shop}
      />
      <Flex
        direction={"column"}
        w={"full"}
        height={"320px"}
        as={motion.div}
        variants={bottomVariants}
        initial={"hidden"}
        animate={"visible"}
      >
        <Flex
          position={"relative"}
          w={"full"}
          mb={"12"}
          shadow={"md"}
          rounded={"sm"}
        >
          <Flex
            height={"250px"}
            bg={"fontGhost"}
            w={"full"}
            rounded={"md"}
            justifyContent={"end"}
            alignItems={"end"}
            bgImage={
              data.category.category.banner
                ? `url(${data.category.category.banner})`
                : ""
            }
            bgPos={"center"}
            bgSize={"cover"}
            border={"1px solid"}
            borderColor={"gray.300"}
          ></Flex>

          <Flex
            left={"50"}
            top={"160"}
            position={"absolute"}
            width={"150px"}
            height={"150px"}
            bg={"gray.200"}
            bgPos={"center"}
            bgSize={"cover"}
            rounded={"full"}
            justifyContent={"center"}
            alignItems={"center"}
            bgImage={
              data.category.category.avatar
                ? `url(${data.category.category.avatar})`
                : ""
            }
          ></Flex>
        </Flex>
      </Flex>

      <Flex
        height={"150px"}
        boxShadow={"md"}
        marginTop={"20px"}
        justifyContent={"space-between"}
        alignItems={"center"}
        px={"40px"}
        py={"10px"}
      >
        <Flex w={"50%"} alignItems={"center"} gap={5}>
          <Flex fontSize={"2xl"} fontWeight={"600"} ml={"30px"}>
            {data ? data.category.category.name : ""}
          </Flex>
          {/* {data.category.category.userId === id && (
            <CustomIconButton
              aria="Edit"
              icon={
                !isEdit ? (
                  <RiEditBoxLine size={"22px"} />
                ) : (
                  <AiOutlineClose size={"22px"} />
                )
              }
              type={"outline"}
              color={"gray.200"}
              onClick={() => {
                setIsEdit(!isEdit);
              }}
            />
          )} */}
        </Flex>
        <Flex w={"50%"} justifyContent={"end"} alignItems={"center"} gap={4}>
          <Flex
            height={"120px"}
            w={"120px"}
            boxShadow={"md"}
            rounded={"md"}
            border={"1px solid"}
            borderColor={"gray.200"}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"2xl"} fontWeight={"600"}>
              {stats.totalPrice ? stats.totalPrice : 0}
            </Text>
            <Text fontSize={"lg"} fontWeight={"600"}>
              Ethereum
            </Text>
          </Flex>
          <Flex
            height={"120px"}
            w={"120px"}
            boxShadow={"md"}
            rounded={"md"}
            border={"1px solid"}
            borderColor={"gray.200"}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"2xl"} fontWeight={"600"}>
              {stats.total ? stats.total : 0}
            </Text>
            <Text fontSize={"lg"} fontWeight={"600"}>
              Assets
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex height={"60px"} marginTop={"50px"} justifyContent={"end"} gap={4}>
        <Box w={"500px"}>
          <Input
            type="text"
            placeholder="Search Assets"
            height={"60px"}
            rounded={"sm"}
            fontSize={"18px"}
            onChange={(e) => {
              searchHandler(e.target.value);
            }}
            border={"1px solid"}
            borderColor={"gray.300"}
          />
        </Box>
      </Flex>
      <Flex
        width={"full"}
        my={"14"}
        wrap={"wrap"}
        gap={10}
        h={"400px"}
        justifyContent={"center"}
      >
        {!checkIfExists(wallet, temp) && <NoResult />}
        {temp.map((item: any) => {
          if (item._token._owner.toLowerCase() !== wallet?.toLowerCase()) {
            if (item._token._category.toLowerCase() === name?.toLowerCase()) {
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
          }
        })}
      </Flex>
    </Flex>
  );
};

export default CategoryPage;
