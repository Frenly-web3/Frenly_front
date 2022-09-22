import { useMutation, useQuery } from '@apollo/client'
import Author from '@components/shared/author/author.component'
import styles from '@components/shared/event/event.module.scss'
import {
  useBindWithLensIdMutation,
  useGetUnpublishedContentQuery,
  usePublishContentMutation,
  useRemoveContentMutation,
} from '@store/auth/auth.api'
import { CREATE_POST_TYPED_DATA } from '@store/lens/add-post.mutation'
import { GET_PUBLICATIONS } from '@store/lens/get-publication.query'
import { LIKE_TO_POST } from '@store/lens/post/add-like.mutation'
import { CREATE_MIRROR_TYPED_DATA } from '@store/lens/post/add-mirror.mutation'
import { CANCEL_LIKE_TO_POST } from '@store/lens/post/cancel-like.mutation'
import { signedTypeData, splitSignature } from '@store/lens/post/create-post.utils'
import { GET_REACTIONS } from '@store/lens/post/get-reaction.query'
import { useEthers } from '@usedapp/core'
import clsx from 'clsx'
import moment from 'moment'
import Comments from '@components/shared/comments/comments.component'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useGetWalletProfileId, useMirrorWithSig, usePostWithSig } from 'src/contract/lens-hub.api'


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
  totalMirror: number
  refetchInfo?: () => void
  profileId: string
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
    totalMirror,
    refetchInfo,
    profileId,
  } = props

  const { account, library } = useEthers()

  const myProfileId = useGetWalletProfileId(account || '')
  const { state: postState, send: postWithSig } = usePostWithSig()
  const { state: mirrorState, send: mirrorWithSig } = useMirrorWithSig()
  const [addPostToLens, data] = useMutation(CREATE_POST_TYPED_DATA)
  const [publishContent] = usePublishContentMutation()
  const [bindContentIdWithLens] = useBindWithLensIdMutation()
  const [removeContent] = useRemoveContentMutation()
  const [isCommentsOpen, setIsCommentsOpen] = useState(false)

  const [likePostToLens, dataLikes] = useMutation(LIKE_TO_POST)
  const [cancelLikePostToLens, dataCancelLikes] = useMutation(CANCEL_LIKE_TO_POST)

  const comments = useQuery(GET_PUBLICATIONS, {
    variables: {
      request: {
        commentsOf: id,
      },
    },
  })

  console.log('publicationComments', comments?.data?.publications?.items.length)
  console.log('====================================')
  console.log('COMMENTS', comments.data.publications.items.length)
  console.log('====================================')

  const [mirrorPublication, dataMirrorPublication] = useMutation(CREATE_MIRROR_TYPED_DATA)
  const [imageUrl, setImageUrl] = useState()
  const { data: publicationIsReact, refetch } = useQuery(GET_REACTIONS, {
    variables: {
      request: {
        publicationIds: [id],
      },
      requestReaction: {
        profileId: myProfileId,
      },
    },
    skip: typeof id == 'number',
  })

  const addPost = async () => {
    if (id) {
      const publishedPost = await publishContent({
        contentId: id.toString(),
      })
      // @ts-ignore
      // https://ipfs.io/ipfs/bafkreihis6blexvb3h2jrpxlrgfdb42xke3cyr7aq3zkv76nfyc6h65v4a

      const typeD = await addPostToLens({
        variables: {
          request: {
            profileId: myProfileId,
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

  useEffect(() => {
    ;(async () => {
      const imageURL = await fetch(image)
      if (imageURL && typeof id !== 'number') {
        console.log(imageURL)
        // eslint-disable-next-line unicorn/no-await-expression-member
        setImageUrl((await imageURL.json()).image)
      }
    })()
  }, [image])

  const likeHandler = async () => {
    if (myProfileId) {
      console.log(id)

      if (publicationIsReact.publications.items[0].reaction !== 'UPVOTE') {
        await likePostToLens({
          variables: {
            request: {
              profileId: myProfileId,
              reaction: 'UPVOTE',
              publicationId: id,
            },
          },
        })
      } else {
        cancelLikePostToLens({
          variables: {
            request: {
              profileId: myProfileId,
              reaction: 'UPVOTE',
              publicationId: id,
            },
          },
        })
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    refetchInfo && refetchInfo()
    refetch()
  }

  const mirrorHandler = async () => {
    const typeD = await mirrorPublication({
      variables: {
        request: {
          profileId: myProfileId,
          publicationId: id,
          referenceModule: {
            followerOnlyReferenceModule: false,
          },
        },
      },
    })

    const typedData = typeD?.data?.createMirrorTypedData?.typedData

    // if (!typedData) return
    const signature = await signedTypeData(
      typedData.domain,
      typedData.types,
      typedData.value,
      library
    )

    const { v, r, s } = splitSignature(signature)

    const tx = await mirrorWithSig({
      profileId: typedData.value.profileId,
      profileIdPointed: typedData.value.profileIdPointed,
      pubIdPointed: typedData.value.pubIdPointed,
      referenceModuleData: typedData.value.referenceModuleData,
      referenceModule: typedData.value.referenceModule,
      referenceModuleInitData: typedData.value.referenceModuleInitData,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    refetchInfo && refetchInfo()
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

  return (
    <article className="container border-b border-border-color pt-2 pb-4">
      {showAuthor && (
        <Author
          avatar="/assets/images/temp-avatar.jpg"
          name={name || ''}
          profileId={profileId}
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

        <div className="relative max-h-96 rounded-lg overflow-hidden mt-1">
          {/* <Image src={imageUrl} alt="image" layout="fill" objectFit="cover" /> */}
          <img src={imageUrl} alt="image" className="object-cover" />
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
              <button
                onClick={() => setIsCommentsOpen(!isCommentsOpen)}
                className="flex items-center justify-center py-1 px-2"
              >
                <img src="/assets/icons/message.svg" alt="messages" />
                <span className="text-xs font-semibold text-gray-darker ml-1">
                  {comments?.data?.publications?.items?.length}
                </span>
              </button>
              <button
                onClick={mirrorHandler}
                className="flex items-center justify-center py-1 px-2"
              >
                <img src="/assets/icons/mirror.svg" alt="messages" />
                <span className="text-xs font-semibold text-gray-darker ml-1">{totalMirror}</span>
              </button>
            </div>
          )}
        </div>
        {isCommentsOpen && <Comments comments={comments} pubId={id} profileId={profileId} />}
      </div>
    </article>
  )
}
