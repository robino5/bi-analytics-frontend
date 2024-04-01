import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const numberFormatter = (num: number) => {
  return new Intl.NumberFormat().format(num);
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
export function numberToMillionsString(num: number, useThousand: boolean = false): string {
  if (isNaN(num)) {
    return 'Invalid Number';
  }

  const absNumber = Math.abs(num);

  if (useThousand) {
    if (absNumber >= 1000 && absNumber < 1000000) {
      return (num / 1000).toFixed(0) + 'K';
    } else if (absNumber < 1000) {
      return new Intl.NumberFormat('en-US').format(num);
    }
  }

  if (absNumber < 1000000) {
    const formattedNumber = new Intl.NumberFormat('en-US').format(num);
    return formattedNumber;
  }

  if (absNumber < 10000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }

  if (absNumber < 1000000000) {
    return Math.floor(num / 1000000) + 'M';
  }

  return Math.floor(num / 1000000) + 'M';
}


export function successResponse(key: string): boolean {
  return key === "success"
}