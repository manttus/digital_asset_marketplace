import { Button } from "@chakra-ui/react";

type NormalButtonProps = {
  text: string;
  type?: string;
  onClick?: () => void;
  rightIcon?: JSX.Element;
  width?: string;
  bg?: string;
};

const NormalButton = ({
  text,
  type,
  onClick,
  rightIcon,
  width,
  bg,
}: NormalButtonProps) => {
  return (
    <Button
      variant={type}
      color={type === "outline" ? (bg ? bg : "buttonPrimary") : "white"}
      bg={type === "outline" ? "white" : bg ? bg : "buttonPrimary"}
      borderColor={bg ? bg : "buttonPrimary"}
      transition={"all 0.5s ease-in-out"}
      border={"2px"}
      w={width}
      _hover={{
        bg: bg ? bg : "buttonPrimary",
        color: "white",
        transform: "scale(1.05)",
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
