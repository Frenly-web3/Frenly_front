import React, { createContext, useContext, useMemo, useState } from 'react'

export interface DispatcherLensContextType {
  isShow: boolean
  setIsShow: (state: boolean) => void
}

export const DispatcherLensContext = createContext<DispatcherLensContextType>({
  isShow: false,
  setIsShow: () => true,
})

export const DispatcherLensContextProvider = ({ children }: any) => {
  const [isShow, setIsShow] = useState(false)

  const internalValue = {
    isShow,
    setIsShow,
  }

  return (
    <DispatcherLensContext.Provider value={internalValue}>
      {children}
    </DispatcherLensContext.Provider>
  )
}

export const useDispatcherLensContext = () => {
  const context = useContext(DispatcherLensContext)
  return useMemo(() => context, [context])
}
