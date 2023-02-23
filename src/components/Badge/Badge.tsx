import { Box } from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";
const Badge = () => {
  return (
    <Box w={"40px"} height={"20px"} bg={"orange"}>
      <BsDot size={"20px"} />
      40+
    </Box>
  );
};

export default Badge;
