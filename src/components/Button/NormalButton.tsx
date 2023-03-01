import { Button } from "@chakra-ui/react";

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
}: NormalButtonProps) => {
  return (
    <Button
      variant={type}
      isLoading={isLoading}
      isDisabled={isDisabled}
      color={type === "outline" ? (bg ? bg : "buttonPrimary") : "white"}
      bg={type === "outline" ? "white" : bg ? bg : "buttonPrimary"}
      borderColor={bg ? bg : "buttonPrimary"}
      transition={"all 0.5s ease-in-out"}
      type={"submit"}
      border={"2px"}
      w={width}
      _hover={{
        bg: bg ? bg : "buttonPrimary",
        color: "white",
        transform: "scale(1.02)",
        transition: "all 0.5s ease-in-out",
      }}
      py={"25px"}
      fontSize={"18px"}
      onClick={onClick}
      ringOffset={10}
      rightIcon={rightIcon}
    >
      {text}
    </Button>
  );
};

export default NormalButton;
