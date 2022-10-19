import { ApolloQueryResult, useMutation, useQuery } from '@apollo/client'
/* eslint-disable sonarjs/cognitive-complexity */
import Author from '@components/shared/author/author.component'
import Comments from '@components/shared/comments/comments.component'
import styles from '@components/shared/event/event.module.scss'
import { useAppDispatch } from '@hooks/use-app-dispatch.hook'
import {
  authApi,
  useBindAdminPostMutation,
  useBindWithLensIdMutation,
  useGetContentMetadataQuery,
  useGetUnpublishedContentQuery,
  useMirrorPostMutation,
  usePublishAdminPostMutation,
  usePublishContentMutation,
  useRemoveAdminContentMutation,
  useRemoveContentMutation,
} from '@store/auth/auth.api'
import { FOLLOW_USER } from '@store/lens/account/add-follow.mutation'
import { CREATE_POST_TYPED_DATA } from '@store/lens/add-post.mutation'
import { GET_PUBLICATIONS } from '@store/lens/get-publication.query'
import { LIKE_TO_POST } from '@store/lens/post/add-like.mutation'
import { CREATE_MIRROR_TYPED_DATA } from '@store/lens/post/add-mirror.mutation'
import { CANCEL_LIKE_TO_POST } from '@store/lens/post/cancel-like.mutation'
import { signedTypeData, splitSignature } from '@store/lens/post/create-post.utils'
import { GET_POST_QUERY } from '@store/lens/post/get-post.query'
import { GET_REACTIONS } from '@store/lens/post/get-reaction.query'
import { useEthers } from '@usedapp/core'
import clsx from 'clsx'
import moment from 'moment'
import error from 'next/error'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useGetWalletProfileId, useMirrorWithSig, usePostWithSig } from 'src/contract/lens-hub.api'

import { useUpdate } from '../header/use-update-user.hook'
import Loader from '../loader/loader.component'

