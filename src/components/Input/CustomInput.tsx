import { Input } from "@chakra-ui/react";

type CustomInputType = {
  type: string;
  placeholder?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
  register?: any;
};

const CustomInput = ({ type, ...rest }: CustomInputType) => {
  return (
    <Input
      {...rest.register}
      padding={"20px"}
      w={"100%"}
      type={type}
      placeholder={rest.placeholder}
    />
  );
};

export default CustomInput;
