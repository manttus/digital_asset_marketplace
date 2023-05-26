import { Flex, Image } from "@chakra-ui/react";
import image from "../assets/404.svg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { bottomVariants } from "../theme/animation/variants";
import { useEffect } from "react";

const NoPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timeout); // Cleanup the timeout on component unmount
  }, [navigate]);

  return (
    <Flex
      display="flex"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        h="600px"
        direction="column"
        justifyContent="center"
        alignItems="center"
        as={motion.div}
        variants={bottomVariants}
        initial="hidden"
        animate="visible"
      >
        <Image src={image} h="600px" />
      </Flex>
    </Flex>
  );
};

export default NoPage;
