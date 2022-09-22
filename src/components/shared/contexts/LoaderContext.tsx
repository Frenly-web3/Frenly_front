import error from "next/error"
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from "react"
import Loader from "../Loader/Loader";

export interface LoaderContextType {
  isLoading: boolean
  setIsLoading:Dispatch<SetStateAction<boolean>>
}

export const LoaderContext = createContext<LoaderContextType>({
  isLoading:false,
  setIsLoading:()=>true
})


export const LoaderContextProvider = ({children}:any) => {
   const [isLoading, setIsLoading] = useState(false);

  const internalValue = {
    isLoading,
    setIsLoading
  }

  return  (
     <LoaderContext.Provider value={internalValue}>
           {children}
     </LoaderContext.Provider>
  )
}


export const useLoaderContext = () => {
  const ctx = useContext(LoaderContext)
  return useMemo(() => ctx, [ctx])
}


