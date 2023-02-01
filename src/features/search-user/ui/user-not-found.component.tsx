import * as React from 'react'

export interface IUserNotFoundProperties {}

export function UserNotFound(props: IUserNotFoundProperties) {
  return (
    <div className="flex flex-col items-center mt-6">
      <div className="rounded-full bg-black/5 flex items-center justify-center w-32 aspect-square text-[4rem] mb-4">
        😔
      </div>
      <span className="font-rounded text-2xl font-semibold">fren not found</span>
    </div>
  )
}
