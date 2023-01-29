import type { IAddress } from '../types'

export const isWhitelisted = (address: IAddress) => {
  const whitelist = process.env.NEXT_PUBLIC_WHITELIST
  console.log(whitelist)

  return !!whitelist
    ?.split(',')
    .map(() => {
      return address.toLowerCase()
    })
    .includes(address?.toLowerCase())
}
