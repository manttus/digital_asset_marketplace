import { Box, Link } from "@chakra-ui/react";
import { motion } from "framer-motion";

type CustomLinkProps = {
  text: string;
  to: string;
  size: string;
  color?: string;
  weight?: string;
};

const CustomLink = ({ to, text, size, color, weight }: CustomLinkProps) => {
  return (
    <Link
      href={to}
      position={"relative"}
      as={motion.a}
      fontWeight={weight ? weight : 600}
      fontSize={size}
      color={color ? color : "black"}
      _before={{
        width: "0%",
        position: "absolute",
        height: "2px",
        content: '""',
        bottom: "0",
        left: "0",
        backgroundColor: color ? color : "black",
        transition: "width 0.3s ease-in-out",
      }}
      transition={" transform 0.3s ease-in-out "}
      _hover={{
        _before: {
          width: "100%",
        },
      }}
    >
      {text}
    </Link>
  );
};

export default CustomLink;
