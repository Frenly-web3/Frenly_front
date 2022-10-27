import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { Meta } from '@components/meta/meta.component'
import EndOfFeed from '@components/shared/end-of-feed/end-of-feed.component'
import Event from '@components/shared/event/event.component'
import Header from '@components/shared/header/header.component'
import Loader from '@components/shared/loader/loader.component'
import {
  useAddAddressForTrackMutation,
  useGetAdminPostQuery,
  useGetUnpublishedContentQuery,
  useSubscribeUserMutation,
} from '@store/auth/auth.api'
import { FOLLOW_USER } from '@store/lens/account/add-follow.mutation'
import { APPROVE_MODULE } from '@store/lens/account/approve-module.query'
import { SET_FOLLOW_DATA } from '@store/lens/account/set-follow.mutation'
import { CREATE_UNFOLLOW_TYPED_DATA } from '@store/lens/account/unfollow.mutation'
// import { IS_FOLLOWING } from '@store/lens/account/is-follow.query'
import { GET_DEFAULT_PROFILES } from '@store/lens/get-profile.query'
import { GET_PUBLICATIONS } from '@store/lens/get-publication.query'
import { signedTypeData, splitSignature } from '@store/lens/post/create-post.utils'
import { useEthers, useSendTransaction } from '@usedapp/core'
import { ethers } from 'ethers'
import router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { LENS_FOLLOW_NFT_ABI } from 'src/contract/lens-follow.contract'
import {
  useFollowWithSig,
  useGetWalletProfileId,
  useSetFollowModuleWithSig,
  useUnfollowWithSig,
} from 'src/contract/lens-hub.api'

