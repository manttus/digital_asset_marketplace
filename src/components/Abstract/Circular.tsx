import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

type CircularProps = {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  borderColor?: string;
  zIndex?: number;
};

const Circular = ({
  top,
  left,
  right,
  bottom,
  borderColor,
  zIndex,
}: CircularProps) => {
  return (
    <Box
      as={motion.div}
      w={"600px"}
      h={"600px"}
      top={top ? top : "0"}
      left={left ? left : "0"}
      right={right ? right : "0"}
      bottom={bottom ? bottom : "0"}
      position={"absolute"}
      border={"1px dashed"}
      borderColor={borderColor ? borderColor : "gray.300"}
      rounded={"500px"}
      zIndex={zIndex ? zIndex : 1}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        w={"400px"}
        h={"400px"}
        border={"1px dashed"}
        borderColor={borderColor ? borderColor : "gray.300"}
        rounded={"500px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        zIndex={1}
      >
        <Box
          w={"200px"}
          h={"200px"}
          border={"1px dashed"}
          borderColor={borderColor ? borderColor : "gray.300"}
          rounded={"500px"}
          zIndex={1}
        ></Box>
      </Box>
    </Box>
  );
};

export default Circular;
