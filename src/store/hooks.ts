import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './root-store';
import { selectEventsForWeek, selectSelectedDate, selectSelectedMonth } from './slices';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useSelectedDate = () => useAppSelector(selectSelectedDate);
export const useSelectedMonth = () => useAppSelector(selectSelectedMonth);
export const useSelectedDateAndMonth = () => {
  const selectedDate = useSelectedDate();
  const selectedMonth = useSelectedMonth();
  return { selectedDate, selectedMonth };
};

export const useWeekEvents = () => useAppSelector(selectEventsForWeek);
