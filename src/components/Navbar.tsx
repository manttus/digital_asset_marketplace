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
      w={"100%"}
      shadow={"sm"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={"30px"}
    >
      <Flex w={"56%"} justifyContent={"space-between"} alignItems={"center"}>
        <Box> </Box>
      </Flex>
      <Flex w={"40%"} justifyContent={"end"}>
        <HStack spacing={3}>
          <CustomIconButton
            icon={<SiTwitter size={"20px"} />}
            aria={"Discord"}
          />
          <CustomIconButton
            icon={<SiDiscord size={"20px"} />}
            aria={"Discord"}
          />
          {wallet ? (
            <CustomButton text={"Mint now"} type="filled" />
          ) : (
            <CustomButton
              onClick={props.metaMaskHandler}
              text={"Connect"}
              type="filled"
            />
          )}
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Navbar;
