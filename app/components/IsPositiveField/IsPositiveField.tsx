const options = [
  { id: 'gain', text: 'Gain' },
  { id: 'loss', text: 'Loss' },
];

function IsPositiveField() {
  return (
    <fieldset className="mt-4">
      <legend className="sr-only">gain or loss</legend>
      <div className="space-y-4 md:flex sm:items-center sm:space-y-0 sm:space-x-2">
        { options.map(option => (
          <div key={option.id}>
            <label className="block text-sm font-medium text-gray-700">
              <input
                value={option.id}
                name="isPositive"
                type="radio"
                defaultChecked={option.id === 'loss'}
                className="h-4 w-4 mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              { option.text }
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

export default IsPositiveField;
