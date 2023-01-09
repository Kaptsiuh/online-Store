import { FC } from 'react'

type RangeControlProps = {
  min: number
  max: number
  minValue: number
  maxValue: number
  handle: (min: number, max: number) => void
}

const RangeControl: FC<RangeControlProps> = ({ min, max, minValue, maxValue, handle }) => {
  return (
    <div className='flex flex-col'>
      <div className='multirange'>
        <input
          type='range'
          step='1'
          value={minValue}
          onChange={(e) => {
            e.target.valueAsNumber < maxValue && handle(e.target.valueAsNumber, maxValue)
          }}
          min={min}
          max={max}
        />
        <input
          type='range'
          step='1'
          value={maxValue}
          onChange={(e) =>
            e.target.valueAsNumber > minValue && handle(minValue, e.target.valueAsNumber)
          }
          min={min}
          max={max}
        />
      </div>
      <div className='flex items-center justify-between'>
        <div>{minValue}</div>
        <div>{maxValue}</div>
      </div>
    </div>
  )
}

export default RangeControl
