import type { CalendarEvent } from '@/store';
import { Fragment } from 'react';
import TimeLabel from './time-label';
import TimeSlot from './time-slot';
import { combineDateAndTime, getEventsForDay, VIEW_LAYOUT_CLASSES } from '@/lib';

interface TimeGridProps {
  days: Date[];
  events: CalendarEvent[];
  timeSlots: Date[];
}

export default function TimeGrid({ days, events, timeSlots }: TimeGridProps) {
  return (
    <div className="overflow-y-auto">
      <div className={VIEW_LAYOUT_CLASSES.week.timeGrid}>
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
