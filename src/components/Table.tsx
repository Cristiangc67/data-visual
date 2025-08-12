import type { TableProps } from "../interfaces/interfaces";

const Table = ({ headers, data }: TableProps) => {
  return (
    <div className="mt-8 max-h-screen overflow-y-auto overflow-x-auto rounded-2xl bg-neutral-950  ">
      <table className=" min-w-full border-collapse table-auto bg-neutral-900">
        <thead className="bg-neutral-500 sticky top-0 shadow-sm z-10">
          <tr>
            {headers.map((header, index) => (
              <th
                className="px-6 py-3 text-center text-lg text-nowrap font-semibold text-gray-200 uppercase "
                key={index}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.map((row, index) => (
            <tr
              className="hover:bg-gray-500 text-gray-400 hover:text-black transition-all duration-300"
              key={index}
            >
              {headers.map((header, dataIndex) => (
                <td
                  className="px-5 py-4 whitespace-nowrap text-base "
                  key={dataIndex}
                >
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
