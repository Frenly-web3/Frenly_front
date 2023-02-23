import type { IAddress } from '@shared/lib'
import { useUserName } from '@shared/lib'
import { Meta } from '@shared/ui'
import { useChangeAddress } from '@widgets/change-address'
import { Layout } from '@widgets/layout'
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

  useChangeAddress()

  if (!isAddress(address)) return <>Error</>

  return (
    <Layout title="profile">
      <Meta title={`${name} on frenly`} description={`${name}'s profile on frenly`} />
      <div className="lg:mr-64">
        <UserProfileWidget address={address} />
      </div>
    </Layout>
  )
}
