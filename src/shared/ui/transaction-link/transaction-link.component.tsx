import type { NetworkEnum } from '@shared/lib'
import type { FC } from 'react'
import React from 'react'

interface ITransactionLinkProperties {
  txHash: string
  network: NetworkEnum
}

export const TransactionLink: FC<ITransactionLinkProperties> = (
  props: ITransactionLinkProperties
) => {
  const { txHash, network } = props

  console.log(network)

  return (
    <div className="flex flex-col">
      <a
        target="_blank"
        href={
          // network == NetworkEnum.Ethereum
          //   ?
          `https://etherscan.io/tx/${txHash}`
          // : `https://mumbai.polygonscan.com/tx/${txHash}`
        }
        className="text-sm text-main"
        rel="noreferrer"
      >
        {
          // network === 'ETHEREUM' ?
          'Etherscan'
          //  : 'Polygonscan'
        }
      </a>
    </div>
  )
}
