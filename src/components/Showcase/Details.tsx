import { Flex, Text, Box, Editable } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { RiEditBoxLine } from "react-icons/ri";
import CustomIconButton from "../Button/CustomIconButton";
import FeedTabs from "./FeedTab";
import { useSelector } from "react-redux";
import { selectUserData } from "../../features/auth/authSlice";
import { AbiCoder } from "ethers/lib/utils";

type DetailsProps = {
  isEditPage: boolean;
  setEditPage: (value: boolean) => void;
};

const Details = ({ isEditPage, setEditPage }: DetailsProps) => {
  const user = useSelector(selectUserData);
  const details = [
    {
      count: user?.following.length,
      label: "Following",
    },
    {
      count: user?.followers.length,
      label: "Followers",
    },
    // {
    //   count: user?.favourites.length,
    //   label: "Favourites",
    // },
  ];

  return (
    <Flex direction={"column"}>
      <Flex w={"full"} mt={"40px"} mb={"50px"}>
        <Flex direction={"row"} w={"full"} alignItems={"center"}>
          <Flex
            alignItems={"center"}
            gap={"6"}
            h={"100px"}
            border={"1px solid"}
            borderColor={"gray.200"}
            w={"full"}
            rounded={"md"}
            height={"146px"}
            shadow={"sm"}
            px={"10"}
            justifyContent={"space-between"}
          >
            <Flex gap={10} alignItems={"Center"}>
              <Text fontSize={"2xl"} fontWeight={"600"}>
                @{user?.username.toLowerCase()}
              </Text>
              <CustomIconButton
                aria="Edit"
                icon={
                  !isEditPage ? (
                    <RiEditBoxLine size={"22px"} />
                  ) : (
                    <AiOutlineClose size={"22px"} />
                  )
                }
                type={"outline"}
                color={"gray.200"}
                onClick={() => {
                  setEditPage(!isEditPage);
                }}
              />
            </Flex>
            <Flex gap={5}>
              {details.map((items) => {
                return (
                  <Flex
                    boxShadow={"sm"}
                    p={5}
                    key={items.label}
                    direction={"column"}
                    alignItems={"center"}
                    rounded={"md"}
                    cursor={"pointer"}
                    border={"1px solid"}
                    borderColor={"gray.100"}
                  >
                    <Text fontSize={"2xl"} fontWeight={"600"}>
                      {items.count}
                    </Text>
                    <Text fontSize={"md"} fontWeight={"600"}>
                      {items.label}
                    </Text>
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Details;
