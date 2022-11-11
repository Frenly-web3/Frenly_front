import React, { createContext, useContext, useMemo, useState } from 'react'

export interface LoaderContextType {
  isLoading: boolean
  setIsLoading: (state: boolean) => void
}

export const LoaderContext = createContext<LoaderContextType>({
  isLoading: false,
  setIsLoading: () => true,
})

export const LoaderContextProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false)

  const internalValue = {
    isLoading,
    setIsLoading,
  }

  return <LoaderContext.Provider value={internalValue}>{children}</LoaderContext.Provider>
}

export const useLoaderContext = () => {
  const context = useContext(LoaderContext)
  return useMemo(() => context, [context])
}
