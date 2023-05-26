import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Grid,
  Input,
  Stack,
  Text,
  useDisclosure,
  Select,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  IconButton,
  InputGroup,
  InputLeftElement,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { VscAdd } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import Circular from "../components/Abstract/Circular";
import CustomBadge from "../components/Badge/CustomBadge";
import CustomIconButton from "../components/Button/CustomIconButton";

import {
  useAddCategoryMutation,
  useUserMutation,
} from "../features/api/authApi/apiSlice";
import {
  selectCurrentWallet,
  selectUserData,
  setUserData,
} from "../features/auth/authSlice";
import { selectMarket, selectToken } from "../features/market/marketSlice";
import NoConnection from "../components/NoConnection";
import { BiImageAdd } from "react-icons/bi";

import ArchiveCard from "../components/Card/ArchiveCard";
import { bottomVariants } from "../theme/animation/variants";
import { motion } from "framer-motion";
import NormalButton from "../components/Button/NormalButton";
import useCustomToast from "../hooks/useToast";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import NoResult from "../components/NoResult";

const ArchivesPage = () => {
  const currentUser = useSelector(selectUserData);
  const userData = useSelector(selectUserData);
  const contract = useSelector(selectToken);
  const market = useSelector(selectMarket);
  const wallet = useSelector(selectCurrentWallet);
  const [addCategory] = useAddCategoryMutation();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [user] = useUserMutation();
  const [avatarImage, setAvatar] = useState<string>("");
  const [bannerImage, setBanner] = useState<string>("");
  const [listings, setListings] = useState<any>([]);
  const [token, setToken] = useState<any>();
  const [tempListing, setTempListing] = useState<any>([]);
  const [marketContract, setMarketContract] = useState<any>();
  const [flag, setFlag] = useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<any>();
  const [ethCounter, setEthCounter] = useState<number>(0);
  const cloudName = import.meta.env.VITE_CLOUD_NAME;

  type AddCategory = {
    name: string;
    avatar: FileList;
    banner: FileList;
    type: string;
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isListOpen,
    onOpen: onListOpen,
    onClose: onListClose,
  } = useDisclosure();
  const { register, handleSubmit } = useForm<AddCategory>();
  const dispatch = useDispatch();
  const { showToast } = useCustomToast();

  const loadListing = async () => {
    if (wallet) {
      const listing = await marketContract._getMyListings(wallet);
      if (listing.length === 0) return;
      const reversed = [...listing].reverse();
      setListings(reversed);
      setTempListing(reversed);
    }
  };

  const loadContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tokenContract = await new ethers.Contract(
      contract.address,
      contract.abi,
      signer
    );
    const marketContract = await new ethers.Contract(
      market.address,
      market.abi,
      signer
    );
    setMarketContract(marketContract);
    setToken(tokenContract);
  };

  useEffect(() => {
    if (contract) {
      setFlag(true);
    }
  }, [contract]);

  useEffect(() => {
    if (flag) {
      loadContract();
    }
  }, [flag]);

  useEffect(() => {
    if (currentUser && token) {
      loadListing();
    }
  }, [token, currentUser]);

  const AddImage = async (file: FileList | null): Promise<string> => {
    setisLoading(true);
    const formData = new FormData();
    formData.append("file", file![0]);
    formData.append("upload_preset", import.meta.env.VITE_CLOUD_UPLOAD_PRESET);
    const requestConfig = {
      url: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      method: "POST",
      body: formData,
    };

    const response = await fetch(requestConfig.url, {
      method: requestConfig.method,
      body: requestConfig.body,
    });

    if (response.ok) {
      const data = await response.json();
      return data.secure_url;
    } else {
      return "";
    }
  };

  const listingHandler = async (indi: boolean | null) => {
    if (indi === null) return;
    const id = parseInt(selectedAsset._id._hex);
    if (ethCounter === 0 && !indi)
      return showToast("Invalid Price", "error", 2000);
    if (indi) {
      marketContract._cancelListing(id, wallet).then(() => {
        showToast("Market Listing Cancelled", "success", 2000);
        onListClose();
        loadListing();
      });
    } else {
      const priceinWei = ethers.utils.parseEther(ethCounter.toString());
      marketContract
        ._createListing(id, priceinWei, wallet)
        .then((tx: any) => {
          // Wait for the transaction to be mined
          return tx.wait(1);
        })
        .then(() => {
          showToast("Market Listing Created", "success", 2000);
          onListClose();
          // Fetch the listing again from the contract
          return loadListing();
        })
        .then(() => {
          // Listing fetched successfully
          // Do any additional processing or rendering here
        })
        .catch((err: Error | unknown) => {
          showToast("Failed to List", "error", 2000);
        });
    }
  };

  const createCategory = async ({
    name,
    avatar,
    banner,
    type,
  }: {
    name: string;
    avatar: FileList;
    banner: FileList;
    type: string;
  }) => {
    const avatarUrl = await AddImage(avatar);
    const bannerUrl = await AddImage(banner);
    const data = {
      id: currentUser!._id,
      name: name.trim(),
      avatar: avatarUrl,
      banner: bannerUrl,
      type,
    };
    try {
      const response = await addCategory(data).unwrap();
      if (response.message === "Success") {
        showToast("Category Created", "success", 2000);
        setisLoading(false);
        onClose();
        const userData = await user(currentUser!._id).unwrap();
        if (userData) {
          dispatch(
            setUserData({
              user: userData.user,
            })
          );
        }
      }
    } catch (err) {
      console.log(err);
      setisLoading(false);
      showToast("Failed to Create Category", "error", 2000);
    }
  };

  const searchHandler = (text: string) => {
    // Filter the data based on the search criteria
    const filtered = listings.filter((item: any) => {
      console.log(item);
      if (item._token[5].toLowerCase().includes(text.toLowerCase())) {
        return true;
      }
    });
    setTempListing(filtered);
  };

  const sortHandler = (type: string) => {
    if (type === "listed") {
      const filtered = listings.filter((item: any) => {
        if (item._active) {
          return true;
        }
      });
      setTempListing(filtered);
    }
    if (type === "unlisted") {
      const filtered = listings.filter((item: any) => {
        if (!item._active) {
          return true;
        }
      });
      setTempListing(filtered);
    }
    if (type === "all") {
      setTempListing(listings);
    }
  };

  return (
    <Flex
      as={motion.div}
      variants={bottomVariants}
      initial={"hidden"}
      animate={"visible"}
    >
      <Grid
        height={"full"}
        width={"full"}
        gridTemplateColumns={"20% 2fr"}
        gridTemplateRows={"200px  1fr"}
        rowGap={"50px"}
        p={"30px"}
        position={"relative"}
        zIndex={2}
      >
        <Flex
          px={"80px"}
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
              Archives
            </Text>
            <Flex>
              <CustomBadge text="stash" color="orangeDark" bg="orangeLight" />
            </Flex>
          </Flex>

          <Flex gap={4} height={"full"} alignItems={"end"} pb={"40px"}>
            {wallet && (
              <>
                <CustomIconButton
                  aria="add"
                  color="gray.200"
                  icon={<VscAdd size={"25px"} />}
                  type={"outline"}
                  onClick={() => {
                    onOpen();
                  }}
                />
              </>
            )}
          </Flex>
        </Flex>

        {wallet ? (
          <Flex
            width={"full"}
            wrap={"wrap"}
            alignItems={"center"}
            gridColumn={"span 2"}
            position={"relative"}
            zIndex={3}
            gap={10}
            px={"50px"}
            justifyContent={"center"}
          >
            <Flex
              w={"full"}
              direction={"column"}
              justifyContent={"space-between"}
              zIndex={"10"}
              gap={8}
            >
              <Flex w={"100%"} justifyContent={"space-between"}>
                <Box w={"50%"}>
                  <Input
                    type="text"
                    height={"60px"}
                    zIndex={"99999"}
                    placeholder="Search Assets"
                    fontSize={"20px"}
                    bg={"white"}
                    onChange={(e) => {
                      searchHandler(e.target.value);
                    }}
                  />
                </Box>
                <Box w={"20%"}>
                  <Select
                    height={"60px"}
                    bg={"white"}
                    onChange={(e) => {
                      sortHandler(e.target.value);
                    }}
                    fontSize={"20px"}
                  >
                    <option value="all">All</option>
                    <option value="listed">Listed</option>
                    <option value="unlisted">UnListed</option>
                  </Select>
                </Box>
              </Flex>
              <Flex w={"full"} wrap={"wrap"} gap={8} as={motion.div}>
                {tempListing.length === 0 && (
                  <Flex
                    fontSize={"30px"}
                    w={"full"}
                    fontWeight={"600"}
                    color={"buttonHover"}
                    height={"300px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <NoResult />
                  </Flex>
                )}
                {tempListing &&
                  tempListing.map((archive: any) => {
                    return (
                      <ArchiveCard
                        key={archive._id}
                        image={archive._token[2]}
                        name={archive._token[5]}
                        _id={archive._id}
                        description={""}
                        price={ethers.utils.formatEther(archive._price)}
                        onClick={() => {
                          setSelectedAsset(archive);
                          onListOpen();
                        }}
                      />
                    );
                  })}
              </Flex>
            </Flex>
          </Flex>
        ) : (
          <Flex
            width={"full"}
            wrap={"wrap"}
            alignItems={"center"}
            gridColumn={"span 2"}
            position={"relative"}
            zIndex={3}
            gap={10}
            px={"50px"}
            justifyContent={"center"}
            py={"100px"}
          >
            <NoConnection />
          </Flex>
        )}
      </Grid>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay overflow={"hidden"} />
        <DrawerContent>
          <Flex
            direction={"column"}
            w={"full"}
            as={"form"}
            height={"full"}
            onSubmit={handleSubmit((value) => {
              createCategory({
                name: value.name,
                avatar: value.avatar,
                banner: value.banner,
                type: value.type,
              });
            })}
          >
            <DrawerCloseButton />
            <DrawerHeader
              borderBottomWidth="1px"
              fontSize={"18px"}
              display={"flex"}
              alignItems={"center"}
            >
              Create Category
            </DrawerHeader>
            <DrawerBody
              display={"flex"}
              w={"full"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Stack
                spacing="24px"
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Box>
                  <Input
                    id="username"
                    {...register("name", {
                      required: true,
                    })}
                    placeholder="Enter Category Name"
                    rounded={"sm"}
                    height={"50px"}
                    fontSize={"18px"}
                  />
                </Box>

                <Flex direction={"column"} alignItems={"center"}>
                  <FormLabel htmlFor="owner">Upload Avatar</FormLabel>
                  <Flex
                    left={"50"}
                    top={"160"}
                    width={"200px"}
                    height={"200px"}
                    bg={"gray.200"}
                    rounded={"full"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    cursor={"pointer"}
                    bgImage={avatarImage ? `url(${avatarImage})` : ""}
                    bgPos={"center"}
                    bgSize={"cover"}
                  >
                    <Flex
                      position={"relative"}
                      width={"full"}
                      height={"full"}
                      bg={"rgba(0,0,0,0.2)"}
                      rounded={"full"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      transition={"all 0.3s ease-in-out"}
                      opacity={"0"}
                      _hover={{
                        opacity: "1",
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      <BiImageAdd size={"28px"} />
                      <Input
                        type={"file"}
                        position={"absolute"}
                        height={"100%"}
                        width={"100%"}
                        opacity={"0"}
                        {...register("avatar", {
                          required: true,
                        })}
                        onChange={(e) => {
                          const file = e.target.files![0];
                          const fullPath = URL.createObjectURL(file);
                          setAvatar(fullPath);
                        }}
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex direction={"column"} alignItems={"center"} w={"full"}>
                  <FormLabel htmlFor="owner">Upload Banner</FormLabel>
                  <Flex
                    height={"150px"}
                    bg={"gray.200"}
                    rounded={"10px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    cursor={"pointer"}
                    w={"full"}
                    bgImage={bannerImage ? `url(${bannerImage})` : ""}
                    bgPos={"center"}
                    bgSize={"cover"}
                  >
                    <Flex
                      h={"100%"}
                      w={"full"}
                      position={"relative"}
                      bg={"rgba(0,0,0,0.2)"}
                      rounded={"10px"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      transition={"all 0.3s ease-in-out"}
                      opacity={"0"}
                      _hover={{
                        opacity: "1",
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      <BiImageAdd size={"28px"} />
                      <Input
                        type={"file"}
                        position={"absolute"}
                        height={"100%"}
                        width={"100%"}
                        opacity={"0"}
                        {...register("banner", {
                          required: true,
                        })}
                        onChange={(e) => {
                          const file = e.target.files![0];
                          const fullPath = URL.createObjectURL(file);
                          setBanner(fullPath);
                        }}
                      />
                    </Flex>
                  </Flex>
                </Flex>
              </Stack>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                bg="buttonPrimary"
                color={"white"}
                type="submit"
                _hover={{
                  bg: "buttonHover",
                }}
                isLoading={isLoading}
              >
                Create
              </Button>
            </DrawerFooter>
          </Flex>
        </DrawerContent>
      </Drawer>
      <Modal
        isOpen={isListOpen}
        onClose={onListClose}
        size={"4xl"}
        isCentered
        onCloseComplete={() => {
          setSelectedAsset(null);
          setEthCounter(0);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            p={5}
          >
            <Flex
              border={"1px solid"}
              rounded={"md"}
              borderColor={"gray.200"}
              bgImage={selectedAsset ? `url(${selectedAsset._token[2]})` : ""}
              w={"500px"}
              height={"500px"}
              bgSize={"cover"}
              bgPos={"center"}
            ></Flex>

            <Flex
              direction={"column"}
              justifyContent={"space-between"}
              height={"500px"}
              alignItems={"center"}
              w={"40%"}
              pt={10}
            >
              <Flex
                fontSize={"28px"}
                fontWeight={"bold"}
                borderBottom={"1px solid"}
                borderColor={"gray.400"}
                cursor={"pointer"}
                gap={4}
              >
                {selectedAsset ? selectedAsset._token[5] : ""}
                <CustomBadge
                  bg="red.100"
                  color="red.400"
                  text={selectedAsset ? selectedAsset._id._hex : "0x00"}
                />
              </Flex>
              <Flex w={"150px"}>
                <InputGroup display={"flex"} justifyContent={"center"}>
                  <Input
                    variant={"flushed"}
                    type={"number"}
                    py={7}
                    value={ethCounter}
                    display={"flex"}
                    fontSize={"20px"}
                    fontWeight={"bold"}
                    justifyContent={"center"}
                    defaultChecked={false}
                    onChange={(e) => {
                      if (parseInt(e.target.value) >= 100000) {
                        showToast("Limit Reached", "error", 2000);
                      } else {
                        setEthCounter(parseInt(e.target.value));
                      }
                    }}
                  />
                  <InputRightElement
                    children={"ETH"}
                    bg={"gray.200"}
                    color={"fontBlack"}
                    fontSize={"18px"}
                    fontWeight={"500"}
                    border={"none"}
                    w={"60px"}
                  />
                </InputGroup>
              </Flex>
              <Flex gap={2} alignItems={"center"}>
                <IconButton
                  rounded={"full"}
                  icon={<AddIcon />}
                  aria-label="plus"
                  size={"lg"}
                  w={"100px"}
                  bg={"buttonPrimary"}
                  _hover={{
                    bg: "buttonPrimary",
                    transform: "scale(1.03)",
                  }}
                  border={"1px solid"}
                  borderColor={"gray.200"}
                  color={"white"}
                  onClick={() => {
                    if (ethCounter <= 100000) {
                      setEthCounter(ethCounter + 1);
                    }
                  }}
                />

                <IconButton
                  rounded={"full"}
                  icon={<MinusIcon />}
                  variant={"outline"}
                  aria-label="minus"
                  size={"lg"}
                  w={"100px"}
                  _hover={{
                    bg: "buttonPrimary",
                    transform: "scale(1.03)",
                  }}
                  bg={"buttonPrimary"}
                  border={"1px solid"}
                  color={"white"}
                  borderColor={"gray.200"}
                  onClick={() => {
                    if (ethCounter > 0) {
                      setEthCounter(ethCounter - 1);
                    }
                  }}
                />
              </Flex>

              <Flex direction={"column"} gap={5}>
                <Flex
                  gap={"1"}
                  borderBottom={"1px solid"}
                  borderColor={"gray.200"}
                  pb={4}
                >
                  {fixedPrices.map((item) => {
                    return (
                      <Box
                        key={item}
                        display={"flex"}
                        px={"9"}
                        transition={"all 0.3s ease-in-out"}
                        py={2}
                        _hover={{
                          bg: "gray.100",
                          transform: "scale(1.05)",
                          transition: "all 0.3s ease-in-out",
                        }}
                        rounded={"full"}
                        w={"40px"}
                        border={"1px solid"}
                        borderColor={"gray.300"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        cursor={"pointer"}
                        onClick={() => {
                          setEthCounter(item);
                        }}
                      >
                        <Text fontSize={"18px"} fontWeight={"500"}>
                          {item}
                        </Text>
                      </Box>
                    );
                  })}
                </Flex>

                <NormalButton
                  type="filled"
                  width="330px"
                  text={
                    selectedAsset && !selectedAsset._active
                      ? "Add to Market"
                      : "Remove from Market"
                  }
                  onClick={() => {
                    console.log(selectedAsset ? selectedAsset._active : null);
                    listingHandler(
                      selectedAsset ? selectedAsset._active : null
                    );
                  }}
                />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

const fixedPrices = [5, 10, 20, 50];

export default ArchivesPage;
