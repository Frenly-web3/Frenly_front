import { LikeButton } from '@features/like-post'
import type { NetworkEnum } from '@shared/lib'
import { TransactionLink } from '@shared/ui'

import { usePostCardContext } from '../model'

interface IPostCardReactions {
  refetchFilteredFeed: () => void
}

export function PostCardReactions(props: IPostCardReactions) {
  // const { refetchFilteredFeed } = props
  const { network, txHash, id } = usePostCardContext()
  // const [isOpenComments, setIsOpenComments] = useState(false)
  return (
    <>
      <div className={`mt-1 flex items-center justify-between pl-14`}>
        <TransactionLink network={network as NetworkEnum} txHash={txHash as string} />
      </div>
      <div>
        <LikeButton postId={id!} />
      </div>
    </>
  )
}
