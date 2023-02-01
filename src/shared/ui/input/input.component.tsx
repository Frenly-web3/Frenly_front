import type { TextInputProps } from '@mantine/core'
import { clsx, Input as MantineInput } from '@mantine/core'
import React from 'react'

interface IInputProperties extends TextInputProps {
  children?: React.ReactNode
  placeholder?: string
}

export const Input = (props: IInputProperties) => {
  const { children, ...restProperties } = props
  return (
    <MantineInput
      {...restProperties}
      classNames={{ ...restProperties.classNames }}
      className={clsx('w-full p-3', restProperties.className)}
      placeholder={restProperties.placeholder}
    >
      {children}
    </MantineInput>
  )
}
