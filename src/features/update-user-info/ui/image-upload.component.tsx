import { useCheckIsOwner } from '@shared/lib'
import React from 'react'

import { useUploadAvatar, useUploadUserInfo } from '../model'

interface IImageUploadProperties {
  profileId: string
}

export const ImageUpload = (props: IImageUploadProperties) => {
  const { profileId } = props
  const { status } = useUploadUserInfo({ profileId })
  const checkIsOwner = useCheckIsOwner({ status })
  const { changeImageHandle, previewValue } = useUploadAvatar({
    profileId,
  })
  return (
    <>
      {previewValue ? (
        <div
          className={`m-auto mt-3 ${
            checkIsOwner && 'cursor-pointer'
          } relative flex items-center justify-center w-24 h-24`}
        >
          <img
            src={previewValue}
            className="align-center absolute w-full h-full rounded-full"
            alt="avatar"
            width={96}
            height={96}
          />
          {checkIsOwner && (
            <div
              style={{ backgroundColor: 'rgba(251, 251, 251, 0.4)' }}
              className={
                'opacity-0 hover:opacity-100 w-full h-full z-200 absolute top-[0] left-[0] flex items-center justify-center rounded transition duration-100 ease-in-out'
              }
            >
              +
              <input
                type="file"
                onChange={(e) => {
                  changeImageHandle({
                    imageUrl: e.target.files !== null && e.target.files[0],
                  })
                }}
                accept={'image/png, image/jpeg'}
                className="opacity-0 absolute w-full h-full cursor-pointer"
              />
            </div>
          )}
        </div>
      ) : (
        <div
          className={`m-auto mt-3 relative flex items-center justify-center w-24 h-24 rounded-full bg-gray-darker animate-pulse`}
        ></div>
      )}
    </>
  )
}
