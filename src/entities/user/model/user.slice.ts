import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { createBaseSelector } from '@shared/lib'

import type { IUser } from './user.entity'

export interface UserState {
  accessToken: string | null
  refreshToken: string | null
  isAuth: boolean
  user: IUser | null
}

const initialState: UserState = {
  accessToken: null,
  refreshToken: null,
  isAuth: false,
  user: null,
}

const reducerPath = 'user'

export const userSlice = createSlice({
  name: reducerPath,
  initialState: () => {
    return initialState
  },
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
    setAuth: (state, action: PayloadAction<{ isAuth: boolean }>) => {
      state.isAuth = action.payload.isAuth
    },
    setTokens: (
      state,
      action: PayloadAction<{
        accessToken: string
        refreshToken: string
      }>
    ) => {
      window.localStorage.setItem('access-token', action.payload.accessToken)
      window.localStorage.setItem('refresh-token', action.payload.refreshToken)

      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    revertInitialState: (state) => {
      window.localStorage.removeItem('access-token')
      window.localStorage.removeItem('refresh-token')

      state = initialState
    },
  },
})

export const { setUser, revertInitialState, setTokens, setAuth } = userSlice.actions

export const userReducer = userSlice.reducer

export const userSelector = createBaseSelector<UserState>(reducerPath)

export const { actions } = userSlice
