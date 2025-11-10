const Table = ({ headers, data, renderRow }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            {headers.map((header, index) => (
              <th key={index} className="text-left text-gray-300 py-3 px-4">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b border-gray-800 hover:bg-gray-800">
              {renderRow(item)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;