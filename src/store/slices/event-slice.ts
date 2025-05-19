import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { ISOString } from '@/types';
import { endOfWeek, isWithinInterval, parseISO, startOfWeek } from 'date-fns';

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: ISOString;
  endTime: ISOString;
  // ... 기타 메타데이터
}

interface EventsState {
  events: CalendarEvent[];
}

const initialState: EventsState = {
  events: [
    {
      id: '1',
      title: '회의',
      startTime: '2025-05-19T10:00:00Z',
      endTime: '2025-05-19T13:00:00Z',
    },
    {
      id: '2',
      title: '점심 약속',
      startTime: '2025-05-20T08:00:00Z',
      endTime: '2025-05-20T12:00:00Z',
    },
  ],
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<CalendarEvent>) => {
      state.events.push(action.payload);
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter((e) => e.id !== action.payload);
    },
    updateEvent: (state, action: PayloadAction<CalendarEvent>) => {
      const idx = state.events.findIndex((e) => e.id === action.payload.id);
      if (idx !== -1) state.events[idx] = action.payload;
    },
  },
});

export const { addEvent, removeEvent, updateEvent } = eventsSlice.actions;

const selectAllEvents = (state: RootState) => state.events.events;
const selectSelectedDate = (state: RootState) => state.calendar.selectedDate;

/**
 * 현재 선택한 날짜가 속한 주(week)의 이벤트만 필터링
 * */
export const selectEventsForWeek = createSelector(
  [selectAllEvents, selectSelectedDate],
  (events, selectedDate) => {
    const base = selectedDate ? parseISO(selectedDate) : new Date();
    const start = startOfWeek(base);
    const end = endOfWeek(base);

    return events.filter((e) => {
      const eventDate = parseISO(e.startTime);
      return isWithinInterval(eventDate, { start, end });
    });
  },
);
