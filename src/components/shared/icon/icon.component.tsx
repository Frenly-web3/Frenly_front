import iconTypes from './icon.constant'

interface IIconProps {
  name: string
}

const Icon = ({ name, ...props }: IIconProps): JSX.Element => {
  const IconComponent = iconTypes[name]

  return <IconComponent {...props} />
}

export default Icon
