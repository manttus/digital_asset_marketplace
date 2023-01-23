import { extendTheme } from "@chakra-ui/react";
import breakPoints from "./breakPoints";
import { primaryColor } from "./colors";
import { StepsTheme as Steps } from "chakra-ui-steps";

const theme = extendTheme({
  colors: primaryColor,
  breakpoints: breakPoints,
  components: {
    Steps,
  },
});

export default theme;
