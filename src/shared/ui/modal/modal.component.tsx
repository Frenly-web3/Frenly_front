import React from 'react'
import { createPortal } from 'react-dom'

interface IModalProperties {
  show: boolean
  children?: React.ReactNode
}

export const Modal = (props: IModalProperties) => {
  const { show, children } = props

  return show
    ? createPortal(
        <div
          className={`absolute bg-black ${
            show ? 'fixed inset-0 z-40 bg-opacity-50' : ''
          }`}
        >
          <div
            className="fixed z-50 inset-0"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="min-h-screen pb-20 text-center block p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              />
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div
                className="inline-block bg-frenly-light text-left 
          overflow-hidden shadow-xl transform transition-all h-screen opacity-90 align-middle w-full"
              >
                <div
                  style={{ transform: 'translate(-50%,-50%)' }}
                  className="absolute top-1/2 left-1/2 bg-frenly-light  pt-5 pb-4 sm:p-6 sm:pb-4 text-center"
                >
                  <div className="flex flex-col justify-center items-center p-8">
                    {children || ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        // @ts-expect-error
        document.querySelectorAll('#portal')[0]
      )
    : null
}
