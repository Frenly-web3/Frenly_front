import type { IAddress } from '@shared/lib'
import { shortAddress } from '@shared/lib'
import { BackButtonComponent } from '@shared/ui'
import { useRouter } from 'next/router'
import React from 'react'
import { useEnsAvatar, useEnsName } from 'wagmi'

interface IInfoUploadProperties {
  address: IAddress
}

export const InfoUploadComponent = (props: IInfoUploadProperties) => {
  const { address } = props

  const { data: ensAvatar, isLoading: avatarLoading } = useEnsAvatar({
    address,
  })

  const { data: ensName, isLoading: nameLoading } = useEnsName({
    address,
  })

  const router = useRouter()

  return (
    <>
      <div className="py-2 flex flex-col justify-between">
        <BackButtonComponent onClick={() => router.push('/feed')} />
        <h3
          className={`py-2 z-100 text-xl pr-4 text-heading font-display font-bold m-auto text-center ${
            nameLoading && 'animate-pulse'
          }`}
        >
          {ensName || shortAddress({ address, with0x: true })}
        </h3>
      </div>
      <div className="m-auto mt-3">
        <img
          src={ensAvatar || '/assets/images/temp-avatar.png'}
          className={`align-center rounded-full ${avatarLoading && 'animate-pulse'}`}
          alt="avatar"
          width={96}
          height={96}
        />
      </div>

      <div
        className={`text-base z-100 font-normal text-gray mb-5 text-center m-auto mt-4 w-80 break-words`}
      >
        {address}
      </div>
    </>
  )
}
