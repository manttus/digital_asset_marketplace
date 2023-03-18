import { Flex } from "@chakra-ui/react";
import FeedCard from "../Card/FeedCard";

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

const Feeds = () => {
  return (
    <Flex direction={"column"} gap={4}>
      {/* {FeedItems.map((item) => {
        return <FeedCard />;
      })} */}
    </Flex>
  );
};

export default Feeds;
