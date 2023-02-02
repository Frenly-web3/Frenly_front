import { useCommunityInfo } from '@entities/community'
import { Paper } from '@mantine/core'
import Link from 'next/link'

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
    <Paper className="rounded-[2rem] w-60 p-8 flex flex-col max-md:hidden mt-16 h-fit items-start sticky top-4">
      <div className="flex justify-between items-center w-full">
        <div
          className={`rounded-full  max-w-[4rem] min-w-[4rem] max-h-[4rem] min-h-[4rem] relative overflow-hidden`}
        >
          <img
            src={`https://stage.frenly.cc/api/community-content/images/${community.image}`}
            alt={`${community.name} logo`}
            // layout={'fill'}
          />
        </div>
        <Link href={'/feed/orange'}>
          <img
            src={`/assets/icons/redirect.svg`}
            alt={`${community.name} logo`}
            // layout={'fill'}
          />
        </Link>
      </div>

      <div className={`flex flex-col gap-0`}>
        <div className={`font-rounded text-heading font-semibold text-lg`}>
          {community.name}
        </div>
        <div className={`text-base`}>{community.description}</div>
        <div className={`font-compact text-hidden text-sm font-extralight`}>
          Members: {community.membersAmount}
        </div>
      </div>
    </Paper>
  )
}
