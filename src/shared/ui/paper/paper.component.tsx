import type { PaperProps } from '@mantine/core'
import { clsx, Paper as MantinePaper } from '@mantine/core'
import * as React from 'react'

export interface IPaperProperties extends PaperProps {}

export function Paper(props: IPaperProperties) {
  return <MantinePaper {...props} className={clsx('p-4 bg-white', props.className)} />
}
