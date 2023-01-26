import type { IAddress } from '../types'

interface IProperties {
  address: IAddress
  with0x?: boolean
}

export const shortAddress = (props: IProperties) => {
  const { address, with0x = false } = props

  if (!address) return ''

  return `${with0x ? '0x' : ''}${address.slice(2, 6)}...${address.slice(-4)}`
}
