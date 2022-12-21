import { Flex } from "@chakra-ui/react";

import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../features/auth/authSlice";
const HomePage = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const tokenAbbr = `${token.slice(0, 9)}...`;

  return (
    <>
      <Flex height={"40"}>
        <h1> {user && user} </h1>
      </Flex>
      <h2> {tokenAbbr}</h2>
    </>
  );
};

export default HomePage;
