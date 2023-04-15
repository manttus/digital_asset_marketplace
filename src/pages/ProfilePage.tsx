import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import EditProfile from "../components/EditProfile";
import Details from "../components/Showcase/Details";
import Profile from "../components/Showcase/Profile";
import {
  useUpdateMutation,
  useUserMutation,
} from "../features/api/authApi/apiSlice";
import useHttp from "../hooks/useHttp";
import FeedTabs from "../components/Showcase/FeedTab";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentUser,
  selectUserData,
  setUserData,
} from "../features/auth/authSlice";
import { RootState } from "../types/StoreType";

const ProfilePage = () => {
  const id = useSelector((state: RootState) => state.auth.user);
  const [isEditPage, setIsEditPage] = useState<boolean>(false);
  const [updateUser, { isLoading }] = useUpdateMutation();
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const [user] = useUserMutation();
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

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

  return (
    <Flex direction={"column"} px={"10"} py={"5"}>
      <Profile addImage={AddImage} isEditPage={isEditPage} />
      <Details isEditPage={isEditPage} setEditPage={setIsEditPage} />
      {/* <Flex w={"70%"} justifyContent={"center"}>
        {!isEditPage ? <FeedTabs /> : <EditProfile />}
      </Flex> */}
    </Flex>
  );
};

export default ProfilePage;
