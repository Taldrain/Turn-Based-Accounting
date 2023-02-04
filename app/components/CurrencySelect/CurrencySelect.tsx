type CurrencySelectProps = {
  defaultValue: string,
  [x:string]: any,
}

export default function CurrencySelect(props: CurrencySelectProps) {
  const {
    defaultValue,
    ...rest
  } = props;

  return (
    <label className="block text-sm font-medium text-gray-700">
      Currency
      <select
        name="currency"
        required
        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
        defaultValue={defaultValue}
        {...rest}
      >
        <option value="EUR">Euro - €</option>
        <option value="USD">USD - $</option>
      </select>
    </label>
  );
}
