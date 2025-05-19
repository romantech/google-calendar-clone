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
          <Fragment key={rowIdx}>
            <TimeLabel
              timeSlot={timeSlot}
              isFirstRow={rowIdx === 0}
              isLastRow={rowIdx === timeSlots.length - 1}
            />

            {days.map((day, dayIdx) => (
              <TimeSlot
                key={`${day.toString()}-${rowIdx}`}
                dayEvents={getEventsForDay(events, day)}
                isLastCol={dayIdx === days.length - 1}
                isLastRow={rowIdx === timeSlots.length - 1}
                dateTimeSlot={combineDateAndTime(day, timeSlot)}
                timeSlots={timeSlots}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
