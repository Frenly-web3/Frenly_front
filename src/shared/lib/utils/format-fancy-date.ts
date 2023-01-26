import { formatDate } from './format-date'

export const formatFancyDate = (date: Date) => {
  const now = new Date()

  const min = 1000 * 60
  const hour = min * 60
  const day = hour * 24

  const howLong = now.getTime() - date.getTime()

  if (howLong < min) return `just now`
  if (howLong < hour)
    return `${Math.floor(howLong / min)} minute${howLong > min ? 's' : ''} ago`
  if (howLong < 24 * hour) return `${Math.floor(howLong / hour)} hours ago`
  if (howLong < 2 * day) return `yesterday`
  if (howLong < 8 * day) return `${Math.floor(howLong / day)} days ago`
  if (howLong < 30 * day)
    return `${Math.floor(howLong / day / 7)} week${
      Math.floor(howLong / day / 7) > 1 ? 's' : ''
    } ago`
  if (howLong < 183 * day) return `${date.getDate()} ${date.getMonth().toLocaleString()}`
  return formatDate(date)
}
