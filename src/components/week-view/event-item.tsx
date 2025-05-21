import { type CalendarEvent } from '@/store';
import { formatISOString } from '@/lib';

interface EventItemProps extends React.HTMLAttributes<HTMLDivElement> {
  event: CalendarEvent;
}

export default function EventItem({ event, ...divProps }: EventItemProps) {
  return (
    <div
      key={event.id}
      className="absolute z-10 overflow-hidden rounded border border-blue-100 bg-blue-200 p-1"
      {...divProps}
    >
      <div className="font-medium">{event.title}</div>
      <div className="text-xs text-gray-600">
        {formatISOString(event.startTime)} - {formatISOString(event.endTime)}
      </div>
    </div>
  );
}
