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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import NormalButton from "../Button/NormalButton";
import { useEffect, useState } from "react";

type MintProps = {
  mintAsset: (
    name: string,
    description: string,
    image: string,
    price: string,
    category: string,
    type: string
  ) => Promise<void>;
  categories: any;
};

type MintFormType = {
  name: string;
  description: string;
  image: string;
  price: string;
  category: string;
  type: string;
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
      zIndex={2}
      onSubmit={handleSubmit((data) => {
        mintAsset(
          data.name,
          data.description,
          data.image,
          data.price,
          data.category,
          data.type
        );
        reset();
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
          >
            <option value={""} defaultChecked>
              Select Type
            </option>
            <option value={"ART"}>ART</option>
            <option value={"VIDEO"}>VIDEO</option>
            <option value={"GIFS"}>GIFS</option>
          </Select>
        </FormControl>
        {/* <FormControl isRequired>
          <FormLabel>Proposed Price</FormLabel>
          <Input
            {...register("price", {
              required: true,
            })}
            type={"text"}
            h={12}
            rounded={"sm"}
            fontWeight={"500"}
          />
        </FormControl> */}
        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <Select
            h={12}
            rounded={"sm"}
            {...register("category", {
              required: true,
            })}
            fontWeight={"500"}
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
            {...register("description", {
              required: true,
            })}
            rounded={"sm"}
          />
        </FormControl>
      </HStack>

      <HStack w={"full"} display={"flex"} justifyContent={"end"}>
        <NormalButton text="Create" width="200px" />
      </HStack>
    </Box>
  );
};

export default Mint;
