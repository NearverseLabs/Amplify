import React from "react";
import { twMerge } from "tailwind-merge";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  error?: any;
  containerClass?: string
}

const Input: React.FC<IInputProps> = ({
  label,
  className,
  type,
  placeholder,
  error,
  value,
  containerClass,
  ...rest
}) => {
  return (
    <div className={`${containerClass}`}>
      <div className=" text-base font-bold text-primary mb-1">{label}</div>
      <div className="px-2 py-1.5 bg-light-gray rounded-xl border border-[#929292]">
        <input
          type={type}
          id={label}
          placeholder={placeholder || label}
          value={value}
          {...rest}
          className={twMerge(
            `text-base font-normal focus:border-transparent focus:ring-0 outline-0 block w-full rounded-lg !outline-none focus:!outline-none border-none bg-transparent`,
            className
          )}
        />
      </div>
    </div>
  );
};

export default Input;
