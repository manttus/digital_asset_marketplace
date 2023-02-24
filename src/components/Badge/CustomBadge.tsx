import { Flex } from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";

type CustomBadgeProps = {
  text: string;
  color: string;
  bg: string;
};

const CustomBadge = ({ text, color, bg }: CustomBadgeProps) => {
  return (
    <Flex
      height={"20px"}
      bg={bg}
      px={"12px"}
      py={"15px"}
      justifyContent={"center"}
      alignItems={"center"}
      rounded={"20px"}
      fontSize={"15px"}
      fontWeight={"700"}
      cursor={"pointer"}
      color={color}
      gap={1}
    >
      <BsDot transform={"scale(3)"} />
      {text}
    </Flex>
  );
};

export default CustomBadge;
