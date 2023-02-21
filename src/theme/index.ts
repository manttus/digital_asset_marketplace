import { extendTheme } from "@chakra-ui/react";
import breakPoints from "./breakPoints";
import { colorScheme } from "./colors";
import { StepsTheme as Steps } from "chakra-ui-steps";
import { fontSize } from "./fontsSize";

const theme = extendTheme({
  colors: colorScheme,
  breakpoints: breakPoints,
  components: {
    Steps,
  },
  fontSize: fontSize,
});

export default theme;
