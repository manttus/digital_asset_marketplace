import { Flex, Text } from "@chakra-ui/react";

const AboutCard = ({
  image,
  heading,
  text,
  link,
}: {
  image: any;
  heading: string;
  text: string;
  link: string;
}) => {
  return (
    <Flex
      zIndex={4}
      bg={"white"}
      boxShadow={"md"}
      fontSize={"30px"}
      fontWeight={"600"}
      color={"buttonHover"}
      height={"400px"}
      width={"49%"}
      border={"1px solid "}
      borderColor={"gray.200"}
      transition={"all 0.3s ease"}
      _hover={{
        boxShadow: "xl",
        transform: "scale(1.01)",
        transition: "all 0.3s ease",
      }}
    >
      <Flex
        direction={"column"}
        w={"full"}
        alignItems={"center"}
        justifyContent={"space-between"}
        onClick={() => window.open(link, "_blank")}
      >
        <Flex
          bgImage={image}
          height={"280px"}
          scaleY={1.2}
          w={"full"}
          bgPos={"top"}
          bgSize={"cover"}
          borderBottom={"1px solid"}
          borderColor={"gray.200"}
        ></Flex>
        <Flex
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text
            fontSize={"28px"}
            fontWeight={"600"}
            color={"buttonHover"}
            pb={"20px"}
          >
            {heading}
          </Text>
          <Text
            fontSize={"16px"}
            fontWeight={"400"}
            color={"buttonHover"}
            pb={"20px"}
          >
            {text}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AboutCard;
