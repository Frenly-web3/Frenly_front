import { Button } from '@shared/ui'

import { useAuth } from '../model'

interface IAuthButtonProperties {}

export const AuthButton = (props: IAuthButtonProperties) => {
  const {} = props

  const { login } = useAuth()

  return (
    <div className="w-full">
      <Button onClick={login}>connect wallet</Button>
    </div>
  )
}
