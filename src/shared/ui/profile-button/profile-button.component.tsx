import React from 'react'

interface IProfileButtonProperties extends React.ComponentProps<'button'> {}

export const ProfileButton = (props: IProfileButtonProperties) => {
  const { children } = props
  return (
    <button
      className="rounded-full flex items-center bg-main py-2 text-white text-sm font-semibold font-rounded w-23 pl-4 pr-4 m-auto mb-8"
      {...props}
    >
      <span className="text-white/60 mr-2">+</span> <>{children}</>
    </button>
  )
}
