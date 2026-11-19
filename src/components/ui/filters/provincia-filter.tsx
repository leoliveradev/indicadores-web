// type Props = {
//   value: string;
//   options: string[];
//   onChange: (value: string) => void;

//   allLabel?: string;
//   allValue?: string;
// };

// export function ProvinciaFilter({
//   value,
//   options,
//   onChange,
//   allLabel = "Argentina",
//   allValue = "Argentina",
// }: Props) {
//   return (
//     <div className="mb-4">
//       <label className="filter-label">
//         Provincia
//       </label>

//       <select
//         className="filter-select"
//         value={value}
//         onChange={(e) =>
//           onChange(e.target.value)
//         }
//       >
//         <option value={allValue}>
//           {allLabel}
//         </option>

//         {options.map((p) => (
//           <option
//             key={p}
//             value={p}
//           >
//             {p}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }