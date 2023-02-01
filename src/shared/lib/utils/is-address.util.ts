import type { IAddress } from '../types'

export function isAddress(value: IAddress | string): value is IAddress {
  return value.slice(0, 2) === '0x' && value.length === 42
}
