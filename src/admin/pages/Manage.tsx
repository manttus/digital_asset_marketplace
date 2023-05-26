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
import NormalButton from "../../components/Button/NormalButton";
import {
  useDisableUserMutation,
  useGetUsersMutation,
} from "../../features/api/authApi/apiSlice";
import { useEffect, useState } from "react";
import useCustomToast from "../../hooks/useToast";

const Manage = () => {
  const [getUser] = useGetUsersMutation();
  const [disable] = useDisableUserMutation();
  const [users, setUsers] = useState<any>([]);
  const [temp, setTemp] = useState<any>([]);
  const { showToast } = useCustomToast();
  const fetchUserData = async () => {
    try {
      const response = await getUser().unwrap();
      setUsers(response.user);
      setTemp(response.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const disableAccount = async (id: string) => {
    try {
      const response = await disable({
        id,
      }).unwrap();
      showToast("Status Changed", "success", 2000);
      fetchUserData();
    } catch (error) {
      console.log(error);
      showToast("Error Disabling Account", "error", 2000);
    }
  };

  const search = (e: any) => {
    const value = e.target.value;
    if (value === "") {
      setTemp(users);
    } else {
      const filtered = users.filter((user: any) => {
        return (
          user.username.toLowerCase().includes(value.toLowerCase()) ||
          user.email.toLowerCase().includes(value.toLowerCase())
        );
      });
      setTemp(filtered);
    }
  };

  const sort = (e: any) => {
    const value = e.target.value;
    if (value === "recent") {
      const sorted = [...users].sort((a: any, b: any) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      setUsers(sorted);
    } else {
      const sorted = [...users].sort((a: any, b: any) => {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
      setUsers(sorted);
    }
  };

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
                placeholder="Search Address or Username"
                rounded={"sm"}
                onChange={search}
              />
              <InputLeftElement children={<Search2Icon color={"gray.400"} />} />
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
                  <Th>Email Address</Th>
                  <Th>Address (Wallet)</Th>
                  <Th>Username </Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {temp.map((user: any) => {
                  const address =
                    user.address.slice(0, 10) + "..." + user.address.slice(-10);
                  return (
                    <Tr key={user._id}>
                      <Td>{user.email}</Td>
                      <Td>{user.address}</Td>
                      <Td>{user.username}</Td>
                      <Td>
                        {!user.isDisabled ? (
                          <NormalButton
                            text="Disable"
                            type="filled"
                            width="100px"
                            fontSize="16"
                            py={"1px"}
                            onClick={() => {
                              disableAccount(user._id);
                            }}
                          />
                        ) : (
                          <NormalButton
                            text="Enable"
                            bg="green.500"
                            type="filled"
                            width="100px"
                            fontSize="16"
                            py={"1px"}
                            onClick={() => {
                              disableAccount(user._id);
                            }}
                          />
                        )}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Manage;
