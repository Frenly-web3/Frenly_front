import React from 'react'
import { createPortal } from 'react-dom'

import { BackButtonComponent } from '../back-button'

interface IDialogProperties {
  show: boolean
  closeDialog: () => void
  children: React.ReactNode
}

export const Dialog = (props: IDialogProperties) => {
  const { show, closeDialog, children } = props
  return show ? (
    createPortal(
      <div className="top-0 fixed h-screen w-screen">
        <div className="w-96 top-16 mx-auto relative bg-white pt-5 rounded-xl border-2 border-gray-darker flex flex-col items-center">
          <div className="left-5 absolute">
            <BackButtonComponent onClick={closeDialog} />
          </div>
          <div className="w-60 h-full flex flex-col justify-around">{children}</div>
        </div>
      </div>,
      // @ts-ignore
      document?.querySelectorAll('#portal')[0]
    )
  ) : (
    <></>
  )
}
