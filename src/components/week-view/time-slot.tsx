import { addEvent, type CalendarEvent, removeEvent, useAppDispatch } from '@/store';
import { calcEventPosition, calculateEventHeight, cn, generateTimeSlots } from '@/lib';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useRef } from 'react';
import EventForm from './event-form';
import EventItem from './event-item';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Trash2 } from 'lucide-react';
import { useDisclosure } from '@/hooks';

interface TimeSlotProps {
  slotEvents: CalendarEvent[];
  /** 선택한 날짜/시간대의 슬롯 */
  dateTimeSlot: Date;
  isLastCol: boolean;
  isLastRow: boolean;
}

export default function TimeSlot({
  slotEvents,
  dateTimeSlot,
  isLastCol,
  isLastRow,
}: TimeSlotProps) {
  const { open: isFormOpen, onOpenChange: setIsFormOpen } = useDisclosure();
  const dateTimeSlots = useRef(generateTimeSlots({ baseDate: dateTimeSlot }));

  const dispatch = useAppDispatch();
  const eventCount = slotEvents.length;

  return (
    <Popover open={isFormOpen} onOpenChange={setIsFormOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn('relative cursor-pointer text-xs hover:bg-slate-100', {
            'border-r': !isLastCol,
            'border-b': !isLastRow,
          })}
        >
          {slotEvents.map((ev: CalendarEvent, evIdx: number) => {
            const { leftPercent, widthPercent } = calcEventPosition(evIdx, eventCount);
            const height = calculateEventHeight(ev);

            return (
              <ContextMenu key={ev.id}>
                <ContextMenuTrigger>
                  <EventItem
                    event={ev}
                    style={{ left: `${leftPercent}%`, width: `${widthPercent}%`, height }}
                  />
                </ContextMenuTrigger>
                <ContextMenuContent className="min-w-48">
                  <ContextMenuItem
                    onClick={(e) => {
                      dispatch(removeEvent(ev.originalId ?? ev.id));
                      e.stopPropagation();
                    }}
                  >
                    <Trash2 /> 삭제
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            );
          })}
        </div>
      </PopoverTrigger>
      <PopoverContent className="min-w-60">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">새 이벤트 추가</h3>
          <EventForm
            initialTime={dateTimeSlot}
            onSubmit={(e) => dispatch(addEvent(e))}
            onCancel={() => setIsFormOpen(false)}
            onSave={() => setIsFormOpen(false)}
            dateTimeSlots={dateTimeSlots.current}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
