import { IconButton } from "@chakra-ui/react";

type CustomIconButtonProps = {
  icon: any;
  aria: string;
};

const CustomIconButton = (props: CustomIconButtonProps) => {
  return (
    <IconButton
      icon={props.icon}
      aria-label={props.aria}
      bg={"white"}
      shadow={"sm"}
      border={"1px"}
      borderColor={"blackAlpha.300"}
      _hover={{
        bg: "blackAlpha.800",
        color: "white",
      }}
    />
  );
};

export default CustomIconButton;
