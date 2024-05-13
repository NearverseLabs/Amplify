import React from "react";
import { twMerge } from "tailwind-merge";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  containerClass?: string;
  error?: any;
}

const Input: React.FC<IInputProps> = ({
  label,
  className,
  containerClass,
  type = "text",
  placeholder,
  error,
  value,
  ...rest
}) => {
  return (
    <div className={twMerge("relative", containerClass)}>
      <input
        type={type}
        value={value}
        className={twMerge(
          `w-full rounded border border-[#b3b3b3] min-[2560px]:rounded-xl min-[2560px]:py-4 min-[2560px]:text-4xl`,
          className,
        )}
        placeholder={placeholder}
        {...rest}
      />
      {error && <div className=" text-sm text-red-400 absolute">{error}</div>}
    </div>
  );
};

export default Input;
