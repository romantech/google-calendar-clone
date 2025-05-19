import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { addDays, addMinutes, format, isValid, parseISO, startOfDay, startOfWeek } from 'date-fns';
import { MINUTES_IN_DAY } from './constant';
import { ko } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toDate(isoString?: string | null): Date | undefined {
  if (!isoString) return undefined;
  const date = parseISO(isoString);
  return isValid(date) ? date : undefined;
}

interface GenerateTimeSlots {
  intervalMinutes?: number;
  formatPattern?: string;
  baseDate?: Date;
}

/**
 * 하루를 균등한 시간 간격으로 나눈 시간 슬롯 배열 생성
 * @returns {string[]} - 포맷팅된 시간 문자열 배열 (예: ['00:00', '01:00', ...])
 */
export const generateTimeSlots = ({
  intervalMinutes = 60,
  formatPattern = 'a h시',
  baseDate = new Date(),
}: GenerateTimeSlots = {}): string[] => {
  if (MINUTES_IN_DAY % intervalMinutes !== 0) {
    throw new Error(`intervalMinute 값은 하루 1440(분)을 균등하게 나눌 수 있어야 합니다.`);
  }

  const count = MINUTES_IN_DAY / intervalMinutes;
  const start = startOfDay(baseDate); // 2 September 2014 11:55:00 -> 2 September 2014 00:00:00

  return Array.from({ length: count }, (_, seq) => {
    const minutesToAdd = seq * intervalMinutes; // 0, 60, 120, ... 1440
    const slotTime = addMinutes(start, minutesToAdd); // 기준 시각에 minutesToAdd를 더해 현재 슬롯 시각 생성
    return format(slotTime, formatPattern, { locale: ko }); // 포맷 적용 e.g., 00:00, 01:00, 02:00, ...
  });
};

interface GetWeekDaysOptions {
  /** 기준 날짜 */
  baseDate?: Date;
  /** 0(일) ~ 6(토), 주 시작 요일 (기본: 0, 일요일) */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * 기준 날짜가 속한 주의 Date 객체 배열 반환
 * @returns Date[] – [주 시작일, 주 시작일 + 1, ... , 주 시작일 + 6]
 * */
export function getWeekDays({
  baseDate = new Date(),
  weekStartsOn = 0,
}: GetWeekDaysOptions = {}): Date[] {
  const weekStart = startOfWeek(baseDate, { weekStartsOn });
  return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
}
