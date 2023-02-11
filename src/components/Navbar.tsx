import { Box, Flex, Link, HStack } from "@chakra-ui/react";
import CustomButton from "./Buttons/CustomButton";
import { useState } from "react";
import { SiDiscord, SiTwitter } from "react-icons/si";
import CustomIconButton from "./Buttons/CustomIconButton";

type NavbarProps = {
  metaMaskHandler: () => void;
};

const Navbar = (props: NavbarProps) => {
  const [wallet, setWallet] = useState<string | null>(null);

  return (
    <Flex
      h={"70px"}
      shadow={"sm"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Flex
        ml={"10"}
        w={"56%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box> Logo</Box>
        <HStack spacing={6}>
          <Link type="filled" color={"blackAlpha.600"} fontWeight={"500"}>
            Home
          </Link>
          <Link type="filled" fontWeight={"500"}>
            Gallery
          </Link>
          <Link type="filled" color={"blackAlpha.600"} fontWeight={"500"}>
            Explore
          </Link>
          <Link type="filled" color={"blackAlpha.600"} fontWeight={"500"}>
            Inventory
          </Link>
        </HStack>
      </Flex>
      <Flex mr={"10"} w={"25%"} justifyContent={"flex-end"}>
        <CustomIconButton icon={<SiTwitter size={"20px"} />} aria={"Discord"} />
        <CustomIconButton icon={<SiDiscord size={"20px"} />} aria={"Discord"} />
        {wallet ? (
          <CustomButton text={"Mint now"} type="filled" />
        ) : (
          <CustomButton
            onClick={props.metaMaskHandler}
            text={"Connect"}
            type="filled"
          />
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
