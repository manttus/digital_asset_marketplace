import { Search2Icon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  TableContainer,
} from "@chakra-ui/react";

import { motion } from "framer-motion";
import { bottomVariants } from "../../theme/animation/variants";

const Transactions = () => {
  return (
    <Flex w={"full"} justifyContent={"center"}>
      <Flex
        direction={"column"}
        w={"70%"}
        gap={"10"}
        py={"5"}
        as={motion.div}
        variants={bottomVariants}
        initial={"hidden"}
        animate={"visible"}
      >
        <Flex w={"full"} justifyContent={"space-between"}>
          <Flex w={"400px"}>
            <InputGroup>
              <Input
                type={"text"}
                placeholder="Search Address"
                rounded={"sm"}
              />
              <InputLeftElement children={<Search2Icon color={"gray.400"} />} />
            </InputGroup>
          </Flex>
          <Flex w={"200px"}>
            <Select placeholder="Select option" rounded={"sm"}>
              <option value="option1">Recent </option>
              <option value="option2">Oldest </option>
            </Select>
          </Flex>
        </Flex>
        <Flex w={"full"}>
          <TableContainer w={"full"} display={"flex"} rounded={"sm"}>
            <Table
              variant="simple"
              border={"1px solid"}
              borderColor={"gray.200"}
            >
              <Thead
                bg={useColorModeValue("gray.100", "gray.900")}
                color={"white"}
              >
                <Tr>
                  <Th>Address</Th>
                  <Th>Tx Hash</Th>
                  <Th>Address (Destination)</Th>
                  <Th>Gas Price</Th>
                  <Th>Nonce</Th>
                  <Th>ETH</Th>
                  <Th>Tx Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>25.4</Td>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>25.4</Td>
                  <Td>25.4</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Transactions;
