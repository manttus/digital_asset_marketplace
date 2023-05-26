import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Flex } from "@chakra-ui/react";

// ChartJS.register(ArcElement, Tooltip, Legend);

const UserStatusChart = () => {
  const data = {
    labels: ["Disabled", "Enabled"],
    datasets: [
      {
        label: "User Status",
        data: [1, 0], // Replace with the actual counts of disabled and enabled users
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)", // Red color with opacity
          "rgba(54, 162, 235, 0.5)", // Blue color with opacity
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Solid red border color
          "rgba(54, 162, 235, 1)", // Solid blue border color
        ],
        borderWidth: 1, // Width of the border
      },
    ],
  };

  return (
    <div>
      <h2>User Status Chart</h2>
      <Bar data={data} />
    </div>
  );
};

export default UserStatusChart;
