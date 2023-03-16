import { Text, Flex } from "@chakra-ui/react";
import Login from "../components/Forms/Login";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import {
  useLoginMutation,
  useSendMutation,
} from "../features/api/authApi/apiSlice";
import Otp from "../components/Forms/Otp";
import illustration from "../assets/abstract5.jpg";
import { setCredintials } from "../features/auth/authSlice";
import useGoogleAuth from "../hooks/useGoogleAuth";
import { useDispatch } from "react-redux";
import useAlert from "../hooks/useAlert";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { LoginType, SignInType } from "../types/LoginPageType";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setItem } = useLocalStorage("Tokens");
  const { oauth } = useGoogleAuth();
  const [otp, setOtp] = useState<boolean | null>(null);
  const [send, { isLoading: sendLoading }] = useSendMutation();
  const [login] = useLoginMutation();
  const { setOpen, setErrorState } = useAlert();
  const [user, setUser] = useState<{
    user: string;
    pass: string | null;
    type: string;
  } | null>(null);

  const sendOtp = async (data: LoginType) => {
    const { type, pass } = data;
    try {
      const response = await send({ user: type }).unwrap();
      if (response.message === "SUCCESS") {
        setUser({
          user: type,
          pass: pass ? pass : null,
          type: pass ? "FORM" : "GOOGLE",
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

  const submitHandler = async ({ user, otp, type, pass }: SignInType) => {
    setOpen(false);
    try {
      const response =
        type === "FORM"
          ? await login({ user, otp, type, pass }).unwrap()
          : await login({ user, otp, type }).unwrap();
      if (response.message === "SUCCESS") {
        setErrorState({
          type: "success",
          message: "Login Successful",
          action: "SET_MESSAGE",
        });
        setOpen(true);
        const user = jwt_decode(response.accessToken) as string;
        dispatch(setCredintials({ user, token: response.accessToken }));
        setItem(
          JSON.stringify({
            refreshToken: response.accessToken,
            accessToken: response.accessToken,
          })
        );
        navigate("/");
      }
    } catch (err: Error | unknown) {
      setErrorState({
        type: "error",
        message: "Invalid Otp",
        action: "SET_MESSAGE",
      });
      setOpen(true);
    }
  };

  return (
    <Flex alignItems={"center"} direction={"column"}>
      <Flex
        bgImage={illustration}
        bgPos={"bottom"}
        w={"full"}
        height={"140px"}
        top={0}
        position={"absolute"}
      ></Flex>
      <Flex mt={28} mb={10} justifyContent={"end"}>
        <Text fontSize={"38px"} fontWeight={"700"}>
          {otp ? "Otp Sent" : "Log In"}
        </Text>
      </Flex>
      <Flex w={"full"} justifyContent={"center"}>
        {otp ? (
          <Otp
            submitHandler={submitHandler}
            user={user}
            sendOtp={sendOtp}
            type={"LOGIN"}
          />
        ) : (
          <Login sendOtp={sendOtp} isLoading={sendLoading} oauth={oauth} />
        )}
      </Flex>
    </Flex>
  );
};

export default LoginPage;
