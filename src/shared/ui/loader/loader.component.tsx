import { useLoaderContext } from '@shared/lib'
import Image from 'next/image'

import { Modal } from '../modal'

export const Loader = () => {
  const { isLoading } = useLoaderContext()
  return (
    <Modal show={isLoading}>
      <Image
        src="/assets/images/eyes.gif"
        alt="eyes"
        width={85}
        height={85}
        className={'w-20 h-20'}
      />
    </Modal>
  )
}
