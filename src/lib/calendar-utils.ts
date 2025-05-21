import { MINUTES_IN_DAY, MINUTES_PER_SLOT, SLOT_HEIGHT } from './constant';
import {
  addDays,
  addMinutes,
  compareDesc,
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

interface CalculateEventHeight {
  event: CalendarEvent;
  minutesPerSlot?: number;
  slotHeight?: number;
  /** 계산한 높이에 추가로 더하거나 뺄 보정값(px) */
  offset?: number;
}

/**
 * 이벤트의 높이를 계산하는 함수 (시간 길이에 비례)
 * @returns 이벤트 높이 (픽셀)
 */
export const calcEventHeight = ({
  event,
  minutesPerSlot = MINUTES_PER_SLOT,
  slotHeight = SLOT_HEIGHT,
  offset = 0,
}: CalculateEventHeight) => {
  const startDate = parseISO(event.startTime);
  const endDate = parseISO(event.endTime);

  const durationInMinutes = Math.max(0, differenceInMinutes(endDate, startDate));
  return (durationInMinutes / minutesPerSlot) * slotHeight + offset;
};

/**
 * 슬롯 내 이벤트의 너비(%)와 왼쪽 위치(%) 계산
 * @param eventIdx   - 타임슬롯내 이벤트 목록에서 해당 이벤트의 인덱스
 * @param totalEvents - 전체 이벤트 개수
 * @param overlapCoef - 마지막이 아닌 이벤트에 곱할 계수(변수 앞에 곱해진 수). 기본값 1.7
 */
export const calcEventPosition = (eventIdx: number, totalEvents: number, overlapCoef = 1.7) => {
  const baseWidth = 100 / totalEvents;
  const isLastEvent = eventIdx === totalEvents - 1;

  // 마지막 이벤트(가장 오른쪽)는 상대적으로 너비 좁게 설정
  const widthPercent = isLastEvent ? baseWidth : baseWidth * overlapCoef;
  const leftPercent = (eventIdx / totalEvents) * 100;

  return { widthPercent, leftPercent };
};

export const sortEventsByEndTimeDesc = (events: CalendarEvent[]) =>
  events.toSorted((a, b) => {
    return compareDesc(parseISO(a.endTime), parseISO(b.endTime));
  });
