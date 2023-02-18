import { Flex, Hide, useMediaQuery, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import illustration1 from "../assets/register.png";
import LoginForm from "../components/Forms/LoginForm/LoginForm";
import {
  useSendMutation,
  useLoginMutation,
} from "../features/api/authApi/apiSlice";
import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import OtpForm from "../components/Forms/OtpForm/OtpForm";
import { useNavigate } from "react-router-dom";
import ForgotForm from "../components/Forms/ForgotForm/ForgotForm";

const LoginPage = () => {
  const [send, { isLoading: isSending, isError: otpError }] = useSendMutation();
  const [login, { isLoading: isLogging, isError: loginError }] =
    useLoginMutation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string | null>(null);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [isError, setError] = useState<boolean>(false);
  const [otp, setOtp] = useState<number>(0);
  const [isSmallerThan900] = useMediaQuery("(max-width: 900px)");
  const [accessToken, setAccessToken] = useState<string>("");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!toast.isActive(1) && isError) {
      toast({
        id: 1,
        title: toastMessage,
        status: "error",
        duration: 3000,
        variant: "left-accent",
        isClosable: true,
        position: "top-left",
        onCloseComplete: () => {
          setSuccess(false);
        },
      });
    }
    if (!toast.isActive(2) && isSuccess) {
      toast({
        id: 1,
        title: toastMessage,
        status: "success",
        duration: 3000,
        variant: "left-accent",
        isClosable: true,
        position: "top-left",
        onCloseComplete: () => {
          setSuccess(false);
        },
      });
    }
  }, [isError, isSuccess]);

  const oauthHandler = useGoogleLogin({
    onSuccess: (response) => {
      const accessToken = response.access_token;
      setAccessToken(accessToken);
    },
  });

  const otpSend = async (email: string, password: string | null) => {
    setEmail(email);
    setPassword(password);
    await send({ user: email }).unwrap();
    if (!otpError) {
      setToastMessage("OTP Sent.");
      setOtp(1);
      setSuccess(true);
    } else {
      setToastMessage("Failed to send OTP.");
      setError(false);
    }
  };

  const verificationHandler = async (otp: string) => {
    console.log(otp);
    try {
      const response = password
        ? await login({
            user: email,
            pass: password,
            otp: otp,
            type: "FORM",
          }).unwrap()
        : await login({ user: email, otp: otp, type: "GOOGLE" }).unwrap();
      if (!loginError) {
        console.log(response);
        setToastMessage("Login Successful.");
        setSuccess(true);
        navigate("/Marketplace");
      } else {
      }
    } catch (err: Error | unknown) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (accessToken != "") {
      fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          otpSend(res.email, null);
        });
    }
  }, [accessToken]);

  const rightVariants = {
    hidden: {
      x: -400,
      opacity: 0,
      overflow: "hidden",
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: "30",
        velocity: "0.5",
      },
    },
  };

  const bottomVariants = {
    hidden: {
      y: 500,
      overflow: "hidden",
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: "40",
        velocity: "1",
      },
    },
  };

  return (
    <>
      <Flex
        h={"100vh"}
        overflow={"hidden"}
        direction={{ sm: "column", md: "column", lg: "row", xl: "row" }}
      >
        <Flex
          width={{ sm: "100%", md: "100%", lg: "40%", xl: "40%" }}
          height={"100%"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Flex
            p={"10px"}
            mt={"5px"}
            height={"10%"}
            alignItems={{
              sm: "center",
              md: "flex-start",
              lg: "center",
              xl: "center",
            }}
            alignContent={"start"}
            justifyContent={"flex-start"}
            flexDirection={"row"}
            backgroundPosition={"center"}
          ></Flex>
          <Flex
            height={"60%"}
            flexDirection={"column"}
            alignItems={"center"}
            alignContent={"center"}
            justifyContent={"space-evenly"}
            backgroundImage={{
              sm: illustration1,
              md: illustration1,
              lg: "none",
              xl: "none",
            }}
            backgroundSize={"cover"}
            backgroundPosition={"center"}
            display={isSmallerThan900 ? "none" : "flex"}
          >
            {otp === 0 ? (
              <LoginForm
                submitHandler={otpSend}
                isSending={isSending}
                oauthHandler={oauthHandler}
                setOtp={setOtp}
              />
            ) : otp === 1 ? (
              <OtpForm
                verificationHandler={verificationHandler}
                isLoading={isLogging}
              />
            ) : (
              <ForgotForm />
            )}
          </Flex>

          <Flex
            as={motion.div}
            height={{ sm: "80%", md: "90%", lg: "90%", xl: "90%" }}
            justifyContent={"center"}
            alignItems={"center"}
            variants={bottomVariants}
            animate={isSmallerThan900 ? "visible" : ""}
            initial={"hidden"}
            flexDirection={"column"}
            backgroundImage={{
              md: illustration1,
              lg: "none",
              xl: "none",
            }}
            padding={"5"}
            backgroundSize={"cover"}
            backgroundPosition={"center"}
            display={isSmallerThan900 ? "flex" : "none"}
          >
            <Flex bg={"white"} p={"5"} rounded={"md"}>
              {otp === 0 ? (
                <LoginForm
                  submitHandler={otpSend}
                  isSending={isSending}
                  oauthHandler={oauthHandler}
                  setOtp={setOtp}
                />
              ) : otp === 1 ? (
                <OtpForm
                  verificationHandler={verificationHandler}
                  isLoading={isLogging}
                />
              ) : (
                <ForgotForm />
              )}
            </Flex>
          </Flex>

          <Flex h={"10%"} boxShadow={"sm"}></Flex>
        </Flex>
        <Hide below="lg">
          <Flex
            height={"100%"}
            as={motion.div}
            width={"60%"}
            backgroundImage={illustration1}
            backgroundSize={"cover"}
            backgroundRepeat={"no-repeat"}
            backgroundPosition={"center"}
            variants={rightVariants}
            animate={"visible"}
            initial={"hidden"}
            _before={{
              content: '""',
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.3)",
              zIndex: 1,
            }}
          ></Flex>
        </Hide>
      </Flex>
    </>
  );
};

export default LoginPage;
