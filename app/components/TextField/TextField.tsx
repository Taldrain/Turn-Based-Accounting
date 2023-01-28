type TextFieldProps = {
  label: string,
  [x:string]: any,
};

export default function TextField(props : TextFieldProps) {
  const {
    label,
    ...rest
  } = props;

  return (
    <label className="block text-sm font-medium text-gray-700 grow">
      { label }
      <input
        {...rest}
        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
      />
    </label>
  );
};
