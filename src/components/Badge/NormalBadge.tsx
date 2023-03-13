import { Button } from "@chakra-ui/react";

type NormalBadge = {
  text: string;
  icon: JSX.Element;
  bg?: string;
  color?: string;
  zindex?: number;
};

const NormalBadge = ({ text, icon, bg, color, zindex }: NormalBadge) => {
  return (
    <Button leftIcon={icon} zIndex={zindex} py={"20px"} px={"10px"}>
      {text}
    </Button>
  );
};

export default NormalBadge;
