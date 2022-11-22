import React from 'react'

interface IInputProperties extends React.ComponentProps<'input'> {}

export const Input = (props: IInputProperties) => {
  const {} = props
  return (
    <div className={`flex rounded-2xl bg-light-gray px-4 py-2 w-full mr-2`}>
      <input
        style={{ background: 'transparent' }}
        className="outline-none w-full"
        {...props}
      />
    </div>
  )
}
