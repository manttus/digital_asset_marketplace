import { IconButton } from "@chakra-ui/react";

type CustomIconButtonProps = {
  icon: any;
  aria: string;
  onClick: () => void;
  type: string;
};

const CustomIconButton = ({
  icon,
  aria,
  onClick,
  type,
}: CustomIconButtonProps) => {
  return (
    <IconButton
      onClick={onClick}
      w={"50px"}
      h={"50px"}
      color={type === "outlined" ? "white" : ""}
      bg={type === "outlined" ? "transparent" : "background"}
      border={type === "filled" ? "none" : "1px solid white"}
      icon={icon}
      aria-label={aria}
      rounded={"32px"}
      _hover={{
        bg: "buttonHover",
        color: "white",
        transition: "0.3s ease-in-out",
      }}
    />
  );
};

export default CustomIconButton;
