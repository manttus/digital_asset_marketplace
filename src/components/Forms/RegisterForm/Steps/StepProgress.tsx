import { Box, Button, Flex, Heading, Progress } from "@chakra-ui/react";
import { useSteps } from "chakra-ui-steps";
import { FiClipboard, FiDollarSign, FiUser } from "react-icons/fi";
import CustomButton from "../../../Buttons/CustomButton";
import OtpForm from "../../OtpForm/OtpForm";
import { FormStep1, FormStep3 } from "../RegisterForm";

const steps = [
  { label: "Signup", icon: FiUser },
  { label: "Verification", icon: FiClipboard },
  { label: "Complete", icon: FiDollarSign },
];

const StepProgress = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  return (
    <Box width="550px" height={"400px"} px={"10"}>
      <Progress value={50} size="xs" colorScheme="purple" />
      {activeStep === steps.length ? (
        <Flex px={4} py={5} width="100%" flexDirection="column">
          <Heading fontSize="xl" textAlign="center">
            Woohoo! All steps completed!
          </Heading>
          <Button mx="auto" mt={6} size="sm" onClick={reset}>
            Reset
          </Button>
        </Flex>
      ) : (
        <Flex
          width="100%"
          direction={"column"}
          justify="center"
          alignItems={"center"}
          mt={"40px"}
          gap={14}
        >
          {activeStep === 0 && <FormStep1 />}
          {activeStep === 1 && (
            <OtpForm
              isLoading={false}
              verificationHandler={(pin: string) => {}}
            />
          )}
          {activeStep === 2 && <FormStep3 />}
          <Flex w={"full"} justifyContent={"end"} pr={"4"} gap={5}>
            {/* <Button
              isDisabled={activeStep === 0}
              mr={4}
              onClick={prevStep}
              size="sm"
              variant="ghost"
            >
              Prev
            </Button> */}
            <CustomButton
              isDisabled={activeStep === 0}
              type="outline"
              text="Prev"
              onClick={prevStep}
            />
            <CustomButton
              type="filled"
              text={activeStep === steps.length - 1 ? "Finish" : "Next"}
              onClick={nextStep}
            ></CustomButton>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default StepProgress;
