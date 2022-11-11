import { NetworkEnum } from '@shared/lib'
import React from 'react'

interface ITransactionLinkProperties {
  txHash: string
  network: NetworkEnum
}

export const TransactionLink = (props: ITransactionLinkProperties) => {
  const { txHash, network } = props
  return (
    <div className="flex flex-col">
      <div className="text-sm font-normal text-gray-darker mt-1">FrenlyPost</div>
      <a
        target="_blank"
        href={
          network == NetworkEnum.Ethereum
            ? `https://etherscan.io/tx/${txHash}`
            : `https://mumbai.polygonscan.com/tx/${txHash}`
        }
        className="text-sm text-main"
        rel="noreferrer"
      >
        {network === 'ETHEREUM' ? 'Etherscan' : 'Polygonscan'}
      </a>
    </div>
  )
}
