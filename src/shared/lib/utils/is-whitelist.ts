import type { IAddress } from '../types'

export const isWhitelisted = (address: IAddress) => {
  const whitelist = process.env.NEXT_PUBLIC_WHITELIST

  return whitelist
    ?.split(',')
    .map((whitelistAddress) => {
      return whitelistAddress.toLowerCase()
    })
    .includes(address?.toLowerCase())
}
