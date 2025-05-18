import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { isValid, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toDate(isoString?: string | null): Date | undefined {
  if (!isoString) return undefined;
  const date = parseISO(isoString);
  return isValid(date) ? date : undefined;
}
