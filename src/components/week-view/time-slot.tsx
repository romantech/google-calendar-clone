import { addEvent, type CalendarEvent, removeEvent, useAppDispatch } from '@/store';

import { cn, eventStartsAtSlot } from '@/lib';
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
            <ContextMenu>
              <ContextMenuTrigger>
                <EventItem key={ev.id} event={ev} />
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
