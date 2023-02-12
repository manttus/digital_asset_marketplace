import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux/es/exports";
import { BrowserRouter } from "react-router-dom";
import store from "./features/store";
import theme from "./theme/index";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GoogleOAuthProvider clientId="147545828185-69s0ljdrkdsea5vomojdabm79sen24sj.apps.googleusercontent.com">
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </GoogleOAuthProvider>
);