export interface IEventProperties {
  isAddCap?: boolean
  image: string
  from: string
  contractAddress: string
  date: string
  name?: string
  to: string
  info: string
  showDate?: boolean
  showAuthor?: boolean
  // ! find out if there will be message types
  messageType: 'SEND' | 'RECEIVE' | 'MINTED'
  //  ! item type?
  itemType: 'nft' | 'token'
  id: number | string
  totalUpvotes?: number
  totalMirror: number
  refetchInfo?: () => Promise<any>
  profileId: string
  blockchainType?: 'ETHEREUM' | 'POLYGON'
  txHash: string
  isMirror: boolean
  handleMirror?: string
  isAdmin?: boolean
  creator: string
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
    blockchainType,
    txHash,
    contractAddress,
    isMirror,
    handleMirror,
    isAdmin,
    creator,
  } = props

  const { account, library } = useEthers()
  const dispatch = useAppDispatch()
  const myProfileId = useGetWalletProfileId(account || '')
  const { state: postState, send: postWithSig } = usePostWithSig()
  const { state: mirrorState, send: mirrorWithSig } = useMirrorWithSig()
  const [addPostToLens, data] = useMutation(CREATE_POST_TYPED_DATA)
  const [publishContent] = usePublishContentMutation()
  const [bindContentIdWithLens] = useBindWithLensIdMutation()
  const [publishAdminPost] = usePublishAdminPostMutation()
  const [bindAdminContent] = useBindAdminPostMutation()
  const [removeContent] = useRemoveContentMutation()
  const [removeAdminContent] = useRemoveAdminContentMutation()
  const [isCommentsOpen, setIsCommentsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [likePostToLens, dataLikes] = useMutation(LIKE_TO_POST)
  const [cancelLikePostToLens, dataCancelLikes] = useMutation(CANCEL_LIKE_TO_POST)
  const [isLikeRequest, setIsLikeRequest] = useState(false)
  const { name: username, description, avatar, uploadImage } = useUpdate(creator)
  const { data: comments, refetch: refetchComments } = useQuery(GET_PUBLICATIONS, {
    skip: isAddCap,
    variables: {
      request: {
        commentsOf: id,
      },
    },
  })

  const { data: postData, refetch: refetchPost } = useQuery(GET_POST_QUERY, {
    skip: isAddCap,
    variables: {
      request: {
        publicationId: id,
      },
    },
  })

  const [mirrorPublication, dataMirrorPublication] = useMutation(CREATE_MIRROR_TYPED_DATA)

  const [imageUrl, setImageUrl] = useState()
  const { data: publicationIsReact, refetch: refetchLikes } = useQuery(GET_REACTIONS, {
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

  const [mirrorPost] = useMirrorPostMutation()

  const addPost = async () => {
    setIsLoading(true)

    if (id) {
      try {
        const contentMetadata = await (isAdmin
          ? dispatch(
              authApi.endpoints.getAdminContentMetadata.initiate({ contentId: id.toString() })
            ).unwrap()
          : dispatch(
              authApi.endpoints.getContentMetadata.initiate({ contentId: id.toString() })
            ).unwrap())

        console.log(contentMetadata)

        const postOptionsInfo = {
          variables: {
            request: {
              profileId: myProfileId,
              // @ts-ignore
              contentURI: contentMetadata.data,
              collectModule: {
                revertCollectModule: true,
              },
              referenceModule: {
                followerOnlyReferenceModule: isAdmin,
              },
            },
          },
        }

        const typeD = await addPostToLens(postOptionsInfo)

        const typedData = typeD?.data?.createPostTypedData?.typedData

        const signature = await signedTypeData(
          typedData.domain,
          typedData.types,
          typedData.value,
          library?.getSigner()
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

        await (isAdmin
          ? publishAdminPost({ contentId: id.toString() })
          : publishContent({
              contentId: id.toString(),
            }))

        const bindArguments = {
          contentId: id.toString(),
          lensId:
            Number(receipt?.logs[0]?.topics[2]).toString(16).length === 1
              ? `0x${Number(receipt?.logs[0]?.topics[1]).toString(16)}-0x0${Number(
                  receipt?.logs[0]?.topics[2]
                ).toString(16)}`
              : `0x${Number(receipt?.logs[0]?.topics[1]).toString(16)}-0x${Number(
                  receipt?.logs[0]?.topics[2]
                ).toString(16)}`,
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isAdmin ? await bindAdminContent(bindArguments) : await bindContentIdWithLens(bindArguments)
      } catch (error_) {
        console.log(error_)
        toast.error(String(error_))
      } finally {
        setIsLoading(false)
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        refetchInfo && (await refetchInfo())
      }
    }
  }

  const declinePost = async () => {
    try {
      setIsLoading(true)
      if (id) {
        await (isAdmin
          ? removeAdminContent({ contentId: id.toString() })
          : removeContent({ contentId: id.toString() }))
      }
    } catch (error_) {
      toast.error(String(error_))
    } finally {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      refetchInfo && (await refetchInfo())
      setIsLoading(false)
    }
  }

  // useEffect(() => {
  //   ;(async () => {
  //     if (image && typeof id !== 'number') {
  //       const imageURL = await fetch(image)
  //       (imageURL)
  //       // eslint-disable-next-line unicorn/no-await-expression-member
  //       setImageUrl((await imageURL.json()).image)
  //     }
  //   })()
  // }, [image])

  const likeHandler = async () => {
    setIsLikeRequest(true)
    if (myProfileId) {
      if (publicationIsReact.publications.items[0].reaction == null) {
        try {
          setIsLikeRequest(true)
          await likePostToLens({
            variables: {
              request: {
                profileId: myProfileId,
                reaction: 'UPVOTE',
                publicationId: id,
              },
            },
          })
        } catch (error_) {
          console.error(error_)
        }
        setIsLikeRequest(false)
      }

      if (publicationIsReact.publications.items[0].reaction == 'UPVOTE') {
        setIsLikeRequest(true)
        cancelLikePostToLens({
          variables: {
            request: {
              profileId: myProfileId,
              reaction: 'UPVOTE',
              publicationId: id,
            },
          },
        })
        setIsLikeRequest(false)
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    refetchInfo && (await refetchInfo())
    await refetchLikes()
    await refetchPost()
    setIsLikeRequest(false)
  }

  const mirrorHandler = async () => {
    setIsLoading(true)
    try {
      const typeD = await mirrorPublication({
        variables: {
          request: {
            profileId: myProfileId,
            publicationId: id,
            referenceModule: null,
          },
        },
      })

      const typedData = typeD?.data?.createMirrorTypedData?.typedData

      const signer = library?.getSigner()

      // if (!typedData) return
      const signature = await signedTypeData(
        typedData.domain,
        typedData.types,
        typedData.value,
        signer
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

      const newLensId =
        Number(tx?.logs[0]?.topics[2]).toString(16).length === 1
          ? `0x${Number(tx?.logs[0]?.topics[1]).toString(16)}-0x0${Number(
              tx?.logs[0]?.topics[2]
            ).toString(16)}`
          : `0x${Number(tx?.logs[0]?.topics[1]).toString(16)}-0x${Number(
              tx?.logs[0]?.topics[2]
            ).toString(16)}`

      await mirrorPost({ lensId: id as string, newLensId })
    } catch (error_) {
      console.log(String(error_))
      toast.error(String(error_))
    } finally {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      refetchInfo && (await refetchInfo())
      setIsLoading(false)
    }
  }

  const renderMessage = () => {
    let message
    const messageTypeClone =
      from == '0x0000000000000000000000000000000000000000' ? 'MINTED' : messageType

    switch (messageTypeClone) {
      case 'MINTED':
        message = '🎉 Minted a new '
        break
      case 'RECEIVE':
        message = '📤 Received '
        break
      case 'SEND':
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
      <Loader show={isLoading} />
      {showAuthor && (
        <Author
          avatar={
            avatar && avatar !== null
              ? `${process.env.NEXT_PUBLIC_API_URL}avatars/${avatar}`
              : '/assets/images/temp-avatar.png'
          }
          name={username !== null ? username : name}
          profileId={profileId}
          date={`${moment(date).format('MMM, DD')} at ${moment(date).format('LT')}`}
          fromMirror={isMirror ? handleMirror : undefined}
        />
      )}

      <div style={{ marginLeft: showAuthor ? 56 : 0 }}>
        {showDate && (
          <div className="text-base font-normal text-gray mb-1">
            {`${moment(date).format('MMM, DD')} at ${moment(date).format('LT')}`}
          </div>
        )}

        <h4 className="text-base font-semibold break-words">
          {creator === process.env.NEXT_PUBLIC_ADMIN_ADDRESS && (
            <>
              <a
                target="_blank"
                href={
                  blockchainType === 'ETHEREUM'
                    ? `https://etherscan.io/address/${messageType == 'RECEIVE' ? to : from}`
                    : `https://polygonscan.com/address/${messageType == 'RECEIVE' ? to : from}`
                }
                className="text-main"
                rel="noreferrer"
              >
                {from == '0x0000000000000000000000000000000000000000'
                  ? `🎉 ${to}`
                  : messageType == 'RECEIVE'
                  ? `📤 ${to}`
                  : `📤 ${from}`}
              </a>
              <>
                {' '}
                {from == '0x0000000000000000000000000000000000000000'
                  ? `minted a new`
                  : messageType == 'RECEIVE'
                  ? `received`
                  : `sent`}
              </>
            </>
          )}
          {creator !== process.env.NEXT_PUBLIC_ADMIN_ADDRESS && renderMessage()}{' '}
          {from !== '0x0000000000000000000000000000000000000000' ? (
            messageType == 'RECEIVE' ? (
              <>from&nbsp;</>
            ) : (
              <>to&nbsp;</>
            )
          ) : (
            <>from Smart contract&nbsp;</>
          )}
          <a
            target="_blank"
            href={
              blockchainType === 'ETHEREUM'
                ? `https://etherscan.io/address/${
                    from == '0x0000000000000000000000000000000000000000' ? contractAddress : from
                  }`
                : `https://polygonscan.com/address/${
                    from == '0x0000000000000000000000000000000000000000' ? contractAddress : from
                  }`
            }
            className="text-main"
            rel="noreferrer"
          >
            {from == '0x0000000000000000000000000000000000000000'
              ? contractAddress
              : messageType == 'RECEIVE'
              ? from
              : to}
          </a>
        </h4>

        <div className="relative max-h-96 rounded-lg overflow-hidden mt-1">
          {image ? (
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}token-images/${image}`}
              alt="image"
              className="m-auto"
              onDoubleClick={likeHandler}
            />
          ) : (
            <img src={'/assets/images/eyes.png'} alt="image" className="m-auto mt-30 mb-30" />
          )}
          {/* <img
            src={ '/assets/images/eyes.gif'}s
            alt="image"
            className="object-cover"
          /> */}
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
          <div className="flex flex-col">
            <div className="text-sm font-normal text-gray-darker mt-1">FrenlyPost</div>
            <a
              target="_blank"
              href={
                blockchainType == 'ETHEREUM'
                  ? `https://etherscan.io/tx/${txHash}`
                  : `https://mumbai.polygonscan.com/tx/${txHash}`
              }
              className="text-sm text-main"
              rel="noreferrer"
            >
              {blockchainType === 'ETHEREUM' ? 'Etherscan' : 'Polygonscan'}
            </a>
          </div>
          {isAddCap === false && (
            <div className="flex items-center">
              <button
                disabled={isLikeRequest}
                onClick={likeHandler}
                className={`flex items-center justify-center py-1 px-2 ${
                  isLikeRequest ? 'bg-gray' : ''
                }`}
              >
                <img src="/assets/icons/heart.svg" alt="like" />
                <span className="text-xs font-semibold text-gray-darker ml-1">
                  {postData?.publication?.stats.totalUpvotes}
                </span>
              </button>
              <button
                onClick={() => setIsCommentsOpen(!isCommentsOpen)}
                className="flex items-center justify-center py-1 px-2"
              >
                <img src="/assets/icons/message.svg" alt="messages" />
                <span className="text-xs font-semibold text-gray-darker ml-1">
                  {comments?.publications?.items?.length}
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
        {isCommentsOpen && (
          <Comments
            refetchComment={refetchComments}
            refetchInfo={refetchInfo}
            comments={comments}
            pubId={id}
            profileId={myProfileId}
          />
        )}
      </div>
    </article>
  )
}
