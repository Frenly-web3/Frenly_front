import React from 'react'

import { Modal } from '../modal'

interface IDescriptionProperties {
  show: boolean
  description: string
  setDescription: (state: string) => void
  descriptionHandler: () => void
  closeModal: () => void
}

export const DescriptionModal = (props: IDescriptionProperties) => {
  const { show, description, setDescription, descriptionHandler, closeModal } = props
  return (
    <Modal opened={show} onClose={closeModal}>
      <div className="w-full pt-4 pb-4 flex">
        <div className="flex rounded-2xl bg-gray-darker px-4 py-2 w-full mr-2">
          <input
            style={{ background: 'transparent' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="outline-none w-full max-w-3xl:w-30 text-white"
            placeholder="Description"
          />
        </div>
        <button
          onClick={closeModal}
          className="flex items-center justify-center py-1 px-2 w-9 h-9"
        >
          <img src="/assets/images/close-icon.png" alt="close" />
        </button>
        <button
          onClick={descriptionHandler}
          className="flex items-center justify-center py-1 px-2"
        >
          <img src="/assets/icons/send-icon.svg" alt="messages" />
        </button>
      </div>
    </Modal>
  )
}
