import { addEvent, type CalendarEvent, removeEvent, useAppDispatch } from '@/store';
import { cn, eventStartsAtSlot, generateTimeSlots } from '@/lib';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';
import EventForm from './event-form';
import EventItem from './event-item';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Trash2 } from 'lucide-react';

interface TimeSlotProps {
  dayEvents: CalendarEvent[];
  /** 선택한 날짜/시간대의 슬롯 */
  dateTimeSlot: Date;
  isLastCol: boolean;
  isLastRow: boolean;
}

export default function TimeSlot({ dayEvents, dateTimeSlot, isLastCol, isLastRow }: TimeSlotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const eventsStartingAtThisSlot = dayEvents.filter((ev) => eventStartsAtSlot(ev, dateTimeSlot));
  const numConcurrentEvents = eventsStartingAtThisSlot.length;
  const calculatedWidthPercent = numConcurrentEvents > 0 ? 100 / numConcurrentEvents : 100;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn('relative cursor-pointer text-xs hover:bg-slate-100', {
            'border-r': !isLastCol,
            'border-b': !isLastRow,
          })}
        >
          {eventsStartingAtThisSlot.map((ev: CalendarEvent, index: number) => {
            const eventLeftPercent = index * calculatedWidthPercent;
            return (
              <ContextMenu key={ev.id}>
                <ContextMenuTrigger>
                  <EventItem
                    event={ev}
                    widthPercent={calculatedWidthPercent}
                    leftPercent={eventLeftPercent}
                  />
                </ContextMenuTrigger>
                <ContextMenuContent className="min-w-48">
                  <ContextMenuItem
                    onClick={(e) => {
                      dispatch(removeEvent(ev.id));
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
            onCancel={() => setIsOpen(false)}
            onSave={() => setIsOpen(false)}
            dateTimeSlots={generateTimeSlots({ baseDate: dateTimeSlot })}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
