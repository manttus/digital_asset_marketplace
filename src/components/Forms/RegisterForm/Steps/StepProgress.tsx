import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { FiClipboard, FiDollarSign, FiUser } from "react-icons/fi";

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
    <Box width="700px" px="50px">
      <Steps colorScheme={"purple"} activeStep={activeStep}>
        {steps.map(({ label, icon }) => (
          <Step
            label={label}
            key={label}
            icon={icon}
            color={"purple.500"}
          ></Step>
        ))}
      </Steps>
    </Box>
  );
};

export default StepProgress;
