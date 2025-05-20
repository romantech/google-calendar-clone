import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, isValid, parseISO } from 'date-fns';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatISOString = (isoString: string, formatPattern = 'HH:mm') => {
  return format(parseISO(isoString), formatPattern);
};

export function toDate(isoString?: string | null): Date | undefined {
  if (!isoString) return undefined;
  const date = parseISO(isoString);
  return isValid(date) ? date : undefined;
}

export const formatYearMonth = (date: Date) => format(date, 'yyyy년 M월');
