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
    <Flex direction={"column"}>
      {loading ? <Landing /> : <Flex> Awaiting Wallet Connection </Flex>}
    </Flex>
  );
};

export default Marketplace;
