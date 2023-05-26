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
  useDisclosure,
} from "@chakra-ui/react";
import NormalButton from "./Button/NormalButton";
import { CgUser } from "react-icons/cg";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import Otp from "./Forms/Otp";
import { useEffect, useState } from "react";

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

  const [deadline, setDeadline] = useState<number>(0);
  const [timeout, setTimer] = useState<string | null>(null);
  const {
    isOpen: isOpenTerms,
    onOpen: onOpenTerms,
    onClose: onCloseTerms,
  } = useDisclosure();

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
    <>
      <Modal
        isCentered
        onClose={onCloseTerms}
        isOpen={isOpenTerms}
        motionPreset="slideInBottom"
        size={"2xl"}
      >
        <ModalOverlay />
        <ModalContent h={"600px"}>
          <ModalHeader
            display={"flex"}
            borderBottom={"1px solid"}
            borderColor={"gray.200"}
            justifyContent={"center"}
          >
            Terms & Conditions
          </ModalHeader>
          <ModalBody
            overflowY={"scroll"}
            sx={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Flex
              direction={"column"}
              textAlign={"justify"}
              alignItems={"center"}
              w={"100%"}
              p={5}
            >
              By accessing or using our services, you agree to comply with the
              following terms and conditions. Our NFT Marketplace provides a
              platform for users to buy, sell, and trade Non-Fungible Tokens
              (NFTs). It is essential to be of legal age in your jurisdiction to
              use our services, and minors must obtain consent from a parent or
              guardian. Please ensure that you keep your account secure and do
              not share your login credentials with others. When listing NFTs
              for sale or auction on our platform, you confirm that you are the
              rightful owner or have the necessary rights to sell the NFT. It is
              your responsibility to provide accurate and complete information
              when creating NFT listings, including a clear description and any
              associated terms and conditions. As a buyer, please conduct your
              own due diligence before purchasing an NFT, as we do not guarantee
              the authenticity, quality, or legality of the NFTs listed on our
              platform. Once a transaction is completed, it is final and cannot
              be reversed or refunded. We expect all users to respect the
              intellectual property rights of others. Do not list or sell NFTs
              that infringe upon copyrights, trademarks, or other intellectual
              property rights. If you believe that your intellectual property
              rights have been violated on our platform, please contact us with
              relevant details for prompt investigation. Engaging in unlawful,
              fraudulent, or deceptive activities on our platform is strictly
              prohibited. Additionally, unauthorized commercial purposes,
              spamming, or malicious activities that may harm the platform or
              other users are not allowed. Any attempts to manipulate or disrupt
              the functioning of our platform or interfere with other users'
              transactions are strictly prohibited. Please be aware that we
              reserve the right to monitor and moderate user-generated content,
              including NFT listings and user communications, on our platform.
              We may remove or take action against any content or user accounts
              that violate these terms or any applicable laws. While we strive
              to provide a secure and reliable platform, we do not guarantee
              uninterrupted access or error-free operations. We shall not be
              liable for any direct, indirect, incidental, consequential, or
              punitive damages arising out of your use or inability to use our
              platform or any transactions conducted on it. We reserve the right
              to modify or update these terms and conditions at any time. We
              will notify users of any significant changes, and continued use of
              our platform constitutes acceptance of the modified terms. These
              terms and conditions shall be governed by and construed in
              accordance with the laws of [Jurisdiction]. Any disputes arising
              out of or related to these terms shall be subject to the exclusive
              jurisdiction of the courts of [Jurisdiction]. Please note that
              these terms and conditions serve as a general guideline. For
              specific legal advice and to ensure compliance, it is recommended
              to consult with a qualified attorney. By using our NFT
              Marketplace, you acknowledge that you have read, understood, and
              agreed to these terms and conditions. We hope you enjoy your
              experience on our platform!
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseTerms}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent
          as={"form"}
          onSubmit={handleSubmit((value) => {
            if (email !== value.email) {
              setEmail(value.email);
              setUsername(value.username);
              try {
                setTimer(null);
                submitHandler(value);
              } catch (err) {
                console.log(err);
                setEmail("");
                setUsername("");
              }
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
                <Text fontSize={"14px"} fontWeight={"400"} color={"gray.500"}>
                  CONNECTED ADDRESS
                </Text>
                <Text fontSize={"14px"} fontWeight={"500"} color={"gray.600"}>
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
                      fontSize={"14px"}
                      type={"text"}
                      placeholder={"Username"}
                      rounded={"sm"}
                      border={"1px solid"}
                      borderColor={"gray.300"}
                      _placeholder={{
                        fontSize: "14px",
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
                      fontSize={"14px"}
                      type={"email"}
                      placeholder={"Email address"}
                      rounded={"sm"}
                      border={"1px solid"}
                      borderColor={"gray.300"}
                      _placeholder={{
                        fontSize: "14px",
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
                      borderColor={"gray.400"}
                      isInvalid={errors.terms ? true : false}
                    >
                      <Text fontSize={"14px"}>
                        I agree to the Mintables{" "}
                        <Link
                          to={""}
                          as={NavLink}
                          onClick={onOpenTerms}
                          color="buttonPrimary"
                        >
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
                timeout={timeout}
                setDeadline={setDeadline}
                setTimer={setTimer}
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
    </>
  );
};

export default AuthModal;
