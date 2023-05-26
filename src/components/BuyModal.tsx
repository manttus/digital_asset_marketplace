import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";
import NormalButton from "./Button/NormalButton";
import { BigNumber, ethers } from "ethers";
import { useSelector } from "react-redux";
import { selectCurrentWallet } from "../features/auth/authSlice";
import useCustomToast from "../hooks/useToast";

const BuyModal = ({
  isOpen,
  onClose,
  selected,
  shop,
}: {
  isOpen: boolean;
  onClose: () => void;
  selected: any;
  shop: any;
}) => {
  const { showToast } = useCustomToast();

  const wallet = useSelector(selectCurrentWallet);
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalHeader></ModalHeader>
      <ModalContent>
        <ModalBody display={"flex"} flexDirection={"column"} gap={"4"} py={"5"}>
          <Flex
            bgImage={selected ? selected._token._asset : ""}
            height={"400px"}
            bgPos={"center"}
            bgSize={"cover"}
          ></Flex>
          <NormalButton
            type={"filled"}
            text={`Spend ${parseInt(
              ethers.utils.formatEther(
                selected ? selected._price : BigNumber.from(0)
              )
            )} ETH`}
            onClick={() => {
              if (!wallet) {
                showToast("Wallet not Connected", "error", 2000);
              } else {
                shop._buyToken(selected._token._id, wallet, {
                  value: selected._price,
                });
              }
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BuyModal;
