function PunctualList({ punctuals }) {
  const headers = [
    'Name',
    'Amount',
  ];

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
              { headers.map(i => (
                <th key={i} scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                  { i }
                </th>
              ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-y-gray-200">
              { punctuals.map((punctual) => (
                <tr key={punctual.id}>
                  <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                    { punctual.name }
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                    { punctual.amount }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PunctualList;
