import { configureStore } from '@reduxjs/toolkit';
import { calendarSlice, eventsSlice } from '@/store/slices';

export const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
    events: eventsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
