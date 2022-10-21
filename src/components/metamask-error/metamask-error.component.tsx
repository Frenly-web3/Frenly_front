import Image from 'next/image'
import React from 'react'

export const MetamaskError = ({ show }: any) => {
  if (!show) return <></>

  return (
    <div className={`bg-black ${show ? 'fixed inset-0 z-50 bg-opacity-50' : ''}`}>
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
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <div
            className="inline-block bg-white rounded-lg text-left 
          overflow-hidden shadow-xl transform transition-all h-screen opacity-90 align-middle w-full"
          >
            <div
              style={{ transform: 'translate(-50%,-50%)' }}
              className="absolute top-1/2 left-1/2 bg-white  pt-5 pb-4 sm:p-6 sm:pb-4 text-center"
            >
              <div className="flex flex-col justify-center items-center p-8">
                <Image
                  src="/assets/images/eyes.gif"
                  alt="eyes"
                  width={85}
                  height={85}
                  className={'w-20 h-20'}
                />
                <span className="text-4xl font-bold mt-16">
                  Your browser does not support Metamask
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MetamaskError
