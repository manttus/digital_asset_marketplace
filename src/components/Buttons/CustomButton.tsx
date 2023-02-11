import { Button } from "@chakra-ui/button";
type CustomButtonProps = {
  text?: string;
  onClick?: () => void;
  type: string;
  icon?: any;
};

const CustomButton = (props: CustomButtonProps) => {
  const type = props.type;
  return (
    <Button
      onClick={props.onClick}
      bg={type === "filled" ? "blackAlpha.800" : "white"}
      color={type === "filled" ? "white" : "blackAlpha.800"}
      shadow={"sm"}
      border={type === "filled" ? "none" : "1px solid black"}
      fontWeight={"400"}
      fontSize={"sm"}
      borderRadius={"xs"}
      leftIcon={props.icon}
      _hover={{
        bg: type === "filled" ? "blackAlpha.900" : "blackAlpha.100",
        color: type === "filled" ? "white" : "blackAlpha.800",
      }}
    >
      {props.text && props.text}
    </Button>
  );
};

export default CustomButton;
