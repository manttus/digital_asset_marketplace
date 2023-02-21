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
      type="submit"
      isDisabled={props.isDisabled}
      minW={"76px"}
      onClick={props.onClick}
      bg={type === "filled" ? "purple.500" : "white"}
      color={type === "filled" ? "white" : "black"}
      shadow={"sm"}
      border={type === "filled" ? "none" : "1px solid"}
      borderColor={type === "filled" ? "none" : "gray.400"}
      fontWeight={"bold"}
      fontSize={"sm"}
      dropShadow={"md"}
      rounded={"50px"}
      leftIcon={props.icon}
      _hover={{
        bg: type === "filled" ? "purple.600" : "white",
        color: type === "filled" ? "white" : "black",
      }}
    >
      {props.text && props.text}
    </Button>
  );
};

export default CustomButton;
