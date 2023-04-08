import { Flex, Text, Box, Editable } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import CustomIconButton from "../Button/CustomIconButton";
import FeedTabs from "./FeedTab";
import { useSelector } from "react-redux";
import { selectUserData } from "../../features/auth/authSlice";

const details = [
  {
    title: "Followers",
    value: "0",
  },
  {
    title: "Following",
    value: "0",
  },
  {
    title: "Address",
    wallet: {
      address: "0x1234567890",
      balance: "0.0001",
    },
  },
];

type DetailsProps = {
  isEditPage: boolean;
  setEditPage: (value: boolean) => void;
};

const Details = ({ isEditPage, setEditPage }: DetailsProps) => {
  const user = useSelector(selectUserData);
  return (
    <Flex direction={"column"}>
      <Flex w={"full"} justifyContent={"space-between"} mt={"40px"} mb={"50px"}>
        <Flex direction={"row"} w={"70%"}>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={"6"}
            h={"100px"}
            border={"1px solid"}
            borderColor={"gray.200"}
            w={"full"}
            rounded={"md"}
            height={"146px"}
            shadow={"sm"}
            px={"10"}
          >
            <Text fontSize={"2xl"} fontWeight={"600"}>
              @{user?.username.toLowerCase()}
            </Text>
            <CustomIconButton
              aria="Edit"
              icon={!isEditPage ? <FiEdit /> : <AiOutlineClose />}
              type={"outline"}
              color={"gray.200"}
              onClick={() => {
                setEditPage(!isEditPage);
              }}
            />
          </Flex>
        </Flex>
        <Flex>
          <Box
            w={"350px"}
            shadow={"sm"}
            rounded={"md"}
            border={"1px solid"}
            borderColor={"gray.200"}
            px={"3"}
            height={"146px"}
          >
            {details.map((detail, index) => {
              return (
                <Flex
                  key={index}
                  justifyContent={"space-between"}
                  p={"3"}
                  borderTop={index == 2 ? "1px solid" : "none"}
                  borderColor={"gray.200"}
                >
                  <Text
                    fontSize={"md"}
                    color={"gray.600"}
                    fontWeight={"500"}
                    letterSpacing={"0.01rem"}
                  >
                    {detail.title}
                  </Text>
                  {index === 2 ? (
                    <Text
                      fontSize={"md"}
                      fontWeight={"500"}
                      color={"gray.600"}
                      letterSpacing={"0.01rem"}
                    >
                      {detail.wallet?.address} <br />
                    </Text>
                  ) : (
                    <Text
                      fontSize={"md"}
                      fontWeight={"500"}
                      color={"gray.600"}
                      letterSpacing={"0.01rem"}
                    >
                      {detail.value}
                    </Text>
                  )}
                </Flex>
              );
            })}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Details;
