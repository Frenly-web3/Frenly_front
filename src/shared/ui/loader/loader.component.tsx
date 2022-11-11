import { useLoaderContext } from '@shared/lib'

import { Modal } from '../modal'

export const Loader = () => {
  const { isLoading } = useLoaderContext()
  return <Modal show={isLoading} />
}
