import {
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  HStack,
  Modal,
  ModalContent,
  PinInput,
  PinInputField,
  Stack,
  Text,
  Box,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useResendMutation,
  useVerifyMutation,
} from "../../features/api/apiSlice";
import useInput from "../../hooks/useInput";

interface Modal {
  onClose: () => void;
  isOpen: boolean;
  overlay: JSX.Element;
  email: string;
  submitHandler: () => void;
}

const Verification = ({
  isOpen,
  onClose,
  overlay,
  email,
  submitHandler,
}: Modal) => {
  const [verfy, { isLoading }] = useVerifyMutation();
  const [resend, { isLoading: resendLoading }] = useResendMutation();
  // const [sendTime, setSendTime] = useState<string | null>("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   setSendTime(
  //     localStorage.getItem("sendTime") ? localStorage.getItem("sendTime") : null
  //   );
  // }, []);

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

  const VerificationHandler = async (event: any) => {
    event.preventDefault();
    try {
      const pin = pinValue1 + pinValue2 + pinValue3 + pinValue4;
      const response = await verfy({ email: email, otp: pin }).unwrap();
      console.log(response);
      onClose();
    } catch (err: Error | unknown) {
      console.log(err);
    }
    resetPin1();
    resetPin2();
    resetPin3();
    resetPin4();
  };

  const resendHandler = async () => {
    try {
      const response = await resend({ email: email }).unwrap();
      console.log(response);
    } catch (err: Error | unknown) {
      console.log(err);
    }
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      {overlay}
      <ModalContent w={"full"} maxW={"sm"} rounded={"lg"} p={6} my={10}>
        <Stack spacing={4}>
          <Center fontSize={"lg"} fontWeight={"bold"} lineHeight={1.5}>
            We have sent code to your email
          </Center>
          <Center fontSize={"xl"} fontWeight="bold" lineHeight={1.5}>
            {email}
          </Center>
          <form onSubmit={VerificationHandler}>
            <FormControl>
              <HStack justifyContent={"space-between"} pt={2}>
                <Box>
                  <HStack spacing={3}>
                    <PinInput>
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
                  type="submit"
                  isLoading={isLoading}
                  width={"120px"}
                  bg={"purple.600"}
                  color={"white"}
                  _hover={{
                    bg: "purple.400",
                  }}
                >
                  Verify
                </Button>
              </HStack>
              <Stack textAlign={"center"} mt={"25px"}>
                <Link
                  color={"purple.600"}
                  onClick={resendHandler}
                  fontWeight="bold"
                >
                  Resend Code
                </Link>
              </Stack>
            </FormControl>
          </form>
        </Stack>
      </ModalContent>
    </Modal>
  );
};

export default Verification;
