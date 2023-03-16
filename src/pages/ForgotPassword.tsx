import illustration from "../assets/abstract5.jpg";
import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import {
  useSendMutation,
  useVerifyMutation,
} from "../features/api/authApi/apiSlice";
import useAlert from "../hooks/useAlert";
import { ForgotType, LoginType } from "../types/ForgotPageType";

const ForgotPassword = () => {
  const [otp, setOtp] = useState<boolean>(false);
  const [send] = useSendMutation();
  const [verify] = useVerifyMutation();
  const { setOpen, setErrorState } = useAlert();
  const [user, setUser] = useState<{
    user: string;
  } | null>(null);

  const sendOtp = async (data: LoginType) => {
    const { type, pass } = data;
    try {
      const response = await send({ user: type }).unwrap();
      if (response.message === "SUCCESS") {
        setUser({
          user: type,
        });
        setOtp(true);
        setErrorState({
          type: "success",
          message: "Otp Sent",
          action: "SET_MESSAGE",
        });
        setOpen(true);
      }
    } catch (err: Error | unknown) {
      console.log(err);
      setErrorState({
        type: "error",
        message: "Something went wrong",
        action: "SET_MESSAGE",
      });
      setOpen(true);
    }
  };

  const verifyOtp = async (data: ForgotType) => {
    const { type, otp } = data;
    try {
      const response = await verify({ user: type, otp }).unwrap();
      if (response.message === "SUCCESS") {
        setErrorState({
          type: "success",
          message: "Otp Verified",
          action: "SET_MESSAGE",
        });
        setOpen(true);
      }
    } catch (err: Error | unknown) {
      console.log(err);
      setErrorState({
        type: "error",
        message: "Something went wrong",
        action: "SET_MESSAGE",
      });
      setOpen(true);
    }
  };

  return (
    <Flex alignItems={"center"} direction={"column"}>
      <Flex
        bgImage={illustration}
        bgPos={"top"}
        w={"full"}
        height={"140px"}
        top={0}
        position={"absolute"}
      ></Flex>
      <Flex mt={28} mb={10} justifyContent={"end"}>
        <Text fontSize={"38px"} fontWeight={"700"}>
          {otp ? "Otp Sent" : "Forgot Password"}
        </Text>
      </Flex>
      <Flex w={"full"} justifyContent={"center"}></Flex>
    </Flex>
  );
};

export default ForgotPassword;
