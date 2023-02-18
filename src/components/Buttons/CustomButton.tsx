import { Button } from "@chakra-ui/button";
type CustomButtonProps = {
  text?: string;
  onClick?: () => void;
  type: string;
  icon?: any;
  isDisabled?: boolean;
};

const CustomButton = (props: CustomButtonProps) => {
  const type = props.type;
  return (
    <Button
      isDisabled={props.isDisabled}
      minW={"91px"}
      onClick={props.onClick}
      bg={type === "filled" ? "purple.500" : "white"}
      color={type === "filled" ? "white" : "purple.500"}
      shadow={"sm"}
      border={type === "filled" ? "none" : "1px solid"}
      borderColor={type === "filled" ? "none" : "purple.500"}
      fontWeight={"400"}
      fontSize={"sm"}
      leftIcon={props.icon}
      _hover={{
        bg: type === "filled" ? "purple.600" : "cream",
        color: type === "filled" ? "white" : "blackAlpha.800",
      }}
    >
      {props.text && props.text}
    </Button>
  );
};

export default CustomButton;
