import { useMutation } from '@apollo/client'
import Author from '@components/shared/author/author.component'
import styles from '@components/shared/event/event.module.scss'
import {
  useBindWithLensIdMutation,
  useGetUnpublishedContentQuery,
  usePublishContentMutation,
  useRemoveContentMutation,
} from '@store/auth/auth.api'
import { CREATE_POST_TYPED_DATA } from '@store/lens/add-post.mutation'
import { LIKE_TO_POST } from '@store/lens/post/add-like.mutation'
import { CANCEL_LIKE_TO_POST } from '@store/lens/post/cancel-like.mutation'
import { signedTypeData, splitSignature } from '@store/lens/post/create-post.utils'
import { useEthers } from '@usedapp/core'
import clsx from 'clsx'
import moment from 'moment'
import Image from 'next/image'
import { useState } from 'react'
import { useGetWalletProfileId, usePostWithSig } from 'src/contract/lens-hub.api'
import Comments from '../comments/Comments'

export interface IEventProperties {
  isAddCap?: boolean
  image: string
  from: string
  date: string
  name?: string
  to: string
  info: string
  showDate?: boolean
  showAuthor?: boolean
  // ! find out if there will be message types
  messageType: 'SENT' | 'RECEIVE' | 'MINTED'
  //  ! item type?
  itemType: 'nft' | 'token'
  id: number | string
  totalUpvotes?: number
}

export default function Event(props: IEventProperties): JSX.Element {
  const {
    isAddCap = false,
    image,
    from,
    date,
    name,
    to,
    info,
    showDate = true,
    showAuthor = false,
    messageType,
    itemType,
    id,
    totalUpvotes,
  } = props

  const { account, library } = useEthers()
  console.log(account)

  const profileId = useGetWalletProfileId(account || '')
  const { state: postState, send: postWithSig } = usePostWithSig()
  const [addPostToLens, data] = useMutation(CREATE_POST_TYPED_DATA)
  const [publishContent] = usePublishContentMutation()
  const [bindContentIdWithLens] = useBindWithLensIdMutation()
  const [removeContent] = useRemoveContentMutation()
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const [likePostToLens, dataLikes] = useMutation(LIKE_TO_POST)
  const [cancelLikePostToLens, dataCancelLikes] = useMutation(CANCEL_LIKE_TO_POST)
  const addPost = async () => {
    if (id) {
      const publishedPost = await publishContent({
        contentId: id.toString(),
      })
      // @ts-ignore
      console.log(publishedPost?.data.data)
      // https://ipfs.io/ipfs/bafkreihis6blexvb3h2jrpxlrgfdb42xke3cyr7aq3zkv76nfyc6h65v4a

      const typeD = await addPostToLens({
        variables: {
          request: {
            profileId,
            // @ts-ignore
            contentURI: publishedPost.data.data,
            collectModule: {
              revertCollectModule: true,
            },
            referenceModule: {
              followerOnlyReferenceModule: false,
            },
          },
        },
      })

      const typedData = typeD?.data?.createPostTypedData?.typedData

      // if (!typedData) return
      console.log(typedData)

      const signature = await signedTypeData(
        typedData.domain,
        typedData.types,
        typedData.value,
        library
      )

      const { v, r, s } = splitSignature(signature)

      const receipt = await postWithSig({
        profileId: typedData.value.profileId,
        contentURI: typedData.value.contentURI,
        collectModule: typedData.value.collectModule,
        collectModuleInitData: typedData.value.collectModuleInitData,
        referenceModule: typedData.value.referenceModule,
        referenceModuleInitData: typedData.value.referenceModuleInitData,
        sig: {
          v,
          r,
          s,
          deadline: typedData.value.deadline,
        },
      })
      console.log(
        `0x${Number(receipt?.logs[0]?.topics[1]).toString(16)}-0x${Number(
          receipt?.logs[0]?.topics[2]
        ).toString(16)}`
      )

      await bindContentIdWithLens({
        contentId: id.toString(),
        lensId: `0x${Number(receipt?.logs[0]?.topics[1]).toString(16)}-0x${Number(
          receipt?.logs[0]?.topics[2]
        ).toString(16)}`,
      })
    }
  }

  const declinePost = async () => {
    if (id) {
      await removeContent({ contentId: id.toString() })
    }
  }
  console.log(profileId, id)

  const likeHandler = async () => {
    await likePostToLens({
      variables: {
        request: {
          profileId,
          reaction: 'UPVOTE',
          publicationId: id,
        },
      },
    })
    // await cancelLikePostToLens({
    //   variables: {
    //     request: {
    //       profileId,
    //       reaction: 'UPVOTE',
    //       publicationId: id,
    //     },
    //   },
    // })
  }

  const renderMessage = () => {
    let message
    switch (messageType) {
      case 'MINTED':
        message = '🎉 Minted a new '
        break
      case 'RECEIVE':
        message = '📤 Received '
        break
      case 'SENT':
        message = '📤 Sent '
        break
      default:
        break
    }
    switch (itemType) {
      case 'nft':
        message += `${messageType !== 'MINTED' ? 'an' : ''} NFT`
        break
      case 'token':
        message += 'tokens'
        break
      default:
        break
    }

    return `${message} `
  }

  async function commentHandler(){
    const res = await fetch('/api/comment', {method:"POST", body:JSON.stringify({comment:"AndrewGonnaCode", pubId:1})});
    console.log('commentRes', await res.json());
    
  }

  return (
    <article className="container border-b border-border-color pt-2 pb-4">
      {showAuthor && (
        <Author
          avatar="/assets/images/temp-avatar.jpg"
          name={name || ''}
          date={`${moment(date).format('MMM, DD')} at ${moment(date).format('LT')}`}
        />
      )}

      <div style={{ marginLeft: showAuthor ? 56 : 0 }}>
        {showDate && (
          <div className="text-base font-normal text-gray mb-1">
            {`${moment(date).format('MMM, DD')} at ${moment(date).format('LT')}`}
          </div>
        )}

        <h4 className="text-base font-semibold">
          {renderMessage()} to&nbsp;
          <a href="#" className="text-main">
            {to}
          </a>
        </h4>
        <div className="text-sm font-normal text-gray-darker mt-1">{info}</div>

        <div className="w-full relative h-screen max-h-96 rounded-lg overflow-hidden mt-1">
          <Image src="/assets/images/temp-nft.jpg" alt="image" layout="fill" objectFit="cover" />
        </div>

        {isAddCap && (
          <div className="w-full grid grid-cols-2 gap-2 mt-2">
            <button
              onClick={addPost}
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
        )}

        <div
          className={clsx(
            'mt-1 flex items-center',
            isAddCap ? 'justify-center mt-2' : 'justify-between'
          )}
        >
          <a href="#" className="text-sm text-main">
            Check on Etherscan
          </a>
          {isAddCap === false && (
            <div className="flex items-center">
              <button onClick={likeHandler} className="flex items-center justify-center py-1 px-2">
                <img src="/assets/icons/heart.svg" alt="like" />
                <span className="text-xs font-semibold text-gray-darker ml-1">{totalUpvotes}</span>
              </button>
              <button onClick={()=>setIsCommentsOpen(!isCommentsOpen)} className="flex items-center justify-center py-1 px-2">
                <img src="/assets/icons/message.svg" alt="messages" />
                <span className="text-xs font-semibold text-gray-darker ml-1">3</span>
              </button>
            </div>
          )}
        </div>
        {isCommentsOpen && <Comments/>}
      </div>
    </article>
  )
}
