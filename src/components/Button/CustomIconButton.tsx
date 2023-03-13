import { IconButton } from "@chakra-ui/react";

type CustomIconButtonProps = {
  icon: any;
  aria: string;
  onClick: () => void;
  type: string;
  border?: boolean;
  borderColor?: string;
  color?: string;
};

const CustomIconButton = ({
  icon,
  aria,
  onClick,
  type,
  ...rest
}: CustomIconButtonProps) => {
  return (
    <IconButton
      onClick={onClick}
      w={"50px"}
      h={"50px"}
      color={type === "outlined" ? "white" : "buttonPrimary"}
      bg={type === "outlined" ? "transparent" : "background"}
      border={type === "filled" ? "none" : "1px solid"}
      borderColor={type === "filled" ? "buttonPrimary" : rest.color}
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
