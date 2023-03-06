import { Input } from '@shared/ui'
import * as React from 'react'

export interface ISearchInputProperties {
  value: string
  onChange: React.Dispatch<React.SetStateAction<string>>
}

export const SearchInput = React.memo((props: ISearchInputProperties) => {
  const { value, onChange } = props

  return (
    <Input
      placeholder="0x... or .eth"
      rightSection={
        <button className="w-3 aspect-square">
          <img className="" alt="search" src="/assets/icons/search.svg" />
        </button>
      }
      value={value}
      onChange={(e) => onChange(e.target.value)}
      classNames={{ input: 'bg-black/5 text-black/60 rounded-2xl border-0', wrapper: 'p-0', rightSection: 'mr-4' }}
    />
  )
})
