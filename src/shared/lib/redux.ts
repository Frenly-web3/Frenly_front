import { useCallback } from 'react'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'

export const useAppDispatch = <A extends any[]>(actionCreator: (...args: A) => any) => {
  const dispatch = useDispatch()
  return useCallback(
    // eslint-disable-next-line prefer-spread
    (...args: A) => dispatch(actionCreator.apply(null, args)),
    [actionCreator, dispatch]
  )
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

type RootState = Record<string, unknown>

export function createBaseSelector<T>(rootKey: string) {
  return (state: RootState) => {
    if (rootKey in state) {
      return state[rootKey] as T
    }
    throw new Error(`Reducer ${rootKey} in not registered`)
  }
}
