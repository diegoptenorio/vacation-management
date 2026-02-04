interface TableProps {
  header: string[];
  body: string[][];
}

export default function Table({ header, body }: TableProps) {
  return (
    <table className="w-full text-left">
      <thead>
        <tr>
          {header.map((title, index) => (
            <th className="py-2 text-[#555555]" key={index}>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-t border-[#DDCBEC]">
            {row.map((value, cellIndex) => (
              <td key={cellIndex} className="py-2 text-[#555555]">
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
