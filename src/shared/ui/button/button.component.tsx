interface IButtonProperties extends React.ComponentProps<'button'> {}

export const Button = (props: IButtonProperties) => {
  const { children } = props
  return (
    <button
      {...props}
      className="w-full rounded-xl bg-main text-white text-lg py-3 font-semibold z-100"
    >
      {children}
    </button>
  )
}
