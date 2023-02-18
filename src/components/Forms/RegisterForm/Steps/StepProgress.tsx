import { Box, Flex } from "@chakra-ui/react";
import { useSteps } from "chakra-ui-steps";
import { FiClipboard, FiDollarSign, FiUser } from "react-icons/fi";
import CustomButton from "../../../Buttons/CustomButton";
import OtpForm from "../../OtpForm/OtpForm";
import { FormStep1, FormStep3 } from "../RegisterForm";

type StepProgressProps = {
  activeStep: number;
};

const StepProgress = ({ activeStep }: StepProgressProps) => {
  return (
    <Box width="550px" height={"full"}>
      <Flex
        width="100%"
        direction={"column"}
        justify="center"
        alignItems={"center"}
        mt={"40px"}
        gap={16}
      >
        <Flex direction={"column"} height={"350px"} justifyContent={"center"}>
          {activeStep === 0 && <FormStep1 />}
          {activeStep === 1 && (
            <OtpForm
              isLoading={false}
              verificationHandler={(pin: string) => {}}
            />
          )}
          {activeStep === 2 && <FormStep3 />}
        </Flex>
      </Flex>
    </Box>
  );
};

export default StepProgress;
