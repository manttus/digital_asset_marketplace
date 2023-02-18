import { Flex, Link } from "@chakra-ui/react";
import CustomButton from "./Buttons/CustomButton";

type NavbarProps = {
  metaMaskHandler: () => void;
  wallet: string | null;
};

const Navbar = ({ metaMaskHandler, wallet }: NavbarProps) => {
  return (
    <Flex
      h={"100px"}
      w={"100%"}
      shadow={"sm"}
      justifyContent={"space-between"}
      alignItems={"center"}
      boxShadow={"md"}
      px={"100px"}
    >
      <Flex w={"50%"} gap={10} alignItems={"center"}>
        <Link
          _hover={{
            mb: "5px",
            color: "purple.400",
          }}
        >
          Explore
        </Link>
        <Link
          _hover={{
            mb: "5px",
            color: "purple.400",
          }}
        >
          Marketplace
        </Link>
        <Link
          _hover={{
            mb: "5px",
            color: "purple.400",
          }}
        >
          Archive
        </Link>
      </Flex>
      <Flex w={"50%"} gap={2} justifyContent={"end"}>
        {wallet && <CustomButton type="outlined" text="Mint NFT" />}
        <CustomButton
          isDisabled={wallet ? true : false}
          type="filled"
          text={wallet ? "Connected" : "Connect"}
          onClick={metaMaskHandler}
        />
      </Flex>
    </Flex>
  );
};

export default Navbar;
