import { SmallUserCard } from '@entities/user'
import { useIsomorphicEffect } from '@mantine/hooks'
import type { IAddress } from '@shared/lib'
import { Meta } from '@shared/ui'
import { RoutesBar } from '@shared/ui/routes-bar'
import { memo, useState } from 'react'
import { useAccount } from 'wagmi'

interface IProperties {
  title: string
  children: React.ReactNode
  rightSidebar?: React.ReactNode
}

export const Layout = memo((props: IProperties) => {
  const { children, rightSidebar, title } = props

  const { address } = useAccount()
  const [addressHydration, setAddressHydration] = useState<IAddress>()

  useIsomorphicEffect(() => {
    setAddressHydration(address as IAddress)
  })
  return (
    <div className="bg-background   min-h-screen md:flex justify-center px-2">
      <Meta title="frenly feed" description="your frenly feed" />

      <RoutesBar>
        {addressHydration && <SmallUserCard address={addressHydration as IAddress} />}
      </RoutesBar>
      <div className="flex flex-col">
        <div className={`flex justify-between p-4 bg-background`}>
          <h1 className={`font-rounded font-bold text-4xl`}>{title}</h1>
        </div>
        {children}
      </div>
      {/* <RoutesBar>
        {addressHydration && <SmallUserCard address={addressHydration as IAddress} />}
      </RoutesBar> */}
      {rightSidebar}
    </div>
  )
})
