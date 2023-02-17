import type { DrawerProps } from '@mantine/core'
import { clsx, Drawer as MantineDrawer } from '@mantine/core'
import React from 'react'

export interface IDrawerProperties extends DrawerProps {
  withoutHeader?: boolean
}

export const Drawer = (props: IDrawerProperties) => {
  const { children, withoutHeader=false, classNames, ...mantineProperties  } = props
  return (
    <MantineDrawer
      lockScroll
      position="bottom"
      {...mantineProperties}
      className={clsx('w-full', props.className)}
      classNames={{
        closeButton: 'text-black bg-white/0',
        header: clsx('p-4 pt-2 border-b border-black/20', {
          'hidden': withoutHeader,
        }),
        drawer: 'rounded-t-3xl',
        title: 'w-full',
        ...classNames
      }}
    >
      {children}
    </MantineDrawer>
  )
}
