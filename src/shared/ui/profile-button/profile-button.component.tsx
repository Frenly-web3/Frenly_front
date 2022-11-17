import React from 'react'

interface IProfileButtonProperties extends React.ComponentProps<'button'> {}

export const ProfileButton = (props: IProfileButtonProperties) => {
  const { children } = props
  return (
    <button
      className="rounded-full bg-main py-2 text-white text-sm font-semibold w-23 pl-4 pr-4 m-auto mb-8"
      {...props}
    >
      {children}
    </button>
  )
}
