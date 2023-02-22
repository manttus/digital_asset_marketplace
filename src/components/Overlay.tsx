import { Box } from "@chakra-ui/react";

type OverlayProps = {
  show: boolean;
  children?: JSX.Element;
};

const Overlay = ({ show, children }: OverlayProps) => {
  return show ? (
    <Box
      position={"fixed"}
      w={"100%"}
      h={"100%"}
      top={0}
      left={0}
      display={"flex"}
      flexDirection={"column"}
      background={"buttonHover"}
      zIndex={3}
    >
      {children}
    </Box>
  ) : (
    <></>
  );
};

export default Overlay;
