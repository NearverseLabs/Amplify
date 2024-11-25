"use client";
import { ChevronDown } from "lucide-react";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface IDropdownProps {
  label?: string;
  className?: string;
  dropdownList: string[];
  selectedOption: string | undefined;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  disable?: boolean;
  variant?: "primary" | "secondary";
}

const Dropdown: React.FC<IDropdownProps> = ({
  dropdownList,
  setSelectedOption,
  selectedOption,
  label,
  className,
  disable,
  variant = "primary",
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
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleSelectOption = (item: string) => {
    setSelectedOption(item);
    setShowDropdown(false);
  };

  const getButtonStyles = () => {
    const baseStyles =
      "inline-flex w-full appearance-none items-center justify-between px-4 py-2.5 text-center text-sm focus:outline-none min-[2560px]:px-8 min-[2560px]:py-6 min-[2560px]:text-4xl";
    if (variant === "secondary") {
      return `${baseStyles} border border-[#b3b3b3] font-normal bg-white rounded-md`;
    }
    return `${baseStyles} border-black1 font-bold text-black1 border-2 rounded-lg`;
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative min-[2560px]:w-96 ${className}`}
    >
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        className={getButtonStyles()}
        type="button"
        disabled={disable}
      >
        {selectedOption ? selectedOption: label}
        <span className="block min-[2560px]:hidden">
          <ChevronDown />
        </span>
        <span className="hidden min-[2560px]:block">
          <ChevronDown size={50} />
        </span>
      </button>
      <div
        id="dropdown"
        className={`${
          showDropdown ? "block" : "hidden"
        } absolute z-50 w-full divide-y divide-gray-100 rounded  shadow ${
          variant === "secondary" ? "bg-white" : "bg-[#f3f3f3]"
        }`}
      >
        <ul
          className="py-1 text-sm text-gray-700"
          aria-labelledby="dropdownDefault"
        >
          {dropdownList.map((dl, index) => (
            <li key={`dl-${index}`}>
              <div
                onClick={() => handleSelectOption(dl)}
                className={`block cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 min-[2560px]:w-full min-[2560px]:p-6 min-[2560px]:text-4xl ${
                  variant === "secondary" ? "font-normal" : "font-bold"
                }`}
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
