import { DescriptionModal, IconButton } from '@shared/ui'
import React from 'react'

import { useMirrorPost } from '../model'

interface IMirrorButton {
  publicationId: string
}

export const MirrorButton = (props: IMirrorButton) => {
  const { publicationId } = props

  const {
    amountMirrors,
    mirrorPost,
    descriptionMirror,
    setDescriptionMirror,
    isShowDescription,
    setIsShowDescription,
  } = useMirrorPost({ publicationId })

  const mirrorButtonHandler = () => {
    setIsShowDescription(true)
  }

  return (
    <>
      <DescriptionModal
        show={isShowDescription}
        description={descriptionMirror}
        descriptionHandler={mirrorPost}
        setDescription={setDescriptionMirror}
      />
      <IconButton
        image="/assets/icons/mirror.svg"
        amount={amountMirrors}
        onClick={mirrorButtonHandler}
      />
    </>
  )
}
