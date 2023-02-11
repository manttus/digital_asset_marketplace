import { IconButton } from "@chakra-ui/react";

type CustomIconButtonProps = {
  icon: any;
  aria: string;
};

const CustomIconButton = (props: CustomIconButtonProps) => {
  return (
    <IconButton
      mr={"3"}
      icon={props.icon}
      aria-label={props.aria}
      borderRadius={"xs"}
      bg={"white"}
      shadow={"sm"}
      border={"1px"}
      borderColor={"blackAlpha.400"}
      _hover={{
        bg: "blackAlpha.800",
        color: "white",
      }}
    />
  );
};

export default CustomIconButton;
