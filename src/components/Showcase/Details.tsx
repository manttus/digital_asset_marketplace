import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  RiEditBoxLine,
  RiUserUnfollowLine,
  RiUserFollowLine,
} from "react-icons/ri";
import CustomIconButton from "../Button/CustomIconButton";

type DetailsProps = {
  isEditPage: boolean;
  setEditPage: (value: boolean) => void;
  profileId: string | undefined;
  profileData: any;
  id: string;
  followHandler: (profileId: string, indicator: string) => void;
};

const Details = ({
  isEditPage,
  setEditPage,
  id,
  profileId,
  profileData,
  followHandler,
}: DetailsProps) => {
  const [followStatus, setFollowStatus] = useState<boolean>(false);

  useEffect(() => {
    if (profileData) {
      const isFollowing = profileData.followers.filter(
        (follower: any) => follower._id === id
      );
      isFollowing.length > 0 ? setFollowStatus(true) : setFollowStatus(false);
    }
  }, [profileData]);

  const details = [
    {
      count: profileData?.following.length,
      label: "Following",
    },
    {
      count: profileData?.followers.length,
      label: "Followers",
    },
  ];

  return (
    <Flex direction={"column"}>
      <Flex w={"full"} mt={"40px"} mb={"20px"}>
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
              <Text fontSize={"2xl"} fontWeight={"600"} ml={"5"}>
                @{profileData?.username.toLowerCase()}
              </Text>
              {profileId === undefined && (
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
              )}
              {profileId &&
                (!followStatus ? (
                  <CustomIconButton
                    icon={<RiUserFollowLine size={"22px"} />}
                    type={"outline"}
                    aria="Follow"
                    onClick={() => {
                      followHandler(profileId, "follow");
                      setFollowStatus(true);
                    }}
                  />
                ) : (
                  <CustomIconButton
                    icon={<RiUserUnfollowLine size={"22px"} />}
                    type={"outline"}
                    aria="Follow"
                    onClick={() => {
                      followHandler(profileId, "unfollow");
                      setFollowStatus(false);
                    }}
                  />
                ))}
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
