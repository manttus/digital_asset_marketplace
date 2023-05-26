import {
  Flex,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import FeedCard from "../Card/FeedCard";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData, setUserData } from "../../features/auth/authSlice";
import { usePostLikeMutation } from "../../features/api/authApi/apiSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";
import useCustomToast from "../../hooks/useToast";
import { useUserMutation } from "../../features/api/authApi/apiSlice";
import NoPost from "./NoPosts";

const TabItems = [
  {
    title: "For You",
    content: "two!",
  },
  {
    title: "Following",
    content: "three!",
  },
  {
    title: "Liked",
    content: "three!",
  },
];

const FeedTabs = ({ feedItems }: { feedItems: any }) => {
  const id = useSelector(selectCurrentUser);
  const { showToast } = useCustomToast();
  const userData = useSelector(selectUserData);
  const [postLike] = usePostLikeMutation();
  const [user] = useUserMutation();
  const dispatch = useDispatch();

  const handleLike = async (indi: string, data: any) => {
    try {
      await postLike({
        postId: data._id,
        owner: data.user._id,
        indi,
        id: id!,
      });
      showToast(indi === "like" ? "Post Liked" : "Undo Liked", "success", 2000);
      const userInfo = await user(id!).unwrap();
      dispatch(setUserData({ user: userInfo.user }));
    } catch (err) {
      showToast("Something went wrong", "error", 2000);
    }
  };

  const checkFollow = (id: string) => {
    const data = userData.following.find((item: any) => item._id === id);
    if (data) {
      return true;
    }
    return false;
  };

  const checkLiked = (id: string) => {
    return userData.liked.includes(id);
  };
  return (
    <Tabs size={"lg"} isFitted w={"70%"} zIndex={"2"} mt={"40px"}>
      <TabList>
        {TabItems.map((item, index) => {
          return (
            <Tab fontWeight={"600"} key={index}>
              {item.title}
            </Tab>
          );
        })}
      </TabList>
      <TabPanels>
        <TabPanel>
          <Flex direction={"column"} my={10} gap={10}>
            {feedItems.length === 0 && <NoPost text="No Posts" />}
            {feedItems.map((item: any) => {
              return (
                <FeedCard
                  key={item._id}
                  data={item}
                  liked={userData.liked.includes(item._id)}
                  handleLike={handleLike}
                />
              );
            })}
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex direction={"column"} my={10} gap={10}>
            {userData !== null && userData.following.length === 0 && (
              <NoPost text="No Following" />
            )}
            {feedItems.map((item: any) => {
              if (checkFollow(item.user._id)) {
                return (
                  <FeedCard
                    key={item._id}
                    data={item}
                    liked={userData.liked.includes(item._id)}
                    handleLike={handleLike}
                  />
                );
              }
            })}
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex direction={"column"} my={10} gap={10}>
            {userData !== null && userData.liked.length === 0 && (
              <NoPost text="No Liked" />
            )}
            {feedItems.map((item: any) => {
              if (checkLiked(item._id)) {
                return (
                  <FeedCard
                    key={item._id}
                    data={item}
                    liked={userData.liked.includes(item._id)}
                    handleLike={handleLike}
                  />
                );
              }
            })}
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default FeedTabs;
