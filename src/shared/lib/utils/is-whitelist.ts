import type { IAddress } from '../types'

export const isWhitelisted = (address: IAddress) => {
  const whitelist = process.env.NEXT_PUBLIC_WHITELIST

  return !!whitelist?.toLowerCase().includes(address?.toLowerCase())
}
