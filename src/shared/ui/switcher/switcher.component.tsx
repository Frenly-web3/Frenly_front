import React from 'react'

interface ISwitcherProperties {
  checked: boolean
  switcherHandler: () => void
  children: React.ReactNode
}

export const Switcher = (props: ISwitcherProperties) => {
  const { checked, children, switcherHandler } = props
  return (
    <div className="flex flex-col items-end container py-3 top-0">
      <div className="form-check form-switch flex flex-col items-center">
        <label
          className="form-check-label inline-block text-gray-800 mb-3"
          htmlFor="flexSwitchCheckDefault"
        >
          {children}
        </label>
        <div className="ml-10">
          <input
            className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-gray-darker bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            checked={checked}
            onChange={switcherHandler}
          />
        </div>
      </div>
    </div>
  )
}
