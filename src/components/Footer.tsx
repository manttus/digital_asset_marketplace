import { Flex, Text, Box, Image, Input, Hide } from "@chakra-ui/react";
import NormalButton from "./Button/NormalButton";
import logo from "../assets/logo2.png";
import CustomIconButton from "./Button/CustomIconButton";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectUserData } from "../features/auth/authSlice";
import useCustomToast from "../hooks/useToast";
import { useState } from "react";

const Footer = ({ sendNewsLetter }: { sendNewsLetter: any }) => {
  const [user, setUser] = useState<any>(null);
  const { showToast } = useCustomToast();
  const userData = useSelector(selectUserData);
  const handleSubscribe = async () => {
    try {
      const res = await sendNewsLetter(user).unwrap();
      console.log(res);
      showToast("Subscribed", "success", 2000);
    } catch (err) {
      console.log(err);
      showToast("Failed", "error", 2000);
    }
  };
  return (
    <Flex direction={"column"} zIndex={4}>
      <Flex
        px={"60px"}
        pt={"40px"}
        pb={"25px"}
        direction={{
          sm: "column",
          md: "column",
          lg: "row",
        }}
        gap={{
          sm: "5",
        }}
        borderY={"1px"}
        borderColor={"gray.200"}
        justifyContent={{
          sm: "center",
          md: "center",
          lg: "space-between",
        }}
        alignItems={{
          sm: "center",
          md: "center",
          lg: "space-between",
        }}
      >
        <Flex
          direction={"column"}
          w={{
            sm: "50%",
            md: "80%",
            lg: "20%",
          }}
          gap={12}
          transition={"all 0.5s ease-in-out"}
          textAlign={"justify"}
          lineHeight={"30px"}
          cursor={"pointer"}
          justifyContent={"start"}
          alignItems={{
            sm: "center",
            md: "center",
            lg: "start",
          }}
          marginLeft={"110px"}
        >
          <Box
            as={Flex}
            w={"70px"}
            justifyContent={"end"}
            alignItems={"center"}
            gap={2}
          >
            <Image src={logo} alt="logo" />
            <Text fontSize={"23px"} fontWeight={"600"}>
              Mintables
            </Text>
          </Box>
        </Flex>

        <Flex
          zIndex={3}
          gap={{
            sm: 5,
            md: 5,
            lg: 2,
          }}
          w={{
            sm: "100%",
            md: "100%",
            lg: "60%",
          }}
          textAlign={"justify"}
          lineHeight={"30px"}
          transition={"all 0.5s ease-in-out"}
          cursor={"pointer"}
          justifyContent={{
            sm: "center",
            md: "center",
            lg: "end",
          }}
          alignItems={"center"}
          mt={1}
        >
          <Flex w={"300px"} zIndex={3}>
            <Input
              placeholder="Email Address"
              py={"25px"}
              rounded={"sm"}
              borderColor={"gray.400"}
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
          </Flex>
          <NormalButton
            text="Subscribe"
            type="filled"
            onClick={() => {
              handleSubscribe();
            }}
          />
        </Flex>
      </Flex>
      <Flex
        px={"60px"}
        py={"30px"}
        color={"fontGhost"}
        fontWeight={"500"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Hide below="lg">Copyright © 2022. All right reserved. </Hide>
        <Flex
          alignItems={"center"}
          gap={5}
          w={{
            sm: "100%",
            md: "100%",
            lg: "20%",
          }}
          justifyContent={{
            sm: "center",
            md: "center",
            lg: "end",
          }}
        >
          <Flex gap={4}>
            <CustomIconButton
              icon={<BsTwitter size={"20px"} />}
              aria={"twitter"}
              type={"outline"}
              color={"buttonPrimary"}
              onClick={() => {
                window.location.href = "https://twitter.com";
              }}
            />

            <CustomIconButton
              icon={<BsLinkedin size={"20px"} />}
              aria={"Linkedin"}
              type={"outline"}
              color={"buttonPrimary"}
              onClick={() => {
                window.location.href =
                  "https://www.linkedin.com/in/raymon-basnyat-281382222/";
              }}
            />
            <CustomIconButton
              icon={<BsGithub size={"25px"} />}
              aria={"twitter"}
              type={"outline"}
              color={"buttonPrimary"}
              onClick={() => {
                window.location.href = "https://github.com/manttus";
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
