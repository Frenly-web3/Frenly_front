import React from 'react'

import { Modal } from '../modal'

interface IDescriptionProperties {
  show: boolean
  description: string
  setDescription: (state: string) => void
  descriptionHandler: () => void
}

export const DescriptionModal = (props: IDescriptionProperties) => {
  const { show, description, setDescription, descriptionHandler } = props
  return (
    <Modal show={show}>
      <div className="w-full pt-4 pb-4 flex">
        <div className="flex rounded-2xl bg-light-gray px-4 py-2 w-full mr-2">
          <input
            style={{ background: 'transparent' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="outline-none w-full max-w-3xl:w-30"
            placeholder="Description"
          />
        </div>
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
