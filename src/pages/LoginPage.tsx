import { Button, Flex, Hide, useMediaQuery, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import illustration1 from "../assets/register.png";
import LoginForm from "../components/Forms/LoginForm/LoginForm";
import {
  useSendMutation,
  useLoginMutation,
} from "../features/api/authApi/apiSlice";
import { useEffect, useState } from "react";
import OtpForm from "../components/Forms/OtpForm/OtpForm";
import { useNavigate } from "react-router-dom";
import ForgotForm from "../components/Forms/ForgotForm/ForgotForm";
import useGoogleAuth from "../hooks/useGoogleAuth";

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

  const {
    oauth,
    email: authEmail,
    username: authUsername,
    resetState,
  } = useGoogleAuth();

  useEffect(() => {
    if (authEmail) {
      otpSend(authEmail, null);
    }
  }, [authEmail, authUsername]);

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
        setToastMessage("Login Successful.");
        setSuccess(true);
        navigate("/Marketplace");
      } else {
      }
    } catch (err: Error | unknown) {
      console.log(err);
    }
  };

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
            shadow={"sm"}
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
          >
            {" "}
          </Flex>
          <Flex
            as={motion.div}
            variants={bottomVariants}
            animate={"visible"}
            initial={isSmallerThan900 ? "" : "hidden"}
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
                setOtp={setOtp}
                oauth={oauth}
              />
            ) : otp === 1 ? (
              <OtpForm
                verificationHandler={verificationHandler}
                isLoading={isLogging}
                email={email}
                password={password}
                otpSend={otpSend}
              />
            ) : (
              <ForgotForm />
            )}
          </Flex>
          <Flex
            h={"10%"}
            w={"full"}
            justifyContent={"center"}
            alignItems={"center"}
            shadow={"sm"}
            border={"lg"}
          >
            {/* <Text fontSize={"sm"}>
              New to Mintables ?
              <Link
                ml={"4px"}
                color={"purple.500"}
                fontWeight={"bold"}
                onClick={() => navigate("/signup")}
              >
                Signup
              </Link>
            </Text> */}
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
                  setOtp={setOtp}
                  oauth={oauth}
                />
              ) : otp === 1 ? (
                <OtpForm
                  verificationHandler={verificationHandler}
                  isLoading={isLogging}
                  email={email}
                  password={password}
                  otpSend={otpSend}
                />
              ) : (
                <ForgotForm />
              )}
            </Flex>
          </Flex>
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
