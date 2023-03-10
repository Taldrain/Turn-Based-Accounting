import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import { clsx } from 'clsx';

type TableHeadElementProps = {
  handleClick: () => void,
  label: string,
  isSelected: boolean,
  isAsc: boolean,
}

function TableHeadElement({ handleClick, label, isSelected, isAsc }: TableHeadElementProps) {
  return (
    <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
      <button className="group inline-flex" onClick={handleClick}>
        { label }
        <span className={clsx("ml-2 flex-none rounded", isSelected ? "bg-gray-100 text-gray-900 group-hover:bg-gray-200" : "group-hover:visible invisible text-gray-400")}>
          { (isSelected && isAsc)
            ? <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
            : <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
          }
        </span>
      </button>
    </th>
  );
}

export default TableHeadElement;
