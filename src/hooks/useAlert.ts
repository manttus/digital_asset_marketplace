import { useToast } from "@chakra-ui/react";
import { useEffect, useReducer, useState } from "react";

type InitialState = {
  message: string;
  type: "error" | "success" | "info" | "warning" | null;
};

type ActionType = {
  action: "SET_MESSAGE" | "CLEAR";
  message: string;
  type: "error" | "success" | "info" | "warning" | null;
};

const initialState: InitialState = {
  message: "",
  type: null,
};

const alertRedcuer = (state: InitialState, action: ActionType) => {
  if (action.action === "SET_MESSAGE") {
    return {
      ...state,
      message: action.message,
      type: action.type,
    };
  }

  if (action.action === "CLEAR") {
    return {
      message: "",
      type: null,
    };
  }
  return state;
};

const useAlert = () => {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  const [errorState, setErrorState] = useReducer(alertRedcuer, initialState);
  useEffect(() => {
    if (open) {
      toast({
        title: errorState.message,
        variant: "left-accent",
        status: errorState.type ? errorState.type : "info",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [open]);
  return { setOpen, setErrorState };
};

export default useAlert;
