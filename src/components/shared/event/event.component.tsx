import { useMutation } from '@apollo/client'
import Author from '@components/shared/author/author.component'
import styles from '@components/shared/event/event.module.scss'
import { CREATE_POST_TYPED_DATA } from '@store/lens/add-post.mutation'
import { signedTypeData, splitSignature } from '@store/lens/post/create-post.utils'
import { useEthers } from '@usedapp/core'
import clsx from 'clsx'
import Image from 'next/image'
import { useGetWalletProfileId, usePostWithSig } from 'src/contract/lens-hub.api'

export interface IEventProperties {
  isAddCap?: boolean
  image: string
  from: string
  to: string
  info: string
  showDate?: boolean
  showAuthor?: boolean
  // ! find out if there will be message types
  messageType: 'sent' | 'received' | 'minted'
  //  ! item type?
  itemType: 'nft' | 'token'
}

export default function Event(props: IEventProperties): JSX.Element {
  const {
    isAddCap = false,
    image,
    from,
    to,
    info,
    showDate = true,
    showAuthor = false,
    messageType,
    itemType,
  } = props

  const { account, library } = useEthers()
  const profileId = useGetWalletProfileId(account || '')
  const { state: txHash, send: postWithSig } = usePostWithSig()
  const [addPostToLens, data] = useMutation(CREATE_POST_TYPED_DATA)

  const addPost = async () => {
    console.log(profileId)

    console.log(data)
    try {
      await addPostToLens({
        variables: {
          request: {
            profileId,
            contentURI: 'ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8sN6vl/a19',
            collectModule: {
              revertCollectModule: true,
            },
            referenceModule: {
              followerOnlyReferenceModule: false,
            },
          },
        },
      })
    } catch (error) {
      console.log(error)

      return
    }

    console.log(data)

    const typedData = data?.data?.createPostTypedData?.typedData

    if (!typedData) return

    const signature = await signedTypeData(
      typedData.domain,
      typedData.types,
      typedData.value,
      library
    )

    const { v, r, s } = splitSignature(signature)

    await postWithSig({
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
    console.log(txHash)
  }

  const renderMessage = () => {
    let message
    switch (messageType) {
      case 'minted':
        message = '🎉 Minted a new '
        break
      case 'received':
        message = '📤 Received '
        break
      case 'sent':
        message = '📤 Sent '
        break
      default:
        break
    }
    switch (itemType) {
      case 'nft':
        message += `${messageType !== 'minted' ? 'an' : ''} NFT`
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
        <Author avatar="/assets/images/temp-avatar.jpg" name="elonmusk" date="Sep, 11 at 9:41 AM" />
      )}

      <div style={{ marginLeft: showAuthor ? 56 : 0 }}>
        {showDate && <div className="text-base font-normal text-gray mb-1">Sep, 11 at 9:41 AM</div>}

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
              onClick={() => addPost()}
              className="rounded-full bg-main py-2 text-white text-sm font-semibold"
            >
              Publish
            </button>
            <button className="rounded-full bg-error-bg py-2 text-error text-sm font-semibold">
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
              <button className="flex items-center justify-center py-1 px-2">
                <img src="/assets/icons/heart.svg" alt="like" />
                <span className="text-xs font-semibold text-gray-darker ml-1">10</span>
              </button>
              <button className="flex items-center justify-center py-1 px-2">
                <img src="/assets/icons/message.svg" alt="messages" />
                <span className="text-xs font-semibold text-gray-darker ml-1">3</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
