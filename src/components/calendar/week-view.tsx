import { selectSelectedDate, useAppSelector } from '@/store';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Fragment } from 'react';
import { generateTimeSlots, getWeekDays } from '@/lib';

const dailyTimeSlots = generateTimeSlots();

export default function WeekView() {
  const selectedDate = useAppSelector(selectSelectedDate);
  const baseDate = selectedDate ? parseISO(selectedDate) : new Date();
  const days = getWeekDays({ baseDate });

  return (
    <div className="grid grid-cols-8 grid-rows-[auto_auto_1fr] divide-y divide-slate-200">
      {/* ── row1: 요일 헤더 ── */}
      <div className="col-span-8 grid grid-cols-8 bg-white">
        <div className="place-self-end p-2 text-xs">GMT +9</div>
        {days.map((day) => (
          <div key={day.toString()} className="p-2 text-center">
            <div className="font-semibold">{format(day, 'EEE', { locale: ko })}</div>
            <div>{format(day, 'd')}</div>
          </div>
        ))}
      </div>

      {/* ── row2: 전체 일정 표시 ── */}
      <div className="col-span-8 bg-gray-50 p-2">
        {/* TODO: 전체 일정을 렌더링 */}
        전체 일정 표시 영역
      </div>

      {/* ── row3: 타임슬롯 (스크롤) ── */}
      <div className="col-span-8 overflow-auto">
        <div className="grid grid-cols-8 grid-rows-[repeat(24,_minmax(0,_3rem))] pt-2">
          {dailyTimeSlots.map((time, rowIdx) => (
            <Fragment key={rowIdx}>
              {/* 시간 레이블 */}
              <div className="-mt-2 h-12 text-right text-xs">{time}</div>
              {/* 각 날짜 셀 */}
              {days.map((day) => (
                <div
                  key={`${day.toString()}-${rowIdx}`}
                  className="relative h-12 border-b border-l hover:bg-slate-100"
                  onClick={() => {
                    /* TODO: 이벤트 모달 오픈 */
                  }}
                />
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
