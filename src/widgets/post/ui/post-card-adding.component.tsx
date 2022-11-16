import { useAddPost } from '@features/add-post'
import type { NetworkEnum } from '@shared/lib'
import { TransactionLink } from '@shared/ui'
import React from 'react'

import { usePostCardContext } from '../model'

interface IPostCardAdding {}

export function PostCardAdding(props: IPostCardAdding) {
  const {} = props

  const { id: backId, network, txHash } = usePostCardContext()

  const { declinePost } = useAddPost({ backId: backId as number })

  return (
    <div className="flex flex-col align-middle">
      <div className="w-full grid grid-cols-2 gap-2 mt-2 pl-14">
        <button
          onClick={() => console.log('as')}
          className="rounded-full bg-main py-2 text-white text-sm font-semibold"
        >
          Publish
        </button>
        <button
          onClick={declinePost}
          className="rounded-full bg-error-bg py-2 text-error text-sm font-semibold"
        >
          Decline
        </button>
      </div>

      <div className="m-auto w-10">
        <TransactionLink network={network as NetworkEnum} txHash={txHash as string} />
      </div>
    </div>
  )
}
