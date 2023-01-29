import { useCommunityInfo } from '@entities/community'

interface IProperties {
  id: string
}

export const CommunitySingle = (props: IProperties) => {
  const { id } = props
  const {
    data: community,
    // isError,
    // isLoading
  } = useCommunityInfo({ id })

  if (!community) return <>No</>

  return (
    <>
      <div key={community.id} className={`flex gap-4`}>
        <div
          className={`rounded-full max-w-[4rem] min-w-[4rem] max-h-[4rem] min-h-[4rem] relative overflow-hidden`}
        >
          <img
            src={`https://stage.frenly.cc/api/community-content/images/${community.image}`}
            alt={`${community.name} logo`}
            // layout={'fill'}
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
        </div>
      </div>
    </>
  )
}
