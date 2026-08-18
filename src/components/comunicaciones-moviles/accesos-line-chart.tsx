// "use client";

// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
// } from "recharts";

// import { dispValue } from "@/lib/format";

// type DataPoint = {
//   label: string;
//   prepago: number;
//   pospago: number;
//   operativos: number;
// };

// export function AccesosLineChart({
//   data,
// }: {
//   data: DataPoint[];
// }) {
//   return (
//     <ResponsiveContainer
//       width="100%"
//       height={420}
//     >
//       <LineChart data={data}>
//         <CartesianGrid
//           strokeDasharray="3 3"
//         />

//         <XAxis
//           dataKey="label"
//           minTickGap={50}
//         />

//         <YAxis
//           tickFormatter={(value) =>
//             dispValue(Number(value), {
//               format: "compact",
//             })
//           }
//         />

//         <Tooltip />

//         <Legend />

//         <Line
//           dataKey="prepago"
//           name="Prepago"
//           stroke="#2563eb"
//           strokeWidth={3}
//           dot={false}
//         />

//         <Line
//           dataKey="pospago"
//           name="Pospago"
//           stroke="#16a34a"
//           strokeWidth={3}
//           dot={false}
//         />

//         <Line
//           dataKey="operativos"
//           name="Operativos"
//           stroke="#f59e0b"
//           strokeWidth={3}
//           dot={false}
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }