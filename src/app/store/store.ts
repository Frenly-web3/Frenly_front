import { userReducer } from '@entities/user'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import {
  adminApi,
  alchemyApi,
  authApi,
  communityApi,
  contentApi,
  reactionsApi,
  userApi,
} from '@shared/api'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [contentApi.reducerPath]: contentApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [alchemyApi.reducerPath]: alchemyApi.reducer,
    [reactionsApi.reducerPath]: reactionsApi.reducer,
    [communityApi.reducerPath]: communityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      contentApi.middleware,
      userApi.middleware,
      adminApi.middleware,
      alchemyApi.middleware,
      reactionsApi.middleware,
      communityApi.middleware
    ),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
