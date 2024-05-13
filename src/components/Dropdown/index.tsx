'use client';
import { ChevronDown } from 'lucide-react';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
interface IDropdownProps {
  label?: string;
  className?: string;
  dropdownList: string[];
  selectedOption: string | undefined;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  disable?: boolean;
}

const Dropdown: React.FC<IDropdownProps> = ({
  dropdownList,
  setSelectedOption,
  selectedOption,
  label,
  className,
  disable
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleSelectOption = (item: string) => {
    setSelectedOption(item);
    setShowDropdown(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative min-[2560px]:w-96  ${className}`}
    >
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        id='dropdownDefault'
        data-dropdown-toggle='dropdown'
        className='text-black1 border-black1 inline-flex w-full appearance-none items-center justify-between rounded-lg border-2 px-4 py-2.5  text-center  text-sm font-bold focus:outline-none min-[2560px]:px-8 min-[2560px]:py-6 min-[2560px]:text-4xl'
        type='button'
        disabled={disable}
      >
        {selectedOption ?? label}
        <span className='block min-[2560px]:hidden'>
          <ChevronDown />
        </span>
        <span className='hidden min-[2560px]:block'>
          <ChevronDown size={50} />
        </span>
      </button>
      <div
        id='dropdown'
        className={`${
          showDropdown ? 'block' : 'hidden'
        } absolute z-50 w-full divide-y divide-gray-100 rounded bg-[#f3f3f3] shadow`}
      >
        <ul
          className='py-1 text-sm text-gray-700'
          aria-labelledby='dropdownDefault'
        >
          {dropdownList.map((dl, index) => (
            <li key={`dl-${index}`}>
              <div
                onClick={() => handleSelectOption(dl)}
                className='block cursor-pointer px-4 py-2 text-sm font-bold text-black hover:bg-gray-100 min-[2560px]:w-full min-[2560px]:p-6 min-[2560px]:text-4xl'
              >
                {dl}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
