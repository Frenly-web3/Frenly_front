import { UserModelService } from '@entities/user'
import { EndOfPage, Meta } from '@shared/ui'
import { UserProfileWidget } from '@widgets/user-profile'
import { useRouter } from 'next/router'
import React from 'react'

export default function ProfilePage() {
  const {
    query: { id },
  } = useRouter()

  const { user } = UserModelService.useUserInfo({ profileId: id as string })

  console.log(user)

  return (
    <>
      <Meta title={user.role} description="Your profile" />
      <UserProfileWidget profileId={id as string} />

      <EndOfPage page="drafts" />
    </>
  )
}
