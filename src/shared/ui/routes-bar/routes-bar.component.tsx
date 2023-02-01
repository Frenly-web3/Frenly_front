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
    <div className="flex flex-col items-center">
      <div className="w-32 h-9 mb-6">
        <Image alt={'logo'} src={'/assets/images/logo.png'} />
      </div>
      <Paper className="rounded-[2rem] w-60 flex flex-col">
        {ROUTES.map((route, index) => {
          return (
            <Link
              className="flex font-rounded text-base items-center p-2 text-black/40 font-normal mr-2"
              key={index}
              href={route.path}
            >
              <img alt={route.name} src={route.icon} className="h-4 w-4 mr-2" />
              {route.name}
            </Link>
          )
        })}
        {children}
      </Paper>
    </div>
  )
}
