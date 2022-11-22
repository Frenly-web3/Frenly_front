interface IButtonProperties extends React.ComponentProps<'button'> {
  primary?: boolean
}

export const Button = (props: IButtonProperties) => {
  const { children, primary } = props
  return (
    <button
      {...props}
      className={`w-full rounded-xl ${
        primary ? 'bg-error' : 'bg-main'
      } text-white text-lg py-3 font-semibold z-100`}
    >
      {children}
    </button>
  )
}
