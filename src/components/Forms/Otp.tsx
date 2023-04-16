import {
  Box,
  Flex,
  HStack,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

type OtpProps = {
  sendOtpHandler: (email: string) => Promise<boolean>;
  email: string;
  setOtpValue: (value: string) => void;
};

const Otp = ({ sendOtpHandler, email, setOtpValue }: OtpProps) => {
  const [deadline, setDeadline] = useState<number>(0);
  const [timeout, setTimer] = useState<string | null>(null);

  const getTime = () => {
    const now = new Date().getTime();
    const distance = deadline - now;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (distance < 0) {
      setTimer(null);
    } else {
      setTimer(` ${minutes} : ${seconds} `);
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
    <Flex w={"full"} direction={"column"} gap={5} py={"25px"}>
      <Flex w={"full"} direction={"column"} alignItems={"center"} gap={5}>
        <Flex direction={"column"} alignItems={"center"} gap={1}>
          <Text fontSize={"13px"}>We have sent code to your email</Text>
          <Text fontSize={"12px"} fontWeight={"600"}>
            {email}
          </Text>
        </Flex>
        <HStack>
          <PinInput
            size={"md"}
            onComplete={(value) => {
              setOtpValue(value);
            }}
          >
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
      </Flex>

      <Flex justifyContent={"center"}>
        {!timeout ? (
          <Text
            fontSize={"12px"}
            transition={"all 0.3s ease-in-out"}
            cursor={"pointer"}
            fontWeight={"500"}
            onClick={() => {
              setDeadline(Date.now() + 300000);
              setTimer("5:00");
              sendOtpHandler(email);
            }}
            textDecoration={"underline"}
          >
            Resend Code
          </Text>
        ) : (
          <Text
            fontSize={"12px"}
            fontWeight={"500"}
            color={"fontGhost"}
            cursor={"pointer"}
          >
            Resend {timeout}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default Otp;
