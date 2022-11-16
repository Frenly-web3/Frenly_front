import { useCheckIsOwner } from '@shared/lib'
import { BackButtonComponent, ProfileButton } from '@shared/ui'
import React from 'react'

import { useUploadUserInfo } from '../model'
import { ImageUpload } from './image-upload.component'

interface IInfoUploadProperties {
  profileId: string
}

export const InfoUploadComponent = (props: IInfoUploadProperties) => {
  const { profileId } = props

  const {
    isEditMode,
    setIsEditMode,
    username,
    description,
    setUsername,
    setDescription,
    saveHandle,
    status,
  } = useUploadUserInfo({ profileId })

  const checkIsOwner = useCheckIsOwner({ status })
  return (
    <>
      <div className="py-2 flex justify-between">
        <BackButtonComponent />
        {isEditMode ? (
          <input
            style={{ background: 'transparent' }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className={`py-2 z-100 text-xl font-bold ${
              checkIsOwner && 'cursor-pointer'
            }  border-solid border-gray-100 border-b-2 w-70 
          
                 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none font-normal text-gray`}
            placeholder="Input your name"
          />
        ) : (
          <h3
            onDoubleClick={() => checkIsOwner && setIsEditMode(true)}
            className={`py-2 z-100 text-xl pr-4 font-bold m-auto text-center ${
              checkIsOwner && 'cursor-pointer'
            }`}
          >
            {username}
          </h3>
        )}
      </div>
      <ImageUpload profileId={profileId} />
      {isEditMode ? (
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
      ) : (
        <div
          onDoubleClick={() => checkIsOwner && setIsEditMode(true)}
          className={`text-base z-100 ${
            checkIsOwner && 'cursor-pointer'
          } font-normal text-gray mb-5 text-center m-auto mt-4 w-80 break-words`}
        >
          {description}
        </div>
      )}
      {isEditMode && <ProfileButton onClick={saveHandle}>SAVE</ProfileButton>}
    </>
  )
}
