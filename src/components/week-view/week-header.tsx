import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function WeekHeader({ days }: { days: Date[] }) {
  return (
    <div className="grid grid-cols-[4rem_0.625rem_repeat(7,_1fr)]">
      <div /> {/* 좌상단 빈공간 셀 */}
      <div /> {/* 시간 라벨 우측 경계용 셀 */}
      {days.map((day) => (
        <div key={day.toString()} className="flex flex-col items-center p-2">
          <span>{format(day, 'EEE', { locale: ko })}</span>
          <span>{format(day, 'd')}</span>
        </div>
      ))}
    </div>
  );
}