export default function ProfilePage() {
  // receipt.logs[0].topics[1]
  const { account, library } = useEthers()
  const [isAdmin, setIsAdmin] = useState(false)
  const [addressValue, setAddressValue] = useState('')
  const [posts, setPosts] = useState<Array<any>>([])
  const [isLoading, setIsLoading] = useState(false)

  const {
    query: { id },
  } = useRouter()
  const accountId = useGetWalletProfileId(account || '')
  const { data: postsData, refetch: refetchUnpublishedContent } =
    useGetUnpublishedContentQuery(null)
  const { data: dataProfile, refetch: refetchProfile } = useQuery(GET_DEFAULT_PROFILES, {
    variables: {
      request: {
        profileId: id,
      },
    },
  })
  const { sendTransaction: sendTx } = useSendTransaction()
  const [setFollowModule] = useMutation(SET_FOLLOW_DATA)
  const [approveModule] = useLazyQuery(APPROVE_MODULE)
  const { send: followWithSig, state: followWithSigState } = useFollowWithSig()
  const { send: unfollowWithSig, state: unfollowWithSigState } = useUnfollowWithSig()
  const { send: setFollowModuleWithSig } = useSetFollowModuleWithSig()
  const { data: feeds, refetch } = useQuery(GET_PUBLICATIONS, {
    skip: id == accountId,
    variables: {
      request: {
        // publicationIds: dataFeeds?.data?.data,
        profileId: id,
        publicationTypes: ['POST', 'MIRROR'],
        limit: 10,
      },
    },
  })
  const [followToUser, dataFollowToUser] = useMutation(FOLLOW_USER)
  const [unfollowToUser, dataUnfollowToUser] = useMutation(CREATE_UNFOLLOW_TYPED_DATA)
  const [addAddressToTrack] = useAddAddressForTrackMutation()
  const [isFreeFollow, setFreeFollow] = useState(dataProfile?.profile?.followModule !== null)
  const { data: dataAdminPosts, refetch: refetchAdminPosts } = useGetAdminPostQuery(
    {},
    { skip: !isAdmin }
  )
  const [subscribeUser] = useSubscribeUserMutation()

  useEffect(() => {
    if (isAdmin) {
      setPosts(dataAdminPosts?.data)
    } else {
      setPosts(postsData?.data)
    }
  }, [postsData, dataAdminPosts, isAdmin])

  useEffect(() => {
    if (account == process.env.NEXT_PUBLIC_ADMIN_ADDRESS) {
      setIsAdmin(true)
    }
    if (account && dataProfile) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
    if (id == null) {
      toast.warn('Connect your wallet')
      // router.push('/auth')
    }
  }, [account, dataProfile, id])

  const followHandler = async () => {
    try {
      setIsLoading(true)
      if (dataProfile?.profile?.followModule !== null) {
        const approveResult = await approveModule({
          variables: {
            request: {
              currency: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
              value: '0.01',
              followModule: 'FeeFollowModule',
            },
          },
        })

        const txApprove = await sendTx({
          to: approveResult.data.generateModuleCurrencyApprovalData.to,
          from: approveResult.data.generateModuleCurrencyApprovalData.from,
          data: approveResult.data.generateModuleCurrencyApprovalData.data,
        })
      }

      const result = await followToUser({
        variables: {
          request: {
            follow:
              dataProfile.profile.followModule == null
                ? [
                    {
                      profile: id,
                    },
                  ]
                : [
                    {
                      profile: id,
                      followModule: {
                        feeFollowModule: {
                          amount: {
                            currency: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
                            value: '0.01',
                          },
                        },
                      },
                    },
                  ],
          },
        },
      })

      const typedData = result?.data?.createFollowTypedData?.typedData

      const signer = library?.getSigner()

      // if (!typedData) return
      const signature = await signedTypeData(
        typedData.domain,
        typedData.types,
        typedData.value,
        signer
      )
      const { v, r, s } = splitSignature(signature)

      const tx = await followWithSig({
        follower: account,
        profileIds: typedData.value.profileIds,
        datas: typedData.value.datas,
        sig: {
          v,
          r,
          s,
          deadline: typedData.value.deadline,
        },
      })
      await subscribeUser({ address: dataProfile?.profile?.ownedBy as string })
    } catch (error_) {
      console.log(error_)
      toast.error(String(error_))
    } finally {
      refetchProfile()
      setIsLoading(false)
    }
  }

  const unfollowHandler = async () => {
    try {
      setIsLoading(true)

      const result = await unfollowToUser({
        variables: {
          request: {
            profile: id,
          },
        },
      })

      const typedData = result?.data?.createUnfollowTypedData?.typedData
      const signer = library?.getSigner()

      // if (!typedData) return
      const signature = await signedTypeData(
        typedData.domain,
        typedData.types,
        typedData.value,
        signer
      )
      const { v, r, s } = splitSignature(signature)

      // load up the follower nft contract
      const followNftContract = new ethers.Contract(
        typedData.domain.verifyingContract,
        LENS_FOLLOW_NFT_ABI,
        signer
      )
      const burnTx = await followNftContract.burnWithSig(typedData.value.tokenId, {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      })

      await burnTx.wait()
    } catch (error_) {
      toast.error(String(error_))
    } finally {
      refetchProfile()
      setIsLoading(false)
    }
  }

  const changeFollowModule = async () => {
    try {
      setIsLoading(true)

      const result = await setFollowModule({
        variables: {
          request: {
            profileId: accountId,
            followModule: isFreeFollow
              ? {
                  freeFollowModule: true,
                }
              : {
                  feeFollowModule: {
                    amount: {
                      currency: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
                      value: '0.01',
                    },
                    recipient: account,
                  },
                },
          },
        },
      })

      const typedData = result?.data?.createSetFollowModuleTypedData?.typedData

      const signer = library?.getSigner()

      const signature = await signedTypeData(
        typedData.domain,
        typedData.types,
        typedData.value,
        signer
      )
      const { v, r, s } = splitSignature(signature)

      const tx = await setFollowModuleWithSig({
        profileId: typedData.value.profileId,
        followModule: typedData.value.followModule,
        followModuleInitData: typedData.value.followModuleInitData,
        sig: {
          v,
          r,
          s,
          deadline: typedData.value.deadline,
        },
      })
    } catch (error_) {
      toast.error(String(error_))
    } finally {
      setIsLoading(false)
    }
  }

  const refetchInfo = async () => {
    await refetchUnpublishedContent()
    await refetchAdminPosts()
  }

  const addAddressHandler = async () => {
    if (addressValue) {
      setIsLoading(true)
      await addAddressToTrack({ address: addressValue })
      setAddressValue('')
      setIsLoading(false)
    }
  }

  return (
    <>
      <Meta title={isAdmin ? 'Admin' : 'Profile'} description="Your profile" />

      <Header
        title="Profile"
        isOwner={id === accountId}
        nickname={dataProfile?.profile.handle}
        address={dataProfile?.profile.ownedBy}
        isFollowModule={dataProfile?.profile?.followModule !== null}
        followHandle={followHandler}
        unfollowHandle={unfollowHandler}
        followers={dataProfile?.profile.stats.totalFollowers}
        isFollow={dataProfile?.profile.isFollowedByMe}
        isFreeFollow={isFreeFollow}
        setFreeFollow={setFreeFollow}
        changeFollowModule={changeFollowModule}
      />

      <main>
        <Loader show={isLoading} />
        {isAdmin && id == accountId && (
          <div className="container pt-4 pb-4 flex">
            <div className="flex rounded-2xl bg-light-gray px-4 py-2 w-full mr-2">
              <input
                style={{ background: 'transparent' }}
                value={addressValue}
                onChange={e => setAddressValue(e.target.value)}
                type="text"
                className="outline-none w-full"
                placeholder="Add address for track"
              />
            </div>
            <button
              onClick={addAddressHandler}
              className="flex items-center justify-center py-1 px-2"
            >
              <img src="/assets/icons/send-icon.svg" alt="messages" />
            </button>
          </div>
        )}

        <section>
          {!accountId ? (
            <Loader show={true} />
          ) : id == accountId ? (
            posts?.map((el, index) => {
              // const { content: el, id: postId, creationDate } = element
              // if (index < 10) {
              return (
                <Event
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  isAddCap
                  from={el.fromAddress}
                  to={el.toAddress}
                  info={el.info}
                  date={el.creationDate}
                  image={el.image}
                  key={index}
                  itemType="nft"
                  messageType={el.transferType}
                  id={el.id}
                  totalUpvotes={0}
                  totalMirror={0}
                  refetchInfo={refetchInfo}
                  profileId={id as string}
                  txHash={el.transactionHash}
                  blockchainType={el.blockchainType == 0 ? 'ETHEREUM' : 'POLYGON'}
                  contractAddress={el.contractAddress}
                  isMirror={el.isMirror}
                  isAdmin={isAdmin}
                  creator={account as string}
                />
              )
              // }
              // return <></>
            })
          ) : (
            feeds?.publications.items.map((el: any, index: number) => {
              const {
                createdAt,
                collectModule,
                profile,
                metadata,
                id: postId,
                stats,
                mirrorOf,
              } = el

              return (
                <Event
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  from={metadata?.attributes[4]?.value}
                  to={metadata?.attributes[3]?.value}
                  info={metadata?.description}
                  image={metadata?.attributes[9]?.value}
                  key={index}
                  name={profile.handle}
                  date={createdAt}
                  showDate={false}
                  showAuthor
                  messageType={metadata?.attributes[5]?.value}
                  itemType="nft"
                  totalUpvotes={stats.totalUpvotes}
                  totalMirror={stats.totalAmountOfMirrors}
                  id={postId}
                  profileId={profile.id}
                  refetchInfo={refetch}
                  txHash={metadata?.attributes[8]?.value}
                  blockchainType={metadata?.attributes[7]?.value}
                  contractAddress={metadata?.attributes[1]?.value}
                  isMirror={!!mirrorOf}
                  handleMirror={mirrorOf?.profile?.ownedBy}
                  creator={profile.ownedBy}
                />
              )
            })
          )}
        </section>
      </main>

      <EndOfFeed page="drafts" />
    </>
  )
}
