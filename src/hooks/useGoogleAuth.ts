import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useReducer, useState } from "react";
import useHttp from "./useHttp";

type StateType = {
  token: string;
  email: string;
  username: string;
};

type ActionType = {
  type: "SET_CRED" | "CLEAR_CRED" | "SET_TOKEN";
  token: string;
  email: string;
  username: string;
};

type RequestConfigType = {
  url: string;
  method?: string;
  headers?: {
    Authorization: string;
    Accept: string;
  };
};
const initialState: StateType = {
  token: "",
  email: "",
  username: "",
};

const authReducer = (state: StateType, action: ActionType) => {
  if (action.type === "SET_CRED") {
    return {
      ...state,
      email: action.email,
      username: action.username,
    };
  }

  if (action.type === "CLEAR_CRED") {
    return {
      token: "",
      email: "",
      username: "",
    };
  }

  if (action.type === "SET_TOKEN") {
    return {
      ...state,
      token: action.token,
    };
  }

  return state;
};

type returns = {
  oauth: () => void;
  email: string;
  username: string;
  resetState: () => void;
};

const useGoogleAuth = (): returns => {
  const [auth, setAuth] = useReducer(authReducer, initialState);

  const oauth = useGoogleLogin({
    onSuccess: (response) => {
      setAuth({
        type: "SET_TOKEN",
        token: response.access_token,
        email: "",
        username: "",
      });
    },
  });

  type dataHandlerType = { email: string; username: string };
  const dataHandler = (data: dataHandlerType) => {
    setAuth({
      type: "SET_CRED",
      token: "",
      email: data.email,
      username: data.username,
    });
  };
  const resetState = () => {
    setAuth({ type: "CLEAR_CRED", token: "", email: "", username: "" });
  };
  useEffect(() => {
    if (auth.token !== "") {
      const RequestConfig: RequestConfigType = {
        url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${auth.token}`,
        headers: {
          Authorization: `Bearer ${auth.token}`,
          Accept: "application/json",
        },
      };
      const { sendRequest } = useHttp<dataHandlerType>(
        RequestConfig,
        dataHandler
      );
      sendRequest();
    }
  }, [auth.token]);

  return {
    oauth,
    email: auth.email,
    username: auth.username,
    resetState,
  };
};

export default useGoogleAuth;
