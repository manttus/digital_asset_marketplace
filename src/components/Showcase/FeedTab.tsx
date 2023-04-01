import {
  Flex,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import FeedCard from "../Card/FeedCard";

const TabItems = [
  {
    title: "For You",
    content: "two!",
  },
  {
    title: "Following",
    content: "three!",
  },
];

const FeedItems = [
  {
    id: 1,
    name: "Mantuu",
    avatar: "",
    image: "",
    creation: "",
    created: "",
  },
  {
    id: 2,
    name: "Mantuu",
    avatar: "",
    image: "",
    creation: "",
    created: "",
  },
  {
    id: 3,
    name: "Mantuu",
    avatar: "",
    image: "",
    creation: "",
    created: "",
  },
  {
    id: 4,
    name: "Mantuu",
    avatar: "",
    image: "",
    creation: "",
    created: "",
  },
];

const FeedTabs = () => {
  return (
    <Tabs size={"md"} isFitted w={"70%"}>
      <TabList>
        {TabItems.map((item, index) => {
          return (
            <Tab fontWeight={"500"} key={index}>
              {item.title}
            </Tab>
          );
        })}
      </TabList>
      <TabPanels>
        <TabPanel>
          <Flex direction={"column"} my={10} gap={10}>
            {FeedItems.map((item) => {
              return <FeedCard key={item.id} />;
            })}
          </Flex>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default FeedTabs;
