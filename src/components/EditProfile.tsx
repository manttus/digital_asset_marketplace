import { Flex } from "@chakra-ui/react";
import Edit from "./Forms/Edit";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import {
  useUpdateMutation,
  useUserQuery,
} from "../features/api/authApi/apiSlice";
type User = {
  username: string;
  phone: string;
  email: string;
  country: string;
  address: string;
  postal: string;
  id: string;
};
type FormData = {
  username: string;
  phone: string;
  email: string;
  country: string;
  address: string;
  postal: string;
  id: string;
  backgroundImage: Buffer;
  profileImage: Buffer;
  followers: string[];
  following: string[];
};
const EditProfile = () => {
  const user = useSelector((state: any) => state.auth.user);
  const userData = useUserQuery(user);

  const [update] = useUpdateMutation();
  const submitHandler = async (data: FormData) => {
    try {
      const response = await update(data).unwrap();
      console.log(response);
    } catch (err: Error | unknown) {
      console.log(err);
    }
  };

  const AddImage = async () => {};

  return (
    <Flex
      w={"100%"}
      border={"1px solid"}
      borderColor={"gray.200"}
      p={10}
      rounded={"md"}
      shadow={"sm"}
    >
      <Edit userData={userData.data.user} submitHandler={submitHandler} />
    </Flex>
  );
};

export default EditProfile;
