import { PostImage } from '@entities/post'
import type { TokenTypeEnum } from '@shared/lib'
import { useFormatToShortAddress } from '@shared/lib'
import { BackButtonComponent, Button, Input } from '@shared/ui'
import React from 'react'
import { createPortal } from 'react-dom'

import { useCreateOrder } from '../model'

interface ICreateOrderForm {
  image: string
  contractAddress: string
  nameCollection: string
  tokenType: TokenTypeEnum
  tokenId: string
  closeForm: () => void
  show: boolean
}

export const CreateOrderForm = (props: ICreateOrderForm) => {
  const { image, contractAddress, nameCollection, closeForm, show, tokenId, tokenType } =
    props

  const { price, setPrice, createOrder } = useCreateOrder({
    tokenAddressMaker: contractAddress,
    tokenId,
    collectionName: nameCollection,
    image,
    tokenType,
    closeForm,
  })
  const { formatToShortAddress } = useFormatToShortAddress()

  const backButtonHandler = () => {
    closeForm()
    setPrice('')
  }

  return show ? (
    createPortal(
      <div className="top-0 fixed h-screen w-screen">
        <div className="h-3/4 w-96 top-16 mx-auto relative bg-white pt-5 rounded-xl border-2 border-gray-darker flex flex-col items-center">
          <div className="left-5 absolute">
            <BackButtonComponent onClick={backButtonHandler} />
          </div>
          <div className="w-60 h-full flex flex-col justify-around">
            <div className="h-60 flex flex-col items-center">
              <PostImage image={image} address={contractAddress as string} />
              <div className="text-sm font-normal mt-3 text-gray-darker pl-1 ">
                {nameCollection}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg mt-4">Smart contract </span>
              <a
                className="font-normal text-base text-main"
                href={`https://etherscan.io/address/${contractAddress}`}
                target={'_blank'}
                rel="noreferrer"
              >
                {formatToShortAddress({ address: contractAddress })}
              </a>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg mb-3">Sell price</span>
              <div className="flex items-center">
                <Input
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type={'text'}
                />
                <span className="font-bold text-lg">ETH</span>
              </div>
              <div className="mt-5 w-3/4">
                <Button onClick={createOrder}>Create order</Button>
              </div>
            </div>
          </div>
        </div>
      </div>,
      // @ts-ignore
      document?.querySelectorAll('#portal')[0]
    )
  ) : (
    <></>
  )
}
