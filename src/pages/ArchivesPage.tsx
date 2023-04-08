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
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  InputGroup,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  Select,
  Button,
  InputRightAddon,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { VscSettings, VscAdd } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import Circular from "../components/Abstracts/Circular";
import CustomBadge from "../components/Badge/CustomBadge";
import CustomIconButton from "../components/Button/CustomIconButton";
import NormalButton from "../components/Button/NormalButton";
import CollectionCard from "../components/Card/CollectionCard";
import {
  useAddCategoryMutation,
  useUserMutation,
} from "../features/api/authApi/apiSlice";
import {
  selectCurrentWallet,
  selectUserData,
  setUserData,
} from "../features/auth/authSlice";
import { selectToken } from "../features/market/marketSlice";
import NoConnection from "../components/NoConnection";
import { BiImageAdd } from "react-icons/bi";

const ArchivesPage = () => {
  const currentUser = useSelector(selectUserData);
  const contract = useSelector(selectToken);
  const wallet = useSelector(selectCurrentWallet);

  const [addCategory] = useAddCategoryMutation();
  const [user] = useUserMutation();

  const [coverImage, setCoverImage] = useState<string>("");
  const [listings, setListings] = useState<any>([]);
  const [archives, setArchives] = useState<any>(null);
  const [token, setToken] = useState<any>();
  const [flag, setFlag] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const loadListing = async () => {
    if (wallet) {
      const address = wallet.toUpperCase();
      const data = currentUser.wallet;
      const filtered = data.filter(
        (wallet: {
          name: string;
          wallet: string;
          balance: number;
          _id: string;
        }) => wallet.wallet.toUpperCase() === address
      );

      setArchives(filtered.length > 0 ? filtered : null);
      const listing = await token._getTokens(wallet);
      const reversed = [...listing].reverse();
      setListings(reversed);
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

  const createCategory = async (name: string) => {
    const payload = {
      name,
      wallet: wallet as string,
      banner: coverImage,
      id: currentUser._id as string,
    };
    const data = await addCategory(payload).unwrap();
    const newData = await user(currentUser._id).unwrap();
    dispatch(setUserData({ user: newData.user }));
    onClose();
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
            {!archives && (
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
              })}
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
      {/* <Modal onClose={onClose} isOpen={isOpen} size={"lg"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Category </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              h={"200px"}
              bg={"fontGhost"}
              rounded={"md"}
              justifyContent={"end"}
              alignItems={"end"}
              p={"5"}
            >
              <NormalButton
                fontSize="15px"
                text="Edit Cover"
                type="filled"
                bg="buttonPrimary"
                py="16px"
              />
            </Flex>
          </ModalBody>
          <ModalFooter my={"2"}>
            <Flex
              as={"form"}
              w={"full"}
              alignItems={"end"}
              justifyContent={"space-between"}
              direction={"column"}
              gap={4}
              onSubmit={handleSubmit((data) => {
                createCategory(data.category);
              })}
            >
              <Flex w={"full"}>
                <Input
                  {...register("category", {
                    required: true,
                  })}
                  type={"text"}
                  h={10}
                  rounded={"sm"}
                  fontWeight={"500"}
                  placeholder={"Category Name"}
                />
              </Flex>

              <Flex>
                <NormalButton
                  text="Save"
                  fontSize="15px"
                  py="20px"
                  width="100px"
                />
                <NormalButton
                  text="Close"
                  fontSize="15px"
                  py="20px"
                  bg="red"
                  width="100px"
                />
              </Flex>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal> */}

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay overflow={"hidden"} />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Create Category</DrawerHeader>
          <DrawerBody
            display={"flex"}
            w={"full"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">Name</FormLabel>
                <Input
                  id="username"
                  placeholder="Enter Category "
                  rounded={"sm"}
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
                      onChange={(e) => {}}
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
                      onChange={(e) => {}}
                    />
                  </Flex>
                </Flex>
              </Flex>
              <Box>
                <FormLabel htmlFor="owner">Select Type</FormLabel>
                <Select id="owner" rounded={"sm"}>
                  <option value="" defaultChecked>
                    Select Options
                  </option>
                  <option value="ART">Image</option>
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
              _hover={{
                bg: "buttonHover",
              }}
            >
              Create
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ArchivesPage;
