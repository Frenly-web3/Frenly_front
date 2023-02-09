import { UserCard } from '@entities/user'
import type { IAddress } from '@shared/lib'
import React from 'react'

interface IInfoUploadProperties {
  address: IAddress
}

export const InfoUploadComponent = (props: IInfoUploadProperties) => {
  const { address } = props
  return (
    <>
      <UserCard address={address} />
    </>
  )
}
