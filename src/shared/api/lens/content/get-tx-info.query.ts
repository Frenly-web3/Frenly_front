import { gql } from '@apollo/client'
import { useCallback } from 'react'

import { client } from '../lens-api'

const GET_TX_INFO = gql`
  query getTxInfo($request: HasTxHashBeenIndexedRequest!) {
    hasTxHashBeenIndexed(request: $request) {
      ... on TransactionIndexedResult {
        txReceipt {
          to
          from
          contractAddress
          transactionIndex
          root
          gasUsed
          logsBloom
          blockHash
          transactionHash
          logs {
            blockNumber
            blockHash
            transactionIndex
            removed
            address
            data
            topics
            transactionHash
            logIndex
          }
          blockNumber
          confirmations
          cumulativeGasUsed
          effectiveGasPrice
          byzantium
          type
          status
        }
        txHash
        indexed
        metadataStatus {
          status
          reason
        }
      }
      ... on TransactionError {
        txReceipt {
          to
          from
          contractAddress
          transactionIndex
          root
          gasUsed
          logsBloom
          blockHash
          transactionHash
          logs {
            blockNumber
            blockHash
            transactionIndex
            removed
            address
            data
            topics
            transactionHash
            logIndex
          }
          blockNumber
          confirmations
          cumulativeGasUsed
          effectiveGasPrice
          byzantium
          type
          status
        }
        reason
      }
    }
  }
`

export const useGetTxInfo = () => ({
  getTxInfo: useCallback(
    ({ txId }: { txId: string }) =>
      client.query({
        fetchPolicy: 'no-cache',
        query: GET_TX_INFO,
        variables: {
          request: {
            txId,
          },
        },
      }),
    []
  ),
})
