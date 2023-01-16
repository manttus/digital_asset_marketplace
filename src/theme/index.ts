import { extendTheme } from "@chakra-ui/react";
import breakPoints from "./breakPoints";
import { primaryColor } from "./colors";

const theme = extendTheme({
  colors: primaryColor,
  breakpoints: breakPoints,
});

export default theme;
