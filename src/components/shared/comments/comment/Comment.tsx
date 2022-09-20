import Image from 'next/image'
import React from 'react'

export interface IComment{
  avatar:string,
  name:string,
  date:string
}

const Comment = ({avatar, name, date}:IComment) => {
  return (
    <figure className="flex items-center">
    <div className="mr-4 flex items-center border rounded-full border-border-color overflow-hidden">
      <Image src={avatar} alt={name} width={40} height={40} />
    </div>

    <figcaption>
      <div className="text-base font-semibold">{name}</div>
      <div className="text-base font-normal text-gray">{date}</div>
    </figcaption>
  </figure>
  )
}

export default Comment