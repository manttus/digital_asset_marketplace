import { Button } from "@chakra-ui/react";

type NormalButtonProps = {
  text: string;
  type: string;
  onClick?: () => void;
  rightIcon?: JSX.Element;
};

const NormalButton = ({
  text,
  type,
  onClick,
  rightIcon,
}: NormalButtonProps) => {
  return (
    <Button
      variant={"outline"}
      color={"buttonPrimary"}
      borderColor={"buttonPrimary"}
      transition={"all 0.5s ease-in-out"}
      border={"2px"}
      _hover={{
        bg: type === "outline" && "background",
        transform: "scale(1.05)",
        transition: "all 0.5s ease-in-out",
      }}
      py={"25px"}
      fontSize={"18px"}
      onClick={onClick}
      rightIcon={rightIcon}
    >
      {text}
    </Button>
  );
};

export default NormalButton;
