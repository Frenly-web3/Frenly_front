import { DescriptionModal, IconButton } from '@shared/ui'
import React from 'react'

import { useMirrorPost } from '../model'

interface IMirrorButton {
  publicationId: string
  refetchFilteredFeed: () => void
}

export const MirrorButton = (props: IMirrorButton) => {
  const { publicationId, refetchFilteredFeed } = props

  const {
    amountMirrors,
    mirrorPost,
    descriptionMirror,
    setDescriptionMirror,
    isShowDescription,
    setIsShowDescription,
  } = useMirrorPost({ publicationId, refetchFilteredFeed })

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
