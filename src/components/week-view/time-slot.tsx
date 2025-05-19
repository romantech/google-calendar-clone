import { addEvent, type CalendarEvent, useAppDispatch } from '@/store';

import { calculateEventHeight, cn, eventStartsAtSlot, formatEventTime } from '@/lib';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';
import EventForm from './event-form';

interface TimeSlotProps {
  dayEvents: CalendarEvent[];
  dateTimeSlot: Date;
  isLastCol: boolean;
  isLastRow: boolean;
  timeSlots: Date[];
}

export default function TimeSlot({
  dayEvents,
  dateTimeSlot,
  isLastCol,
  isLastRow,
  timeSlots,
}: TimeSlotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const eventsStartingAtThisSlot = dayEvents.filter((ev) => eventStartsAtSlot(ev, dateTimeSlot));

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn('relative cursor-pointer text-xs hover:bg-slate-100', {
            'border-r': !isLastCol,
            'border-b': !isLastRow,
          })}
        >
          {eventsStartingAtThisSlot.map((ev: CalendarEvent) => (
            <div
              key={ev.id}
              className="absolute right-0 left-0 overflow-hidden rounded bg-blue-200 p-1"
              style={{ height: `${calculateEventHeight(ev)}px`, zIndex: 10 }}
            >
              <div className="font-medium">{ev.title}</div>
              <div className="text-xs text-gray-600">
                {formatEventTime(ev.startTime)} - {formatEventTime(ev.endTime)}
              </div>
            </div>
          ))}
        </div>
      </PopoverTrigger>
      <PopoverContent className="min-w-60">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">새 이벤트 추가</h3>
          <EventForm
            initialTime={dateTimeSlot}
            onSubmit={(e) => dispatch(addEvent(e))}
            onCancel={() => setIsOpen(false)}
            onSave={() => setIsOpen(false)}
            timeSlots={timeSlots}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
