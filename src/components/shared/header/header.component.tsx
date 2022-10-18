/* eslint-disable sonarjs/cognitive-complexity */
import Author from '@components/shared/author/author.component'
import { useEthers } from '@usedapp/core'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useGetWalletProfileId } from 'src/contract/lens-hub.api'

import Loader from '../loader/loader.component'
import { useUpdate } from './use-update-user.hook'

export interface IHeaderProperties {
  title: string
  showAddPost?: boolean
  showPostAuthor?: boolean
  isOwner?: boolean
  accountId?: string
  nickname?: string
  address?: string
  followHandle?: () => void
  unfollowHandle?: () => void
  followers?: number
  isFollow?: boolean
}

export default function Header(props: IHeaderProperties): JSX.Element {
  const {
    title,
    showAddPost = false,
    showPostAuthor = false,
    isOwner,
    accountId,
    nickname,
    address,
    followHandle,
    unfollowHandle,
    followers,
    isFollow,
  } = props
  const router = useRouter()
  const { account } = useEthers()
  const [isEdit, setIsEdit] = useState(false)
  // const [isDescEdit, setIsDescEdit] = useState(false)
  const { userInfo, updateUserInfo, refetchUserInfo, name, description, avatar, uploadImage } =
    useUpdate(address || account || '')
  const lensId = useGetWalletProfileId(account || '')
  const [nameValue, setNameValue] = useState(name === null ? nickname : name)
  const [descValue, setDescValue] = useState(description === null ? address : description)
  const [previewValue, setPreviewValue] = useState(
    avatar && avatar !== null
      ? `${process.env.NEXT_PUBLIC_API_URL}avatars/${avatar}`
      : '/assets/images/temp-avatar.png'
  )
  const [fileImage, setFileImage] = useState()
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setNameValue(name === null ? nickname : name)
    setDescValue(description === null ? address : description)
    setPreviewValue(
      avatar && avatar !== null
        ? `${process.env.NEXT_PUBLIC_API_URL}avatars/${avatar}`
        : '/assets/images/temp-avatar.png'
    )
  }, [nickname, address, name, description, avatar, isOwner])

  useEffect(() => {
    if (!account) {
      toast.warn('Connect your wallet')
      // router.push('/feed')
    }
  }, [account, router])

  const saveHandle = async () => {
    setIsLoading(true)
    try {
      if (nameValue || descValue) {
        await updateUserInfo({ username: nameValue, description: descValue })
        // refetchUserInfo
      }
      if (fileImage) {
        await uploadImage({ avatar: fileImage })
      }
    } catch {
    } finally {
      refetchUserInfo()
      setIsEdit(false)
      setIsLoading(false)
    }
  }

  const changeImageHandle = (imageUrl: any) => {
    setIsEdit(true)
    const preview = URL.createObjectURL(imageUrl)
    setPreviewValue(preview)
    setFileImage(imageUrl)
  }

  return (
    <header className="container py-3 top-0 bg-white">
      <Loader show={isLoading} />
      {showAddPost ? (
        <>
          <div className="flex justify-between mb-1 sticky border-b border-border-color pt-2 pb-4">
            <div className="flex flex-row justify-between">
              <Image src="/assets/icons/eyesLogo.svg" alt="eyes" width={28} height={24} />
              <h2 className="text-4xl font-bold ml-3">{title}</h2>
            </div>

            <div className="mr-4 flex items-center border rounded-full border-border-color overflow-hidden self-start">
              <img
                src={
                  avatar && avatar !== null
                    ? `${process.env.NEXT_PUBLIC_API_URL}avatars/${avatar}`
                    : '/assets/images/temp-avatar.png'
                }
                alt={'avatar'}
                onClick={() => {
                  router.push(`profile/${lensId}`)
                }}
                className={`cursor-pointer w-7 h-7`}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center border-b border-border-color">
          <div className="py-2 flex justify-between">
            <button onClick={() => router.push('/feed')} className="flex items-center mr-4">
              <Image src="/assets/icons/arrow-back.svg" alt="back" width={10} height={19} />
            </button>
            {isEdit ? (
              <input
                style={{ background: 'transparent' }}
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
                type="text"
                className={`py-2 z-100 text-xl font-bold ${
                  isOwner && 'cursor-pointer'
                } border border-solid border-gray-100
                rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none font-normal text-gray`}
                placeholder="Input your name"
              />
            ) : (
              <h3
                onDoubleClick={() => isOwner && setIsEdit(true)}
                className={`py-2 z-100 text-xl pr-4 font-bold ${isOwner && 'cursor-pointer'}`}
              >
                {nameValue}
              </h3>
            )}
            <button></button>
          </div>
          <div
            className={`m-auto mt-3 ${
              isOwner && 'cursor-pointer'
            } relative flex items-center justify-center w-24 h-24`}
          >
            <img
              src={previewValue}
              className="align-center absolute w-full h-full"
              alt="avatar"
              // width={96}
              // height={96}
            />
            {isOwner && (
              <div
                style={{ backgroundColor: 'rgba(251, 251, 251, 0.4)' }}
                className={
                  'opacity-0 hover:opacity-100 w-full h-full z-200 absolute top-[0] left-[0] flex items-center justify-center rounded transition duration-100 ease-in-out'
                }
              >
                +
                <input
                  type="file"
                  onChange={e => {
                    changeImageHandle(e.target.files !== null && e.target.files[0])
                  }}
                  accept={'image/png, image/jpeg'}
                  className="opacity-0 absolute w-full h-full cursor-pointer"
                />
              </div>
            )}
          </div>
          {isEdit ? (
            <input
              style={{ background: 'transparent' }}
              value={descValue}
              onChange={e => setDescValue(e.target.value)}
              className="form-control
              flex
              justify-center
              flex-col
              text-base z-100 cursor-pointer font-normal text-gray mb-5 text-center m-auto mt-4 w-70 break-words
              border border-solid border-gray-100 focus:bg-white focus:border-blue-600 focus:outline-none
              rounded
            "
              placeholder="Input your description"
            />
          ) : (
            <div
              onDoubleClick={() => isOwner && setIsEdit(true)}
              className={`text-base z-100 ${
                isOwner && 'cursor-pointer'
              } font-normal text-gray mb-5 text-center m-auto mt-4 w-80 break-words`}
            >
              {descValue}
            </div>
          )}
          {isEdit && (
            <button
              onClick={saveHandle}
              className="rounded-full bg-main py-2 text-white text-sm font-semibold w-23 pl-4 pr-4 m-auto mb-8"
            >
              SAVE
            </button>
          )}
          <div className="text-base font-normal text-gray mb-5 text-center m-auto mt-4">
            Followers: {followers}
          </div>

          {!isOwner ? (
            isFollow ? (
              <button
                onClick={unfollowHandle}
                className="rounded-full bg-main py-2 text-white text-sm font-semibold w-23 pl-4 pr-4 m-auto mb-8"
              >
                UNFOLLOW
              </button>
            ) : (
              <button
                onClick={followHandle}
                className="rounded-full bg-main py-2 text-white text-sm font-semibold w-23 pl-4 pr-4 m-auto mb-8"
              >
                FOLLOW
              </button>
            )
          ) : (
            ''
          )}
        </div>
      )}
    </header>
  )
}
