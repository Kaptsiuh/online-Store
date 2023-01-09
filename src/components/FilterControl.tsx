import type { FC, ReactNode } from 'react'

type FilterControlProps = {
  value: string
  selected: boolean
  info: ReactNode
  handle: (checked: boolean) => void
}

const FilterControl: FC<FilterControlProps> = (props) => {
  const { value, handle, selected, info } = props

  return (
    <div className='flex justify-between'>
      <label className='flex items-center gap-x-2 cursor-pointer'>
        <input
          className='h-[13px] w-[13px] border rounded-sm checked:bg-gray-600 focus:ring-transparent'
          type='checkbox'
          value={value}
          checked={selected}
          onChange={(e) => handle(e.target.checked)}
        />
        <span className='text-xs capitalize'>{value}</span>
      </label>
      {info}
    </div>
  )
}

export default FilterControl
