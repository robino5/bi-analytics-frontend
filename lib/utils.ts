import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const FORMATTER_OPTIONS: Intl.NumberFormatOptions = {
  maximumFractionDigits: 2,
  minimumFractionDigits:2
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const numberFormatter = (
  value: number,
  options: Intl.NumberFormatOptions = FORMATTER_OPTIONS,
) => {
  return new Intl.NumberFormat("en-US", options).format(value);
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
  const paddedDay = day < 10 ? `0${day}` : day;
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${paddedDay}-${month}-${year}`;
}

export function numberToMillionsString(
  num: number,
  useThousand: boolean = false,
): string {
  if (isNaN(num)) {
    throw Error(`${num} is not a valid number !`);
  }

  const absNumber = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  if (useThousand) {
    if (absNumber >= 1000 && absNumber < 1000000) {
      return `${sign}${numberFormatter(absNumber / 1000)}K`;
    } else if (absNumber < 1000) {
      return `${sign}${numberFormatter(absNumber)}`;
    }
  }

  if (absNumber < 1_00_0000) {
    return `${sign}${numberFormatter(absNumber)}`;
  }

  if (absNumber < 10_00_0000) {
    return `${sign}${numberFormatter(absNumber / 1000000)}M`;
  }

  if (absNumber < 1_00_000_0000) {
    return `${sign}${numberFormatter(absNumber / 10_00_000)}M`;
  }

  return `${sign}${numberFormatter(absNumber / 10_00_000)}M`;
}

export function successResponse(key: string): boolean {
  return key === "success";
}

/**
 * @deprecated Use the new `getFormattedHeaderDate` function instead.
 * This function will be removed in future releases.
 */
export function getHeaderDate<T extends Record<string, any>>(from: T | null | undefined, key: keyof T): string {
  if (from && key in from) {
    const value = from[key];
    return typeof value === 'string' ? value : String(value); // Ensure the value is converted to a string.
  }
  return "";
}