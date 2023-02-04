import TextField from '~/components/TextField';

type EmailFieldProps = {
  defaultValue: string | null | undefined,
  [x:string]: any,
};

export default function EmailField(props: EmailFieldProps) {
  const {
    defaultValue,
    ...rest
  } = props;

  return (
    <TextField
      label="Email address*"
      name="email"
      type="email"
      required
      autoComplete="email"
      defaultValue={defaultValue}
      {...rest}
    />
  );
}
