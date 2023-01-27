const options = [
  { id: 'gain', text: 'Gain' },
  { id: 'loss', text: 'Loss' },
];

interface IsPositiveFieldType {
  defaultChecked?: 'gain' | 'loss',
}

function IsPositiveField({ defaultChecked = 'loss' }: IsPositiveFieldType) {
  return (
    <fieldset className="mt-4">
      <legend className="sr-only">gain or loss</legend>
      <div className="space-y-4 md:flex sm:items-center sm:space-y-0 sm:space-x-2">
        { options.map(option => (
          <div key={option.id}>
            <label className="block text-sm font-medium text-gray-700 cursor-pointer">
              <input
                value={option.id}
                name="isPositive"
                type="radio"
                defaultChecked={option.id === defaultChecked}
                className="h-4 w-4 mr-2 border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
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
