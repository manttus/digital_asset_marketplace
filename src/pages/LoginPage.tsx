import { Text, Flex } from "@chakra-ui/react";
import Login from "../components/Forms/Login";
import { useState } from "react";

import {
  useLoginMutation,
  useSendMutation,
} from "../features/api/authApi/apiSlice";
import Otp from "../components/Forms/Otp";
import illustration from "../assets/abstract5.jpg";
import { setCredintials } from "../features/auth/authSlice";
import useGoogleAuth from "../hooks/useGoogleAuth";
import { useDispatch } from "react-redux";

type LoginType = {
  type: string;
  pass: string;
};

type SignInType = {
  type: string;
  pass?: string;
  otp: string;
  user: string;
};

const LoginPage = () => {
  const [otp, setOtp] = useState<boolean | null>(null);
  const [send, { isLoading: sendLoading }] = useSendMutation();
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [user, setUser] = useState<{
    user: string;
    pass: string | null;
    type: string;
  } | null>(null);
  const { oauth, email, username, resetState } = useGoogleAuth();

  const sendOtp = async (data: LoginType) => {
    const { type, pass } = data;
    const response = await send({ user: type }).unwrap();
    if (response.message === "SUCCESS") {
      setUser({
        user: type,
        pass: pass ? pass : null,
        type: pass ? "FORM" : "GOOGLE",
      });
      setOtp(true);
    }
  };

  const submitHandler = async ({ user, otp, type, pass }: SignInType) => {
    const response =
      type === "FORM"
        ? await login({ user, otp, type, pass }).unwrap()
        : await login({ user, otp, type }).unwrap();
    console.log(response);
    if (response.message === "SUCCESS") {
      // useDispatch(setCredintials(response.data));
    }
  };

  return (
    <Flex alignItems={"center"} direction={"column"}>
      <Flex
        bgImage={illustration}
        bgPos={"center"}
        w={"full"}
        height={"130px"}
        top={0}
        position={"absolute"}
      ></Flex>
      <Flex mt={20} mb={10} justifyContent={"end"}>
        <Text fontSize={"38px"} fontWeight={"700"}>
          {otp ? "Otp Sent" : "Login"}
        </Text>
      </Flex>
      <Flex w={"full"} justifyContent={"center"}>
        {otp ? (
          <Otp submitHandler={submitHandler} user={user} />
        ) : (
          <Login sendOtp={sendOtp} isLoading={sendLoading} oauth={oauth} />
        )}
      </Flex>
    </Flex>
  );
};

export default LoginPage;
