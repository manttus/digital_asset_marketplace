import {
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  Progress,
} from "@chakra-ui/react";
import NormalButton from "./Button/NormalButton";
import { CgUser } from "react-icons/cg";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import Otp from "./Forms/Otp";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  submitHandler: (value: FormValues) => void;
  address: string;
  otpField: boolean;
  setOtpValue: (value: string) => void;
  setEmail: (value: string) => void;
  registerHandler: () => void;
  email: string;
  isSendLoading: boolean;
  sendOtp: (email: string) => Promise<boolean>;
  setUsername: (value: string) => void;
  setOtpField: (value: boolean) => void;
  username: string;
};

type FormValues = {
  username: string;
  email: string;
  terms: boolean;
};

const AuthModal = ({
  isOpen,
  onClose,
  submitHandler,
  address,
  otpField,
  setOtpValue,
  setEmail,
  registerHandler,
  email,
  isSendLoading,
  sendOtp,
  setUsername,
  setOtpField,
  username,
}: AuthModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={"xl"}
      closeOnOverlayClick={true}
      onCloseComplete={() => {
        reset();
        setOtpField(false);
        setEmail("");
        setUsername("");
      }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        as={"form"}
        onSubmit={handleSubmit((value) => {
          if (email !== value.email) {
            setEmail(value.email);
            setUsername(value.username);
            submitHandler(value);
            reset();
          } else {
            setOtpField(true);
            reset();
          }
        })}
      >
        <ModalHeader>
          <Flex
            gap={5}
            py={"10px"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Progress
              hasStripe
              value={!otpField ? 50 : 100}
              size="xs"
              color="buttonPrimary"
              w={"100%"}
            />
          </Flex>
        </ModalHeader>
        <Divider />
        <ModalBody p={0}>
          <Flex
            alignItems={"center"}
            py={"20px"}
            gap={5}
            p={5}
            bg={"gray.100"}
            pl={10}
          >
            <Flex>
              <Flex
                border={"1px solid"}
                borderColor={"gray.300"}
                rounded={"full"}
                p={3}
              >
                <CgUser size={"30px"} color="black" />
              </Flex>
            </Flex>
            <Flex direction={"column"}>
              <Text fontSize={"13px"} fontWeight={"400"} color={"gray.500"}>
                CONNECTED ADDRESS
              </Text>
              <Text fontSize={"13px"} fontWeight={"500"} color={"gray.600"}>
                {address}
              </Text>
            </Flex>
          </Flex>
          {!otpField ? (
            <Flex p={5} direction={"column"} gap={5} alignItems={"center"}>
              <VStack w={"80%"}>
                <FormControl isInvalid={errors.username ? true : false}>
                  <Input
                    {...register("username", {
                      required: true,
                      minLength: 6,
                    })}
                    fontSize={"13px"}
                    type={"text"}
                    placeholder={"Username"}
                    rounded={"sm"}
                    border={"1px solid"}
                    borderColor={"gray.300"}
                    _placeholder={{
                      fontSize: "13px",
                      color: "black",
                    }}
                    defaultValue={username ? username : ""}
                  />
                </FormControl>
                <FormControl isInvalid={errors.email ? true : false}>
                  <Input
                    {...register("email", {
                      required: true,
                      minLength: 6,
                    })}
                    fontSize={"13px"}
                    type={"email"}
                    placeholder={"Email address"}
                    rounded={"sm"}
                    border={"1px solid"}
                    borderColor={"gray.300"}
                    _placeholder={{
                      fontSize: "13px",
                      color: "black",
                    }}
                    defaultValue={email ? email : ""}
                  />
                </FormControl>
                <FormControl>
                  <Checkbox
                    mt={"10px"}
                    size={"md"}
                    {...register("terms", {
                      required: true,
                    })}
                    defaultChecked
                    isInvalid={errors.terms ? true : false}
                  >
                    <Text fontSize={"13px"}>
                      I agree to the Mintables{" "}
                      <Link to={""} as={NavLink} color="buttonPrimary">
                        Terms of Service
                      </Link>
                    </Text>
                  </Checkbox>
                </FormControl>
              </VStack>
            </Flex>
          ) : (
            <Otp
              sendOtpHandler={sendOtp}
              setOtpValue={setOtpValue}
              email={email}
            />
          )}
        </ModalBody>
        <Divider />
        <ModalFooter>
          {!otpField ? (
            <Button
              type="submit"
              bg={"buttonPrimary"}
              color={"white"}
              isLoading={isSendLoading}
              transition={"all 0.3s ease-in-out"}
              _hover={{
                bg: "buttonPrimary",
                color: "white",
                transform: "scale(1.03)",
                transition: "all 0.3s ease-in-out",
              }}
            >
              Send
            </Button>
          ) : (
            <Flex
              w={"100%"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Text
                fontSize={"13px"}
                fontWeight={"400"}
                textDecoration={"underline"}
                cursor={"pointer"}
                onClick={() => {
                  setOtpField(false);
                }}
              >
                Back
              </Text>
              <Button
                py="20px"
                fontSize="14px"
                type="button"
                onClick={() => {
                  registerHandler();
                }}
                bg={"buttonPrimary"}
                color={"white"}
                _hover={{
                  bg: "buttonPrimary",
                  color: "white",
                  transform: "scale(1.03)",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                Complete
              </Button>
            </Flex>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
