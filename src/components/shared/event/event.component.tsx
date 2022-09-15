import { useMutation } from '@apollo/client'
import styles from '@components/shared/event/event.module.scss'
import { CREATE_POST_TYPED_DATA } from '@store/lens/add-post.mutation'
import { signedTypeData, splitSignature } from '@store/lens/post/create-post.utils'
import { useEthers } from '@usedapp/core'
import { useGetWalletProfileId, usePostWithSig } from 'src/contract/lens-hub.api'

export interface IEventProperties {
  isAddCap?: boolean
  image: string
  from: string
  to: string
  info: string
}

export default function Event(props: IEventProperties): JSX.Element {
  const { isAddCap, image, from, to, info } = props

  const { account, library } = useEthers()
  const profileId = useGetWalletProfileId(account || '')
  const { state: txHash, send: postWithSig } = usePostWithSig()
  const [addPostToLens, data] = useMutation(CREATE_POST_TYPED_DATA)

  const addPost = async () => {
    console.log(profileId)

    console.log(data)
    try {
      await addPostToLens({
        variables: {
          request: {
            profileId,
            contentURI: 'ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8sN6vl/229',
            collectModule: {
              revertCollectModule: true,
            },
            referenceModule: {
              followerOnlyReferenceModule: false,
            },
          },
        },
      })
    } catch (error) {
      console.log(error)

      return
    }

    console.log(data)

    const { typedData } = data.data.createPostTypedData

    if (!typedData) return

    const signature = await signedTypeData(
      typedData.domain,
      typedData.types,
      typedData.value,
      library
    )

    const { v, r, s } = splitSignature(signature)

    await postWithSig({
      profileId: typedData.value.profileId,
      contentURI: typedData.value.contentURI,
      collectModule: typedData.value.collectModule,
      collectModuleInitData: typedData.value.collectModuleInitData,
      referenceModule: typedData.value.referenceModule,
      referenceModuleInitData: typedData.value.referenceModuleInitData,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    })
    console.log(txHash)
  }

  return (
    <div className={styles.event}>
      <div className={styles.content}>
        <img src={image} alt="image" width="100px" height="100px" />
        <div className={styles.info}>
          <span>From: {from}</span>
          <span>To: {to}</span>
          <span>Information: {info}</span>
        </div>
        {isAddCap && (
          <div className={styles.buttons}>
            <button onClick={() => addPost()}>Add</button>
            <button>Decline</button>
          </div>
        )}
      </div>
    </div>
  )
}
