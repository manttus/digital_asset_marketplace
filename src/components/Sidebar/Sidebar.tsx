import { Flex, Box, Stack, Checkbox, Input } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const Sidebar = () => {
  return (
    <Flex
      w={{ sm: "100%", md: "100%", lg: "20%", xl: "20%" }}
      h={"100%"}
      direction={"column"}
      pl={{ sm: "0", md: "0", lg: "10", xl: "10" }}
      minW={"300px"}
      justifyContent={"center"}
    >
      <Box px={"5px"}>
        <Accordion allowMultiple>
          <AccordionItem py="10px" bg={"white"}>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontWeight={"500"}>
                  Category
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack spacing={5} mt={"5"}>
                <Input borderRadius={"xs"} placeholder={"Search"} />
              </Stack>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem py="10px" bg={"white"}>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontWeight={"500"}>
                  Price
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack spacing={5} mt={"5"}>
                <Input borderRadius={"xs"} placeholder={"Search"} />
              </Stack>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem py="10px" bg={"white"}>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontWeight={"500"}>
                  Properties
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack spacing={5} mt={"5"}>
                <Input borderRadius={"xs"} placeholder={"Search"} />
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Flex>
  );
};

export default Sidebar;
