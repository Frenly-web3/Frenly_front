import React from 'react'

import { useAddTrackAddress } from '../model'

export const AddTrackAddress = () => {
  const { address, setAddress, addTrackAddress } = useAddTrackAddress()

  return (
    <div>
      <div className="w-full container pt-4 pb-4 flex">
        <div className="flex rounded-2xl bg-gray-darker px-4 py-2 w-full mr-2">
          <input
            style={{ background: 'transparent' }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            className="outline-none w-full max-w-3xl:w-30 text-white"
            placeholder="Description"
          />
        </div>
        <button
          onClick={addTrackAddress}
          className="flex items-center justify-center py-1 px-2"
        >
          <img src="/assets/icons/send-icon.svg" alt="messages" />
        </button>
      </div>
    </div>
  )
}
