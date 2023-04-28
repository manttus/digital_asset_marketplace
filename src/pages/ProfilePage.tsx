import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Details from "../components/Showcase/Details";
import Profile from "../components/Showcase/Profile";
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

const ProfilePage = () => {
  const id = useSelector((state: RootState) => state.auth.user);
  const [follow] = useFollowMutation();
  const [isEditPage, setIsEditPage] = useState<boolean>(false);
  const [updateUser, { isLoading }] = useUpdateMutation();
  const [profileData, setProfileData] = useState<any>();
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
      profileId === undefined && dispatch(setUserData({ user: data.user }));
      setProfileData(data.user);
    } catch (err) {
      showToast("Profile not found", "error", 2000);
      navigate("/profile");
    }
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
      } else {
        const response = await follow({
          id,
          followId: profileId,
          status: "unfollow",
        }).unwrap();
      }
      const updateData = await user(id!).unwrap();
      dispatch(setUserData({ user: updateData.user }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex direction={"column"} px={"10"} py={"5"}>
      <Profile addImage={AddImage} isEditPage={isEditPage} />
      <Details
        isEditPage={isEditPage}
        setEditPage={setIsEditPage}
        profileId={profileId}
        profileData={profileData}
        id={id!}
        followHandler={followHandler}
      />
      {!profileId && (
        <Flex w={"70%"} justifyContent={"center"}>
          <FeedTabs />
        </Flex>
      )}
      {}
    </Flex>
  );
};

export default ProfilePage;
