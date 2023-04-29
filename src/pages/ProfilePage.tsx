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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Details from "../components/Showcase/Details";
import Profile from "../components/Showcase/Profile";
import { RiSendPlaneFill } from "react-icons/ri";

import {
  useUpdateMutation,
  useUserMutation,
  useFollowMutation,
} from "../features/api/authApi/apiSlice";
import useHttp from "../hooks/useHttp";
import FeedTabs from "../components/Showcase/FeedTab";
import { useSelector, useDispatch } from "react-redux";
import { selectUserData, setUserData } from "../features/auth/authSlice";
import { RootState } from "../types/StoreType";
import { useParams, useNavigate } from "react-router-dom";
import useCustomToast from "../hooks/useToast";
import { io } from "socket.io-client";

const ProfilePage = () => {
  const socket = io("http://localhost:3001");
  const id = useSelector((state: RootState) => state.auth.user);
  const [follow] = useFollowMutation();
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

  useEffect(() => {
    socket.on("message", (data) => {
      // Add the new message to your UI
      setMessages((messages) => [...messages, data]);
    });
  }, []);

  const sendMessages = async () => {
    socket.emit("message", {
      message,
      senderId: id,
      receiverId: messageId!.id,
    });
    setMessage("");
  };

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
  }, [profileId, id, userData]);

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
        const response = await follow({
          id,
          followId: profileId,
          status: "follow",
        }).unwrap();
        showToast("Started Following", "success", 2000);
      } else {
        const response = await follow({
          id,
          followId: profileId,
          status: "unfollow",
        }).unwrap();

        showToast("Unfollowed", "info", 2000);
      }

      const updateData = await user(id!).unwrap();
      dispatch(setUserData({ user: updateData.user }));
    } catch (err) {
      console.log(err);
    }
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
                  >
                    <Input type={"text"} rounded={"sm"} bg={"white"} />
                  </Flex>
                  {userData?.following?.map((user: any) => (
                    <Flex
                      key={user.username}
                      px={"10px"}
                      bg={"background"}
                      h={"60px"}
                      borderBottom={"1px solid"}
                      borderColor={"gray.300"}
                      alignItems={"center"}
                      py={"8"}
                      gap={"2"}
                      onClick={() => {
                        setMessageId({
                          id: user._id,
                          username: user.username,
                        });
                      }}
                    >
                      <Avatar size={"sm"} />
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
                    <Button
                      onClick={() => {
                        setMessageId(null);
                      }}
                      fontSize={"12px"}
                    >
                      Go Back
                    </Button>
                    <Text fontWeight={"600"} fontSize={"16px"}>
                      {messageId?.username}
                    </Text>
                  </Flex>
                  <Flex height={"400px"} w={"full"} p={"2"}>
                    <Flex
                      direction={"column"}
                      w={"full"}
                      height={"400px"}
                      background={"white"}
                      overflowY={"scroll"}
                      border={"1px solid"}
                      borderColor={"gray.300"}
                      sx={{
                        "&::-webkit-scrollbar": {
                          display: "none",
                        },
                      }}
                      boxShadow={"md"}
                    >
                      {messages?.map((message: any) => (
                        <Flex
                          key={message._id}
                          w={"full"}
                          direction={"column"}
                          p={"2"}
                        >
                          {message.message}
                        </Flex>
                      ))}
                    </Flex>
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
                      <Button bg={"buttonPrimary"}>
                        <Icon
                          as={RiSendPlaneFill}
                          color={"white"}
                          size={"22px"}
                          type="submit"
                          onClick={() => {
                            console.log("send");
                            sendMessages();
                          }}
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
