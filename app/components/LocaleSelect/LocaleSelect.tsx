type LocaleSelectProps = {
  defaultValue: string,
  [x:string]: any,
}

export default function LocaleSelect(props: LocaleSelectProps) {
  const {
    defaultValue,
    ...rest
  } = props;

  return (
    <label className="block text-sm font-medium text-gray-700">
      Locale
      <select
        name="locale"
        required
        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
        defaultValue={defaultValue}
        {...rest}
      >
        <option value="fr-FR">French</option>
        <option value="en-US">English</option>
      </select>
    </label>
  );
}
