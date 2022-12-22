import { useLoaderContext } from '@shared/lib'

import { Modal } from '../modal'

export const Loader = () => {
  const { isLoading } = useLoaderContext()
  return (
    <Modal show={isLoading}>
      <img
        src="/assets/icons/eyesLogo.svg"
        alt="eyes"
        className={'w-48 h-48 animate-bounce'}
      />
      <div className="font-rounded text-4xl font-bold text-heading">loading...</div>
    </Modal>
  )
}
