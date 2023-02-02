import { FcGoogle } from "react-icons/fc";
import {
  Flex,
  Hide,
  Text,
  useMediaQuery,
  Link,
  Image,
  Button,
  Center,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import illustration1 from "../assets/register.png";
import LoginForm from "../components/Forms/LoginForm/LoginForm";
import { Link as RouterLink } from "react-router-dom";

const LoginPage = () => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  const [isSmallerThan900] = useMediaQuery("(max-width: 900px)");

  const rightVariants = {
    hidden: {
      x: -400,
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
        <Flex
          width={{ sm: "100%", md: "100%", lg: "40%", xl: "40%" }}
          height={"100%"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Flex
            p={"10px"}
            mt={"5px"}
            height={"15%"}
            alignItems={{
              sm: "center",
              md: "flex-start",
              lg: "center",
              xl: "center",
            }}
            justifyContent={"center"}
            flexDirection={"column"}
            backgroundPosition={"center"}
          ></Flex>
          <Flex
            height={"80%"}
            flexDirection={"column"}
            alignItems={"center"}
            alignContent={"center"}
            justifyContent={"space-around"}
            backgroundImage={{
              sm: illustration1,
              md: illustration1,
              lg: "none",
              xl: "none",
            }}
            backgroundSize={"cover"}
            backgroundPosition={"center"}
            display={isSmallerThan900 ? "none" : "flex"}
          >
            <Flex
              w={"full"}
              justifyContent={"center"}
              alignItems={"center"}
              direction={"column"}
              height={"20%"}
            >
              <Button
                as={motion.button}
                w={"320px"}
                variant={"outline"}
                leftIcon={<FcGoogle />}
                mb={"8"}
                whileHover={{ scale: 1.05 }}
              >
                <Center>
                  <Text fontWeight={"500"} fontSize={"sm"}>
                    Sign in with Google
                  </Text>
                </Center>
              </Button>
              <Text fontSize={"xs"} mb={"5"} color={"grey"}>
                or use phone / email
              </Text>
            </Flex>

            <LoginForm submitHandler={submitHandler} />
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              height={"18%"}
            >
              {/* <Text fontSize={"sm"}>
                New to Mintables ?
                <Link as={RouterLink} to={"/register"} color={"purple.400"}>
                  {" "}
                  Register
                </Link>
              </Text> */}
            </Flex>
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
              sm: illustration1,
              md: illustration1,
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
        </Flex>
        <Hide below="lg">
          <Flex
            height={"100%"}
            as={motion.div}
            width={"60%"}
            backgroundImage={illustration1}
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
      </Flex>
    </>
  );
};

export default LoginPage;
