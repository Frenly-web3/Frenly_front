// eslint-disable-next-line boundaries/element-types, import/no-cycle
import { Avatar } from '@entities/user'
import Link from 'next/link'
import { useAccount } from 'wagmi'

import { Meta } from '../meta'

interface IProperties {
  title: string
  avatar?: boolean
  children: React.ReactNode
}

export const Layout = (props: IProperties) => {
  const { children } = props
  const { title, avatar = false } = props
  const { address } = useAccount()

  return (
    <>
      <Meta title="frenly feed" description="your frenly feed" />
      <div className={`container flex justify-between p-4 sticky-top bg-background`}>
        <h1 className={`font-rounded font-bold text-4xl`}>{title}</h1>
        {avatar && (
          <Link href={`/profile/${address}`}>
            <Avatar className={`w-10 h-10`} address={address!} />
          </Link>
        )}
      </div>
      {children}
    </>
  )
}
