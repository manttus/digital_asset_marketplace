import { Button, Flex } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState } from "react";

import Landing from "../components/LandingPage/Landing";
import Navbar from "../components/Navbar";

const Marketplace = () => {
  const [loading, setLoading] = useState(true);
  // const loadMarketplaceItems = async () => {
  //   const itemCount = await marketplace._indi();
  //   console.log(itemCount);
  // };

  return (
    <Flex h={"100vh"} direction={"column"}>
      <Navbar />
      <Flex h={"75%"} justifyContent={"center"} alignItems={"center"}>
        {loading ? <Landing /> : <Flex> Awaiting Wallet Connection </Flex>}
      </Flex>
    </Flex>
  );
};

export default Marketplace;
