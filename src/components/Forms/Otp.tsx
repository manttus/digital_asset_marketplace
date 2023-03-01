import { Box, Input, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import NormalButton from "../Button/NormalButton";
import CustomLink from "../Links/CustomLink";

type OtpType = {
  otp: string;
};

type SignInType = {
  type: string;
  pass?: string;
  otp: string;
  user: string;
};

type OtpProps = {
  submitHandler: (data: SignInType) => Promise<void>;
  user: {
    user: string;
    pass: string | null;
    type: string;
  } | null;
  type: string;
};

const Otp = ({ submitHandler, user, type }: OtpProps) => {
  const { register, handleSubmit } = useForm<OtpType>();
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

  return (
    <Box as={"form"} w={"400px"} onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("otp", {
          required: true,
          minLength: { value: 4, message: "Minimum Value 4" },
          maxLength: { value: 4, message: "Maximum Value 4" },
        })}
        placeholder={"Enter OTP"}
        type={"text"}
        py={6}
        px={5}
      />
      <Flex justifyContent={"end"} mt={5}>
        <CustomLink text={"Resend Otp"} size="15px" />
      </Flex>
      <Flex w={"full"} mt={5}>
        <NormalButton
          text="Submit"
          type="filled"
          width="400px"
          fontSize="15px"
        />
      </Flex>
    </Box>
  );
};

export default Otp;
