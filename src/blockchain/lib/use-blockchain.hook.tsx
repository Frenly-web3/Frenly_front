import {
  ChainId,
  useCall,
  useContractFunction,
  useEthers,
  useLookupAddress,
} from '@usedapp/core'
import { BigNumber, Contract, ethers, utils } from 'ethers'
import { useCallback } from 'react'

import { LENS_HUB_ABI } from './constants/lens-hub.abi'
// eslint-disable-next-line unicorn/prefer-module
const omitDeep = require('omit-deep')

export function useBlockchain() {
  const lensInterface = new ethers.utils.Interface(LENS_HUB_ABI)
  const lensContract = new Contract(
    process.env.NEXT_PUBLIC_LENS_HUB_ADDRESS as string,
    lensInterface
  )

  const contracts = { lensContract }
  return {
    ...useEthers(),
    useLookupAddress,
    useCall,
    contracts,
    ChainId,
    useContractFunction,
    signer: useEthers().library?.getSigner(),
    ethers,
  }
}

export function useSignTypedData() {
  const { library } = useBlockchain()

  return useCallback(
    async ({ typedData }: { typedData: { domain: any; types: any; value: any } }) => {
      // eslint-disable-next-line @typescript-eslint/return-await
      return await library
        ?.getSigner()
        ._signTypedData(
          omitDeep(typedData.domain, '__typename'),
          omitDeep(typedData.types, '__typename'),
          omitDeep(typedData.value, '__typename')
        )
    },
    [library]
  )
}

export function useSignMessage() {
  const { library } = useBlockchain()

  return useCallback(
    async (message: string) => {
      // eslint-disable-next-line @typescript-eslint/return-await
      return await library?.getSigner().signMessage(message)
    },
    [library]
  )
}

export function useSplitSignature() {
  return useCallback(async ({ signature }: { signature: string }) => {
    return utils.splitSignature(signature)
  }, [])
}

export function useCheckAndChangeChainId() {
  // eslint-disable-next-line sonarjs/cognitive-complexity
  return useCallback(async (setNoMetamask: (state: boolean) => void) => {
    const isMainnet = false
    try {
      // @ts-ignore
      const chain = Number.parseInt(window.ethereum.chainId, 16)
      if (!isMainnet) {
        if (chain !== ChainId.Mainnet) {
          try {
            // @ts-ignore
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: `0x${ChainId.Mainnet.toString(16)}` }],
            })
          } catch (error: any) {
            if (error.code === 4902) {
              // @ts-ignore
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: `0x${ChainId.Mainnet.toString(16)}`,
                    chainName: 'Ethereum Mainnet',
                    rpcUrls: ['https://rpc.builder0x69.io	'] /* ... */,
                  },
                ],
              })
            }
            // throw new Error('Didnt change network')
          }
        }
      } else if (chain !== ChainId.BSC) {
        try {
          // @ts-ignore
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: BigNumber.from(ChainId.BSC).toHexString() }],
          })
        } catch (error: any) {
          if (error.code === 4902) {
            // @ts-ignore
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: BigNumber.from(ChainId.BSC).toHexString(),
                  chainName: 'BSC Mainnet',
                  rpcUrls: ['https://bsc-dataseed.binance.org'] /* ... */,
                },
              ],
            })
          }
          throw new Error('Didn`t change network')
        }
      }
    } catch {
      setNoMetamask(true)
    }
  }, [])
}
