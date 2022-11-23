import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { createBaseSelector } from '@shared/lib'

import type { IUser } from './user.entity'

export interface UserState {
  accessToken: string | null
  accessTokenLens: string | null
  refreshToken: string | null
  refreshTokenLens: string | null
  isLensAuth: boolean
  isAuth: boolean
  user: IUser | null
}

const initialState: UserState = {
  accessToken: null,
  accessTokenLens: null,
  refreshToken: null,
  refreshTokenLens: null,
  isLensAuth: false,
  isAuth: false,
  user: null,
}

const reducerPath = 'viewer'

export const userSlice = createSlice({
  name: reducerPath,
  initialState: () => {
    return initialState
  },
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
    setLensAuth: (state, action: PayloadAction<{ isLensAuth: boolean }>) => {
      state.isLensAuth = action.payload.isLensAuth
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
      window?.localStorage?.setItem('access-token', action.payload.accessToken)
      window?.localStorage?.setItem('refresh-token', action.payload.refreshToken)

      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    setTokensLens: (
      state,
      action: PayloadAction<{
        accessTokenLens: string
        refreshTokenLens: string
      }>
    ) => {
      window?.localStorage?.setItem('access-token-lens', action.payload.accessTokenLens)
      window?.localStorage?.setItem('refresh-token-lens', action.payload.refreshTokenLens)

      state.accessTokenLens = action.payload.accessTokenLens
      state.refreshTokenLens = action.payload.refreshTokenLens
    },
    revertInitialState: (state) => {
      window?.localStorage?.clear()

      state = initialState
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setUser,
  revertInitialState,
  setTokens,
  setAuth,
  setLensAuth,
  setTokensLens,
} = userSlice.actions
export default userSlice.reducer

export const viewerSelector = createBaseSelector<UserState>(reducerPath)

export const { actions } = userSlice
