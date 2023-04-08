import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfile";
import Details from "../components/Showcase/Details";
import Profile from "../components/Showcase/Profile";
import { useUploadImageUserMutation } from "../features/api/authApi/apiSlice";
import useHttp from "../hooks/useHttp";
import FeedTabs from "../components/Showcase/FeedTab";

const ProfilePage = () => {
  const [uploadImage] = useUploadImageUserMutation();
  const [isEditPage, setIsEditPage] = useState<boolean>(false);
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const [profile, setProfile] = useState<any>(null);

  const AddImage = async (file: FileList | null) => {
    // const formData = new FormData();
    // formData.append("file", file![0]);
    // formData.append("upload_preset", "xqa9twpr");
    // const requestConfig = {
    //   url: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    //   method: "POST",
    //   body: formData,
    // };
    // const { sendRequest } = useHttp(requestConfig, (value) => {
    //   setProfile(value.secure_url);
    // });
    // sendRequest();
  };

  return (
    <Flex direction={"column"} px={"10"} py={"5"}>
      <Profile addImage={AddImage} isEditPage={isEditPage} />
      <Details isEditPage={isEditPage} setEditPage={setIsEditPage} />
      <Flex w={"70%"} justifyContent={"center"}>
        {!isEditPage ? <FeedTabs /> : <EditProfile />}
      </Flex>
    </Flex>
  );
};

export default ProfilePage;
