import type { IAddress } from '@shared/lib'
import { shortAddress } from '@shared/lib'
import Link from 'next/link'
import * as React from 'react'
import { useEnsAvatar, useEnsName } from 'wagmi'

export interface ISmallUserCardProperties {
  address: IAddress
}

export function SmallUserCard(props: ISmallUserCardProperties) {
  const { address } = props
  const { data: ensAvatar, isLoading: avatarLoading } = useEnsAvatar({
    address,
  })

  const { data: ensName } = useEnsName({
    address,
  })

  return (
    <Link href={`/profile/${address}`} className="flex items-center p-2">
      <img
        src={ensAvatar || '/assets/images/temp-avatar.png'}
        className={`align-center mr-2 rounded-full ${avatarLoading && 'animate-pulse'}`}
        alt="avatar"
        width={16}
        height={16}
      />
      <div className={`text-base font-normal text-black/40 font-rounded text-center`}>
        {ensName || shortAddress({ address, with0x: true })}
      </div>
    </Link>
  )
}
