import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Flex } from "@chakra-ui/react";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  const data = {
    labels: ["Image", "Video", "GIFs"],
    datasets: [
      {
        data: [300, 1100, 100],
        backgroundColor: [
          "rgb(124, 77, 255)", // bluish-purple
          "rgb(74, 112, 255)", // bluish
          "rgb(182, 86, 255)",
        ],
        hoverOffset: 3,
        label: "Mint Type",
      },
    ],
  };

  return (
    <Flex
      py={"5"}
      px={"10"}
      rounded={"sm"}
      boxShadow={"sm"}
      border={"1px solid"}
      borderColor={"gray.200"}
      justifyContent={"center"}
    >
      <Doughnut data={data} title="Mint Types" />
    </Flex>
  );
};

export default DonutChart;
