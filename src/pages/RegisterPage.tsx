import { Text, Flex, HStack } from "@chakra-ui/react";
import { useState } from "react";
import illustration from "../assets/abstract5.jpg";
import NormalButton from "../components/Button/NormalButton";
import { Step1, Step2, Step3 } from "../components/Forms/Register";
import {
  useRegisterMutation,
  useVerifyMutation,
  useSendMutation,
} from "../features/api/authApi/apiSlice";
import useLocalStorage from "../hooks/useLocalStorage";
import { Data, UserData } from "../types/RegisterPageType";
import { useNavigate } from "react-router-dom";
import useAlert from "../hooks/useAlert";

const initialState: UserData = {
  name: "",
  login: "",
  password: "",
  contact: "",
  country: "",
  address: "",
  zipcode: "",
};

const RegisterPage = () => {
  const [steps, setSteps] = useState<number>(1);
  const [userData, setUserData] = useState<UserData>(initialState);
  const navigate = useNavigate();
  const { setOpen, setErrorState } = useAlert();
  const [register, { isLoading: registerLoading }] = useRegisterMutation();
  const [send, { isLoading }] = useSendMutation();
  const [verify] = useVerifyMutation();

  const stepsHandler = (data: Data) => {
    steps === 1
      ? setUserData((prev) => {
          const cleaned = {
            name: data.first + " " + data.last,
            login: data.user,
            password: data.password,
          };
          return { ...prev, ...cleaned };
        })
      : setUserData((prev) => {
          const cleaned: UserData = {
            contact: data.contact,
            country: data.country,
            address: data.address,
            zipcode: data.zipcode,
          };

          return { ...prev, ...cleaned };
        });
  };

  const sendOtp = async () => {
    try {
      await send({ user: userData.login! }).unwrap();
      setErrorState({
        type: "success",
        message: "OTP Sent",
        action: "SET_MESSAGE",
      });
      setOpen(true);
    } catch (err) {}
  };

  const verifyOtp = async (user: string, otp: string) => {
    try {
      const res = await verify({ user, otp }).unwrap();
      registerUser();
    } catch (err) {
      console.log(err);
    }
  };

  const registerUser = async () => {
    const cleared = {
      user: userData.login,
      username: userData.name,
      pass: userData.password,
    };
    try {
      const res = await register(cleared).unwrap();

      setErrorState({
        type: "success",
        message: "Account Created",
        action: "SET_MESSAGE",
      });
      setOpen(true);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex alignItems={"center"} direction={"column"}>
      <Flex
        bgImage={illustration}
        bgPos={"center"}
        w={"full"}
        height={"140px"}
        top={0}
        position={"absolute"}
      ></Flex>
      <Flex mt={28} justifyContent={"center"}>
        <Text fontSize={"38px"} fontWeight={"bold"}>
          {steps === 1 && "Register"}
          {steps === 2 && "Otp Sent"}
        </Text>
      </Flex>
      <Flex direction={"column"}>
        <Flex
          height={"280px"}
          w={"400px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {steps === 1 && (
            <Step1 submitHandler={stepsHandler} userData={userData} />
          )}
          {/* {steps === 2 && (
            <Step3 submitHandler={stepsHandler} userData={userData} />
          )} */}
          {steps === 2 && (
            <Step2
              verifyOtp={verifyOtp}
              userData={userData}
              resendOtp={sendOtp}
            />
          )}
        </Flex>
        <HStack>
          <NormalButton
            text="Previous"
            onClick={() => {
              setSteps((prev) => prev - 1);
            }}
            type="outline"
            width="50%"
            isDisabled={steps === 1 ? true : false}
          />
          <NormalButton
            text={steps === 2 ? "Register" : "Next"}
            isLoading={steps === 1 ? isLoading : registerLoading}
            onClick={
              steps === 2
                ? registerUser
                : () => {
                    if (
                      steps === 1 &&
                      userData.login &&
                      userData.password &&
                      userData.name
                    ) {
                      steps === 1 && sendOtp();
                      setSteps((prev) => prev + 1);
                    }
                  }
            }
            type="filled"
            width="50%"
          />
        </HStack>
      </Flex>
    </Flex>
  );
};

export default RegisterPage;
