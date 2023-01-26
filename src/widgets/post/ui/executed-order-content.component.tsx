import { UserModelService } from '@entities/user'
import { SellerTypeEnum } from '@shared/lib'
import { useRouter } from 'next/router'
import React from 'react'
import { useGetWalletProfileId } from 'src/blockchain'

interface IExecutedOrderContentProperties {
  sellerType: SellerTypeEnum
  addressFrom: string
  addressTo: string
}

export const ExecutedOrderContent = (props: IExecutedOrderContentProperties) => {
  const { addressFrom, addressTo, sellerType } = props
  const router = useRouter()

  const fromId = useGetWalletProfileId(addressFrom as string)
  const toId = useGetWalletProfileId(addressTo as string)

  const { user: userFrom } = UserModelService.useUserInfo({ profileId: fromId })
  const { user: userTo } = UserModelService.useUserInfo({ profileId: toId })

  return (
    <>
      {sellerType == SellerTypeEnum.BuyEvent && (
        <>
          {userFrom ? (
            <div className="text-base pl-14">
              🎉 Just bought new NFT from{' '}
              <span
                onClick={() => router.push(`/profile/${fromId}`)}
                className="font-bold cursor-pointer"
              >
                {userFrom.name ?? `frenly.${userFrom?.address?.slice(0, 8)}`}
              </span>{' '}
              via Frenly
            </div>
          ) : (
            <div className="w-96 ml-14 h-3 rounded-full bg-gray animate-pulse"></div>
          )}
        </>
      )}
      {sellerType == SellerTypeEnum.SellEvent && (
        <>
          {userTo ? (
            <div className="text-base pl-14">
              🎉 Just sold his NFT to{' '}
              {userTo ? (
                <span
                  onClick={() => router.push(`/profile/${toId}`)}
                  className="font-bold cursor-pointer"
                >
                  {userTo?.name ?? `frenly.${userTo?.address?.slice(0, 8)}`}
                </span>
              ) : (
                <div className="m-auto mt-8 w-24 h-4 rounded-full bg-gray animate-pulse"></div>
              )}{' '}
              via Frenly
            </div>
          ) : (
            <div className="w-96 ml-14 h-3 rounded-full bg-gray animate-pulse"></div>
          )}
        </>
      )}
    </>
  )
}
