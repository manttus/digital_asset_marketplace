import {
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Textarea,
  Text,
  Select,
} from "@chakra-ui/react";
import NormalButton from "../Button/NormalButton";

const Mint = () => {
  return (
    <Flex direction={"column"} gap={"10"}>
      <HStack spacing={5}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input type={"text"} h={12} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <Select h={12}>
            <option value={""} defaultChecked>
              Select Category
            </option>
            <option value={"Bored APE"}>Bored APE</option>
            <option value={"Bored APE"}>Bored APE</option>
            <option value={"Bored APE"}>Bored APE</option>
          </Select>
        </FormControl>
      </HStack>
      <HStack spacing={5}>
        <FormControl isRequired>
          <FormLabel>Type</FormLabel>
          <Select h={12}>
            <option value={""} defaultChecked>
              Select Type
            </option>
            <option value={"Bored APE"}>ART</option>
            <option value={"Bored APE"}>VIDEO</option>
            <option value={"Bored APE"}>GIFS</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Proposed Price</FormLabel>
          <Input type={"text"} h={12} />
        </FormControl>
      </HStack>
      <HStack spacing={5}>
        <FormControl isRequired>
          <FormLabel> Description </FormLabel>
          <Textarea />
        </FormControl>
      </HStack>
      <HStack spacing={5}>
        <Flex alignItems={"center"} gap={5}>
          <Checkbox />
          <Text textAlign={"justify"} fontWeight={"500"}>
            Click here to indicate that you have read & agree to the terms in
            the Privacy Policy agreement.
          </Text>
        </Flex>
      </HStack>
      <HStack w={"full"} display={"flex"} justifyContent={"start"}>
        <NormalButton text="Create NFT" width="300px" />
      </HStack>
    </Flex>
  );
};

export default Mint;
