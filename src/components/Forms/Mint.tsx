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
  Box,
  Stack,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import NormalButton from "../Button/NormalButton";
import { useState } from "react";

type MintProps = {
  mintAsset: (
    name: string,
    description: string,
    image: string,
    category: string,
    type: string
  ) => Promise<void>;
  categories: any;
};

type MintFormType = {
  name: string;
  description: string;
  image: string;
  category: string;
  type: string;
  terms: boolean;
};

const Mint = ({ mintAsset, categories }: MintProps) => {
  const { register, handleSubmit, reset } = useForm<MintFormType>();
  const [image, setImage] = useState<string | null>(null);

  return (
    <Box
      as="form"
      w={"600px"}
      display={"flex"}
      flexDirection={"column"}
      gap={"10"}
      mb={"20"}
      zIndex={2}
      onSubmit={handleSubmit((data) => {
        mintAsset(
          data.name,
          data.description,
          data.image,
          data.category,
          data.type
        );
        reset();
        setImage(null);
      })}
    >
      <HStack spacing={5}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            {...register("name", {
              required: true,
            })}
            type={"text"}
            h={12}
            rounded={"sm"}
            fontWeight={"500"}
            borderColor={"gray.300"}
          />
        </FormControl>
      </HStack>
      <HStack spacing={5}>
        <FormControl isRequired>
          <FormLabel>Type</FormLabel>
          <Select
            h={12}
            rounded={"sm"}
            {...register("type", {
              required: true,
            })}
            fontWeight={"500"}
            borderColor={"gray.300"}
          >
            <option value={""} defaultChecked>
              Select Type
            </option>
            <option value={"GIFS"}>GIF</option>
            <option value={"ART"}>Image</option>
            <option value={"VIDEO"}>Video</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <Select
            h={12}
            rounded={"sm"}
            {...register("category", {
              required: true,
            })}
            fontWeight={"500"}
            borderColor={"gray.300"}
          >
            <option value={""} defaultChecked>
              Select Category
            </option>
            {categories.map((category: any) => {
              return (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </HStack>
      <Stack spacing={6}>
        <FormControl isRequired>
          <FormLabel>Upload </FormLabel>
          <Flex
            position="relative"
            h={16}
            border={"1px dashed"}
            rounded={"sm"}
            px={"5"}
            py={"3"}
          >
            <Box
              display="flex"
              flexDirection="column"
              w={"100%"}
              justifyContent={"center"}
            >
              <Text fontWeight={"500"} fontSize={"16px"}>
                {image ? image : "Attach the preview file *"}
              </Text>
            </Box>
            <Input
              type="file"
              height="100%"
              width="100%"
              position="absolute"
              top="0"
              left="0"
              opacity="0"
              aria-hidden="true"
              {...register("image", {
                required: true,
              })}
              onChange={(e) => {
                const file = e.target.files?.[0];
                setImage(file!.name ? file!.name : null);
              }}
            />
          </Flex>
        </FormControl>
      </Stack>
      <HStack spacing={5}>
        <FormControl isRequired>
          <FormLabel> Description </FormLabel>
          <Textarea
            borderColor={"gray.300"}
            {...register("description", {
              required: true,
            })}
            rounded={"sm"}
          />
        </FormControl>
      </HStack>
      <HStack spacing={5}>
        <FormControl isRequired>
          <Checkbox
            {...register("terms", {
              required: true,
            })}
            borderColor={"gray.400"}
          >
            I agree that checking this shows my acceptance of the{" "}
            <Link color={"buttonPrimary"}>Terms and Conditions .</Link>
          </Checkbox>
        </FormControl>
      </HStack>

      <HStack w={"full"} display={"flex"} justifyContent={"end"}>
        <NormalButton text="Create" width="200px" />
      </HStack>
    </Box>
  );
};

export default Mint;
