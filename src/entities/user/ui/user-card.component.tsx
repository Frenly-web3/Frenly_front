import { Tooltip } from '@mantine/core'
import type { IAddress } from '@shared/lib'
import { shortAddress } from '@shared/lib'
import React, { useState } from 'react'
import { useEnsAvatar, useEnsName } from 'wagmi'

interface IUserCardProperties {
  address: IAddress
}

export const UserCard = (props: IUserCardProperties) => {
  const { address } = props

  const { data: ensAvatar, isLoading: avatarLoading } = useEnsAvatar({
    address,
  })

  const { data: ensName, isLoading: nameLoading } = useEnsName({
    address,
  })

  const [opened, setOpened] = useState(false)

  const copyHandler = () => {
    navigator.clipboard.writeText(address)
    setOpened(true)
    setTimeout(() => setOpened(false), 2000)
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {/* <div className="py-2 flex flex-col justify-between ">
        <BackButtonComponent onClick={() => router.push('/feed')} />
      </div> */}

      <img
        src={ensAvatar || '/assets/images/temp-avatar.png'}
        className={`align-center rounded-full mb-4 ${avatarLoading && 'animate-pulse'}`}
        alt="avatar"
        width={128}
        height={128}
      />

      {ensName && (
        <div
          className={`text-2xl mb-2 font-semibold text-black font-rounded text-center`}
        >
          {ensName}
        </div>
      )}
      <Tooltip label="copied" opened={opened}>
        <button
          onClick={copyHandler}
          className="bg-[#00000010] rounded-full py-1 px-2 text-[#00000080] text-base text-center font-medium max-w-[8rem]"
        >
          {shortAddress({ address, with0x: true })}
        </button>
      </Tooltip>
    </div>
  )
}
