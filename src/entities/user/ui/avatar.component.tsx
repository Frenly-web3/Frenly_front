import type { IAddress } from '@shared/lib'
import React from 'react'

import { useUserAvatar } from '../model/use-user-avatar.hook'

interface IProperties {
  address: IAddress
  className: any
}

export const Avatar = (props: IProperties) => {
  const { address, className } = props

  const [mount, setMount] = React.useState(false)
  React.useEffect(() => setMount(true), [])

  const { data, isLoading } = useUserAvatar({ address })

  if (!mount) return <div className={`${className}`} />

  return (
    <div className={`${className} ${isLoading && ``}`}>
      {data && <img className="rounded-full" src={data} alt="avatar" />}
    </div>
  )
}
