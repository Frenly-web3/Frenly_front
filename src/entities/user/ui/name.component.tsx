import type { IAddress } from '@shared/lib'
import React from 'react'

import { useUserName } from '../model'

interface IProperties {
  address: IAddress
  className: any
}

export const Name = (props: IProperties) => {
  const { address, className } = props

  const { data, isLoading } = useUserName({ address })

  return (
    // eslint-disable-next-line sonarjs/no-nested-template-literals
    <div className={`flex ${className} ${isLoading && ``}`}>
      <div>{data.slice(-4) != '.eth' && '0x'}</div>
      {data}
    </div>
  )
}
