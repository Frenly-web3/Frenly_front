import { useCallback } from 'react'

import { LENS_FOLLOW_ABI } from './constants'
import { useBlockchain } from './use-blockchain.hook'

interface IUnfollowWithSig {
  contractAddress: string
  contractArgs: {
    tokenId: string
    sig: {
      v: number
      r: string
      s: string
      deadline: number
    }
  }
}

export const useUnfollowWithSig = () => {
  const { ethers, signer } = useBlockchain()

  return {
    unfollowWithSig: useCallback(
      async ({ contractAddress, contractArgs }: IUnfollowWithSig) => {
        const { tokenId, sig } = contractArgs

        const lensFollowContract = new ethers.Contract(
          contractAddress,
          LENS_FOLLOW_ABI,
          signer
        )

        const receipt = await lensFollowContract.burnWithSig(tokenId, sig)
        const tx = await receipt.wait()

        return { tx }
      },
      [signer]
    ),
  }
}
