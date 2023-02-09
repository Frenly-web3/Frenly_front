import * as jwt from 'jsonwebtoken'

export const AuthHelper = {
  decodeJwt: ({ token }: { token: string | null }) => {
    if (!token) return
    return jwt.decode(token) as { exp: number; walletAddress: string }
  },
  isExpired: ({ token }: { token: string | null }) => {
    if (!token) return true
    // @ts-ignore
    const decodedToken = AuthHelper.decodeJwt({ token })
    return decodedToken ? Date.now() > decodedToken.exp * 1000 : true
  },
}
