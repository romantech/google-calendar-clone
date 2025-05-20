import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { ISOString } from '@/types';
import { addWeeks, parseISO } from 'date-fns';

interface CalendarState {
  selectedDate: ISOString | null;
  selectedMonth: ISOString | null;
}

const initialState: CalendarState = {
  selectedDate: null,
  selectedMonth: new Date().toISOString(),
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<ISOString | undefined>) => {
      state.selectedDate = action.payload ?? null;
    },
    setSelectedMonth: (state, action: PayloadAction<ISOString | undefined>) => {
      state.selectedMonth = action.payload ?? null;
    },
    moveToToday: (state) => {
      const today = new Date().toISOString();
      [state.selectedDate, state.selectedMonth] = [today, today];
    },
    moveWeek: (state, action: PayloadAction<number>) => {
      const offset = action.payload;
      const baseDate = state.selectedDate ? parseISO(state.selectedDate) : new Date();
      const newDate = addWeeks(baseDate, offset).toISOString();
      [state.selectedDate, state.selectedMonth] = [newDate, newDate];
    },
  },
});

export const { setSelectedDate, setSelectedMonth, moveToToday, moveWeek } = calendarSlice.actions;

export const selectSelectedDate = (state: RootState) => state.calendar.selectedDate;
export const selectSelectedMonth = (state: RootState) => state.calendar.selectedMonth;
