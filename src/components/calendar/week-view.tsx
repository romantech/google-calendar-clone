import { Fragment } from 'react';
import { format, parseISO } from 'date-fns';
import { selectSelectedDate, useAppSelector } from '@/store';
import { generateTimeSlots, getWeekDays } from '@/lib';
import { ko } from 'date-fns/locale';

export default function WeekView() {
  const selectedDate = useAppSelector(selectSelectedDate);
  const baseDate = selectedDate ? parseISO(selectedDate) : new Date();
  const days = getWeekDays({ baseDate });
  const dailyTimeSlots = generateTimeSlots();

  return (
    <div className="grid grid-cols-[4rem_0.625rem_repeat(7,_1fr)] grid-rows-[auto_1.5rem_repeat(24,_minmax(0,_3rem))]">
      {/* ——— 헤더 행 ——— */}
      <div /> {/* 좌상단 빈공간 셀 */}
      <div /> {/* 경계용 컬럼 */}
      {days.map((day) => (
        <div key={day.toString()} className="flex flex-col items-center p-2">
          <span>{format(day, 'EEE', { locale: ko })}</span>
          <span>{format(day, 'd')}</span>
        </div>
      ))}
      {/* ——— 타임존 + 올데이 행 ——— */}
      <div className="justify-self-end pr-2 text-xs">GMT +9</div>
      {/* 경계용 컬럼 */}
      <div className="border-r border-b border-slate-200" />
      <div className="col-span-7 grid grid-cols-7 divide-x divide-slate-200 border-b">
        {days.map((day) => (
          <div key={day.toString()} className="cursor-pointer hover:bg-slate-100" />
        ))}
      </div>
      {/* ——— 타임슬롯 ——— */}
      {dailyTimeSlots.map((time, rowIdx) => (
        <Fragment key={rowIdx}>
          {/* 시간 라벨 (첫 행은 숨김) */}
          <div className="relative">
            {rowIdx !== 0 && (
              <span className="absolute right-2 -translate-y-1/2 text-xs">{time}</span>
            )}
          </div>
          {/* 경계용 컬럼 */}
          <div className="border-r border-b border-slate-200" />
          {/* 타임블록 */}
          {days.map((day) => (
            <div
              key={`${day.toString()}-${rowIdx}`}
              className="h-full cursor-pointer border-r border-b hover:bg-slate-100"
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
}
