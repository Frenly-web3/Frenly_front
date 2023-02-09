import { Overlay } from '@mantine/core'
import { useLoaderContext } from '@shared/lib'

export const Loader = () => {
  const { isLoading } = useLoaderContext()
  if (!isLoading) return null
  return (
    <Overlay
      opacity={0.6}
      color={'black'}
      className="flex flex-col items-center justify-center"
    >
      <img
        src="/assets/icons/eyesLogo.svg"
        alt="eyes"
        className={'w-48 h-48 animate-bounce'}
      />
      <div className="font-rounded text-4xl font-bold text-heading">loading...</div>
    </Overlay>
  )
}
