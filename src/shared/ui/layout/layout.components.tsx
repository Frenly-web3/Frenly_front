// eslint-disable-next-line boundaries/element-types, import/no-cycle
import { SmallUserCard } from '@entities/user'
import { useIsomorphicEffect } from '@mantine/hooks'
import type { IAddress } from '@shared/lib'
import { memo, useState } from 'react'
import { useAccount } from 'wagmi'

import { Meta } from '../meta'
import RoutesBar from '../routes-bar/routes-bar.component'

interface IProperties {
  title: string
  avatar?: boolean
  children: React.ReactNode
}

export const Layout = memo((props: IProperties) => {
  const { children } = props
  const { title, avatar = false } = props
  const { address } = useAccount()
  const [addressHydration, setAddressHydration] = useState<IAddress>()

  useIsomorphicEffect(() => {
    setAddressHydration(address as IAddress)
  })
  return (
    <div className="bg-background min-h-screen">
      <Meta title="frenly feed" description="your frenly feed" />

      <div className={`container flex justify-between p-4 bg-background`}>
        <h1 className={`font-rounded font-bold text-4xl`}>{title}</h1>
        {/* {avatar && (
          <Link href={`/profile/${address}`}>
            <Avatar className={`w-10 h-10`} address={address!} />
          </Link>
        )} */}
      </div>

      <div className="fixed left-56 top-4">
        <RoutesBar>
          {addressHydration && <SmallUserCard address={addressHydration as IAddress} />}
        </RoutesBar>
      </div>

      {children}
    </div>
  )
})
