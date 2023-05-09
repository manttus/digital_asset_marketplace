import {
  Box,
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
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { VscSettings, VscAdd } from "react-icons/vsc";
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
import CollectionCard from "../components/Card/CollectionCard";

const ArchivesPage = () => {
  const currentUser = useSelector(selectUserData);
  const contract = useSelector(selectToken);
  const market = useSelector(selectMarket);
  const wallet = useSelector(selectCurrentWallet);
  const [addCategory] = useAddCategoryMutation();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [user] = useUserMutation();
  const [avatarImage, setAvatar] = useState<string>("");
  const [bannerImage, setBanner] = useState<string>("");
  const [listings, setListings] = useState<any>([]);
  const [archives, setArchives] = useState<any>([]);
  const [token, setToken] = useState<any>();
  const [marketContract, setMarketContract] = useState<any>();
  const [flag, setFlag] = useState<boolean>(false);
  const cloudName = import.meta.env.VITE_CLOUD_NAME;

  type AddCategory = {
    name: string;
    avatar: FileList;
    banner: FileList;
    type: string;
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm<AddCategory>();
  const dispatch = useDispatch();

  const loadListing = async () => {
    if (wallet) {
      const listing = await marketContract._getListings();
      console.log(listing);
      // setArchives(currentUser.category);
      // const listing = await token._getTokens(wallet);
      // if (listing.length === 0) return;
      // const reversed = [...listing].reverse();
      // setListings(reversed);
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
    const initialListing = await marketContract._getListings();
    console.log(initialListing);
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
      name,
      avatar: avatarUrl,
      banner: bannerUrl,
      type,
    };
    try {
      const response = await addCategory(data).unwrap();
      if (response.message === "Success") {
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
    }
  };

  return (
    <>
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
                <CustomIconButton
                  aria="filter"
                  color="gray.200"
                  icon={<VscSettings size={"25px"} />}
                  type={"outline"}
                  onClick={() => {}}
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
            {/* {archives.length === 0 && (
              <Text fontSize={"30px"} fontWeight={"600"} color={"buttonHover"}>
                No Archives
              </Text>
            )}
            {archives &&
              archives.map((archive: any) => {
                return (
                  <CollectionCard
                    key={archive._id}
                    listings={listings}
                    archive={archive}
                  />
                );
              })} */}
            <Flex w={"full"} justifyContent={"space-between"} zIndex={"10"}>
              <Flex w={"30%"} direction={"column"} bg={"background"} gap={4}>
                <Flex>
                  <Input
                    type="text"
                    placeholder="Search"
                    height={"50px"}
                    rounded={"sm"}
                    fontSize={"20px"}
                    _placeholder={{ fontSize: "20px" }}
                  />
                </Flex>
                <Accordion
                  allowToggle
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <AccordionItem>
                    <h2>
                      <AccordionButton height={"60px"}>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontSize={"20px"}
                        >
                          Categories
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Input
                        type="text"
                        placeholder="Category Name"
                        height={"50px"}
                        rounded={"sm"}
                        fontSize={"20px"}
                        _placeholder={{ fontSize: "22px" }}
                      />
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton height={"60px"}>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontSize={"20px"}
                        >
                          Types
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Flex direction={"column"} gap={"2"}>
                        <Checkbox borderColor={"gray.400"}>
                          <Text fontSize={"22px"}>Image</Text>
                        </Checkbox>
                        <Checkbox borderColor={"gray.400"}>
                          <Text fontSize={"22px"}>GIFs</Text>
                        </Checkbox>
                        <Checkbox borderColor={"gray.400"}>
                          <Text fontSize={"22px"}>Video</Text>
                        </Checkbox>
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <h2>
                      <AccordionButton height={"60px"}>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontSize={"20px"}
                        >
                          Price Range
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Slider aria-label="slider-ex-1" defaultValue={30}>
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Flex>
              <Flex w={"80%"} height={"500px"}>
                {/* {archives &&
                  archives.map((archive: any) => {
                    return (
                      <CollectionCard
                        key={archive._id}
                        listings={listings}
                        archive={archive}
                      />
                    );
                  })} */}
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
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay overflow={"hidden"} />
        <DrawerContent>
          <Flex
            direction={"column"}
            w={"full"}
            as={"form"}
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
              h={"50px"}
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
              <Stack spacing="24px">
                <Box>
                  <Input
                    id="username"
                    {...register("name", {
                      required: true,
                    })}
                    placeholder="Enter Category Name"
                  />
                </Box>

                <Flex direction={"column"} alignItems={"center"}>
                  <FormLabel htmlFor="owner">Upload Avatar</FormLabel>
                  <Flex
                    left={"50"}
                    top={"160"}
                    width={"150px"}
                    height={"150px"}
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
                    height={"100px"}
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
                <Box>
                  <Select
                    id="owner"
                    {...register("type", {
                      required: true,
                    })}
                    defaultValue={"Select Category Type"}
                  >
                    <option value="IMAGE">Image</option>
                    <option value="VIDEO">Video</option>
                    <option value="GIFS">GIF</option>
                    <option value="ALL CATEGORIES"> All Category </option>
                  </Select>
                </Box>
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
    </>
  );
};

export default ArchivesPage;
