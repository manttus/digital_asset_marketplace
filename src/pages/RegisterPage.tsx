import { Flex, Hide, Text, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import illustration2 from "../assets/nice.webp";
import StepProgress from "../components/Forms/RegisterForm/Steps/StepProgress";
import CustomButton from "../components/Buttons/CustomButton";
import { useSteps } from "chakra-ui-steps";

const RegisterPage = () => {
  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  const [isSmallerThan900] = useMediaQuery("(max-width: 900px)");

  const rightVariants = {
    hidden: {
      x: 500,
      opacity: 0,
      overflow: "hidden",
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: "30",
        velocity: "0.5",
      },
    },
  };

  const bottomVariants = {
    hidden: {
      y: 500,
      overflow: "hidden",
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: "40",
        velocity: "1",
      },
    },
  };

  return (
    <>
      <Flex
        h={"100vh"}
        overflow={"hidden"}
        direction={{ sm: "column", md: "column", lg: "row", xl: "row" }}
      >
        <Hide below="lg">
          <Flex
            height={"100%"}
            as={motion.div}
            width={"30%"}
            backgroundImage={illustration2}
            backgroundSize={"cover"}
            backgroundRepeat={"no-repeat"}
            backgroundPosition={"center"}
            variants={rightVariants}
            animate={"visible"}
            initial={"hidden"}
            _before={{
              content: '""',
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.3)",
              zIndex: 1,
            }}
          ></Flex>
        </Hide>
        <Flex
          width={{ sm: "100%", md: "100%", lg: "70%", xl: "70%" }}
          height={"100%"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Flex
            p={"10px"}
            mt={"5px"}
            height={"10%"}
            shadow={"sm"}
            alignItems={{
              sm: "center",
              md: "flex-start",
              lg: "center",
              xl: "center",
            }}
            justifyContent={"center"}
            flexDirection={"column"}
            backgroundPosition={"center"}
          >
            <Flex w={"full"} justifyContent={"end"} pr={"4"} gap={2}>
              {
                <CustomButton
                  isDisabled={activeStep === 0}
                  type="outline"
                  text="Prev"
                  onClick={prevStep}
                />
              }
              <CustomButton
                type="filled"
                text={activeStep === 2 ? "Finish" : "Next"}
                onClick={activeStep !== 2 ? nextStep : () => {}}
              ></CustomButton>
            </Flex>
          </Flex>
          <Flex
            as={motion.div}
            height={"60%"}
            variants={bottomVariants}
            animate={"visible"}
            initial={isSmallerThan900 ? "" : "hidden"}
            flexDirection={"column"}
            alignItems={"center"}
            alignContent={"center"}
            justifyContent={"space-between"}
            backgroundImage={{
              sm: illustration2,
              md: illustration2,
              lg: "none",
              xl: "none",
            }}
            backgroundSize={"cover"}
            backgroundPosition={"center"}
            display={isSmallerThan900 ? "none" : "flex"}
          >
            <StepProgress activeStep={activeStep} />
          </Flex>
          <Flex
            as={motion.div}
            height={"80%"}
            variants={bottomVariants}
            animate={isSmallerThan900 ? "visible" : ""}
            initial={"hidden"}
            flexDirection={"column"}
            alignItems={"center"}
            backgroundImage={{
              sm: illustration2,
              md: illustration2,
              lg: "none",
              xl: "none",
            }}
            backgroundSize={"cover"}
            backgroundPosition={"center"}
            display={isSmallerThan900 ? "flex" : "none"}
            _before={{
              content: '""',
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.8)",
              opacity: 0.5,
            }}
          ></Flex>
          <Flex h={"15%"} w={"full"} shadow={"md"} border={"md"}></Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default RegisterPage;
