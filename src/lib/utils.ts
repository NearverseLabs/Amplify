import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const walletNameTrimmer = (
  name: string | undefined | null,
  frontLength = 6,
  backLength = 4,
) => {
  const text = name?.slice(0, frontLength) + "..." + name?.slice(-backLength);
  return text;
};

export function convertXToTwitter(link: string): string {
  // Replace x.com with twitter.com in the link
  const convertedLink = link.replace(
    /https:\/\/(?:www\.)?x\.com/,
    "https://twitter.com",
  );

  return convertedLink;
}

export function roundToDecimal(value: number): number {
  return Math.round(value * 10000) / 10000;
}

export function toSmallestUnit(value: string, decimals: number): bigint {
  const [integerPart, fractionalPart = ""] = value.split(".");
  const fractionalPartPadded = fractionalPart
    .padEnd(decimals, "0")
    .slice(0, decimals);
  const combinedValue = integerPart + fractionalPartPadded;
  return BigInt(combinedValue);
}
