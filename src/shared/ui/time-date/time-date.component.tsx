import moment from 'moment'
import React from 'react'

interface IDate {
  date: string
}

export const TimeDate = (props: IDate) => {
  const { date } = props
  return (
    <div className="">
      {`${moment(date).format('MMM, DD')} at ${moment(date).format('LT')}`}
    </div>
  )
}
