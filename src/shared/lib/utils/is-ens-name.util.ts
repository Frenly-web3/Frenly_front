import type { IAddress } from '../types'

export function isEnsName(value: IAddress | string): value is string {
  return value.slice(-4) === '.eth'
}
