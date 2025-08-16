import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ChartBProps } from "../interfaces/interfaces";

const ChartB = ({ data, yAxis, xAxis }: ChartBProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%" className="bg-neutral-950">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxis} stroke="#fff" />
        <YAxis stroke="#fff" />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={yAxis}
          name={yAxis}
          fill="#8884d8"
          activeBar={<Rectangle fill="#9984d8" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartB;
