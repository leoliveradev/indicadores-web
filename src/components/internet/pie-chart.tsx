//   return (
//     <>
//       <ResponsiveContainer width="100%" height={190}>
//         <PieChart>
//           <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={2}>
//             {data.map((entry, i) => (
//               <Cell key={i} fill={entry.color} />
//             ))}
//           </Pie>
//           <RTooltip content={<CustomTooltip />} />
//         </PieChart>
//       </ResponsiveContainer>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
//         {data.map((d, i) => (
//           <span key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#555" }}>
//             <span style={{ width: 10, height: 10, borderRadius: 2, background: d.color, flexShrink: 0 }} />
//             {d.label} <strong>{fmtDec(d.pct, 1)}%</strong>
//           </span>
//         ))}
//       </div>
//     </>
//   );
// }