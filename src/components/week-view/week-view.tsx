import { selectEventsForWeek, selectSelectedDate, useAppSelector } from '@/store';
import { parseISO } from 'date-fns';
import { generateTimeSlots, getWeekDays } from '@/lib';
import WeekHeader from './week-header';
import TimeZoneRow from './time-zone-row';
import TimeGrid from './time-grid';

const defaultTimeSlots = generateTimeSlots();

export default function WeekView() {
  const selectedDate = useAppSelector(selectSelectedDate);
  const baseDate = selectedDate ? parseISO(selectedDate) : new Date();

  const days = getWeekDays({ baseDate });
  const events = useAppSelector(selectEventsForWeek);

  return (
    <div className="flex size-full flex-col p-4">
      {/* 고정 헤더 영역 */}
      <div>
        <WeekHeader days={days} />
        <TimeZoneRow days={days} />
      </div>

      {/* 스크롤 가능한 타임슬롯 영역 */}
      <TimeGrid days={days} events={events} timeSlots={defaultTimeSlots} />
    </div>
  );
}
