type ButtonProps = {
  children: React.ReactNode,
  className?: string,
  [x:string]: any,
};

export default function Button(props: ButtonProps) {
  const {
    children,
    className,
    ...rest
  } = props;

  return (
    <button
      className={`uppercase rounded text-xs font-medium px-4 py-2 ${className}`}
      {...rest}
    >
      { children }
    </button>
  );
}
