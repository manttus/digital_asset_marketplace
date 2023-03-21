import { Button, Flex } from "@chakra-ui/react";

type NormalButtonProps = {
  text: string;
  type?: string;
  onClick?: () => void;
  rightIcon?: JSX.Element;
  width?: string;
  bg?: string;
  fontSize?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  zindex?: number;
  py?: string;
  px?: string;
};

const NormalButton = ({
  text,
  type,
  onClick,
  rightIcon,
  width,
  bg,
  fontSize,
  isLoading,
  isDisabled,
  zindex,
  py,
  px,
}: NormalButtonProps) => {
  return (
    <Button
      type={"submit"}
      variant={type}
      isLoading={isLoading}
      isDisabled={isDisabled}
      zIndex={zindex}
      color={type === "outline" ? (bg ? bg : "buttonPrimary") : "white"}
      bg={type === "outline" ? "transparent" : bg ? bg : "buttonPrimary"}
      borderColor={bg ? bg : "buttonPrimary"}
      transition={"all 0.3s ease-in-out"}
      border={type === "filled" ? "none" : "2px"}
      w={width}
      _hover={{
        bg: bg ? bg : "buttonPrimary",
        color: "white",
        transform: "scale(1.02)",
        transition: "all 0.3s ease-in-out",
      }}
      py={py ? py : "25px"}
      fontSize={fontSize ? fontSize : "18px"}
      onClick={onClick}
      rightIcon={rightIcon}
      justifyContent={"center"}
      gap={1}
    >
      {text}
    </Button>
  );
};

export default NormalButton;
