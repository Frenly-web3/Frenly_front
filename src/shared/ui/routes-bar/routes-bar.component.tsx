import { clsx, Image } from '@mantine/core'
import { ROUTES } from '@shared/lib'
import Link from 'next/link'
import * as React from 'react'

import { Paper } from '../paper'

export interface IRoutesBarProperties {
  children: React.ReactNode
  chosedMenu: number
}

export function RoutesBar(props: IRoutesBarProperties) {
  const { children, chosedMenu } = props

  return (
    <div className="flex flex-col h-fit items-center max-md:border max-md:border-t-2 max-md:border-white/20 max-md:left-0 z-50 md:sticky fixed md:top-4 max-md:w-screen max-md:top-[92%]">
      <div className="max-w-32 h-9 mb-9 max-md:hidden">
        <Image alt={'logo'} src={'/assets/icons/logo.svg'} />
      </div>
      <Paper className="md:rounded-[2rem] justify-between md:w-60 max-md:w-full flex md:flex-col">
        {ROUTES.map((route, index) => {
          return (
            <Link
              className={clsx(
                'flex font-rounded rounded-full text-base items-center p-2 font-semibold mr-2 hover:bg-black/5',
                {
                  'text-black': chosedMenu == index,
                  'text-black/40': chosedMenu !== index,
                }
              )}
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
