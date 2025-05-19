import { type CalendarEvent } from '@/store';
import { calculateEventHeight, formatEventTime } from '@/lib';

interface EventItemProps {
  event: CalendarEvent;
}

export default function EventItem({ event }: EventItemProps) {
  return (
    <div
      key={event.id}
      className="absolute right-0 left-0 overflow-hidden rounded bg-blue-200 p-1"
      style={{ height: `${calculateEventHeight(event)}px`, zIndex: 10 }}
    >
      <div className="font-medium">{event.title}</div>
      <div className="text-xs text-gray-600">
        {formatEventTime(event.startTime)} - {formatEventTime(event.endTime)}
      </div>
    </div>
  );
}
