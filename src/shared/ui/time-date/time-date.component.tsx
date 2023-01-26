import { formatFancyDate } from '@shared/lib'
import React from 'react'

interface IDate {
  date: string
}

export const TimeDate = (props: IDate) => {
  const { date } = props

  return <div className="">{formatFancyDate(new Date(date))}</div>
}
