import { useUserName } from '@entities/user'
import type { IAddress } from '@shared/lib'
import { Meta } from '@shared/ui'
import { UserProfileWidget } from '@widgets/user-profile'
import { isAddress } from 'ethers/lib/utils'
import { useRouter } from 'next/router'
import React from 'react'

export default function ProfilePage() {
  const router = useRouter()
  const { query } = router
  const { slug } = query
  const address = slug as IAddress
  const { data: name } = useUserName({ address })

  if (!isAddress(address)) return <>Error</>

  return (
    <>
      <Meta title={`${name} on frenly`} description={`${name}'s profile on frenly`} />
      <UserProfileWidget address={address} />
    </>
  )
}
