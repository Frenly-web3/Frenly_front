/* eslint-disable boundaries/element-types */
/* eslint-disable boundaries/entry-point */
import { UserModelService } from '@entities/user'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import {
  adminApi,
  alchemyApi,
  authApi,
  contentApi,
  reactionsApi,
  userApi,
} from '@shared/api'

export const store = configureStore({
  reducer: {
    user: UserModelService.userSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [contentApi.reducerPath]: contentApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [alchemyApi.reducerPath]: alchemyApi.reducer,
    [reactionsApi.reducerPath]: reactionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      contentApi.middleware,
      userApi.middleware,
      adminApi.middleware,
      alchemyApi.middleware,
      reactionsApi.middleware
    ),
})

setupListeners(store.dispatch)
