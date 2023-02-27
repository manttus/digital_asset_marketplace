import { Box, Flex } from "@chakra-ui/react";
import OtpForm from "../../OtpForm/OtpForm";
import { FormStep1, FormStep3 } from "../RegisterForm";

type StepProgressProps = {
  activeStep: number;
  setFormData: (e: any) => void;
  formErrors: (e: boolean) => void;
};

const StepProgress = ({
  activeStep,
  setFormData,
  formErrors,
}: StepProgressProps) => {
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
          {activeStep === 0 && (
            <FormStep1 setFormData={setFormData} formErrors={formErrors} />
          )}
          {/* {activeStep === 1 && <OtpForm isLoading={false} />} */}
          {activeStep === 2 && <FormStep3 />}
        </Flex>
      </Flex>
    </Box>
  );
};

export default StepProgress;
