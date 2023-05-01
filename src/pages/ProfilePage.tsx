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
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import Details from "../components/Showcase/Details";
import Profile from "../components/Showcase/Profile";
import { RiSendPlaneFill } from "react-icons/ri";

import {
  useUpdateMutation,
  useUserMutation,
  useFollowMutation,
  useMessagesMutation,
} from "../features/api/authApi/apiSlice";
import useHttp from "../hooks/useHttp";
import FeedTabs from "../components/Showcase/FeedTab";
import { useSelector, useDispatch } from "react-redux";
import { selectUserData, setUserData } from "../features/auth/authSlice";
import { RootState } from "../types/StoreType";
import { useParams, useNavigate } from "react-router-dom";
import useCustomToast from "../hooks/useToast";
import { io, Socket } from "socket.io-client";
import { GoKebabVertical } from "react-icons/go";
import { BiArrowBack } from "react-icons/bi";

const socket = io("http://localhost:3001/");

const ProfilePage = () => {
  const id = useSelector((state: RootState) => state.auth.user);
  const [follow] = useFollowMutation();
  const [getMessages] = useMessagesMutation();
  const [isEditPage, setIsEditPage] = useState<boolean>(false);
  const [updateUser] = useUpdateMutation();
  const [message, setMessage] = useState<string>();
  const [profileData, setProfileData] = useState<any>();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[]>([]);
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
        console.log(data);
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
    // setMessages((prev) => [
    //   ...prev,
    //   { message, senderId: profileData._id, receiverId: messageId!.id },
    // ]);
    setMessage("");
  };

  useEffect(() => {
    flexRef.current?.scrollIntoView({ behavior: "smooth" });
    flexRef.current?.scrollTo(0, flexRef.current!.scrollHeight);
  }, [messages]);

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

  const AddImage = async (file: FileList | null, flag: string) => {
    const formData = new FormData();
    formData.append("file", file![0]);
    formData.append("upload_preset", import.meta.env.VITE_CLOUD_UPLOAD_PRESET);
    const requestConfig = {
      url: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      method: "POST",
      body: formData,
    };
    const { sendRequest } = useHttp(requestConfig, (value: any) => {
      const uploadImage = async () => {
        const response =
          flag === "profile"
            ? await updateUser({
                id: id!,
                profileImage: value.secure_url,
              })
            : await updateUser({
                id: id!,
                coverImage: value.secure_url,
              });
        if (response) {
          flag === "profile"
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
    } catch (err) {}
  };

  return (
    <Flex direction={"column"} px={"10"}>
      <Profile addImage={AddImage} isEditPage={isEditPage} />
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
          <Flex w={"100%"} justifyContent={"space-between"}>
            <Flex w={"60%"} justifyContent={"center"}>
              <FeedTabs />
            </Flex>
            <Flex
              w={"25%"}
              h={"400px"}
              direction={"column"}
              justifyContent={"end"}
            >
              {/* <Flex height={"300px"} w={"full"} boxShadow={"sm"}></Flex> */}
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
              <Text fontWeight={"600"} fontSize={"16px"}>
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
                    />
                  </Flex>
                  {userData?.following?.map((user: any) => (
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
                          id: user._id,
                          username: user.username,
                        });
                        const roomId = generateRoom(id!, user._id);
                        socket.emit("join", roomId);
                      }}
                      rounded={"md"}
                      marginX={"10px"}
                      marginY={"5px"}
                      border={"1px solid "}
                      borderColor={"gray.300"}
                    >
                      <Avatar size={"md"} src={user?.profileImage} />
                      {user.username}
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
