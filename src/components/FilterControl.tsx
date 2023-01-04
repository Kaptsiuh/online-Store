import { FC } from 'react';

type FilterControlProps = {
  value: string;
  selected: boolean;
  handle: (checked: boolean) => void;
};

const FilterControl: FC<FilterControlProps> = (props) => {
  const { value, handle, selected } = props;

  return (
    <div>
      <label className='flex items-center gap-x-2 cursor-pointer'>
        <input
          className="h-[13px] w-[13px] border rounded-sm checked:bg-gray-600 focus:ring-transparent"
          type="checkbox"
          value={value}
          checked={selected}
          onChange={(e) => handle(e.target.checked)}
        />
        <span className="text-xs capitalize">{value}</span>
      </label>
    </div>
  );
};

export default FilterControl;