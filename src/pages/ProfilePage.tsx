import {
  Avatar,
  Flex,
  Input,
  Text,
  Menu,
  MenuList,
  MenuButton,
  Button,
  HStack,
  Icon,
  IconButton,
  FormControl,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import Details from "../components/Showcase/Details";
import Profile from "../components/Showcase/Profile";
import { RiSendPlaneFill } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { RxTwitterLogo } from "react-icons/rx";

import {
  useUpdateMutation,
  useUserMutation,
  useFollowMutation,
  useMessagesMutation,
  useGetMessageUserMutation,
  useGetPostsMutation,
} from "../features/api/authApi/apiSlice";
import useHttp from "../hooks/useHttp";
import FeedTabs from "../components/Showcase/FeedTab";
import { useSelector, useDispatch } from "react-redux";
import { selectUserData, setUserData } from "../features/auth/authSlice";
import { RootState } from "../types/StoreType";
import { useParams, useNavigate } from "react-router-dom";
import useCustomToast from "../hooks/useToast";
import { io } from "socket.io-client";
import { GoKebabVertical } from "react-icons/go";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { FiInstagram } from "react-icons/fi";

import NormalButton from "../components/Button/NormalButton";
import { useForm } from "react-hook-form";
import CustomIconButton from "../components/Button/CustomIconButton";
import { VscRemove } from "react-icons/vsc";
const socket = io("http://localhost:3001/");

const ProfilePage = () => {
  const id = useSelector((state: RootState) => state.auth.user);
  const [follow] = useFollowMutation();
  const [getPosts] = useGetPostsMutation();
  const [feedsData, setFeedsData] = useState<any[]>([]);
  const [getMessages] = useMessagesMutation();
  const [getMessage] = useGetMessageUserMutation();

  const [isEditPage, setIsEditPage] = useState<boolean>(false);
  const [updateUser] = useUpdateMutation();
  const [message, setMessage] = useState<string>();
  const [profileData, setProfileData] = useState<any>();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [userMessage, setUserMessage] = useState<any[]>([]);
  const [tempMessage, setTempMessage] = useState<any[]>([]);
  const [messageId, setMessageId] = useState<{
    id: string;
    username: string;
  } | null>(null);
  const [user] = useUserMutation();
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const userData = useSelector(selectUserData);
  const flexRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { id: profileId } = useParams();

  const navigate = useNavigate();
  const { showToast } = useCustomToast();

  type FormValues = {
    email: string;
    username: string;
    twitter: string;
    instagram: string;
  };
  const { register, handleSubmit } = useForm<FormValues>();

  const fetchProfileData = async (userId: string) => {
    try {
      const data = await user(userId).unwrap();
      setProfileData(data.user);
    } catch (err) {
      showToast("Profile not found", "error", 2000);
      navigate("/profile");
    }
  };

  const generateRoom = (id1: string, id2: string) => {
    const room = [id1, id2].sort().join("");
    return room;
  };

  const fetchMessages = async () => {
    try {
      const messages = await getMessages({
        senderId: userData._id,
        receiverId: messageId!.id!,
      }).unwrap();
      setMessages(messages.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    socket.on(
      "new-message",
      (data: { message: string; senderId: string; receiverId: string }) => {
        setMessages((prev) => [...prev, data]);
      }
    );
    return () => {
      socket.off("new-message");
    };
  }, [messageId, id]);

  const sendMessages = async () => {
    const room = generateRoom(profileData._id, messageId!.id);
    socket.emit(
      "new-message",
      {
        message,
        senderId: profileData._id,
        receiverId: messageId!.id,
      },
      room
    );
    setMessage("");
  };

  useEffect(() => {
    flexRef.current?.scrollIntoView({ behavior: "smooth" });
    flexRef.current?.scrollTo(0, flexRef.current!.scrollHeight);
  }, [messages]);

  const fetchUserMessage = async () => {
    try {
      const data = await getMessage(userData._id).unwrap();
      setUserMessage(data.data);
      setTempMessage(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFeeds = async () => {
    try {
      const data = await getPosts().unwrap();
      setFeedsData([...data.data].reverse());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchFeeds();
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      fetchUserMessage();
    }
  }, [userData]);

  useEffect(() => {
    if (profileId) {
      try {
        fetchProfileData(profileId);
      } catch (err) {
        showToast("Profile not found", "error", 2000);
        fetchProfileData(id!);
        navigate("/profile");
      }
    } else {
      setProfileData(userData);
    }
  }, [profileId, id, userData, messageId]);

  useEffect(() => {
    if (messageId && userData) {
      fetchMessages();
    }
  }, [userData, messageId]);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setTempMessage(userMessage);
    } else {
      const filtered = userMessage.filter((user) =>
        user.name.toUpperCase().includes(value.toUpperCase())
      );
      setTempMessage(filtered);
    }
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
        const uploadImage = async () => {
          const response =
            flag === "Profile"
              ? await updateUser({
                  id: id!,
                  profileImage: value.secure_url,
                })
              : await updateUser({
                  id: id!,
                  coverImage: value.secure_url,
                });
          if (response) {
            showToast(`${flag} Updated`, "success", 2000);
            flag === "Profile"
              ? dispatch(
                  setUserData({
                    user: { ...userData, profileImage: value.secure_url },
                  })
                )
              : dispatch(
                  setUserData({
                    user: { ...userData, backgroundImage: value.secure_url },
                  })
                );
          }
        };
        uploadImage();
      });
      sendRequest();
    } catch (err) {
      showToast("Server Error", "error", 2000);
    }
  };

  const deleteImage = async (flag: string) => {
    try {
      const response =
        flag === "Profile"
          ? await updateUser({
              id: id!,
              profileImage: "",
            })
          : await updateUser({
              id: id!,
              coverImage: "",
            });
      if (response) {
        showToast(`${flag} Removed`, "success", 2000);
        flag === "Profile"
          ? dispatch(
              setUserData({
                user: { ...userData, profileImage: "" },
              })
            )
          : dispatch(
              setUserData({
                user: { ...userData, backgroundImage: "" },
              })
            );
      }
    } catch (err) {
      showToast("Server Error", "error", 2000);
    }
  };

  const updateHandler = async (data: FormValues) => {
    if (data.email === "" || data.username === "") {
      showToast("Email and Username are required", "error", 2000);
    } else {
      try {
        const response = await updateUser({
          id: id!,
          ...data,
        }).unwrap();
        dispatch(setUserData({ user: response.user }));
        setIsEditPage(false);
        showToast("Profile Updated", "success", 2000);
      } catch (err) {
        console.log(err);
        showToast("Server Error", "error", 2000);
      }
    }
  };

  const followHandler = async (profileId: string, indicator: string) => {
    try {
      if (indicator === "follow") {
        await follow({
          id,
          followId: profileId,
          status: "follow",
        }).unwrap();
        showToast("Started Following", "success", 2000);
      } else {
        await follow({
          id,
          followId: profileId,
          status: "unfollow",
        }).unwrap();

        showToast("Unfollowed", "info", 2000);
      }

      const updateData = await user(id!).unwrap();
      dispatch(setUserData({ user: updateData.user }));
    } catch (err) {
      showToast("Server Error", "error", 2000);
    }
  };

  return (
    <Flex direction={"column"} px={"10"}>
      <Profile
        addImage={AddImage}
        isEditPage={isEditPage}
        userData={profileData}
      />
      <Flex w={"full"} direction={"column"} position={"relative"}>
        <Details
          isEditPage={isEditPage}
          setEditPage={setIsEditPage}
          profileId={profileId}
          profileData={profileData}
          id={id!}
          followHandler={followHandler}
        />
        {!profileId && (
          <Flex w={"100%"} justifyContent={"start"}>
            <Flex w={"55%"} justifyContent={"center"}>
              {isEditPage ? (
                <Flex
                  as={"form"}
                  w={"full"}
                  border={"1px solid"}
                  borderColor={"gray.200"}
                  boxShadow={"sm"}
                  rounded={"md"}
                  direction={"column"}
                  gap={"7"}
                  py={"20px"}
                  px={"30px"}
                  onSubmit={handleSubmit((data) => updateHandler(data))}
                >
                  <HStack w={"full"} gap={2}>
                    <FormControl>
                      <InputGroup>
                        <InputLeftElement>
                          <IconButton
                            icon={<AiOutlineMail size={"22px"} />}
                            aria-label={"email"}
                          />
                        </InputLeftElement>
                        <Input
                          {...register("email")}
                          pl={"50px"}
                          type={"email"}
                          rounded={"sm"}
                          readOnly
                          defaultValue={profileData?.email}
                          focusBorderColor={"gray.100"}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <InputGroup>
                        <InputLeftElement>
                          <IconButton
                            icon={<FiUser size={"22px"} />}
                            aria-label={"username"}
                          />
                        </InputLeftElement>
                        <Input
                          {...register("username")}
                          pl={"50px"}
                          type={"text"}
                          rounded={"sm"}
                          defaultValue={profileData?.username}
                          focusBorderColor={"gray.100"}
                        />
                      </InputGroup>
                    </FormControl>
                  </HStack>
                  <HStack w={"full"} gap={2}>
                    <FormControl>
                      <InputGroup>
                        <InputLeftElement>
                          <IconButton
                            icon={<RxTwitterLogo size={"22px"} />}
                            aria-label={"twitter"}
                          />
                        </InputLeftElement>
                        <Input
                          {...register("twitter")}
                          pl={"50px"}
                          type={"text"}
                          rounded={"sm"}
                          focusBorderColor={"gray.100"}
                          defaultValue={profileData?.social.twitter}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <InputGroup>
                        <InputLeftElement>
                          <IconButton
                            border={"1px solid"}
                            borderColor={"gray.100"}
                            icon={<FiInstagram size={"22px"} />}
                            aria-label={"instagram"}
                          />
                        </InputLeftElement>
                        <Input
                          {...register("instagram")}
                          pl={"50px"}
                          type={"text"}
                          rounded={"sm"}
                          defaultValue={profileData?.social.instagram}
                          focusBorderColor={"gray.100"}
                        />
                      </InputGroup>
                    </FormControl>
                  </HStack>
                  <HStack w={"full"} justifyContent={"space-between"}>
                    <Flex alignItems={"center"} gap={6}>
                      <Flex alignItems={"center"} gap={3}>
                        <CustomIconButton
                          icon={<VscRemove />}
                          onClick={() => {
                            deleteImage("Profile");
                          }}
                          aria="remove profile"
                          type="outline"
                        />
                        Remove Profile
                      </Flex>
                      <Flex alignItems={"center"} gap={3}>
                        <CustomIconButton
                          icon={<VscRemove />}
                          onClick={() => {
                            deleteImage("Background");
                          }}
                          aria="remove banner"
                          type="outline"
                        />
                        Remove Banner
                      </Flex>
                    </Flex>
                    <NormalButton
                      text="Save Changes"
                      fontSize="18px"
                      type={"filled"}
                    />
                  </HStack>
                </Flex>
              ) : (
                <FeedTabs feedItems={feedsData} />
              )}
            </Flex>
          </Flex>
        )}
      </Flex>
      <Flex justifyContent={"end"} position={"sticky"} bottom={0}>
        <Flex
          bg={"background"}
          rounded={"md"}
          cursor={"pointer"}
          direction={"column"}
          transition={"all 0.1s ease"}
          w={"360px"}
          borderX={"1px solid"}
          borderTop={"1px solid"}
          borderColor={"gray.300"}
        >
          <Menu autoSelect={false}>
            <Flex
              as={MenuButton}
              h={"50px"}
              px={"5"}
              transition={"all 0.2s ease"}
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
            >
              <Text fontWeight={"600"} fontSize={"18px"}>
                Messages
              </Text>
            </Flex>
            <MenuList
              bg={"background"}
              display={"flex"}
              rounded={"md"}
              overflow={"hidden"}
              h={"328px"}
              transition={"all 0.1s ease"}
              w={"359px"}
              borderColor={"gray.300"}
              p={0}
              flexDirection={"column"}
              overflowY={!messageId ? "scroll" : "hidden"}
              sx={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {!messageId ? (
                <>
                  <Flex
                    zIndex={"2"}
                    position={"sticky"}
                    top={0}
                    px={"10px"}
                    bg={"background"}
                    h={"60px"}
                    borderBottom={"1px solid"}
                    borderColor={"gray.300"}
                    alignItems={"center"}
                    py={"8"}
                    marginBottom={"5px"}
                  >
                    <Input
                      type={"text"}
                      rounded={"md"}
                      bg={"white"}
                      placeholder={"Search"}
                      defaultValue={""}
                      onChange={(e) => searchHandler(e)}
                    />
                  </Flex>
                  {tempMessage.map((user: any) => (
                    <Flex
                      key={user.username}
                      px={"10px"}
                      bg={"background"}
                      h={"60px"}
                      alignItems={"center"}
                      py={"8"}
                      gap={"2"}
                      onClick={() => {
                        setMessageId({
                          id: user.id,
                          username: user.name,
                        });
                        const roomId = generateRoom(id!, user.id);
                        socket.emit("join", roomId);
                      }}
                      rounded={"md"}
                      marginX={"10px"}
                      marginY={"5px"}
                      border={"1px solid "}
                      borderColor={"gray.300"}
                    >
                      <Avatar size={"md"} src={user.profileImage} />
                      {user.name}
                    </Flex>
                  ))}
                </>
              ) : (
                <>
                  <Flex
                    zIndex={"2"}
                    position={"sticky"}
                    top={0}
                    px={"10px"}
                    bg={"background"}
                    h={"60px"}
                    borderBottom={"1px solid"}
                    borderColor={"gray.300"}
                    alignItems={"center"}
                    py={"8"}
                    justifyContent={"space-between"}
                  >
                    <IconButton
                      aria-label={"close"}
                      icon={<BiArrowBack size={"22px"} />}
                      onClick={() => {
                        setMessageId(null);
                        setMessages([]);
                        const roomId = generateRoom(id!, messageId?.id!);
                        socket.emit("leave", roomId);
                        setTempMessage(userMessage);
                      }}
                    />
                    <Text fontWeight={"600"} fontSize={"16px"}>
                      @{messageId?.username}
                    </Text>
                    <IconButton
                      aria-label={"close"}
                      icon={<GoKebabVertical size={"22px"} />}
                    />
                  </Flex>

                  <Flex
                    direction={"column"}
                    w={"full"}
                    h={"300px"}
                    overflowY={"scroll"}
                    boxShadow={"md"}
                    sx={{
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                    }}
                    ref={flexRef}
                  >
                    {messages?.map((message: any) => {
                      return (
                        <Flex
                          key={message._id}
                          w={"full"}
                          p={"2"}
                          justifyContent={
                            message.senderId === userData._id ? "end" : "start"
                          }
                          wrap={"wrap"}
                          transition={"all 0.4s ease"}
                        >
                          <Flex
                            justifyContent={"center"}
                            alignItems={"center"}
                            rounded={"md"}
                            p={"2"}
                            wrap={"wrap"}
                            bg={
                              message.senderId === userData._id
                                ? "buttonPrimary"
                                : "gray.300"
                            }
                            color={
                              message.senderId === userData._id
                                ? "white"
                                : "black"
                            }
                          >
                            {message.message}
                          </Flex>
                        </Flex>
                      );
                    })}
                  </Flex>

                  <Flex
                    zIndex={"2"}
                    position={"sticky"}
                    bottom={0}
                    px={"10px"}
                    bg={"background"}
                    h={"50px"}
                    alignItems={"center"}
                    py={"8"}
                    as={"form"}
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendMessages();
                    }}
                    borderTop={"1px solid"}
                    borderColor={"gray.300"}
                  >
                    <HStack w={"full"} spacing={2} p={0}>
                      <Input
                        type={"text"}
                        rounded={"md"}
                        bg={"white"}
                        w={"380px"}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                        }}
                      />
                      <Button bg={"buttonPrimary"} type="submit">
                        <Icon
                          as={RiSendPlaneFill}
                          color={"white"}
                          h={"20px"}
                          w={"20px"}
                        />
                      </Button>
                    </HStack>
                  </Flex>
                </>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProfilePage;
