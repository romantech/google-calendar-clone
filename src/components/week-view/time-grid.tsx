import type { CalendarEvent } from '@/store';
import { Fragment } from 'react';
import TimeLabel from './time-label';
import TimeSlot from './time-slot';
import { combineDateAndTime, isSameDateTime, VIEW_LAYOUT_CLASSES } from '@/lib';
import { parseISO } from 'date-fns';

interface TimeGridProps {
  days: Date[];
  events: CalendarEvent[];
  /** n시간 간격의 1일 타임슬롯 목록 e.g., 00:00 ~ 23:00 */
  dailyTimeSlots: Date[];
}

export default function TimeGrid({ days, events, dailyTimeSlots }: TimeGridProps) {
  return (
    <div className="overflow-y-auto">
      <div className={VIEW_LAYOUT_CLASSES.week.timeGrid}>
        {dailyTimeSlots.map((dailyTimeSlot, timeSlotIdx) => (
          <Fragment key={dailyTimeSlot.getTime()}>
            <TimeLabel
              timeSlot={dailyTimeSlot}
              isFirstRow={timeSlotIdx === 0}
              isLastRow={timeSlotIdx === dailyTimeSlots.length - 1}
            />

            {/* 월요일~일요일 순서대로 각 날짜 열 렌더링  */}
            {days.map((day, dayIdx) => {
              const dateTimeSlot = combineDateAndTime(day, dailyTimeSlot);
              const eventsStartingAtSlot = events.filter(({ startTime }) =>
                isSameDateTime(parseISO(startTime), dateTimeSlot),
              );

              return (
                <TimeSlot
                  key={dateTimeSlot.getTime()}
                  slotEvents={eventsStartingAtSlot}
                  dateTimeSlot={dateTimeSlot}
                  isLastCol={dayIdx === days.length - 1}
                  isLastRow={timeSlotIdx === dailyTimeSlots.length - 1}
                />
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
