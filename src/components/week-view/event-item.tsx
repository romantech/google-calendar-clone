import { type CalendarEvent } from '@/store';
import { calculateEventHeight, formatEventTime } from '@/lib';

interface EventItemProps {
  event: CalendarEvent;
  widthPercent: number;
  leftPercent: number;
}

// 각 이벤트 아이템의 좌우에 추가할 여백 (px 단위)
const HORIZONTAL_SPACING_PX = 2;

export default function EventItem({ event, widthPercent, leftPercent }: EventItemProps) {
  return (
    <div
      key={event.id}
      className="absolute overflow-hidden rounded border border-slate-100 bg-blue-200 p-1"
      style={{
        height: `${calculateEventHeight(event)}px`,
        // 전체 할당된 너비에서 좌우 여백(총 2 * HORIZONTAL_SPACING_PX)만큼 축소
        width: `calc(${widthPercent}% - ${HORIZONTAL_SPACING_PX * 2}px)`,
        // 원래 왼쪽 위치에서 오른쪽으로 HORIZONTAL_SPACING_PX 만큼 이동
        left: `calc(${leftPercent}% + ${HORIZONTAL_SPACING_PX}px)`,
        zIndex: 10,
      }}
    >
      <div className="font-medium">{event.title}</div>
      <div className="text-xs text-gray-600">
        {formatEventTime(event.startTime)} - {formatEventTime(event.endTime)}
      </div>
    </div>
  );
}
