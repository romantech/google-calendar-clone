import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { ISOString } from '@/types';

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
    jumpToToday: (state) => {
      const today = new Date().toISOString();
      state.selectedDate = today;
      state.selectedMonth = today;
    },
  },
});

export const { setSelectedDate, setSelectedMonth, jumpToToday } = calendarSlice.actions;

export const selectSelectedDate = (state: RootState) => state.calendar.selectedDate;
export const selectSelectedMonth = (state: RootState) => state.calendar.selectedMonth;
