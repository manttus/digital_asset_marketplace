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

type UserData = {
  name?: string;
  login?: string;
  password?: string;
  contact?: string;
  state?: string;
  address?: string;
  zipcode?: string;
};

const initialState: UserData = {
  name: "",
  login: "",
  password: "",
  contact: "",
  state: "",
  address: "",
  zipcode: "",
};

const RegisterPage = () => {
  const { setItem, value, removeItem } = useLocalStorage("register");
  const [steps, setSteps] = useState<number>(value ? 3 : 1);
  const [userData, setUserData] = useState<UserData>(
    value ? JSON.parse(value) : initialState
  );
  const error =
    userData.login === "" || userData.password === "" || userData.name === "";
  const [register, { isLoading }] = useRegisterMutation();
  const [send, { isLoading: isSending }] = useSendMutation();
  const [verify, { isLoading: isVerifying, isSuccess: otpVerified }] =
    useVerifyMutation();

  type Data = {
    first?: string;
    last?: string;
    user?: string;
    password?: string;
    confirm?: string;
    contact?: string;
    state?: string;
    address?: string;
    zipcode?: string;
  };

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
            state: data.state,
            address: data.address,
            zipcode: data.zipcode,
          };

          return { ...prev, ...cleaned };
        });
  };

  const sendOtp = async () => {
    try {
      const res = await send({ user: userData.login! }).unwrap();
      console.log(res);
      removeItem();
    } catch (err) {
      console.log(err);
    }
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
    console.log(userData);
    const cleared = {
      user: userData.login,
      username: userData.name,
      pass: userData.password,
      postal: userData.zipcode,
      address: userData.address,
      state: userData.state,
      contact: userData.contact,
    };
    console.log(cleared);
    try {
      const res = await register(cleared).unwrap();
      console.log(res);
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
        height={"130px"}
        top={0}
        position={"absolute"}
      ></Flex>
      <Flex mt={20} mb={5} justifyContent={"center"}>
        <Text fontSize={"38px"} fontWeight={"bold"}>
          {steps === 1 && "Create Account"}
          {steps === 2 && "Verify Account"}
          {steps === 3 && "Complete Account"}
        </Text>
      </Flex>
      <Flex direction={"column"} mb={20}>
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
            isDisabled={(steps === 2 && !otpVerified) || error}
          />
        </HStack>
      </Flex>
    </Flex>
  );
};

export default RegisterPage;
