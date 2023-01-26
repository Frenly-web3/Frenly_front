import type { IAddress } from '@shared/lib'

export interface INonceDto {
  nonce: number
}

export interface IValidateDto {
  refreshToken: string
  accessToken: string
}

export interface IValidateDtoRequest {
  address: IAddress
  signature: IAddress
}
