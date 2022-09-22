import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface IUser {
  // ...
}

export interface AuthState {
  refreshToken: string | null
  accessToken: string | null
  isLoading: boolean
  user: IUser | null
}

const initialState: AuthState = {
  accessToken:
    (typeof window != 'undefined' && localStorage && localStorage.getItem('access-token')) || null,
  refreshToken:
    (typeof window != 'undefined' && localStorage && localStorage.getItem('refresh-token')) || null,
  user: null,
  isLoading: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
    setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      console.log('acac', action)
      localStorage.setItem('access-token', action.payload.accessToken)
      localStorage.setItem('refresh-token', action.payload.refreshToken)
      console.log(action)

      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    refreshToken: (
      state,
      action: PayloadAction<{ data: { accessToken: string; refreshToken: string } }>
    ) => {
      localStorage.setItem('access-token', action.payload.data.accessToken)
      localStorage.setItem('refresh-token', action.payload.data.refreshToken)
      state.accessToken = action.payload.data.accessToken
      state.refreshToken = action.payload.data.refreshToken
    },
    logout: state => {
      localStorage.clear()
      state.accessToken = null
      state.refreshToken = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, logout, refreshToken, setTokens } = authSlice.actions

export default authSlice.reducer
