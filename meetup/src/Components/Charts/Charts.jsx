import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  BarElement,
  Tooltip,
  Legend,
  ArcElement
);

const chartMap = {
  bar: Bar,
  pie: Pie,
};

const Charts = ({ type = "bar", data, options }) => {
  const ChartComponent = chartMap[type];

  if (!ChartComponent) {
    return <p>Unsupported chart type: {type}</p>;
  }

  return (
    <div className=" p-10 mt-1 w-[100%] h-[47%] flex justify-center items-center bg-[smoke-white] rounded-sm">
      <ChartComponent data={data} options={options} />
    </div>
  );
};

export default Charts;
