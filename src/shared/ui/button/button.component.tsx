interface IButtonProperties extends React.ComponentProps<'button'> {
  primary?: boolean
}

export const Button = (props: IButtonProperties) => {
  const { children, primary } = props
  return (
    <button
      {...props}
      className={`w-full rounded-full ${
        primary ? 'bg-error' : 'bg-black'
      } text-white text-lg py-3 font-medium z-100 font-rounded`}
    >
      {children}
    </button>
  )
}
