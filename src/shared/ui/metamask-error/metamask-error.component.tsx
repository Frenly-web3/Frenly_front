import React from 'react'

import { Modal } from '../modal'

export const MetamaskError = (props: any) => {
  return (
    <Modal {...props}>
      <span className="text-4xl font-bold mt-16">
        Your browser does not support Metamask
      </span>
    </Modal>
  )
}
