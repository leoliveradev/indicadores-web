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

// type Props = {
//   data: {
//     label: string;
//     prepago: number;
//     pospago: number;
//     total: number;
//   }[];
// };

// export function UsoLineChart({
//   data,
// }: Props) {
//   return (
//     <ResponsiveContainer
//       width="100%"
//       height={400}
//     >
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />

//         <XAxis
//           dataKey="label"
//           minTickGap={50}
//         />

//         <YAxis
//           tickFormatter={(v) =>
//             dispValue(Number(v), {
//               format: "compact",
//             })
//           }
//         />

//         <Tooltip />

//         <Legend />

//         <Line
//           dataKey="prepago"
//           stroke="#2563eb"
//           name="Prepago"
//           dot={false}
//         />

//         <Line
//           dataKey="pospago"
//           stroke="#16a34a"
//           name="Pospago"
//           dot={false}
//         />

//         <Line
//           dataKey="total"
//           stroke="#f59e0b"
//           name="Total"
//           dot={false}
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }