import type { FC, ReactNode } from 'react';

type FilterCardProps = {
  title: string;
  children: ReactNode;
};

const FilterCard: FC<FilterCardProps> = (props) => {
  const { children, title } = props;
  return (
    <div className='py-2 px-4 shadow rounded-md bg-white border border-gray-300'>
      <h6 className="pb-3 text-md text-gray-600 font-medium capitalize">{title}</h6>
      <div className="max-h-56 scrollbar-thin ">
        {children}
      </div>
    </div>
  );
};

export default FilterCard;