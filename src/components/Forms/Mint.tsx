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
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
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
  isMinting: boolean;
};

type MintFormType = {
  name: string;
  description: string;
  image: string;
  category: string;
  type: string;
  terms: boolean;
};

const Mint = ({ mintAsset, categories, isMinting }: MintProps) => {
  const { register, handleSubmit, reset } = useForm<MintFormType>();
  const [image, setImage] = useState<string | null>(null);
  const {
    isOpen: isOpenTerms,
    onOpen: onOpenTerms,
    onClose: onCloseTerms,
  } = useDisclosure();

  const [selectType, setSelectType] = useState<string[]>([]);

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
            onChange={(e) => {
              if (e.target.value === "GIFS") {
                setSelectType(["image/gif"]);
              } else if (e.target.value === "ART") {
                setSelectType(["image/png", "image/jpeg"]);
              } else if (e.target.value === "VIDEO") {
                setSelectType(["video/mp4"]);
              } else {
                setSelectType([]);
              }
            }}
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
              isDisabled={selectType.length === 0}
              type="file"
              height="100%"
              width="100%"
              position="absolute"
              top="0"
              left="0"
              opacity="0"
              accept={selectType}
              aria-hidden="true"
              display={"hidden"}
              _disabled={{
                cursor: "not-allowed",
                opacity: "0",
              }}
              {...register("image", {
                required: true,
              })}
              onChange={(e) => {
                const file = e.target.files?.[0];
                setImage(file!.name ? file!.name : null);
              }}
              isRequired
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
            <Link color={"buttonPrimary"} onClick={onOpenTerms}>
              Terms and Conditions .
            </Link>
          </Checkbox>
        </FormControl>
      </HStack>

      <Modal
        isCentered
        onClose={onCloseTerms}
        isOpen={isOpenTerms}
        motionPreset="slideInBottom"
        size={"2xl"}
      >
        <ModalOverlay />
        <ModalContent h={"600px"}>
          <ModalHeader
            display={"flex"}
            borderBottom={"1px solid"}
            borderColor={"gray.200"}
            justifyContent={"center"}
          >
            Terms & Conditions
          </ModalHeader>
          <ModalBody
            overflowY={"scroll"}
            sx={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Flex
              direction={"column"}
              textAlign={"justify"}
              alignItems={"center"}
              w={"100%"}
              p={5}
            >
              By accessing or using our services, you agree to comply with the
              following terms and conditions. Our NFT Marketplace provides a
              platform for users to buy, sell, and trade Non-Fungible Tokens
              (NFTs). It is essential to be of legal age in your jurisdiction to
              use our services, and minors must obtain consent from a parent or
              guardian. Please ensure that you keep your account secure and do
              not share your login credentials with others. When listing NFTs
              for sale or auction on our platform, you confirm that you are the
              rightful owner or have the necessary rights to sell the NFT. It is
              your responsibility to provide accurate and complete information
              when creating NFT listings, including a clear description and any
              associated terms and conditions. As a buyer, please conduct your
              own due diligence before purchasing an NFT, as we do not guarantee
              the authenticity, quality, or legality of the NFTs listed on our
              platform. Once a transaction is completed, it is final and cannot
              be reversed or refunded. We expect all users to respect the
              intellectual property rights of others. Do not list or sell NFTs
              that infringe upon copyrights, trademarks, or other intellectual
              property rights. If you believe that your intellectual property
              rights have been violated on our platform, please contact us with
              relevant details for prompt investigation. Engaging in unlawful,
              fraudulent, or deceptive activities on our platform is strictly
              prohibited. Additionally, unauthorized commercial purposes,
              spamming, or malicious activities that may harm the platform or
              other users are not allowed. Any attempts to manipulate or disrupt
              the functioning of our platform or interfere with other users'
              transactions are strictly prohibited. Please be aware that we
              reserve the right to monitor and moderate user-generated content,
              including NFT listings and user communications, on our platform.
              We may remove or take action against any content or user accounts
              that violate these terms or any applicable laws. While we strive
              to provide a secure and reliable platform, we do not guarantee
              uninterrupted access or error-free operations. We shall not be
              liable for any direct, indirect, incidental, consequential, or
              punitive damages arising out of your use or inability to use our
              platform or any transactions conducted on it. We reserve the right
              to modify or update these terms and conditions at any time. We
              will notify users of any significant changes, and continued use of
              our platform constitutes acceptance of the modified terms. These
              terms and conditions shall be governed by and construed in
              accordance with the laws of [Jurisdiction]. Any disputes arising
              out of or related to these terms shall be subject to the exclusive
              jurisdiction of the courts of [Jurisdiction]. Please note that
              these terms and conditions serve as a general guideline. For
              specific legal advice and to ensure compliance, it is recommended
              to consult with a qualified attorney. By using our NFT
              Marketplace, you acknowledge that you have read, understood, and
              agreed to these terms and conditions. We hope you enjoy your
              experience on our platform!
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseTerms}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <HStack w={"full"} display={"flex"} justifyContent={"end"}>
        <NormalButton text="Create" width="200px" isLoading={isMinting} />
      </HStack>
    </Box>
  );
};

export default Mint;
