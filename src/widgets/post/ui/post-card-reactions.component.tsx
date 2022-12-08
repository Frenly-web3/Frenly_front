import type { NetworkEnum } from '@shared/lib'
import { TransactionLink } from '@shared/ui'
import { useState } from 'react'

import { usePostCardContext } from '../model'

interface IPostCardReactions {
  refetchFilteredFeed: () => void
}

export function PostCardReactions(props: IPostCardReactions) {
  const { refetchFilteredFeed } = props
  const {
    // lensId: publicationId,
    network,
    txHash,
    image,
    contractAddress,
    from,
    to,
    postType,
  } = usePostCardContext()
  const [isOpenComments, setIsOpenComments] = useState(false)
  // const { comments, setCommentsValue } = useGetCommentsByPostId({
  //   publicationId: publicationId as string,
  // })
  return (
    <>
      <div className={`mt-1 flex items-center justify-between pl-14`}>
        <TransactionLink network={network as NetworkEnum} txHash={txHash as string} />
        {/* {publicationId ? (
          <div className="flex items-center">
            <LikeButton publicationId={publicationId as string} />
            <CommentButton
              amountComments={comments?.length}
              publicationId={publicationId as string}
              isOpenComment={isOpenComments}
              setIsOpenComment={setIsOpenComments}
            />
            <MirrorButton
              publicationId={publicationId as string}
              refetchFilteredFeed={refetchFilteredFeed}
            />
            <TwitterButton
              contractAddress={contractAddress}
              from={from}
              image={image}
              network={network}
              postType={postType}
              to={to}
              txHash={txHash}
            />
          </div>
        ) : (
          <div className="m-auto mt-4 w-72 h-3 rounded-full bg-gray animate-pulse"></div>
        )} */}
      </div>
      {/* {isOpenComments && (
        <>
          <CommentList comments={comments as IComment[]} />
          <CommentSend
            publicationId={publicationId as string}
            setComments={setCommentsValue}
          />
        </>
      )} */}
    </>
  )
}
