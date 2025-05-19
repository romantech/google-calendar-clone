import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { ISOString } from '@/types';
import { areIntervalsOverlapping, endOfWeek, parseISO, startOfWeek } from 'date-fns';
import { nanoid } from 'nanoid';
import { Frequency, RRule, rrulestr } from 'rrule';

export const recurrenceTypes = ['none', 'weekly', 'monthly'] as const;
export type RecurrenceType = (typeof recurrenceTypes)[number];

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: ISOString;
  endTime: ISOString;
  recurrence: RecurrenceType;
  rruleString?: string;
  originalId?: string;
  isOccurrence?: boolean;
}

type NewEventPayload = Omit<CalendarEvent, 'id' | 'originalId' | 'rruleString' | 'isOccurrence'>;

interface EventsState {
  events: CalendarEvent[];
}

/** 중복 필드를 모아 한 곳에서 생성 */
const buildEventBase = (
  payload: NewEventPayload,
  masterId: string,
  start: Date,
  end: Date,
): CalendarEvent => {
  return {
    ...payload,
    id: masterId,
    originalId: masterId,
    startTime: start.toISOString(),
    endTime: end.toISOString(),
    recurrence: payload.recurrence,
  };
};

/** 반복 규칙 생성(실패 시 null 반환) */
const createRule = (dtstart: Date, recurrence: RecurrenceType) => {
  if (recurrence === 'none') return null;
  const freq = recurrence === 'monthly' ? Frequency.MONTHLY : Frequency.WEEKLY;
  return new RRule({ dtstart, freq });
};

const initialState: EventsState = { events: [] };

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, { payload }: PayloadAction<NewEventPayload>) => {
      const masterId = nanoid(10);
      const start = parseISO(payload.startTime);
      const end = parseISO(payload.endTime);

      const baseItem = buildEventBase(payload, masterId, start, end);

      const rule = createRule(start, payload.recurrence);
      if (rule) {
        state.events.push({ ...baseItem, rruleString: rule.toString() });
        return;
      }

      // 규칙 실패 or 단일 이벤트
      if (payload.recurrence !== 'none') {
        console.warn(`'${payload.title}' 반복 규칙 생성 실패. 단일 일정으로 저장합니다.`);
      }
      state.events.push({ ...baseItem, recurrence: 'none' });
    },

    removeEvent: (state, { payload: id }) => {
      state.events = state.events.filter((e) => e.id !== id);
    },

    updateEvent: (state, { payload }: PayloadAction<CalendarEvent>) => {
      const idx = state.events.findIndex((e) => e.id === payload.id);
      if (idx !== -1) state.events[idx] = payload;
    },
  },
});

export const { addEvent, removeEvent, updateEvent } = eventsSlice.actions;

const selectStoredEvents = (s: RootState) => s.events.events;
const selectSelectedDate = (s: RootState) => s.calendar.selectedDate;

export const selectEventsForWeek = createSelector(
  [selectStoredEvents, selectSelectedDate],
  (stored, selectedISO) => {
    const base = selectedISO ? parseISO(selectedISO) : new Date();
    const weekStart = startOfWeek(base, { weekStartsOn: 0 }); // 일요일부터
    const weekEnd = endOfWeek(base, { weekStartsOn: 0 }); // 토요일까지

    const visible: CalendarEvent[] = [];

    stored.forEach((master) => {
      // 반복 이벤트
      if (master.rruleString) {
        try {
          const rule = rrulestr(master.rruleString);
          const [start, end] = [parseISO(master.startTime), parseISO(master.endTime)];
          const duration = end.getTime() - start.getTime();

          rule.between(weekStart, weekEnd, true).forEach((occ) => {
            visible.push({
              ...master,
              id: `${master.id}-${occ.toISOString()}`,
              startTime: occ.toISOString(),
              endTime: new Date(occ.getTime() + duration).toISOString(),
              isOccurrence: true,
              rruleString: undefined,
            });
          });
        } catch (err) {
          console.error('rrule parse error:', master.id, err);
        }
        return;
      }

      // 단일 이벤트
      const evStart = parseISO(master.startTime);
      const evEnd = parseISO(master.endTime);
      // 두 개의 시간 간격이 서로 겹치는지 여부 확인
      const overlaps = areIntervalsOverlapping(
        { start: evStart, end: evEnd }, // 이벤트 구간
        { start: weekStart, end: weekEnd }, // 이번주 구간
        { inclusive: true }, // 간격의 시작점이나 끝점이 일치하는 경우도 겹치는 것으로 간주
      );

      if (overlaps) visible.push(master);
    });

    return visible.sort(
      (a, b) => parseISO(a.startTime).getTime() - parseISO(b.startTime).getTime(),
    );
  },
);
