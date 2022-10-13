import { createComment } from '@store/lens/comment/create-comment'
import { useEthers } from '@usedapp/core'
import React, { useState } from 'react'

import { useLoaderContext } from '../contexts/loader-context'
import Loader from '../loader/loader.component'
import type { IComment } from './comment/comment.component'
import Comment from './comment/comment.component'

interface ICommentsProperties {
  comments: any
  pubId: string | number
  profileId: string
  refetchComment: any
}

const Comments = ({ comments, pubId, profileId, refetchComment }: ICommentsProperties) => {
  const [commentValue, setCommentValue] = useState('')

  const { isLoading, setIsLoading } = useLoaderContext()

  const { library } = useEthers()

  console.log(comments)

  async function commentHandler() {
    setIsLoading(true)
    const res = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ comment: commentValue, pubId }),
    })
    const data = await res.json()
    setIsLoading(false)

    const signer = library?.getSigner()

    setIsLoading(true)
    await createComment(profileId, pubId, data.contentURI, signer)
    setCommentValue('')
    setIsLoading(false)
    refetchComment()
  }

  return (
    <>
      {isLoading ? (
        <Loader show={true} />
      ) : (
        <div className="flex flex-col py-4 relative">
          <h4 className="text-xl font-bold mb-4">Comments</h4>
          {comments?.publications?.items?.map((comment: IComment) => (
            <Comment key={comment.id} {...comment} />
          ))}
          <div className="w-full pt-4 pb-4 flex">
            <div className="flex rounded-2xl bg-light-gray px-4 py-2 w-full mr-2">
              <input
                style={{ background: 'transparent' }}
                value={commentValue}
                onChange={e => setCommentValue(e.target.value)}
                type="text"
                className="outline-none w-full"
                placeholder="Comment"
              />
            </div>
            <button onClick={commentHandler} className="flex items-center justify-center py-1 px-2">
              <img src="/assets/icons/send-icon.svg" alt="messages" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Comments
