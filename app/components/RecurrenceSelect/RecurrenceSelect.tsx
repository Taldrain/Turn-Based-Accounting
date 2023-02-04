type RecurrenceSelectProps = {
  defaultValue: string,
  [x:string]: any,
}

function RecurrenceSelect(props: RecurrenceSelectProps) {
  const {
    defaultValue,
    ...rest
  } = props;

  return (
    <label className="block text-sm font-medium text-gray-700">
      Recurrence*
      <select
        name="recurrence"
        required
        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
        defaultValue={defaultValue}
        {...rest}
      >
        <option value="day">Daily</option>
        <option value="week">Weekly</option>
        <option value="month">Monthly</option>
        <option value="year">Yearly</option>
      </select>
    </label>
  );
}

export default RecurrenceSelect;
