import {
  Button,
  FormControl,
  HStack,
  PinInput,
  PinInputField,
  Stack,
  Box,
  Link,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

type OtpProps = {
  verificationHandler: (pin: string) => void;
  isLoading: boolean;
  email: string;
  password: string | null;
  otpSend: (email: string, password: string | null) => void;
};

const OtpForm = (props: OtpProps) => {
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [seconds, setSeconds] = useState<number>(1);
  const pinHandler = (index: number, value: string) => {
    if (value.length === 1) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
    }
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (props.isLoading) {
      const newPin = ["", "", "", ""];
      setPin(newPin);
    }
  }, [props.isLoading]);

  const verificationHandler = () => {
    if (pin.length === 4) {
      props.verificationHandler(pin.join(""));
    }
    const newPin = ["", "", "", ""];
    setPin(newPin);
  };
  return (
    <Flex h={"200px"} justifyContent={"center"} alignItems={"center"}>
      <FormControl>
        <Flex
          height={"90%"}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box>
            <HStack spacing={4}>
              <PinInput
                size={"lg"}
                variant={"flushed"}
                focusBorderColor={"purple.400"}
              >
                {pin.map((value, index) => (
                  <PinInputField
                    value={value}
                    key={index}
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                      pinHandler(index, e.currentTarget.value)
                    }
                  />
                ))}
              </PinInput>
            </HStack>
          </Box>
          <Button
            mt={"30px"}
            isLoading={props.isLoading}
            w={"250px"}
            size={"md"}
            type={"submit"}
            fontWeight={"300"}
            fontSize={"md"}
            bg={"purple.400"}
            color={"white"}
            _hover={{
              bg: "purple.500",
            }}
            onClick={verificationHandler}
          >
            Send
          </Button>
          <Stack textAlign={"center"} mt={"30px"} width={"full"}>
            {seconds === 0 ? (
              <Link fontSize={"sm"} color={"purple.600"}>
                Resend Code
              </Link>
            ) : (
              <Text fontSize={"sm"} cursor={"pointer"}>
                Resend (
                {`${minutes}:${remainingSeconds.toString().padStart(2, "0")}`})
              </Text>
            )}
          </Stack>
        </Flex>
      </FormControl>
    </Flex>
  );
};

export default OtpForm;
