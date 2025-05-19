import type { CalendarEvent } from '@/store';
import { calculateEventHeight, cn, eventStartsAtSlot, formatEventTime } from '@/lib';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface TimeSlotProps {
  dayEvents: CalendarEvent[];
  timeSlot: Date;
  isLastCol: boolean;
  isLastRow: boolean;
}

export default function TimeSlot({ dayEvents, timeSlot, isLastCol, isLastRow }: TimeSlotProps) {
  const eventsStartingAtThisSlot = dayEvents.filter((ev) => eventStartsAtSlot(ev, timeSlot));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn('relative cursor-pointer text-xs hover:bg-slate-100', {
            'border-r': !isLastCol,
            'border-b': !isLastRow,
          })}
        >
          {eventsStartingAtThisSlot.map((ev: CalendarEvent) => (
            <div
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
      <PopoverContent>
        <div className="flex flex-col gap-2">Hello</div>
      </PopoverContent>
    </Popover>
  );
}
