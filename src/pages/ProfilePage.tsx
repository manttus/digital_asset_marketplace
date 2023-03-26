import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfile";
import Details from "../components/Showcase/Details";
import FeedTab from "../components/Showcase/FeedTab";
import Profile from "../components/Showcase/Profile";
import { useUpdateMutation } from "../features/api/authApi/apiSlice";

const ProfilePage = () => {
  // const user = useSelector((state: any) => state.auth.user);
  // const userData = useUserQuery(user);
  const [isEditPage, setIsEditPage] = useState<boolean>(false);
  const AddImage = async (file: FileList | null) => {};
  return (
    <Flex direction={"column"} px={"10"} py={"5"}>
      <Profile addImage={AddImage} />
      <Details isEditPage={isEditPage} setEditPage={setIsEditPage} />
      <Flex w={"70%"} justifyContent={"center"}>
        {!isEditPage ? <FeedTab /> : <EditProfile />}
      </Flex>
    </Flex>
  );
};

export default ProfilePage;
