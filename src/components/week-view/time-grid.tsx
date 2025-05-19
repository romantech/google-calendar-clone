import type { CalendarEvent } from '@/store';
import { Fragment } from 'react';
import TimeLabel from './time-label';
import TimeSlot from './time-slot';
import { combineDateAndTime, getEventsForDay } from '@/lib';

interface TimeGridProps {
  days: Date[];
  events: CalendarEvent[];
  timeSlots: Date[];
}

export default function TimeGrid({ days, events, timeSlots }: TimeGridProps) {
  return (
    <div className="overflow-y-auto">
      <div className="grid grid-cols-[4rem_0.625rem_repeat(7,minmax(5rem,_1fr))] grid-rows-[repeat(24,_3rem)]">
        {timeSlots.map((timeSlot, rowIdx) => (
          <Fragment key={timeSlot.getTime()}>
            <TimeLabel
              timeSlot={timeSlot}
              isFirstRow={rowIdx === 0}
              isLastRow={rowIdx === timeSlots.length - 1}
            />

            {days.map((day, dayIdx) => {
              const dateTimeSlot = combineDateAndTime(day, timeSlot);
              return (
                <TimeSlot
                  key={dateTimeSlot.getTime()}
                  dayEvents={getEventsForDay(events, day)}
                  isLastCol={dayIdx === days.length - 1}
                  isLastRow={rowIdx === timeSlots.length - 1}
                  dateTimeSlot={dateTimeSlot}
                />
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
