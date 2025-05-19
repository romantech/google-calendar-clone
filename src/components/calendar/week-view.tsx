import { Fragment } from 'react';
import { format, parseISO } from 'date-fns';
import {
  type CalendarEvent,
  selectEventsForWeek,
  selectSelectedDate,
  useAppSelector,
} from '@/store';
import {
  calculateEventHeight,
  cn,
  eventStartsAtSlot,
  formatEventTime,
  generateTimeSlots,
  getEventsForDay,
  getWeekDays,
} from '@/lib';
import { ko } from 'date-fns/locale';

const dailyTimeSlots = generateTimeSlots();

export default function WeekView() {
  const selectedDate = useAppSelector(selectSelectedDate);
  const baseDate = selectedDate ? parseISO(selectedDate) : new Date();

  const days = getWeekDays({ baseDate });
  const events = useAppSelector(selectEventsForWeek);

  return (
    <div className="flex h-full flex-col">
      {/* 고정된 헤더 부분 */}
      <div>
        <div className="grid grid-cols-[4rem_0.625rem_repeat(7,_1fr)]">
          {/* ——— 헤더 행 ——— */}
          <div /> {/* 좌상단 빈공간 셀 */}
          <div /> {/* 시간 라벨 우측 경계용 셀 */}
          {days.map((day) => (
            <div key={day.toString()} className="flex flex-col items-center p-2">
              <span>{format(day, 'EEE', { locale: ko })}</span>
              <span>{format(day, 'd')}</span>
            </div>
          ))}
        </div>

        {/* ——— 타임존 + 올데이 행 ——— */}
        <div className="grid grid-cols-[4rem_0.625rem_repeat(7,_1fr)_0.9375rem]">
          <div className="justify-self-end pr-2 text-xs">GMT +9</div>
          <div className="border-r border-b border-slate-200" /> {/* 시간 라벨 우측 경계용 셀 */}
          <div className="col-span-7 grid grid-cols-7 divide-x divide-slate-200 border-b">
            {days.map((day) => (
              <div key={day.toString()} className={cn('cursor-pointer hover:bg-slate-100')} />
            ))}
          </div>
          <div /> {/* 타임슬롯 스크롤 때문에 생긴 영역 맞추기 위한 빈 셀 */}
        </div>
      </div>

      {/* 스크롤 가능한 타임슬롯 영역 */}
      <div className="overflow-y-auto">
        <div className="grid grid-cols-[4rem_0.625rem_repeat(7,_1fr)] grid-rows-[repeat(24,_3rem)]">
          {/* ——— 타임슬롯 ——— */}
          {dailyTimeSlots.map((timeSlot, rowIdx) => (
            <Fragment key={rowIdx}>
              {/* 시간 라벨 (첫 행은 숨김) */}
              <div className="relative">
                <span
                  className={cn('absolute right-2 -translate-y-1/2 text-xs', {
                    invisible: rowIdx === 0,
                  })}
                >
                  {format(timeSlot, 'a h시', { locale: ko })}
                </span>
              </div>
              {/* 시간 라벨 우측 경계용 셀 */}
              <div
                className={cn('border-r border-slate-200', {
                  'border-b': rowIdx !== dailyTimeSlots.length - 1,
                })}
              />
              {/* 타임블록 */}
              {days.map((day, dayIdx) => {
                const dayEvents = getEventsForDay(events, day);
                const eventsStartingAtThisSlot = dayEvents.filter((ev) =>
                  eventStartsAtSlot(ev, timeSlot),
                );

                return (
                  <div
                    key={`${day.toString()}-${rowIdx}`}
                    className={cn('relative cursor-pointer text-xs hover:bg-slate-100', {
                      'border-r': dayIdx !== days.length - 1,
                      'border-b': rowIdx !== dailyTimeSlots.length - 1,
                    })}
                  >
                    {eventsStartingAtThisSlot.map((ev: CalendarEvent) => {
                      return (
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
                      );
                    })}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
