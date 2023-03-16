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
  const { setItem, value, removeItem } = useLocalStorage("register");
  const [steps, setSteps] = useState<number>(value ? 3 : 1);
  const [userData, setUserData] = useState<UserData>(
    value ? JSON.parse(value) : initialState
  );

  const [register] = useRegisterMutation();
  const [send] = useSendMutation();
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
      removeItem();
    } catch (err) {}
  };

  const verifyOtp = async (user: string, otp: string) => {
    try {
      const res = await verify({ user, otp }).unwrap();
      console.log(res);
      setItem(JSON.stringify(userData));
    } catch (err) {
      console.log(err);
    }
  };

  const registerUser = async () => {
    const cleared = {
      user: userData.login,
      username: userData.name,
      pass: userData.password,
      postal: userData.zipcode,
      address: userData.address,
      country: userData.country,
      contact: userData.contact,
    };
    try {
      const res = await register(cleared).unwrap();
      removeItem();
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
      <Flex mt={28} mb={5} justifyContent={"center"}>
        <Text fontSize={"38px"} fontWeight={"bold"}>
          {steps === 1 && "Create Account"}
          {steps === 2 && "Otp Sent"}
          {steps === 3 && "Complete Account"}
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
          {steps === 2 && <Step2 verifyOtp={verifyOtp} userData={userData} />}
          {steps === 3 && (
            <Step3 submitHandler={stepsHandler} userData={userData} />
          )}
        </Flex>
        <HStack mt={5}>
          <NormalButton
            text="Previous"
            onClick={() => {
              setSteps((prev) => prev - 1);
            }}
            type="outline"
            width="50%"
            isDisabled={steps === 1 || steps === 3}
          />
          <NormalButton
            text={steps === 3 ? "Register" : "Next"}
            onClick={
              steps === 3
                ? registerUser
                : () => {
                    steps === 1 && sendOtp();
                    setSteps((prev) => prev + 1);
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
