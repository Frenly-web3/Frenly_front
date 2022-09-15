import { authenticate } from './authenticate'
import { signMessage } from './ethers-service'
import { generateChallenge } from './generate-challenge'

export const login = async (address: string, lib: any) => {
  // we request a challenge from the server
  const challengeResponse = await generateChallenge(address)

  console.log('challengeRes', challengeResponse)

  // sign the text with the wallet
  const signature = await signMessage(lib, challengeResponse.data.challenge.text)

  const data = await authenticate(address, signature)

  const { accessToken } = data.data.authenticate
  const { refreshToken } = data.data.authenticate
  console.log(accessToken)
  localStorage.setItem('auth_token', accessToken)
  localStorage.setItem('refreshToken', refreshToken)

  // you now have the accessToken and the refreshToken
  // {
  //  data: {
  //   authenticate: {
  //    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YjE5QzI4OTBjZjk0N0FEM2YwYjdkN0U1QTlmZkJjZTM2ZDNmOWJkMiIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE2NDUxMDQyMzEsImV4cCI6MTY0NTEwNjAzMX0.lwLlo3UBxjNGn5D_W25oh2rg2I_ZS3KVuU9n7dctGIU",
  //    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YjE5QzI4OTBjZjk0N0FEM2YwYjdkN0U1QTlmZkJjZTM2ZDNmOWJkMiIsInJvbGUiOiJyZWZyZXNoIiwiaWF0IjoxNjQ1MTA0MjMxLCJleHAiOjE2NDUxOTA2MzF9.2Tdts-dLVWgTLXmah8cfzNx7sGLFtMBY7Z9VXcn2ZpE"
  //   }
  // }
}
