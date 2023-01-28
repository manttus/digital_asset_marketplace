import { Box, Button, Flex, Heading, Progress } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { FiClipboard, FiDollarSign, FiUser } from "react-icons/fi";
import { FormStep1, FormStep2, FormStep3 } from "../RegisterForm";

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
      <Progress value={20} size="xs" colorScheme="pink" />
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
        <Flex width="100%" justify="flex-end" mt={"40px"}>
          <Button
            isDisabled={activeStep === 0}
            mr={4}
            onClick={prevStep}
            size="sm"
            variant="ghost"
          >
            Prev
          </Button>
          <Button size="sm" onClick={nextStep}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default StepProgress;
