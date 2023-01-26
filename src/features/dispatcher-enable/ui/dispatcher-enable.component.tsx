import { useDispatcherLensContext } from '@shared/lib'
import { Button, Dialog } from '@shared/ui'
import React from 'react'

import { useDispatcherEnable } from '../model'

export const DispatcherEnable: React.FC = () => {
  const { isShow, setIsShow } = useDispatcherLensContext()

  const { enableDispatcher } = useDispatcherEnable()

  return (
    <div>
      <Dialog show={isShow} closeDialog={() => setIsShow(false)}>
        <span className="text-base font-semibold text-center my-5">
          Confirm the transaction to perform any action
        </span>
        <div className="grid grid-cols-2 gap-3 mb-5">
          <Button primary onClick={() => setIsShow(false)}>
            Decline
          </Button>
          <Button onClick={enableDispatcher}>Enable</Button>
        </div>
      </Dialog>
    </div>
  )
}
