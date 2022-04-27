import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const Graphic = (props) => {
  const barChartData = {
    labels: ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"],
    datasets: [
      {
        data: props.budget,
        label: "Budget",
        borderColor: "#3333ff",
        backgroundColor: "rgba(0, 0, 255, 0.5)",
        fill: true
      },
      {
        data: props.recover,
        label: "Recover",
        borderColor: "#ff3333",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        fill: true
      }
    ]
  };

  const barChart = (
    <Bar
      type="bar"
      width={130}
      height={50}
      options={{
        title: {
          display: true,
          text: "Recovery Quarters",
          fontSize: 15
        },
        legend: {
          display: true, //Is the legend shown?
          position: "top" //Position of the legend.
        }
      }}
      data={barChartData}
    />
  );
  return barChart;
};

export default Graphic;