import { useCheckIsOwner, useGetENSByAddress } from '@shared/lib'
import { BackButtonComponent } from '@shared/ui'
import { useRouter } from 'next/router'
import React from 'react'
import { useGetWalletAddress } from 'src/blockchain'

import { useUploadUserInfo } from '../model'
// import { ImageUpload } from './image-upload.component'

interface IInfoUploadProperties {
  profileId: string
}

export const InfoUploadComponent = (props: IInfoUploadProperties) => {
  const { profileId } = props

  const profileAddress = useGetWalletAddress({ tokenId: profileId })

  const {
    // isEditMode,
    setIsEditMode,
    // username,
    description,
    // setUsername,
    // setDescription,
    // saveHandle,
    status,
  } = useUploadUserInfo({ profileId })
  const router = useRouter()
  const checkIsOwner = useCheckIsOwner({ status })

  const ens = useGetENSByAddress({ address: profileId })
  return (
    <>
      <div className="py-2 flex flex-col justify-between">
        <BackButtonComponent onClick={() => router.push('/feed')} />
        {/* {isEditMode ? (
          <input
            style={{ background: 'transparent' }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className={`m-auto z-100 text-xl font-bold ${
              checkIsOwner && 'cursor-pointer'
            }  border-solid border-gray-100 border-b-2 w-70 
          
                 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none font-normal text-gray`}
            placeholder="Input your name"
          />
        ) : ( */}
        <>
          {profileId ? (
            <h3
              // onDoubleClick={() => checkIsOwner && setIsEditMode(true)}
              className={`py-2 z-100 text-xl pr-4 text-heading font-display font-bold m-auto text-center ${
                checkIsOwner && 'cursor-pointer'
              }`}
            >
              {ens || `0x ${profileId.slice(2, 6)}...${profileId.slice(-4)}`}
            </h3>
          ) : (
            <div className="m-auto w-5/12 h-4 rounded-full bg-gray animate-pulse mr-40"></div>
          )}
        </>
        {/* )} */}
      </div>
      <div className="m-auto mt-3">
        <img
          src={'/assets/images/temp-avatar.png'}
          className="align-center rounded-full"
          alt="avatar"
          width={96}
          height={96}
        />
      </div>
      {/* <ImageUpload profileId={profileId} /> */}
      {/* {isEditMode ? (
        <>
          <input
            style={{ background: 'transparent' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control
            flex
            justify-center
            flex-col
            text-base z-100 cursor-pointer font-normal text-gray mb-5 text-center m-auto mt-4 w-70 break-words
            border-b-2 border-solid border-gray-100 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Input your description"
          />
        </>
      ) : ( */}
      <>
        <div
          className={`text-base z-100 font-normal text-gray mb-5 text-center m-auto mt-4 w-80 break-words`}
        >
          {profileId}
        </div>
        {/* {description ? (
          <div
            onDoubleClick={() => checkIsOwner && setIsEditMode(true)}
            className={`text-base z-100 ${
              checkIsOwner && 'cursor-pointer'
            } font-normal text-gray mb-5 text-center m-auto mt-2 w-80 break-words`}
          >
            Description: {description}
          </div>
        ) : null} */}
      </>
      {/* )} */}
      {/* {isEditMode && <ProfileButton onClick={saveHandle}>SAVE</ProfileButton>} */}
    </>
  )
}
