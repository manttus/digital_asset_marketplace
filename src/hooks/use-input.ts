import { Reducer, useReducer } from "react";

interface InitialState {
  value: string;
  isTouched: boolean;
}

const initialState = {
  value: "",
  isTouched: false,
};

interface IssueAction {
  type: string;
  value: string;
}

const inputStateReducer: Reducer<InitialState, IssueAction> = (
  state,
  action
) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }
  return initialState;
};

const useInput = () => {
  const [inputState, dispatchInputState] = useReducer(
    inputStateReducer,
    initialState
  );
};

export default useInput;
