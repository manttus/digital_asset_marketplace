import {
  Box,
  Flex,
  HStack,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LoginType, SignInType } from "../../types/LoginPageType";
import { OtpType } from "../../types/RegisterPageType";
import NormalButton from "../Button/NormalButton";
import CustomLink from "../Links/CustomLink";

type OtpProps = {
  submitHandler: (data: SignInType) => Promise<void>;
  user: {
    user: string;
    pass: string | null;
    type: string;
  } | null;
  type: string;
  sendOtp: (data: LoginType) => Promise<void>;
};

const Otp = ({ submitHandler, user, type, sendOtp }: OtpProps) => {
  const [deadline, setDeadline] = useState<number>(0);
  const [timeout, setTimer] = useState<string | null>(null);

  const onSubmit = (data: OtpType) => {
    if (type === "LOGIN" && user) {
      submitHandler!({
        user: user.user,
        pass: user.pass ? user.pass : undefined,
        type: user?.type,
        otp: data.otp,
      });
    } else {
    }
  };

  const getTime = () => {
    const now = new Date().getTime();
    const distance = deadline - now;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (distance < 0) {
      setTimer(null);
    } else {
      setTimer(`( ${minutes} : ${seconds} )`);
    }
  };

  useEffect(() => {
    if (timeout && deadline) {
      const intervalId = setInterval(() => {
        getTime();
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timeout, deadline]);

  return (
    <Box as={"form"} w={"400px"} mb={20}>
      <Flex
        w={"full"}
        gap={8}
        direction={"column"}
        alignItems={"center"}
        height={"140px"}
      >
        <Flex direction={"column"} alignItems={"center"} gap={2}>
          <Text fontSize={"18px"}>We have sent code to your email</Text>
          <Text fontSize={"15px"} fontWeight={"600"}>
            {user?.user}
          </Text>
        </Flex>
        <HStack spacing={3}>
          <PinInput
            size={"lg"}
            onComplete={(value) => {
              onSubmit({ otp: value });
            }}
          >
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
      </Flex>

      <Flex justifyContent={"center"} mt={5}>
        {!timeout ? (
          <CustomLink
            text={"Resend OTP"}
            size="15px"
            onClick={() => {
              sendOtp({ type: user!.user, pass: user!.pass });
              setDeadline(Date.now() + 300000);
              setTimer("5:00");
            }}
          />
        ) : (
          <Text
            fontSize={"15px"}
            fontWeight={"500"}
            color={"fontGhost"}
            cursor={"pointer"}
          >
            Resend {timeout}
          </Text>
        )}
      </Flex>
      <HStack mt={10}>
        <NormalButton text="Previous" type="outline" width="50%" />
        <NormalButton text={"Login"} type="filled" width="50%" />
      </HStack>
    </Box>
  );
};

export default Otp;
