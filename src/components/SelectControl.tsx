import { FC } from 'react';
import List from './List';

type SelectOption = { name: string; value: string };

type SelectControlProps = {
  handle: (value: string) => void;
  options: SelectOption[];
  title: string;
  value?: string;
};

const SelectControl: FC<SelectControlProps> = ({ value, handle, options, title }) => {
  return (
    <select className='focus:ring-0 rounded border-gray-300' value={value ?? 'default'} onChange={(e) => handle(e.target.value)}>
      <option value="default" disabled>
        {title}
      </option>
      <List
        items={options}
        fn={(item) => (
          <option key={item.value} value={item.value}>
            {item.name}
          </option>
        )}
      />
    </select>
  );
};

export default SelectControl;