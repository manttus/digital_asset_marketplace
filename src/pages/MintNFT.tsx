import Navbar from "../components/Navbar";
import MintForm from "../components/Forms/MintForm/MintForm";
import { Flex } from "@chakra-ui/layout";

const MintNFT = (props: any) => {
  const mintHandler = async () => {};
  return (
    <Flex h={"100vh"} direction={"column"}>
      <Navbar metaMaskHandler={props.connectWallet} account={props.account} />
      <MintForm
        mintHandler={mintHandler}
        marketplace={props.marketplace}
        nft={props.nft}
      />
    </Flex>
  );
};

export default MintNFT;
