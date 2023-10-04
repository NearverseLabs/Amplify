import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const walletNameTrimmer = (
  name: string | undefined | null,
  frontLength = 6,
  backLength = 4
) => {
  const text = name?.slice(0, frontLength) + '...' + name?.slice(-backLength);
  return text;
};
