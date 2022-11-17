interface IButtonProperties extends React.ComponentProps<'button'> {
  image: string
  amount?: number
}

export const IconButton = (props: IButtonProperties) => {
  const { disabled, onClick, image, amount } = props
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center justify-center py-1 px-2`}
    >
      <img src={image} alt={image} className="w-4 h-4" />
      {amount !== null && (
        <span className="text-xs font-semibold text-gray-darker ml-1">{amount}</span>
      )}
    </button>
  )
}
