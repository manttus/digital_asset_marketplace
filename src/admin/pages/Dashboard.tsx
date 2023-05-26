import {
  Flex,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  TableContainer,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { CircularProgress } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import { motion } from "framer-motion";
import { bottomVariants } from "../../theme/animation/variants";
import DonutChart from "../components/charts/Donut";
import { useGetStatsQuery } from "../../features/api/authApi/apiSlice";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { data, isLoading, isError } = useGetStatsQuery();
  console.log(data);
  const [ethAmount, setEthAmount] = useState<any>("");
  const [totalMint, setTotalMint] = useState<any>("");

  const [temp, setTemp] = useState<any>([]);
  useEffect(() => {
    if (data) {
      setTemp(data.transactions);
    }
  }, [data]);

  const searchHandler = (e: any) => {
    const value = e.target.value;
    const filtered = data.transactions.filter((item: any) => {
      return item.senderAddress.toLowerCase().includes(value.toLowerCase());
    });
    console.log(filtered);
    setTemp(filtered);
  };

  const count = () => {
    let eth = 0;
    let mints = 0;
    data.transactions.forEach((item: any) => {
      eth += item.ethAmount;
    });

    data!.transactions.forEach((item: any) => {
      if (item.ethAmount !== 0) {
        eth += item.ethAmount;
      }
    });
    setEthAmount(eth);
    setTotalMint(mints);
  };

  useEffect(() => {
    if (data) {
      count();
    }
  }, [data]);

  if (isLoading) {
    return (
      <Flex justifyContent={"center"} height={"80vh"} alignItems={"center"}>
        <CircularProgress isIndeterminate color="buttonHover" />
      </Flex>
    );
  }

  return (
    <Flex>
      <Flex
        mx="auto"
        gap={10}
        direction={"column"}
        as={motion.div}
        variants={bottomVariants}
        initial={"hidden"}
        animate={"visible"}
        py={14}
        w={"full"}
      >
        <Flex gap={16} w={"full"} justifyContent={"center"}>
          <Box
            py={"5"}
            px={"10"}
            rounded={"sm"}
            boxShadow={"sm"}
            border={"1px solid"}
            display={"flex"}
            borderColor={"gray.200"}
            w={"200px"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"sm"} fontWeight={"bold"} color={"gray.500"}>
              Minted
            </Text>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              {data.totalTransactions}
            </Text>
          </Box>

          <Box
            py={"5"}
            px={"10"}
            rounded={"sm"}
            boxShadow={"sm"}
            border={"1px solid"}
            borderColor={"gray.200"}
            display={"flex"}
            w={"200px"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"md"} fontWeight={"bold"} color={"gray.500"}>
              Users
            </Text>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              {data.totalUsers}
            </Text>
          </Box>

          <Box
            py={"5"}
            px={"10"}
            rounded={"sm"}
            boxShadow={"sm"}
            border={"1px solid"}
            borderColor={"gray.200"}
            display={"flex"}
            w={"200px"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"md"} fontWeight={"bold"} color={"gray.500"}>
              Category
            </Text>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              {data.totalCategories[0].count}
            </Text>
          </Box>

          <Box
            py={"5"}
            px={"10"}
            rounded={"sm"}
            boxShadow={"sm"}
            border={"1px solid"}
            display={"flex"}
            borderColor={"gray.200"}
            w={"200px"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"md"} fontWeight={"bold"} color={"gray.500"}>
              Transactions
            </Text>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              {data.totalTransactions}
            </Text>
          </Box>

          <Box
            py={"5"}
            px={"10"}
            rounded={"sm"}
            boxShadow={"sm"}
            border={"1px solid"}
            display={"flex"}
            borderColor={"gray.200"}
            w={"200px"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"md"} fontWeight={"bold"} color={"gray.500"}>
              Ethereum
            </Text>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              {data.totalAmountInEth}
            </Text>
          </Box>
        </Flex>
        <Flex justifyContent={"center"} w={"full"}>
          {/* <DonutChart /> */}
          {/* <UserStatusChart /> */}
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
                      onChange={(e) => {
                        searchHandler(e);
                      }}
                    />
                    <InputLeftElement
                      children={<Search2Icon color={"gray.400"} />}
                    />
                  </InputGroup>
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
                      {temp.map((transaction: any) => (
                        <Tr key={transaction.id}>
                          <Td>{transaction.senderAddress}</Td>
                          <Td>{transaction.txHash}</Td>
                          <Td>{transaction.receiverAddress}</Td>
                          <Td>{transaction.gasPrice}</Td>
                          <Td>{transaction.nonce}</Td>
                          <Td>{transaction.ethAmount}</Td>
                          <Td>{transaction.createdAt.split("T")[0]}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
