import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface CalendarState {
  selectedDate: Date | undefined;
}

// Define the initial state using that type
const initialState: CalendarState = {
  selectedDate: undefined,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<Date | undefined>) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setSelectedDate } = calendarSlice.actions;
