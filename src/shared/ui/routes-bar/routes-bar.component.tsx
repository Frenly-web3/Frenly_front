import { Image } from '@mantine/core'
import { ROUTES } from '@shared/lib'
import Link from 'next/link'
import * as React from 'react'

import { Paper } from '../paper'

export interface IRoutesBarProperties {
  children: React.ReactNode
}

export function RoutesBar(props: IRoutesBarProperties) {
  const { children } = props
  return (
    <div className="flex flex-col h-fit items-center max-md:border max-md:border-t-2 max-md:border-white/20 max-md:left-0 z-50 md:sticky fixed md:top-4 max-md:w-screen max-md:top-[92%]">
      <div className="max-w-32 h-9 mb-6 max-md:hidden">
        <Image alt={'logo'} src={'/assets/icons/logo.svg'} />
      </div>
      <Paper className="md:rounded-[2rem] justify-between md:w-60 max-md:w-full flex md:flex-col">
        {ROUTES.map((route, index) => {
          return (
            <Link
              className="flex font-rounded text-base items-center p-2 text-black/40 font-normal mr-2"
              key={index}
              href={route.path}
            >
              <img alt={route.name} src={route.icon} className="h-4 w-4 mr-2" />
              <span className="max-md:hidden">{route.name}</span>
            </Link>
          )
        })}

        {children}
      </Paper>
    </div>
  )
}
