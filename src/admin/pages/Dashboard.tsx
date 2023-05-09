import {
  Flex,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import { useState } from "react";

import { motion } from "framer-motion";
import { bottomVariants } from "../../theme/animation/variants";

const Dashboard = () => {
  const [data, setData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "User Signup Growth",
        data: [10, 20, 30, 40, 50, 60, 70],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  });
  return (
    <Flex>
      <Flex
        mx="auto"
        gap={10}
        as={motion.div}
        variants={bottomVariants}
        initial={"hidden"}
        animate={"visible"}
        py={14}
      >
        <Box
          py={"5"}
          px={"10"}
          rounded={"sm"}
          boxShadow={"sm"}
          border={"1px solid"}
          borderColor={"gray.200"}
        >
          <StatGroup>
            <Stat>
              <StatLabel>Sent</StatLabel>
              <StatNumber>345,670</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </StatGroup>
        </Box>
        <Box
          py={"5"}
          px={"10"}
          rounded={"sm"}
          boxShadow={"sm"}
          border={"1px solid"}
          borderColor={"gray.200"}
        >
          <StatGroup>
            <Stat>
              <StatLabel>Sent</StatLabel>
              <StatNumber>345,670</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </StatGroup>
        </Box>
        <Box
          py={"5"}
          px={"10"}
          rounded={"sm"}
          boxShadow={"sm"}
          border={"1px solid"}
          borderColor={"gray.200"}
        >
          <StatGroup>
            <Stat>
              <StatLabel>Sent</StatLabel>
              <StatNumber>345,670</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </StatGroup>
        </Box>
        <Box
          py={"5"}
          px={"10"}
          rounded={"sm"}
          boxShadow={"sm"}
          border={"1px solid"}
          borderColor={"gray.200"}
        >
          <StatGroup>
            <Stat>
              <StatLabel>Sent</StatLabel>
              <StatNumber>345,670</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </StatGroup>
        </Box>
        <Box
          py={"5"}
          px={"10"}
          rounded={"sm"}
          boxShadow={"sm"}
          border={"1px solid"}
          borderColor={"gray.200"}
        >
          <StatGroup>
            <Stat>
              <StatLabel>Sent</StatLabel>
              <StatNumber>345,670</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </StatGroup>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
