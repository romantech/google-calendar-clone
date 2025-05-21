import { MINUTES_IN_DAY, MINUTES_PER_SLOT, SLOT_HEIGHT } from '@/lib/constant.ts';
import {
  addDays,
  addMinutes,
  differenceInMinutes,
  parseISO,
  startOfDay,
  startOfWeek,
} from 'date-fns';
import type { CalendarEvent } from '@/store';

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
  intervalMinutes = MINUTES_PER_SLOT,
  baseDate = new Date(),
}: GenerateTimeSlots = {}): Date[] => {
  if (MINUTES_IN_DAY % intervalMinutes !== 0) {
    const errMsg = `intervalMinute 값은 하루 ${MINUTES_IN_DAY}(분)을 균등하게 나눌 수 있어야 합니다.`;
    throw new Error(errMsg);
  }

  const count = MINUTES_IN_DAY / intervalMinutes;
  const start = startOfDay(baseDate); // 2 September 2014 11:55:00 -> 2 September 2014 00:00:00

  return Array.from({ length: count }, (_, seq) => {
    const minutesToAdd = seq * intervalMinutes; // 0, 60, 120, ... 1440
    return addMinutes(start, minutesToAdd); // 기준 시각에 minutesToAdd를 더해 현재 슬롯 시각 생성
  });
};

/**
 * @returns 날짜가 반영된 타임슬롯 Date 객체 반환
 */
export function combineDateAndTime(date: Date, time: Date): Date {
  const combined = new Date(date);
  combined.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
  return combined;
}

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

/**
 * 이벤트의 높이를 계산하는 함수 (시간 길이에 비례)
 * @returns 이벤트 높이 (픽셀)
 */
export const calculateEventHeight = (
  event: CalendarEvent,
  minutesPerSlot = MINUTES_PER_SLOT,
  slotHeight = SLOT_HEIGHT,
): number => {
  const startDate = parseISO(event.startTime);
  const endDate = parseISO(event.endTime);

  const durationInMinutes = Math.max(0, differenceInMinutes(endDate, startDate));
  return (durationInMinutes / minutesPerSlot) * slotHeight;
};
