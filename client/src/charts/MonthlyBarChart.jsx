import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function MonthlyBarChart({ data }) {
  console.log("Monthly Chart Data:", data);

  const chartData = data;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">
        Monthly Analytics
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar dataKey="income" fill="#10b981" />

          <Bar dataKey="expense" fill="#ef4444" />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyBarChart;