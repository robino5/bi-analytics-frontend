import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const numberFormatter = (num: number) => {
  return new Intl.NumberFormat().format(Math.round(num));
};

export function formatDate(date: Date): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
/**
 * Converts a number to a string representation with millions abbreviated as "M".
 * If the number is greater than or equal to 1,000,000 (1 million), it will be converted to millions format.
 * Otherwise, it returns the number as a string.
 * @param num The number to convert.
 * @returns A string representation of the number, with millions abbreviated as "M" if applicable.
 */
export function numberToMillionsString(num: number): string {
  if (Math.abs(num) >= 1000000) {
    const millions = num / 1000000;
    return `${millions.toFixed(0)}M`;
  } else {
    return numberFormatter(num);
  }
}
