import { Button, Flex } from "@chakra-ui/react";
import { fontSize } from "../../theme/fontsSize";

type ButtonType = {
  text: string;
  onClick: () => void;
  type: string;
  icon?: JSX.Element;
  fontSize?: string;
};

const CustomButton = ({ text, onClick, type, icon, fontSize }: ButtonType) => {
  return (
    <Flex
      rounded={"32px"}
      onClick={onClick}
      bg={type === "filled" ? "buttonPrimary" : "background"}
      color={type === "filled" ? "white" : "buttonPrimary"}
      fontWeight={"600"}
      height={"50px"}
      fontSize={fontSize ? fontSize : "18px"}
      w={"auto"}
      pl={"20px"}
      pr={icon ? "10px" : "20px"}
      _hover={{
        bg: type === "filled" ? "buttonHover" : "buttonPrimary",
        color: type === "filled" ? "white" : "white",
        transition: "0.3s ease-in-out",
      }}
      cursor={"pointer"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Flex mr={icon ? "15px" : "0"}>{text}</Flex>
      {icon && <Flex>{icon}</Flex>}
    </Flex>
  );
};

export default CustomButton;
