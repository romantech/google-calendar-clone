import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, isValid, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

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

/**
 * @example { ianaName: ''Asia/Seoul'', gmtOffset: 'GMT+9' }
 * */
export const getCurrentTimezoneInfo = () => {
  const ianaName = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // 'O' 포맷 토큰은 "GMT+N" 또는 "GMT-N" 형태의 문자열 반환
  // 예: "GMT+9", "GMT-7"
  const gmtOffset = formatInTimeZone(new Date(), ianaName, 'O');
  return { ianaName, gmtOffset };
};
