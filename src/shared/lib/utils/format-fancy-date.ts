import { formatDate } from './format-date'

// eslint-disable-next-line sonarjs/cognitive-complexity
export const formatFancyDate = (date: Date) => {
  const now = new Date()

  const min = 1000 * 60
  const hour = min * 60
  const day = hour * 24

  const howLong = now.getTime() - date.getTime()

  if (howLong < min) return `just now`
  if (howLong < 11 * min)
    return `${Math.floor(howLong / min)} minute${howLong > min ? 's' : ''} ago`
  if (howLong < 16 * min) return `15 minutes ago`
  if (howLong < 21 * min) return `20 minutes ago`
  if (howLong < 31 * min) return `30 minutes ago`
  if (howLong < 24 * hour)
    return `${Math.floor(howLong / hour)} hour${howLong > hour ? 's' : ''} ago`
  if (howLong < 2 * day) return `yesterday`
  if (howLong < 8 * day) return `${Math.floor(howLong / day)} days ago`
  if (howLong < 30 * day)
    return `${Math.floor(howLong / day / 7)} week${
      Math.floor(howLong / day / 7) > 1 ? 's' : ''
    } ago`
  if (howLong < 183 * day) return `${date.getDate()} ${date.getMonth().toLocaleString()}`
  return formatDate(date)
}
