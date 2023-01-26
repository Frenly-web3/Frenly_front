// import { useUserInfo } from '@entities/user'
// import { userApi } from '@shared/api'
// import { useLoaderContext } from '@shared/lib'
// import { useCallback, useEffect, useState } from 'react'

// export function useUploadUserInfo({ profileId }: { profileId: string }) {
//   const { user, refetchUserInfo } = useUserInfo({ profileId })
//   const [uploadUserInfo] = userApi.useUploadUserInfoMutation()
//   const { setIsLoading } = useLoaderContext()
//   const [isEditMode, setIsEditMode] = useState(false)
//   const [username, setUsername] = useState<string>('')
//   const [description, setDescription] = useState<string>('')

//   useEffect(() => {
//     if (!isEditMode && user) {
//       setUsername(
//         user?.name !== null
//           ? user?.name
//           : `frenly.${(user.address as string).slice(0, 5)}`
//       )
//       setDescription(
//         user?.description !== null ? user?.description : (user?.address as string)
//       )
//     }
//   }, [user])

//   const saveHandle = useCallback(async () => {
//     try {
//       setIsLoading(true)
//       if (username || description) {
//         await uploadUserInfo({ username, description })
//       }
//     } finally {
//       refetchUserInfo()
//       setIsEditMode(false)
//       setIsLoading(false)
//     }
//   }, [description, username])

//   return {
//     status: user?.status,
//     isEditMode,
//     setIsEditMode,
//     description,
//     username,
//     setDescription,
//     setUsername,
//     saveHandle,
//   }
// }

export {}
