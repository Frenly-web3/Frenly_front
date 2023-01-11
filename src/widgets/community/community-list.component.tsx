import { useCommunityList } from '@entities/community'
import Image from 'next/image'
import Link from 'next/link'

export const CommunityList = () => {
  const {
    data,
    // isError,
    // isLoading
  } = useCommunityList()

  return (
    <>
      <div className={``}>
        {data &&
          data.map((community) => {
            return (
              <div key={community.id} className={`flex gap-4`}>
                <div
                  className={`rounded-full max-w-[4rem] min-w-[4rem] max-h-[4rem] min-h-[4rem] relative overflow-hidden`}
                >
                  <Image
                    src={`https://gm.frenly.cc/rest/community-content/images/${community.image}`}
                    alt={`${community.name} logo`}
                    layout={'fill'}
                  />
                </div>
                <div className={`flex flex-col gap-0`}>
                  <div className={`font-rounded text-heading font-semibold text-lg`}>
                    {community.name}
                  </div>
                  <div className={``}>{community.description}</div>
                  <div className={`font-compact text-hidden text-sm font-extralight`}>
                    Members: {community.membersAmount}
                  </div>
                  <Link href={`/feed/${community.id}`}>
                    <a
                      className={`px-4 py-2 bg-overlay-2-solid max-w-fit mt-2 hover:bg-overlay-3-solid transition-colors rounded-full`}
                    >
                      Explore Feed
                    </a>
                  </Link>
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}
