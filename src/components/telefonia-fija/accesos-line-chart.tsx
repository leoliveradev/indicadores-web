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
//   hogares: number;
//   comercial: number;
//   gobierno: number;
//   otros: number;
//   total: number;
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
//         <CartesianGrid strokeDasharray="3 3" />

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
//           dataKey="total"
//           name="Total"
//           stroke="#005297"
//           strokeWidth={3}
//           dot={false}
//         />

//         <Line
//           dataKey="hogares"
//           name="Hogares"
//           stroke="#0ea5e9"
//           strokeWidth={2}
//           dot={false}
//         />

//         <Line
//           dataKey="comercial"
//           name="Comercial"
//           stroke="#E74242"
//           strokeWidth={2}
//           dot={false}
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }