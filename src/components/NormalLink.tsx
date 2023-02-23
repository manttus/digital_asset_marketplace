import { Link } from "@chakra-ui/react";

type NormalLinkType = {
  color: string;
  size?: string;
  text: string;
  to: string;
};

const NormalLink = ({ color, size, text, to }: NormalLinkType) => {
  return (
    <Link
      href={to}
      color={color}
      fontSize={size ? size : "15px"}
      fontWeight={"500"}
    >
      {text}
    </Link>
  );
};

export default NormalLink;
