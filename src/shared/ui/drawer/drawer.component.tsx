import type { DrawerProps } from '@mantine/core'
import { clsx, Drawer as MantineDrawer } from '@mantine/core'
import React from 'react'

export interface IDrawerProperties extends DrawerProps {}

export const Drawer = (props: IDrawerProperties) => {
  const { children, ...mantineProperties } = props
  return (
    <MantineDrawer
      lockScroll
      classNames={{
        closeButton: 'text-black',
        header: 'p-4 pt-2 border-b border-black/20',
        drawer: 'rounded-t-3xl',
      }}
      position="bottom"
      {...mantineProperties}
      className={clsx('w-full', props.className)}
    >
      {children}
    </MantineDrawer>
  )
}
