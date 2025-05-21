import { useSelectedDate, useWeekEvents } from '@/store';
import { parseISO } from 'date-fns';
import { generateTimeSlots, getWeekDays } from '@/lib';
import WeekHeader from './week-header';
import AllDayRow from './all-day-row';
import TimeGrid from './time-grid';

const defaultTimeSlots = generateTimeSlots();

export default function WeekView() {
  const selectedDate = useSelectedDate();
  const weekEvents = useWeekEvents();

  const baseDate = selectedDate ? parseISO(selectedDate) : new Date();
  const days = getWeekDays({ baseDate });

  return (
    <div className="flex size-full flex-col p-4">
      {/* 고정 헤더 영역 */}
      <div>
        <WeekHeader days={days} />
        <AllDayRow days={days} />
      </div>

      {/* 스크롤 가능한 타임슬롯 영역 */}
      <TimeGrid days={days} events={weekEvents} dailyTimeSlots={defaultTimeSlots} />
    </div>
  );
}
