import {
  Button,
  Flex,
  FormControl,
  HStack,
  PinInput,
  PinInputField,
  Stack,
  Box,
  Link,
  Image,
  Text,
} from "@chakra-ui/react";
import useInput from "../../../hooks/useInput";

const OtpForm = () => {
  const VerificationHandler = async (event: any) => {
    event.preventDefault();
    try {
      const pin = pinValue1 + pinValue2 + pinValue3 + pinValue4;
      console.log(pin);
    } catch (err: Error | unknown) {
      console.log(err);
    }
    resetPin1();
    resetPin2();
    resetPin3();
    resetPin4();
  };

  const {
    inputChangeHandler: inputPinHandler1,
    inputValue: pinValue1,
    resetFields: resetPin1,
  } = useInput((value: string) => value.length !== 0);

  const {
    inputChangeHandler: inputPinHandler2,
    inputValue: pinValue2,
    resetFields: resetPin2,
  } = useInput((value: string) => value.length !== 0);

  const {
    inputChangeHandler: inputPinHandler3,
    inputValue: pinValue3,
    resetFields: resetPin3,
  } = useInput((value: string) => value.length !== 0);

  const {
    inputChangeHandler: inputPinHandler4,
    inputValue: pinValue4,
    resetFields: resetPin4,
  } = useInput((value: string) => value.length !== 0);
  return (
    <Box as="form" onSubmit={VerificationHandler}>
      <FormControl>
        <HStack spacing={3} justifyContent={"space-evenly"} pt={2}>
          <Box>
            <HStack>
              <PinInput size={"lg"}>
                <PinInputField
                  value={pinValue1}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    inputPinHandler1(e.target.value)
                  }
                />
                <PinInputField
                  value={pinValue2}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    inputPinHandler2(e.target.value)
                  }
                />
                <PinInputField
                  value={pinValue3}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    inputPinHandler3(e.target.value)
                  }
                />
                <PinInputField
                  value={pinValue4}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    inputPinHandler4(e.target.value)
                  }
                />
              </PinInput>
            </HStack>
          </Box>
          <Button
            w={"120px"}
            size={"lg"}
            type="submit"
            fontWeight={"300"}
            fontSize={"md"}
            bg={"purple.400"}
            color={"white"}
            _hover={{
              bg: "purple.500",
            }}
          >
            Send
          </Button>
        </HStack>
        <Stack textAlign={"center"} mt={"25px"}></Stack>
        <Stack textAlign={"center"} mt={"25px"}>
          <Link fontSize={"sm"} color={"purple.600"}>
            Resend Code
          </Link>
        </Stack>
      </FormControl>
    </Box>
  );
};

export default OtpForm;
